import Image from "next/image";
import Link from "next/link";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and site name */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="relative w-8 h-8 mr-2">
                                <div className="absolute top-0 right-0 w-5 h-5 bg-indigo-300 rounded-sm transform rotate-6"></div>
                                <div className="absolute bottom-0 left-0 w-5 h-5 bg-purple-300 rounded-sm transform -rotate-6"></div>
                                <div className="absolute inset-0 m-auto w-6 h-6 bg-white dark:bg-gray-800 rounded-sm flex items-center justify-center">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">FQ</span>
                                </div>
                            </div>
                            <span className="text-xl font-bold text-gray-800 dark:text-white">FlyQuill</span>
                        </Link>
                    </div>

                    {/* Navigation links - desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="#featured" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                            Featured
                        </Link>
                        <Link href="#categories" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                            Categories
                        </Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors">
                            Contact
                        </Link>
                        {/* Auth buttons */}
                        <SignedOut>
                            <SignInButton />
                            <SignUpButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* CTA and mobile menu button */}
                    <div className="flex items-center">
                        <Link
                            href="#newsletter"
                            className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            Subscribe
                        </Link>

                        {/* Mobile menu button */}
                        <button className="md:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (hidden by default) */}
            <div className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800">
                        Home
                    </Link>
                    <Link href="#featured" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800">
                        Featured
                    </Link>
                    <Link href="#categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800">
                        Categories
                    </Link>
                    <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800">
                        About
                    </Link>
                    <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-800">
                        Contact
                    </Link>
                    <Link href="#newsletter" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800">
                        Subscribe
                    </Link>
                </div>
            </div>
        </nav>
    );
}