"use client";

import { useState } from "react";
import { Btn, Card, Empty, Field, IconBtn, ImagePicker, Input, Modal, PageHead, useUI } from "@/components/admin/ui";
import { removeItem, uid, upsert, useCollection } from "@/lib/store";

export default function GaleriAdmin() {
  const { toast, confirm } = useUI();
  const list = useCollection("galeri");
  const [form, setForm] = useState(null);
  const [err, setErr] = useState({});

  const buka = (g) => { setErr({}); setForm(g ? { ...g } : { judul: "", src: "" }); };

  const simpan = async () => {
    const e = {};
    if (!form.judul.trim()) e.judul = "Judul foto wajib diisi.";
    if (!form.src) e.src = "Pilih gambar terlebih dahulu.";
    setErr(e);
    if (Object.keys(e).length) return;
    const urutan = form.id
      ? (list.find((g) => g.id === form.id)?.urutan ?? list.length + 1)
      : list.length + 1;
    const r = await upsert("galeri", { id: form.id || uid("galeri"), judul: form.judul.trim(), src: form.src, urutan });
    if (!r.ok) return toast(r.error, "error");
    toast(form.id ? "Foto diperbarui." : "Foto ditambahkan.");
    setForm(null);
  };

  const hapus = async (g) => {
    if (!(await confirm({ title: "Hapus foto?", message: `Foto "${g.judul}" akan dihapus dari galeri.`, confirmLabel: "Hapus", tone: "danger" }))) return;
    const r = await removeItem("galeri", g.id);
    r.ok ? toast("Foto dihapus.") : toast(r.error, "error");
  };

  return (
    <>
      <PageHead title="Galeri" crumb="Galeri" actions={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah foto</Btn>} />
      {list.length === 0 ? (
        <Card><Empty icon="image" title="Galeri masih kosong" text="Unggah foto kegiatan atau fasilitas madrasah." action={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah foto</Btn>} /></Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((g) => (
            <figure key={g.id} className="group overflow-hidden rounded-md border border-ad-line bg-ad-card">
              <div className="aspect-[4/3] overflow-hidden bg-ad-hover"><img src={g.src} alt={g.judul} className="h-full w-full object-cover" /></div>
              <figcaption className="flex items-center justify-between gap-1 px-3 py-2">
                <span className="truncate text-[13px] font-medium">{g.judul}</span>
                <span className="flex shrink-0"><IconBtn icon="pencil" label={`Ubah ${g.judul}`} onClick={() => buka(g)} /><IconBtn icon="trash" label={`Hapus ${g.judul}`} tone="danger" onClick={() => hapus(g)} /></span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <Modal open={!!form} onClose={() => setForm(null)} title={form?.id ? "Ubah foto" : "Tambah foto"}
        footer={<><Btn onClick={() => setForm(null)}>Batal</Btn><Btn variant="primary" onClick={simpan}>Simpan foto</Btn></>}>
        {form && (
          <div className="space-y-4">
            <Field label="Judul foto" error={err.judul}><Input value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Contoh: Upacara Bendera" /></Field>
            <ImagePicker label="Foto" value={form.src} onChange={(v) => setForm({ ...form, src: v })} />
            {err.src && <p className="-mt-2 text-xs text-ad-danger">{err.src}</p>}
          </div>
        )}
      </Modal>
    </>
  );
}
