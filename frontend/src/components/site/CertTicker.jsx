const CERTS = [
  "ISO 9001:2015",
  "FSSAI Certified",
  "FDA Registered",
  "GMP Compliant",
  "APEDA Member",
  "HACCP Certified",
  "Halal Approved",
  "Kosher Verified",
];

export default function CertTicker() {
  const items = [...CERTS, ...CERTS];
  return (
    <div
      data-testid="cert-ticker"
      className="bg-chalk-white/95 backdrop-blur-md border-t border-monsoon-charcoal/10 py-5 overflow-hidden relative"
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-chalk-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-chalk-white to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {items.map((c, i) => (
          <div key={i} className="flex items-center gap-4 flex-shrink-0">
            <div className="w-1.5 h-1.5 bg-basmati-gold rounded-full" />
            <span className="font-[Marcellus] text-[11px] tracking-[0.28em] uppercase text-monsoon-charcoal/75">
              {c}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
