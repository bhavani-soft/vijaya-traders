import { Leaf, Cog, Ship, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    body: "Long-standing relationships with farming cooperatives across Punjab, Haryana, and Uttar Pradesh — fair prices, traceable harvests.",
  },
  {
    icon: Cog,
    title: "Automated Milling",
    body: "State-of-the-art Satake & Buhler mills with optical sorters, ensuring grain integrity, uniform colour, and minimal broken percentage.",
  },
  {
    icon: Ship,
    title: "Global Logistics",
    body: "Container loading at JNPT, Mundra and Kandla ports — FCL & LCL shipments delivered to 28+ countries with full documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Stringent Quality",
    body: "Every lot passes moisture, aroma, length and purity tests in our NABL-accredited lab before it leaves the warehouse.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 sm:py-32 bg-chalk-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — story */}
          <div className="lg:col-span-5 reveal">
            <p className="overline mb-6">Our Heritage</p>
            <div className="hairline mb-8" />
            <h2 className="font-serif text-monsoon-charcoal text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Twenty-seven harvests.<br />
              <span className="italic text-paddy-green">One quiet promise.</span>
            </h2>
            <p className="mt-8 text-monsoon-charcoal/75 text-lg leading-relaxed font-light">
              Vijaya Traders began in 1998 with a single warehouse in Karnal, Haryana — the heart
              of India's Basmati belt. Three generations later, we are a fully integrated exporter
              with our own milling, sorting, and packaging facilities, supplying premium rice to
              importers from Riyadh to Rotterdam.
            </p>
            <p className="mt-6 text-monsoon-charcoal/70 leading-relaxed font-light">
              We don't chase volume. We chase grain — long, fragrant, and dependable, season
              after season. That is what keeps our buyers coming back.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-monsoon-charcoal/10 pt-8">
              <Stat number="27+" label="Years in Trade" />
              <Stat number="28" label="Export Markets" />
              <Stat number="40k MT" label="Annual Capacity" />
            </div>
          </div>

          {/* Right — pillars grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-monsoon-charcoal/10">
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  data-testid={`pillar-${p.title.toLowerCase().replace(" ", "-")}`}
                  className="bg-chalk-white p-8 sm:p-10 group hover:bg-white transition-colors duration-500 reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-12 h-12 border border-basmati-gold/40 flex items-center justify-center mb-6 group-hover:bg-basmati-gold group-hover:border-basmati-gold transition-colors duration-500">
                    <p.icon size={22} className="text-basmati-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-monsoon-charcoal mb-3">{p.title}</h3>
                  <p className="text-sm text-monsoon-charcoal/65 leading-relaxed font-light">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="font-serif text-3xl sm:text-4xl text-basmati-gold leading-none">{number}</div>
      <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-monsoon-charcoal/55 font-[Marcellus]">
        {label}
      </div>
    </div>
  );
}
