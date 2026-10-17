import PageHeader from "@/components/PageHeader";
import FotoBingkai from "@/components/FotoBingkai";
export default function InfoPage({
  judul,
  deskripsi,
  gambar,
  seksi = [],
  children,
}) {
  return (
    <>
      <PageHeader judul={judul} deskripsi={deskripsi} />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {gambar && (
          <FotoBingkai src={gambar} alt={judul} rasio="aspect-[16/9]" className="rounded-xl shadow" />
        )}
        {seksi.map((s) => (
          <section
            key={s.judul}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-emerald-800 border-l-4 border-amber-400 pl-3 mb-3">
              {s.judul}
            </h2>
            {s.teks &&
              s.teks.map((t, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-3">
                  {t}
                </p>
              ))}
            {s.kutipan && (
              <blockquote className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg px-5 py-4 my-3 text-center italic font-semibold text-emerald-900 uppercase tracking-wide leading-relaxed">
                &ldquo;{s.kutipan}&rdquo;
              </blockquote>
            )}
            {s.subjudul && (
              <h3 className="font-bold text-gray-800 mt-4 mb-2">
                {s.subjudul}
              </h3>
            )}
            {s.urut && (
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 leading-relaxed">
                {s.urut.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ol>
            )}
            {s.poin && (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {s.poin.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {children}
      </div>
    </>
  );
}
