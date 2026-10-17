import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Visi & Misi | MAN 1 Wonosobo" };

export default function VisiMisi() {
  return (
    <InfoPage
      judul="Visi, Misi, dan Tujuan MAN 1 Wonosobo"
      deskripsi="Arah, nilai, dan tujuan pendidikan di MAN 1 Wonosobo."
      gambar="/sekolah.jpg"
      seksi={[
        {
          judul: "Visi",
          kutipan:
            "TERWUJUDNYA LULUSAN YANG BERAKHLAQ MULIA, BERBUDAYA ISLAMI, BERPRESTASI UNGGUL DAN BERWAWASAN LINGKUNGAN",
          subjudul: "Indikator Visi:",
          urut: [
            "Terwujudnya generasi yang mampu membaca Alqur’an dengan baik dan benar (tartil).",
            "Terwujudnya generasi yang tekun melaksanakan ibadah wajib maupun sunah.",
            "Terwujudnya generasi yang santun dalam bertutur dan berperilaku.",
            "Terwujudnya generasi yang unggul dalam prestasi akademik dan non akademik sebagai bekal melanjutkan ke pendidikan yang lebih tinggi dan atau hidup mandiri.",
          ],
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
          judul: "Tujuan Bidang Akademik",
          poin: [
            "Rata-rata nilai UNBK dan UAMBNBK mencapai 70,00.",
            "Persentase kelulusan mencapai angka 100%.",
            "Jumlah lulusan yang melanjutkan studi ke Perguruan Tinggi melalui jalur SNMPTN, SBMPTN, SPANPTKIN, Mandiri, dan Perguruan Tinggi Swasta mencapai angka minimal 30%.",
            "Berprestasi pada ajang KSM dan OSN tingkat nasional.",
          ],
        },
        {
          judul: "Tujuan Bidang Non Akademik",
          poin: [
            "Berprestasi pada ajang POPDA dan AKSIOMA tingkat provinsi dan nasional.",
            "Tim Syahril Qur’an, Fahmil Qur’an, dan Qori’/Qori’ah menjadi juara di tingkat provinsi.",
            "Peserta didik mampu berbahasa Inggris dan bahasa Arab.",
            "Peserta didik melaksanakan Tadarus Al Qur’an dan Shalat Dhuha.",
            "Peserta didik telah menghafal Alqur’an (Tahfidzul Qur’an).",
            "Peserta didik mampu baca tulis huruf Alqur’an dengan baik dan benar.",
            "Peserta didik mampu memimpin kegiatan keagamaan Islam di masyarakat.",
            "Terjalin kerja sama dengan BLK, POLRES, KODIM, BRI, RSI, PMI, DISKOMINFO, KESBANGPOLINMAS, dan lembaga-lembaga lain yang mampu mendukung tercapainya tujuan madrasah.",
          ],
        },
      ]}
    />
  );
}
