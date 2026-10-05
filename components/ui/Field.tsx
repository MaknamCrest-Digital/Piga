import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-xl border border-line bg-paper px-4 text-[15px] text-ink transition placeholder:text-muted/60 focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-200/60 aria-[invalid=true]:border-red-400";

type Base = { label: string; name: string; error?: string; hint?: ReactNode; optional?: boolean; className?: string };

function Wrap({ label, name, error, hint, optional, className = "", children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-forest-900">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

export function TextField({ label, name, error, hint, optional, className, ...props }: Base & ComponentProps<"input">) {
  return (
    <Wrap {...{ label, name, error, hint, optional, className }}>
      <input id={name} name={name} required={!optional} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} className={`${control} h-12`} {...props} />
    </Wrap>
  );
}

export function TextArea({ label, name, error, hint, optional, className, ...props }: Base & ComponentProps<"textarea">) {
  return (
    <Wrap {...{ label, name, error, hint, optional, className }}>
      <textarea id={name} name={name} required={!optional} aria-invalid={!!error} rows={5} className={`${control} py-3`} {...props} />
    </Wrap>
  );
}

export function SelectField({ label, name, error, hint, optional, className, options, ...props }: Base & ComponentProps<"select"> & { options: string[] }) {
  return (
    <Wrap {...{ label, name, error, hint, optional, className }}>
      <select id={name} name={name} required={!optional} aria-invalid={!!error} className={`${control} h-12`} defaultValue="" {...props}>
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Wrap>
  );
}

/** Off-screen honeypot. Bots fill it, people don't. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label>Leave this empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

export function FormStatus({ status, message }: { status: string; message?: string }) {
  if (status === "idle" || !message) return null;
  return (
    <p role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${status === "success" ? "bg-mint-100 text-forest-900" : "bg-gold-soft text-forest-950"}`}>
      {message}
    </p>
  );
}
