import { useSyncExternalStore } from "react";
import { berita as seedBerita } from "@/data/berita";
import { galeri as seedGaleri } from "@/data/galeri";
import { ekstrakurikuler as seedEkskul } from "@/data/ekstrakurikuler";
import { guru as seedGuru } from "@/data/guru";
import { sekolah as seedSekolah } from "@/data/sekolah";

const PREFIX = "man1:";
const listeners = new Set();
let bound = false;

export const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
export const HARI = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
export const GOLONGAN = [
  "IV/e",
  "IV/d",
  "IV/c",
  "IV/b",
  "IV/a",
  "III/d",
  "III/c",
  "III/b",
  "III/a",
  "II/d",
  "II/c",
  "II/b",
  "II/a",
  "I/d",
  "I/c",
  "I/b",
  "I/a",
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
    })),
  ekskul: () =>
    seedEkskul.map((e, i) => ({
      id: `ekskul-${i + 1}`,
      nama: e.nama,
      gambar: e.gambar,
      desk: e.desk,
    })),
  guru: () =>
    seedGuru.map((g, i) => ({ id: `guru-${i + 1}`, nama: g.nama, gol: g.gol })),
  pengaduan: () => [],
  sekolah: () => ({ ...seedSekolah }),
  stats: () => ({ sample: false, daily: {}, pages: {} }),
  session: () => null,
};

const seedCache = {};
export function seed(name) {
  if (!(name in seedCache)) seedCache[name] = seeds[name]();
  return seedCache[name];
}

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
    const penuh =
      e &&
      (e.name === "QuotaExceededError" || e.code === 22 || e.code === 1014);
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
  return useSyncExternalStore(
    subscribe,
    () => read(name),
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
  return write(
    name,
    read(name).filter((x) => x.id !== id),
  );
}

const frac = (x) => Math.floor((x - Math.floor(x)) * 4294967296);
const K256 = [];
const H256 = [];
(() => {
  let n = 2;
  let c = 0;
  while (c < 64) {
    let prima = true;
    for (let d = 2; d * d <= n; d++)
      if (n % d === 0) {
        prima = false;
        break;
      }
    if (prima) {
      if (c < 8) H256.push(frac(Math.sqrt(n)));
      K256.push(frac(Math.cbrt(n)));
      c++;
    }
    n++;
  }
})();

export function sha256(teks) {
  const data = new TextEncoder().encode(teks);
  const len = data.length;
  const total = ((len + 9 + 63) >> 6) << 6;
  const buf = new Uint8Array(total);
  buf.set(data);
  buf[len] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(total - 8, Math.floor((len * 8) / 4294967296));
  view.setUint32(total - 4, (len * 8) >>> 0);
  const h = H256.slice();
  const w = new Array(64);
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  for (let o = 0; o < total; o += 64) {
    for (let i = 0; i < 16; i++) w[i] = view.getUint32(o + i * 4);
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (hh + S1 + ch + K256[i] + w[i]) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      hh = g;
      g = f;
      f = e;
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) >>> 0;
    }
    const v = [a, b, c, d, e, f, g, hh];
    for (let i = 0; i < 8; i++) h[i] = (h[i] + v[i]) >>> 0;
  }
  return h.map((x) => x.toString(16).padStart(8, "0")).join("");
}

export const ADMIN_USER = "admin";
const ADMIN_HASH =
  "9710369d05195bae597d958c9cece2982b44e4e4b233a5a59a77eb70eaa9a9cb";

const SALT = "man1wonosobo::";
export const hashPassword = (p) => sha256(SALT + p);
const DEFAULT_ADMIN = {
  username: ADMIN_USER,
  nama: "Administrator",
  hash: ADMIN_HASH,
};
const SESI_JAM = 8;

export function useSession() {
  return useSyncExternalStore(
    subscribe,
    () => {
      const s = read("session");
      return s && s.exp > Date.now() ? s : null;
    },
    () => null,
  );
}

let gagal = 0;
let kunciSampai = 0;

export function login(username, password) {
  if (Date.now() < kunciSampai) {
    const detik = Math.ceil((kunciSampai - Date.now()) / 1000);
    return {
      ok: false,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${detik} detik.`,
    };
  }
  const a = DEFAULT_ADMIN;
  const cocok =
    String(username).trim().toLowerCase() ===
      String(a.username).toLowerCase() &&
    hashPassword(String(password)) === a.hash;
  if (!cocok) {
    gagal += 1;
    if (gagal >= 5) {
      gagal = 0;
      kunciSampai = Date.now() + 30000;
    }
    return { ok: false, error: "Nama pengguna atau kata sandi salah." };
  }
  gagal = 0;
  write("auth", a);
  const r = write("session", {
    username: a.username,
    nama: a.nama,
    exp: Date.now() + SESI_JAM * 36e5,
  });
  return r.ok ? { ok: true } : { ok: false, error: r.error };
}

export function logout() {
  removeKey("session");
}

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
    () => "dark",
  );
  const set = (v) => {
    try {
      window.localStorage.setItem(PREFIX + "theme", v);
    } catch {}
    emit();
  };
  return [t, set];
}

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

export const clearStats = () =>
  write("stats", { sample: false, daily: {}, pages: {} });

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

export const sum = (arr, f = (x) => x) => arr.reduce((a, x) => a + f(x), 0);
export const pct = (a, b) => (b ? Math.round(((a - b) / b) * 1000) / 10 : null);
export const fmt = (n) => new Intl.NumberFormat("id-ID").format(Math.round(n));
export const fmtRingkas = (n) =>
  new Intl.NumberFormat("id-ID", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

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

const KOLEKSI_KONTEN = ["berita", "galeri", "ekskul", "guru", "sekolah"];

export function exportAll() {
  const data = {};
  [...KOLEKSI_KONTEN, "pengaduan"].forEach((k) => (data[k] = read(k)));
  return {
    aplikasi: "man1-wonosobo-admin",
    versi: 1,
    dibuat: new Date().toISOString(),
    data,
  };
}

export function importAll(obj) {
  if (
    !obj ||
    obj.aplikasi !== "man1-wonosobo-admin" ||
    typeof obj.data !== "object"
  ) {
    return { ok: false, error: "Berkas bukan cadangan dari panel admin ini." };
  }
  const larik = ["berita", "galeri", "ekskul", "guru", "pengaduan"];
  for (const k of larik) {
    if (k in obj.data && !Array.isArray(obj.data[k]))
      return { ok: false, error: `Data "${k}" tidak valid.` };
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
