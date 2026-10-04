"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OpportunitiesForm from "@/components/OpportunitiesForm";
import type { Opportunity } from "@/types";

export default function AdminPage() {
  const router = useRouter();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (user.role !== "admin") {
        router.replace("/dashboard");
        return;
      }

      setAuthorized(true);
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;

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

    fetchOpportunities();
  }, [authorized]);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this opportunity?"
    );

    if (!confirmed) return;

    try {
      const user = localStorage.getItem("user");

      const response = await fetch(`/api/opportunities/${id}`, {
        method: "DELETE",
        headers: {
          "x-user": user || "",
        },
      });

      const data = await response.json();

      if (data.success) {
        setOpportunities((current) =>
          current.filter((opportunity) => opportunity._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete opportunity");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function makeAdmin() {
    if (!adminEmail.trim()) {
      setAdminMessage("Please enter an email");
      return;
    }

    try {
      const user = localStorage.getItem("user");

      const response = await fetch("/api/admin/make-admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user": user || "",
        },
        body: JSON.stringify({
          email: adminEmail,
        }),
      });

      const data = await response.json();

      setAdminMessage(data.message);

      if (data.success) {
        setAdminEmail("");
      }
    } catch (error) {
      console.error(error);
      setAdminMessage("Something went wrong");
    }
  }

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-900">
        <p className="text-white">Checking access...</p>
      </main>
    );
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

        {/* Assign Admin */}
        <div className="mb-8 rounded-xl bg-slate-800 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Assign Admin
          </h2>

          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter registered user email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="flex-1 rounded-lg border px-4 py-3"
            />

            <button
              onClick={makeAdmin}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Make Admin
            </button>
          </div>

          {adminMessage && (
            <p className="mt-3 text-sm text-white">
              {adminMessage}
            </p>
          )}
        </div>

        {/* Add Opportunity */}
        <OpportunitiesForm />

        {/* Existing Opportunities */}
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
                    onClick={() => {
                      if (opportunity._id) {
                        handleDelete(opportunity._id);
                      }
                    }}
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