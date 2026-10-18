"use client";

import Link from "next/link";
import { useMemo } from "react";
import Icon from "@/components/admin/Icon";
import { Badge, Btn, Card, PageHead } from "@/components/admin/ui";
import { BarPairs, MiniBars, Progress, Sparkline } from "@/components/admin/charts";
import {
  BULAN, HARI, fmt, fmtRingkas, formatTanggalID, labelHalaman, pct, relHari,
  seriesDaily, seriesMonthly, sortBerita, sum, useCollection,
} from "@/lib/store";

function Delta({ v, className = "" }) {
  if (v === null) return null;
  const naik = v >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs ${className}`}>
      ({Math.abs(v).toLocaleString("id-ID")}%
      <Icon name={naik ? "arrowUp" : "arrowDown"} size={11} />)
    </span>
  );
}

function ikonHalaman(p) {
  if (p === "/") return "home";
  if (p.startsWith("/berita")) return "news";
  if (p === "/spmb") return "school";
  if (p === "/guru") return "users";
  if (p === "/galeri") return "image";
  return "globe";
}

export default function Dashboard() {
  const stats = useCollection("stats");
  const berita = useCollection("berita");
  const guru = useCollection("guru");
  const galeri = useCollection("galeri");
  const ekskul = useCollection("ekskul");
  const pengaduan = useCollection("pengaduan");

  const d = useMemo(() => {
    const now = new Date();
    const tahun = now.getFullYear();
    const bulanan = seriesMonthly(stats, tahun);
    const h30 = seriesDaily(stats, 30);
    const h14 = seriesDaily(stats, 14);
    const h7 = h14.slice(7);
    const h7lalu = h14.slice(0, 7);
    const pengunjungBulan = bulanan[now.getMonth()].v;
    const totalView = sum(Object.values(stats.pages));
    const topHalaman = Object.entries(stats.pages).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const gol = {};
    guru.forEach((g) => {
      const k = String(g.gol).split("/")[0] || "-";
      gol[k] = (gol[k] || 0) + 1;
    });
    return { now, tahun, bulanan, h30, h14, h20: seriesDaily(stats, 20), h7, h7lalu, pengunjungBulan, totalView, topHalaman, gol };
  }, [stats, guru]);

  const terbit = berita.filter((b) => b.status !== "draf");
  const draf = berita.length - terbit.length;
  const baru = pengaduan.filter((p) => p.status === "baru").length;
  const terbaru = sortBerita(berita).slice(0, 6);
  const bacaMax = Math.max(1, ...terbaru.map((b) => stats.pages[`/berita/${b.id}`] || 0));

  const v7 = sum(d.h7, (x) => x.v);
  const v7lalu = sum(d.h7lalu, (x) => x.v);
  const p7 = sum(d.h7, (x) => x.p);
  const p7lalu = sum(d.h7lalu, (x) => x.p);
  const maxHari = Math.max(1, ...d.h7.map((x) => x.p));

  const warnaGol = ["IV", "III", "II", "I"].filter((k) => d.gol[k]);
  const popMax = Math.max(1, ...d.topHalaman.map(([, n]) => n));

  return (
    <>
      <PageHead
        title="Dashboard"
        actions={<Btn variant="primary" icon="plus" href="/admin/berita?baru=1">Tambah berita</Btn>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md border border-ad-line bg-ad-card">
            <div className="flex items-start justify-between px-4 pt-4">
              <div>
                <h2 className="text-[15px] font-semibold">Pengunjung</h2>
                <p className="mt-0.5 text-xs text-ad-muted">{BULAN[d.now.getMonth()]} {d.tahun}</p>
              </div>
              <span className="text-[15px] font-semibold text-ad-primary">{fmt(d.pengunjungBulan)}</span>
            </div>
            <div className="mt-3"><Sparkline data={d.h30.map((x) => x.v)} color="#4b9bff" height={72} label="Pengunjung 30 hari terakhir" /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/guru" className="rounded-md border border-ad-line bg-ad-card p-3 transition-colors hover:border-ad-primary/60">
              <div className="flex items-start justify-between text-xs text-ad-muted">
                <span>Guru & Tendik</span>
                <span className="flex h-8 w-8 items-center justify-center rounded bg-ad-primary/15 text-ad-primary"><Icon name="users" size={15} /></span>
              </div>
              <p className="mt-1 text-base font-semibold">{fmt(guru.length)}</p>
              <p className="mt-1 text-xs text-ad-muted">orang tercatat</p>
            </Link>
            <Link href="/admin/berita" className="rounded-md border border-ad-line bg-ad-card p-3 transition-colors hover:border-ad-primary/60">
              <div className="flex items-start justify-between text-xs text-ad-muted">
                <span>Berita</span>
                <span className="flex h-8 w-8 items-center justify-center rounded bg-ad-primary/15 text-ad-primary"><Icon name="news" size={15} /></span>
              </div>
              <p className="mt-1 text-base font-semibold">{fmt(berita.length)}</p>
              <p className={`mt-1 text-xs ${draf ? "text-ad-warning" : "text-ad-success"}`}>{draf ? `${draf} draf` : "semua terbit"}</p>
            </Link>
          </div>
        </div>

        <Card className="lg:col-span-2" title="Kunjungan Website" sub={`Januari – Desember ${d.tahun}`}
          right={
            <div className="flex items-center gap-3 text-[11px] text-ad-muted">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-ad-primary" />Pengunjung</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: "var(--a-bar2)" }} />Halaman dilihat</span>
            </div>
          }>
          <BarPairs labels={BULAN.map((b) => b.slice(0, 3))} a={d.bulanan.map((x) => x.v)} b={d.bulanan.map((x) => x.p)} names={["Pengunjung", "Halaman dilihat"]} height={210} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_minmax(220px,250px)]">
        <Card title="Berita Terbaru" sub={`${fmt(berita.length)} berita · ${terbit.length} terbit`}
          right={<Btn size="sm" icon="plus" href="/admin/berita?baru=1">Tambah berita</Btn>} bodyClass="p-0 pt-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead>
                <tr className="border-y border-ad-line text-xs font-semibold">
                  <th className="w-14 px-4 py-2.5 text-left"><Icon name="image" size={14} /><span className="sr-only">Gambar</span></th>
                  <th className="px-2 py-2.5 text-left">Judul</th>
                  <th className="px-2 py-2.5 text-left">Status</th>
                  <th className="w-44 px-2 py-2.5 text-left">Dibaca</th>
                  <th className="px-4 py-2.5 text-left">Terbit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ad-line">
                {terbaru.map((b) => {
                  const dibaca = stats.pages[`/berita/${b.id}`] || 0;
                  return (
                    <tr key={b.id} className="hover:bg-ad-hover/60">
                      <td className="px-4 py-2.5"><img src={b.gambar || "/logo.png"} alt="" className="h-9 w-9 rounded-full object-cover" /></td>
                      <td className="max-w-[280px] px-2 py-2.5">
                        <Link href={`/admin/berita?q=${encodeURIComponent(b.judul)}`} className="line-clamp-1 font-semibold hover:text-ad-primary">{b.judul}</Link>
                        <span className="text-[11px] text-ad-muted">{formatTanggalID(b.tgl, true)}</span>
                      </td>
                      <td className="px-2 py-2.5"><Badge tone={b.status === "draf" ? "warning" : "success"}>{b.status === "draf" ? "Draf" : "Terbit"}</Badge></td>
                      <td className="px-2 py-2.5">
                        <div className="flex justify-between text-xs"><b>{fmt(dibaca)}×</b><span className="text-ad-muted">{Math.round((dibaca / bacaMax) * 100)}%</span></div>
                        <Progress value={(dibaca / bacaMax) * 100} color="var(--color-ad-success)" className="mt-1" />
                      </td>
                      <td className="px-4 py-2.5 text-xs text-ad-muted">{relHari(b.tgl)}</td>
                    </tr>
                  );
                })}
                {terbaru.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-ad-muted">Belum ada berita. Tambahkan berita pertama Anda.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="overflow-hidden rounded-md bg-ad-sky text-white">
            <div className="px-4 pt-3">
              <p className="text-base font-semibold">{fmtRingkas(v7)} <Delta v={pct(v7, v7lalu)} className="font-normal opacity-90" /></p>
              <p className="text-xs opacity-90">Pengunjung 7 hari</p>
            </div>
            <div className="px-1 pb-1 pt-2"><Sparkline data={d.h7.map((x) => x.v)} color="#ffffff" fill={false} dots stretch={false} height={56} label="Pengunjung 7 hari terakhir" /></div>
          </div>
          <div className="overflow-hidden rounded-md bg-ad-amber text-white">
            <div className="px-4 pt-3">
              <p className="text-base font-semibold">{fmt(baru)} <span className="text-xs font-normal opacity-90">({pengaduan.length} total)</span></p>
              <p className="text-xs opacity-90">Pengaduan baru</p>
            </div>
            <div className="pt-2"><Sparkline data={d.h14.map((x) => x.p)} color="#ffffff" height={56} label="Halaman dilihat 14 hari terakhir" /></div>
          </div>
          <div className="overflow-hidden rounded-md bg-ad-pink text-white">
            <div className="px-4 pt-3">
              <p className="text-base font-semibold">{fmtRingkas(p7)} <Delta v={pct(p7, p7lalu)} className="font-normal opacity-90" /></p>
              <p className="text-xs opacity-90">Halaman dilihat 7 hari</p>
            </div>
            <div className="px-3 pb-0 pt-2"><MiniBars data={d.h20.map((x) => x.p)} height={56} /></div>
          </div>
        </div>
      </div>

      <Card className="mt-4" title="Ringkasan Konten & Lalu Lintas" sub="7 hari terakhir" bodyClass="p-4">
        <div className="grid grid-cols-2 gap-4 border-t border-ad-line pt-4 lg:grid-cols-4">
          {[
            ["Berita terbit", fmt(terbit.length), "var(--color-ad-violet)", "/admin/berita"],
            ["Berita draf", fmt(draf), "var(--color-ad-pink)", "/admin/berita"],
            ["Foto galeri", fmt(galeri.length), "var(--color-ad-amber)", "/admin/galeri"],
            ["Ekstrakurikuler", fmt(ekskul.length), "var(--color-ad-success)", "/admin/ekstrakurikuler"],
          ].map(([l, v, c, h]) => (
            <Link key={l} href={h} className="border-l-[3px] pl-3 transition-opacity hover:opacity-80" style={{ borderColor: c }}>
              <p className="text-[11px] text-ad-muted">{l}</p>
              <p className="text-[15px] font-semibold">{v}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          <div className="space-y-4">
            {d.h7.map((x) => (
              <div key={x.key} className="grid grid-cols-[84px_1fr] items-center gap-3">
                <span className="text-[11px] text-ad-muted">{HARI[x.date.getDay()]}</span>
                <div className="space-y-1" title={`${fmt(x.v)} pengunjung, ${fmt(x.p)} halaman dilihat`}>
                  <Progress value={(x.v / maxHari) * 100} color="var(--color-ad-violet)" />
                  <Progress value={(x.p / maxHari) * 100} color="var(--color-ad-pink)" />
                </div>
              </div>
            ))}
            <p className="flex items-center gap-4 pt-1 text-[11px] text-ad-muted">
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-ad-violet" />Pengunjung</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-ad-pink" />Halaman dilihat</span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold">Guru & tendik per golongan</p>
              {warnaGol.map((k) => (
                <div key={k}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2"><Icon name="user" size={14} />Golongan {k}</span>
                    <span><b>{d.gol[k]}</b> <span className="text-ad-muted">({Math.round((d.gol[k] / Math.max(1, guru.length)) * 100)}%)</span></span>
                  </div>
                  <Progress value={(d.gol[k] / Math.max(1, guru.length)) * 100} color="var(--color-ad-amber)" className="mt-1.5" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold">Halaman terpopuler</p>
              {d.topHalaman.map(([p, n]) => (
                <div key={p}>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex min-w-0 items-center gap-2"><Icon name={ikonHalaman(p)} size={14} /><span className="truncate">{labelHalaman(p, berita)}</span></span>
                    <span className="shrink-0"><b>{fmt(n)}</b> <span className="text-ad-muted">({Math.round((n / Math.max(1, d.totalView)) * 100)}%)</span></span>
                  </div>
                  <Progress value={(n / popMax) * 100} color="var(--color-ad-success)" className="mt-1.5" />
                </div>
              ))}
              {d.topHalaman.length === 0 && <p className="text-xs text-ad-muted">Belum ada data kunjungan.</p>}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
