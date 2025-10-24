"use client";

import React, { useEffect, useState } from "react";

/**
 * Single Blog Post Page - Next.js (frontend only)
 * - Drop into app/post/[slug]/page.jsx or components/PostPage.jsx
 * - Tailwind CSS required. Dark theme supported out of the box.
 * - Replace `mockPost` with your CMS/API or MDX renderer as needed.
 * - Includes: reading progress bar, hero, meta, content, table of contents, related posts, share bar, comments placeholder.
 */

const mockPost = {
  slug: "how-to-build-beautiful-blogs-with-tailwind-nextjs",
  title: "How to build beautiful blogs with Tailwind & Next.js",
  cover: "https://picsum.photos/seed/postcover/1600/900",
  author: { name: "Ayesha Khan", avatar: null },
  date: "Oct 20, 2025",
  readTime: "6 min read",
  tags: ["nextjs", "tailwind", "blogging"],
  content: `
    <h2 id=\"why-tailwind\">Why Tailwind for blogging?</h2>
    <p>Tailwind gives you utility-first building blocks which make it fast to iterate and produce consistent UI patterns...</p>

    <h2 id=\"layout-patterns\">Layout patterns</h2>
    <p>Use a narrow readable measure for content and a responsive grid for wider screens...</p>

    <h3 id=\"accessibility\">Accessibility notes</h3>
    <p>Always prefer semantic HTML, provide alt text, and ensure sufficient color contrast...</p>

    <blockquote>Tip: Keep paragraphs short — 2–4 sentences — for reading on phones.</blockquote>

    <h2 id=\"conclusion\">Conclusion</h2>
    <p>Combine fast frameworks with sensible typographic scale and you have a blog readers will enjoy.</p>

    <p>lorem544</p>
  `,
};

export default function PostPage({ params }) {
  // params.slug would exist if used in app/post/[slug]/page.jsx - replace mock usage accordingly
  const [progress, setProgress] = useState(0);
  const [post] = useState(mockPost);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("post-content");
      if (!el) return setProgress(0);
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = window.scrollY - el.getBoundingClientRect().top + 100; // offset
      const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
      setProgress(isFinite(pct) ? Math.round(pct) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // simple table of contents derived from headers in the content HTML
  const toc = [
    { id: "why-tailwind", title: "Why Tailwind for blogging?" },
    { id: "layout-patterns", title: "Layout patterns" },
    { id: "accessibility", title: "Accessibility notes" },
    { id: "conclusion", title: "Conclusion" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div className="h-1 bg-indigo-500" style={{ width: `${progress}%`, transition: 'width 150ms linear' }} />
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <article className="prose prose-invert mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg mb-6">
            <div className="h-64 bg-gray-800" style={{ backgroundImage: `url(${post.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">{post.author.name.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-xs">{post.date} · {post.readTime}</div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight">{post.title}</h1>

          <div className="flex items-center gap-2 mt-3">
            {post.tags.map(t => (
              <span key={t} className="px-2 py-1 rounded-full text-xs bg-gray-800 border border-gray-700">#{t}</span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,240px] gap-8">
            <div id="post-content" className="reading-content">
              {/* Content: replace with MDX or safer renderer in production */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-invert max-w-none text-gray-200" />

              {/* Share / actions */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button className="px-3 py-2 rounded-md bg-indigo-600 text-white">Follow author</button>
                  <button className="px-3 py-2 rounded-md border border-gray-700">Save</button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Share:</span>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="underline">Twitter</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window?.location?.href ?? '')}`} target="_blank" rel="noreferrer" className="underline">Facebook</a>
                </div>
              </div>

              {/* Comments placeholder */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg">Comments</h3>
                <div className="mt-4 border border-gray-800 rounded-md p-4 text-gray-400">Comments are disabled in this demo. Plug in Disqus, Giscus, or your own system here.</div>
              </div>
            </div>

          </div>
        </article>
      </main> 
    </div>
  );
}
