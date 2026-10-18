"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { Popover, UIProvider } from "./ui";
import { useCollection, useMounted, useSekolah, useTheme } from "@/lib/store";

const NAV = [
  { items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }] },
  {
    group: "Konten",
    items: [
      { href: "/admin/berita", label: "Berita", icon: "news" },
      { href: "/admin/galeri", label: "Galeri", icon: "image" },
      { href: "/admin/ekstrakurikuler", label: "Ekstrakurikuler", icon: "activity" },
    ],
  },
  {
    group: "Data",
    items: [
      { href: "/admin/guru", label: "Guru & Tendik", icon: "users" },
      { href: "/admin/pengaduan", label: "Pengaduan", icon: "message", badge: true },
    ],
  },
  {
    group: "Sistem",
    items: [
      { href: "/admin/pengaturan", label: "Pengaturan", icon: "sliders" },
      { href: "/", label: "Lihat website", icon: "globe", external: true },
    ],
  },
];
const FLAT = NAV.flatMap((g) => g.items).filter((i) => !i.external);

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ad-page text-ad-muted" role="status">
      <span className="text-xs">Memuat panel admin…</span>
    </div>
  );
}

export default function AdminShell({ children }) {
  const path = usePathname() || "/admin";
  const mounted = useMounted();
  const [theme] = useTheme();
  return (
    <div className="admin-root min-h-screen flex-1" data-theme={theme}>
      {mounted ? (
        <UIProvider>
          <Shell path={path}>{children}</Shell>
        </UIProvider>
      ) : (
        <Splash />
      )}
    </div>
  );
}

function Shell({ children, path }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sekolah = useSekolah();
  const pengaduan = useCollection("pengaduan");
  const baru = pengaduan.filter((p) => p.status === "baru").length;

  useEffect(() => setOpen(false), [path]);

  const aktif = (href) => (href === "/admin" ? path === "/admin" : path.startsWith(href));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ad-line bg-ad-side text-[#b9c1d1] transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${hidden ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
        aria-label="Navigasi utama"
      >
        <Link href="/admin" className="flex h-14 items-center gap-2.5 border-b border-white/10 px-4">
          <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
          <span className="leading-tight">
            <span className="block text-[13px] font-bold text-white">{sekolah.nama}</span>
            <span className="block text-[11px] text-[#8e98ad]">Panel Admin</span>
          </span>
        </Link>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {NAV.map((g, gi) => (
            <div key={gi} className="mb-3">
              {g.group && <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-wider text-[#7c869b]">{g.group}</p>}
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const on = !it.external && aktif(it.href);
                  const cls = `flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b9bff]/60 ${
                    on ? "bg-white/10 font-semibold text-white" : "hover:bg-white/5 hover:text-white"
                  }`;
                  return (
                    <li key={it.href}>
                      <Link href={it.href} className={cls} {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})} aria-current={on ? "page" : undefined}>
                        <Icon name={it.icon} size={16} />
                        <span className="flex-1">{it.label}</span>
                        {it.badge && baru > 0 && <span className="rounded bg-ad-pink px-1.5 py-0.5 text-[10px] font-bold text-white">{baru}</span>}
                        {it.external && <Icon name="external" size={12} className="opacity-60" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-3 text-[11px] leading-snug text-[#7c869b]">
          Data tersimpan di browser ini (localStorage).
        </div>
      </aside>

      <div className={`flex min-h-screen flex-col transition-[padding] duration-200 ${hidden ? "" : "lg:pl-64"}`}>
        <Topbar
          baru={baru}
          onMenu={() => (window.matchMedia("(min-width:1024px)").matches ? setHidden((h) => !h) : setOpen((o) => !o))}
        />
        <main className="mx-auto w-full max-w-[1140px] flex-1 px-4 py-6">{children}</main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-ad-line bg-ad-page px-4 py-3 text-[11px] text-ad-muted">
          <span>{sekolah.namaLengkap} © {sekolah.tahun}</span>
          <span>Panel Admin · {sekolah.slogan}</span>
        </footer>
      </div>
    </>
  );
}

function Topbar({ baru, onMenu }) {
  const [theme, setTheme] = useTheme();
  const berita = useCollection("berita");
  const draf = berita.filter((b) => b.status === "draf").length;
  const notif = baru + draf;

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-ad-line bg-ad-card px-3 sm:px-4">
      <button type="button" onClick={onMenu} aria-label="Buka atau tutup menu" className="flex h-9 w-9 items-center justify-center rounded-md text-ad-muted hover:bg-ad-hover hover:text-ad-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50">
        <Icon name="panel" size={18} />
      </button>
      <SearchBox />
      <div className="ml-auto flex items-center gap-0.5">
        <Popover
          width="w-72"
          trigger={(o) => (
            <button type="button" aria-label="Pemberitahuan" aria-expanded={o} className="relative flex h-9 w-9 items-center justify-center rounded-md text-ad-muted hover:bg-ad-hover hover:text-ad-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50">
              <Icon name="bell" size={17} />
              {notif > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ad-danger" />}
            </button>
          )}
        >
          <p className="border-b border-ad-line px-4 py-2.5 text-xs font-semibold text-ad-fg">Pemberitahuan</p>
          {notif === 0 && <p className="px-4 py-5 text-center text-xs text-ad-muted">Semua sudah beres.</p>}
          {baru > 0 && (
            <Link href="/admin/pengaduan" className="flex items-center gap-3 px-4 py-3 text-[13px] hover:bg-ad-hover">
              <Icon name="message" className="text-ad-pink" /><span>{baru} pengaduan baru menunggu ditinjau</span>
            </Link>
          )}
          {draf > 0 && (
            <Link href="/admin/berita" className="flex items-center gap-3 px-4 py-3 text-[13px] hover:bg-ad-hover">
              <Icon name="news" className="text-ad-amber" /><span>{draf} berita masih berstatus draf</span>
            </Link>
          )}
        </Popover>

        <Link href="/" target="_blank" aria-label="Buka website" title="Buka website" className="hidden h-9 w-9 items-center justify-center rounded-md text-ad-muted hover:bg-ad-hover hover:text-ad-fg sm:flex">
          <Icon name="globe" size={17} />
        </Link>

        <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"} title={theme === "dark" ? "Mode terang" : "Mode gelap"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-ad-muted hover:bg-ad-hover hover:text-ad-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50">
          <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
        </button>

        <span className="mx-1.5 h-6 w-px bg-ad-line" />

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ad-primary text-[13px] font-bold text-white" title="Admin">A</span>
      </div>
    </header>
  );
}

function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const input = useRef(null);
  const box = useRef(null);
  const router = useRouter();
  const berita = useCollection("berita");
  const guru = useCollection("guru");

  useEffect(() => {
    const k = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    const out = (e) => !box.current?.contains(e.target) && setOpen(false);
    document.addEventListener("keydown", k);
    document.addEventListener("mousedown", out);
    return () => {
      document.removeEventListener("keydown", k);
      document.removeEventListener("mousedown", out);
    };
  }, []);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const out = [];
    FLAT.filter((i) => i.label.toLowerCase().includes(s)).forEach((i) => out.push({ label: i.label, sub: "Menu", href: i.href, icon: i.icon }));
    berita.filter((b) => b.judul.toLowerCase().includes(s)).slice(0, 4).forEach((b) => out.push({ label: b.judul, sub: "Berita", href: `/admin/berita?q=${encodeURIComponent(b.judul)}`, icon: "news" }));
    guru.filter((g) => g.nama.toLowerCase().includes(s)).slice(0, 4).forEach((g) => out.push({ label: g.nama, sub: `Guru · ${g.gol}`, href: `/admin/guru?q=${encodeURIComponent(g.nama)}`, icon: "user" }));
    return out.slice(0, 8);
  }, [q, berita, guru]);

  const pergi = (href) => {
    setOpen(false);
    setQ("");
    router.push(href);
  };

  return (
    <div ref={box} className="relative hidden w-full max-w-xs sm:block">
      <div className="flex items-center gap-2 rounded-md border border-ad-line bg-ad-input px-2.5 focus-within:border-ad-primary focus-within:ring-2 focus-within:ring-ad-primary/25">
        <Icon name="search" size={14} className="text-ad-muted" />
        <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter" && hasil[0]) pergi(hasil[0].href); if (e.key === "Escape") setOpen(false); }}
          placeholder="Cari menu, berita, guru" aria-label="Cari menu, berita, atau guru"
          className="h-8 min-w-0 flex-1 bg-transparent text-xs text-ad-fg outline-none placeholder:text-ad-muted" />
        <kbd className="rounded border border-ad-line px-1.5 py-0.5 text-[10px] text-ad-muted">Ctrl /</kbd>
      </div>
      {open && q.trim() && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-md border border-ad-line bg-ad-card shadow-xl">
          {hasil.length === 0 && <li className="px-3 py-3 text-xs text-ad-muted">Tidak ada hasil untuk “{q}”.</li>}
          {hasil.map((r, i) => (
            <li key={i}>
              <button type="button" onClick={() => pergi(r.href)} className="flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-ad-hover">
                <Icon name={r.icon} size={14} className="text-ad-muted" />
                <span className="min-w-0 flex-1 truncate text-xs text-ad-fg">{r.label}</span>
                <span className="text-[10px] text-ad-muted">{r.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
