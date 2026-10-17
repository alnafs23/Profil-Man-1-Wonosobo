import InfoPage from "@/components/InfoPage";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Sarana Prasarana | MAN 1 Wonosobo" };

export default function SaranaPrasarana() {
  return (
    <InfoPage
      judul="Sarana Prasarana"
      deskripsi="Fasilitas pendukung kegiatan belajar mengajar."
      seksi={[
        {
          judul: "Fasilitas Madrasah",
          poin: [
            "Ruang kelas dengan smart TV",
            "Laboratorium IPA (Fisika, Kimia, Biologi) dan komputer",
            "Perpustakaan",
            "Masjid madrasah",
            "Lapangan olahraga (basket, futsal, voli)",
            "Asrama putri",
            "Kantin dan UKS",
          ],
        },
      ]}
    >
      <GalleryGrid
        items={[
          { src: "/galeri1.jpg", judul: "Gedung Utama" },
          { src: "/galeri3.jpg", judul: "Masjid" },
          { src: "/galeri8.png", judul: "Perpustakaan" },
        ]}
      />
    </InfoPage>
  );
}
