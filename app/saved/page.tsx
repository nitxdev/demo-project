"use client";

import { useEffect, useState } from "react";
import type { Opportunity } from "@/types";
import OpportunitiesCard from "@/components/OpportunitiesCard";

export default function SavedPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedOpportunities() {
      try {
        const savedIds: string[] = JSON.parse(
          localStorage.getItem("savedOpportunities") || "[]"
        );

        const response = await fetch("/api/opportunities");
        const data = await response.json();

        if (data.success) {
          const saved = data.opportunities.filter(
            (opportunity: Opportunity) =>
              savedIds.includes(opportunity._id || "")
          );

          setOpportunities(saved);
        }
      } catch (error) {
        console.error("Failed to fetch saved opportunities", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedOpportunities();
  }, []);

  if (loading) {
    return <p className="p-6">Loading saved opportunities...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Saved Opportunities
      </h1>

      {opportunities.length === 0 ? (
        <p>No saved opportunities.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <OpportunitiesCard
              key={opportunity._id}
              opportunity={opportunity}
            />
          ))}
        </div>
      )}
    </main>
  );
}