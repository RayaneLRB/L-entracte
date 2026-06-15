import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Image, FileText, Star, Utensils, LayoutGrid,
  ChevronLeft, Home, X, RotateCcw, Menu, Sparkles,
  MessageSquare, Palette, LogOut, ChevronRight, Zap,
} from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import GeneralSettings from './GeneralSettings';
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import MenuEditor from './MenuEditor';
import MediaManager from './MediaManager';
import ExperiencesEditor from './ExperiencesEditor';
import GalleryEditor from './GalleryEditor';
import ReviewsEditor from './ReviewsEditor';
import ServicesEditor from './ServicesEditor';

interface Props { onClose: () => void; onLogout: () => void; }

const TABS = [
  { id: 'general',     label: 'Paramètres',  icon: Settings,       accent: 'from-blue-500/20 to-blue-500/5',    dot: 'bg-blue-400' },
  { id: 'hero',        label: 'Accueil',      icon: Sparkles,       accent: 'from-amber-500/20 to-amber-500/5',  dot: 'bg-amber-400' },
  { id: 'about',       label: 'À Propos',     icon: FileText,       accent: 'from-violet-500/20 to-violet-500/5', dot: 'bg-violet-400' },
  { id: 'menu',        label: 'Menu',         icon: Utensils,       accent: 'from-orange-500/20 to-orange-500/5', dot: 'bg-orange-400' },
  { id: 'experiences', label: 'Expériences',  icon: LayoutGrid,     accent: 'from-emerald-500/20 to-emerald-500/5', dot: 'bg-emerald-400' },
  { id: 'gallery',     label: 'Galerie',      icon: Image,          accent: 'from-pink-500/20 to-pink-500/5',    dot: 'bg-pink-400' },
  { id: 'reviews',     label: 'Avis',         icon: MessageSquare,  accent: 'from-cyan-500/20 to-cyan-500/5',    dot: 'bg-cyan-400' },
  { id: 'services',    label: 'Services',     icon: Star,           accent: 'from-yellow-500/20 to-yellow-500/5', dot: 'bg-yellow-400' },
  { id: 'media',       label: 'Médias',       icon: Palette,        accent: 'from-rose-500/20 to-rose-500/5',    dot: 'bg-rose-400' },
];

export default function DashboardLayout({ onClose, onLogout }: Props) {
  const [tab, setTab] = useState('general');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resetToDefaults } = useSiteData();

  const active = TABS.find(t => t.id === tab)!;

  const content: Record<string, React.ReactNode> = {
    general: <GeneralSettings />,
    hero: <HeroEditor />,
    about: <AboutEditor />,
    menu: <MenuEditor />,
    experiences: <ExperiencesEditor />,
    gallery: <GalleryEditor />,
    reviews: <ReviewsEditor />,
    services: <ServicesEditor />,
    media: <MediaManager />,
  };

  const NavItem = ({ t }: { t: typeof TABS[0] }) => {
    const Icon = t.icon;
    const isActive = tab === t.id;
    return (
      <button
        onClick={() => { setTab(t.id); setMobileOpen(false); }}
        className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group ${
          collapsed ? 'px-0 py-3 justify-center' : 'px-3.5 py-2.5'
        } ${isActive ? 'bg-gradient-to-r ' + t.accent : 'hover:bg-white/[0.03]'}`}
        title={collapsed ? t.label : undefined}
      >
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          isActive ? 'bg-white/10' : 'bg-transparent group-hover:bg-white/[0.04]'
        }`}>
          <Icon size={16} className={isActive ? 'text-white' : 'text-white/35 group-hover:text-white/60'} />
        </div>
        {!collapsed && (
          <span className={`text-[13px] truncate transition-colors ${isActive ? 'text-white font-medium' : 'text-white/40 group-hover:text-white/70'}`}>
            {t.label}
          </span>
        )}
        {!collapsed && isActive && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${t.dot}`} />}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#08080a] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ────────────────────────────────── */}
      <aside className={`fixed lg:relative h-full z-20 flex flex-col bg-[#0c0c0e] transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

        {/* Logo */}
        <div className={`shrink-0 border-b border-white/[0.04] ${collapsed ? 'p-4' : 'px-5 py-4'}`}>
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center border border-brand-gold/15">
                  <Zap size={16} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold tracking-wide">Dashboard</p>
                  <p className="text-brand-gold/50 text-[10px] tracking-[0.15em] uppercase">Admin</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 flex items-center justify-center border border-brand-gold/15">
                <Zap size={16} className="text-brand-gold" />
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-3 space-y-0.5 ${collapsed ? 'px-3' : 'px-3'}`}>
          <p className={`text-[10px] tracking-[0.15em] uppercase text-white/20 mb-2 ${collapsed ? 'text-center' : 'px-3.5'}`}>
            {collapsed ? '•' : 'Contenu'}
          </p>
          {TABS.map(t => <NavItem key={t.id} t={t} />)}
        </nav>

        {/* Footer */}
        <div className={`shrink-0 border-t border-white/[0.04] p-3 space-y-1.5`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 py-2 text-white/20 hover:text-white/50 hover:bg-white/[0.03] rounded-xl transition-all text-xs"
          >
            {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Réduire</span></>}
          </button>
          <button
            onClick={() => { if (confirm('⚠️ Tout réinitialiser aux valeurs par défaut ?')) resetToDefaults(); }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.06] rounded-xl transition-all text-xs ${collapsed ? 'px-0' : 'px-3'}`}
          >
            <RotateCcw size={14} />{!collapsed && <span>Réinitialiser</span>}
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-2 py-2.5 text-white/30 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all text-xs ${collapsed ? 'px-0' : 'px-3'}`}
          >
            <LogOut size={14} />{!collapsed && <span>Déconnexion</span>}
          </button>
          <button
            onClick={onClose}
            className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-brand-gold/15 transition-all ${collapsed ? 'px-0' : 'px-4'}`}
          >
            <Home size={15} />{!collapsed && <span>Voir le Site</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="shrink-0 h-[60px] bg-[#0c0c0e]/80 backdrop-blur-xl border-b border-white/[0.04] flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-1 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <Menu size={20} />
            </button>
            <div className={`hidden sm:flex w-9 h-9 rounded-xl bg-gradient-to-br ${active.accent} items-center justify-center`}>
              <active.icon size={16} className="text-white/80" />
            </div>
            <div>
              <h2 className="text-white text-[15px] font-medium">{active.label}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/[0.08] border border-emerald-500/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400/80 text-[11px] font-medium">Sauvegarde auto</span>
            </div>
            <button onClick={onClose} className="p-2 text-white/25 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {content[tab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
