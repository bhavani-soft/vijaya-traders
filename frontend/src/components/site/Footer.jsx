export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="bg-monsoon-charcoal text-chalk-white/70 relative">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 border border-basmati-gold flex items-center justify-center">
                <span className="font-serif text-basmati-gold text-xl leading-none">V</span>
              </div>
              <div>
                <div className="font-serif text-2xl text-chalk-white">Vijaya Traders</div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-chalk-white/50 font-[Marcellus]">
                  Premium Rice · Global Exports
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed font-light">
              A trusted name in Indian rice exports since 1998 — connecting the finest paddy fields
              of North India to discerning wholesalers and distributors around the world.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="overline mb-5 !text-chalk-white/60">Explore</p>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-basmati-gold transition-colors">Heritage</a></li>
              <li><a href="#products" className="hover:text-basmati-gold transition-colors">Product Catalogue</a></li>
              <li><a href="#global" className="hover:text-basmati-gold transition-colors">Global Footprint</a></li>
              <li><a href="#contact" className="hover:text-basmati-gold transition-colors">Request a Quote</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="overline mb-5 !text-chalk-white/60">Reach Us</p>
            <ul className="space-y-3 text-sm font-light">
              <li>Plot 14, Industrial Area</li>
              <li>Karnal, Haryana 132001, India</li>
              <li>exports@vijayatraders.com</li>
              <li>+91 184 4055 200</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-chalk-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-chalk-white/45">
          <p className="font-[Marcellus] tracking-[0.18em] uppercase">© {year} Vijaya Traders Pvt. Ltd. · All rights reserved</p>
          <p className="font-light">Karnal · Mumbai · Mundra · Hamburg · Riyadh · Lagos</p>
        </div>
      </div>
    </footer>
  );
}
