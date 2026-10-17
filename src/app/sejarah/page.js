import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Sejarah | MAN 1 Wonosobo" };

export default function Sejarah() {
  return (
    <InfoPage
      judul="Sejarah MAN 1 Wonosobo"
      deskripsi="Perjalanan madrasah dari masa ke masa."
      gambar="/sekolah.jpg"
      seksi={[
        {
          judul: "Awal Berdiri",
          teks: [
            "MAN 1 Wonosobo berawal dari lembaga pendidikan Islam yang dirintis untuk memenuhi kebutuhan masyarakat akan pendidikan menengah berciri khas keagamaan di Kabupaten Wonosobo. Pada masa awal berdirinya, madrasah ini menjadi wadah bagi generasi muda untuk menimba ilmu pengetahuan umum sekaligus memperdalam nilai-nilai keislaman.",
            "Cikal bakal madrasah ini tumbuh dari semangat para tokoh agama dan masyarakat yang menginginkan adanya lembaga pendidikan formal bernuansa Islam. Seiring berjalannya waktu, lembaga tersebut berkembang dan memperoleh pengakuan resmi dari Kementerian Agama Republik Indonesia sebagai Madrasah Aliyah Negeri.",
            "Perjalanan awal ini menjadi fondasi kuat bagi MAN 1 Wonosobo untuk terus berkomitmen dalam mencetak peserta didik yang berakhlak mulia, berpengetahuan luas, dan siap berkontribusi bagi kemajuan bangsa.",
          ],
        },
        {
          judul: "Masa Perkembangan",
          teks: [
            "Seiring dengan perkembangan zaman, MAN 1 Wonosobo mengalami peningkatan yang signifikan baik dari sisi jumlah peserta didik, tenaga pendidik, maupun sarana dan prasarana. Madrasah terus beradaptasi dengan kebutuhan pendidikan modern tanpa meninggalkan nilai-nilai keislaman yang menjadi ciri khasnya.",
            "Berbagai program unggulan mulai dikembangkan, seperti pembelajaran berbasis teknologi, penguatan karakter Islami, serta kegiatan ekstrakurikuler yang mendukung potensi akademik dan non-akademik siswa. Madrasah juga memperluas kerja sama dengan berbagai pihak untuk meningkatkan mutu pendidikan dan daya saing lulusan.",
            "Perkembangan ini menandai transformasi MAN 1 Wonosobo dari lembaga pendidikan tradisional menjadi institusi yang dinamis, inovatif, dan berorientasi pada kualitas.",
          ],
        },
        {
          judul: "Masa Kini",
          teks: [
            "Saat ini MAN 1 Wonosobo terus berbenah dan berinovasi dalam menghadapi tantangan pendidikan abad ke-21. Madrasah telah membuka Kelas Unggulan dengan program beasiswa prestasi, menyediakan fasilitas asrama bagi peserta didik, serta menerapkan sistem digitalisasi dalam layanan akademik dan administrasi.",
            "Selain itu, madrasah aktif mengembangkan pembelajaran berbasis proyek dan riset, yang mendorong siswa untuk berpikir kritis, kreatif, dan kolaboratif. Upaya ini sejalan dengan visi madrasah untuk mencetak lulusan yang berakhlak mulia, berprestasi unggul, dan berwawasan lingkungan.",
            "Dengan semangat perubahan dan komitmen terhadap mutu pendidikan, MAN 1 Wonosobo terus meneguhkan posisinya sebagai lembaga pendidikan Islam yang maju, berdaya saing, dan berkontribusi nyata bagi masyarakat.",
          ],
        },
      ]}
    />
  );
}
