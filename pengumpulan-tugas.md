# Pengumpulan Tugas Website Profil MAN 1 Wonosobo

|                 |                                                    |
| --------------- | -------------------------------------------------- |
| **Nama**        | (Alina Fadlila Syifa)                              |
| **NIM**         | (2404140004)                                       |
| **Kelas**       | (Sistem Informasi Rombel 1)                        |
| **Mata Kuliah** | (Pemrogrman Web)                                   |
| **Sekolah**     | MAN 1 Wonosobo (Madrasah Aliyah Negeri 1 Wonosobo) |

---

## A. Source Code

### Struktur project

```
src/
├── app/
│   ├── layout.js            (Navbar + Footer dipasang sekali di sini)
│   ├── page.js              (Home)
│   ├── about/page.js
│   ├── berita/
│   │   ├── page.js          (daftar berita)
│   │   └── [id]/page.js     (detail berita, dynamic route)
│   ├── spmb/ sejarah/ visi-misi/ akreditasi/ sambutan/ struktur/
│   ├── guru/ ekstrakurikuler/ kelas-unggulan/ asrama/ kurikulum/
│   ├── sarana-prasarana/ kesiswaan/ humas/ galeri/ kontak/
│   └── pengaduan-masyarakat/
├── components/              (18 component reusable, antara lain:)
│   ├── Navbar.js  Footer.js  HeroSlider.js  BeritaCard.js
│   ├── PageHeader.js  SectionTitle.js  InfoPage.js  FotoBingkai.js
│   └── GalleryGrid.js  EkskulCard.js  GuruList.js  StrukturBagan.js ...
└── data/                    (data statis: berita, galeri, menu, guru, dll.)
public/                      (logo dan gambar)
```

### Pemenuhan ketentuan minimal

| No  | Fitur                               | Status                                                        |
| --- | ----------------------------------- | ------------------------------------------------------------- |
| 1   | Home `/`                            | Ya                                                            |
| 2   | About `/about`                      | Ya                                                            |
| 3   | Berita `/berita`                    | Ya                                                            |
| 4   | Detail berita `/berita/[id]`        | Ya (URL berbentuk slug, mis. `/berita/gladi-bersih-tka-2026`) |
| 5   | Navbar (`src/components/Navbar.js`) | Ya                                                            |
| 6   | Footer (`src/components/Footer.js`) | Ya                                                            |
| 7   | Tailwind CSS                        | Ya                                                            |
| 8   | Minimal 6 berita                    | Ya (8 berita)                                                 |
| 9   | Minimal 3 component                 | Ya (18 component)                                             |
| 10  | Navigasi internal memakai `Link`    | Ya                                                            |
| 11  | Responsive                          | Ya                                                            |
| 12  | JavaScript, bukan TypeScript        | Ya                                                            |

### Fitur tambahan (kreativitas)

Sejarah, Visi & Misi, Akreditasi, Sambutan Kepala Madrasah, Struktur Organisasi (bagan), Guru & Tenaga Kependidikan (tabel dengan pencarian), Ekstrakurikuler, Kelas Unggulan (Beasiswa Prestasi), Asrama, Kurikulum, Sarana Prasarana, Kesiswaan, Humas, Galeri, halaman SPMB, Pengaduan Masyarakat, slider hero, bagian video TikTok, serta tautan ke Instagram resmi madrasah.

---

## B. Alamat Website (Vercel)

**https://man1wonosobo.vercel.app/**
