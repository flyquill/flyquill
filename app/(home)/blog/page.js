"use client";

import React, { useEffect, useState } from "react";

/**
 * Next.js single-file Blog Landing Page (frontend only)
 * - Tailwind CSS required in the project
 * - Place this file in app/page.jsx (or components/BlogLanding.jsx and import it)
 * - Uses local mock data for posts; replace with props or a CMS/API as needed
 * - Dark theme is default, with a toggle (persists in localStorage)
 *
 * Features included:
 * - Responsive navbar with mobile menu
 * - Hero / Featured post
 * - Post list (cards) with tags, excerpt, author, date
 * - Sidebar: Search, Popular posts, Categories, Newsletter signup, Tags
 * - Pagination controls
 * - Footer
 */

const mockPosts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Sample Blog Post ${i + 1}`,
  excerpt:
    "This is a short summary of the article to give readers an idea what the post is about. Replace this with real content.",
  author: i % 2 === 0 ? "Ayesha Khan" : "Omer Raza",
  date: `2025-0${(i % 9) + 1}-0${(i % 27) + 1}`,
  readTime: `${4 + (i % 6)} min read`,
  tags: ["web", "tailwind", i % 2 ? "react" : "design"],
  cover: `https://picsum.photos/seed/blog${i + 1}/800/500`,
}));

export default function BlogLanding() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(mockPosts);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-200">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Hero / Featured */}
            <article className="mb-8 bg-gray-800 rounded-2xl overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:flex-1 p-6">
                  <div className="text-sm uppercase tracking-wide text-indigo-500">Featured</div>
                  <h2 className="mt-2 text-3xl font-bold">How to build beautiful blogs with Tailwind & Next.js</h2>
                  <p className="mt-3 text-gray-300">A concise guide to creating fast, accessible, and SEO-friendly blogs using modern tools. Includes patterns for layouts, components, and theming.</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <div>By <strong>Ayesha Khan</strong></div>
                    <div>·</div>
                    <div>Oct 20, 2025</div>
                    <div>·</div>
                    <div>6 min read</div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a href="#" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md">Read article</a>
                    <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md">Save</a>
                  </div>
                </div>
                <div className="md:w-1/3 md:h-full h-56 bg-gray-700" style={{ backgroundImage: `url('https://picsum.photos/seed/featured/900/700')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
            </article>

            {/* Posts list */}
            <section id="posts">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Latest posts</h3>
                <div className="text-sm text-gray-400">Showing {filtered.length} results</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paged.map((post) => (
                  <article key={post.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gray-700" style={{ backgroundImage: `url('${post.cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div>{post.date}</div>
                        <div>{post.readTime}</div>
                      </div>
                      <h4 className="mt-2 font-semibold text-lg">{post.title}</h4>
                      <p className="mt-2 text-gray-300 text-sm">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm">{post.author.split(' ').map(n => n[0]).join('')}</div>
                          <div className="text-sm">{post.author}</div>
                        </div>
                        <a href="#" className="text-indigo-500 text-sm">Read →</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-2 rounded-md border border-gray-700">Prev</button>
                <div className="px-3 py-2 rounded-md">{page} / {totalPages}</div>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-2 rounded-md border border-gray-700">Next</button>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
