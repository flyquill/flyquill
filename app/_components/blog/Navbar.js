"use client"

import Link from 'next/link';
import React, { useState } from 'react'

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-gray-900">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">BQ</div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">BlueQuill Blog</h1>
              <p className="text-xs text-gray-400">Thoughts on design, dev & product</p>
            </div>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline">Services</Link>
          <a href="#posts" className="hover:underline">Posts</a>
          <a href="#categories" className="hover:underline">Categories</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#newsletter" className="ml-2 inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm shadow-sm">Subscribe</a>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setMobileMenu((m) => !m)} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Mobile menu */}
    {mobileMenu && (
      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="px-4 py-4 flex flex-col gap-2">
          <a href="#posts" className="py-2">Posts</a>
          <a href="#categories" className="py-2">Categories</a>
          <a href="#about" className="py-2">About</a>
          <a href="#contact" className="py-2">Contact</a>
          <a href="#newsletter" className="py-2">Subscribe</a>
        </div>
      </div>
    )}
  </header>
  )
}

export default Navbar