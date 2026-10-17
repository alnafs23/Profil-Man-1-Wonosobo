import Link from "next/link";
import { notFound } from "next/navigation";
import { berita, getBeritaById } from "@/data/berita";

export function generateStaticParams() {
  return berita.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const b = getBeritaById(id);
  return { title: b ? `${b.judul} | MAN 1 Wonosobo` : "Berita tidak ditemukan" };
}

export default async function DetailBerita({ params }) {
  const { id } = await params;
  const b = getBeritaById(id);
  if (!b) notFound();

  const lain = berita.filter((x) => x.id !== b.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-emerald-700">Home</Link> /{" "}
        <Link href="/berita" className="hover:text-emerald-700">Berita</Link> / Detail
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-3">{b.judul}</h1>
      <p className="text-sm text-emerald-700 font-semibold mb-6">{b.tanggal}</p>
      <div className="flex justify-center bg-emerald-50 rounded-xl shadow mb-8 overflow-hidden">
        <img src={b.gambar} alt={b.judul} className="max-h-[75vh] w-auto max-w-full object-contain" />
      </div>
      <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
        {b.isi.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <Link href="/berita" className="inline-block mt-8 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700">
        Kembali ke Berita
      </Link>

      <div className="mt-14 border-t pt-8">
        <h2 className="font-bold text-xl text-emerald-800 mb-4">Berita Lainnya</h2>
        <ul className="space-y-2">
          {lain.map((x) => (
            <li key={x.id}>
              <Link href={`/berita/${x.id}`} className="text-emerald-700 hover:underline">{x.judul}</Link>
              <span className="text-xs text-gray-500"> — {x.tanggal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
