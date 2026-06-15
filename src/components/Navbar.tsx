import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Notre Histoire', href: '#histoire' },
  { label: 'Expériences', href: '#experiences' },
  { label: 'La Carte', href: '#carte' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Avis', href: '#avis' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data } = useSiteData();
  const { settings } = data;
  const hasLogo = !!settings.logo;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
  }, [isMobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'glass-dark border-b border-brand-gold/10 py-2'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="group flex items-center gap-3 shrink-0">
            {hasLogo ? (
              <img
                src={settings.logo}
                alt={settings.siteName}
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? 'h-10' : 'h-12 md:h-14'
                }`}
              />
            ) : (
              <div className="flex flex-col items-center">
                <span className={`font-display font-semibold tracking-[0.2em] text-brand-gold transition-all duration-500 ${
                  isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                }`}>
                  {settings.siteName}
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-brand-beige/60 font-sans font-light mt-0.5">
                  {settings.location}
                </span>
              </div>
            )}
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.15em] uppercase text-brand-ivory/70 hover:text-brand-gold transition-colors duration-300 font-light"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.phoneMain}`}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-brand-gold/40 text-brand-gold text-[12px] tracking-[0.15em] uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-500 font-medium"
            >
              <Phone size={14} />
              Réserver
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-brand-ivory/80 hover:text-brand-gold transition-colors"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-brand-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-px bg-brand-gold/30 mb-4" />
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="text-lg tracking-[0.2em] uppercase text-brand-ivory/80 hover:text-brand-gold transition-colors font-light"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="w-16 h-px bg-brand-gold/30 mt-4" />
              <a
                href={`tel:${settings.phoneMain}`}
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 flex items-center gap-2 px-8 py-3 border border-brand-gold/40 text-brand-gold text-sm tracking-[0.15em] uppercase hover:bg-brand-gold hover:text-brand-black transition-all duration-500"
              >
                <Phone size={16} />
                Réserver
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
