import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import FormPengaduan from "@/components/FormPengaduan";

export const metadata = { title: "Pengaduan Masyarakat | MAN 1 Wonosobo" };

export default function PengaduanMasyarakat() {
  return (
    <InfoPage
      judul="Pengaduan Masyarakat"
      deskripsi="Saluran pengaduan layanan MAN 1 Wonosobo."
      seksi={[
        { judul: "Saluran Pengaduan", teks: ["Masyarakat dapat menyampaikan pengaduan terkait layanan madrasah melalui kanal resmi pemerintah LAPOR! atau langsung melalui kontak madrasah."] },
        { judul: "Ketentuan", poin: ["Sampaikan pengaduan dengan identitas dan uraian yang jelas", "Pengaduan akan ditindaklanjuti sesuai ketentuan yang berlaku", "Identitas pelapor dijaga kerahasiaannya"] },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        <a href="https://lapor.go.id" target="_blank" rel="noreferrer" className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700">
          Buka LAPOR! (lapor.go.id)
        </a>
        <Link href="/kontak" className="inline-block border border-emerald-600 text-emerald-700 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-600 hover:text-white">
          Kontak Madrasah
        </Link>
      </div>
      <FormPengaduan />
    </InfoPage>
  );
}
