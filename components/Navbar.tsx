"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-blue-600"
        >
          Opportunity Hub
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/opportunities"
            className="text-gray-700 hover:text-blue-600"
          >
            Opportunities
          </Link>

          <Link
            href="/saved"
            className="text-gray-700 hover:text-blue-600"
          >
            Saved
          </Link>

          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}