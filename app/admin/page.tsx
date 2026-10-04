"use client";

import { useEffect, useState } from "react";
import OpportunitiesForm from "@/components/OpportunitiesForm";
import type { Opportunity } from "@/types";

export default function AdminPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOpportunities() {
    try {
      const response = await fetch("/api/opportunities");
      const data = await response.json();

      if (data.success) {
        setOpportunities(data.opportunities);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setOpportunities((current) =>
          current.filter((opportunity) => opportunity._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Admin Panel
        </h1>

        <p className="mb-8 text-gray-400">
          Manage student opportunities.
        </p>

        <OpportunitiesForm />

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-white">
            Existing Opportunities
          </h2>

          {loading ? (
            <p className="text-gray-400">
              Loading opportunities...
            </p>
          ) : opportunities.length === 0 ? (
            <p className="text-gray-400">
              No opportunities found.
            </p>
          ) : (
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div
                  key={opportunity._id}
                  className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5"
                >
                  <div>
                    <h3 className="font-bold text-white">
                      {opportunity.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {opportunity.organization} •{" "}
                      {opportunity.category}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      opportunity._id &&
                      handleDelete(opportunity._id)
                    }
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}