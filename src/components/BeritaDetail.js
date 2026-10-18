"use client";

import Link from "next/link";
import { formatTanggalID, sortBerita, useCollection, useMounted } from "@/lib/store";

export default function BeritaDetail({ id }) {
  const all = useCollection("berita");
  const mounted = useMounted();
  const b = all.find((x) => x.id === id);
  const pratinjau = mounted && new URLSearchParams(window.location.search).has("pratinjau");
  const tampil = b && (b.status !== "draf" || pratinjau);

  if (!tampil) {
    // berita baru dari admin belum ada di data server, tunggu data browser dibaca
    if (!mounted) return <div className="max-w-xl mx-auto px-4 py-24 text-center text-gray-500">Memuat berita…</div>;
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-3">Berita tidak ditemukan</h1>
        <Link href="/berita" className="text-emerald-700 underline">Kembali ke Berita</Link>
      </div>
    );
  }

  const lain = sortBerita(all.filter((x) => x.id !== b.id && x.status !== "draf")).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-emerald-700">Home</Link> /{" "}
        <Link href="/berita" className="hover:text-emerald-700">Berita</Link> / Detail
      </p>
      {b.status === "draf" && (
        <p className="mb-4 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2 text-sm">
          Pratinjau draf. Berita ini belum terbit dan hanya terlihat lewat tautan pratinjau dari panel admin.
        </p>
      )}
      <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-3">{b.judul}</h1>
      <p className="text-sm text-emerald-700 font-semibold mb-6">{formatTanggalID(b.tgl)}</p>
      <div className="flex justify-center bg-emerald-50 rounded-xl shadow mb-8 overflow-hidden">
        <img src={b.gambar} alt={b.judul} className="max-h-[75vh] w-auto max-w-full object-contain" />
      </div>
      <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
        {b.isi.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <Link href="/berita" className="inline-block mt-8 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700">
        Kembali ke Berita
      </Link>

      {lain.length > 0 && (
        <div className="mt-14 border-t pt-8">
          <h2 className="font-bold text-xl text-emerald-800 mb-4">Berita Lainnya</h2>
          <ul className="space-y-2">
            {lain.map((x) => (
              <li key={x.id}>
                <Link href={`/berita/${x.id}`} className="text-emerald-700 hover:underline">{x.judul}</Link>
                <span className="text-xs text-gray-500"> — {formatTanggalID(x.tgl)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
