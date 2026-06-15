import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { supabase } from '../utils/supabase';
import type { SiteData, MenuCategory, MenuItem, MenuSubSection, Experience, Review, Service, GalleryItem, ParallaxSection } from '../types';
import { defaultData } from '../data/defaultData';

const LOCAL_KEY = 'lentracte_site_data';
const TABLE = 'site_data';
const ROW_ID = 'main';

interface SiteDataContextType {
  data: SiteData;
  updateSettings: (s: Partial<SiteData['settings']>) => void;
  updateHero: (h: Partial<SiteData['hero']>) => void;
  updateAbout: (a: Partial<SiteData['about']>) => void;
  updateMenuSection: (m: Partial<SiteData['menuSection']>) => void;
  updateReviewsSection: (r: Partial<SiteData['reviewsSection']>) => void;
  updateImage: (key: string, url: string) => void;
  updateMenuCategory: (id: string, u: Partial<MenuCategory>) => void;
  addMenuCategory: (c: Omit<MenuCategory, 'id'>) => void;
  deleteMenuCategory: (id: string) => void;
  updateMenuSubSection: (catId: string, subId: string, u: Partial<MenuSubSection>) => void;
  addMenuSubSection: (catId: string, s: Omit<MenuSubSection, 'id'>) => void;
  deleteMenuSubSection: (catId: string, subId: string) => void;
  updateMenuItem: (catId: string, subId: string, itemId: string, u: Partial<MenuItem>) => void;
  addMenuItem: (catId: string, subId: string, item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (catId: string, subId: string, itemId: string) => void;
  updateExperience: (id: string, u: Partial<Experience>) => void;
  addExperience: (e: Omit<Experience, 'id'>) => void;
  deleteExperience: (id: string) => void;
  updateReview: (id: string, u: Partial<Review>) => void;
  addReview: (r: Omit<Review, 'id'>) => void;
  deleteReview: (id: string) => void;
  updateService: (id: string, u: Partial<Service>) => void;
  addService: (s: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  updateGalleryItem: (id: string, u: Partial<GalleryItem>) => void;
  addGalleryItem: (g: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  updateParallax: (id: string, u: Partial<ParallaxSection>) => void;
  resetToDefaults: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);
const uid = () => Math.random().toString(36).substr(2, 9);

function merge(saved: Partial<SiteData>): SiteData {
  return {
    ...defaultData, ...saved,
    settings: { ...defaultData.settings, ...(saved.settings || {}) },
    hero: { ...defaultData.hero, ...(saved.hero || {}) },
    about: { ...defaultData.about, ...(saved.about || {}) },
    menuSection: { ...defaultData.menuSection, ...(saved.menuSection || {}) },
    reviewsSection: { ...defaultData.reviewsSection, ...(saved.reviewsSection || {}) },
    images: { ...defaultData.images, ...(saved.images || {}) },
    menu: saved.menu?.length ? saved.menu : defaultData.menu,
    experiences: saved.experiences?.length ? saved.experiences : defaultData.experiences,
    gallery: saved.gallery?.length ? saved.gallery : defaultData.gallery,
    reviews: saved.reviews?.length ? saved.reviews : defaultData.reviews,
    services: saved.services?.length ? saved.services : defaultData.services,
    parallaxSections: saved.parallaxSections?.length ? saved.parallaxSections : defaultData.parallaxSections,
  };
}

// Save to Supabase: upsert a single row containing all site data as JSON
async function saveToSupabase(data: SiteData) {
  console.log('[Supabase] Writing site data to storage...', { 
    id: ROW_ID, 
    isHeroVideo: !!data.hero.backgroundVideo,
    isMenuVideo: !!data.menuSection.backgroundVideo 
  });
  const payload = JSON.parse(JSON.stringify(data));
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: payload, updated_at: new Date().toISOString() });
  
  if (error) {
    console.warn('[Supabase] Save error:', error.message);
  } else {
    console.log('[Supabase] Site data saved successfully');
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    try { const s = localStorage.getItem(LOCAL_KEY); if (s) return merge(JSON.parse(s)); } catch {}
    return defaultData;
  });

  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isRemote = useRef(false);
  const hasHydrated = useRef(false);

  // ── Load initial data from Supabase ──
  useEffect(() => {
    console.log('[Supabase] Fetching initial site data...');
    supabase
      .from(TABLE)
      .select('data')
      .eq('id', ROW_ID)
      .single()
      .then(({ data: row, error }) => {
        if (error) { 
          console.warn('[Supabase] Initial load error:', error.message); 
          return; 
        }
        if (row?.data) {
          console.log('[Supabase] Initial data received');
          const remote = merge(row.data as Partial<SiteData>);
          isRemote.current = true;
          setData(remote);
          try { localStorage.setItem(LOCAL_KEY, JSON.stringify(remote)); } catch {}
        } else {
          console.log('[Supabase] No initial data found, using defaults');
        }
        hasHydrated.current = true;
      });
  }, []);

  // ── Real-time subscription ──
  useEffect(() => {
    const channel = supabase
      .channel('site-data-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: TABLE, filter: `id=eq.${ROW_ID}` },
        (payload) => {
          console.log('[Supabase] Real-time update received:', payload.eventType);
          const row = payload.new as { data?: Partial<SiteData> } | undefined;
          if (row?.data) {
            const remote = merge(row.data);
            isRemote.current = true;
            setData(remote);
            try { localStorage.setItem(LOCAL_KEY, JSON.stringify(remote)); } catch {}
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // ── Debounced save on local changes ──
  useEffect(() => {
    if (!hasHydrated.current) {
      return;
    }
    
    if (isRemote.current) {
      console.log('[Supabase] Skipping save: change originated from remote update');
      isRemote.current = false;
      return;
    }

    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); } catch {}
    
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveToSupabase(data);
    }, 800);
    
    return () => clearTimeout(saveTimer.current);
  }, [data]);

  // ── All updaters ──
  const updateSettings = useCallback((s: Partial<SiteData['settings']>) => setData(p => ({ ...p, settings: { ...p.settings, ...s } })), []);
  const updateHero = useCallback((h: Partial<SiteData['hero']>) => setData(p => ({ ...p, hero: { ...p.hero, ...h } })), []);
  const updateAbout = useCallback((a: Partial<SiteData['about']>) => setData(p => ({ ...p, about: { ...p.about, ...a } })), []);
  const updateMenuSection = useCallback((m: Partial<SiteData['menuSection']>) => setData(p => ({ ...p, menuSection: { ...p.menuSection, ...m } })), []);
  const updateReviewsSection = useCallback((r: Partial<SiteData['reviewsSection']>) => setData(p => ({ ...p, reviewsSection: { ...p.reviewsSection, ...r } })), []);
  const updateImage = useCallback((key: string, url: string) => setData(p => ({ ...p, images: { ...p.images, [key]: url } })), []);

  const updateMenuCategory = useCallback((id: string, u: Partial<MenuCategory>) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === id ? { ...c, ...u } : c) })), []);
  const addMenuCategory = useCallback((c: Omit<MenuCategory, 'id'>) => setData(p => ({ ...p, menu: [...p.menu, { ...c, id: uid() }] })), []);
  const deleteMenuCategory = useCallback((id: string) => setData(p => ({ ...p, menu: p.menu.filter(c => c.id !== id) })), []);
  const updateMenuSubSection = useCallback((catId: string, subId: string, u: Partial<MenuSubSection>) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: c.subSections.map(s => s.id === subId ? { ...s, ...u } : s) } : c) })), []);
  const addMenuSubSection = useCallback((catId: string, s: Omit<MenuSubSection, 'id'>) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: [...c.subSections, { ...s, id: uid() }] } : c) })), []);
  const deleteMenuSubSection = useCallback((catId: string, subId: string) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: c.subSections.filter(s => s.id !== subId) } : c) })), []);
  const updateMenuItem = useCallback((catId: string, subId: string, itemId: string, u: Partial<MenuItem>) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: c.subSections.map(s => s.id === subId ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, ...u } : i) } : s) } : c) })), []);
  const addMenuItem = useCallback((catId: string, subId: string, item: Omit<MenuItem, 'id'>) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: c.subSections.map(s => s.id === subId ? { ...s, items: [...s.items, { ...item, id: uid() }] } : s) } : c) })), []);
  const deleteMenuItem = useCallback((catId: string, subId: string, itemId: string) => setData(p => ({ ...p, menu: p.menu.map(c => c.id === catId ? { ...c, subSections: c.subSections.map(s => s.id === subId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s) } : c) })), []);

  const updateExperience = useCallback((id: string, u: Partial<Experience>) => setData(p => ({ ...p, experiences: p.experiences.map(e => e.id === id ? { ...e, ...u } : e) })), []);
  const addExperience = useCallback((e: Omit<Experience, 'id'>) => setData(p => ({ ...p, experiences: [...p.experiences, { ...e, id: uid() }] })), []);
  const deleteExperience = useCallback((id: string) => setData(p => ({ ...p, experiences: p.experiences.filter(e => e.id !== id) })), []);

  const updateReview = useCallback((id: string, u: Partial<Review>) => setData(p => ({ ...p, reviews: p.reviews.map(r => r.id === id ? { ...r, ...u } : r) })), []);
  const addReview = useCallback((r: Omit<Review, 'id'>) => setData(p => ({ ...p, reviews: [...p.reviews, { ...r, id: uid() }] })), []);
  const deleteReview = useCallback((id: string) => setData(p => ({ ...p, reviews: p.reviews.filter(r => r.id !== id) })), []);

  const updateService = useCallback((id: string, u: Partial<Service>) => setData(p => ({ ...p, services: p.services.map(s => s.id === id ? { ...s, ...u } : s) })), []);
  const addService = useCallback((s: Omit<Service, 'id'>) => setData(p => ({ ...p, services: [...p.services, { ...s, id: uid() }] })), []);
  const deleteService = useCallback((id: string) => setData(p => ({ ...p, services: p.services.filter(s => s.id !== id) })), []);

  const updateGalleryItem = useCallback((id: string, u: Partial<GalleryItem>) => setData(p => ({ ...p, gallery: p.gallery.map(g => g.id === id ? { ...g, ...u } : g) })), []);
  const addGalleryItem = useCallback((g: Omit<GalleryItem, 'id'>) => setData(p => ({ ...p, gallery: [...p.gallery, { ...g, id: uid() }] })), []);
  const deleteGalleryItem = useCallback((id: string) => setData(p => ({ ...p, gallery: p.gallery.filter(g => g.id !== id) })), []);

  const updateParallax = useCallback((id: string, u: Partial<ParallaxSection>) => setData(p => ({ ...p, parallaxSections: p.parallaxSections.map(x => x.id === id ? { ...x, ...u } : x) })), []);

  const resetToDefaults = useCallback(() => {
    setData(defaultData);
    try { localStorage.removeItem(LOCAL_KEY); } catch {}
    saveToSupabase(defaultData);
  }, []);

  return (
    <SiteDataContext.Provider value={{
      data, updateSettings, updateHero, updateAbout, updateMenuSection, updateReviewsSection, updateImage,
      updateMenuCategory, addMenuCategory, deleteMenuCategory,
      updateMenuSubSection, addMenuSubSection, deleteMenuSubSection,
      updateMenuItem, addMenuItem, deleteMenuItem,
      updateExperience, addExperience, deleteExperience,
      updateReview, addReview, deleteReview,
      updateService, addService, deleteService,
      updateGalleryItem, addGalleryItem, deleteGalleryItem,
      updateParallax, resetToDefaults,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider');
  return ctx;
}
