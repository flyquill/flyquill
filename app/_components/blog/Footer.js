import React from "react";

const Footer = () => {
  return (
    <div className="">
      <section
        id="contact"
        className="mt-14 bg-gray-800 rounded-2xl p-6 shadow-sm max-w-7xl mx-5 lg:mx-auto gap-8 px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-gray-300">
              Have a tip, want to collaborate, or want me to write about
              something specific? Send a message.
            </p>
          </div>
          <form className="space-y-3">
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-700"
              placeholder="Your name"
            />
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-700"
              placeholder="Email"
            />
            <textarea
              className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-700"
              placeholder="Message"
              rows={3}
            />
            <div className="text-right">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} BlueQuill — Built with ❤️ using Next.js
            & Tailwind.
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
