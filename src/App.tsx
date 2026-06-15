import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ParallaxDivider from './components/ParallaxDivider';
import Experiences from './components/Experiences';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import ReviewsServicesZone from './components/ReviewsServicesZone';
import Reservation from './components/Reservation';
import Hours from './components/Hours';
import Location from './components/Location';
import Footer from './components/Footer';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import LoginScreen from './components/Dashboard/LoginScreen';

/* ─── LOADING SCREEN ──────────────────────── */
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const { data } = useSiteData();
  const { settings } = data;
  const hasLogo = !!settings.logo;

  useEffect(() => {
    const t = setTimeout(onFinish, 2800);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-10"
      />
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center flex flex-col items-center"
      >
        {hasLogo ? (
          <img src={settings.logo} alt={settings.siteName} className="h-20 md:h-28 object-contain mb-4" />
        ) : (
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[0.25em] text-brand-gold mb-3">
            {settings.siteName}
          </h1>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-lg italic text-brand-beige/50 font-light tracking-wider"
        >
          {settings.tagline}
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mt-10"
      />
      <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48">
        <div className="h-px bg-brand-ivory/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'linear' }}
            className="h-full bg-brand-gold/60"
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[9px] tracking-[0.3em] uppercase text-brand-ivory/20 mt-4 font-light"
        >
          Chargement de l'expérience
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN SITE ───────────────────────────── */
function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <ParallaxDivider
        image="interiorLighting"
        quote="Chaque détail raconte une histoire. Chaque saveur éveille une émotion. Chaque instant devient un souvenir."
        author="L'ENTRACTE"
      />
      <Experiences />
      <ParallaxDivider
        image="heroAlt"
        quote="Là où la gastronomie rencontre l'art de vivre."
      />
      <Menu />
      <Gallery />
      <ReviewsServicesZone />
      <Reservation />
      <Hours />
      <Location />
      <Footer />
    </>
  );
}

/* ─── APP ROUTER ──────────────────────────── */
type AppView = 'loading' | 'site' | 'login' | 'dashboard';

function Website() {
  const getInitialView = (): AppView => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'admin' || hash === 'dashboard') {
      return sessionStorage.getItem('dashboard_auth') === 'true' ? 'dashboard' : 'login';
    }
    return 'loading';
  };

  const [view, setView] = useState<AppView>(getInitialView);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin' || hash === 'dashboard') {
        setView(sessionStorage.getItem('dashboard_auth') === 'true' ? 'dashboard' : 'login');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleLoadingDone = useCallback(() => {
    window.scrollTo(0, 0);
    history.replaceState('', '', window.location.pathname);
    setView('site');
    requestAnimationFrame(() => { document.documentElement.classList.add('ready'); });
  }, []);

  const handleLogin = useCallback(() => setView('dashboard'), []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('dashboard_auth');
    setView('login');
  }, []);

  const handleCloseDashboard = useCallback(() => {
    history.pushState('', '', window.location.pathname);
    setView('site');
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { document.documentElement.classList.add('ready'); });
  }, []);

  switch (view) {
    case 'loading':
      return <AnimatePresence><LoadingScreen onFinish={handleLoadingDone} /></AnimatePresence>;
    case 'login':
      return <LoginScreen onLogin={handleLogin} />;
    case 'dashboard':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <DashboardLayout onClose={handleCloseDashboard} onLogout={handleLogout} />
        </motion.div>
      );
    case 'site':
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <MainSite />
        </motion.div>
      );
  }
}

/* ─── ROOT ────────────────────────────────── */
export default function App() {
  return (
    <SiteDataProvider>
      <Website />
    </SiteDataProvider>
  );
}
