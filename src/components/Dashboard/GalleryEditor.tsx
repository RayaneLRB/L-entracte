import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Card, Button, Select } from './FormField';
import FileUpload from './FileUpload';
import { Plus, Trash2 } from 'lucide-react';

const CATS = ['Intérieur', 'Cuisine', 'Boissons', 'Desserts', 'Ambiance'];

export default function GalleryEditor() {
  const { data, updateGalleryItem, addGalleryItem, deleteGalleryItem } = useSiteData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Galerie Photos</h3>
          <p className="text-white/35 text-sm mt-0.5">{data.gallery.length} images dans la galerie</p>
        </div>
        <Button onClick={() => addGalleryItem({ src: '', alt: 'Nouvelle image', category: 'Cuisine' })}>
          <Plus size={16} /> Ajouter
        </Button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.gallery.map((item) => (
          <Card key={item.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid grid-cols-2 gap-3 flex-1 min-w-0">
                  <FormField label="Catégorie">
                    <Select value={item.category} onChange={(e) => updateGalleryItem(item.id, { category: e.target.value })}>
                      {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </Select>
                  </FormField>
                  <FormField label="Alt text">
                    <Input value={item.alt} onChange={(e) => updateGalleryItem(item.id, { alt: e.target.value })} />
                  </FormField>
                </div>
                <Button variant="danger" size="sm" onClick={() => deleteGalleryItem(item.id)} className="shrink-0 mt-6">
                  <Trash2 size={14} />
                </Button>
              </div>
              <FileUpload accept="image" value={item.src} onChange={(url) => updateGalleryItem(item.id, { src: url })} maxSizeMB={3} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
