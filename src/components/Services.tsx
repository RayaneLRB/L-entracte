import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';
import SectionTitle from './SectionTitle';
import {
  TreePine, Sunset, UtensilsCrossed, Truck, ShoppingBag,
  CalendarCheck, Wifi, Car, Clock, Users, Heart, Star,
  Coffee, Phone, MapPin, Home, Gift, Music, Camera,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TreePine, Sunset, UtensilsCrossed, Truck, ShoppingBag,
  CalendarCheck, Wifi, Car, Clock, Users, Heart, Star,
  Coffee, Phone, MapPin, Home, Gift, Music, Camera,
};

function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = iconMap[name];
  if (!Icon) return <Star {...props} />;
  return <Icon {...props} />;
}

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();
  const { data } = useSiteData();
  const { services } = data;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          subtitle="Services"
          title="À Votre Service"
          description="Chaque détail est pensé pour que votre expérience soit parfaite, du début à la fin."
        />

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card p-6 text-center group hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-brand-gold/20 group-hover:border-brand-gold/50 group-hover:bg-brand-gold/5 transition-all duration-500">
                <DynamicIcon name={service.icon} size={20} className="text-brand-gold/70 group-hover:text-brand-gold transition-colors duration-500" />
              </div>
              <h4 className="font-display text-sm font-medium text-brand-ivory tracking-wide mb-2">
                {service.title}
              </h4>
              <p className="text-brand-ivory/35 text-[11px] leading-relaxed font-light">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
