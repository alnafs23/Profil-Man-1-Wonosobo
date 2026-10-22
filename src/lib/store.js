import { useSyncExternalStore } from "react";
import { supabase } from "@/lib/supabase";
import { berita as seedBerita } from "@/data/berita";
import { galeri as seedGaleri } from "@/data/galeri";
import { ekstrakurikuler as seedEkskul } from "@/data/ekstrakurikuler";
import { guru as seedGuru } from "@/data/guru";
import { sekolah as seedSekolah } from "@/data/sekolah";

/* ─── Konstanta & helper tanggal ─────────────────────────────────────────── */

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
export const dayKey = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayISO = () => dayKey(new Date());

export function parseTanggalID(s) {
  const m = String(s || "")
    .trim()
    .match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
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
  const hari = Math.round(
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()) - t) / 864e5,
  );
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

/* ─── Seed (data awal sebelum Supabase termuat) ──────────────────────────── */

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
  galeri: () =>
    seedGaleri.map((g, i) => ({
      id: `galeri-${i + 1}`,
      src: g.src,
      judul: g.judul,
      urutan: i + 1,
    })),
  ekskul: () =>
    seedEkskul.map((e, i) => ({
      id: `ekskul-${i + 1}`,
      nama: e.nama,
      gambar: e.gambar,
      desk: e.desk,
      urutan: i + 1,
    })),
  guru: () =>
    seedGuru.map((g, i) => ({ id: `guru-${i + 1}`, nama: g.nama, gol: g.gol, urutan: i + 1 })),
  pengaduan: () => [],
  sekolah: () => ({ ...seedSekolah }),
  stats: () => ({ daily: {}, pages: {} }),
  session: () => null,
};

const seedCache = {};
export function seed(name) {
  if (!(name in seedCache)) seedCache[name] = seeds[name]();
  return seedCache[name];
}

/* ─── Store reaktif (in-memory cache + listeners) ────────────────────────── */

const memCache = new Map();   // name → data saat ini
const loadState = new Map();  // name → "idle"|"loading"|"done"
const listeners = new Set();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Baca nilai sinkron dari cache (atau seed jika belum termuat). */
function readCache(name) {
  return memCache.has(name) ? memCache.get(name) : seed(name);
}

/** Set cache dan beritahu semua listener. */
function setCache(name, value) {
  memCache.set(name, value);
  loadState.set(name, "done");
  emit();
}

/* ─── Muat data dari Supabase ────────────────────────────────────────────── */

/** Ambil sesi aktif Supabase (hanya di client). */
async function getSupabaseSession() {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    return data?.session ?? null;
  } catch {
    return null;
  }
}

async function loadBerita() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from("berita").select("*");
    if (error) throw error;
    setCache("berita", data || []);
  } catch {
    // Tetap pakai seed jika gagal
  }
}

async function loadGaleri() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from("galeri")
      .select("*")
      .order("urutan", { ascending: true });
    if (error) throw error;
    setCache("galeri", data || []);
  } catch {}
}

async function loadEkskul() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from("ekskul")
      .select("*")
      .order("urutan", { ascending: true });
    if (error) throw error;
    setCache("ekskul", data || []);
  } catch {}
}

async function loadGuru() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from("guru")
      .select("*")
      .order("urutan", { ascending: true });
    if (error) throw error;
    setCache("guru", data || []);
  } catch {}
}

async function loadPengaduan() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from("pengaduan")
      .select("*")
      .order("waktu", { ascending: false });
    if (error) {
      // RLS: anon tidak bisa baca → kembalikan array kosong, bukan crash
      setCache("pengaduan", []);
      return;
    }
    setCache("pengaduan", data || []);
  } catch {
    setCache("pengaduan", []);
  }
}

async function loadSekolah() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from("sekolah")
      .select("data")
      .eq("id", 1)
      .single();
    if (error) throw error;
    if (data?.data) setCache("sekolah", data.data);
  } catch {}
}

async function loadStats() {
  if (!supabase) return;
  try {
    const [{ data: harian }, { data: halaman }] = await Promise.all([
      supabase.from("kunjungan_harian").select("tanggal,pengunjung,tayangan"),
      supabase.from("kunjungan_halaman").select("path,jumlah"),
    ]);
    const daily = {};
    (harian || []).forEach((r) => {
      daily[r.tanggal] = [r.pengunjung || 0, r.tayangan || 0];
    });
    const pages = {};
    (halaman || []).forEach((r) => {
      pages[r.path] = r.jumlah || 0;
    });
    setCache("stats", { daily, pages });
  } catch {}
}

/** Muat satu koleksi (jika belum pernah dimuat). */
async function ensureLoaded(name) {
  if (loadState.get(name) === "loading" || loadState.get(name) === "done") return;
  loadState.set(name, "loading");
  await reload(name);
}

/** Paksa muat ulang satu koleksi dari Supabase. */
async function reload(name) {
  switch (name) {
    case "berita":    return loadBerita();
    case "galeri":    return loadGaleri();
    case "ekskul":    return loadEkskul();
    case "guru":      return loadGuru();
    case "pengaduan": return loadPengaduan();
    case "sekolah":   return loadSekolah();
    case "stats":     return loadStats();
  }
}

/** Muat ulang semua koleksi konten. */
async function reloadAll() {
  await Promise.all([
    loadBerita(), loadGaleri(), loadEkskul(),
    loadGuru(), loadPengaduan(), loadSekolah(), loadStats(),
  ]);
}

/* ─── useCollection ──────────────────────────────────────────────────────── */

export function useCollection(name) {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      // Picu muat di background hanya di client
      if (typeof window !== "undefined") ensureLoaded(name);
      return () => listeners.delete(cb);
    },
    () => readCache(name),
    () => seed(name),
  );
}

export const useSekolah = () => useCollection("sekolah");

export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/* ─── useSession ─────────────────────────────────────────────────────────── */

let sessionCache = null;
let sessionLoaded = false;
let authListenerBound = false;

function bindAuthListener() {
  if (authListenerBound || !supabase || typeof window === "undefined") return;
  authListenerBound = true;
  supabase.auth.onAuthStateChange((_event, session) => {
    sessionCache = session;
    sessionLoaded = true;
    emit();
  });
  // Muat sesi awal
  supabase.auth.getSession().then(({ data }) => {
    sessionCache = data?.session ?? null;
    sessionLoaded = true;
    emit();
  });
}

export function useSession() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      if (typeof window !== "undefined") bindAuthListener();
      return () => listeners.delete(cb);
    },
    () => {
      if (!sessionLoaded && typeof window !== "undefined") bindAuthListener();
      return sessionCache;
    },
    () => null,
  );
}

/* ─── Login / Logout ─────────────────────────────────────────────────────── */

const EMAIL_DOMAIN = "@man1wonosobo.id";

let gagal = 0;
let kunciSampai = 0;

export async function login(username, password) {
  if (Date.now() < kunciSampai) {
    const detik = Math.ceil((kunciSampai - Date.now()) / 1000);
    return {
      ok: false,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${detik} detik.`,
    };
  }

  if (!supabase) {
    return { ok: false, error: "Koneksi ke server belum tersedia." };
  }

  const raw = String(username).trim().toLowerCase();
  const email = raw.includes("@") ? raw : raw + EMAIL_DOMAIN;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    gagal += 1;
    if (gagal >= 5) {
      gagal = 0;
      kunciSampai = Date.now() + 30000;
    }
    return { ok: false, error: "Nama pengguna atau kata sandi salah." };
  }

  gagal = 0;
  // Muat ulang semua koleksi setelah login (agar pengaduan dll terbuka)
  await reloadAll();
  return { ok: true };
}

export async function logout() {
  if (!supabase) return;
  await supabase.auth.signOut();
  // Bersihkan cache pengaduan (RLS: anon tidak bisa baca)
  setCache("pengaduan", []);
  await reloadAll();
}

/* ─── useTheme (tetap localStorage) ─────────────────────────────────────── */

const THEME_KEY = "man1:theme";

export function useTheme() {
  const t = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(THEME_KEY) || "dark";
      } catch {
        return "dark";
      }
    },
    () => "dark",
  );
  const set = (v) => {
    try {
      window.localStorage.setItem(THEME_KEY, v);
    } catch {}
    emit();
  };
  return [t, set];
}

/* ─── upsert & removeItem (async) ────────────────────────────────────────── */

/** Peta name → nama tabel Supabase. */
const TABLE = {
  berita: "berita",
  galeri: "galeri",
  ekskul: "ekskul",
  guru: "guru",
  pengaduan: "pengaduan",
};

export async function upsert(name, item, { append: _append = false } = {}) {
  if (!supabase) return { ok: false, error: "Koneksi ke server belum tersedia." };

  if (name === "sekolah") {
    // Sekolah disimpan sebagai jsonb tunggal
    const { error } = await supabase
      .from("sekolah")
      .upsert({ id: 1, data: item });
    if (error) return { ok: false, error: error.message };
    await reload("sekolah");
    return { ok: true };
  }

  const table = TABLE[name];
  if (!table) return { ok: false, error: `Koleksi "${name}" tidak dikenal.` };

  const { error } = await supabase.from(table).upsert(item);
  if (error) return { ok: false, error: error.message };
  await reload(name);
  return { ok: true };
}

export async function removeItem(name, id) {
  if (!supabase) return { ok: false, error: "Koneksi ke server belum tersedia." };

  const table = TABLE[name];
  if (!table) return { ok: false, error: `Koleksi "${name}" tidak dikenal.` };

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  await reload(name);
  return { ok: true };
}

/* ─── write (khusus sekolah) ─────────────────────────────────────────────── */

/** Alias untuk upsert("sekolah", data) — dipakai di pengaturan/page.js. */
export async function write(name, value) {
  return upsert(name, value);
}

/* ─── trackView ──────────────────────────────────────────────────────────── */

let statsReloadTimer = null;

export function trackView(path) {
  if (typeof window === "undefined" || path.startsWith("/admin")) return;
  if (!supabase) return;

  const baru = !window.sessionStorage.getItem("man1:visited");
  if (baru) window.sessionStorage.setItem("man1:visited", "1");

  supabase
    .rpc("catat_kunjungan", { p_path: path, p_baru: baru })
    .then(() => {
      // Muat ulang stats agar dashboard ikut diperbarui (debounce 2 detik)
      if (statsReloadTimer) clearTimeout(statsReloadTimer);
      statsReloadTimer = setTimeout(() => {
        loadStats();
        statsReloadTimer = null;
      }, 2000);
    })
    .catch(() => {});
}

/* ─── clearStats ─────────────────────────────────────────────────────────── */

export async function clearStats() {
  if (!supabase) return { ok: false, error: "Koneksi ke server belum tersedia." };
  try {
    await Promise.all([
      supabase.from("kunjungan_harian").delete().not("tanggal", "is", null),
      supabase.from("kunjungan_halaman").delete().not("path", "is", null),
    ]);
    await loadStats();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || "Gagal mengosongkan statistik." };
  }
}

/* ─── exportAll (baca dari Supabase) ────────────────────────────────────── */

export async function exportAll() {
  const data = {};
  await Promise.all(
    ["berita", "galeri", "ekskul", "guru", "sekolah", "pengaduan"].map(
      async (k) => {
        await reload(k);
        data[k] = readCache(k);
      }
    )
  );
  return {
    aplikasi: "man1-wonosobo-admin",
    versi: 2,
    dibuat: new Date().toISOString(),
    data,
  };
}

/* ─── Hapus semua pengaduan ──────────────────────────────────────────────── */

export async function clearPengaduan() {
  if (!supabase) return { ok: false, error: "Koneksi ke server belum tersedia." };
  try {
    const { error } = await supabase
      .from("pengaduan")
      .delete()
      .not("id", "is", null);
    if (error) throw error;
    await loadPengaduan();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message || "Gagal menghapus pengaduan." };
  }
}

/* ─── seriesDaily / seriesMonthly ────────────────────────────────────────── */

export function seriesDaily(stats, n) {
  const now = new Date();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const k = dayKey(d);
    out.push({
      key: k,
      date: d,
      v: stats.daily[k]?.[0] || 0,
      p: stats.daily[k]?.[1] || 0,
    });
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

/* ─── Utilitas umum ──────────────────────────────────────────────────────── */

export const sum = (arr, f = (x) => x) => arr.reduce((a, x) => a + f(x), 0);
export const pct = (a, b) => (b ? Math.round(((a - b) / b) * 1000) / 10 : null);
export const fmt = (n) => new Intl.NumberFormat("id-ID").format(Math.round(n));
export const fmtRingkas = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

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

const LABEL_HALAMAN = {
  "/": "Beranda",
  "/spmb": "SPMB 2026",
  "/berita": "Daftar Berita",
  "/guru": "Guru & Tendik",
  "/galeri": "Galeri",
  "/kelas-unggulan": "Kelas Unggulan",
  "/ekstrakurikuler": "Ekstrakurikuler",
  "/asrama": "Asrama",
  "/kontak": "Kontak",
  "/about": "Profil Madrasah",
  "/struktur": "Struktur Organisasi",
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
