import { useState } from "react";
import { motion } from "framer-motion";
import WorldMap from "../ui/world-map";

const SHIPPING_BG =
  "https://images.pexels.com/photos/35458829/pexels-photo-35458829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1800";

// Exact standard geographic coordinates (lat, lng) of destinations
const MARKETS = [
  { code: "SA", name: "Saudi Arabia", role: "Middle East Hub", lat: 23.8859, lng: 45.0792, flag: "🇸🇦",
    detail: "Riyadh & Jeddah · 12,000 MT / yr" },
  { code: "AE", name: "United Arab Emirates", role: "Middle East", lat: 23.4241, lng: 53.8478, flag: "🇦🇪",
    detail: "Jebel Ali port · 8,500 MT / yr" },
  { code: "GB", name: "United Kingdom", role: "Europe", lat: 55.3781, lng: -3.4360, flag: "🇬🇧",
    detail: "Felixstowe · ethnic-grocery retail" },
  { code: "DE", name: "Germany", role: "Europe", lat: 51.1657, lng: 10.4515, flag: "🇩🇪",
    detail: "Hamburg · HoReCa channel" },
  { code: "US", name: "United States", role: "Americas", lat: 37.0902, lng: -95.7129, flag: "🇺🇸",
    detail: "NJ & TX · South-Asian diaspora" },
  { code: "NG", name: "Nigeria", role: "West Africa", lat: 9.0820, lng: 8.6753, flag: "🇳🇬",
    detail: "Lagos · Parboiled rice volumes" },
  { code: "ZA", name: "South Africa", role: "Africa", lat: -30.5595, lng: 22.9375, flag: "🇿🇦",
    detail: "Durban port · Basmati premium" },
  { code: "AU", name: "Australia", role: "Oceania", lat: -25.2744, lng: 133.7751, flag: "🇦🇺",
    detail: "Sydney · niche premium retail" },
];

const ORIGIN = { code: "IN", name: "Karnal, India", lat: 20.5937, lng: 78.9629 };

// Build dots array mapped with lat/lng coordinates and identity metadata for the lines animation
const MAP_DOTS = MARKETS.map((m) => ({
  start: { lat: ORIGIN.lat, lng: ORIGIN.lng },
  end: { lat: m.lat, lng: m.lng, code: m.code, name: m.name }
}));

export default function GlobalMap() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="global"
      data-testid="global-section"
      className="relative py-24 sm:py-32 bg-monsoon-charcoal text-chalk-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${SHIPPING_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "luminosity",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-monsoon-charcoal via-monsoon-charcoal/95 to-monsoon-charcoal pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 reveal">
            <p className="overline mb-6">Global Footprint</p>
            <div className="hairline mb-8" />
            <h2 className="font-serif text-chalk-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Twenty-eight{" "}
              <span className="italic text-basmati-gold whitespace-nowrap">
                {"ports.".split("").map((char, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <br />
              One trusted name.
            </h2>
            <p className="mt-8 text-chalk-white/65 leading-relaxed font-light">
              From Karnal to Riyadh, Hamburg to Lagos — our containers move steadily across
              every major shipping lane. Hover over the countries to explore active trade routes.
            </p>

            <div className="mt-10 space-y-3">
              {hovered ? (
                <div data-testid="market-detail" className="border-l-2 border-basmati-gold pl-5 py-2 animate-fade-up">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{hovered.flag}</span>
                    <span className="font-serif text-2xl text-chalk-white">{hovered.name}</span>
                  </div>
                  <p className="overline mt-2 !text-basmati-gold/90">{hovered.role}</p>
                  <p className="text-chalk-white/65 text-sm mt-3 font-light leading-relaxed">{hovered.detail}</p>
                </div>
              ) : (
                <div className="border-l-2 border-chalk-white/15 pl-5 py-2">
                  <p className="overline !text-chalk-white/50">Hover a market</p>
                  <p className="text-chalk-white/55 text-sm mt-2 font-light">
                    Discover volume, ports and channels for each destination.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-chalk-white/10 pt-8">
              <div>
                <div className="font-serif text-3xl text-basmati-gold leading-none">28+</div>
                <div className="mt-2 text-[9px] tracking-[0.22em] uppercase text-chalk-white/50 font-[Marcellus]">Countries</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-basmati-gold leading-none">4</div>
                <div className="mt-2 text-[9px] tracking-[0.22em] uppercase text-chalk-white/50 font-[Marcellus]">Continents</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-basmati-gold leading-none">99.6%</div>
                <div className="mt-2 text-[9px] tracking-[0.22em] uppercase text-chalk-white/50 font-[Marcellus]">On-time</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 reveal">
            <WorldMap
              dots={MAP_DOTS}
              lineColor="#D4AF37"
              onHover={(code) => {
                if (code) {
                  setHovered(MARKETS.find((m) => m.code === code));
                } else {
                  setHovered(null);
                }
              }}
              hoveredCode={hovered?.code}
            />

            {/* Market chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <button
                  key={m.code}
                  data-testid={`market-chip-${m.code}`}
                  onMouseEnter={() => setHovered(m)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(m)}
                  onBlur={() => setHovered(null)}
                  className={`px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase font-[Marcellus] border transition-colors ${
                    hovered?.code === m.code
                      ? "border-basmati-gold text-basmati-gold"
                      : "border-chalk-white/15 text-chalk-white/70 hover:border-chalk-white/40"
                  }`}
                >
                  <span className="mr-2">{m.flag}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
