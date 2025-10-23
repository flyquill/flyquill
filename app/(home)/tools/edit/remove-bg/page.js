"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import {
  store,
  setOriginalImage,
  toggleDetectionSetting,
  setProcessedImage,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "@/app/tools/edit/remove-bg/store";

function RemoveBackgroundInner() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { originalImage, detectionSettings, processedImage, loading } = useAppSelector(
    (state) => state.removeBackground
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setOriginalImage(reader.result as string));
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const toggleSetting = (key: keyof typeof detectionSettings) => {
    dispatch(toggleDetectionSetting(key));
  };

  const removeBackground = () => {
    if (!originalImage) return alert("Please upload an image first.");

    dispatch(setLoading(true));

    const img = new Image();
    img.src = originalImage;
    img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);

        const processedDataUrl = canvas.toDataURL("image/png");
        dispatch(setProcessedImage(processedDataUrl));
        dispatch(setLoading(false));
    };
};

  const downloadImage = (type: "png" | "jpg") => {
    if (!processedImage) return alert("No processed image to download.");

    const link = document.createElement("a");
    link.download = `processed-image.${type}`;
    if (type === "jpg") {
      const img = new Image();
      img.src = processedImage;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        link.href = canvas.toDataURL("image/jpeg");
        link.click();
      };
    } else {
      link.href = processedImage;
      link.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Remove Background</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={openFileDialog}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileChange}
              />
              {originalImage ? (
                <img
                  src={originalImage}
                  alt="Uploaded"
                  className="mx-auto max-h-48 object-contain"
                />
              ) : (
                <>
                  <p className="text-gray-600">Drag and drop your image here, or click to select file</p>
                  <p className="text-sm text-gray-500 mt-2">Supported formats: PNG, JPG, JPEG</p>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Detection Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={detectionSettings.autoDetect}
                  onChange={() => toggleSetting("autoDetect")}
                />
                <span className="text-sm text-gray-700">Auto-detect subject</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={detectionSettings.enhancedEdge}
                  onChange={() => toggleSetting("enhancedEdge")}
                />
                <span className="text-sm text-gray-700">Enhanced edge detection</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={detectionSettings.keepShadows}
                  onChange={() => toggleSetting("keepShadows")}
                />
                <span className="text-sm text-gray-700">Keep shadows</span>
              </label>
            </div>
          </div>

          <button
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            onClick={removeBackground}
            disabled={loading}
          >
            {loading ? "Processing..." : "Remove Background"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Original</h3>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {originalImage ? (
                  <img
                    src={originalImage}
                    alt="Original"
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">Original image preview</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Result</h3>
              <div
                className="aspect-square rounded-lg flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: "url('/checkered-bg.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "20px 20px",
                }}
              >
                {processedImage ? (
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="object-contain max-h-full max-w-full"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">Processed image preview</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
              onClick={() => downloadImage("png")}
              disabled={!processedImage}
            >
              Download PNG with Transparency
            </button>
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
              onClick={() => downloadImage("jpg")}
              disabled={!processedImage}
            >
              Download as JPG (White Background)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RemoveBackgroundTool() {
  return (
    <Provider store={store}>
      <RemoveBackgroundInner />
    </Provider>
  );
}
