"use client";

import { useEffect, useState } from "react";
import type { Opportunity } from "@/types";
import OpportunityCard from "@/components/OpportunitiesCard";
import SearchBar from "@/components/SearchBar";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch("/api/opportunities");
        const data = await response.json();

        if (data.success) {
          setOpportunities(data.opportunities);
        }
      } catch (error) {
        console.error("Failed to fetch opportunities", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchText = search.toLowerCase();

    return (
      opportunity.title.toLowerCase().includes(searchText) ||
      opportunity.organization.toLowerCase().includes(searchText) ||
      opportunity.category.toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return <p className="p-6">Loading opportunities...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Opportunities
      </h1>

      <div className="mb-6 max-w-xl">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      {filteredOpportunities.length === 0 ? (
        <p>No opportunities found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
            />
          ))}
        </div>
      )}
    </main>
  );
}