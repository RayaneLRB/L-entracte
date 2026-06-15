import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Textarea, Card, Button, Select } from './FormField';
import FileUpload from './FileUpload';
import { Plus, Trash2 } from 'lucide-react';

const ICONS = ['Sun','Moon','Coffee','Cake','Wine','Users','Sunset','Fish','UtensilsCrossed','Heart','Star','Sparkles'];

export default function ExperiencesEditor() {
  const { data, updateExperience, addExperience, deleteExperience } = useSiteData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Cartes d'Expérience</h3>
          <p className="text-white/35 text-sm mt-0.5">{data.experiences.length} expériences affichées</p>
        </div>
        <Button onClick={() => addExperience({ icon: 'Star', title: 'Nouvelle', description: 'Description', image: '' })}>
          <Plus size={16} /> Ajouter
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {data.experiences.map((exp) => (
          <Card key={exp.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid grid-cols-2 gap-4 flex-1 min-w-0">
                  <FormField label="Icône">
                    <Select value={exp.icon} onChange={(e) => updateExperience(exp.id, { icon: e.target.value })}>
                      {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                    </Select>
                  </FormField>
                  <FormField label="Titre">
                    <Input value={exp.title} onChange={(e) => updateExperience(exp.id, { title: e.target.value })} />
                  </FormField>
                </div>
                <Button variant="danger" size="sm" onClick={() => { if (confirm(`Supprimer "${exp.title}" ?`)) deleteExperience(exp.id); }} className="shrink-0 mt-6">
                  <Trash2 size={14} />
                </Button>
              </div>
              <FormField label="Description">
                <Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} rows={2} />
              </FormField>
              <FileUpload accept="image" value={exp.image} onChange={(url) => updateExperience(exp.id, { image: url })} label="Image" maxSizeMB={3} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
