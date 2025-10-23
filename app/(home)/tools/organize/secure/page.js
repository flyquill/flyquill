"use client";

export default function SecureSharingTool() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Secure File Sharing</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Files</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input type="file" className="hidden" multiple />
              <p className="text-gray-600">Drag and drop your files here, or click to select files</p>
              <p className="text-sm text-gray-500 mt-2">Maximum file size: 2GB</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Security Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Password Protection</label>
                <div className="flex space-x-2">
                  <input 
                    type="password" 
                    placeholder="Enter password"
                    className="flex-1 border border-gray-300 rounded px-3 py-2" 
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded">
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Link Expiry</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Download Limit</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2">
                  <option value="unlimited">Unlimited</option>
                  <option value="1">1 download</option>
                  <option value="5">5 downloads</option>
                  <option value="10">10 downloads</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Email notification when downloaded</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Require email to download</span>
                </label>
              </div>
            </div>
          </div>

          <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors">
            Generate Secure Link
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Shared Files</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">project-files.zip</span>
                  <span className="text-sm text-green-500">Active</span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Expires in: 6 days</p>
                  <p>Downloads: 2/5</p>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-blue-500 hover:text-blue-600">Copy Link</button>
                  <button className="text-sm text-red-500 hover:text-red-600">Revoke Access</button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">presentation.pdf</span>
                  <span className="text-sm text-red-500">Expired</span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Expired: 2 days ago</p>
                  <p>Downloads: 3/3</p>
                </div>
                <div className="mt-3">
                  <button className="text-sm text-blue-500 hover:text-blue-600">Share Again</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-500">12</p>
                <p className="text-sm text-gray-600">Active Links</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-500">45</p>
                <p className="text-sm text-gray-600">Total Downloads</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}