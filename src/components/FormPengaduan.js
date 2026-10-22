"use client";

import { useState } from "react";
import { uid, upsert } from "@/lib/store";

const KATEGORI = ["Layanan administrasi", "Pendidik & tenaga kependidikan", "Sarana & prasarana", "Penerimaan murid baru", "Lainnya"];
const awal = { nama: "", kontak: "", kategori: KATEGORI[0], pesan: "" };
const cls = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500";

export default function FormPengaduan() {
  const [f, setF] = useState(awal);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(""); };

  const kirim = async (e) => {
    e.preventDefault();
    if (!f.nama.trim() || !f.kontak.trim() || f.pesan.trim().length < 10) {
      return setErr("Lengkapi nama, kontak, dan uraian pengaduan (minimal 10 karakter).");
    }
    setLoading(true);
    const r = await upsert("pengaduan", {
      id: uid("adu"),
      nama: f.nama.trim(),
      kontak: f.kontak.trim(),
      kategori: f.kategori,
      pesan: f.pesan.trim(),
      status: "baru",
      waktu: new Date().toISOString(),
    });
    setLoading(false);
    if (!r.ok) return setErr(r.error || "Gagal mengirim pengaduan. Coba beberapa saat lagi.");
    setF(awal);
    setOk(true);
  };

  if (ok) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6" role="status">
        <h3 className="font-bold text-emerald-800 mb-1">Pengaduan terkirim</h3>
        <p className="text-gray-700 mb-4">Terima kasih. Pengaduan Anda akan ditinjau oleh admin madrasah.</p>
        <button onClick={() => setOk(false)} className="border border-emerald-600 text-emerald-700 font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 hover:text-white">Kirim pengaduan lain</button>
      </div>
    );
  }

  return (
    <form onSubmit={kirim} noValidate className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-bold text-emerald-800 border-l-4 border-amber-400 pl-3">Kirim Pengaduan</h2>
      {err && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block"><span className="block text-sm font-semibold text-gray-700 mb-1">Nama</span><input className={cls} value={f.nama} onChange={set("nama")} autoComplete="name" /></label>
        <label className="block"><span className="block text-sm font-semibold text-gray-700 mb-1">Email atau nomor HP</span><input className={cls} value={f.kontak} onChange={set("kontak")} /></label>
      </div>
      <label className="block"><span className="block text-sm font-semibold text-gray-700 mb-1">Kategori</span>
        <select className={cls} value={f.kategori} onChange={set("kategori")}>{KATEGORI.map((k) => <option key={k}>{k}</option>)}</select>
      </label>
      <label className="block"><span className="block text-sm font-semibold text-gray-700 mb-1">Uraian pengaduan</span><textarea rows={5} className={cls} value={f.pesan} onChange={set("pesan")} /></label>
      <button type="submit" disabled={loading} className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60">{loading ? "Mengirim…" : "Kirim pengaduan"}</button>
    </form>
  );
}
