"use client";

import Link from "next/link";
import { useSekolah } from "@/lib/store";
import { tautanInternal, tautanEksternal } from "@/data/links";
import { FacebookIcon, YoutubeIcon, InstagramIcon, TiktokIcon } from "@/components/SocialIcons";

export default function Footer() {
  const sekolah = useSekolah();
  const sosial = [
    { nama: "Facebook", href: sekolah.facebook, Icon: FacebookIcon },
    { nama: "YouTube", href: sekolah.youtube, Icon: YoutubeIcon },
    { nama: "Instagram", href: sekolah.instagram, Icon: InstagramIcon },
    { nama: "TikTok", href: sekolah.tiktok, Icon: TiktokIcon },
  ];

  return (
    <footer className="mt-0 text-white">
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900">
        <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{sekolah.nama}</h3>
            <p className="text-sm leading-relaxed text-emerald-50">{sekolah.alamat}</p>
            <p className="text-sm mt-3 text-emerald-50">Telp: <a href="tel:+62286322129" className="hover:text-amber-300">{sekolah.telepon}</a></p>
            <p className="text-sm text-emerald-50 break-all">Email: <a href={`mailto:${sekolah.email}`} className="hover:text-amber-300">{sekolah.email}</a></p>
            <p className="text-sm text-emerald-50 break-all pl-[2.35rem]"><a href={`mailto:${sekolah.emailTu}`} className="hover:text-amber-300">{sekolah.emailTu}</a></p>
          </div>

          <div>
            <h4 className="text-lg mb-3 text-amber-300">Tautan Internal</h4>
            <ul className="space-y-2 text-sm font-semibold">
              {tautanInternal.map((l) => (
                <li key={l.href}>
                  {l.eksternal ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-amber-300">{l.label}</a>
                  ) : (
                    <Link href={l.href} className="hover:text-amber-300">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-3 text-amber-300">Tautan Eksternal</h4>
            <ul className="space-y-2 text-sm font-semibold">
              {tautanEksternal.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="hover:text-amber-300">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-3 text-amber-300">Yuk Follow!</h4>
            <p className="text-sm text-emerald-50 mb-4">
              Follow akun sosial media resmi {sekolah.nama} untuk mendapatkan informasi terbaru terkait madrasah.
            </p>
            <div className="flex gap-2">
              {sosial.map(({ nama, href, Icon }) => (
                <a key={nama} href={href} target="_blank" rel="noreferrer" aria-label={nama} className="h-8 w-8 bg-white text-emerald-800 flex items-center justify-center hover:bg-amber-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between gap-2 text-sm font-semibold">
          <p>Copyright © {sekolah.tahun} {sekolah.namaLengkap}. All rights reserved.</p>
          <p>Powered by {sekolah.nama.toUpperCase()}</p>
        </div>
      </div>
    </footer>
  );
}
