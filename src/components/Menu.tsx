import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import { useMediaUrl } from '../hooks/useMediaUrl';
import SectionTitle from './SectionTitle';
import { ChevronRight } from 'lucide-react';

export default function Menu() {
  const { data } = useSiteData();
  const { menu, menuSection } = data;
  const [active, setActive] = useState(menu[0]?.id || '');
  const { ref, isVisible } = useScrollAnimation();
  const currentCategory = menu.find((c) => c.id === active) || menu[0];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view within the horizontal container only
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + (btnRect.left - containerRect.left) - (containerRect.width / 2) + (btnRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [active]);

  const bgVideoUrl = useMediaUrl(menuSection.backgroundVideo);

  if (!currentCategory) return null;

  return (
    <section id="carte" className="relative py-24 md:py-32 bg-brand-black overflow-hidden">
      {/* Background - Video or Image */}
      {menuSection.useVideo && menuSection.backgroundVideo && bgVideoUrl ? (
        <div className="absolute inset-0 opacity-20">
          <video key={bgVideoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" src={bgVideoUrl} />
          <div className="absolute inset-0 bg-brand-black/80" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-gold blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-brand-gold blur-[100px]" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle={menuSection.subtitle}
          title={menuSection.title}
          description={menuSection.description}
        />

        {/* Category Tabs — Scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar gap-2 md:gap-2.5 mb-14 md:mb-16 pb-2 md:justify-center"
        >
          {menu.map((cat) => (
            <button
              key={cat.id}
              data-active={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={`shrink-0 px-4 md:px-5 py-2.5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-light transition-all duration-500 border whitespace-nowrap ${
                active === cat.id
                  ? 'bg-brand-gold text-brand-black border-brand-gold font-medium'
                  : 'bg-transparent text-brand-ivory/50 border-brand-ivory/10 hover:border-brand-gold/40 hover:text-brand-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero image for category */}
            <div ref={ref} className="relative overflow-hidden mb-12 md:mb-16 h-[220px] md:h-[320px]">
              <img
                src={currentCategory.image}
                alt={currentCategory.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/40 to-brand-black/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-brand-gold/25" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-brand-gold/25" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-brand-gold/25" />
            </div>

            {/* Sub-sections layout */}
            <div className={`${
              currentCategory.subSections.length > 1 && currentCategory.id !== 'asiatique'
                ? 'grid md:grid-cols-2 gap-x-12 gap-y-10'
                : currentCategory.id === 'asiatique'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10'
                  : 'max-w-3xl mx-auto'
            }`}>
              {currentCategory.subSections.map((sub) => (
                <div key={sub.id}>
                  {sub.title && (
                    <div className="flex items-center gap-3 mb-6">
                      <ChevronRight size={14} className="text-brand-gold/60" />
                      <h3 className="font-display text-lg md:text-xl font-medium text-brand-gold tracking-wide">
                        {sub.title}
                      </h3>
                      <div className="flex-1 h-px bg-brand-gold/10" />
                    </div>
                  )}
                  {sub.note && (
                    <p className="text-brand-gold/40 text-[10px] tracking-[0.15em] uppercase font-light mb-4 border border-brand-gold/10 inline-block px-3 py-1">
                      {sub.note}
                    </p>
                  )}
                  <div>
                    {sub.items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
                        className="group py-4 border-b border-brand-ivory/[0.04] last:border-0"
                      >
                        <div className="flex justify-between items-start gap-3 mb-1">
                          <h4 className="font-display text-[15px] md:text-base font-medium text-brand-ivory/90 group-hover:text-brand-gold transition-colors duration-300 tracking-wide leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-display text-sm md:text-[15px] text-brand-gold/80 font-semibold shrink-0 tabular-nums">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-brand-ivory/30 text-[11px] md:text-xs font-light leading-relaxed pr-16">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footnote */}
            {currentCategory.footNote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 text-center"
              >
                <p className="text-brand-ivory/25 text-[11px] md:text-xs font-light italic leading-relaxed max-w-2xl mx-auto">
                  {currentCategory.footNote}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-brand-ivory/20 text-[10px] tracking-[0.15em] uppercase font-light mt-16 pt-8 border-t border-brand-ivory/[0.04]"
        >
          Menu sous réserve de disponibilité · Prix en Dinar Algérien
        </motion.p>
      </div>
    </section>
  );
}
