import PageHeader from "@/components/PageHeader";
import { GuruLive } from "@/components/Live";

export const metadata = { title: "Guru & Tenaga Kependidikan | MAN 1 Wonosobo" };

export default function Guru() {
  return (
    <>
      <PageHeader judul="Guru & Tenaga Kependidikan" deskripsi="Pendidik dan tenaga kependidikan MAN 1 Wonosobo." />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <GuruLive />
      </div>
    </>
  );
}
