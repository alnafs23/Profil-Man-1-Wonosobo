import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Kurikulum | MAN 1 Wonosobo" };

export default function Kurikulum() {
  return (
    <InfoPage
      judul="Kurikulum"
      deskripsi="Kurikulum yang diterapkan di MAN 1 Wonosobo."
      seksi={[
        { judul: "Kurikulum Madrasah", teks: ["MAN 1 Wonosobo menerapkan Kurikulum Merdeka dengan penguatan mata pelajaran keagamaan (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab)."] },
        { judul: "Peminatan", poin: ["MIPA (Matematika dan Ilmu Pengetahuan Alam)", "IPS (Ilmu Pengetahuan Sosial)", "Keagamaan / Bahasa (sesuai kebijakan madrasah)"] },
        { judul: "Penguatan Karakter", poin: ["Projek Penguatan Profil Pelajar Pancasila & Rahmatan lil 'Alamin", "Pembiasaan ibadah dan literasi"] },
      ]}
    />
  );
}
