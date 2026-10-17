import PageHeader from "@/components/PageHeader";
import StrukturBagan from "@/components/StrukturBagan";

export const metadata = { title: "Struktur Organisasi | MAN 1 Wonosobo" };

export default function Struktur() {
  return (
    <>
      <PageHeader judul="Struktur Organisasi" deskripsi="Susunan pengelola MAN 1 Wonosobo." />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <StrukturBagan />
      </div>
    </>
  );
}
