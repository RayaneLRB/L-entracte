import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import { Clock } from 'lucide-react';

export default function Hours() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { settings } = data;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-charcoal/30 to-brand-dark" />

      <div className="relative max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-brand-gold/40" />
            <Clock size={18} className="text-brand-gold/60" />
            <div className="w-8 h-px bg-brand-gold/40" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.08em] text-brand-ivory mb-4">
            Nos Horaires
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 md:p-12"
        >
          {settings.schedule.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -15 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              className={`flex justify-between items-center py-4 border-b border-brand-ivory/5 last:border-0 ${
                item.highlight ? 'relative' : ''
              }`}
            >
              <span className={`font-display text-base md:text-lg tracking-wide ${
                item.highlight ? 'text-brand-gold font-medium' : 'text-brand-ivory/80'
              }`}>
                {item.day}
              </span>
              <div className="flex-1 mx-6 h-px bg-brand-ivory/5" />
              <span className={`font-sans text-sm md:text-base font-light tracking-wider ${
                item.highlight ? 'text-brand-gold' : 'text-brand-ivory/50'
              }`}>
                {item.hours}
              </span>
              {item.highlight && (
                <span className="ml-3 text-[9px] tracking-[0.15em] uppercase text-brand-gold/50 border border-brand-gold/20 px-2 py-0.5 hidden sm:inline">
                  Spécial
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-brand-ivory/25 text-[10px] tracking-[0.2em] uppercase font-light mt-6"
        >
          Horaires susceptibles de varier les jours fériés
        </motion.p>
      </div>
    </section>
  );
}
