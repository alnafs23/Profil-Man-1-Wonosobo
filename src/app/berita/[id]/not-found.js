import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-emerald-800 mb-3">Berita tidak ditemukan</h1>
      <Link href="/berita" className="text-emerald-700 underline">Kembali ke Berita</Link>
    </div>
  );
}
