import InfoPage from "@/components/InfoPage";
import ProgramCard from "@/components/ProgramCard";

export const metadata = { title: "Program Unggulan | MAN 1 Wonosobo" };

export default function ProgramUnggulan() {
  return (
    <InfoPage
      judul="Program Unggulan"
      deskripsi="Program pengembangan potensi peserta didik."
    >
      <div className="grid md:grid-cols-2 gap-6">
        <ProgramCard
          gambar="/galeri7.jpg"
          judul="Kelas Unggulan"
          deskripsi="Pembinaan prestasi akademik dengan beasiswa prestasi."
          href="/kelas-unggulan"
          label="Selengkapnya"
        />
        <ProgramCard
          gambar="/galeri4.png"
          judul="Asrama"
          deskripsi="Pembinaan ibadah, karakter, dan belajar terjadwal di asrama."
          href="/asrama"
          label="Selengkapnya"
        />
        <ProgramCard
          gambar="/galeri6.jpg"
          judul="Ekstrakurikuler"
          deskripsi="Pramuka, PMR, Paskibra, Hadroh, Basket, Futsal, dan Multimedia Club."
        />
      </div>
    </InfoPage>
  );
}
