import PageHeader from "@/components/PageHeader";
import { BeritaGrid } from "@/components/Live";

export const metadata = { title: "Berita | MAN 1 Wonosobo" };

export default function BeritaPage() {
  return (
    <>
      <PageHeader judul="Berita" deskripsi="Informasi kegiatan, prestasi, dan pengumuman MAN 1 Wonosobo." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <BeritaGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" />
      </div>
    </>
  );
}
