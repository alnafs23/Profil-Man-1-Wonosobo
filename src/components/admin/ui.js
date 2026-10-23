"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "./Icon";
import { fileToStorageUrl } from "@/lib/image";

/* ---------------------------- toast + konfirmasi --------------------------- */

const Ctx = createContext(null);
export const useUI = () => useContext(Ctx);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [dlg, setDlg] = useState(null);

  const toast = useCallback((msg, tone = "success") => {
    const id = Math.random();
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const confirm = useCallback(
    (opts) => new Promise((res) => setDlg({ ...opts, res })),
    [],
  );
  const tutup = (ok) => {
    dlg.res(ok);
    setDlg(null);
  };

  return (
    <Ctx.Provider value={{ toast, confirm }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-2 rounded-md border px-3 py-2.5 shadow-lg backdrop-blur ${t.tone === "error" ? "border-ad-danger/50 bg-ad-card text-ad-fg" : "border-ad-success/50 bg-ad-card text-ad-fg"}`}
          >
            <Icon
              name={t.tone === "error" ? "alert" : "check"}
              className={
                t.tone === "error"
                  ? "mt-0.5 text-ad-danger"
                  : "mt-0.5 text-ad-success"
              }
            />
            <p className="text-[13px] leading-snug">{t.msg}</p>
          </div>
        ))}
      </div>
      <Modal
        open={!!dlg}
        onClose={() => tutup(false)}
        title={dlg?.title}
        size="sm"
        footer={
          <>
            <Btn onClick={() => tutup(false)}>Batal</Btn>
            <Btn
              variant={dlg?.tone === "danger" ? "danger" : "primary"}
              onClick={() => tutup(true)}
            >
              {dlg?.confirmLabel || "Lanjutkan"}
            </Btn>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-ad-muted">
          {dlg?.message}
        </p>
      </Modal>
    </Ctx.Provider>
  );
}

/* --------------------------------- tombol ---------------------------------- */

const VARIAN = {
  primary: "bg-ad-primary text-white hover:brightness-110",
  secondary: "border border-ad-line bg-ad-hover text-ad-fg hover:bg-ad-line/60",
  danger: "bg-ad-danger text-white hover:brightness-110",
  ghost: "text-ad-muted hover:bg-ad-hover hover:text-ad-fg",
};

export function Btn({
  variant = "secondary",
  size = "md",
  icon,
  children,
  className = "",
  as,
  href,
  ...p
}) {
  const cls = `inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50 disabled:cursor-not-allowed disabled:opacity-50 ${
    size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-[13px]"
  } ${VARIAN[variant]} ${className}`;
  const isi = (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 13 : 15} />}
      {children}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cls} {...p}>
        {isi}
      </Link>
    );
  return (
    <button type="button" className={cls} {...p}>
      {isi}
    </button>
  );
}

export function IconBtn({ icon, label, tone, className = "", ...p }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-ad-muted transition-colors hover:bg-ad-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50 ${tone === "danger" ? "hover:text-ad-danger" : "hover:text-ad-fg"} ${className}`}
      {...p}
    >
      <Icon name={icon} size={15} />
    </button>
  );
}

/* --------------------------------- badge ----------------------------------- */

const NADA = {
  success: "bg-ad-success/15 text-ad-success",
  danger: "bg-ad-danger/15 text-ad-danger",
  warning: "bg-ad-warning/20 text-ad-warning",
  info: "bg-ad-primary/15 text-ad-primary",
  neutral: "bg-ad-line/70 text-ad-muted",
};
export function Badge({ tone = "neutral", children }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold ${NADA[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------- kartu ---------------------------------- */

export function Card({
  title,
  sub,
  right,
  children,
  className = "",
  bodyClass = "p-4",
}) {
  return (
    <section
      className={`min-w-0 rounded-md border border-ad-line bg-ad-card ${className}`}
    >
      {(title || right) && (
        <header className="flex items-start justify-between gap-3 px-4 pt-4">
          <div>
            {title && (
              <h2 className="text-[15px] font-semibold text-ad-fg">{title}</h2>
            )}
            {sub && <p className="mt-0.5 text-xs text-ad-muted">{sub}</p>}
          </div>
          {right}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
}

export function PageHead({ title, crumb, actions }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-ad-fg">{title}</h1>
        <p className="mt-0.5 text-xs text-ad-muted">
          <Link
            href="/admin"
            className="text-ad-primary underline underline-offset-2"
          >
            Home
          </Link>
          {crumb && <> / {crumb}</>}
        </p>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function Empty({ icon = "alert", title, text, action }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-ad-hover text-ad-muted">
        <Icon name={icon} size={20} />
      </span>
      <p className="font-semibold text-ad-fg">{title}</p>
      {text && <p className="mt-1 max-w-sm text-xs text-ad-muted">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* --------------------------------- formulir -------------------------------- */

export const inputCls =
  "w-full rounded-md border border-ad-line bg-ad-input px-3 py-2 text-[13px] text-ad-fg placeholder:text-ad-muted/70 outline-none transition focus:border-ad-primary focus:ring-2 focus:ring-ad-primary/25";

export function Field({ label, hint, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ad-muted">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-ad-danger">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ad-muted">{hint}</span>
      ) : null}
    </label>
  );
}
// bila pemanggil menentukan lebar sendiri (w-auto, w-40, dst.), w-full bawaan dilepas
const gabung = (className) =>
  (/(^|\s)w-/.test(className) ? inputCls.replace("w-full ", "") : inputCls) +
  " " +
  className;
export const Input = ({ className = "", ...p }) => (
  <input className={gabung(className)} {...p} />
);
export const Textarea = ({ className = "", ...p }) => (
  <textarea className={gabung(className)} {...p} />
);
export const Select = ({ className = "", children, ...p }) => (
  <select className={gabung(className)} {...p}>
    {children}
  </select>
);

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari…",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <Icon
        name="search"
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ad-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`${inputCls} pl-8`}
      />
    </div>
  );
}

export function ImagePicker({ label = "Gambar", value, onChange, hint }) {
  const { toast } = useUI();
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const pilih = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    try {
      onChange(await fileToStorageUrl(f));
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-ad-muted">
        {label}
      </span>
      <div className="flex items-stretch gap-3">
        <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-ad-line bg-ad-hover">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon name="image" size={22} className="text-ad-muted" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={pilih}
            tabIndex={-1}
          />
          <Btn
            size="sm"
            icon="upload"
            onClick={() => ref.current?.click()}
            disabled={busy}
          >
            {busy ? "Memproses…" : value ? "Ganti gambar" : "Unggah gambar"}
          </Btn>
          {value && (
            <Btn
              size="sm"
              variant="ghost"
              icon="trash"
              onClick={() => onChange("")}
            >
              Hapus gambar
            </Btn>
          )}
          <p className="text-[11px] leading-snug text-ad-muted">
            {hint ||
              "JPG/PNG/WebP. Otomatis dikecilkan lalu diunggah ke server."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- modal ---------------------------------- */

const UKURAN = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

export function Modal({ open, onClose, title, children, footer, size = "md" }) {
  const box = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(
      () =>
        box.current
          ?.querySelector(
            "input:not([type=file]),textarea,select,button[data-autofocus]",
          )
          ?.focus(),
      30,
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div
        ref={box}
        className={`relative my-auto w-full ${UKURAN[size]} rounded-lg border border-ad-line bg-ad-card shadow-2xl`}
      >
        <header className="flex items-center justify-between border-b border-ad-line px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-ad-fg">{title}</h2>
          <IconBtn icon="x" label="Tutup" onClick={onClose} />
        </header>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <footer className="flex justify-end gap-2 border-t border-ad-line px-5 py-3.5">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- popover --------------------------------- */

export function Popover({ trigger, children, width = "w-64" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const h = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const k = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div
          className={`absolute right-0 top-full z-50 mt-2 ${width} overflow-hidden rounded-md border border-ad-line bg-ad-card shadow-xl`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- paginasi -------------------------------- */

export function Pager({ page, perPage, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (total <= perPage) return null;
  const dari = (page - 1) * perPage + 1;
  const sampai = Math.min(total, page * perPage);
  return (
    <div className="flex items-center justify-between border-t border-ad-line px-4 py-3 text-xs text-ad-muted">
      <span>
        {dari}–{sampai} dari {total}
      </span>
      <div className="flex items-center gap-1">
        <IconBtn
          icon="left"
          label="Halaman sebelumnya"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="disabled:opacity-40"
        />
        <span className="px-2 text-ad-fg">
          {page} / {pages}
        </span>
        <IconBtn
          icon="right"
          label="Halaman berikutnya"
          onClick={() => onPage(page + 1)}
          disabled={page >= pages}
          className="disabled:opacity-40"
        />
      </div>
    </div>
  );
}

export const th = "px-4 py-2.5 text-left text-xs font-semibold text-ad-fg";
export const td = "px-4 py-3 align-middle";
