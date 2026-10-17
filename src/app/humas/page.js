import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { sekolah } from "@/data/sekolah";

export const metadata = { title: "Hubungan Masyarakat | MAN 1 Wonosobo" };

export default function Humas() {
  return (
    <InfoPage
      judul="Hubungan Masyarakat"
      deskripsi="Kerja sama dan komunikasi madrasah dengan masyarakat."
      seksi={[
        { judul: "Peran Humas", teks: ["Humas bertugas menyebarkan informasi, menjalin kerja sama dengan instansi, perguruan tinggi, dunia usaha, alumni, dan komite madrasah."] },
        { judul: "Kerja Sama", poin: ["Perguruan tinggi", "Madrasah dan sekolah lain", "Instansi pemerintah dan dunia usaha", "Komite dan alumni"] },
      ]}
    >
      <div className="flex gap-3 flex-wrap">
        <a href={sekolah.instagram} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-emerald-700">
          Instagram {sekolah.instagramHandle}
        </a>
        <Link href="/kontak" className="border border-emerald-600 text-emerald-700 px-5 py-2 rounded-full hover:bg-emerald-600 hover:text-white">Hubungi Kami</Link>
      </div>
    </InfoPage>
  );
}
