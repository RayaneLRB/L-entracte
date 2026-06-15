import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionTitle({ subtitle, title, description, light = false }: SectionTitleProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="text-center mb-16 md:mb-20">
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-8 h-px bg-brand-gold/40" />
          <span className="text-[11px] tracking-[0.4em] uppercase text-brand-gold font-sans font-light">
            {subtitle}
          </span>
          <div className="w-8 h-px bg-brand-gold/40" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15 }}
        className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.08em] mb-4 ${
          light ? 'text-brand-dark' : 'text-brand-ivory'
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-16 h-px bg-brand-gold mx-auto mb-6"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light ${
            light ? 'text-brand-charcoal/70' : 'text-brand-ivory/50'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
