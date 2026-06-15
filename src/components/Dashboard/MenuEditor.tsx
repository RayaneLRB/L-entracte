import { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { FormField, Input, Textarea, Card, Button, Toggle } from './FormField';
import FileUpload from './FileUpload';
import { Plus, Trash2, ChevronDown, ChevronRight, Edit2, Check, X } from 'lucide-react';

export default function MenuEditor() {
  const ctx = useSiteData();
  const { menu, menuSection } = ctx.data;
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Section background */}
      <Card title="Arrière-plan de la Section" description="Vidéo des chefs ou image d'ambiance derrière le menu">
        <div className="space-y-5">
          <Toggle checked={menuSection.useVideo} onChange={(v) => ctx.updateMenuSection({ useVideo: v })} label="Vidéo en arrière-plan" />
          {menuSection.useVideo ? (
            <FileUpload accept="video" value={menuSection.backgroundVideo || ''} onChange={(url) => ctx.updateMenuSection({ backgroundVideo: url })} label="Vidéo" hint="Idéal pour montrer les chefs en action" maxSizeMB={20} />
          ) : (
            <FileUpload accept="image" value={menuSection.backgroundImage} onChange={(url) => ctx.updateMenuSection({ backgroundImage: url })} label="Image" maxSizeMB={5} />
          )}
          <div className="grid md:grid-cols-2 gap-5 pt-4 border-t border-white/[0.04]">
            <FormField label="Titre"><Input value={menuSection.title} onChange={(e) => ctx.updateMenuSection({ title: e.target.value })} /></FormField>
            <FormField label="Sous-titre"><Input value={menuSection.subtitle} onChange={(e) => ctx.updateMenuSection({ subtitle: e.target.value })} /></FormField>
          </div>
          <FormField label="Description"><Textarea value={menuSection.description} onChange={(e) => ctx.updateMenuSection({ description: e.target.value })} rows={2} /></FormField>
        </div>
      </Card>

      {/* Categories */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Catégories</h3>
          <p className="text-white/35 text-sm mt-0.5">{menu.length} catégories · {menu.reduce((a, c) => a + c.subSections.reduce((b, s) => b + s.items.length, 0), 0)} plats</p>
        </div>
        <Button onClick={() => ctx.addMenuCategory({ label: 'Nouvelle', image: '', subSections: [{ id: '', title: '', items: [] }] })}>
          <Plus size={16} /> Catégorie
        </Button>
      </div>

      <div className="space-y-3">
        {menu.map((cat) => (
          <div key={cat.id} className="bg-white/[0.015] border border-white/[0.05] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors" onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}>
              {openCat === cat.id ? <ChevronDown size={16} className="text-white/30" /> : <ChevronRight size={16} className="text-white/30" />}
              <div className="flex-1 min-w-0">
                <span className="text-white font-medium text-sm truncate block">{cat.label}</span>
                <span className="text-white/25 text-xs">{cat.subSections.reduce((a, s) => a + s.items.length, 0)} plats</span>
              </div>
              <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); if (confirm(`Supprimer "${cat.label}" ?`)) ctx.deleteMenuCategory(cat.id); }}>
                <Trash2 size={13} />
              </Button>
            </div>

            {/* Content */}
            {openCat === cat.id && (
              <div className="border-t border-white/[0.04] p-5 space-y-5 bg-white/[0.005]">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField label="Nom"><Input value={cat.label} onChange={(e) => ctx.updateMenuCategory(cat.id, { label: e.target.value })} /></FormField>
                  <FormField label="Note de bas de page"><Input value={cat.footNote || ''} onChange={(e) => ctx.updateMenuCategory(cat.id, { footNote: e.target.value })} placeholder="Optionnel" /></FormField>
                </div>
                <FileUpload accept="image" value={cat.image} onChange={(url) => ctx.updateMenuCategory(cat.id, { image: url })} label="Image de la catégorie" maxSizeMB={3} />

                {/* Sub sections */}
                <div className="pt-4 border-t border-white/[0.04] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm font-medium">Sous-sections</span>
                    <Button size="sm" variant="ghost" onClick={() => ctx.addMenuSubSection(cat.id, { title: '', items: [] })}><Plus size={13} /> Ajouter</Button>
                  </div>

                  {cat.subSections.map((sub) => (
                    <div key={sub.id} className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.03] space-y-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setOpenSub(openSub === sub.id ? null : sub.id)} className="text-white/30 hover:text-white/60">
                          {openSub === sub.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        <Input value={sub.title} onChange={(e) => ctx.updateMenuSubSection(cat.id, sub.id, { title: e.target.value })} placeholder="Titre (optionnel)" className="flex-1" />
                        <span className="text-white/20 text-xs shrink-0">{sub.items.length}</span>
                        <Button variant="danger" size="sm" onClick={() => ctx.deleteMenuSubSection(cat.id, sub.id)}><Trash2 size={12} /></Button>
                      </div>

                      {openSub === sub.id && (
                        <div className="pl-7 space-y-2 pt-2">
                          {sub.note !== undefined && (
                            <Input value={sub.note || ''} onChange={(e) => ctx.updateMenuSubSection(cat.id, sub.id, { note: e.target.value })} placeholder="Note (ex: Selon arrivage)" className="text-xs" />
                          )}

                          {sub.items.map((item) => (
                            <div key={item.id} className="bg-white/[0.015] rounded-lg p-3 border border-white/[0.03]">
                              {editing === item.id ? (
                                <div className="space-y-2">
                                  <Input value={item.name} onChange={(e) => ctx.updateMenuItem(cat.id, sub.id, item.id, { name: e.target.value })} placeholder="Nom" />
                                  <Input value={item.desc} onChange={(e) => ctx.updateMenuItem(cat.id, sub.id, item.id, { desc: e.target.value })} placeholder="Description" />
                                  <div className="flex gap-2">
                                    <Input value={item.price} onChange={(e) => ctx.updateMenuItem(cat.id, sub.id, item.id, { price: e.target.value })} placeholder="Prix" className="w-36" />
                                    <Button size="sm" variant="primary" onClick={() => setEditing(null)}><Check size={13} /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => setEditing(null)}><X size={13} /></Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline gap-2">
                                      <span className="text-white text-sm truncate">{item.name}</span>
                                      <span className="text-brand-gold text-sm shrink-0 font-medium">{item.price}</span>
                                    </div>
                                    <p className="text-white/25 text-xs truncate mt-0.5">{item.desc}</p>
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => setEditing(item.id)}><Edit2 size={12} /></Button>
                                  <Button variant="danger" size="sm" onClick={() => ctx.deleteMenuItem(cat.id, sub.id, item.id)}><Trash2 size={12} /></Button>
                                </div>
                              )}
                            </div>
                          ))}

                          <Button variant="ghost" size="sm" className="w-full border border-dashed border-white/[0.06]"
                            onClick={() => ctx.addMenuItem(cat.id, sub.id, { name: 'Nouveau Plat', desc: 'Description', price: '0 DA' })}>
                            <Plus size={13} /> Plat
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
