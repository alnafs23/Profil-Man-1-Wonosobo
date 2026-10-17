export default function FotoBingkai({ src, alt = "", rasio = "aspect-[4/3]", className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-emerald-50 ${rasio} ${className}`}>
      <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover blur-xl scale-125 opacity-60" />
      <img src={src} alt={alt} className="relative h-full w-full object-contain" />
    </div>
  );
}
