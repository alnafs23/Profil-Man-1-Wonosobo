import InfoPage from "@/components/InfoPage";
import KontakInfo from "@/components/KontakInfo";

export const metadata = { title: "Kontak | MAN 1 Wonosobo" };

export default function Kontak() {
  return (
    <InfoPage judul="Kontak" deskripsi="Hubungi kami untuk informasi lebih lanjut.">
      <KontakInfo />
    </InfoPage>
  );
}
