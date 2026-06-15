import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import { MapPin, Navigation, Car, TreePine } from 'lucide-react';

export default function Location() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { settings } = data;

  return (
    <section className="relative py-24 md:py-32 bg-brand-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden h-[400px] md:h-[500px] border border-brand-gold/10"
          >
            <iframe
              src={settings.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) contrast(1.1) brightness(0.7) sepia(20%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'ENTRACTE - Localisation"
            />
            <div className="absolute inset-0 pointer-events-none border border-brand-gold/10" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-gold/40" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-brand-gold font-sans font-light">
                Nous Trouver
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.05em] text-brand-ivory mb-4 leading-tight">
              Votre Destination
              <br />
              <span className="text-gradient-gold italic font-serif font-light">à {settings.city}.</span>
            </h2>

            <div className="w-12 h-px bg-brand-gold/40 mb-8" />

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/20 shrink-0">
                  <MapPin size={18} className="text-brand-gold/70" />
                </div>
                <div>
                  <h4 className="text-brand-ivory font-display text-base font-medium tracking-wide mb-1">
                    Adresse
                  </h4>
                  <p className="text-brand-ivory/50 text-sm font-light leading-relaxed">
                    {settings.address}
                    <br />
                    {settings.city} {settings.postalCode}, {settings.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/20 shrink-0">
                  <Navigation size={18} className="text-brand-gold/70" />
                </div>
                <div>
                  <h4 className="text-brand-ivory font-display text-base font-medium tracking-wide mb-1">
                    Accès Facile
                  </h4>
                  <p className="text-brand-ivory/50 text-sm font-light leading-relaxed">
                    Situé sur les hauteurs de {settings.city}, accessible depuis les principaux axes routiers d'Alger.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/20 shrink-0">
                  <Car size={18} className="text-brand-gold/70" />
                </div>
                <div>
                  <h4 className="text-brand-ivory font-display text-base font-medium tracking-wide mb-1">
                    Parking Gratuit
                  </h4>
                  <p className="text-brand-ivory/50 text-sm font-light leading-relaxed">
                    Stationnement sécurisé et gratuit pour tous nos clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/20 shrink-0">
                  <TreePine size={18} className="text-brand-gold/70" />
                </div>
                <div>
                  <h4 className="text-brand-ivory font-display text-base font-medium tracking-wide mb-1">
                    Quartier Résidentiel
                  </h4>
                  <p className="text-brand-ivory/50 text-sm font-light leading-relaxed">
                    Un cadre paisible et verdoyant, loin de l'agitation de la ville.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={settings.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-gold text-brand-black text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-gold-light transition-all duration-500"
            >
              <Navigation size={14} />
              Ouvrir dans Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
