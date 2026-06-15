// ═══════════════════════════════════════════════════════════
// TYPES FOR L'ENTRACTE SITE DATA
// ═══════════════════════════════════════════════════════════

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: string;
}

export interface MenuSubSection {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  label: string;
  image: string;
  subSections: MenuSubSection[];
  footNote?: string;
}

export interface Experience {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface DaySchedule {
  day: string;
  hours: string;
  highlight: boolean;
}

export interface SiteSettings {
  // Brand
  siteName: string;
  logo: string;
  tagline: string;
  subtitle: string;
  location: string;
  
  // Contact
  phoneMain: string;
  phoneSecondary: string;
  email: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  
  // Address
  address: string;
  city: string;
  postalCode: string;
  country: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  
  // Stats
  followersCount: string;
  googleRating: string;
  
  // Schedule
  schedule: DaySchedule[];
}

export interface HeroContent {
  backgroundImage: string;
  backgroundVideo?: string;
  useVideo: boolean;
  preTitle: string;
  mainTitle: string;
  tagline: string;
  subtitle: string;
}

export interface AboutContent {
  image1: string;
  image2: string;
  section1Title: string;
  section1Highlight: string;
  section1Text1: string;
  section1Text2: string;
  section2Title: string;
  section2Highlight: string;
  section2Text1: string;
  section2Text2: string;
}

export interface MenuSectionContent {
  backgroundVideo?: string;
  backgroundImage: string;
  useVideo: boolean;
  title: string;
  subtitle: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface SiteImages {
  hero: string;
  heroAlt: string;
  rooftop: string;
  terrace: string;
  nightCity: string;
  interior1: string;
  interior2: string;
  interior3: string;
  interiorLighting: string;
  tableSetup: string;
  // Menu categories
  entreesChaudes: string;
  entreesFroides: string;
  pasta: string;
  healthy: string;
  sushi: string;
  seafood: string;
  fish: string;
  pizza: string;
  burger: string;
  steak1: string;
  dessert1: string;
  dessert2: string;
  cocktail1: string;
  cocktail2: string;
  coffee1: string;
  [key: string]: string;
}

export interface ParallaxSection {
  id: string;
  image: string;
  quote: string;
  author?: string;
}

export interface ReviewsSectionContent {
  backgroundVideo?: string;
  backgroundImage: string;
  useVideo: boolean;
}

export interface SiteData {
  settings: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  menuSection: MenuSectionContent;
  reviewsSection: ReviewsSectionContent;
  menu: MenuCategory[];
  experiences: Experience[];
  gallery: GalleryItem[];
  reviews: Review[];
  services: Service[];
  images: SiteImages;
  parallaxSections: ParallaxSection[];
}
