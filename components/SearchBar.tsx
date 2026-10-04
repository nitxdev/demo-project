"use client";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="flex w-full gap-3">
      <input
        type="text"
        placeholder="Search opportunities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={() => setSearch(search)}
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}