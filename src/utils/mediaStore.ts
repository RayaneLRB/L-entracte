import { supabase } from './supabase';

export function isMediaRef(value?: string | null): boolean {
  return !!value && (value.startsWith('idb:') || value.includes('supabase'));
}

// Upload file to Supabase Storage, return public URL
export async function storeMedia(
  file: Blob,
  folder = 'uploads',
  onProgress?: (percent: number) => void
): Promise<string> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const ext = file.type.includes('video') ? 'mp4' : file.type.includes('png') ? 'png' : 'jpg';
  const path = `${folder}/${id}.${ext}`;

  onProgress?.(10);

  console.log('[Supabase] Uploading media...', { path, type: file.type });
  const { error } = await supabase.storage
    .from('media')
    .upload(path, file, { cacheControl: '3600', upsert: false });

  if (error) {
    console.error('[Supabase] Upload error:', error.message);
    throw error;
  }
  console.log('[Supabase] Media uploaded successfully');

  onProgress?.(85);

  const { data: urlData } = supabase.storage
    .from('media')
    .getPublicUrl(path);

  onProgress?.(100);

  return urlData.publicUrl;
}

// Delete from Supabase Storage
export async function deleteMedia(value: string): Promise<void> {
  if (!value || !value.includes('supabase')) return;
  try {
    // Extract path from public URL: .../storage/v1/object/public/media/folder/file.ext
    const match = value.match(/\/media\/(.+)$/);
    if (match) {
      console.log('[Supabase] Deleting media...', { path: match[1] });
      const { error } = await supabase.storage.from('media').remove([match[1]]);
      if (error) {
        console.warn('[Supabase] Delete error:', error.message);
      } else {
        console.log('[Supabase] Media deleted successfully');
      }
    }
  } catch (e) { console.warn('[Supabase] Storage delete error:', e); }
}

// Backward compat for old idb: refs
export async function getMediaBlob(value: string): Promise<Blob | null> {
  if (!value.startsWith('idb:')) return null;
  try {
    const id = value.slice(4);
    return new Promise((resolve) => {
      const req = indexedDB.open('lentracte_media', 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains('files')) req.result.createObjectStore('files');
      };
      req.onsuccess = () => {
        try {
          const tx = req.result.transaction('files', 'readonly');
          const get = tx.objectStore('files').get(id);
          get.onsuccess = () => resolve(get.result ?? null);
          get.onerror = () => resolve(null);
        } catch { resolve(null); }
      };
      req.onerror = () => resolve(null);
    });
  } catch { return null; }
}
