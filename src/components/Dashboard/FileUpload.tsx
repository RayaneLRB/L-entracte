import { useState, useRef } from 'react';
import { Upload, X, Film, Image as Img, Check, Cloud } from 'lucide-react';
import { storeMedia, deleteMedia, isMediaRef } from '../../utils/mediaStore';
import { useMediaUrl } from '../../hooks/useMediaUrl';

interface FileUploadProps {
  accept: 'video' | 'image' | 'both';
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  maxSizeMB?: number;
}

export default function FileUpload({ accept, value, onChange, label, hint, maxSizeMB = 10 }: FileUploadProps) {
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const types = { video: 'video/mp4,video/webm', image: 'image/jpeg,image/png,image/webp,image/gif', both: 'video/mp4,video/webm,image/jpeg,image/png,image/webp' };

  const process = async (file: File) => {
    setErr('');
    if (file.size / 1048576 > maxSizeMB) { setErr(`Max ${maxSizeMB}MB — fichier: ${(file.size / 1048576).toFixed(1)}MB`); return; }
    if (accept === 'video' && !file.type.startsWith('video/')) { setErr('Format vidéo requis (MP4, WebM)'); return; }
    if (accept === 'image' && !file.type.startsWith('image/')) { setErr('Format image requis (JPG, PNG, WebP)'); return; }
    setBusy(true); setProgress(0);

    try {
      const prev = value;
      const folder = file.type.startsWith('video/') ? 'videos' : 'images';
      const url = await storeMedia(file, folder, (p) => setProgress(p));
      onChange(url);
      setBusy(false);
      if (prev && isMediaRef(prev)) deleteMedia(prev).catch(() => {});
    } catch (e) {
      console.error('Upload error:', e);
      setErr("Erreur lors de l'upload. Vérifiez votre connexion.");
      setBusy(false);
    }
  };

  const isVideo = !!value && (value.startsWith('data:video') || value.includes('/video') || !!value.match(/\.(mp4|webm)/));
  const isCloud = !!value && (value.includes('supabase') || value.includes('firebasestorage'));
  const isLocal = !!value && (value.startsWith('data:') || value.startsWith('idb:'));
  const has = !!value;
  const previewUrl = useMediaUrl(value);

  return (
    <div className="space-y-2.5">
      {label && <label className="block text-[13px] font-medium text-white/60">{label}</label>}

      <div className="flex gap-2">
        <input
          type="text"
          value={isCloud ? '☁️ Hébergé en ligne' : isLocal ? '📎 Fichier local' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={accept === 'video' ? 'URL vidéo ou uploadez...' : 'URL image ou uploadez...'}
          readOnly={isCloud || isLocal}
          className="flex-1 h-11 px-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-gold/40 transition-all"
        />
        {has && (
          <button onClick={() => { if (isCloud) deleteMedia(value).catch(() => {}); onChange(''); }} className="h-11 w-11 shrink-0 flex items-center justify-center bg-red-500/10 border border-red-500/15 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      <div
        onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) process(e.dataTransfer.files[0]); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          drag ? 'border-brand-gold/50 bg-brand-gold/[0.04] scale-[1.01]' : 'border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.01]'
        } ${busy ? 'pointer-events-none' : ''}`}
      >
        <input ref={inputRef} type="file" accept={types[accept]} onChange={(e) => { if (e.target.files?.[0]) process(e.target.files[0]); }} className="hidden" />
        {busy ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-brand-gold/10 flex items-center justify-center">
              <div className="w-6 h-6 border-[2.5px] border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
            </div>
            <p className="text-white/50 text-sm">Upload en cours… {progress}%</p>
            <div className="max-w-[200px] mx-auto h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-brand-gold rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="p-7 text-center">
            <div className="w-11 h-11 mx-auto rounded-xl bg-white/[0.04] flex items-center justify-center mb-3">
              {accept === 'video' ? <Film size={18} className="text-white/30" /> : accept === 'image' ? <Img size={18} className="text-white/30" /> : <Upload size={18} className="text-white/30" />}
            </div>
            <p className="text-white/50 text-sm">Glisser-déposer ou <span className="text-brand-gold">parcourir</span></p>
            <p className="text-white/20 text-xs mt-1">{accept === 'video' ? 'MP4, WebM' : accept === 'image' ? 'JPG, PNG, WebP' : 'MP4, JPG, PNG'} — Max {maxSizeMB}MB</p>
          </div>
        )}
      </div>

      {err && <p className="text-red-400 text-xs bg-red-500/[0.06] border border-red-500/10 rounded-xl px-4 py-2">{err}</p>}

      {has && !busy && (
        <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-black/40">
          {isVideo ? (
            previewUrl ? <video src={previewUrl} className="w-full h-40 object-cover" controls muted /> : <div className="w-full h-40 flex items-center justify-center text-white/30 text-sm">Chargement…</div>
          ) : (
            previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" /> : <div className="w-full h-40 flex items-center justify-center text-white/30 text-sm">Chargement…</div>
          )}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-lg px-2.5 py-1">
            {isCloud ? <><Cloud size={12} className="text-blue-400" /><span className="text-white/70 text-[11px]">Cloud</span></> : <><Check size={12} className="text-emerald-400" /><span className="text-white/70 text-[11px]">{isLocal ? 'Local' : 'URL'}</span></>}
          </div>
        </div>
      )}

      {hint && <p className="text-[11px] text-white/20">{hint}</p>}
    </div>
  );
}
