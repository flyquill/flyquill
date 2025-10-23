'use client';

import { useState } from "react";
import exifr from "exifr";
import Image from "next/image";

export default function MetadataTool() {
  const [image, setImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    make: "",
    model: "",
    focalLength: "",
    fNumber: "",
    iso: "",
    exposureTime: "",
    latitude: "",
    longitude: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: value,
    }));
  };  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    // Preview
    const reader = new FileReader();
  
    reader.onload = async () => {
      setImage(reader.result as string);
  
      try {
        const exifData = await exifr.parse(file, true);
  
        const dateTime = exifData?.DateTimeOriginal instanceof Date
          ? exifData.DateTimeOriginal
          : null;
  
        setMetadata({
          title: "",
          description: "",
          date: dateTime ? dateTime.toISOString().split("T")[0] : "",
          time: dateTime ? dateTime.toISOString().split("T")[1]?.slice(0, 5) : "",
          make: exifData?.Make || "",
          model: exifData?.Model || "",
          focalLength: exifData?.FocalLength?.toString() || "",
          fNumber: exifData?.FNumber?.toString() || "",
          iso: exifData?.ISO?.toString() || "",
          exposureTime: exifData?.ExposureTime?.toString() || "",
          latitude: exifData?.latitude?.toString() || "",
          longitude: exifData?.longitude?.toString() || "",
          location: "",
        });
      } catch (err) {
        console.error("Error reading EXIF:", err);
        alert("Could not read EXIF metadata from the image.");
      }
    };
  
    reader.readAsDataURL(file);
  };  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Metadata</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="text-gray-600">Drag and drop your image here, or click to select file</p>
            </div>
          </div>

          <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            {image ? (
              <Image src={image} alt="Preview" className="object-contain max-h-full" />
            ) : (
              <p className="text-gray-500">Image preview will appear here</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">EXIF Information</h2>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.title} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea className="w-full border border-gray-300 rounded px-3 py-2 h-24" value={metadata.description} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date Taken</label>
                    <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.date} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Time Taken</label>
                    <input type="time" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.time} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Camera Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Camera Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Camera Make</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.make} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Camera Model</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.model} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Focal Length</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.focalLength} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">F-Number</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.fNumber} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">ISO</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.iso} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Exposure Time</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.exposureTime} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Location Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Latitude</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.latitude} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Longitude</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.longitude} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" value={metadata.location} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
                onClick={() => setMetadata({
                  title: "",
                  description: "",
                  date: "",
                  time: "",
                  make: "",
                  model: "",
                  focalLength: "",
                  fNumber: "",
                  iso: "",
                  exposureTime: "",
                  latitude: "",
                  longitude: "",
                  location: "",
                })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
