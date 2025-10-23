"use client";

export default function BatchProcessingTool() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Batch Processing</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input type="file" className="hidden" multiple accept="image/*" />
              <p className="text-gray-600">Drag and drop your images here, or click to select files</p>
              <p className="text-sm text-gray-500 mt-2">You can select multiple files</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Processing Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Operation Type</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="resize">Resize Images</option>
                  <option value="convert">Convert Format</option>
                  <option value="watermark">Add Watermark</option>
                  <option value="compress">Compress Images</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Output Format</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="original">Keep Original</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Output Quality</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="85" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Lower quality</span>
                  <span>Higher quality</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Start Processing
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Processing Queue</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">image1.jpg</span>
                <span className="text-sm text-gray-500">Waiting...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">image2.jpg</span>
                <span className="text-sm text-gray-500">Waiting...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Processing Summary</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Total Files: 0</p>
              <p>Processed: 0</p>
              <p>Failed: 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}