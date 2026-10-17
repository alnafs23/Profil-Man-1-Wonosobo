export default function SectionTitle({ judul, sub }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-800">{judul}</h2>
      <div className="w-20 h-1 bg-amber-400 mx-auto mt-2 rounded" />
      {sub && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}
