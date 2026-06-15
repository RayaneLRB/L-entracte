import { useSiteData } from '../../context/SiteDataContext';
import { Card } from './FormField';
import FileUpload from './FileUpload';

const GROUPS = [
  { title: 'Hero & Ambiance', desc: 'Images principales', items: [
    { key: 'hero', label: 'Hero Principal' }, { key: 'heroAlt', label: 'Hero Alternatif' },
    { key: 'rooftop', label: 'Rooftop' }, { key: 'terrace', label: 'Terrasse' }, { key: 'nightCity', label: 'Vue Nocturne' },
  ]},
  { title: 'Intérieur', desc: 'Espaces du restaurant', items: [
    { key: 'interior1', label: 'Intérieur 1' }, { key: 'interior2', label: 'Intérieur 2' },
    { key: 'interior3', label: 'Intérieur 3' }, { key: 'interiorLighting', label: 'Éclairage' }, { key: 'tableSetup', label: 'Mise en Place' },
  ]},
  { title: 'Menu — Catégories', desc: 'Images des catégories', items: [
    { key: 'entreesChaudes', label: 'Entrées Chaudes' }, { key: 'entreesFroides', label: 'Entrées Froides' },
    { key: 'pasta', label: 'Pâtes' }, { key: 'healthy', label: 'Healthy' }, { key: 'sushi', label: 'Sushi' },
    { key: 'seafood', label: 'Fruits de Mer' }, { key: 'fish', label: 'Poissons' }, { key: 'pizza', label: 'Pizza' },
    { key: 'burger', label: 'Burgers' }, { key: 'steak1', label: 'Viandes' },
  ]},
  { title: 'Desserts & Boissons', desc: 'Photos sweet & drinks', items: [
    { key: 'dessert1', label: 'Dessert 1' }, { key: 'dessert2', label: 'Dessert 2' }, { key: 'dessert3', label: 'Dessert 3' },
    { key: 'cocktail1', label: 'Cocktail 1' }, { key: 'cocktail2', label: 'Cocktail 2' }, { key: 'cocktail3', label: 'Cocktail 3' },
    { key: 'coffee1', label: 'Café' },
  ]},
];

export default function MediaManager() {
  const { data, updateImage } = useSiteData();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-gold/[0.06] to-transparent border border-brand-gold/10 rounded-2xl p-5 flex items-start gap-4">
        <span className="text-2xl mt-0.5">🖼️</span>
        <div>
          <p className="text-white font-medium text-sm">Gestionnaire de Médias</p>
          <p className="text-white/40 text-[13px] mt-1">Modifiez n'importe quelle image du site. Uploadez un fichier ou collez une URL.</p>
        </div>
      </div>

      {GROUPS.map((g) => (
        <Card key={g.title} title={g.title} description={g.desc}>
          <div className="grid md:grid-cols-2 gap-6">
            {g.items.map(({ key, label }) => (
              <FileUpload
                key={key} accept="image" label={label}
                value={data.images[key] || ''} onChange={(url) => updateImage(key, url)} maxSizeMB={5}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
