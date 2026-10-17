import FotoBingkai from "@/components/FotoBingkai";
import { sekolah } from "@/data/sekolah";

const posts = [1, 2, 3, 4, 5, 6];

export default function InstagramFeed() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-4xl font-extrabold text-emerald-900 text-center mb-8">
        Prestasi Siswa {sekolah.nama}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {posts.map((n) => (
          <a
            key={n}
            href={sekolah.instagram}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm"
          >
            <FotoBingkai src={`/igpost${n}.png`} alt={`Postingan ${n} ${sekolah.instagramHandle}`} rasio="aspect-square" />
            <span className="absolute inset-0 bg-emerald-900/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold gap-2">
              Lihat di Instagram
            </span>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href={sekolah.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-emerald-800"
        >
          View on Instagram
        </a>
      </div>
    </section>
  );
}
