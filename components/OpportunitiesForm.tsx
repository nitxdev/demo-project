"use client";

import { FormEvent, useState } from "react";

export default function OpportunityForm() {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [category, setCategory] = useState("Internship");
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [skills, setSkills] = useState("");
  const [deadline, setDeadline] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          organization,
          category,
          description,
          branch: branch
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          year: year
            .split(",")
            .map((item) => Number(item.trim()))
            .filter(Boolean),
          skills: skills
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          deadline,
          applyLink,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create opportunity");
        return;
      }

      setMessage("Opportunity created successfully!");

      setTitle("");
      setOrganization("");
      setCategory("Internship");
      setDescription("");
      setBranch("");
      setYear("");
      setSkills("");
      setDeadline("");
      setApplyLink("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-slate-800 p-6 shadow"
    >
      <input
        type="text"
        placeholder="Opportunity title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder:text-slate-400"
        required
      />

      <input
        type="text"
        placeholder="Organization"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder:text-slate-400"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
      >
        <option>Internship</option>
        <option>Hackathon</option>
        <option>Scholarship</option>
        <option>Research</option>
        <option>Workshop</option>
        <option>Fellowship</option>
        <option>Competition</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
        rows={4}
        required
      />

      <input
        type="text"
        placeholder="Branches (e.g. CSE, IT, ECE)"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
      />

      <input
        type="text"
        placeholder="Years (e.g. 2, 3, 4)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
      />

      <input
        type="text"
        placeholder="Skills (e.g. React, Java, Python)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
       className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
        required
      />

      <input
        type="url"
        placeholder="Application link"
        value={applyLink}
        onChange={(e) => setApplyLink(e.target.value)}
      className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white"
        required
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
      >
        Add Opportunity
      </button>

      {message && (
        <p className="text-center text-sm">
          {message}
        </p>
      )}
    </form>
  );
}