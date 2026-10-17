import Link from "next/link";
import FotoBingkai from "@/components/FotoBingkai";

export default function ProgramCard({ gambar, judul, deskripsi, href, label = "Baca Lebih Lanjut" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition">
      {gambar && <FotoBingkai src={gambar} alt={judul} />}
      <div className="p-5">
        <h3 className="font-bold text-xl text-emerald-800 mb-2">{judul}</h3>
        <p className="text-sm text-gray-600 mb-4">{deskripsi}</p>
        {href && (
          <Link href={href} className="inline-block text-sm font-semibold text-emerald-700 border-b-2 border-amber-400 hover:text-emerald-900">
            {label}
          </Link>
        )}
      </div>
    </div>
  );
}
