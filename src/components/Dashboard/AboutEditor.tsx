import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Textarea, Card } from './FormField';
import FileUpload from './FileUpload';

export default function AboutEditor() {
  const { data, updateAbout } = useSiteData();
  const a = data.about;

  return (
    <div className="space-y-6">
      <Card title="Images" description="Photos d'ambiance de la section À Propos">
        <div className="grid md:grid-cols-2 gap-6">
          <FileUpload accept="image" value={a.image1} onChange={(url) => updateAbout({ image1: url })} label="Image 1 — Histoire" maxSizeMB={5} />
          <FileUpload accept="image" value={a.image2} onChange={(url) => updateAbout({ image2: url })} label="Image 2 — Engagement" maxSizeMB={5} />
        </div>
      </Card>

      <Card title="Section 1 — Notre Histoire">
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Titre"><Input value={a.section1Title} onChange={(e) => updateAbout({ section1Title: e.target.value })} /></FormField>
            <FormField label="Highlight (doré)" hint="Texte en italique doré"><Input value={a.section1Highlight} onChange={(e) => updateAbout({ section1Highlight: e.target.value })} /></FormField>
          </div>
          <FormField label="Paragraphe 1"><Textarea value={a.section1Text1} onChange={(e) => updateAbout({ section1Text1: e.target.value })} rows={4} /></FormField>
          <FormField label="Paragraphe 2"><Textarea value={a.section1Text2} onChange={(e) => updateAbout({ section1Text2: e.target.value })} rows={4} /></FormField>
        </div>
      </Card>

      <Card title="Section 2 — Notre Engagement">
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Titre"><Input value={a.section2Title} onChange={(e) => updateAbout({ section2Title: e.target.value })} /></FormField>
            <FormField label="Highlight (doré)"><Input value={a.section2Highlight} onChange={(e) => updateAbout({ section2Highlight: e.target.value })} /></FormField>
          </div>
          <FormField label="Paragraphe 1"><Textarea value={a.section2Text1} onChange={(e) => updateAbout({ section2Text1: e.target.value })} rows={4} /></FormField>
          <FormField label="Paragraphe 2"><Textarea value={a.section2Text2} onChange={(e) => updateAbout({ section2Text2: e.target.value })} rows={4} /></FormField>
        </div>
      </Card>
    </div>
  );
}
