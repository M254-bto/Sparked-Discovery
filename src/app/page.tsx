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
      <section className="pt-14 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-tint border border-subtle rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-bright flex-shrink-0 animate-pulse" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-cobalt font-semibold">
                5-Day Immersive · Ages 8–15
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif leading-[1.1] mb-6">
              <span className="block text-[38px] sm:text-[46px] lg:text-[54px] font-semibold text-navy">
                Where curious kids
              </span>
              <span className="block text-[38px] sm:text-[46px] lg:text-[54px] font-semibold text-bright">
                become creators.
              </span>
            </h1>

            {/* Body */}
            <p className="text-[16px] text-muted leading-[1.8] mb-10 font-light max-w-[440px]">
              In 5 hands-on days, your child builds games, apps, and interactive stories
             and experiments with AI. Every student leaves with real projects they can
              proudly share.
            </p>

            {/* Stats */}
            <div className="inline-flex divide-x divide-subtle border border-subtle rounded-xl overflow-hidden bg-surface shadow-[0_2px_16px_rgba(11,30,61,0.06)]">
              {[
                { value: "5", label: "Days" },
                { value: "2 hrs", label: "Per Day" },
                { value: "KES 5K", label: "Investment" },
              ].map((s) => (
                <div key={s.label} className="px-6 py-4 text-center min-w-[90px]">
                  <div className="font-serif text-[22px] text-navy font-semibold leading-none">{s.value}</div>
                  <div className="text-[9px] tracking-[0.16em] uppercase text-muted mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="hidden md:block">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center">
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

      {/* ── Divider ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-subtle" />
      </div>

      {/* ── Form ───────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-[620px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-cobalt/40" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
                Reserve a Spot
              </span>
              <div className="h-px w-8 bg-cobalt/40" />
            </div>
            <h2 className="font-serif text-[26px] text-navy font-semibold mb-2">
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
          {/* SparkEd logo */}
          <img
            src="/Spark.png"
            alt="SparkEd"
            className="h-25 w-auto object-contain"
          />

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
