import FotoBingkai from "@/components/FotoBingkai";
export default function GalleryGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((g) => (
        <figure key={g.id ?? g.src} className="overflow-hidden rounded-xl border border-gray-200 group">
          <FotoBingkai src={g.src} alt={g.judul} />
        </figure>
      ))}
    </div>
  );
}
