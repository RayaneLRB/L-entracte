import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Card, Button, Select } from './FormField';
import { Plus, Trash2 } from 'lucide-react';

const ICONS = ['TreePine','Sunset','UtensilsCrossed','Truck','ShoppingBag','CalendarCheck','Wifi','Car','Clock','Users','Heart','Star','Coffee','Phone','MapPin','Home','Gift','Music','Camera'];

export default function ServicesEditor() {
  const { data, updateService, addService, deleteService } = useSiteData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Services</h3>
          <p className="text-white/35 text-sm mt-0.5">{data.services.length} services affichés</p>
        </div>
        <Button onClick={() => addService({ icon: 'Star', title: 'Nouveau', desc: 'Description' })}>
          <Plus size={16} /> Ajouter
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.services.map((s) => (
          <Card key={s.id}>
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <FormField label="Icône">
                  <Select value={s.icon} onChange={(e) => updateService(s.id, { icon: e.target.value })}>
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </Select>
                </FormField>
                <Button variant="danger" size="sm" onClick={() => { if (confirm(`Supprimer "${s.title}" ?`)) deleteService(s.id); }} className="shrink-0 mt-6">
                  <Trash2 size={14} />
                </Button>
              </div>
              <FormField label="Titre">
                <Input value={s.title} onChange={(e) => updateService(s.id, { title: e.target.value })} />
              </FormField>
              <FormField label="Description">
                <Input value={s.desc} onChange={(e) => updateService(s.id, { desc: e.target.value })} />
              </FormField>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
