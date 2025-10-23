"use client";

import React, { useState, useCallback } from "react";
import heic2any from "heic2any";
import Image from "next/image";

export default function HeicToJpgTool() {
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    setErrorMessage(null);
    setLoading(true);
    const jpgUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (
        file.type !== "image/heic" &&
        !file.name.toLowerCase().endsWith(".heic")
      ) {
        setErrorMessage("Only HEIC files are supported.");
        continue;
      }

      try {
        const result = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const blobs = Array.isArray(result) ? result : [result];
        blobs.forEach((blob) => {
          const url = URL.createObjectURL(blob);
          jpgUrls.push(url);
        });
      } catch (err) {
        console.error("Conversion error:", err);
        setErrorMessage("Failed to convert some files.");
      }
    }
    setConvertedImages(jpgUrls);
    setLoading(false);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-rose-600">
        HEIC to JPG Converter
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <label
          htmlFor="fileInput"
          onDragOver={onDragOver}
          onDrop={onDrop}
          className="flex flex-col items-center justify-center border-4 border-dashed border-rose-400 rounded-xl cursor-pointer 
                     hover:border-rose-600 focus-within:border-rose-600 transition-colors p-12 select-none"
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            multiple
            accept=".heic,image/heic"
            onChange={onInputChange}
          />
          <svg
            className="w-16 h-16 mb-4 text-rose-500"
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
          <p className="text-lg font-semibold text-rose-700 mb-2">
            Drag & Drop HEIC files here or click to upload
          </p>
          <p className="text-sm text-rose-400">Supports multiple files</p>
        </label>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Output Settings
          </h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-rose-600"
                defaultChecked
                disabled
              />
              <span className="text-gray-700 text-sm">
                Preserve EXIF data (Not supported)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-rose-600"
                defaultChecked
                disabled
              />
              <span className="text-gray-700 text-sm">
                Maintain original dimensions (Default)
              </span>
            </label>
          </div>
        </div>

        {loading && (
          <p className="mt-6 text-center text-rose-600 font-semibold">
            Converting images...
          </p>
        )}

        {errorMessage && (
          <p className="mt-6 text-center text-red-600 font-semibold">
            {errorMessage}
          </p>
        )}

        {convertedImages.length > 0 && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {convertedImages.map((url, idx) => (
              <div
                key={idx}
                className="border border-rose-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={url}
                  alt={`Converted ${idx + 1}`}
                  className="w-full h-48 object-contain bg-gray-50"
                />
                <a
                  href={url}
                  download={`converted-${idx + 1}.jpg`}
                  className="block text-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2"
                >
                  Download JPG
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
