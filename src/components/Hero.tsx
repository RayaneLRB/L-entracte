import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useParallax } from '../hooks/useScrollAnimation';
import { useMediaUrl } from '../hooks/useMediaUrl';

export default function Hero() {
  const scrollY = useParallax();
  const { data } = useSiteData();
  const { hero } = data;
  const videoUrl = useMediaUrl(hero.backgroundVideo);

  return (
    <section id="accueil" className="relative h-screen overflow-hidden">
      {/* Background Image/Video with Parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {hero.useVideo && hero.backgroundVideo ? (
          videoUrl ? (
            <video key={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover scale-110" src={videoUrl} />
          ) : (
            <img src={hero.backgroundImage} alt="L'ENTRACTE - Terrasse premium" className="w-full h-full object-cover scale-110" />
          )
        ) : (
          <img
            src={hero.backgroundImage}
            alt="L'ENTRACTE - Terrasse premium"
            className="w-full h-full object-cover scale-110"
          />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/30 to-brand-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 via-transparent to-brand-black/40" />
      
      {/* Decorative gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-brand-gold/60" />
          <span className="text-[11px] md:text-[12px] tracking-[0.5em] uppercase text-brand-gold/80 font-sans font-light">
            {hero.preTitle}
          </span>
          <div className="w-12 h-px bg-brand-gold/60" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-[0.15em] text-brand-ivory mb-6"
        >
          {hero.mainTitle}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="w-24 md:w-32 h-px bg-brand-gold mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-brand-beige-light/90 font-light mb-4"
        >
          {hero.tagline}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-xl text-sm md:text-base text-brand-ivory/50 font-light tracking-wide leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <a
            href="#carte"
            className="px-8 py-3.5 bg-brand-gold text-brand-black text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-gold-light transition-all duration-500"
          >
            Découvrir la Carte
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-brand-ivory/30 text-brand-ivory text-[12px] tracking-[0.2em] uppercase font-light hover:border-brand-gold hover:text-brand-gold transition-all duration-500"
          >
            Réserver une Table
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-brand-ivory/30 font-light">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-brand-gold/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
    </section>
  );
}
