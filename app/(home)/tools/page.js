"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const colorMap = {
  blue: "bg-blue-100 group-hover:bg-blue-200",
  purple: "bg-purple-100 group-hover:bg-purple-200",
  emerald: "bg-emerald-100 group-hover:bg-emerald-200",
  rose: "bg-rose-100 group-hover:bg-rose-200",
  red: "bg-red-100 group-hover:bg-red-200",
  indigo: "bg-indigo-100 group-hover:bg-indigo-200",
  pink: "bg-pink-100 group-hover:bg-pink-200",
  teal: "bg-teal-100 group-hover:bg-teal-200",
  violet: "bg-violet-100 group-hover:bg-violet-200",
  fuchsia: "bg-fuchsia-100 group-hover:bg-fuchsia-200",
  orange: "bg-orange-100 group-hover:bg-orange-200",
  cyan: "bg-cyan-100 group-hover:bg-cyan-200",
  lime: "bg-lime-100 group-hover:bg-lime-200",
  amber: "bg-amber-100 group-hover:bg-amber-200",
  sky: "bg-sky-100 group-hover:bg-sky-200",
  slate: "bg-slate-100 group-hover:bg-slate-200",
  green: "bg-green-100 group-hover:bg-green-200",
  yellow: "bg-yellow-100 group-hover:bg-yellow-200",
  stone: "bg-stone-100 group-hover:bg-stone-200"
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tools = {
    convert: [
      { id: "img-to-pdf", name: "Convert IMG to PDF", desc: "Quickly convert your images to PDF format with perfect quality.", icon: "/file.svg", color: "blue", link: "/tools/convert/img-to-pdf", status: "active" },
      { id: "jpg-to-png", name: "JPG to PNG", desc: "Seamlessly convert JPG images to PNG with transparency support.", icon: "/window.svg", color: "purple", link: "/tools/convert/jpg-to-png", status: "active" },
      { id: "png-to-jpg", name: "PNG to JPG", desc: "Convert PNG images to JPG format with custom quality settings.", icon: "/file.svg", color: "emerald", link: "/tools/convert/png-to-jpg", status: "active" },
      { id: "heic-to-jpg", name: "HEIC to JPG", desc: "Convert Apple HEIC photos to widely supported JPG format.", icon: "/window.svg", color: "rose", link: "/tools/convert/heic-to-jpg", status: "active" },
      { id: "url-shortner", name: "URL SHORTNER", desc: "Convert your long url links to a simple and easy readable url lins.", icon: "/window.svg", color: "rose", link: "/tools/convert/url-shortner", status: "active" }
    ],
    edit: [
      { id: "crop-resize", name: "Crop & Resize", desc: "Precisely crop and resize your images with our easy-to-use tool.", icon: "/window.svg", color: "red", link: "/tools/edit/crop-resize", status: "active" },
      { id: "text-extract", name: "Text Extraction", desc: "Extract text from images using advanced OCR technology.", icon: "/globe.svg", color: "indigo", link: "/tools/edit/text-extract", status: "active" },
      { id: "filters", name: "Image Filters", desc: "Apply professional filters and effects to enhance your images.", icon: "/window.svg", color: "pink", link: "/tools/edit/filters", status: "active" },
      { id: "watermark", name: "Add Watermark", desc: "Protect your images by adding custom text or logo watermarks.", icon: "/file.svg", color: "teal", link: "/tools/edit/watermark", status: "active" },
      { id: "remove-bg", name: "Remove Background", desc: "Remove image backgrounds with AI-powered precision.", icon: "/globe.svg", color: "violet", link: "#", status: "inactive" },
      { id: "color-adjust", name: "Color Adjustment", desc: "Fine-tune image colors, brightness, and contrast.", icon: "/window.svg", color: "fuchsia", link: "/tools/edit/color-adjust", status: "active" }
    ],
    organize: [
      { id: "batch", name: "Batch Processing", desc: "Process multiple files at once to save time and effort.", icon: "/file.svg", color: "orange", link: "/tools/organize/batch", status: "inactive" },
      { id: "cloud", name: "Cloud Storage", desc: "Securely store and access your files from anywhere, anytime.", icon: "/globe.svg", color: "cyan", link: "/tools/organize/cloud", status: "inactive" },
      { id: "metadata", name: "Edit Metadata", desc: "View and edit image metadata including EXIF information.", icon: "/window.svg", color: "lime", link: "/tools/organize/metadata", status: "active" },
      { id: "secure", name: "Secure Sharing", desc: "Share your files securely with password protection and expiry dates.", icon: "/file.svg", color: "amber", link: "/tools/organize/secure", status: "inactive" },
      { id: "folder", name: "Smart Folders", desc: "Organize files with AI-powered automatic categorization.", icon: "/globe.svg", color: "sky", link: "/tools/organize/folder", status: "inactive" },
      { id: "archive", name: "Archive Manager", desc: "Create and extract ZIP, RAR, and 7Z archives easily.", icon: "/file.svg", color: "slate", link: "/tools/organize/archive", status: "inactive" }
    ],
    compress: [
      { id: "compress-img", name: "Compress Images", desc: "Reduce image size without losing quality using smart algorithms.", icon: "/globe.svg", color: "green", link: "/tools/compress/image", status: "active" },
      { id: "compress-pdf", name: "Compress PDF", desc: "Optimize PDF files while maintaining document quality.", icon: "/file.svg", color: "yellow", link: "/tools/compress/pdf", status: "inactive" },
      { id: "compress-video", name: "Video Compression", desc: "Compress video files while maintaining quality.", icon: "/window.svg", color: "stone", link: "/tools/compress/video", status: "inactive" },
      { id: "compress-audio", name: "Audio Compression", desc: "Optimize audio files with custom quality settings.", icon: "/window.svg", color: "stone", link: "/tools/compress/audio", status: "inactive" }
    ]
  };

  const filterTools = () => {
    let filteredTools = [];
    if (activeTab === "all") {
      filteredTools = [...tools.convert, ...tools.edit, ...tools.organize, ...tools.compress];
    } else {
      filteredTools = tools[activeTab] || [];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query)
      );
    }

    return filteredTools;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-800">Transform Your Images with Ease</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">Powerful tools to convert, compress, and manage your images and PDFs in seconds.</p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors w-full sm:w-auto">Upload Files</button>
            <button className="bg-white hover:bg-gray-100 text-blue-500 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md border border-blue-200 transition-colors w-full sm:w-auto">Try Demo</button>
          </div>
        </section>

        {/* Search + Tabs */}
        <section className="mb-8 sm:mb-12">
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="relative">
              <input
                style={{ color: 'black' }}
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <svg className="absolute right-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2 sm:pb-0">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg whitespace-nowrap">
              {["all", "convert", "edit", "organize", "compress"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium ${activeTab === tab ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filterTools().map((tool) => (
              <Link key={tool.id} href={tool.link} className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center group">
                <div className={`p-3 sm:p-4 rounded-full mb-3 sm:mb-4 transition-colors ${colorMap[tool.color]}`}>
                  <Image src={tool.icon} alt={tool.name} width={24} height={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{tool.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{tool.desc}</p>
                <span className={`mt-3 sm:mt-4 text-${tool.status === 'active' ? 'blue' : 'red'}-500 text-sm sm:text-base font-medium group-hover:text-${tool.status === 'active' ? 'blue' : 'red'}-600`}>
                  {tool.status === 'active' ? 'Use Now →' : 'Coming Soon'}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm sm:text-base"
            >
              View All Tools
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-12 sm:mb-20 px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-12">
            <div className="md:flex items-center justify-between space-y-4 md:space-y-0">
              <div className="md:w-2/3">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">Daily Tasks Made Simple</h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">Our most popular tools help you accomplish your daily image and document tasks in seconds.</p>
              </div>
              <div>
                <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-colors text-sm sm:text-base w-full text-center sm:w-auto">
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
