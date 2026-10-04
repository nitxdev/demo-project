"use client";

import { useState } from "react";
import type { Opportunity } from "@/types";

interface OpportunitiesCardProps {
  opportunity: Opportunity;
}

export default function OpportunitiesCard({
  opportunity,
}: OpportunitiesCardProps) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedOpportunities: string[] = JSON.parse(
      localStorage.getItem("savedOpportunities") || "[]"
    );

    return savedOpportunities.includes(opportunity._id || "");
  });

  function handleSave() {
    const savedOpportunities: string[] = JSON.parse(
      localStorage.getItem("savedOpportunities") || "[]"
    );

    if (saved) {
      const updated = savedOpportunities.filter(
        (id) => id !== opportunity._id
      );

      localStorage.setItem(
        "savedOpportunities",
        JSON.stringify(updated)
      );

      setSaved(false);
    } else {
      if (opportunity._id) {
        savedOpportunities.push(opportunity._id);
      }

      localStorage.setItem(
        "savedOpportunities",
        JSON.stringify(savedOpportunities)
      );

      setSaved(true);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {opportunity.category}
        </span>

        <span className="text-sm text-gray-500">
          Deadline:{" "}
          {new Date(opportunity.deadline).toLocaleDateString()}
        </span>
      </div>

      <h2 className="mb-2 text-xl font-bold text-gray-900">
        {opportunity.title}
      </h2>

      <p className="mb-3 text-sm font-medium text-gray-600">
        {opportunity.organization}
      </p>

      <p className="mb-4 text-gray-700">
        {opportunity.description}
      </p>

      {opportunity.branch.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {opportunity.branch.map((branch) => (
            <span
              key={branch}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {branch}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <a
          href={opportunity.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Apply Now
        </a>

        <button
          onClick={handleSave}
          className="rounded-lg border px-4 py-2 font-medium text-gray-900 hover:bg-slate-900 hover:text-white"
        >
          {saved ? "🔖 Saved" : "🔖 Save"}
        </button>
      </div>
    </div>
  );
}