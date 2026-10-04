"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  year: number;
  branch: string;
  interests: string[];
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-900 p-8 text-white">
        <h1 className="text-2xl font-bold">
          Please login first
        </h1>

        <Link
          href="/login"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          Welcome, {user.name} 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Find opportunities that match your profile.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-gray-900 shadow">
            <p className="text-sm text-gray-500">Branch</p>
            <h2 className="mt-2 text-xl font-bold">
              {user.branch}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 text-gray-900 shadow">
            <p className="text-sm text-gray-500">Year</p>
            <h2 className="mt-2 text-xl font-bold">
              {user.year}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 text-gray-900 shadow">
            <p className="text-sm text-gray-500">Role</p>
            <h2 className="mt-2 text-xl font-bold capitalize">
              {user.role}
            </h2>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 text-gray-900">
          <h2 className="text-xl font-bold">
            Your Interests
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/opportunities"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
          >
            Explore Opportunities
          </Link>

          <Link
            href="/saved"
            className="rounded-lg bg-white px-5 py-3 font-medium text-gray-900 hover:bg-gray-100"
          >
            Saved Opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}