export default function ParallaxSection({ image, overlay = "bg-emerald-950/75", className = "", children }) {
  return (
    <section className={`relative bg-fixed bg-cover bg-center ${className}`} style={{ backgroundImage: `url(${image})` }}>
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative">{children}</div>
    </section>
  );
}
