import Link from "next/link";
import React from "react";
import { client, urlFor } from "../../_src/sanity/client"; // Adjust path as needed
import { POSTS_QUERY } from "../../_src/sanity/lib/queries"; // Adjust path as needed
import Image from "next/image";

export default async function BlogLanding() {
  const blogs = await client.fetch(POSTS_QUERY);
  const page = 1;
  const totalPages = 2;

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
                  <h2 className="mt-2 text-3xl font-bold">{blogs[0].title}</h2>
                  <p className="mt-3 text-gray-300">A concise guide to creating fast, accessible, and SEO-friendly blogs using modern tools. Includes patterns for layouts, components, and theming.</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <div>By <strong>{blogs[0].author.name}</strong></div>
                    <div>·</div>
                    <div>{blogs[0].publishedAt}</div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Link href={`blog/${blogs[0].slug.current}`} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md">Read article</Link>
                    <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md">Save</a>
                  </div>
                </div>
              </div>
            </article>

            {/* Posts list */}
            <section id="posts">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Latest posts</h3>
                <div className="text-sm text-gray-400">Showing 7 results</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={urlFor(blog.mainImage).url()}
                        alt={blog.title || "Blog image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div>{blog.publishedAt}</div>
                      </div>

                      <h4 className="mt-2 font-semibold text-lg">{blog.title}</h4>
                      <p className="mt-2 text-gray-300 text-sm">{blog.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                            {blog.author?.image ? (
                              <Image
                                src={urlFor(blog.author.image).url()}
                                alt={blog.author.name || "Author"}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            ) : (
                              <span className="text-xs text-gray-300">
                                {blog.author?.name?.charAt(0) || "?"}
                              </span>
                            )}
                          </div>
                          <div className="text-sm">{blog.author.name}</div>
                        </div>

                        <Link
                          href={`/blog/${blog.slug.current}`}
                          className="text-indigo-500 text-sm hover:underline"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}

              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button className="px-3 py-2 rounded-md border border-gray-700">Prev</button>
                <div className="px-3 py-2 rounded-md">{page} / {totalPages}</div>
                <button className="px-3 py-2 rounded-md border border-gray-700">Next</button>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
