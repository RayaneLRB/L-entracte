import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';

export default function Reservation() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { settings, images } = data;

  const formatPhone = (phone: string) => {
    // Format: +213 550 222 523
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-brand-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={images.nightCity}
          alt="L'ENTRACTE la nuit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-black/85 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div ref={ref} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-px bg-brand-gold/40" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-brand-gold font-sans font-light">
              Réservation
            </span>
            <div className="w-8 h-px bg-brand-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[0.08em] text-brand-ivory mb-4"
          >
            Réservez Votre
            <br />
            <span className="text-gradient-gold italic font-serif font-light">Expérience</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="w-16 h-px bg-brand-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl mx-auto text-brand-ivory/50 text-sm md:text-base font-light leading-relaxed mb-12"
          >
            Notre équipe est à votre disposition pour rendre chaque visite exceptionnelle.
            Réservez votre table et laissez-nous créer un moment inoubliable.
          </motion.p>

          {/* Phone Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <a
              href={`tel:${settings.phoneMain}`}
              className="group flex items-center gap-3 glass-card px-8 py-5 hover:border-brand-gold/40 transition-all duration-500"
            >
              <Phone size={18} className="text-brand-gold" />
              <div className="text-left">
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-ivory/40 font-light">
                  Principal
                </p>
                <p className="font-display text-lg text-brand-ivory group-hover:text-brand-gold transition-colors tracking-wider">
                  {formatPhone(settings.phoneMain)}
                </p>
              </div>
            </a>

            <a
              href={`tel:${settings.phoneSecondary}`}
              className="group flex items-center gap-3 glass-card px-8 py-5 hover:border-brand-gold/40 transition-all duration-500"
            >
              <Phone size={18} className="text-brand-gold" />
              <div className="text-left">
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-ivory/40 font-light">
                  Secondaire
                </p>
                <p className="font-display text-lg text-brand-ivory group-hover:text-brand-gold transition-colors tracking-wider">
                  {formatPhone(settings.phoneSecondary)}
                </p>
              </div>
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`tel:${settings.phoneMain}`}
              className="flex items-center gap-2 px-8 py-3.5 bg-brand-gold text-brand-black text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-gold-light transition-all duration-500"
            >
              <Phone size={16} />
              Appeler
            </a>

            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 bg-[#25D366]/90 text-white text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#25D366] transition-all duration-500"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href={`tel:${settings.phoneSecondary}`}
              className="flex items-center gap-2 px-8 py-3.5 border border-brand-ivory/30 text-brand-ivory text-[12px] tracking-[0.2em] uppercase font-light hover:border-brand-gold hover:text-brand-gold transition-all duration-500"
            >
              <CalendarCheck size={16} />
              Réserver une Table
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
