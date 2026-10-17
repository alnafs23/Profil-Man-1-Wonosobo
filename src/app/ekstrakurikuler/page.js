import PageHeader from "@/components/PageHeader";
import EkskulCard from "@/components/EkskulCard";
import { ekstrakurikuler } from "@/data/ekstrakurikuler";

export const metadata = { title: "Ekstrakurikuler | MAN 1 Wonosobo" };

export default function Ekstrakurikuler() {
  return (
    <>
      <PageHeader judul="Ekstrakurikuler" deskripsi="Wadah pengembangan minat, bakat, dan karakter peserta didik." />
      <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ekstrakurikuler.map((e) => <EkskulCard key={e.nama} {...e} />)}
      </div>
    </>
  );
}
