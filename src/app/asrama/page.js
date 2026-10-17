import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Asrama MAN 1 Wonosobo" };

export default function Asrama() {
  return (
    <InfoPage
      judul="Asrama MAN 1 Wonosobo"
      deskripsi="Tempat tinggal dan pembinaan karakter peserta didik."
      gambar="/galeri4.png"
      seksi={[
        {
          judul: "Tentang Asrama",
          teks: [
            "Asrama Pelajar Islam (API) MAN 1 Wonosobo merupakan fasilitas tempat tinggal bagi peserta didik yang ingin menempuh pendidikan dengan lingkungan yang religius, disiplin, dan berorientasi pada pembinaan karakter. Asrama ini dirancang untuk menciptakan suasana belajar yang nyaman, aman, dan kondusif, sehingga peserta didik dapat mengembangkan potensi akademik dan spiritual secara seimbang.",
            "Selain menjadi tempat tinggal, asrama juga berfungsi sebagai pusat pembinaan ibadah, akhlak, dan kedisiplinan. Setiap kegiatan diatur dengan sistem yang terjadwal, mulai dari waktu belajar, ibadah, hingga kegiatan sosial. Dengan dukungan pembina dan pengasuh yang berpengalaman, peserta didik dibimbing untuk menjadi pribadi yang mandiri, berakhlak mulia, dan berprestasi.",
            "Asrama ini beralamat di Jl. Mendolo KM 3, Bumiroso, Kabupaten Wonosobo, Jawa Tengah. Lingkungannya yang asri dan tenang mendukung suasana belajar serta pembinaan keagamaan yang intensif.",
          ],
        },
        {
          judul: "Fasilitas",
          poin: [
            "Ruang belajar, musala, dan area kajian keagamaan.",
            "Dapur dan kantin asrama yang menyediakan makanan bergizi.",
            "Ruang tamu dan area diskusi untuk kegiatan kelompok.",
            "Pembina dan pengasuh asrama yang siap mendampingi setiap hari.",
            "Sarana olahraga dan kebersihan lingkungan yang terjaga.",
            "Akses internet untuk menunjang kegiatan belajar dan hafalan.",
          ],
        },
        {
          judul: "Program Unggulan",
          poin: [
            "Tahfidzul Qur’an dengan target hafalan bertahap setiap semester.",
            "Tahfidz Hadits Arba’in An-Nawawiyah sebagai pembinaan akhlak dan ilmu hadis.",
            "Kajian Kitab Salaf untuk memperdalam pemahaman keislaman klasik.",
            "Pengembangan Bahasa Arab dan Inggris melalui kelas percakapan dan debat ilmiah.",
            "Pelatihan kepemimpinan dan manajemen waktu bagi santri asrama.",
            "Pembinaan akademik tambahan untuk persiapan olimpiade dan ujian masuk perguruan tinggi.",
          ],
        },
        {
          judul: "Kegiatan Harian",
          poin: [
            "Salat berjamaah dan tadarus Al-Qur’an setiap pagi dan malam.",
            "Belajar malam terjadwal dengan pendampingan tutor.",
            "Kajian keagamaan dan pembinaan karakter setiap pekan.",
            "Kegiatan olahraga, kebersihan lingkungan, dan gotong royong.",
            "Evaluasi hafalan dan pembinaan disiplin setiap akhir pekan.",
            "Kegiatan sosial dan pengabdian masyarakat di sekitar madrasah.",
          ],
        },
      ]}
    />
  );
}
