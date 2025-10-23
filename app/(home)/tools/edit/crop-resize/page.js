"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous"); // to avoid CORS issues
    img.src = url;
  });
}

// Utility to get cropped image as Blob URL with resizing
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  resizeWidth: number,
  resizeHeight: number
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = resizeWidth;
  canvas.height = resizeHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not get canvas context");

  // Draw the cropped image resized
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    resizeWidth,
    resizeHeight
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Canvas is empty");
      resolve(URL.createObjectURL(blob));
    }, "image/png");
  });
}

export default function CropResizeTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | null>(null); // null = freeform
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [widthInput, setWidthInput] = useState<number>(400);
  const [heightInput, setHeightInput] = useState<number>(300);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const naturalAspect = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load image file as base64 data URL
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setOutputUrl(null);
      // Get natural aspect ratio from image
      const img = await createImage(url);
      naturalAspect.current = img.naturalWidth / img.naturalHeight;
      setWidthInput(img.naturalWidth);
      setHeightInput(img.naturalHeight);
      setAspect(null); // freeform default
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  // Handle drag and drop
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setOutputUrl(null);
      createImage(url).then((img) => {
        naturalAspect.current = img.naturalWidth / img.naturalHeight;
        setWidthInput(img.naturalWidth);
        setHeightInput(img.naturalHeight);
      });
      setAspect(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      e.dataTransfer.clearData();
    }
  };

  // Update croppedAreaPixels when crop changes
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );  

  // Update height or width inputs maintaining aspect ratio if enabled
  useEffect(() => {
    if (!maintainAspect || !naturalAspect.current) return;
    if (widthInput && heightInput) {
      const currentAspect = widthInput / heightInput;
      if (Math.abs(currentAspect - naturalAspect.current) > 0.01) {
        // Adjust height based on width
        setHeightInput(Math.round(widthInput / naturalAspect.current));
      }
    }
  }, [widthInput, maintainAspect]);

  useEffect(() => {
    if (!maintainAspect || !naturalAspect.current) return;
    if (widthInput && heightInput) {
      const currentAspect = widthInput / heightInput;
      if (Math.abs(currentAspect - naturalAspect.current) > 0.01) {
        // Adjust width based on height
        setWidthInput(Math.round(heightInput * naturalAspect.current));
      }
    }
  }, [heightInput, maintainAspect]);

  // Apply changes: crop and resize
  const applyChanges = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const url = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        widthInput,
        heightInput
      );
      setOutputUrl(url);
    } catch (err) {
      alert("Failed to process image");
    }
  };

  // Reset tool
  const reset = () => {
    setImageSrc(null);
    setOutputUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(null);
    setWidthInput(400);
    setHeightInput(300);
    naturalAspect.current = null;
  };

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-5xl"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Crop & Resize Image</h1>

      {/* Upload */}
      {!imageSrc && (
        <label
          htmlFor="fileInput"
          className="block border-4 border-dashed border-gray-400 rounded-lg p-16 cursor-pointer text-center select-none hover:border-gray-600 transition-colors"
        >
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
            ref={inputRef}
          />
          <p className="text-lg font-semibold text-gray-700">
            Drag & drop your image here, or click to select file
          </p>
          <p className="text-gray-500 mt-2">Supported formats: PNG, JPG, JPEG, GIF, SVG</p>
        </label>
      )}

      {/* Cropper */}
      {imageSrc && !outputUrl && (
        <>
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect || undefined}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={true}
            />
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Resize */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Resize</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={widthInput}
                    min={1}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) setWidthInput(val);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={heightInput}
                    min={1}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > 0) setHeightInput(val);
                    }}
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={maintainAspect}
                    onChange={() => setMaintainAspect(!maintainAspect)}
                  />
                  <span className="text-sm text-gray-700">Maintain aspect ratio</span>
                </label>
              </div>
            </div>

            {/* Crop */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Crop</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={aspect ?? "free"}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "free") setAspect(null);
                      else {
                        const [w, h] = val.split(":").map(Number);
                        setAspect(w / h);
                      }
                    }}
                  >
                    <option value="free">Free Form</option>
                    <option value="1:1">Square (1:1)</option>
                    <option value="4:3">4:3</option>
                    <option value="16:9">16:9</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Zoom
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={applyChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Apply Changes
            </button>
            <button
              onClick={reset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </>
      )}

      {/* Output Preview */}
      {outputUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Result Preview</h2>
          <img
            src={outputUrl}
            alt="Cropped and Resized"
            className="inline-block max-w-full border rounded shadow"
          />
          <div className="mt-4">
            <a
              href={outputUrl}
              download="cropped-resized-image.png"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Download Image
            </a>
            <button
              onClick={reset}
              className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
