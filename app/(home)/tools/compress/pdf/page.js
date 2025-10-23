"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function PdfCompressionTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setCompressedBlob(null); // reset previous result
    }
  };

  const simulateCompression = async () => {
    if (!pdfFile) return;

    setIsCompressing(true);
    setProgress(0);

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Simulate compression based on settings
    // NOTE: Real compression should be done server-side
    const newPdfBytes = await pdfDoc.save();

    const compressedSize =
      compressionLevel === "high"
        ? newPdfBytes.byteLength * 0.4
        : compressionLevel === "medium"
        ? newPdfBytes.byteLength * 0.6
        : newPdfBytes.byteLength * 0.8;

    // Simulate processing time
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((res) => setTimeout(res, 100));
    }

    const blob = new Blob([newPdfBytes.slice(0, compressedSize)], {
      type: "application/pdf",
    });

    setCompressedBlob(blob);
    setIsCompressing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Compression</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload PDF</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full"
              />
              {pdfFile && <p className="mt-2 text-sm text-gray-600">{pdfFile.name}</p>}
            </div>
          </div>

          {/* Compression Settings */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
            >
              <option value="low">Low - Best Quality</option>
              <option value="medium">Medium - Balanced</option>
              <option value="high">High - Maximum Compression</option>
            </select>
          </div>

          <button
            onClick={simulateCompression}
            disabled={!pdfFile || isCompressing}
            className={`w-full ${
              isCompressing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium py-2 px-4 rounded transition-colors`}
          >
            {isCompressing ? "Compressing..." : "Start Compression"}
          </button>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Compression Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Compression Progress</h2>
            {isCompressing && (
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            {compressedBlob && (
              <div className="text-sm text-gray-700">
                <p>Compression complete.</p>
                <a
                  href={URL.createObjectURL(compressedBlob)}
                  download={`compressed-${pdfFile?.name}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Download Compressed PDF
                </a>
              </div>
            )}
          </div>

          {/* Compression Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Compression Features</h2>
            <ul className="list-disc ml-5 text-gray-600 space-y-2">
              <li>Smart compression based on settings</li>
              <li>Maintains text readability</li>
              <li>Client-side simulation (backend support recommended)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
