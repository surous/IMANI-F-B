import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-[#F8FAF9] text-[#1E293B]">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Trust-Powered Green Finance for African Farmers
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Imani transforms verified sustainable farming practices into
          reputation-based access to affordable green financing — powered by Cardano.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/auth"
            className="rounded-lg bg-[#1F7A5F] px-6 py-3 font-medium text-white hover:bg-[#17624C]"
          >
            Get Started
          </Link>

          <Link
            href="#how"
            className="rounded-lg border border-[#1F7A5F] px-6 py-3 font-medium text-[#1F7A5F]"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            How Imani Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              title="1. Submit Practices"
              text="Farmers submit verified climate-resilient farming practices through a simple mobile interface."
            />
            <Feature
              title="2. Earn Green Reputation"
              text="Practices are recorded on Cardano and converted into a sustainability reputation score."
            />
            <Feature
              title="3. Access Finance"
              text="Higher reputation unlocks lower-interest loans and green subsidies."
            />
          </div>
        </div>
      </section>

      {/* IMPACT / MOCK DATA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Real Impact, Real Change
          </h2>

          <div className="grid gap-8 text-center md:grid-cols-3">
            <Stat value="2,450+" label="Farmers Onboarded" />
            <Stat value="$180K+" label="Green Loans Issued" />
            <Stat value="32%" label="Average Interest Reduction" />
          </div>
        </div>
      </section>

      {/* WHY CARDANO */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Built on Cardano
          </h2>
          <p className="text-lg text-gray-600">
            Imani uses Cardano’s energy-efficient blockchain to ensure transparent,
            tamper-proof sustainability records while keeping costs low for farmers.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1F7A5F] py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Trust is the New Collateral
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/90">
          Join Imani and unlock fair access to green finance through verified impact.
        </p>

        <Link
          href="/auth"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-[#1F7A5F]"
        >
          Start Now
        </Link>
      </section>
    </main>
  )
}

/* ---------- Small Components ---------- */

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#F8FAF9] p-6">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-[#F8FAF9] p-6 shadow-sm">
      <p className="text-3xl font-bold text-[#1F7A5F]">{value}</p>
      <p className="mt-2 text-gray-600">{label}</p>
    </div>
  )
}
