import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import BeritaCard from "@/components/BeritaCard";
import GalleryGrid from "@/components/GalleryGrid";
import FeatureSection from "@/components/FeatureSection";
import ParallaxSection from "@/components/ParallaxSection";
import TiktokVideos from "@/components/TiktokVideos";
import InstagramFeed from "@/components/InstagramFeed";
import { berita } from "@/data/berita";
import { galeri } from "@/data/galeri";
import { videos } from "@/data/video";
import { ekstrakurikuler } from "@/data/ekstrakurikuler";
import { guru } from "@/data/guru";
import EkskulCard from "@/components/EkskulCard";

const jalurSpmb = [
  {
    judul: "Jalur Prestasi",
    teks: "Untuk calon peserta didik berprestasi akademik maupun non-akademik.",
  },
  {
    judul: "Jalur Afirmasi",
    teks: "Untuk calon peserta didik pemegang Kartu Indonesia Pintar (KIP) atau dari keluarga kurang mampu.",
  },
  {
    judul: "Jalur Reguler",
    teks: "Seleksi umum berdasarkan nilai rapor dan kuota yang tersedia.",
  },
];

export default function Home() {
  const terbaru = berita.slice(0, 3);

  return (
    <>
      <HeroSlider />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
          <img
            src="/kepala.png"
            alt="Kepala Madrasah"
            className="rounded-2xl shadow-lg w-full max-w-xs mx-auto"
          />
          <div className="md:col-span-2">
            <p className="text-amber-600 font-semibold text-sm tracking-wide mb-1">
              SAMBUTAN KEPALA MADRASAH
            </p>
            <h2 className="text-3xl font-extrabold text-emerald-800 mb-4">
              Mencetak Generasi Tangguh, Cerdas, dan Qur&apos;ani
            </h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              Assalamu&apos;alaikum Wr. Wb. Selamat datang di website resmi MAN
              1 Wonosobo. Kami berkomitmen mencetak generasi yang cerdas,
              berprestasi, berakhlak mulia, dan peduli lingkungan melalui
              pembelajaran modern dan pembinaan karakter yang berkelanjutan.
            </p>
            <Link
              href="/sambutan"
              className="inline-block bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700"
            >
              Baca Sambutan Lengkap
            </Link>
          </div>
        </div>
      </section>

      <FeatureSection
        bg="bg-emerald-50"
        label="TENTANG MADRASAH"
        judul="MAN 1 Wonosobo"
        teks="Madrasah aliyah negeri di bawah naungan Kementerian Agama yang menyelenggarakan pendidikan menengah berbasis keislaman, prestasi akademik, dan karakter, dengan dukungan kelas unggulan, asrama, dan beragam ekstrakurikuler."
        poin={[
          "Pembelajaran modern berbasis nilai keislaman",
          "Pembinaan prestasi akademik dan non-akademik",
          "Lingkungan madrasah yang bersih dan hijau",
        ]}
        gambar="/sekolah.jpg"
        href="/about"
        tombol="Tentang MAN 1 Wonosobo"
      />

      <ParallaxSection image="/galeri5.png" className="py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber-300 font-semibold tracking-wide text-sm mb-1">
            SELEKSI PENERIMAAN MURID BARU
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            SPMB 2026 Dibuka!
          </h2>
          <p className="text-emerald-50 max-w-2xl mx-auto mb-10">
            Bergabunglah bersama MAN 1 Wonosobo. Tersedia tiga jalur pendaftaran
            untuk calon peserta didik lulusan SMP/MTs.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10 items-stretch">
            {jalurSpmb.map((j) => (
              <div
                key={j.judul}
                className="h-full flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur border border-white/30 rounded-xl p-6"
              >
                <h3 className="font-bold text-xl text-amber-300 mb-2">
                  {j.judul}
                </h3>
                <p className="text-sm text-emerald-50">{j.teks}</p>
              </div>
            ))}
          </div>
          <Link
            href="/spmb"
            className="inline-block bg-amber-400 text-emerald-950 font-bold px-8 py-3 rounded-lg hover:bg-amber-300"
          >
            Informasi SPMB 2026
          </Link>
        </div>
      </ParallaxSection>

      <FeatureSection
        label="PROGRAM MADRASAH"
        judul="Kelas Unggulan (Beasiswa Prestasi)"
        teks="Kelas khusus bagi peserta didik berprestasi yang dibina secara intensif untuk meraih prestasi akademik dan non-akademik terbaik, dengan dukungan beasiswa prestasi."
        poin={[
          "Beasiswa bagi peserta didik jalur prestasi",
          "Pembinaan olimpiade dan lomba",
          "Pendampingan persiapan perguruan tinggi",
        ]}
        gambar="/galeri7.jpg"
        href="/kelas-unggulan"
      />

      <FeatureSection
        bg="bg-stone-100"
        reverse
        label="PROGRAM MADRASAH"
        judul="Asrama MAN 1 Wonosobo"
        teks="Tempat tinggal yang nyaman dan kondusif dengan pembinaan ibadah, akhlak, dan belajar terjadwal, dibimbing oleh pembina dan pengasuh asrama."
        poin={[
          "Asrama putri ",
          "Salat berjamaah dan tadarus Al-Qur'an",
          "Belajar malam terjadwal",
        ]}
        gambar="/galeri4.png"
        href="/asrama"
      />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle
          judul="Ekstrakurikuler"
          sub="Kembangkan minat dan bakat bersama kegiatan madrasah."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ekstrakurikuler.slice(0, 4).map((e) => (
            <EkskulCard key={e.nama} {...e} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/ekstrakurikuler"
            className="inline-block border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-2 rounded-lg hover:bg-emerald-600 hover:text-white"
          >
            Semua Ekstrakurikuler
          </Link>
        </div>
      </section>

      <ParallaxSection image="/galeri1.jpg" className="py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mx-auto mb-5 h-24 w-24 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center text-6xl font-extrabold border-4 border-white shadow-lg">
            A
          </div>
          <p className="text-amber-300 font-semibold tracking-wide text-sm mb-1">
            AKREDITASI
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            MAN 1 Wonosobo Terakreditasi A
          </h2>
          <p className="text-emerald-50 mb-8">
            Bukti komitmen madrasah dalam menjaga mutu layanan pendidikan sesuai
            standar nasional.
          </p>
          <Link
            href="/akreditasi"
            className="inline-block border-2 border-white font-bold px-7 py-3 rounded-lg hover:bg-white hover:text-emerald-800"
          >
            Lihat Akreditasi
          </Link>
        </div>
      </ParallaxSection>

      <section className="bg-emerald-50 py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-amber-600 font-semibold text-sm tracking-wide mb-1">
            GURU &amp; TENAGA KEPENDIDIKAN
          </p>
          <h2 className="text-3xl font-extrabold text-emerald-800 mb-3">
            {guru.length} Pendidik dan Tenaga Kependidikan
          </h2>
          <p className="text-gray-700 mb-6">
            Dibimbing oleh guru dan tenaga kependidikan yang berkompeten dan
            berdedikasi.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/guru"
              className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-700"
            >
              Lihat Guru
            </Link>
            <Link
              href="/struktur"
              className="border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-emerald-600 hover:text-white"
            >
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle
          judul="Berita Terbaru"
          sub="Kabar terbaru kegiatan dan prestasi madrasah."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {terbaru.map((b) => (
            <BeritaCard key={b.id} berita={b} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/berita"
            className="inline-block border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-2 rounded-lg hover:bg-emerald-600 hover:text-white"
          >
            Semua Berita
          </Link>
        </div>
      </section>

      <div className="bg-emerald-50">
        <TiktokVideos videos={videos} />
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionTitle
          judul="Galeri"
          sub="Dokumentasi kegiatan dan fasilitas madrasah."
        />
        <GalleryGrid items={galeri.slice(0, 4)} />
        <div className="text-center mt-6">
          <Link
            href="/galeri"
            className="text-emerald-700 font-semibold border-b-2 border-amber-400"
          >
            Lihat semua galeri
          </Link>
        </div>
      </section>

      <div className="bg-stone-100">
        <InstagramFeed />
      </div>
    </>
  );
}
