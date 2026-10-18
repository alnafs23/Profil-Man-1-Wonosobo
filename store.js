import { useSyncExternalStore } from "react";
import { berita as seedBerita } from "@/data/berita";
import { galeri as seedGaleri } from "@/data/galeri";
import { ekstrakurikuler as seedEkskul } from "@/data/ekstrakurikuler";
import { guru as seedGuru } from "@/data/guru";
import { sekolah as seedSekolah } from "@/data/sekolah";

/* ------------------------------------------------------------------ *
 *  Penyimpanan berbasis localStorage.
 *  Semua data admin disimpan per koleksi dengan awalan "man1:".
 *  Bila sebuah koleksi belum pernah diubah, yang dipakai adalah data
 *  bawaan dari src/data/*.js, jadi website tetap tampil seperti semula.
 * ------------------------------------------------------------------ */

const PREFIX = "man1:";
const listeners = new Set();
let bound = false;

export const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
export const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
export const GOLONGAN = [
  "IV/e", "IV/d", "IV/c", "IV/b", "IV/a",
  "III/d", "III/c", "III/b", "III/a",
  "II/d", "II/c", "II/b", "II/a",
  "I/d", "I/c", "I/b", "I/a",
];

const pad = (n) => String(n).padStart(2, "0");
export const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayISO = () => dayKey(new Date());

/* ------------------------------ tanggal ----------------------------- */

export function parseTanggalID(s) {
  const m = String(s || "").trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return "";
  const i = BULAN.findIndex((b) => b.toLowerCase() === m[2].toLowerCase());
  return i < 0 ? "" : `${m[3]}-${pad(i + 1)}-${pad(+m[1])}`;
}

export function formatTanggalID(iso, singkat = false) {
  const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const b = BULAN[+m[2] - 1] || "";
  return `${+m[3]} ${singkat ? b.slice(0, 3) : b} ${m[1]}`;
}

export function relHari(iso) {
  const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const t = new Date(+m[1], +m[2] - 1, +m[3]);
  const now = new Date();
  const hari = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - t) / 864e5);
  if (hari <= 0) return "Hari ini";
  if (hari === 1) return "Kemarin";
  if (hari < 30) return `${hari} hari lalu`;
  if (hari < 365) return `${Math.floor(hari / 30)} bulan lalu`;
  return `${Math.floor(hari / 365)} tahun lalu`;
}

export function relWaktu(iso) {
  const t = new Date(iso).getTime();
  if (!t) return "";
  const d = Math.max(0, Date.now() - t);
  const mnt = Math.floor(d / 6e4);
  if (mnt < 1) return "Baru saja";
  if (mnt < 60) return `${mnt} menit lalu`;
  const jam = Math.floor(mnt / 60);
  if (jam < 24) return `${jam} jam lalu`;
  const hari = Math.floor(jam / 24);
  if (hari < 30) return `${hari} hari lalu`;
  return formatTanggalID(iso.slice(0, 10));
}

export const sortBerita = (list) =>
  [...list].sort((a, b) => String(b.tgl).localeCompare(String(a.tgl)));

/* ------------------------------ data awal --------------------------- */

const seeds = {
  berita: () =>
    seedBerita.map((b) => ({
      id: b.id,
      judul: b.judul.trim(),
      tgl: parseTanggalID(b.tanggal),
      gambar: b.gambar,
      ringkasan: b.ringkasan,
      isi: b.isi,
      status: "terbit",
      penulis: "Admin",
    })),
  galeri: () => seedGaleri.map((g, i) => ({ id: `galeri-${i + 1}`, src: g.src, judul: g.judul })),
  ekskul: () =>
    seedEkskul.map((e, i) => ({ id: `ekskul-${i + 1}`, nama: e.nama, gambar: e.gambar, desk: e.desk })),
  guru: () => seedGuru.map((g, i) => ({ id: `guru-${i + 1}`, nama: g.nama, gol: g.gol })),
  pengaduan: () => [],
  sekolah: () => ({ ...seedSekolah }),
  stats: () => ({ sample: false, daily: {}, pages: {} }),
};

const seedCache = {};
export function seed(name) {
  if (!(name in seedCache)) seedCache[name] = seeds[name]();
  return seedCache[name];
}

/* ------------------------------ inti store -------------------------- */

const cache = new Map();

export function read(name) {
  if (typeof window === "undefined") return seed(name);
  let raw = null;
  try {
    raw = window.localStorage.getItem(PREFIX + name);
  } catch {
    return seed(name);
  }
  if (raw === null) return seed(name);
  const hit = cache.get(name);
  if (hit && hit.raw === raw) return hit.value;
  try {
    const value = JSON.parse(raw);
    // data contoh dari versi lama dibuang: statistik hanya berisi kunjungan nyata
    if (name === "stats" && value && value.sample) return seed(name);
    cache.set(name, { raw, value });
    return value;
  } catch {
    return seed(name);
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  if (!bound && typeof window !== "undefined") {
    window.addEventListener("storage", emit);
    bound = true;
  }
  return () => listeners.delete(cb);
}

export function write(name, value) {
  try {
    window.localStorage.setItem(PREFIX + name, JSON.stringify(value));
  } catch (e) {
    const penuh = e && (e.name === "QuotaExceededError" || e.code === 22 || e.code === 1014);
    return {
      ok: false,
      error: penuh
        ? "Penyimpanan browser penuh. Hapus beberapa gambar atau gunakan gambar yang lebih kecil."
        : "Data tidak dapat disimpan di browser ini.",
    };
  }
  emit();
  return { ok: true };
}

export function removeKey(name) {
  try {
    window.localStorage.removeItem(PREFIX + name);
  } catch {}
  cache.delete(name);
  emit();
}

export function hasKey(name) {
  try {
    return window.localStorage.getItem(PREFIX + name) !== null;
  } catch {
    return false;
  }
}

export function useCollection(name) {
  return useSyncExternalStore(subscribe, () => read(name), () => seed(name));
}

export const useSekolah = () => useCollection("sekolah");

/** true setelah komponen berjalan di browser (aman untuk hydration). */
export function useMounted() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export const uid = (p = "id") =>
  `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function slugify(s) {
  return (
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "berita"
  );
}

export function uniqueSlug(judul, ids) {
  const base = slugify(judul);
  let s = base;
  let n = 2;
  while (ids.includes(s)) s = `${base}-${n++}`;
  return s;
}

export function upsert(name, item, { append = false } = {}) {
  const list = read(name);
  const ada = list.some((x) => x.id === item.id);
  const next = ada
    ? list.map((x) => (x.id === item.id ? item : x))
    : append
      ? [...list, item]
      : [item, ...list];
  return write(name, next);
}

export function removeItem(name, id) {
  return write(name, read(name).filter((x) => x.id !== id));
}

/* ------------------------------ tema -------------------------------- */

export function useTheme() {
  const t = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(PREFIX + "theme") || "dark";
      } catch {
        return "dark";
      }
    },
    () => "dark"
  );
  const set = (v) => {
    try {
      window.localStorage.setItem(PREFIX + "theme", v);
    } catch {}
    emit();
  };
  return [t, set];
}

/* ------------------------------ statistik --------------------------- */

export function trackView(path) {
  if (typeof window === "undefined" || path.startsWith("/admin")) return;
  try {
    const s = read("stats");
    const k = todayISO();
    const cur = s.daily[k] || [0, 0];
    let baru = false;
    if (!window.sessionStorage.getItem(PREFIX + "visited")) {
      window.sessionStorage.setItem(PREFIX + "visited", "1");
      baru = true;
    }
    write("stats", {
      ...s,
      daily: { ...s.daily, [k]: [cur[0] + (baru ? 1 : 0), cur[1] + 1] },
      pages: { ...s.pages, [path]: (s.pages[path] || 0) + 1 },
    });
  } catch {}
}

export const clearStats = () => write("stats", { sample: false, daily: {}, pages: {} });

export function seriesDaily(stats, n) {
  const now = new Date();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const k = dayKey(d);
    out.push({ key: k, date: d, v: stats.daily[k]?.[0] || 0, p: stats.daily[k]?.[1] || 0 });
  }
  return out;
}

export function seriesMonthly(stats, year) {
  const arr = Array.from({ length: 12 }, () => ({ v: 0, p: 0 }));
  for (const [k, val] of Object.entries(stats.daily)) {
    if (k.slice(0, 4) === String(year)) {
      const m = +k.slice(5, 7) - 1;
      arr[m].v += val[0];
      arr[m].p += val[1];
    }
  }
  return arr;
}

export const sum = (arr, f = (x) => x) => arr.reduce((a, x) => a + f(x), 0);
export const pct = (a, b) => (b ? Math.round(((a - b) / b) * 1000) / 10 : null);
export const fmt = (n) => new Intl.NumberFormat("id-ID").format(Math.round(n));
export const fmtRingkas = (n) =>
  new Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(n);

const LABEL_HALAMAN = {
  "/": "Beranda", "/spmb": "SPMB 2026", "/berita": "Daftar Berita", "/guru": "Guru & Tendik",
  "/galeri": "Galeri", "/kelas-unggulan": "Kelas Unggulan", "/ekstrakurikuler": "Ekstrakurikuler",
  "/asrama": "Asrama", "/kontak": "Kontak", "/about": "Profil Madrasah", "/struktur": "Struktur Organisasi",
  "/pengaduan-masyarakat": "Pengaduan Masyarakat",
};

export function labelHalaman(path, berita = []) {
  if (LABEL_HALAMAN[path]) return LABEL_HALAMAN[path];
  if (path.startsWith("/berita/")) {
    const b = berita.find((x) => `/berita/${x.id}` === path);
    const j = b ? b.judul : path.slice(8);
    return j.length > 42 ? j.slice(0, 40) + "…" : j;
  }
  return path;
}

/* ------------------------------ cadangan ---------------------------- */

const KOLEKSI_KONTEN = ["berita", "galeri", "ekskul", "guru", "sekolah"];

export function exportAll() {
  const data = {};
  [...KOLEKSI_KONTEN, "pengaduan"].forEach((k) => (data[k] = read(k)));
  return { aplikasi: "man1-wonosobo-admin", versi: 1, dibuat: new Date().toISOString(), data };
}

export function importAll(obj) {
  if (!obj || obj.aplikasi !== "man1-wonosobo-admin" || typeof obj.data !== "object") {
    return { ok: false, error: "Berkas bukan cadangan dari panel admin ini." };
  }
  const larik = ["berita", "galeri", "ekskul", "guru", "pengaduan"];
  for (const k of larik) {
    if (k in obj.data && !Array.isArray(obj.data[k])) return { ok: false, error: `Data "${k}" tidak valid.` };
  }
  for (const k of [...larik, "sekolah"]) {
    if (k in obj.data) {
      const r = write(k, obj.data[k]);
      if (!r.ok) return r;
    }
  }
  return { ok: true };
}

export function resetKonten() {
  KOLEKSI_KONTEN.forEach((k) => removeKey(k));
}
