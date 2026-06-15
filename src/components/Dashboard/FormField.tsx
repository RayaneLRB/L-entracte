import { type ReactNode } from 'react';

/* ─── FORM FIELD ───────────────────────────── */
export function FormField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-medium text-white/60">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-white/25 leading-relaxed">{hint}</p>}
    </div>
  );
}

/* ─── INPUT ────────────────────────────────── */
export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-11 px-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-gold/40 focus:ring-[3px] focus:ring-brand-gold/[0.08] transition-all duration-200 ${className}`}
    />
  );
}

/* ─── TEXTAREA ─────────────────────────────── */
export function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-gold/40 focus:ring-[3px] focus:ring-brand-gold/[0.08] transition-all duration-200 resize-none leading-relaxed ${className}`}
    />
  );
}

/* ─── SELECT ───────────────────────────────── */
export function Select({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
      className={`w-full h-11 px-4 bg-white/[0.03] border border-white/[0.07] rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold/40 focus:ring-[3px] focus:ring-brand-gold/[0.08] transition-all duration-200 appearance-none cursor-pointer ${className}`}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '14px' }}
    >
      {children}
    </select>
  );
}

/* ─── TOGGLE ───────────────────────────────── */
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-[46px] h-[26px] rounded-full transition-all duration-300 ${
          checked ? 'bg-brand-gold shadow-[0_0_12px_rgba(201,169,110,0.25)]' : 'bg-white/[0.08]'
        }`}
      >
        <div className={`absolute top-[3px] w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${checked ? 'left-[23px]' : 'left-[3px]'}`} />
      </button>
      {label && <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{label}</span>}
    </label>
  );
}

/* ─── CARD ─────────────────────────────────── */
export function Card({ title, description, children, className = '' }: { title?: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white/[0.015] border border-white/[0.05] rounded-2xl overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-6 py-5 border-b border-white/[0.04]">
          {title && <h3 className="text-[15px] text-white font-medium">{title}</h3>}
          {description && <p className="text-white/35 text-[13px] mt-1 leading-relaxed">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ─── BUTTON ───────────────────────────────── */
export function Button({ variant = 'secondary', size = 'md', children, className = '', ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; size?: 'sm' | 'md'; children: ReactNode }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-40';
  const sz = size === 'sm' ? 'px-3 py-2 text-xs rounded-lg' : 'px-5 py-2.5 text-sm rounded-xl';
  const v: Record<string, string> = {
    primary: 'bg-brand-gold text-black hover:bg-brand-gold-light shadow-md shadow-brand-gold/15',
    secondary: 'bg-white/[0.05] text-white/80 hover:bg-white/[0.08] border border-white/[0.06]',
    danger: 'bg-red-500/[0.08] text-red-400/80 hover:bg-red-500/[0.15] border border-red-500/10',
    ghost: 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]',
  };
  return <button {...props} className={`${base} ${sz} ${v[variant]} ${className}`}>{children}</button>;
}

/* ─── IMAGE PREVIEW ────────────────────────── */
export function ImagePreview({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.06] aspect-video bg-black/40">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
