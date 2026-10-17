import Link from "next/link";

export default function PageHeader({ judul, deskripsi }) {
  return (
    <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white border-b-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-emerald-100 mb-2">
          <Link href="/" className="hover:text-amber-300">Home</Link> / {judul}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold">{judul}</h1>
        {deskripsi && <p className="mt-2 text-emerald-100 max-w-2xl">{deskripsi}</p>}
      </div>
    </section>
  );
}
