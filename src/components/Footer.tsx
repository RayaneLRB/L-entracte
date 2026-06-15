import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import { Phone, MapPin, Mail, Camera, Settings } from 'lucide-react';

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { settings } = data;

  const formatPhone = (phone: string) => {
    return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  return (
    <footer className="relative bg-brand-black border-t border-brand-gold/10">
      {/* Main Footer */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {settings.logo ? (
              <img src={settings.logo} alt={settings.siteName} className="h-14 object-contain mb-4" />
            ) : (
              <h3 className="font-display text-2xl font-semibold tracking-[0.2em] text-brand-gold mb-2">
                {settings.siteName}
              </h3>
            )}
            <p className="text-[9px] tracking-[0.4em] uppercase text-brand-ivory/30 font-light mb-6">
              {settings.city} · {settings.country}
            </p>
            <p className="text-brand-ivory/40 text-sm font-light leading-[1.8]">
              {settings.tagline} Une destination culinaire où chaque moment
              devient une expérience inoubliable.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold/80 font-medium mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '#accueil' },
                { label: 'Notre Histoire', href: '#histoire' },
                { label: 'Expériences', href: '#experiences' },
                { label: 'La Carte', href: '#carte' },
                { label: 'Galerie', href: '#galerie' },
                { label: 'Avis', href: '#avis' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-ivory/40 text-sm font-light hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold/80 font-medium mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-brand-gold/50 mt-1 shrink-0" />
                <div>
                  <a href={`tel:${settings.phoneMain}`} className="text-brand-ivory/50 text-sm font-light hover:text-brand-gold transition-colors block">
                    {formatPhone(settings.phoneMain)}
                  </a>
                  <a href={`tel:${settings.phoneSecondary}`} className="text-brand-ivory/50 text-sm font-light hover:text-brand-gold transition-colors block">
                    {formatPhone(settings.phoneSecondary)}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-brand-gold/50 mt-1 shrink-0" />
                <span className="text-brand-ivory/50 text-sm font-light">
                  {settings.address}<br />{settings.city} {settings.postalCode}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-brand-gold/50 mt-1 shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-brand-ivory/50 text-sm font-light hover:text-brand-gold transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold/80 font-medium mb-6">
              Suivez-nous
            </h4>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group mb-8"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand-gold/20 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5 transition-all duration-500">
                <Camera size={18} className="text-brand-gold/70 group-hover:text-brand-gold transition-colors" />
              </div>
              <div>
                <span className="text-brand-ivory/60 text-sm font-light group-hover:text-brand-gold transition-colors block">
                  {settings.instagramHandle}
                </span>
                <span className="text-brand-ivory/30 text-[10px] font-light">
                  {settings.followersCount} followers
                </span>
              </div>
            </a>

            <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold/80 font-medium mb-4">
              Horaires
            </h4>
            <p className="text-brand-ivory/40 text-sm font-light leading-[1.8]">
              Sam – Jeu : 10h00 – 01h00
              <br />
              Vendredi : 17h00 – 01h00
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gold/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-ivory/20 text-[10px] tracking-[0.15em] uppercase font-light">
            © 2025 {settings.siteName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-brand-ivory/15 text-[10px] tracking-[0.15em] uppercase font-light">
              Une expérience culinaire d'exception.
            </p>
            <button
              onClick={() => { window.location.hash = 'admin'; }}
              className="opacity-20 hover:opacity-60 transition-opacity duration-500"
              title="Admin"
            >
              <Settings size={10} className="text-brand-ivory/40" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
