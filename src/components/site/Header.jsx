import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Heritage", href: "#about" },
  { label: "Varieties", href: "#products" },
  { label: "Global Reach", href: "#global" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-chalk-white/85 border-b border-monsoon-charcoal/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#hero"
          data-testid="brand-logo"
          onClick={(e) => { e.preventDefault(); go("#hero"); }}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 border border-basmati-gold flex items-center justify-center">
            <span className="font-serif text-basmati-gold text-xl leading-none">V</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl text-monsoon-charcoal">Vijaya Traders</div>
            <div className="text-[10px] tracking-[0.28em] uppercase text-monsoon-charcoal/55 font-[Marcellus]">
              Rice Exports · Est. 1998
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.label.toLowerCase().replace(" ", "-")}`}
              onClick={(e) => { e.preventDefault(); go(n.href); }}
              className="text-sm tracking-wide text-monsoon-charcoal/75 hover:text-basmati-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          data-testid="header-quote-btn"
          onClick={() => go("#contact")}
          className="hidden md:inline-flex btn-gold !py-3 !px-6"
        >
          Request Quote
        </button>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-monsoon-charcoal"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-chalk-white border-t border-monsoon-charcoal/10 px-6 py-6 space-y-4">
          {NAV.map((n) => (
            <button
              key={n.href}
              data-testid={`mnav-${n.label.toLowerCase().replace(" ", "-")}`}
              onClick={() => go(n.href)}
              className="block w-full text-left text-monsoon-charcoal/80 tracking-wide"
            >
              {n.label}
            </button>
          ))}
          <button
            data-testid="mnav-quote-btn"
            onClick={() => go("#contact")}
            className="btn-gold w-full justify-center"
          >
            Request Quote
          </button>
        </div>
      )}
    </header>
  );
}
