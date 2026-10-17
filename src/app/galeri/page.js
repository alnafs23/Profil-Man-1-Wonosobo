import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import InstagramFeed from "@/components/InstagramFeed";
import { galeri } from "@/data/galeri";

export const metadata = { title: "Galeri | MAN 1 Wonosobo" };

export default function Galeri() {
  return (
    <>
      <PageHeader judul="Galeri" deskripsi="Dokumentasi kegiatan dan fasilitas MAN 1 Wonosobo." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <GalleryGrid items={galeri} />
      </div>
      <div className="bg-stone-100">
        <InstagramFeed />
      </div>
    </>
  );
}
