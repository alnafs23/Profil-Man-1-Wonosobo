import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Kesiswaan | MAN 1 Wonosobo" };

export default function Kesiswaan() {
  return (
    <InfoPage
      judul="Kesiswaan"
      deskripsi="Pembinaan dan kegiatan peserta didik."
      seksi={[
        {
          judul: "OSIM",
          teks: [
            "Organisasi Siswa Intra Madrasah (OSIM) menjadi wadah kepemimpinan dan kreativitas peserta didik.",
          ],
        },
        {
          judul: "Ekstrakurikuler",
          poin: [
            "Pramuka",
            "PMR",
            "Paskibra",
            "Hadroh / Seni Islami",
            "Basket & Futsal",
            "Multimedia Club",
          ],
        },
        {
          judul: "Prestasi Peserta Didik",
          poin: [
            "Olimpiade sains tingkat kabupaten hingga provinsi",
            "Lomba keagamaan (MTQ, pidato, kaligrafi)",
            "Olahraga dan pramuka",
          ],
        },
      ]}
    />
  );
}
