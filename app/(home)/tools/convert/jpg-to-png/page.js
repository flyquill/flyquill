"use client";

import React, { useState, useCallback, useEffect } from "react";

export default function JpgToPngTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState("high");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update original image preview URL when selectedFile changes
  useEffect(() => {
    if (!selectedFile) {
      setOriginalUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);

    // Cleanup URL when file changes/unmount
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  const qualityScale = {
    high: 1.0,
    medium: 0.7,
    low: 0.4,
  };

  // Convert JPG to PNG using canvas with resizing based on quality
  const convertToPng = useCallback(async () => {
    if (!selectedFile) return;

    setError(null);
    setLoading(true);
    setOutputUrl(null);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const fileUrl = URL.createObjectURL(selectedFile);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject("Failed to load image.");
        img.src = fileUrl;
      });

      const scale = qualityScale[quality as keyof typeof qualityScale] || 1;

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // Draw scaled image on canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Export as PNG
      const pngUrl = canvas.toDataURL("image/png");

      setOutputUrl(pngUrl);
      URL.revokeObjectURL(fileUrl);
    } catch (err) {
      setError(typeof err === "string" ? err : "Conversion failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedFile, quality]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setOutputUrl(null);
      setError(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg")
      ) {
        setSelectedFile(file);
        setOutputUrl(null);
        setError(null);
      } else {
        setError("Please upload a JPG/JPEG file.");
      }
      e.dataTransfer.clearData();
    }
  };

  // Clear image after download
  const onDownloadClick = () => {
    setSelectedFile(null);
    setOutputUrl(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        JPG to PNG Converter
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label
          htmlFor="fileInput"
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="flex flex-col items-center justify-center border-4 border-dashed border-purple-400 rounded-xl cursor-pointer 
                     hover:border-purple-600 focus-within:border-purple-600 transition-colors p-12 select-none"
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,image/jpeg"
            onChange={onInputChange}
          />
          <svg
            className="w-16 h-16 mb-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-purple-700 mb-2">
            Drag & Drop JPG image here or click to upload
          </p>
          <p className="text-sm text-purple-400">Only JPG/JPEG files supported</p>
        </label>

        {originalUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Original JPG Preview
            </h2>
            <img
              src={originalUrl}
              alt="Original JPG"
              className="inline-block max-w-full rounded shadow-md border"
            />
          </div>
        )}

        <div className="mt-6">
          <label
            htmlFor="qualitySelect"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quality Settings (Adjusts output resolution)
          </label>
          <select
            id="qualitySelect"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="high">High Quality (100%)</option>
            <option value="medium">Medium Quality (70%)</option>
            <option value="low">Low Quality (40%)</option>
          </select>
        </div>

        <button
          onClick={convertToPng}
          disabled={!selectedFile || loading}
          className={`mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition-colors disabled:opacity-50`}
        >
          {loading ? "Converting..." : "Convert to PNG"}
        </button>

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {outputUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Converted PNG Preview
            </h2>
            <img
              src={outputUrl}
              alt="Converted PNG"
              className="inline-block max-w-full rounded shadow-lg border"
            />
            <a
              href={outputUrl}
              download={
                selectedFile
                  ? selectedFile.name.replace(/\.(jpg|jpeg)$/i, ".png")
                  : "converted.png"
              }
              onClick={onDownloadClick}
              className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
