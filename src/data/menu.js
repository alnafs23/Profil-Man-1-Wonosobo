export const menu = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Profil Madrasah", href: "/about" },
      { label: "Sejarah MAN 1 Wonosobo", href: "/sejarah" },
      { label: "Visi & Misi", href: "/visi-misi" },
      { label: "Akreditasi", href: "/akreditasi" },
      { label: "Sambutan Kepala Madrasah", href: "/sambutan" },
      { label: "Struktur Organisasi", href: "/struktur" },
      { label: "Guru & Tenaga Kependidikan", href: "/guru" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  { label: "Berita", href: "/berita" },
  {
    label: "Program Madrasah",
    href: "/program-unggulan",
    children: [
      { label: "Program Unggulan", href: "/program-unggulan" },
      { label: "Jurusan (IPA, IPS, Keagamaan)", href: "/jurusan" },
      { label: "Kelas Unggulan (Beasiswa Prestasi)", href: "/kelas-unggulan" },
      { label: "Asrama MAN 1 Wonosobo", href: "/asrama" },
      { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
      { label: "Kurikulum", href: "/kurikulum" },
      { label: "Sarana Prasarana", href: "/sarana-prasarana" },
      { label: "Kesiswaan", href: "/kesiswaan" },
      { label: "Hubungan Masyarakat", href: "/humas" },
    ],
  },
  { label: "Galeri", href: "/galeri" },
];
