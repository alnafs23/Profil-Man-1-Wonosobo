import Link from "next/link";
import FotoBingkai from "@/components/FotoBingkai";

export default function BeritaCard({ berita }) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col">
      <FotoBingkai src={berita.gambar} alt={berita.judul} />
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 self-start px-2 py-1 rounded mb-2">
          {berita.tanggal}
        </span>
        <h3 className="font-bold text-lg text-gray-800 mb-2 leading-snug">{berita.judul}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{berita.ringkasan}</p>
        <Link
          href={`/berita/${berita.id}`}
          className="bg-emerald-600 text-white text-sm font-semibold text-center px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </article>
  );
}
