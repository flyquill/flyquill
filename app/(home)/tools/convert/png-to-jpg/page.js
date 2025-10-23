"use client";

import React, { useState, useCallback, useEffect } from "react";

export default function PngToJpgTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.85);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Show preview of original PNG on file select
  useEffect(() => {
    if (!selectedFile) {
      setOriginalUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Convert PNG to JPG using Canvas with quality
  const convertToJpg = useCallback(async () => {
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

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Export as JPEG with quality (0 to 1)
      const jpgUrl = canvas.toDataURL("image/jpeg", quality);

      setOutputUrl(jpgUrl);
      URL.revokeObjectURL(fileUrl);
    } catch (err) {
      setError(typeof err === "string" ? err : "Conversion failed.");
    } finally {
      setLoading(false);
    }
  }, [selectedFile, quality]);

  // Handle input file change
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === "image/png" ||
        file.name.toLowerCase().endsWith(".png")
      ) {
        setSelectedFile(file);
        setOutputUrl(null);
        setError(null);
      } else {
        setError("Please upload a PNG file.");
      }
    }
  };

  // Drag & drop handlers
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "image/png" ||
        file.name.toLowerCase().endsWith(".png")
      ) {
        setSelectedFile(file);
        setOutputUrl(null);
        setError(null);
      } else {
        setError("Please upload a PNG file.");
      }
      e.dataTransfer.clearData();
    }
  };

  // Clear images after download
  const onDownloadClick = () => {
    setSelectedFile(null);
    setOriginalUrl(null);
    setOutputUrl(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">
        PNG to JPG Converter
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label
          htmlFor="fileInput"
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="flex flex-col items-center justify-center border-4 border-dashed border-emerald-400 rounded-xl cursor-pointer 
                     hover:border-emerald-600 focus-within:border-emerald-600 transition-colors p-12 select-none"
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".png,image/png"
            onChange={onInputChange}
          />
          <svg
            className="w-16 h-16 mb-4 text-emerald-500"
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
          <p className="text-lg font-semibold text-emerald-700 mb-2">
            Drag & Drop PNG image here or click to upload
          </p>
          <p className="text-sm text-emerald-400">Only PNG files supported</p>
        </label>

        {originalUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Original PNG Preview
            </h2>
            <img
              src={originalUrl}
              alt="Original PNG"
              className="inline-block max-w-full rounded shadow-md border"
            />
          </div>
        )}

        <div className="mt-6">
          <label
            htmlFor="qualityRange"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            JPG Quality: {Math.round(quality * 100)}%
          </label>
          <input
            id="qualityRange"
            type="range"
            min={0}
            max={100}
            value={quality * 100}
            onChange={(e) => setQuality(Number(e.target.value) / 100)}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Lower quality</span>
            <span>Higher quality</span>
          </div>
        </div>

        <button
          onClick={convertToJpg}
          disabled={!selectedFile || loading}
          className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Converting..." : "Convert to JPG"}
        </button>

        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {outputUrl && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Converted JPG Preview
            </h2>
            <img
              src={outputUrl}
              alt="Converted JPG"
              className="inline-block max-w-full rounded shadow-lg border"
            />
            <a
              href={outputUrl}
              download={
                selectedFile
                  ? selectedFile.name.replace(/\.png$/i, ".jpg")
                  : "converted.jpg"
              }
              onClick={onDownloadClick}
              className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Download JPG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
