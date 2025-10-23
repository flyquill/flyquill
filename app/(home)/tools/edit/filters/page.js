"use client";

import React, { useState, useRef, ChangeEvent } from "react";

export default function ImageFiltersTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preset, setPreset] = useState("none");
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getFilterStyle = () => {
    let filter = `brightness(${100 + brightness}%) contrast(${100 + contrast}%) saturate(${100 + saturation}%)`;
    const hue = temperature * 1.8;
    filter += ` hue-rotate(${hue}deg)`;

    if (preset === "grayscale") filter += " grayscale(100%)";
    if (preset === "sepia") filter += " sepia(100%)";
    if (preset === "vivid") filter += " saturate(200%) contrast(120%)";
    if (preset === "vintage") filter += " sepia(40%) contrast(90%)";
    if (preset === "dramatic") filter += " contrast(130%) saturate(80%) brightness(90%)";

    return filter;
  };

  const resetFilters = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setTemperature(0);
    setPreset("none");
  };

  const downloadImage = (type: "png" | "jpeg") => {
    if (!imageRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = imageRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    if (ctx) {
      ctx.filter = getFilterStyle();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL(`image/${type}`);
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `filtered-image.${type}`;
      link.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Image Filters</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left side - Upload and preview */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="text-gray-600">Drag and drop your image here, or click to select file</p>
            </div>
          </div>

          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {imageSrc ? (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
                style={{ filter: getFilterStyle() }}
              />
            ) : (
              <p className="text-gray-500">Image preview will appear here</p>
            )}
          </div>
        </div>

        {/* Right side - Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Preset Filters</label>
              <select
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              >
                <option value="none">None</option>
                <option value="vintage">Vintage</option>
                <option value="grayscale">Grayscale</option>
                <option value="sepia">Sepia</option>
                <option value="vivid">Vivid</option>
                <option value="dramatic">Dramatic</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Brightness</label>
                <input type="range" min="-100" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Contrast</label>
                <input type="range" min="-100" max="100" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Saturation</label>
                <input type="range" min="-100" max="100" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Temperature</label>
                <input type="range" min="-100" max="100" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="w-full" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={resetFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={() => downloadImage("png")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Download as PNG
              </button>
              <button
                onClick={() => downloadImage("jpeg")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Download as JPG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
