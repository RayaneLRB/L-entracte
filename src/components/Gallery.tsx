import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import SectionTitle from './SectionTitle';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Tout');
  const { data } = useSiteData();
  const { gallery } = data;

  // Get unique categories
  const categories = ['Tout', ...Array.from(new Set(gallery.map(item => item.category)))];

  const filtered = activeFilter === 'Tout'
    ? gallery
    : gallery.filter((item) => item.category === activeFilter);

  return (
    <section id="galerie" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-charcoal/30 to-brand-dark" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Galerie"
          title="L'Art Visuel"
          description="Chaque image capture l'essence de L'ENTRACTE. Découvrez nos espaces, nos créations culinaires et l'atmosphère unique qui nous définit."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-light transition-all duration-500 border ${
                activeFilter === cat
                  ? 'bg-brand-gold text-brand-black border-brand-gold font-medium'
                  : 'bg-transparent text-brand-ivory/50 border-brand-ivory/10 hover:border-brand-gold/50 hover:text-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group relative overflow-hidden cursor-pointer aspect-square"
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 transition-all duration-500" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ZoomIn size={22} className="text-brand-gold mb-2" />
                  <span className="text-brand-ivory text-[10px] tracking-[0.2em] uppercase font-light">
                    {item.category}
                  </span>
                </div>

                {/* Gold bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-brand-ivory/60 hover:text-brand-gold transition-colors z-10"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={selectedImage}
              alt="Galerie L'ENTRACTE"
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
