import PageHeader from "@/components/PageHeader";
import { EkskulGrid } from "@/components/Live";

export const metadata = { title: "Ekstrakurikuler | MAN 1 Wonosobo" };

export default function Ekstrakurikuler() {
  return (
    <>
      <PageHeader judul="Ekstrakurikuler" deskripsi="Wadah pengembangan minat, bakat, dan karakter peserta didik." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EkskulGrid />
      </div>
    </>
  );
}
