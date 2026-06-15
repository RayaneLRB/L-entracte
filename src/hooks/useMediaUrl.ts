import { useEffect, useState } from 'react';
import { getMediaBlob } from '../utils/mediaStore';

const IDB_PREFIX = 'idb:';

export function useMediaUrl(src?: string): string | undefined {
  const [url, setUrl] = useState<string | undefined>(() => {
    if (!src) return undefined;
    if (src.startsWith(IDB_PREFIX)) return undefined;
    return src; // Supabase URLs, pexels URLs, data: URIs → direct
  });

  useEffect(() => {
    if (!src) { setUrl(undefined); return; }
    if (!src.startsWith(IDB_PREFIX)) { setUrl(src); return; }

    let objectUrl: string | undefined;
    let cancelled = false;
    getMediaBlob(src)
      .then((blob) => {
        if (cancelled) return;
        if (blob) { objectUrl = URL.createObjectURL(blob); setUrl(objectUrl); }
        else setUrl(undefined);
      })
      .catch(() => { if (!cancelled) setUrl(undefined); });
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [src]);

  return url;
}
