"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !!localStorage.getItem("user");
  });

  function handleLogout() {
    localStorage.removeItem("user");
    setLoggedIn(false);
    window.location.href = "/";
  }

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

          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                href="/saved"
                className="text-gray-700 hover:text-blue-600"
              >
                Saved
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}