import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { spmb } from "@/data/spmb";
import { sekolah } from "@/data/sekolah";

export const metadata = { title: "SPMB 2026 | MAN 1 Wonosobo" };

export default function SpmbPage() {
  return (
    <>
      <PageHeader
        judul={`SPMB ${spmb.tahun}`}
        deskripsi={`Seleksi Penerimaan Murid Baru Tahun Ajaran ${spmb.tahunAjaran} ${sekolah.namaLengkap}`}
      />

      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-amber-700 tracking-wide">STATUS PENDAFTARAN</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-900">{spmb.status}</h2>
            <p className="text-gray-700 mt-1 max-w-2xl">{spmb.intro}</p>
          </div>
          {spmb.linkDaftar ? (
            <a href={spmb.linkDaftar} target="_blank" rel="noreferrer" className="shrink-0 bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 text-center">
              Daftar Sekarang
            </a>
          ) : (
            <span className="shrink-0 bg-white border border-amber-300 text-amber-800 font-semibold px-5 py-3 rounded-lg text-center">
              Link pendaftaran segera diumumkan
            </span>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <SectionTitle judul="Jalur Pendaftaran" />
        <div className="grid md:grid-cols-3 gap-6">
          {spmb.jalur.map((j) => (
            <div key={j.judul} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-600">
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{j.judul}</h3>
              <p className="text-sm text-gray-600 mb-3">{j.teks}</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {j.poin.map((p) => (
                  <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 py-14">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-800 mb-1">Persyaratan</h2>
            <div className="w-16 h-1 bg-amber-400 rounded mb-5" />
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              {spmb.syarat.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-800 mb-1">Alur Pendaftaran</h2>
            <div className="w-16 h-1 bg-amber-400 rounded mb-5" />
            <ol className="space-y-4">
              {spmb.alur.map((a, i) => (
                <li key={a.judul} className="flex gap-4">
                  <span className="h-9 w-9 shrink-0 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <p className="font-bold text-emerald-900">{a.judul}</p>
                    <p className="text-sm text-gray-600">{a.teks}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <SectionTitle judul="Jadwal Penting" />
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
          <table className="w-full text-left">
            <thead className="bg-emerald-700 text-white">
              <tr><th className="px-5 py-3 w-16">No</th><th className="px-5 py-3">Kegiatan</th><th className="px-5 py-3">Waktu</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {spmb.jadwal.map((j, i) => (
                <tr key={j.kegiatan} className="even:bg-emerald-50/50">
                  <td className="px-5 py-3">{i + 1}</td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{j.kegiatan}</td>
                  <td className="px-5 py-3 text-gray-600">{j.waktu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Program Madrasah</h3>
          <p className="text-sm text-gray-600 mb-4">Kenali program yang tersedia bagi peserta didik baru.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/kelas-unggulan" className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-700">Kelas Unggulan</Link>
            <Link href="/asrama" className="border-2 border-emerald-600 text-emerald-700 font-semibold px-5 py-2 rounded-lg hover:bg-emerald-600 hover:text-white">Asrama</Link>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-emerald-800 mb-3">Contact Person Panitia</h3>
          <ul className="space-y-3 mb-5">
            {spmb.kontak.map((k) => (
              <li key={k.peran}>
                <p className="text-sm font-semibold text-emerald-900">{k.peran}{k.nama ? ` — ${k.nama}` : ""}</p>
                <p className="text-sm text-gray-600">
                  {k.nomor.map((n, i) => (
                    <span key={n}>
                      {i > 0 && " / "}
                      <a href={`tel:+62${n.replace(/\D/g, "").slice(1)}`} className="hover:text-emerald-700">{n}</a>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={spmb.linkDaftar} target="_blank" rel="noreferrer" className="inline-block bg-emerald-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-emerald-700">Buka {spmb.situs}</a>
            <Link href="/kontak" className="inline-block bg-amber-400 text-emerald-950 font-bold px-5 py-2 rounded-lg hover:bg-amber-300">Kontak Madrasah</Link>
          </div>
        </div>
      </section>
    </>
  );
}
