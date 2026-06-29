import { ArrowRight, ChevronDown } from "lucide-react";
import CertTicker from "@/components/site/CertTicker";

const HERO_IMG =
  "https://images.pexels.com/photos/28093912/pexels-photo-28093912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=2000";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-monsoon-charcoal"
    >
      {/* Image background with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <img
          src={HERO_IMG}
          alt="Golden sunset over Indian paddy rice fields"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-monsoon-charcoal/55 via-monsoon-charcoal/45 to-monsoon-charcoal/85" />
      <div className="absolute inset-0 grain" />

      {/* Decorative corner */}
      <div className="absolute top-28 left-6 md:left-10 z-10 hidden md:flex items-center gap-4">
        <div className="w-10 h-px bg-basmati-gold/70" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-basmati-gold/90 font-[Marcellus]">
          From the soil of Bharat · Since 1998
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-4xl">
          <p className="overline !text-basmati-gold mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            Premium Indian Rice · Global Distribution
          </p>
          <h1
            data-testid="hero-headline"
            className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            From India's finest fields<br />
            <span className="italic text-basmati-gold/95 font-light">to the world's best tables.</span>
          </h1>
          <p
            className="mt-8 text-white/75 text-lg sm:text-xl max-w-2xl leading-relaxed font-light animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Three decades of patient harvests, automated milling, and trusted partnerships —
            delivering premium Basmati and non-Basmati rice to wholesalers across the Middle East,
            Europe, Africa and the Americas.
          </p>

          <div className="mt-12 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <button
              data-testid="hero-quote-btn"
              onClick={() => scrollTo("#contact")}
              className="btn-gold"
            >
              Request a Quote <ArrowRight size={16} />
            </button>
            <button
              data-testid="hero-explore-btn"
              onClick={() => scrollTo("#products")}
              className="btn-ghost-light"
            >
              Explore Our Varieties
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo("#about")}
        data-testid="hero-scroll-hint"
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-basmati-gold transition-colors hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.32em] uppercase font-[Marcellus]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>

      {/* Cert ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <CertTicker />
      </div>
    </section>
  );
}
