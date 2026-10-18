import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { sekolah } from "@/data/sekolah";

export const metadata = { title: "About | MAN 1 Wonosobo" };

export default function About() {
  return (
    <InfoPage
      judul="Tentang MAN 1 Wonosobo"
      deskripsi="Mengenal profil, sejarah, visi, misi, dan alamat madrasah."
      gambar="/sekolah.png"
      seksi={[
        {
          judul: "Profil Sekolah",
          teks: [
            "Madrasah Aliyah Negeri 1 Wonosobo (MAN 1 Wonosobo) merupakan satuan pendidikan menengah atas berciri khas Islam di bawah naungan Kementerian Agama Kabupaten Wonosobo, Jawa Tengah.",
            "Sebagai lembaga pendidikan yang berorientasi pada pembentukan karakter dan pengembangan ilmu pengetahuan, madrasah ini berkomitmen untuk mencetak generasi yang beriman, berilmu, dan berakhlak mulia.",
            "Dalam pelaksanaan pembelajaran, MAN 1 Wonosobo memadukan kurikulum umum dan keagamaan secara seimbang. Peserta didik tidak hanya dibekali dengan pengetahuan akademik, tetapi juga nilai-nilai spiritual dan moral yang menjadi dasar kehidupan.",
            "Madrasah menyediakan kelas unggulan, program asrama, serta berbagai kegiatan ekstrakurikuler yang mendukung pengembangan minat dan bakat siswa di bidang akademik, seni, olahraga, dan keagamaan.",
            "Selain itu, madrasah terus berinovasi dalam meningkatkan kualitas pendidikan melalui penerapan teknologi informasi, pembelajaran berbasis proyek, dan kolaborasi dengan berbagai pihak.",
            "Dengan semangat kebersamaan dan profesionalisme, MAN 1 Wonosobo berupaya menjadi lembaga pendidikan yang unggul, adaptif terhadap perkembangan zaman, dan berkontribusi nyata bagi masyarakat.",
          ],
        },
        {
          judul: "Sejarah Singkat",
          teks: [
            "MAN 1 Wonosobo berawal dari lembaga pendidikan Islam yang tumbuh dan berkembang di Kabupaten Wonosobo. Seiring dengan meningkatnya kebutuhan masyarakat akan pendidikan menengah berciri khas Islam, lembaga ini kemudian ditetapkan sebagai madrasah aliyah negeri di bawah Kementerian Agama.",
            "Perjalanan panjang madrasah ini mencerminkan dedikasi dan komitmen dalam memberikan layanan pendidikan yang bermutu. Dari masa ke masa, MAN 1 Wonosobo terus berbenah, memperkuat sistem pembelajaran, meningkatkan kompetensi tenaga pendidik, serta memperluas fasilitas penunjang kegiatan belajar.",
            "Kini, MAN 1 Wonosobo tidak hanya dikenal sebagai pusat pendidikan Islam yang berkualitas, tetapi juga sebagai wadah pembinaan generasi muda yang siap menghadapi tantangan global dengan tetap berpegang pada nilai-nilai keislaman dan kebangsaan.",
            "Dengan semangat inovasi dan pengabdian, madrasah ini terus berupaya menjadi lembaga pendidikan yang unggul, berkarakter, dan berkontribusi nyata bagi kemajuan bangsa.",
          ],
        },
        {
          judul: "Visi",
          kutipan:
            "TERWUJUDNYA LULUSAN YANG BERAKHLAQ MULIA, BERBUDAYA ISLAMI, BERPRESTASI UNGGUL DAN BERWAWASAN LINGKUNGAN",
        },
        {
          judul: "Misi",
          poin: [
            "Mewujudkan pembentukan karakter unggul pada semua warga madrasah yang bisa teraktualisasi dalam masyarakat.",
            "Mewujudkan pembelajaran dan pembiasaan budaya Islami dalam setiap kegiatan kehidupan dan pergaulan sehari-hari.",
            "Menyelenggarakan program kegiatan yang mampu memotivasi, memfasilitasi, dan memobilisasi warga madrasah dalam pemanfaatan, pemeliharaan, serta pelestarian lingkungan.",
            "Meningkatkan pengetahuan dan profesionalisme sumber daya pendidik dan tenaga kependidikan sesuai dengan perkembangan dunia pendidikan.",
            "Menyelenggarakan tata kelola madrasah yang efektif, efisien, transparan, kredibel, dan akuntabel.",
          ],
        },
        {
          judul: "Alamat",
          teks: [
            "Jalan Raya Mendolo KM 03, Bumireso, Kecamatan Wonosobo, Kabupaten Wonosobo, Jawa Tengah 56351",
          ],
        },
        {
          judul: "Informasi Lain yang Relevan",
          poin: [
            "Fasilitas: ruang kelas, laboratorium, perpustakaan, masjid, lapangan olahraga, asrama.",
            "Prestasi: olimpiade sains, lomba keagamaan, olahraga, dan pramuka.",
            "Ekstrakurikuler: Pramuka, PMR, Paskibra, Seni , Basket, Futsal,  Multimedia Club.",
            "Program Unggulan: Kelas Unggulan (beasiswa prestasi) dan Asrama.",
          ],
        },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/sejarah"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Sejarah Lengkap
        </Link>
        <Link
          href="/visi-misi"
          className="border-2 border-emerald-600 text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white"
        >
          Visi, Misi, dan Tujuan Lengkap
        </Link>
      </div>
    </InfoPage>
  );
}
