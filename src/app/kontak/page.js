import InfoPage from "@/components/InfoPage";
import { sekolah } from "@/data/sekolah";

export const metadata = { title: "Kontak | MAN 1 Wonosobo" };

export default function Kontak() {
  return (
    <InfoPage judul="Kontak" deskripsi="Hubungi kami untuk informasi lebih lanjut.">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-emerald-800">{sekolah.namaLengkap}</h2>
          <p><span className="font-semibold text-emerald-800">Alamat:</span> {sekolah.alamat}</p>
          <p><span className="font-semibold text-emerald-800">Telepon:</span> {sekolah.telepon}</p>
          <p className="break-all"><span className="font-semibold text-emerald-800">Email:</span> {sekolah.email}</p>
          <p className="break-all"><span className="font-semibold text-emerald-800">Email TU:</span> {sekolah.emailTu}</p>
          <a href={sekolah.instagram} target="_blank" rel="noreferrer" className="inline-block bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-700">
            Instagram {sekolah.instagramHandle}
          </a>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-bold text-emerald-800 mb-2">Jam Layanan</h3>
          <p className="text-gray-700">Senin – Kamis: 07.00 – 15.30 WIB</p>
          <p className="text-gray-700">Jumat: 07.00 – 14.30 WIB</p>
          <p className="text-gray-700">Sabtu & Minggu: Libur</p>
        </div>
      </div>
    </InfoPage>
  );
}
