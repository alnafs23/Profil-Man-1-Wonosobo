import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Kelas Unggulan | MAN 1 Wonosobo" };

export default function KelasUnggulan() {
  return (
    <InfoPage
      judul="Kelas Unggulan (Beasiswa Prestasi)"
      deskripsi="Kelas pembinaan prestasi dengan dukungan beasiswa."
      gambar="/galeri7.png"
      seksi={[
        {
          judul: "Tentang Kelas Unggulan",
          teks: [
            "Kelas Unggulan MAN 1 Wonosobo adalah kelas khusus bagi peserta didik berprestasi yang dibina secara intensif untuk mencapai prestasi akademik dan non-akademik terbaik.",
            "Program ini dirancang untuk menciptakan lingkungan belajar yang kompetitif, kolaboratif, dan berorientasi pada pengembangan potensi siswa secara menyeluruh.",
            "Peserta didik mendapatkan pendampingan akademik, spiritual, dan karakter agar siap menghadapi tantangan dunia pendidikan dan kehidupan sosial.",
          ],
        },
        {
          judul: "Beasiswa Prestasi",
          poin: [
            "Beasiswa diberikan kepada peserta didik yang lolos seleksi jalur prestasi.",
            "Besaran dan masa beasiswa mengikuti ketentuan madrasah (sesuai kebijakan resmi).",
            "Beasiswa dapat dievaluasi setiap semester berdasarkan capaian peserta didik.",
            "Peserta didik penerima beasiswa wajib menjaga prestasi akademik dan kedisiplinan.",
            "Program beasiswa juga mencakup pembinaan motivasi dan pengembangan diri.",
          ],
        },
        {
          judul: "Keunggulan",
          poin: [
            "Pembinaan olimpiade dan lomba oleh guru pembimbing berpengalaman.",
            "Pendampingan belajar dan persiapan masuk perguruan tinggi negeri maupun swasta.",
            "Penguatan karakter, keagamaan, dan kepemimpinan melalui kegiatan rutin.",
            "Kelas dilengkapi fasilitas belajar yang nyaman dan mendukung pembelajaran digital.",
            "Kegiatan mentoring dan motivasi belajar bersama alumni berprestasi.",
            "Lingkungan belajar yang kondusif, disiplin, dan berorientasi pada nilai-nilai Islami.",
          ],
        },
      ]}
    />
  );
}
