"use client";

import { useState, useRef, ChangeEvent } from "react";
import { jsPDF } from "jspdf";
import NextImage from "next/image";

export default function ImgToPdfTool() {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const readers: Promise<string>[] = fileArray.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject("Failed to read file");
            }
          };
          reader.onerror = () => reject("Error reading file");
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((base64Images) => {
      setImages((prev) => [...prev, ...base64Images]);
    });
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const getImageOrientation = (imgData: string): Promise<"portrait" | "landscape"> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const orientation = img.width > img.height ? "landscape" : "portrait";
        resolve(orientation);
      };
      img.src = imgData;
    });
  };

  const handleDownloadPDF = async () => {
    if (images.length === 0) return;

    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const orientation = await getImageOrientation(img);

      if (i === 0) {
        pdf.deletePage(1); // Remove default page
        pdf.addPage("a4", orientation);
      } else {
        pdf.addPage("a4", orientation);
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
    }

    pdf.save("converted-images.pdf");

    // ✅ Clear previous images and file input
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Convert IMG to PDF</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Images
          </label>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
            onClick={handleClickUpload}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="text-gray-600">
              Drag and drop your images here, or{" "}
              <span className="text-blue-600 underline">click to select files</span>
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <NextImage
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-full h-64 object-cover rounded border"
                />
                <button
                  onClick={() => handleDeleteImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded opacity-80 hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          onClick={handleDownloadPDF}
          disabled={images.length === 0}
        >
          Convert to PDF
        </button>
      </div>
    </div>
  );
}
