import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Sambutan Kepala Madrasah | MAN 1 Wonosobo" };

export default function Sambutan() {
  return (
    <InfoPage
      judul="Sambutan Kepala Madrasah"
      deskripsi="Pesan dari Kepala MAN 1 Wonosobo."
      seksi={[
        {
          judul: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
          teks: [
            "Puji syukur kita panjatkan ke hadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. Selamat datang di website resmi MAN 1 Wonosobo.",
            "Kehadiran website ini merupakan wujud komitmen kami dalam menyediakan sarana informasi dan komunikasi yang terbuka bagi peserta didik, orang tua, alumni, serta masyarakat luas.",
            "Website ini diharapkan dapat menjadi media yang efektif untuk menyampaikan berbagai kegiatan, program, dan prestasi madrasah, sekaligus menjadi ruang interaksi yang positif antara madrasah dengan seluruh pemangku kepentingan.",
            "Melalui platform ini, kami ingin menghadirkan transparansi informasi, memperkuat hubungan silaturahmi, serta menumbuhkan rasa kebersamaan dalam mendukung kemajuan pendidikan.",
            "Kami berkomitmen menyelenggarakan pendidikan yang berkualitas dengan mengembangkan potensi peserta didik secara optimal. Fokus kami adalah membentuk generasi yang berakhlak mulia, berprestasi, berdaya saing, serta memiliki kepedulian terhadap lingkungan dan masyarakat.",
            "Dengan demikian, lulusan MAN 1 Wonosobo diharapkan mampu menjadi pribadi yang unggul, berintegritas, dan siap menghadapi tantangan zaman.",
            "Semoga website ini memberikan manfaat yang luas, menjadi sumber inspirasi, serta mendukung terwujudnya visi dan misi madrasah dalam mencetak generasi penerus bangsa yang berkarakter dan berprestasi.",
            "Wassalamu’alaikum Warahmatullahi Wabarakatuh.",
            "- H. Sunaryo, S.Pd., M.M ",
          ],
        },
      ]}
    />
  );
}
