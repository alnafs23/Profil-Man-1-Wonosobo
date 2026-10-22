"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/admin/Icon";
import { Badge, Btn, Card, Empty, Field, ImagePicker, IconBtn, Input, Modal, PageHead, Pager, SearchInput, Select, Textarea, td, th, useUI } from "@/components/admin/ui";
import { fmt, formatTanggalID, removeItem, sortBerita, todayISO, uniqueSlug, upsert, useCollection } from "@/lib/store";

const PER = 8;
const KOSONG = { judul: "", tgl: "", status: "terbit", gambar: "", ringkasan: "", isiText: "" };

export default function BeritaAdmin() {
  const { toast, confirm } = useUI();
  const list = useCollection("berita");
  const stats = useCollection("stats");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("semua");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null); // null = tertutup
  const [err, setErr] = useState({});

  const buka = (b) => {
    setErr({});
    setForm(b ? { ...b, isiText: (b.isi || []).join("\n\n") } : { ...KOSONG, tgl: todayISO() });
  };

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q")) setQ(p.get("q"));
    if (p.get("baru")) buka(null);
  }, []);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return sortBerita(list).filter(
      (b) => (status === "semua" || b.status === status) && (!s || b.judul.toLowerCase().includes(s))
    );
  }, [list, q, status]);

  const tampil = hasil.slice((page - 1) * PER, page * PER);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const simpan = async () => {
    const e = {};
    if (!form.judul.trim()) e.judul = "Judul wajib diisi.";
    if (!form.tgl) e.tgl = "Tanggal wajib diisi.";
    const isi = form.isiText.split(/\n{2,}/).map((x) => x.trim()).filter(Boolean);
    if (!isi.length) e.isiText = "Isi berita wajib diisi.";
    setErr(e);
    if (Object.keys(e).length) return;

    const ringkasan = form.ringkasan.trim() || (isi[0].length > 180 ? isi[0].slice(0, 177) + "…" : isi[0]);
    const item = {
      id: form.id || uniqueSlug(form.judul, list.map((x) => x.id)),
      judul: form.judul.trim(),
      tgl: form.tgl,
      status: form.status,
      gambar: form.gambar || "/logo.png",
      ringkasan,
      isi,
      penulis: form.penulis || "Admin",
      diubah: new Date().toISOString(),
    };
    const r = await upsert("berita", item);
    if (!r.ok) return toast(r.error, "error");
    toast(form.id ? "Berita diperbarui." : "Berita ditambahkan.");
    setForm(null);
  };

  const hapus = async (b) => {
    const ok = await confirm({ title: "Hapus berita?", message: `"${b.judul}" akan dihapus dari website dan tidak bisa dikembalikan.`, confirmLabel: "Hapus", tone: "danger" });
    if (!ok) return;
    const r = await removeItem("berita", b.id);
    r.ok ? toast("Berita dihapus.") : toast(r.error, "error");
  };

  const ubahStatus = async (b) => {
    const r = await upsert("berita", { ...b, status: b.status === "draf" ? "terbit" : "draf", diubah: new Date().toISOString() });
    r.ok ? toast(b.status === "draf" ? "Berita diterbitkan." : "Berita dijadikan draf.") : toast(r.error, "error");
  };

  return (
    <>
      <PageHead title="Berita" crumb="Berita" actions={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah berita</Btn>} />

      <Card bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Cari judul berita…" className="w-full sm:w-72" />
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="w-auto" aria-label="Filter status">
            <option value="semua">Semua status</option>
            <option value="terbit">Terbit</option>
            <option value="draf">Draf</option>
          </Select>
          <span className="ml-auto text-xs text-ad-muted">{fmt(hasil.length)} berita</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead className="border-y border-ad-line bg-ad-hover/50">
              <tr><th className={`${th} w-20`}>Gambar</th><th className={th}>Judul</th><th className={th}>Status</th><th className={th}>Dibaca</th><th className={`${th} text-right`}>Aksi</th></tr>
            </thead>
            <tbody className="divide-y divide-ad-line">
              {tampil.map((b) => (
                <tr key={b.id} className="hover:bg-ad-hover/50">
                  <td className={td}><img src={b.gambar || "/logo.png"} alt="" className="h-12 w-16 rounded object-cover" /></td>
                  <td className={`${td} max-w-sm`}>
                    <p className="line-clamp-2 font-semibold">{b.judul}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-ad-muted"><Icon name="calendar" size={11} />{formatTanggalID(b.tgl)}</p>
                  </td>
                  <td className={td}>
                    <button type="button" onClick={() => ubahStatus(b)} title="Klik untuk mengubah status" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ad-primary/50 rounded">
                      <Badge tone={b.status === "draf" ? "warning" : "success"}>{b.status === "draf" ? "Draf" : "Terbit"}</Badge>
                    </button>
                  </td>
                  <td className={`${td} text-xs text-ad-muted`}>{fmt(stats.pages[`/berita/${b.id}`] || 0)}×</td>
                  <td className={`${td} text-right`}>
                    <div className="inline-flex">
                      <a href={`/berita/${b.id}${b.status === "draf" ? "?pratinjau=1" : ""}`} target="_blank" rel="noreferrer" aria-label="Lihat di website" title="Lihat di website" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ad-muted hover:bg-ad-hover hover:text-ad-fg"><Icon name="eye" size={15} /></a>
                      <IconBtn icon="pencil" label="Ubah" onClick={() => buka(b)} />
                      <IconBtn icon="trash" label="Hapus" tone="danger" onClick={() => hapus(b)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tampil.length === 0 && (
            <Empty icon="news" title={list.length ? "Berita tidak ditemukan" : "Belum ada berita"} text={list.length ? "Coba kata kunci atau filter lain." : "Tambahkan berita pertama agar tampil di website."}
              action={!list.length && <Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah berita</Btn>} />
          )}
        </div>
        <Pager page={page} perPage={PER} total={hasil.length} onPage={setPage} />
      </Card>

      <Modal open={!!form} onClose={() => setForm(null)} size="lg" title={form?.id ? "Ubah berita" : "Tambah berita"}
        footer={<><Btn onClick={() => setForm(null)}>Batal</Btn><Btn variant="primary" onClick={simpan}>Simpan berita</Btn></>}>
        {form && (
          <div className="space-y-4">
            <Field label="Judul" error={err.judul}><Input value={form.judul} onChange={set("judul")} placeholder="Judul berita" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tanggal" error={err.tgl}><Input type="date" value={form.tgl} onChange={set("tgl")} /></Field>
              <Field label="Status" hint="Draf tidak tampil di website."><Select value={form.status} onChange={set("status")}><option value="terbit">Terbit</option><option value="draf">Draf</option></Select></Field>
            </div>
            <ImagePicker label="Gambar utama" value={form.gambar && form.gambar !== "/logo.png" ? form.gambar : ""} onChange={set("gambar")} />
            <Field label="Ringkasan" hint="Tampil di kartu berita. Kosongkan untuk diambil dari paragraf pertama.">
              <Textarea rows={2} value={form.ringkasan} onChange={set("ringkasan")} />
            </Field>
            <Field label="Isi berita" error={err.isiText} hint="Pisahkan paragraf dengan satu baris kosong.">
              <Textarea rows={10} value={form.isiText} onChange={set("isiText")} className="leading-relaxed" />
            </Field>
          </div>
        )}
      </Modal>
    </>
  );
}
