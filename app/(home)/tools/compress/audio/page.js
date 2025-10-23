"use client";

export default function AudioCompressionTool() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Audio Compression</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Audio</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input type="file" className="hidden" accept="audio/*" />
              <p className="text-gray-600">Drag and drop your audio file here, or click to select file</p>
              <p className="text-sm text-gray-500 mt-2">Supported formats: MP3, WAV, AAC, FLAC</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Output Format</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="mp3">MP3</option>
                  <option value="aac">AAC</option>
                  <option value="ogg">OGG</option>
                  <option value="wav">WAV</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Quality Preset</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="high">High Quality (320 kbps)</option>
                  <option value="medium">Medium Quality (192 kbps)</option>
                  <option value="low">Low Quality (128 kbps)</option>
                  <option value="custom">Custom Settings</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Bitrate</label>
                <input type="range" className="w-full" min="64" max="320" step="32" defaultValue="192" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>64 kbps</span>
                  <span>320 kbps</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Sample Rate</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="44100">44.1 kHz</option>
                  <option value="48000">48 kHz</option>
                  <option value="32000">32 kHz</option>
                  <option value="22050">22.05 kHz</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Convert to mono</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Normalize audio levels</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Remove silence</span>
                </label>
              </div>
            </div>
          </div>

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded transition-colors">
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
                    <p className="font-medium">podcast.mp3</p>
                    <p className="text-sm text-gray-500">Original: 85 MB</p>
                  </div>
                  <span className="text-sm text-green-500">Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Compressed: 32 MB (62% reduction)</p>
                  <p>Duration: 45:12 • Bitrate: 192 kbps</p>
                </div>
                <div className="mt-3">
                  <button className="text-sm text-pink-500 hover:text-pink-600">Download</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">music.wav</p>
                    <p className="text-sm text-gray-500">Original: 120 MB</p>
                  </div>
                  <span className="text-sm text-blue-500">Processing</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Time remaining: ~30 seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Audio Preview</h2>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Waveform visualization</p>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <button className="text-gray-600 hover:text-gray-800">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="font-medium mb-1">Original</h3>
                <p className="text-sm text-gray-500">WAV • 1411 kbps</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-1">Compressed</h3>
                <p className="text-sm text-gray-500">MP3 • 192 kbps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}