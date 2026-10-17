"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sekolah } from "@/data/sekolah";

const slides = [
  {
    gambar: "/hero1.jpg",
    judul: "Tempat Terbaik Untuk Menuntut Ilmu",
    teks: "Jangan lewatkan kesempatan mendapatkan pendidikan berkualitas dan berakhlak mulia di Madrasah Aliyah Negeri 1 Wonosobo. Jadilah bagian dari komunitas peserta didik yang berprestasi dan mulailah perjalananmu menuju masa depan yang sukses!",
  },
  {
    gambar: "/hero2.jpg",
    judul: "Kelas Unggulan & Asrama MAN 1 Wonosobo",
    teks: "Raih beasiswa prestasi melalui Kelas Unggulan dan kembangkan karakter bersama pembinaan ibadah dan belajar terjadwal di asrama madrasah. Mulia dalam restu wali.",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const total = slides.length;

  const next = () => setI((v) => (v + 1) % total);
  const prev = () => setI((v) => (v - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % total), 7000);
    return () => clearInterval(t);
  }, [paused, total]);

  function onDown(e) {
    startX.current = e.clientX;
  }
  function onUp(e) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    startX.current = null;
  }

  return (
    <section
      className="relative h-[640px] md:h-[700px] overflow-hidden bg-emerald-950 text-white select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.judul} className="relative min-w-full h-full">
            <img
              src={s.gambar}
              alt={s.judul}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-950/65" />
            <div className="relative h-full max-w-4xl mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center">
              <p className="text-amber-300 font-bold tracking-widest text-sm md:text-base">
                {sekolah.namaLengkap.toUpperCase()}
              </p>
              <p className="italic text-emerald-100 text-sm md:text-base mb-5">
                &ldquo;{sekolah.slogan}&rdquo;
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                {s.judul}
              </h2>
              <p className="text-sm md:text-lg text-emerald-50 leading-relaxed mb-6">
                {s.teks}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center"
      >
        <span className="block h-3 w-3 border-l-2 border-b-2 border-white rotate-45 ml-1" />
      </button>
      <button
        onClick={next}
        aria-label="Berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center"
      >
        <span className="block h-3 w-3 border-r-2 border-t-2 border-white rotate-45 mr-1" />
      </button>

      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.judul}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              idx === i
                ? "w-8 bg-amber-400"
                : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
