import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import SectionTitle from './SectionTitle';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { reviews, settings } = data;

  return (
    <section id="avis" className="relative py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Témoignages"
          title="Ce Qu'ils Disent"
          description="Les mots de nos clients sont notre plus belle récompense. Découvrez les expériences partagées par ceux qui ont vécu l'instant L'ENTRACTE."
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-brand-gold/30 transition-all duration-500"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-brand-gold/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-brand-gold fill-brand-gold" />
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-brand-gold/30" />
                ))}
              </div>

              {/* Text */}
              <p className="text-brand-ivory/60 text-sm font-light leading-[1.8] mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-brand-ivory font-display text-base font-medium tracking-wide">
                    {review.name}
                  </p>
                  <p className="text-brand-ivory/30 text-[10px] tracking-[0.15em] uppercase font-light mt-1">
                    {review.date}
                  </p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-gold/50 font-light border border-brand-gold/20 px-3 py-1">
                  {review.source}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 glass-card px-10 py-6">
            <div>
              <span className="font-display text-4xl font-semibold text-brand-gold">{settings.googleRating}</span>
              <span className="text-brand-ivory/30 text-lg">/5</span>
            </div>
            <div className="w-px h-10 bg-brand-gold/20" />
            <div className="flex gap-1">
              {Array.from({ length: Math.floor(parseFloat(settings.googleRating)) }).map((_, i) => (
                <Star key={i} size={18} className="text-brand-gold fill-brand-gold" />
              ))}
              {parseFloat(settings.googleRating) % 1 !== 0 && (
                <Star size={18} className="text-brand-gold/50" />
              )}
            </div>
            <div className="w-px h-10 bg-brand-gold/20" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-brand-ivory/40 font-light">
              Google Reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
