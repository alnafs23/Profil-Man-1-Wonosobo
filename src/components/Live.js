"use client";

import { useMemo } from "react";
import BeritaCard from "@/components/BeritaCard";
import EkskulCard from "@/components/EkskulCard";
import GalleryGrid from "@/components/GalleryGrid";
import GuruList from "@/components/GuruList";
import { formatTanggalID, sortBerita, useCollection } from "@/lib/store";

/** Bagian-bagian website yang membaca data dari panel admin (localStorage). */

export function useBeritaTerbit() {
  const all = useCollection("berita");
  return useMemo(
    () => sortBerita(all.filter((b) => b.status !== "draf")).map((b) => ({ ...b, tanggal: formatTanggalID(b.tgl) })),
    [all]
  );
}

export function BeritaGrid({ limit, className = "grid md:grid-cols-3 gap-6" }) {
  const list = useBeritaTerbit();
  const tampil = limit ? list.slice(0, limit) : list;
  if (!tampil.length) return <p className="text-center text-gray-500 py-10">Belum ada berita.</p>;
  return (
    <div className={className}>
      {tampil.map((b) => <BeritaCard key={b.id} berita={b} />)}
    </div>
  );
}

export function EkskulGrid({ limit, className = "grid sm:grid-cols-2 lg:grid-cols-4 gap-6" }) {
  const list = useCollection("ekskul");
  const tampil = limit ? list.slice(0, limit) : list;
  return (
    <div className={className}>
      {tampil.map((e) => <EkskulCard key={e.id} nama={e.nama} gambar={e.gambar} desk={e.desk} />)}
    </div>
  );
}

export function GaleriLive({ limit }) {
  const list = useCollection("galeri");
  return <GalleryGrid items={limit ? list.slice(0, limit) : list} />;
}

export function GuruLive() {
  return <GuruList data={useCollection("guru")} />;
}

export function GuruCount() {
  return <>{useCollection("guru").length}</>;
}
