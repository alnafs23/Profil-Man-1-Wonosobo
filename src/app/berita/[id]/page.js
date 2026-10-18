import { berita, getBeritaById } from "@/data/berita";
import BeritaDetail from "@/components/BeritaDetail";

export function generateStaticParams() {
  return berita.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const b = getBeritaById(id);
  return { title: b ? `${b.judul} | MAN 1 Wonosobo` : "Berita | MAN 1 Wonosobo" };
}

export default async function DetailBerita({ params }) {
  const { id } = await params;
  return <BeritaDetail id={id} />;
}
