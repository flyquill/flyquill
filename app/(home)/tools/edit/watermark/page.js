"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function WatermarkTool() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("Sample Watermark");
  const [fontSize, setFontSize] = useState(24);
  const [opacity, setOpacity] = useState(50);
  const [positions, setPositions] = useState<string[]>(["Bottom Right"]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const allPositions = [
    "Top Left",
    "Top Center",
    "Top Right",
    "Center Left",
    "Center",
    "Center Right",
    "Bottom Left",
    "Bottom Center",
    "Bottom Right",
  ];

  const togglePosition = (pos: string) => {
    setPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyWatermark = () => {
    if (!imagePreview || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;

    canvas.width = image.width;
    canvas.height = image.height;

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = opacity / 100;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = "white";

      const textWidth = ctx.measureText(watermarkText).width;
      const padding = 10;

      positions.forEach((pos) => {
        let x = 0;
        let y = 0;

        switch (pos) {
          case "Top Left":
            x = padding;
            y = fontSize + padding;
            break;
          case "Top Center":
            x = (canvas.width - textWidth) / 2;
            y = fontSize + padding;
            break;
          case "Top Right":
            x = canvas.width - textWidth - padding;
            y = fontSize + padding;
            break;
          case "Center Left":
            x = padding;
            y = canvas.height / 2;
            break;
          case "Center":
            x = (canvas.width - textWidth) / 2;
            y = canvas.height / 2;
            break;
          case "Center Right":
            x = canvas.width - textWidth - padding;
            y = canvas.height / 2;
            break;
          case "Bottom Left":
            x = padding;
            y = canvas.height - padding;
            break;
          case "Bottom Center":
            x = (canvas.width - textWidth) / 2;
            y = canvas.height - padding;
            break;
          case "Bottom Right":
            x = canvas.width - textWidth - padding;
            y = canvas.height - padding;
            break;
        }

        ctx.fillText(watermarkText, x, y);
      });

      ctx.globalAlpha = 1;
    }
  };

  const downloadImage = (format: "png" | "jpg") => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `watermarked-image.${format}`;
    link.href =
      format === "png"
        ? canvasRef.current.toDataURL("image/png")
        : canvasRef.current.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Watermark</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block mx-auto"
              />
              <p className="text-gray-600">Drag and drop your image here, or click to select file</p>
            </div>
          </div>

          {imagePreview && (
            <>
              <Image
                ref={imageRef}
                src={imagePreview}
                onLoad={applyWatermark}
                alt="Preview"
                className="hidden"
              />
              <canvas ref={canvasRef} className="w-full rounded-lg border" />
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Watermark Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Watermark Text</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Font Size</label>
              <input
                type="range"
                className="w-full"
                min="12"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Opacity</label>
              <input
                type="range"
                className="w-full"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Positions</label>
              <div className="grid grid-cols-3 gap-2">
                {allPositions.map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => togglePosition(pos)}
                    className={`p-2 border rounded text-sm ${
                      positions.includes(pos)
                        ? "bg-teal-100 border-teal-500"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={applyWatermark}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Apply Watermark
            </button>

            <div className="flex space-x-2">
              <button
                onClick={() => downloadImage("png")}
                className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              >
                Download PNG
              </button>
              <button
                onClick={() => downloadImage("jpg")}
                className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Download JPG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
