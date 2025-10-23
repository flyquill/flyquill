"use client";

import React, { useState, useRef } from "react";
import imageCompression, { Options as ImageCompressionOptions } from "browser-image-compression";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Image from "next/image";

type CompressionStatus = "pending" | "compressing" | "completed" | "error";

interface ImageItem {
  file: File;
  preview: string;
  compressedFile?: File;
  status: CompressionStatus;
  originalSize: number;
  compressedSize?: number;
  error?: string;
}

export default function ImageCompressionTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [outputFormat, setOutputFormat] = useState<
    "original" | "jpg" | "png" | "webp"
  >("original");
  const [preserveExif, setPreserveExif] = useState(false);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<number | "">("");
  const [resizeHeight, setResizeHeight] = useState<number | "">("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection (via input or drag/drop)
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: ImageItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 10 * 1024 * 1024) {
        // skip >10MB
        alert(`File ${file.name} is larger than 10MB and was skipped.`);
        continue;
      }
      const preview = URL.createObjectURL(file);
      newImages.push({
        file,
        preview,
        status: "pending",
        originalSize: file.size,
      });
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  // Handle file input change
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = ""; // reset input
  };

  // Remove single image from list (revoke object URL)
  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Compress all images
  const compressAll = async () => {
    const compressedImages: ImageItem[] = await Promise.all(
      images.map(async (img) => {
        if (img.status === "completed") return img; // skip already compressed

        const options: ImageCompressionOptions = {
          maxSizeMB: 10,
          initialQuality: compressionLevel / 100,
          useWebWorker: true,
          exifOrientation: preserveExif ? undefined : -1,
          fileType:
            outputFormat === "original"
              ? img.file.type
              : `image/${outputFormat === "jpg" ? "jpeg" : outputFormat}`,
        };

        if (resizeEnabled && resizeWidth && resizeHeight) {
          options.maxWidthOrHeight = Math.max(resizeWidth, resizeHeight);
        }

        try {
          const compressedBlob = await imageCompression(img.file, options);
          const ext =
            outputFormat === "original"
              ? img.file.name.split(".").pop()
              : outputFormat === "jpg"
              ? "jpg"
              : outputFormat;
          const baseName = img.file.name.replace(/\.[^/.]+$/, "");
          const newFileName = `${baseName}_compressed.${ext}`;

          const compressedFile = new File([compressedBlob], newFileName, {
            type: compressedBlob.type,
          });

          return {
            ...img,
            compressedFile,
            compressedSize: compressedFile.size,
            status: "completed",
            error: undefined,
          } as ImageItem;
        } catch (err) {
          return {
            ...img,
            status: "error",
            error: (err as Error).message,
          } as ImageItem;
        }
      })
    );
    setImages(compressedImages);
  };

  // Download all compressed images as ZIP and clear list
  const downloadAll = async () => {
    const zip = new JSZip();

    images.forEach((img) => {
      const file = img.compressedFile ?? img.file;
      zip.file(file.name, file);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "compressed_images.zip");

    // Clear all after download
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Image Compression</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Images
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={onFileChange}
              />
              <p className="text-gray-600">
                Drag and drop your images here, or click to select files
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: JPG, PNG, WebP (max 10MB each)
              </p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="mb-6 max-h-64 overflow-y-auto border border-gray-300 rounded p-2">
              <h3 className="text-lg font-semibold mb-3">Selected Images</h3>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group border rounded p-1">
                    <Image
                      src={img.preview}
                      alt={img.file.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      title="Remove"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      type="button"
                    >
                      &times;
                    </button>
                    <p
                      className="text-xs text-center mt-1 truncate"
                      title={img.file.name}
                    >
                      {img.file.name}
                    </p>
                    <p className="text-xs text-center text-gray-500">
                      {(img.originalSize / 1024).toFixed(1)} KB
                    </p>
                    {img.status === "completed" && img.compressedSize && (
                      <p className="text-xs text-center text-green-600">
                        Compressed: {(img.compressedSize / 1024).toFixed(1)} KB
                      </p>
                    )}
                    {img.status === "error" && (
                      <p className="text-xs text-center text-red-600">
                        Error: {img.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Compression Level
                </label>
                <input
                  type="range"
                  className="w-full"
                  min={0}
                  max={100}
                  value={compressionLevel}
                  onChange={(e) => setCompressionLevel(Number(e.target.value))}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Maximum compression</span>
                  <span>Best quality</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Output Format
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(e.target.value as "original" | "jpg" | "png" | "webp")
                  }
                >
                  <option value="original">Same as input</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={preserveExif}
                    onChange={() => setPreserveExif(!preserveExif)}
                  />
                  <span className="text-sm text-gray-700">Preserve EXIF data</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={resizeEnabled}
                    onChange={() => setResizeEnabled(!resizeEnabled)}
                  />
                  <span className="text-sm text-gray-700">Resize if larger than</span>
                </label>
                <div className="flex space-x-2 pl-6">
                  <input
                    type="number"
                    placeholder="Width"
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    value={resizeWidth}
                    onChange={(e) => setResizeWidth(Number(e.target.value) || "")}
                    disabled={!resizeEnabled}
                    min={1}
                  />
                  <span className="text-gray-500">×</span>
                  <input
                    type="number"
                    placeholder="Height"
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    value={resizeHeight}
                    onChange={(e) => setResizeHeight(Number(e.target.value) || "")}
                    disabled={!resizeEnabled}
                    min={1}
                  />
                  <span className="text-gray-500">px</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
            onClick={compressAll}
            disabled={images.length === 0}
            type="button"
          >
            Compress Images
          </button>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Compression Queue</h2>
            <div className="space-y-4">
              {images.length === 0 && (
                <p className="text-gray-500">No images uploaded yet.</p>
              )}
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{img.file.name}</p>
                      <p className="text-sm text-gray-500">
                        Original: {(img.originalSize / (1024 * 1024)).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                    <span
                      className={`text-sm ${
                        img.status === "completed"
                          ? "text-green-500"
                          : img.status === "compressing"
                          ? "text-blue-500"
                          : img.status === "error"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {img.status.charAt(0).toUpperCase() + img.status.slice(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{
                        width:
                          img.status === "completed"
                            ? "100%"
                            : img.status === "compressing"
                            ? "60%"
                            : "0%",
                      }}
                    ></div>
                  </div>
                  {img.compressedSize !== undefined && img.status === "completed" && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        Compressed: {(img.compressedSize / 1024).toFixed(1)} KB (
                        {(
                          100 -
                          (img.compressedSize! / img.originalSize) * 100
                        ).toFixed(0)}
                        % reduction)
                      </p>
                    </div>
                  )}
                  {img.error && (
                    <p className="mt-2 text-sm text-red-600">Error: {img.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Compression Summary</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-500">
                  {(
                    images.reduce(
                      (acc, img) => acc + (img.originalSize - (img.compressedSize ?? 0)),
                      0
                    ) / (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </p>
                <p className="text-sm text-gray-600">Total Size Saved</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-500">
                  {images.length === 0
                    ? "0%"
                    : (
                        (images.reduce(
                          (acc, img) =>
                            acc +
                            ((img.originalSize - (img.compressedSize ?? img.originalSize)) /
                              img.originalSize) *
                              100,
                          0
                        ) /
                        images.length
                      ).toFixed(0))}
                  %
                </p>
                <p className="text-sm text-gray-600">Average Reduction</p>
              </div>
            </div>
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
              onClick={downloadAll}
              disabled={images.length === 0}
              type="button"
            >
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
