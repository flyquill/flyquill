"use client";

export default function VideoCompressionTool() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Compression</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Video</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input type="file" className="hidden" accept="video/*" />
              <p className="text-gray-600">Drag and drop your video here, or click to select file</p>
              <p className="text-sm text-gray-500 mt-2">Supported formats: MP4, MOV, AVI, MKV</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Quality Preset</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="high">High Quality (Larger file)</option>
                  <option value="medium">Medium Quality (Balanced)</option>
                  <option value="low">Low Quality (Smaller file)</option>
                  <option value="custom">Custom Settings</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Output Format</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="mp4">MP4 (H.264)</option>
                  <option value="webm">WebM (VP9)</option>
                  <option value="mov">MOV</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Resolution</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="original">Original</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Bitrate Control</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="bitrate" className="mr-2" />
                    <span className="text-sm text-gray-700">Constant Bitrate (CBR)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="bitrate" className="mr-2" />
                    <span className="text-sm text-gray-700">Variable Bitrate (VBR)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Target Bitrate</label>
                <input type="range" className="w-full" min="500" max="8000" step="500" defaultValue="2000" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>500 Kbps</span>
                  <span>8000 Kbps</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Preserve audio quality</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Fast encoding (lower quality)</span>
                </label>
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Start Compression
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Compression Progress</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">vacation.mp4</p>
                    <p className="text-sm text-gray-500">Original: 1.2 GB</p>
                  </div>
                  <span className="text-sm text-green-500">Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Compressed: 320 MB (73% reduction)</p>
                  <p>Duration: 15:24 • Resolution: 1080p</p>
                </div>
                <div className="mt-3">
                  <button className="text-sm text-indigo-500 hover:text-indigo-600">Download</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">presentation.mp4</p>
                    <p className="text-sm text-gray-500">Original: 845 MB</p>
                  </div>
                  <span className="text-sm text-blue-500">Processing</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Time remaining: ~2 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Video Preview</h2>
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500">Video preview will appear here</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="font-medium mb-1">Original</h3>
                <p className="text-sm text-gray-500">1920×1080 • 1.2 GB</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-1">Compressed</h3>
                <p className="text-sm text-gray-500">1920×1080 • 320 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}