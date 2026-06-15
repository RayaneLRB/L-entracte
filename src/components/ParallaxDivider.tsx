import { useParallax } from '../hooks/useScrollAnimation';
import { useSiteData } from '../context/SiteDataContext';

interface ParallaxDividerProps {
  image: string;
  quote: string;
  author?: string;
}

export default function ParallaxDivider({ image, quote, author }: ParallaxDividerProps) {
  const scrollY = useParallax();
  const { data } = useSiteData();
  
  // Get image URL from images object or use direct URL
  const imageUrl = data.images[image] || image;

  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <img
          src={imageUrl}
          alt="L'ENTRACTE ambiance"
          className="w-full h-full object-cover scale-125"
        />
      </div>
      <div className="absolute inset-0 bg-brand-black/70" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="w-12 h-px bg-brand-gold/40 mb-8" />
        <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-brand-beige-light/80 font-light max-w-3xl leading-relaxed">
          {quote}
        </p>
        {author && (
          <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-brand-gold/50 font-light">
            — {author}
          </p>
        )}
        <div className="w-12 h-px bg-brand-gold/40 mt-8" />
      </div>
    </section>
  );
}
