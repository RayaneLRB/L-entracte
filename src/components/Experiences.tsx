import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import SectionTitle from './SectionTitle';
import { Sun, Moon, Coffee, Cake, Wine, Users, Sunset, Fish, UtensilsCrossed, Heart, Star, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sun, Moon, Coffee, Cake, Wine, Users, Sunset, Fish, UtensilsCrossed, Heart, Star, Sparkles,
};

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return <Star {...props} />;
  return <Icon {...props} />;
}

export default function Experiences() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { experiences } = data;

  return (
    <section id="experiences" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-charcoal/50 to-brand-dark" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="L'Expérience"
          title="Vivez L'ENTRACTE"
          description="Chaque moment passé chez nous est une expérience à part entière. Du petit matin au coucher du soleil, nous créons des instants d'exception."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <DynamicIcon name={exp.icon} size={22} className="text-brand-gold mb-3 opacity-80" />
                  <h3 className="font-display text-lg font-semibold text-brand-ivory tracking-wide mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-brand-ivory/50 text-xs leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Bottom gold accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
