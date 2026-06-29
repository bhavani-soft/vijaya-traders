import { useState } from "react";

const BASMATI_IMG =
  "https://images.pexels.com/photos/7593252/pexels-photo-7593252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900";
const RAW_RICE_IMG =
  "https://images.pexels.com/photos/7421207/pexels-photo-7421207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900";
const JUTE_IMG =
  "https://images.unsplash.com/photo-1612676777268-24594d85b631?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85";

const TABS = [
  { key: "basmati", label: "Premium Basmati" },
  { key: "non-basmati", label: "Non-Basmati" },
  { key: "packaging", label: "Packaging Solutions" },
];

const BASMATI = [
  {
    name: "1121 Basmati",
    sub: "The Crown Jewel",
    image: BASMATI_IMG,
    variants: ["Steam", "Sella (Parboiled)", "Raw / White"],
    specs: { "Avg. Grain Length": "8.30 – 8.45 mm", "Moisture": "≤ 13.0%", "Broken": "≤ 1.0%", "Purity": "≥ 95%" },
  },
  {
    name: "1509 Basmati",
    sub: "Early-Harvest Aromatic",
    image: RAW_RICE_IMG,
    variants: ["Steam", "Sella", "Raw"],
    specs: { "Avg. Grain Length": "8.00 – 8.20 mm", "Moisture": "≤ 13.5%", "Broken": "≤ 1.5%", "Purity": "≥ 95%" },
  },
  {
    name: "1401 Basmati",
    sub: "Long-Grain Classic",
    image: BASMATI_IMG,
    variants: ["Steam", "Sella", "Raw"],
    specs: { "Avg. Grain Length": "7.80 – 8.00 mm", "Moisture": "≤ 13.0%", "Broken": "≤ 2.0%", "Purity": "≥ 94%" },
  },
  {
    name: "Pusa Basmati",
    sub: "Traditional Aroma",
    image: RAW_RICE_IMG,
    variants: ["Steam", "Sella", "Raw"],
    specs: { "Avg. Grain Length": "7.60 – 7.80 mm", "Moisture": "≤ 13.5%", "Broken": "≤ 2.0%", "Purity": "≥ 93%" },
  },
];

const NON_BASMATI = [
  {
    name: "IR64",
    sub: "Versatile Workhorse",
    image: RAW_RICE_IMG,
    variants: ["Parboiled", "Raw 5% / 25% Broken"],
    specs: { "Avg. Grain Length": "6.20 – 6.40 mm", "Moisture": "≤ 14.0%", "Broken": "5% / 25%", "Polish": "Double / Silky" },
  },
  {
    name: "PR11 / PR14",
    sub: "Sturdy & Reliable",
    image: BASMATI_IMG,
    variants: ["Sella", "Raw White"],
    specs: { "Avg. Grain Length": "6.80 – 7.00 mm", "Moisture": "≤ 13.5%", "Broken": "≤ 2.0%", "Purity": "≥ 95%" },
  },
  {
    name: "Parmal",
    sub: "Long & Slender",
    image: RAW_RICE_IMG,
    variants: ["Sella", "Raw 5% Broken"],
    specs: { "Avg. Grain Length": "6.50 – 6.80 mm", "Moisture": "≤ 14.0%", "Broken": "≤ 5%", "Polish": "Double" },
  },
  {
    name: "Sona Masoori",
    sub: "South Indian Favourite",
    image: BASMATI_IMG,
    variants: ["Raw", "Steam"],
    specs: { "Avg. Grain Length": "5.20 – 5.40 mm", "Moisture": "≤ 13.5%", "Broken": "≤ 2.0%", "Purity": "≥ 95%" },
  },
];

const PACKAGING = [
  {
    name: "Jute Bags",
    sub: "Traditional & Breathable",
    image: JUTE_IMG,
    variants: ["25 kg", "50 kg"],
    specs: { "Material": "Natural Jute, food-grade", "Lining": "PP / LDPE inner", "Print": "1–4 colour custom", "Strength": "≥ 110 lbs (CRT)" },
  },
  {
    name: "Non-Woven PP",
    sub: "Modern & Durable",
    image: JUTE_IMG,
    variants: ["5 kg", "10 kg", "25 kg"],
    specs: { "Material": "Non-woven Polypropylene", "GSM": "70 / 90 / 110", "Print": "Up to 8 colour gravure", "Stitch": "Double-stitched" },
  },
  {
    name: "BOPP Laminated",
    sub: "Retail-Ready Premium",
    image: JUTE_IMG,
    variants: ["1 kg", "5 kg", "10 kg"],
    specs: { "Material": "BOPP + PP woven", "Print": "8-colour photo-quality", "Finish": "Matte / Glossy", "Window": "Optional die-cut" },
  },
];

const DATA = { basmati: BASMATI, "non-basmati": NON_BASMATI, packaging: PACKAGING };

export default function Products() {
  const [tab, setTab] = useState("basmati");
  const items = DATA[tab];

  return (
    <section
      id="products"
      data-testid="products-section"
      className="relative py-24 sm:py-32 bg-white border-t border-monsoon-charcoal/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 reveal">
          <div className="max-w-2xl">
            <p className="overline mb-6">The Catalogue</p>
            <div className="hairline mb-8" />
            <h2 className="font-serif text-monsoon-charcoal text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              A grain for<br />
              <span className="italic text-paddy-green">every shore.</span>
            </h2>
          </div>
          <p className="text-monsoon-charcoal/70 max-w-md font-light leading-relaxed">
            Browse our complete export portfolio — fragrant Basmati, dependable non-Basmati varieties,
            and custom-printed packaging tailored to your retail or wholesale brand.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          data-testid="product-tabs"
          className="flex flex-wrap gap-2 border-b border-monsoon-charcoal/10 mb-12 reveal"
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              data-testid={`tab-${t.key}`}
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-4 font-[Marcellus] text-xs sm:text-sm tracking-[0.22em] uppercase transition-colors border-b-2 -mb-px ${
                tab === t.key
                  ? "text-basmati-gold border-basmati-gold"
                  : "text-monsoon-charcoal/55 border-transparent hover:text-monsoon-charcoal"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {items.map((it, i) => (
            <article
              key={it.name + i}
              data-testid={`product-card-${it.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group border border-monsoon-charcoal/10 hover:border-basmati-gold/50 bg-white transition-all duration-500 reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="grid grid-cols-5">
                <div className="col-span-2 aspect-square overflow-hidden bg-chalk-white">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  />
                </div>
                <div className="col-span-3 p-6 sm:p-8 flex flex-col">
                  <p className="overline !text-[10px]">{it.sub}</p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-monsoon-charcoal mt-2 mb-4">{it.name}</h3>

                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs flex-1">
                    {Object.entries(it.specs).map(([k, v]) => (
                      <div key={k} className="border-l-2 border-basmati-gold/30 pl-3">
                        <dt className="text-[9px] tracking-[0.2em] uppercase text-monsoon-charcoal/50 font-[Marcellus]">{k}</dt>
                        <dd className="text-monsoon-charcoal text-sm font-medium mt-0.5">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 pt-4 border-t border-monsoon-charcoal/10 flex flex-wrap gap-2">
                    {it.variants.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-paddy-green/8 text-paddy-green font-medium"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
