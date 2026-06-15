import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';

export default function About() {
  const { ref: ref1, isVisible: v1 } = useScrollAnimation();
  const { ref: ref2, isVisible: v2 } = useScrollAnimation();
  const { data } = useSiteData();
  const { about, settings } = data;

  return (
    <section id="histoire" className="relative py-24 md:py-32 bg-brand-black overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_#c9a96e_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* First Row */}
        <div ref={ref1} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={v1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={about.image1}
                alt="Intérieur élégant"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-brand-gold/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-brand-gold/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={v1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-gold/40" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-brand-gold font-sans font-light">
                Notre Histoire
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-brand-ivory mb-6 leading-tight">
              {about.section1Title}
              <br />
              <span className="text-gradient-gold italic font-serif font-light">{about.section1Highlight}</span>
            </h2>

            <div className="w-12 h-px bg-brand-gold/40 mb-8" />

            <p className="text-brand-ivory/60 font-light leading-[1.9] text-sm md:text-base mb-6">
              {about.section1Text1}
            </p>

            <p className="text-brand-ivory/60 font-light leading-[1.9] text-sm md:text-base mb-8">
              {about.section1Text2}
            </p>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="block font-display text-3xl md:text-4xl font-semibold text-brand-gold">{settings.followersCount}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-ivory/40 font-light">Followers</span>
              </div>
              <div className="w-px h-12 bg-brand-gold/20" />
              <div className="text-center">
                <span className="block font-display text-3xl md:text-4xl font-semibold text-brand-gold">{settings.googleRating}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-ivory/40 font-light">Note Google</span>
              </div>
              <div className="w-px h-12 bg-brand-gold/20" />
              <div className="text-center">
                <span className="block font-display text-3xl md:text-4xl font-semibold text-brand-gold">∞</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-ivory/40 font-light">Moments</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row - Philosophy */}
        <div ref={ref2} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={v2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:order-2"
          >
            <div className="relative overflow-hidden">
              <img
                src={about.image2}
                alt="Mise en place élégante"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-brand-gold/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={v2 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-gold/40" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-brand-gold font-sans font-light">
                Notre Engagement
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-[0.05em] text-brand-ivory mb-6 leading-tight">
              {about.section2Title}
              <br />
              <span className="text-gradient-gold italic font-serif font-light">{about.section2Highlight}</span>
            </h3>

            <div className="w-12 h-px bg-brand-gold/40 mb-8" />

            <p className="text-brand-ivory/60 font-light leading-[1.9] text-sm md:text-base mb-6">
              {about.section2Text1}
            </p>

            <p className="text-brand-ivory/60 font-light leading-[1.9] text-sm md:text-base">
              {about.section2Text2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
