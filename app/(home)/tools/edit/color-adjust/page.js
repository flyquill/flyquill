"use client";

import React, { useRef, useState, useEffect } from "react";

export default function ColorAdjustmentTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    temperature: 0,
    tint: 0,
    highlights: 0,
    shadows: 0,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdjustmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdjustments((prev) => ({ ...prev, [name]: Number(value) }));
  };

  useEffect(() => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    if (!ctx || !img.complete) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `
      brightness(${adjustments.brightness}%)
      contrast(${adjustments.contrast}%)
      saturate(${adjustments.saturation}%)
      hue-rotate(${adjustments.hue}deg)
    `;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [adjustments, imageURL]);

  const resetAdjustments = () => {
    setAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      temperature: 0,
      tint: 0,
      highlights: 0,
      shadows: 0,
    });
  };

  const downloadImage = (type: "png" | "jpg") => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `edited-image.${type}`;
    link.href = canvasRef.current.toDataURL(`image/${type === "jpg" ? "jpeg" : "png"}`);
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Color Adjustment</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <input id="imageInput" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              <p className="text-gray-600">Click to select image</p>
            </div>
          </div>

          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            {imageURL ? (
              <>
                <canvas ref={canvasRef} className="max-h-full max-w-full rounded" />
                <img ref={imgRef} src={imageURL} alt="Uploaded" className="hidden" onLoad={() => setAdjustments({ ...adjustments })} />
              </>
            ) : (
              <p className="text-gray-500">Image preview will appear here</p>
            )}
          </div>

          <div className="flex justify-between flex-wrap gap-3">
            <button
              onClick={resetAdjustments}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
            >
              Reset Changes
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => downloadImage("png")}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Download PNG
              </button>
              <button
                onClick={() => downloadImage("jpg")}
                className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Download JPG
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Adjustment Controls</h2>
          <div className="space-y-6">
            {[
              { label: "Brightness", name: "brightness", min: 0, max: 200 },
              { label: "Contrast", name: "contrast", min: 0, max: 200 },
              { label: "Saturation", name: "saturation", min: 0, max: 200 },
              { label: "Hue", name: "hue", min: 0, max: 360 },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between mb-1">
                  <label className="text-gray-700 text-sm font-bold">{item.label}</label>
                  <span className="text-gray-600 text-sm">{adjustments[item.name as keyof typeof adjustments]}</span>
                </div>
                <input
                  type="range"
                  className="w-full"
                  min={item.min}
                  max={item.max}
                  name={item.name}
                  value={adjustments[item.name as keyof typeof adjustments]}
                  onChange={handleAdjustmentChange}
                />
              </div>
            ))}
            {/* You can later implement these advanced controls */}
            {/* Highlights, Shadows, Temperature, Tint */}
          </div>
        </div>
      </div>
    </div>
  );
}
