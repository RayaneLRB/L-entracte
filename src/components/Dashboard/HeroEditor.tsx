import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Textarea, Card, Toggle } from './FormField';
import FileUpload from './FileUpload';

export default function HeroEditor() {
  const { data, updateHero } = useSiteData();
  const h = data.hero;

  return (
    <div className="space-y-6">
      <Card title="Arrière-plan Hero" description="Image ou vidéo plein écran sur la page d'accueil">
        <div className="space-y-6">
          <Toggle checked={h.useVideo} onChange={(v) => updateHero({ useVideo: v })} label="Utiliser une vidéo" />
          {h.useVideo ? (
            <FileUpload
              accept="video" value={h.backgroundVideo || ''} onChange={(url) => updateHero({ backgroundVideo: url })}
              label="Vidéo de Fond" hint="MP4/WebM — Lecture auto, muette, en boucle" maxSizeMB={15}
            />
          ) : (
            <FileUpload
              accept="image" value={h.backgroundImage} onChange={(url) => updateHero({ backgroundImage: url })}
              label="Image de Fond" hint="Résolution recommandée : 1920×1080 minimum" maxSizeMB={5}
            />
          )}
        </div>
      </Card>

      <Card title="Textes du Hero" description="Contenu textuel affiché en superposition">
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Pré-titre" hint="Au-dessus du titre">
              <Input value={h.preTitle} onChange={(e) => updateHero({ preTitle: e.target.value })} />
            </FormField>
            <FormField label="Titre Principal">
              <Input value={h.mainTitle} onChange={(e) => updateHero({ mainTitle: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Tagline" hint="En italique sous le titre">
            <Input value={h.tagline} onChange={(e) => updateHero({ tagline: e.target.value })} />
          </FormField>
          <FormField label="Sous-titre">
            <Textarea value={h.subtitle} onChange={(e) => updateHero({ subtitle: e.target.value })} rows={2} />
          </FormField>
        </div>
      </Card>
    </div>
  );
}
