import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Textarea, Card, Button, Select, Toggle } from './FormField';
import FileUpload from './FileUpload';
import { Plus, Trash2, Star } from 'lucide-react';

export default function ReviewsEditor() {
  const { data, updateReview, addReview, deleteReview, updateReviewsSection } = useSiteData();
  const rs = data.reviewsSection;

  return (
    <div className="space-y-6">
      {/* Video/Image Background */}
      <Card title="Arrière-plan Témoignages & Services" description="Vidéo ou image fixe visible en fond pendant le scroll des sections Avis et Services">
        <div className="space-y-5">
          <Toggle checked={rs.useVideo} onChange={(v) => updateReviewsSection({ useVideo: v })} label="Utiliser une vidéo en arrière-plan" />
          {rs.useVideo ? (
            <FileUpload
              accept="video" value={rs.backgroundVideo || ''} onChange={(url) => updateReviewsSection({ backgroundVideo: url })}
              label="Vidéo de Fond" hint="La vidéo reste visible en fond pendant le scroll des sections Avis et Services" maxSizeMB={20}
            />
          ) : (
            <FileUpload
              accept="image" value={rs.backgroundImage} onChange={(url) => updateReviewsSection({ backgroundImage: url })}
              label="Image de Fond" maxSizeMB={5}
            />
          )}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Avis Clients</h3>
          <p className="text-white/35 text-sm mt-0.5">{data.reviews.length} témoignages affichés</p>
        </div>
        <Button onClick={() => addReview({ name: 'Nom', rating: 5, text: 'Avis...', date: 'Récemment', source: 'Google' })}>
          <Plus size={16} /> Ajouter
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.reviews.map((r) => (
          <Card key={r.id}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <button key={i} onClick={() => updateReview(r.id, { rating: i })} className="p-0.5 hover:scale-125 transition-transform">
                      <Star size={18} className={i <= r.rating ? 'text-brand-gold fill-brand-gold' : 'text-white/10'} />
                    </button>
                  ))}
                </div>
                <Button variant="danger" size="sm" onClick={() => { if (confirm('Supprimer ?')) deleteReview(r.id); }}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <FormField label="Nom">
                  <Input value={r.name} onChange={(e) => updateReview(r.id, { name: e.target.value })} />
                </FormField>
                <FormField label="Date">
                  <Input value={r.date} onChange={(e) => updateReview(r.id, { date: e.target.value })} />
                </FormField>
                <FormField label="Source">
                  <Select value={r.source} onChange={(e) => updateReview(r.id, { source: e.target.value })}>
                    {['Google', 'TripAdvisor', 'Facebook', 'Instagram'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormField>
              </div>
              <FormField label="Témoignage">
                <Textarea value={r.text} onChange={(e) => updateReview(r.id, { text: e.target.value })} rows={3} />
              </FormField>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
