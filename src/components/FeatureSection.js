import Link from "next/link";
export default function FeatureSection({
  label,
  judul,
  teks,
  poin = [],
  gambar,
  href,
  tombol = "Selengkapnya",
  reverse = false,
  bg = "bg-white",
}) {
  return (
    <section className={`${bg} py-16`}>
      <div
        className={`max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
      >
        <img
          src={gambar}
          alt={judul}
          className="rounded-2xl shadow-lg w-full h-72 md:h-96 object-cover"
        />
        <div>
          <p className="text-amber-600 font-semibold text-sm tracking-wide mb-1">
            {label}
          </p>
          <h2 className="text-3xl font-extrabold text-emerald-800 mb-4">
            {judul}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">{teks}</p>
          {poin.length > 0 && (
            <ul className="space-y-2 mb-6">
              {poin.map((p) => (
                <li key={p} className="flex gap-2 text-gray-700">
                  <span className="text-emerald-600 font-bold">✓</span> {p}
                </li>
              ))}
            </ul>
          )}
          {href && (
            <Link
              href={href}
              className="inline-block bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700"
            >
              {tombol}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
