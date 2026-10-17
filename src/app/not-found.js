import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-emerald-800 mb-3">404</h1>
      <p className="mb-4">Halaman tidak ditemukan.</p>
      <Link href="/" className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">Kembali ke Home</Link>
    </div>
  );
}
