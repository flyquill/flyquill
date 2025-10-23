"use client";
"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blurWhileLoading, setBlurWhileLoading] = useState(false); // 🟣
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const { user } = useUser(); // Clerk user


  async function handleSubmit(e) {
    e.preventDefault();

    if (result) setBlurWhileLoading(true); // blur old result if exists
    setLoading(true);

    try {
      const res = await fetch("/api/url-shortner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customAlias: alias, expiresAt }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setResult(data); // update to new result

      const newLink = {
        shortUrl: data.shortUrl,
        clickCount: 0,
        createdAt: new Date().toISOString(),
      };

      // If signed in, assume server saves it — otherwise, store locally
      if (!user) {
        const stored = JSON.parse(localStorage.getItem("anonHistory") || "[]");
        const updated = [newLink, ...stored].slice(0, 5);
        localStorage.setItem("anonHistory", JSON.stringify(updated));
        setHistory(updated);
      }

    } catch (err) {
      console.error("Client error:", err);
      alert("Failed to reach server");
    } finally {
      setLoading(false);
      setBlurWhileLoading(false); // remove blur when done
    }
  }

  useEffect(() => {
    async function fetchHistory() {
      if (user) {
        try {
          const res = await fetch("/api/user-links");

          if (!res.ok) {
            console.error("API error:", res.status);
            setHistory([]); // fallback
            return;
          }

          const data = await res.json();

          if (Array.isArray(data.links)) {
            setHistory(data.links.slice(0, 5));
          } else {
            console.warn("API returned no links array");
            setHistory([]);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setHistory([]);
        }
      } else {
        const stored = JSON.parse(localStorage.getItem("anonHistory") || "[]");
        setHistory(stored);
      }
    }

    fetchHistory();
  }, [user]);



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          🔗 Link Shortener
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter URL
            </label>
            <input
              type="url"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              placeholder="https://example.com/very/long/link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom Alias (optional)
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              placeholder="custom-alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date (optional)
            </label>
            <input
              type="datetime-local"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-black"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-md transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
                />
              </svg>
            )}
            {loading ? "Processing..." : "Shorten URL"}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 bg-green-50 border border-green-300 rounded-md text-center transition duration-300 ${blurWhileLoading ? "blur-sm pointer-events-none select-none" : ""
              }`}
          >
            <p className="text-lg text-green-800 font-medium">✅ Your Short URL:</p>
            <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline break-all"
              >
                {result.shortUrl}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.shortUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500); // reset after 2 sec
                }}
                className={`${copied ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  } text-sm px-3 py-1 rounded-md transition`}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>

            </div>

            <div className="mt-4">
              <img
                src={result.qrCode}
                alt="QR Code"
                className="mx-auto w-40 h-40"
              />
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = result.qrCode;
                  link.download = "qr-code.png";
                  link.click();
                }}
                className="mt-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-md transition"
              >
                ⬇️ Download QR
              </button>
              <p className="text-xs text-gray-500 mt-2">Scan to visit</p>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              🕓 Recent Links
            </h2>

            <ul className="space-y-3">
              {history.slice(0, 5).map((link, index) => (
                <li key={link.shortUrl} className="flex justify-between items-center">
                  <a href={link.shortUrl} className="text-purple-600 underline break-all" target="_blank">
                    {link.shortUrl}
                  </a>
                  <span className="text-sm text-gray-600">
                    {link.clickCount} clicks
                  </span>
                </li>
              ))}

              {!user && history.length > 2 && (
                <p className="text-sm text-center text-gray-500 pt-4">
                  🔒 <strong>Please sign in</strong> to view all your links!
                </p>
              )}
            </ul>
          </div>
        )}


      </div>
    </div>
  );
}
