"use client";

import { useState } from "react";
import { Btn, Card, Empty, Field, IconBtn, ImagePicker, Input, Modal, PageHead, Textarea, useUI } from "@/components/admin/ui";
import { removeItem, uid, upsert, useCollection } from "@/lib/store";

export default function EkskulAdmin() {
  const { toast, confirm } = useUI();
  const list = useCollection("ekskul");
  const [form, setForm] = useState(null);
  const [err, setErr] = useState({});

  const buka = (e) => { setErr({}); setForm(e ? { ...e } : { nama: "", desk: "", gambar: "" }); };

  const simpan = async () => {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama kegiatan wajib diisi.";
    if (!form.desk.trim()) e.desk = "Deskripsi singkat wajib diisi.";
    setErr(e);
    if (Object.keys(e).length) return;
    const urutan = form.id
      ? (list.find((x) => x.id === form.id)?.urutan ?? list.length + 1)
      : list.length + 1;
    const r = await upsert("ekskul", { id: form.id || uid("ekskul"), nama: form.nama.trim(), desk: form.desk.trim(), gambar: form.gambar, urutan });
    if (!r.ok) return toast(r.error, "error");
    toast(form.id ? "Ekstrakurikuler diperbarui." : "Ekstrakurikuler ditambahkan.");
    setForm(null);
  };

  const hapus = async (e) => {
    if (!(await confirm({ title: "Hapus ekstrakurikuler?", message: `"${e.nama}" akan dihapus dari website.`, confirmLabel: "Hapus", tone: "danger" }))) return;
    const r = await removeItem("ekskul", e.id);
    r.ok ? toast("Ekstrakurikuler dihapus.") : toast(r.error, "error");
  };

  return (
    <>
      <PageHead title="Ekstrakurikuler" crumb="Ekstrakurikuler" actions={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah kegiatan</Btn>} />
      {list.length === 0 ? (
        <Card><Empty icon="activity" title="Belum ada ekstrakurikuler" action={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah kegiatan</Btn>} /></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <article key={e.id} className="flex overflow-hidden rounded-md border border-ad-line bg-ad-card">
              <div className="flex w-28 shrink-0 items-center justify-center bg-ad-hover">
                {e.gambar ? <img src={e.gambar} alt="" className="h-full w-full object-cover" /> : <span className="text-3xl font-bold text-ad-muted">{e.nama[0]}</span>}
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-3">
                <h2 className="font-semibold">{e.nama}</h2>
                <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-ad-muted">{e.desk}</p>
                <div className="mt-2 flex justify-end"><IconBtn icon="pencil" label={`Ubah ${e.nama}`} onClick={() => buka(e)} /><IconBtn icon="trash" label={`Hapus ${e.nama}`} tone="danger" onClick={() => hapus(e)} /></div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? "Ubah ekstrakurikuler" : "Tambah ekstrakurikuler"}
        footer={<><Btn onClick={() => setForm(null)}>Batal</Btn><Btn variant="primary" onClick={simpan}>Simpan</Btn></>}>
        {form && (
          <div className="space-y-4">
            <Field label="Nama kegiatan" error={err.nama}><Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></Field>
            <Field label="Deskripsi singkat" error={err.desk}><Textarea rows={3} value={form.desk} onChange={(e) => setForm({ ...form, desk: e.target.value })} /></Field>
            <ImagePicker label="Foto (opsional)" value={form.gambar} onChange={(v) => setForm({ ...form, gambar: v })} hint="Tanpa foto, website menampilkan huruf pertama nama kegiatan." />
          </div>
        )}
      </Modal>
    </>
  );
}
