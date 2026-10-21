import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Jurusan | MAN 1 Wonosobo" };

export default function Jurusan() {
  return (
    <InfoPage
      judul="Jurusan"
      deskripsi="Peminatan IPA, IPS, dan Keagamaan di MAN 1 Wonosobo."
      gambar="/sekolah.png"
      seksi={[
        {
          judul: "Tentang Jurusan",
          teks: [
            "MAN 1 Wonosobo membuka tiga peminatan bagi peserta didik, yaitu Ilmu Pengetahuan Alam (IPA), Ilmu Pengetahuan Sosial (IPS), dan Keagamaan. Setiap peserta didik memilih jurusan sesuai minat, bakat, dan rencana studi lanjutan atau karier setelah lulus.",
            "Seluruh jurusan tetap dibekali nilai-nilai keislaman, penguatan karakter, dan kegiatan pengembangan diri agar lulusan siap bersaing di perguruan tinggi maupun dunia kerja.",
          ],
        },
        {
          judul: "Jurusan IPA (Ilmu Pengetahuan Alam)",
          teks: [
            "Jurusan IPA diperuntukkan bagi peserta didik yang tertarik pada sains, teknologi, dan penalaran ilmiah.",
          ],
          poin: [
            "Mata pelajaran peminatan: Matematika Tingkat Lanjut, Fisika, Kimia, dan Biologi.",
            "Pembelajaran melalui praktikum di laboratorium dan proyek sains.",
            "Pembinaan olimpiade sains dan karya ilmiah remaja.",
            "Cocok untuk melanjutkan ke bidang kedokteran, teknik, farmasi, pertanian, dan ilmu sains lainnya.",
          ],
        },
        {
          judul: "Jurusan IPS (Ilmu Pengetahuan Sosial)",
          teks: [
            "Jurusan IPS diperuntukkan bagi peserta didik yang tertarik pada kehidupan sosial, ekonomi, dan kebijakan publik.",
          ],
          poin: [
            "Mata pelajaran peminatan: Ekonomi, Geografi, Sosiologi, dan Sejarah.",
            "Pembelajaran berbasis studi kasus, diskusi, dan penelitian sederhana.",
            "Pembinaan olimpiade sosial dan kompetisi kewirausahaan.",
            "Cocok untuk melanjutkan ke bidang ekonomi, hukum, ilmu sosial, pendidikan, dan komunikasi.",
          ],
        },
        {
          judul: "Jurusan Keagamaan",
          teks: [
            "Jurusan Keagamaan diperuntukkan bagi peserta didik yang ingin mendalami ilmu-ilmu keislaman sekaligus tetap menguasai pengetahuan umum.",
          ],
          poin: [
            "Mata pelajaran peminatan: Ilmu Tafsir, Ilmu Hadis, Fikih, Ushul Fikih, dan Ilmu Kalam, serta Bahasa Arab.",
            "Penguatan kemampuan baca kitab, tahfidz, dan dakwah.",
            "Pembinaan lomba keagamaan seperti MTQ, pidato, dan kajian kitab.",
            "Cocok untuk melanjutkan ke perguruan tinggi keislaman, studi Timur Tengah, pendidikan agama, maupun bidang dakwah.",
          ],
        },
        {
          judul: "Cara Memilih Jurusan",
          poin: [
            "Peserta didik mengisi pilihan jurusan saat pendaftaran sesuai minat dan nilai rapor.",
            "Penetapan jurusan mempertimbangkan hasil seleksi, daya tampung, dan arahan guru bimbingan konseling.",
            "Informasi lebih lanjut dapat ditanyakan melalui halaman Kontak atau panitia SPMB.",
          ],
        },
      ]}
    />
  );
}
