import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream font-sans">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-subtle bg-[rgba(244,247,252,0.9)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/Spark.png"
              alt="SparkEd"
              className="h-8 w-auto object-contain"
            />
            <span className="h-4 w-px bg-subtle hidden sm:block" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted hidden sm:block font-medium">
              Discovery Week
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[12px] text-muted">5 Days · 2 hrs/day</span>
            <span className="text-[12px] font-semibold text-navy bg-tint border border-subtle rounded-full px-3 py-1">
              KES 5,000
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="pt-10 pb-14 px-5 sm:pt-14 sm:pb-20 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-tint border border-subtle rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-bright shrink-0 animate-pulse" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-cobalt font-semibold">
                5-Day Immersive · Ages 8–15
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif leading-[1.1] mb-6">
              <span className="block text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px] font-semibold text-navy">
                Where curious kids
              </span>
              <span className="block text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px] font-semibold text-bright">
                become creators.
              </span>
            </h1>

            {/* Body */}
            <p className="text-[15px] sm:text-[16px] text-muted leading-[1.7] sm:leading-[1.8] mb-8 sm:mb-10 font-light max-w-110">
              In 5 hands-on days, your child builds games, apps, and interactive stories
             and experiments with AI. Every student leaves with real projects they can
              proudly share.
            </p>

            {/* Stats */}
            
          </div>

          {/* Right: Hero image */}
          <div className="block mt-8 md:mt-0">
            <div className="relative aspect-4/3 sm:aspect-4/3 rounded-2xl overflow-hidden flex items-center justify-center max-h-85 md:max-h-none">
              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#C5D5EC 1.5px, transparent 1.5px)",
                  backgroundSize: "30px 22px",
                  opacity: 0.18,
                  zIndex: 2,
                }}
              />
              {/* Actual image */}
              <img
                src="/photo_2026-03-16_15-56-35-removebg-preview.png"
                alt="SparkEd Discovery Week"
                className="w-full h-full object-cover object-center"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── About the Programme ───────────────────────────────── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-cobalt/40" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
              About the Programme
            </span>
            <div className="h-px w-8 bg-cobalt/40" />
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">

            {/* Left: body copy */}
            <div className="space-y-5 max-w-165">
              <p className="text-[15px] sm:text-[16px] text-charcoal leading-[1.75] sm:leading-[1.85] font-light">
                Today&apos;s children are growing up in a world shaped by technology and AI.{" "}
                <span className="font-semibold text-navy">SparkEd Discovery Week</span> is a
                5-day hands-on experience designed to help them explore the different paths in
                technology—from coding and game creation to apps and AI.
              </p>

              <p className="text-[15px] sm:text-[16px] text-charcoal leading-[1.75] sm:leading-[1.85] font-light">
                Rather than just learning, students will discover what excites them, build real
                projects, and begin to understand how technology works—removing the fear and
                confusion around it.
              </p>

              <p className="text-[15px] sm:text-[16px] text-charcoal leading-[1.75] sm:leading-[1.85] font-light">
                In five engaging sessions, your child will gain confidence, creativity, and
                clarity on where their interests lie, guided by experienced mentors in a fun
                and supportive environment.
              </p>

              <p className="text-[15px] sm:text-[16px] text-charcoal leading-[1.75] sm:leading-[1.85] font-light border-t border-subtle pt-5 mt-6">
                A small step that helps your child discover their place in the future of
                technology.{" "}
                <span role="img" aria-label="rocket">🚀</span>
              </p>
            </div>

            {/* Right: details card */}
            <div className="bg-surface border border-subtle rounded-2xl shadow-[0_4px_24px_rgba(11,30,61,0.07)] overflow-hidden lg:min-w-65">
              {/* Card header */}
              <div className="bg-navy px-6 py-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-bright/80 font-semibold mb-0.5">
                  Programme Details
                </p>
                <p className="text-[13px] text-white/60 font-light">April 2026 · Thika Town</p>
                <p className="text-[11px] text-white/40 font-light mt-0.5">Delib Institute, Alisa Plaza 6th Floor</p>
              </div>

              {/* Detail rows */}
              <ul className="divide-y divide-subtle">
                {[
                  { label: "Dates", value: "13th – 17th April" },
                  { label: "Duration", value: "2 Hours per Day" },
                  { label: "Investment", value: "KES 5,000" },
                  { label: "Location", value: "Delib Institute, Alisa Plaza 6th Floor, Thika Town" },
                ].map(({ label, value }) => (
                  <li key={label} className="px-6 py-4 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-bright mt-1.75 shrink-0" />
                    <div>
                      <p className="text-[10px] tracking-[0.14em] uppercase text-muted font-semibold mb-0.5">
                        {label}
                      </p>
                      <p className="text-[14px] text-navy font-medium">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-subtle" />
      </div>

      {/* ── Form ───────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:py-20">
        <div className="max-w-155 mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-cobalt/40" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
                Reserve a Spot
              </span>
              <div className="h-px w-8 bg-cobalt/40" />
            </div>
            <h2 className="font-serif text-[22px] sm:text-[26px] text-navy font-semibold mb-2">
              Secure your child&apos;s place.
            </h2>
            <p className="text-[14px] text-muted font-light">
              Spots are limited. The form takes under 3 minutes.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-subtle py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* SparkEd logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <img
              src="/Spark.png"
              alt="SparkEd"
              className="h-25 w-auto object-contain"
            />
            <p className="text-[11px] tracking-[0.12em] text-muted font-medium">
              SparkEd. The Future Sparked.
            </p>
          </div>

          <p className="text-[12px] text-muted text-center">
            © {new Date().getFullYear()} SparkEd. Empowering the next generation of creators.
          </p>

          {/* AfriBrain credit */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-muted tracking-wide">An Initiative by</span>
            <a
              href="https://afribs.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="/AfriBrain.png"
                alt="AfriBrain"
                className="h-25 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
