import PageHeader from "@/components/PageHeader";
export const metadata = { title: "Akreditasi | MAN 1 Wonosobo" };
const akreditasi = {
  peringkat: "A (Unggul)",
  nilai: "94",
  lembaga: "Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)",
  nomorSk: "477/BAN-SM/SK/2023",
  tahun: "2023 (ditetapkan 28 April 2023)",
  berlaku: "5 (lima) tahun, hingga 28 April 2028",
  gambar: "/sertifikat-akreditasi.jpg",
};

export default function Akreditasi() {
  const rincian = [
    ["Peringkat", akreditasi.peringkat],
    ["Nilai Akreditasi", akreditasi.nilai],
    ["Lembaga Penilai", akreditasi.lembaga],
    ["Nomor SK", akreditasi.nomorSk],
    ["Tahun Akreditasi", akreditasi.tahun],
    ["Masa Berlaku", akreditasi.berlaku],
  ];

  return (
    <>
      <PageHeader
        judul="Akreditasi"
        deskripsi="Status dan sertifikat akreditasi MAN 1 Wonosobo."
      />
      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <a
            href={akreditasi.gambar}
            target="_blank"
            rel="noreferrer"
            className="block bg-white border border-gray-200 rounded-xl p-3 shadow-md hover:shadow-xl transition"
          >
            <img
              src={akreditasi.gambar}
              alt="Sertifikat Akreditasi MAN 1 Wonosobo"
              className="w-full rounded-lg"
            />
          </a>
          <p className="text-sm text-gray-500 text-center mt-2">
            Sertifikat Akreditasi — klik gambar untuk memperbesar
          </p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-600 text-white rounded-xl p-6 flex items-center gap-5 shadow">
            <div className="h-20 w-20 shrink-0 rounded-full bg-amber-400 text-emerald-950 text-5xl font-extrabold flex items-center justify-center border-4 border-white">
              A
            </div>
            <div>
              <p className="text-amber-300 text-sm font-semibold">
                TERAKREDITASI
              </p>
              <p className="text-2xl font-extrabold">MAN 1 Wonosobo</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {rincian.map(([k, v]) => (
                  <tr key={k}>
                    <th className="px-4 py-3 bg-emerald-50 text-emerald-900 font-semibold w-40 align-top">
                      {k}
                    </th>
                    <td className="px-4 py-3 text-gray-700">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-bold text-emerald-800 border-l-4 border-amber-400 pl-3 mb-2">
              Makna Akreditasi
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Akreditasi menunjukkan bahwa madrasah memenuhi standar nasional
              pendidikan, mencakup standar isi, proses, kompetensi lulusan,
              pendidik, sarana prasarana, pengelolaan, dan penilaian.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
