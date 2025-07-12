import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  // Sample blog post data
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js framework.",
      author: "Jane Smith",
      date: "May 15, 2023",
      category: "Development",
      readTime: "5 min read",
      image: "/vercel.svg"
    },
    {
      id: 2,
      title: "The Art of Creative Writing",
      excerpt: "Discover techniques to improve your storytelling and engage readers.",
      author: "John Doe",
      date: "June 2, 2023",
      category: "Writing",
      readTime: "8 min read",
      image: "/vercel.svg"
    },
    {
      id: 3,
      title: "Productivity Hacks for Writers",
      excerpt: "Boost your writing output with these proven productivity techniques.",
      author: "Alex Johnson",
      date: "June 10, 2023",
      category: "Productivity",
      readTime: "6 min read",
      image: "/vercel.svg"
    }
  ];

  const categories = [
    "Writing", "Development", "Productivity", "Design", "Marketing", "Business"
  ];

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                FlyQuill
                <span className="block text-2xl md:text-3xl font-normal mt-2">Where Ideas Take Flight</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Discover thought-provoking articles, share your knowledge, and connect with a community of passionate writers.  
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#featured" 
                  className="bg-white text-indigo-700 hover:bg-indigo-50 transition-colors px-6 py-3 rounded-full font-medium text-center"
                >
                  Start Reading
                </a>
                <a 
                  href="#newsletter" 
                  className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-6 py-3 rounded-full font-medium text-center"
                >
                  Subscribe
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-indigo-300 rounded-lg transform rotate-6"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-purple-300 rounded-lg transform -rotate-6"></div>
                <div className="absolute inset-0 m-auto w-full h-full bg-white rounded-lg shadow-xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <Image
                      src="/file.svg"
                      alt="Blog illustration"
                      width={80}
                      height={80}
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-gray-800 text-xl font-semibold">FlyQuill Blog</h3>
                    <p className="text-gray-600 mt-2">Your daily source of inspiration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        {/* Featured Posts Section */}
        <section id="featured" className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Posts</h2>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">View All</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={60}
                      height={60}
                      className="opacity-50"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition-colors">
                    <a href={`#post-${post.id}`}>{post.title}</a>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Explore Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <a 
                key={index} 
                href={`#category-${category.toLowerCase()}`}
                className="bg-gray-100 hover:bg-indigo-100 text-center py-6 rounded-lg transition-colors"
              >
                <span className="font-medium">{category}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="bg-gray-100 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                Subscribe to our newsletter to receive the latest articles, writing tips, and exclusive content directly in your inbox.
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-3 w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-3">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
