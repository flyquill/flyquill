"use client"

import React, { useState } from "react";
import Link from "next/link";

/**
 * Sidebar Component (reusable)
 * - Drop this in `components/Sidebar.jsx` and import into your layout or pages
 * - Designed to be usable "as-is" with the main blog page from the template
 *
 * Props:
 * - query, setQuery       : (optional) controlled search state
 * - page, setPage         : (optional) pagination helpers (used by Clear button)
 * - posts                 : (optional) array of posts to display in Popular section
 * - categories            : (optional) array of category strings
 * - tags                  : (optional) array of tag strings
 * - onSubscribe(email)    : (optional) callback when newsletter subscribe clicked
 * - className             : extra classes for the wrapper
 *
 * If you don't pass controlled props, the component will manage its own local state
 */

export default function Sidebar({
  query: qProp,
  setQuery: setQProp,
  page: pageProp,
  setPage: setPageProp,
  posts = [],
  categories = ["Design", "Development", "Product", "Business", "Tutorials"],
  tags = ["react", "nextjs", "tailwind", "design", "ux", "tutorial"],
  onSubscribe,
  className = "",
}) {
  const [localQuery, setLocalQuery] = useState("");
  const [email, setEmail] = useState("");

  // prefer controlled props if provided
  const query = qProp !== undefined ? qProp : localQuery;
  const setQuery = setQProp !== undefined ? setQProp : setLocalQuery;
  const setPage = setPageProp !== undefined ? setPageProp : () => {};

  const handleClear = () => {
    setQuery("");
    setPage(1);
  };

  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe(email);
    else alert(`Subscribed ${email} (demo)`);
    setEmail("");
  };

  const popular = posts.length ? posts.slice(0, 4) : Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    title: `Sample Blog Post ${i + 1}`,
    readTime: `${4 + i} min read`,
    date: `2025-0${i + 1}-0${i + 1}`,
    cover: `https://picsum.photos/seed/sidebar${i + 1}/200/120`,
  }));

  return (
    <aside className={`w-full lg:w-80 ${className} hidden md:block`}>
      <div className="sticky top-5 space-y-6 mt-5">
        <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
          <label className="text-sm text-gray-400">Search</label>
          <div className="mt-2 flex gap-2">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); }}
              className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-700 text-sm"
              placeholder="Search posts..."
            />
            <button onClick={handleClear} className="px-3 py-2 rounded-md border border-gray-700">Clear</button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold">Popular</h4>
          <ul className="mt-3 space-y-3">
            {popular.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <div className="w-12 h-8 rounded-md bg-gray-700" style={{ backgroundImage: `url('${p.cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="text-sm">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-gray-400">{p.readTime} · {p.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="categories" className="bg-gray-800 rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold">Categories</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => { /* you can wire this up */ }} className="px-3 py-1 text-sm rounded-full border border-gray-700">{c}</button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold">Tags</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map(t => (
              <button key={t} onClick={() => { /* you can wire this up */ }} className="px-3 py-1 text-sm rounded-md border border-gray-700">#{t}</button>
            ))}
          </div>
        </div>

        <div id="newsletter" className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl p-4 text-white">
          <h4 className="font-semibold">Stay in the loop</h4>
          <p className="text-sm opacity-90 mt-2">Subscribe for weekly updates. No spam, just good posts.</p>
          <div className="mt-3 flex gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 px-3 py-2 rounded-md text-black" />
            <button onClick={handleSubscribe} className="px-3 py-2 rounded-md bg-white text-indigo-700">Join</button>
          </div>
        </div>

        <div id="about" className="bg-gray-800 rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold">About the author</h4>
          <p className="text-sm mt-2 text-gray-300">I'm a developer who loves building interfaces and writing about the choices I make along the way.</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">AK</div>
            <div>
              <div className="font-medium">Ayesha Khan</div>
              <div className="text-xs text-gray-400">Writer & Developer</div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
