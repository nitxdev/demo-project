import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Student Opportunity Platform
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Never Miss Your Next{" "}
            <span className="text-blue-500">
              Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Opportunity Hub brings internships, hackathons,
            scholarships, research opportunities and competitions
            together in one place.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/opportunities"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Opportunities
            </Link>

            <Link
              href="/signup"
              className="rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            One Place. Every Opportunity.
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-400">
            Students often discover opportunities through
            scattered WhatsApp groups, clubs, seniors and
            different websites. Opportunity Hub brings them
            together so students can discover and track them
            easily.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          What Opportunity Hub Offers
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-600">
            <div className="mb-4 text-3xl">🔎</div>

            <h3 className="text-xl font-bold text-white">
              Discover
            </h3>

            <p className="mt-2 text-slate-400">
              Find internships, hackathons, scholarships,
              research programs and competitions in one place.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-600">
            <div className="mb-4 text-3xl">🔖</div>

            <h3 className="text-xl font-bold text-white">
              Save
            </h3>

            <p className="mt-2 text-slate-400">
              Save interesting opportunities and access them
              later whenever you need them.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-600">
            <div className="mb-4 text-3xl">📅</div>

            <h3 className="text-xl font-bold text-white">
              Track Deadlines
            </h3>

            <p className="mt-2 text-slate-400">
              See important deadlines clearly so you can
              apply before opportunities expire.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to discover your next opportunity?
        </h2>

        <p className="mt-3 text-slate-400">
          Start exploring opportunities today.
        </p>

        <Link
          href="/opportunities"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore Now
        </Link>
      </section>
    </main>
  );
}