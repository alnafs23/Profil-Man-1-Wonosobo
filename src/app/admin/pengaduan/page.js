"use client";

import { useMemo, useState } from "react";
import { Badge, Btn, Card, Empty, PageHead, Modal, td, th, useUI } from "@/components/admin/ui";
import { relWaktu, removeItem, upsert, useCollection } from "@/lib/store";

const STATUS = { baru: ["Baru", "danger"], diproses: ["Diproses", "warning"], selesai: ["Selesai", "success"] };

export default function PengaduanAdmin() {
  const { toast, confirm } = useUI();
  const list = useCollection("pengaduan");
  const [tab, setTab] = useState("semua");
  const [aktif, setAktif] = useState(null);

  const urut = useMemo(() => [...list].sort((a, b) => String(b.waktu).localeCompare(String(a.waktu))), [list]);
  const tampil = urut.filter((p) => tab === "semua" || p.status === tab);
  const hitung = (s) => list.filter((p) => p.status === s).length;
  const cur = aktif && list.find((p) => p.id === aktif);

  const ubah = async (p, status) => {
    const r = await upsert("pengaduan", { ...p, status });
    r.ok ? toast(`Ditandai ${STATUS[status][0].toLowerCase()}.`) : toast(r.error, "error");
  };
  const hapus = async (p) => {
    if (!(await confirm({ title: "Hapus pengaduan?", message: `Pengaduan dari ${p.nama} akan dihapus permanen.`, confirmLabel: "Hapus", tone: "danger" }))) return;
    await removeItem("pengaduan", p.id);
    setAktif(null);
    toast("Pengaduan dihapus.");
  };

  const tabs = [["semua", "Semua", list.length], ["baru", "Baru", hitung("baru")], ["diproses", "Diproses", hitung("diproses")], ["selesai", "Selesai", hitung("selesai")]];

  return (
    <>
      <PageHead title="Pengaduan Masyarakat" crumb="Pengaduan" />
      <Card bodyClass="p-0">
        <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-ad-line px-3 pt-2">
          {tabs.map(([k, l, n]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-[13px] font-medium ${tab === k ? "border-ad-primary text-ad-primary" : "border-transparent text-ad-muted hover:text-ad-fg"}`}>
              {l} <span className="ml-1 text-xs opacity-70">{n}</span>
            </button>
          ))}
        </div>
        {tampil.length === 0 ? (
          <Empty icon="message" title={list.length ? "Tidak ada pengaduan di tab ini" : "Belum ada pengaduan"} text={list.length ? undefined : "Pengaduan yang dikirim lewat formulir di halaman Pengaduan Masyarakat website akan muncul di sini."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b border-ad-line bg-ad-hover/50"><tr><th className={th}>Pengirim</th><th className={th}>Kategori</th><th className={th}>Pesan</th><th className={th}>Status</th><th className={th}>Masuk</th></tr></thead>
              <tbody className="divide-y divide-ad-line">
                {tampil.map((p) => (
                  <tr key={p.id} className="cursor-pointer hover:bg-ad-hover/50" onClick={() => setAktif(p.id)}>
                    <td className={td}><button type="button" className="text-left font-semibold hover:text-ad-primary" onClick={() => setAktif(p.id)}>{p.nama}</button><p className="text-[11px] text-ad-muted">{p.kontak}</p></td>
                    <td className={td}>{p.kategori}</td>
                    <td className={`${td} max-w-xs`}><p className="line-clamp-2 text-xs text-ad-muted">{p.pesan}</p></td>
                    <td className={td}><Badge tone={STATUS[p.status][1]}>{STATUS[p.status][0]}</Badge></td>
                    <td className={`${td} whitespace-nowrap text-xs text-ad-muted`}>{relWaktu(p.waktu)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={!!cur} onClose={() => setAktif(null)} title="Detail pengaduan"
        footer={cur && <>
          <Btn variant="ghost" icon="trash" onClick={() => hapus(cur)} className="mr-auto">Hapus</Btn>
          {cur.status !== "diproses" && <Btn onClick={() => ubah(cur, "diproses")}>Tandai diproses</Btn>}
          {cur.status !== "selesai" && <Btn variant="primary" icon="check" onClick={() => ubah(cur, "selesai")}>Tandai selesai</Btn>}
        </>}>
        {cur && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2"><Badge tone={STATUS[cur.status][1]}>{STATUS[cur.status][0]}</Badge><Badge>{cur.kategori}</Badge><span className="text-xs text-ad-muted">{relWaktu(cur.waktu)}</span></div>
            <dl className="grid grid-cols-[90px_1fr] gap-y-2 text-[13px]"><dt className="text-ad-muted">Nama</dt><dd className="font-medium">{cur.nama}</dd><dt className="text-ad-muted">Kontak</dt><dd className="break-all">{cur.kontak}</dd></dl>
            <p className="whitespace-pre-line rounded-md border border-ad-line bg-ad-hover/50 p-3 text-[13px] leading-relaxed">{cur.pesan}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
