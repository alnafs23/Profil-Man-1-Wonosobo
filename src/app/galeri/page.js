import PageHeader from "@/components/PageHeader";
import { GaleriLive } from "@/components/Live";
import InstagramFeed from "@/components/InstagramFeed";

export const metadata = { title: "Galeri | MAN 1 Wonosobo" };

export default function Galeri() {
  return (
    <>
      <PageHeader judul="Galeri" deskripsi="Dokumentasi kegiatan dan fasilitas MAN 1 Wonosobo." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <GaleriLive />
      </div>
      <div className="bg-stone-100">
        <InstagramFeed />
      </div>
    </>
  );
}
