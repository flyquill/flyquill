"use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function TextExtractionTool() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handleExtractText = () => {
    if (!selectedImage) return;

    setLoading(true);
    Tesseract.recognize(selectedImage, "eng", {
      logger: (m) => {
        console.log("Tesseract log:", m);
      },
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Text extraction error:", err);
        setLoading(false);
      });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Extract Text from Images</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-gray-600">
                {selectedImage ? selectedImage.name : "Drag and drop your image here, or click to select file"}
              </p>
            </div>
          </div>

          {/* Dummy settings UI */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">OCR Settings</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Auto-detect language</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Enhance image before processing</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Preserve text layout</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleExtractText}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-colors w-full"
            disabled={loading || !selectedImage}
          >
            {loading ? "Extracting..." : "Extract Text"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Extracted Text</h2>
          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            placeholder="Extracted text will appear here..."
            className="w-full h-[400px] border border-gray-200 rounded-lg p-4 mb-4 text-gray-700 resize-none"
          />

          <div className="flex space-x-2">
            <button
              onClick={handleCopyText}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
              disabled={!extractedText}
            >
              {copied ? "✔ Copied" : "Copy Text"}
            </button>
            <button
              onClick={handleDownloadText}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
              disabled={!extractedText}
            >
              Download as TXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
