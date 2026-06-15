import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Card } from './FormField';
import FileUpload from './FileUpload';
import { Phone, MapPin, Clock, Camera } from 'lucide-react';

export default function GeneralSettings() {
  const { data, updateSettings } = useSiteData();
  const s = data.settings;

  return (
    <div className="space-y-6">
      {/* Logo */}
      <Card title="Logo" description="Logo affiché dans la navigation, le loading screen et le footer. Laissez vide pour afficher le nom en texte.">
        <div className="max-w-md">
          <FileUpload
            accept="image"
            value={s.logo}
            onChange={(url) => updateSettings({ logo: url })}
            label="Image du Logo"
            hint="PNG transparent recommandé. Hauteur idéale : 120px minimum."
            maxSizeMB={2}
          />
        </div>
      </Card>

      <Card title="Identité de Marque" description="Nom, tagline et localisation du restaurant">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Nom du Site" hint="Utilisé si aucun logo n'est défini">
            <Input value={s.siteName} onChange={(e) => updateSettings({ siteName: e.target.value })} />
          </FormField>
          <FormField label="Localisation (Header)">
            <Input value={s.location} onChange={(e) => updateSettings({ location: e.target.value })} />
          </FormField>
          <FormField label="Tagline" hint="Phrase d'accroche principale">
            <Input value={s.tagline} onChange={(e) => updateSettings({ tagline: e.target.value })} />
          </FormField>
          <FormField label="Sous-titre">
            <Input value={s.subtitle} onChange={(e) => updateSettings({ subtitle: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card title="Chiffres Clés" description="Statistiques mises en avant">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Followers" hint="Ex: 357K">
            <Input value={s.followersCount} onChange={(e) => updateSettings({ followersCount: e.target.value })} />
          </FormField>
          <FormField label="Note Google" hint="Ex: 4.0">
            <Input value={s.googleRating} onChange={(e) => updateSettings({ googleRating: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card title="Contact" description="Numéros et email affichés aux visiteurs">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Téléphone Principal">
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <Input value={s.phoneMain} onChange={(e) => updateSettings({ phoneMain: e.target.value })} className="pl-11" />
            </div>
          </FormField>
          <FormField label="Téléphone Secondaire">
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <Input value={s.phoneSecondary} onChange={(e) => updateSettings({ phoneSecondary: e.target.value })} className="pl-11" />
            </div>
          </FormField>
          <FormField label="Email">
            <Input value={s.email} onChange={(e) => updateSettings({ email: e.target.value })} type="email" />
          </FormField>
          <FormField label="WhatsApp" hint="Sans le + (213550222523)">
            <Input value={s.whatsappNumber} onChange={(e) => updateSettings({ whatsappNumber: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card title="Réseaux Sociaux">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Handle Instagram">
            <div className="relative">
              <Camera size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <Input value={s.instagramHandle} onChange={(e) => updateSettings({ instagramHandle: e.target.value })} className="pl-11" />
            </div>
          </FormField>
          <FormField label="URL Instagram">
            <Input value={s.instagramUrl} onChange={(e) => updateSettings({ instagramUrl: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card title="Adresse" description="Localisation physique du restaurant">
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Rue">
            <div className="relative">
              <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <Input value={s.address} onChange={(e) => updateSettings({ address: e.target.value })} className="pl-11" />
            </div>
          </FormField>
          <FormField label="Ville">
            <Input value={s.city} onChange={(e) => updateSettings({ city: e.target.value })} />
          </FormField>
          <FormField label="Code Postal">
            <Input value={s.postalCode} onChange={(e) => updateSettings({ postalCode: e.target.value })} />
          </FormField>
          <FormField label="Pays">
            <Input value={s.country} onChange={(e) => updateSettings({ country: e.target.value })} />
          </FormField>
          <FormField label="Lien Google Maps" hint="URL de partage">
            <Input value={s.googleMapsUrl} onChange={(e) => updateSettings({ googleMapsUrl: e.target.value })} />
          </FormField>
          <FormField label="Iframe Google Maps" hint="URL embed">
            <Input value={s.googleMapsEmbed} onChange={(e) => updateSettings({ googleMapsEmbed: e.target.value })} />
          </FormField>
        </div>
      </Card>

      <Card title="Horaires d'Ouverture" description="Affichés dans la section dédiée et le footer">
        <div className="space-y-3">
          {s.schedule.map((d, i) => (
            <div key={d.day} className="flex items-center gap-4">
              <div className="w-28 flex items-center gap-2 shrink-0">
                <Clock size={13} className="text-white/20" />
                <span className={`text-[13px] ${d.highlight ? 'text-brand-gold font-medium' : 'text-white/50'}`}>{d.day}</span>
              </div>
              <Input
                value={d.hours}
                onChange={(e) => {
                  const n = [...s.schedule]; n[i] = { ...d, hours: e.target.value };
                  updateSettings({ schedule: n });
                }}
                className="flex-1"
              />
              <label className="flex items-center gap-2 text-[12px] text-white/30 cursor-pointer shrink-0">
                <input
                  type="checkbox" checked={d.highlight}
                  onChange={(e) => {
                    const n = [...s.schedule]; n[i] = { ...d, highlight: e.target.checked };
                    updateSettings({ schedule: n });
                  }}
                  className="rounded-sm bg-white/5 border-white/15 text-brand-gold focus:ring-brand-gold/20 w-4 h-4"
                />
                Spécial
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
