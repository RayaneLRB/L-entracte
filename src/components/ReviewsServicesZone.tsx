import { useRef, useEffect, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { useMediaUrl } from '../hooks/useMediaUrl';
import Reviews from './Reviews';
import Services from './Services';

export default function ReviewsServicesZone() {
  const { data } = useSiteData();
  const { reviewsSection } = data;
  const videoUrl = useMediaUrl(reviewsSection.backgroundVideo);
  const showVideo = reviewsSection.useVideo && reviewsSection.backgroundVideo && videoUrl;
  const zoneRef = useRef<HTMLDivElement>(null);
  const [bgStyle, setBgStyle] = useState<'before' | 'fixed' | 'after'>('before');

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const update = () => {
      const rect = zone.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height;
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;

      if (scrollY + viewH < top + viewH * 0.3) {
        setBgStyle('before');
      } else if (scrollY > top + height - viewH) {
        setBgStyle('after');
      } else {
        setBgStyle('fixed');
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Compute style for the background layer
  const getBgPositionStyle = (): React.CSSProperties => {
    if (bgStyle === 'fixed') {
      return { position: 'fixed', top: 0, left: 0, right: 0, height: '100vh' };
    }
    if (bgStyle === 'after') {
      return { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100vh' };
    }
    // before
    return { position: 'absolute', top: 0, left: 0, right: 0, height: '100vh' };
  };

  return (
    <div ref={zoneRef} className="relative" style={{ isolation: 'isolate' }}>
      {/* Background media — fixed while scrolling through the zone */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={getBgPositionStyle()}>
          {showVideo ? (
            <video
              key={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              src={videoUrl}
            />
          ) : (
            reviewsSection.backgroundImage && (
              <img
                src={reviewsSection.backgroundImage}
                alt=""
                className="w-full h-full object-cover"
              />
            )
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-black/80" />
        </div>
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Reviews />
        <Services />
      </div>
    </div>
  );
}
