import React from "react";
import { client, urlFor } from "../../../_src/sanity/client"; // Adjust path as needed
import { PortableText } from "@portabletext/react";
import Image from "next/image";

/**
 * Single Blog Post Page - Next.js (frontend only)
 * - Drop into app/post/[slug]/page.jsx or components/PostPage.jsx
 * - Tailwind CSS required. Dark theme supported out of the box.
 * - Replace `mockPost` with your CMS/API or MDX renderer as needed.
 * - Includes: reading progress bar, hero, meta, content, table of contents, related posts, share bar, comments placeholder.
 */

export default async function PostPage({ params }) {
  // params.slug would exist if used in app/post/[slug]/page.jsx - replace mock usage accordingly
  const { slug } = await params;
  const blog = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
          title,
          slug,
          description,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          author->{
            name,
            image
          },
          publishedAt
        }`,
    { slug: slug }
  )

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
      {/* <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div className="h-1 bg-indigo-500" style={{ width: `100%`, transition: 'width 150ms linear' }} />
      </div> */}

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <article className="prose prose-invert mx-auto">
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden shadow-lg mb-6 relative w-full h-64">
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title || "Blog cover image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
              priority
            />
          </div>

          {/* Author Section */}
          <div className="mb-4">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                {blog.author?.image ? (
                  <Image
                    src={urlFor(blog.author.image).url()}
                    alt={blog.author.name || "Author"}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xs text-gray-300">
                    {blog.author?.name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <div>
                <div className="font-medium">{blog.author.name}</div>
                <div className="text-xs">{blog.publishedAt}</div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight">{blog.title}</h1>

          {/* Optional Tags */}
          {/* 
    <div className="flex items-center gap-2 mt-3">
      {blog.tags?.map((t) => (
        <span key={t} className="px-2 py-1 rounded-full text-xs bg-gray-800 border border-gray-700">
          #{t}
        </span>
      ))}
    </div>
    */}

          {/* Content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr,240px] gap-8">
            <div id="post-content" className="reading-content">
              {/* Blog Body */}
              <PortableText
                value={blog.body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div className="relative w-full my-6 rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(value).url()}
                          alt={value.alt || "Blog image"}
                          width={800}
                          height={600}
                          className="object-contain w-full h-auto"
                        />
                      </div>
                    ),
                  },
                }}
              />
              {/* Actions */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    Follow author
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-700 hover:bg-gray-800 transition">
                    Save
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Share:</span>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg">Comments</h3>
                <div className="mt-4 border border-gray-800 rounded-md p-4 text-gray-400">
                  Comments are disabled in this demo. Plug in Disqus, Giscus, or your
                  own system here.
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

    </div>
  );
}
