import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

const hashPwd = (p: string) => {
  let h = 0;
  for (let i = 0; i < p.length; i++) { h = ((h << 5) - h) + p.charCodeAt(i); h = h & h; }
  return h.toString(36);
};
const VALID = hashPwd('entracte2025');

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (hashPwd(password) === VALID) {
        sessionStorage.setItem('dashboard_auth', 'true');
        onLogin();
      } else { setError(true); setPassword(''); }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#08080a] flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-brand-gold/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] bg-brand-gold/[0.03] rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px]"
      >
        <div className="bg-[#111113]/90 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-8 md:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 15 }}
            className="w-[72px] h-[72px] mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/15 flex items-center justify-center"
          >
            <Lock size={28} className="text-brand-gold" />
          </motion.div>

          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-white tracking-wide mb-1">Espace Administration</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-px bg-brand-gold/30" />
              <p className="text-brand-gold/60 text-xs tracking-[0.2em] uppercase font-light">L'Entracte</p>
              <div className="w-5 h-px bg-brand-gold/30" />
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-[13px] text-white/50 mb-2 font-light">Mot de passe</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="••••••••••••"
                  autoFocus
                  className={`w-full h-[52px] px-5 pr-14 bg-white/[0.04] rounded-2xl text-white text-sm placeholder-white/20 focus:outline-none transition-all duration-300 border ${
                    error ? 'border-red-500/40 ring-4 ring-red-500/10' : 'border-white/[0.08] focus:border-brand-gold/40 focus:ring-4 focus:ring-brand-gold/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-white/25 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm mt-3 bg-red-500/[0.08] border border-red-500/10 rounded-xl px-4 py-2.5"
                >
                  <AlertCircle size={15} className="shrink-0" />
                  <span className="text-[13px]">Mot de passe incorrect</span>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-[52px] bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-semibold rounded-2xl hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-[2.5px] border-brand-black/20 border-t-brand-black rounded-full animate-spin" />
              ) : (
                <>Accéder au Dashboard</>
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-white/[0.04] text-center">
            <button
              onClick={() => { history.pushState('', '', window.location.pathname); window.location.reload(); }}
              className="inline-flex items-center gap-2 text-white/25 text-sm hover:text-white/50 transition-colors"
            >
              <ArrowLeft size={14} />
              Retour au site
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
