import FotoBingkai from "@/components/FotoBingkai";

export default function EkskulCard({ nama, gambar, desk }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
      {gambar ? (
        <FotoBingkai src={gambar} alt={nama} className="border-b-4 border-amber-400" />
      ) : (
        <div className="h-48 bg-gradient-to-br from-emerald-700 to-emerald-500 border-b-4 border-amber-400 flex items-center justify-center text-6xl font-extrabold text-white/80">
          {nama[0]}
        </div>
      )}
      <div className="p-5">
        <h3 className="font-bold text-lg text-emerald-800 mb-1">{nama}</h3>
        <p className="text-sm text-gray-600">{desk}</p>
      </div>
    </div>
  );
}
