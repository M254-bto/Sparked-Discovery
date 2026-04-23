"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "254798159691";

const AVAILABLE_SLOTS = [
  "Monday (7 - 8 PM)",
  "Tuesday (7 - 8 PM)",
  "Wednesday (7 - 8 PM)",
  "Thursday (7 - 8 PM)",
  "Saturday (11:00 AM - 1:00 PM)",
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const handleWhatsAppRedirect = () => {
    if (selectedSlots.length !== 3) return;
    
    const slotsText = selectedSlots.join(", ");
    const message = `Hi, I’m interested in SparkEd Studio for my child. Time slots: ${slotsText}\nCan you share on how to get started?`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.location.href = url;
  };

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(prev => prev.filter(s => s !== slot));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots(prev => [...prev, slot]);
    }
  };

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-cream font-sans relative">

      {/* ── Modal ──────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-cream text-muted hover:text-navy hover:bg-tint transition-colors"
            >
              ✕
            </button>
            
            <h3 className="font-serif text-[24px] text-navy font-semibold mb-2">
              Choose your preferred times
            </h3>
            <p className="text-[15px] text-muted mb-6">
              Please select <strong className="text-navy font-semibold">three</strong> time slots that work best for your child.
            </p>

            <div className="space-y-3 mb-8">
              {AVAILABLE_SLOTS.map(slot => {
                const isSelected = selectedSlots.includes(slot);
                const isDisabled = !isSelected && selectedSlots.length >= 3;
                return (
                  <button
                    key={slot}
                    disabled={isDisabled}
                    onClick={() => toggleSlot(slot)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-bright bg-bright/5 text-navy' 
                        : isDisabled 
                          ? 'border-subtle bg-cream/50 text-muted/50 cursor-not-allowed'
                          : 'border-subtle hover:border-cobalt/50 bg-white text-charcoal'
                    }`}
                  >
                    <span className="font-medium text-[15px]">{slot}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-bright flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              disabled={selectedSlots.length !== 3}
              onClick={handleWhatsAppRedirect}
              className={`w-full flex justify-center items-center gap-2 py-4 rounded-xl font-medium transition-all ${
                selectedSlots.length === 3
                  ? 'bg-[#25D366] hover:bg-[#1DA851] text-white shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]'
                  : 'bg-subtle text-muted cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Continue to WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-subtle bg-[rgba(244,247,252,0.9)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/Spark.png" alt="SparkEd" className="h-8 w-auto object-contain" />
            <span className="h-4 w-px bg-subtle hidden sm:block" />
            <span className="text-[10px] tracking-[0.18em] uppercase text-muted hidden sm:block font-medium">
              Ongoing Tech Program
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[12px] text-muted">Ages 8–15</span>
            <button onClick={openModal} className="text-[12px] font-semibold text-white bg-bright hover:bg-cobalt transition-colors rounded-full px-4 py-1.5 shadow-sm cursor-pointer">
              Book Trial
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="pt-10 pb-14 px-5 sm:pt-14 sm:pb-20 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-tint border border-subtle rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-bright shrink-0 animate-pulse" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-cobalt font-semibold">
                SparkEd Studio · Ages 8–15
              </span>
            </div>

            <h1 className="font-serif leading-[1.1] mb-6">
              <span className="block text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px] font-semibold text-navy">
                Your child uses technology every day.
              </span>
              <span className="block text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] font-medium text-bright mt-2">
                Here, they learn how to create with it.
              </span>
            </h1>

            <p className="text-[15px] sm:text-[16px] text-muted leading-[1.7] sm:leading-[1.8] mb-6 font-light max-w-110">
              <strong className="font-semibold text-charcoal">Build games. Explore AI. Create apps.</strong><br/>
              All through fun, guided, hands-on sessions.
            </p>
            
            <div className="bg-white/60 border border-subtle rounded-xl p-4 mb-8 inline-block">
               <p className="text-[13px] text-charcoal font-medium">🔥 No prior experience needed.</p>
               <p className="text-[13px] text-muted mt-1">Beginner-friendly. Small groups.</p>
            </div>

            <div>
              <button onClick={openModal} className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-medium rounded-full px-6 sm:px-8 py-3.5 transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] cursor-pointer">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Book a Trial Session on WhatsApp
              </button>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="block mt-8 md:mt-0">
            <div className="relative aspect-4/3 sm:aspect-4/3 rounded-2xl overflow-hidden flex items-center justify-center max-h-85 md:max-h-none border border-subtle/50 shadow-[0_4px_24px_rgba(11,30,61,0.07)]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#C5D5EC 1.5px, transparent 1.5px)",
                  backgroundSize: "30px 22px",
                  opacity: 0.18,
                  zIndex: 2,
                }}
              />
              <img
                src="/photo_2026-03-16_15-56-35-removebg-preview.png"
                alt="SparkEd Tech Program"
                className="w-full h-full object-cover object-center bg-white"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ───────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-white border-y border-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] text-navy font-semibold mb-6 leading-tight">
            Most children today are very comfortable with technology…<br/>
            <span className="text-muted">but very few understand how it works.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-charcoal leading-[1.8] font-light mb-8">
            They scroll. They play. They watch.<br/>
            <span className="font-medium text-navy">But they don’t build.</span><br/><br/>
            And the longer that gap exists, the harder it becomes to close.
          </p>
          <button onClick={openModal} className="inline-flex items-center justify-center gap-2 text-cobalt font-medium hover:text-bright transition-colors bg-tint px-6 py-2.5 rounded-full cursor-pointer">
            👉 Chat with us on WhatsApp to get your child started
          </button>
        </div>
      </section>

      {/* ── Solution Section ──────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-cobalt/40" />
                <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
                  The Solution
                </span>
                <div className="h-px w-8 bg-cobalt/40" />
              </div>
              <h2 className="font-serif text-[28px] sm:text-[36px] text-navy font-semibold mb-6 leading-tight">
                SparkEd Studio is where children move from using technology to creating with it.
              </h2>
              <p className="text-[16px] text-muted mb-8 font-light leading-[1.8]">
                Through weekly sessions, your child will:
              </p>
              <ul className="space-y-4">
                {[
                  "Build simple games",
                  "Experiment with Artificial Intelligence (AI)",
                  "Create apps and interactive projects",
                  "Discover what they actually enjoy in tech"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[16px] text-charcoal bg-white px-5 py-3 rounded-xl border border-subtle shadow-sm">
                    <span className="text-bright text-lg">▶</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual element */}
            <div className="bg-tint rounded-3xl p-8 border border-subtle relative overflow-hidden h-full flex flex-col justify-center min-h-[360px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-bright/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cobalt/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
                <div className="relative z-10 space-y-6">
                    <div className="bg-white rounded-2xl p-5 shadow-md border border-white/50 transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center text-2xl">🎮</div>
                            <div>
                                <h4 className="text-[15px] font-semibold text-navy">Game Design</h4>
                                <p className="text-[13px] text-muted mt-0.5">Building logic and creativity</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-md border border-white/50 transform hover:-translate-y-1 transition-transform ml-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center text-2xl">🤖</div>
                            <div>
                                <h4 className="text-[15px] font-semibold text-navy">AI Exploration</h4>
                                <p className="text-[13px] text-muted mt-0.5">Understanding the future</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-md border border-white/50 transform hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-tint flex items-center justify-center text-2xl">📱</div>
                            <div>
                                <h4 className="text-[15px] font-semibold text-navy">App Creation</h4>
                                <p className="text-[13px] text-muted mt-0.5">Solving real-world problems</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How it works & Gains ──────────────────────────────── */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 bg-white border-y border-subtle">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* How it works */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
                How It Works
              </span>
              <div className="h-px w-8 bg-cobalt/40" />
            </div>
            <h2 className="font-serif text-[28px] sm:text-[36px] text-navy font-semibold mb-8">
              Simple and flexible
            </h2>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-tint flex items-center justify-center text-cobalt text-[14px] font-bold mt-0.5 shrink-0 border border-subtle/50">1</div>
                <div>
                  <p className="text-[16px] text-charcoal font-medium">1-hour sessions</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-tint flex items-center justify-center text-cobalt text-[14px] font-bold mt-0.5 shrink-0 border border-subtle/50">2</div>
                <div>
                  <p className="text-[16px] text-charcoal font-medium">Weekdays + Weekend options</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-tint flex items-center justify-center text-cobalt text-[14px] font-bold mt-0.5 shrink-0 border border-subtle/50">3</div>
                <div>
                  <p className="text-[16px] text-charcoal font-medium">Small groups for hands-on guidance</p>
                </div>
              </li>
            </ul>
            <div className="bg-cream p-5 rounded-xl border border-subtle mb-6">
               <p className="text-[15px] text-charcoal font-medium">
                 Start with a trial session, then continue with a monthly plan for consistent growth.
               </p>
            </div>
            <button onClick={openModal} className="inline-flex items-center gap-2 text-[14px] font-medium text-white bg-navy hover:bg-cobalt transition-colors rounded-full px-8 py-3 shadow-sm cursor-pointer">
              👉 Book your child’s first session
            </button>
          </div>

          {/* Gains */}
          <div className="bg-navy rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-bright/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            <div className="relative z-10">
               <h3 className="text-[12px] tracking-[0.2em] uppercase text-bright font-semibold mb-4">
                 Outcomes
               </h3>
               <h2 className="font-serif text-[28px] sm:text-[34px] text-white font-semibold mb-6">
                 What your child gains
               </h2>
               <p className="text-[15px] text-white/70 mb-8 font-light">
                 With consistent sessions, your child will:
               </p>
               <ul className="space-y-5">
                 {[
                   "Build real projects they can show",
                   "Gain confidence using technology",
                   "Start thinking creatively and logically",
                   "Discover their interests early",
                   "Move from consumer → creator"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0 mt-0.5">
                       <svg className="w-3.5 h-3.5 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                     </div>
                     <span className="text-[15px] text-white">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-24 px-5 sm:px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cobalt/40" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-cobalt font-semibold">
                Pricing
              </span>
              <div className="h-px w-8 bg-cobalt/40" />
            </div>
            <h2 className="font-serif text-[32px] sm:text-[42px] text-navy font-semibold mb-4">
              Clear & simple pricing
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto mb-12 items-stretch">
            {/* Trial */}
            <div className="bg-white rounded-3xl p-8 border border-subtle shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <h3 className="text-[20px] font-semibold text-navy mb-2">Trial Session</h3>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-[36px] font-bold text-charcoal leading-none">KES 800</span>
              </div>
              <p className="text-[15px] text-muted mb-8 font-light flex-grow">
                A single 1-hour session for your child to experience the program and build their first project.
              </p>
              <button onClick={openModal} className="w-full text-center py-3.5 rounded-xl border-2 border-navy text-navy font-medium hover:bg-navy hover:text-white transition-all cursor-pointer">
                Book Trial
              </button>
            </div>

            {/* Monthly */}
            <div className="bg-navy rounded-3xl p-8 shadow-xl relative flex flex-col transform sm:-translate-y-2">
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <span className="bg-bright text-white text-[11px] uppercase tracking-wider font-bold py-1.5 px-4 rounded-full shadow-md">
                  Recommended
                </span>
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2">Monthly Membership</h3>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-[36px] font-bold text-white leading-none">KES 4,000</span>
                <span className="text-white/60 text-[15px] mb-1"> / month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-bright/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[15px] text-white/90">Access to all weekly sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-bright/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-[15px] text-white/90">Best for consistency and progress</span>
                </li>
              </ul>
              <button onClick={openModal} className="w-full text-center py-3.5 rounded-xl bg-bright hover:bg-bright/90 text-white font-medium transition-colors shadow-lg cursor-pointer">
                Choose Monthly
              </button>
            </div>
          </div>
          
          <div className="bg-tint/50 border border-subtle rounded-2xl p-6 text-center max-w-2xl mx-auto">
             <p className="text-[15px] text-charcoal font-medium mb-4">
               Most parents choose the monthly plan so their child can build skills consistently.
             </p>
             <button onClick={openModal} className="inline-flex items-center justify-center gap-2 text-cobalt font-semibold hover:text-bright transition-colors text-[16px] cursor-pointer">
              👉 Book a trial session now on WhatsApp
             </button>
          </div>

        </div>
      </section>

      {/* ── Urgency & Location ────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-white border-y border-subtle">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] tracking-[0.1em] uppercase text-red-600 font-semibold">
                Limited Availability
              </span>
            </div>
            <h2 className="font-serif text-[28px] sm:text-[34px] text-navy font-semibold leading-tight">
              Sessions are kept small to ensure each child gets proper guidance.
            </h2>
            <p className="text-[16px] text-charcoal font-medium bg-tint inline-block px-4 py-2 rounded-lg border border-subtle">
              Limited spots available each week.
            </p>
          </div>

          <div className="bg-cream rounded-3xl p-8 border border-subtle shadow-sm">
            <h3 className="text-[12px] tracking-[0.2em] uppercase text-cobalt font-semibold mb-6">
              Location
            </h3>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-subtle">
                <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-[18px] font-semibold text-navy">📍 Delib Institute</p>
                <p className="text-[15px] text-muted mt-1">Alisa Plaza, 6th Floor</p>
                <p className="text-[15px] text-muted">Thika Town</p>
              </div>
            </div>
            <button onClick={openModal} className="w-full inline-flex justify-center items-center gap-2 py-3.5 rounded-xl bg-navy text-white text-[15px] font-medium hover:bg-cobalt transition-colors shadow-md cursor-pointer">
              👉 Get directions and book via WhatsApp
            </button>
          </div>

        </div>
      </section>

      {/* ── Final Close ───────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-6 bg-navy text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bright/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-[32px] sm:text-[46px] text-white font-semibold mb-8 leading-tight">
            You can’t control the future your child will grow into…<br/>
            <span className="text-white/80 italic font-medium">but you can prepare them for it.</span>
          </h2>
          <p className="text-[18px] sm:text-[20px] text-white/90 leading-[1.8] font-light mb-12">
            SparkEd Studio gives them a place to explore, build, and grow with technology — consistently.
          </p>
          <button onClick={openModal} className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-medium rounded-full px-10 py-4 text-[16px] transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:scale-105 cursor-pointer">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Book a Trial Session
          </button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-subtle py-10 px-6 bg-cream">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <img
              src="/Spark.png"
              alt="SparkEd"
              className="h-25 w-auto object-contain"
            />
            <p className="text-[11px] tracking-[0.12em] text-muted font-medium mt-1">
              SparkEd. The Future Sparked.
            </p>
          </div>

          <p className="text-[12px] text-muted text-center">
            © {new Date().getFullYear()} SparkEd. Empowering the next generation of creators.
          </p>

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

      {/* ── Floating WhatsApp Button ───────────────────────────── */}
      <button 
        onClick={openModal}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all hover:scale-105 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute right-full mr-4 bg-white text-charcoal text-[13px] font-medium py-2 px-3 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 pointer-events-none border border-subtle flex items-center gap-2">
          💬 Chat on WhatsApp
        </span>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </button>

    </main>
  );
}
