"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge, Btn, Card, Empty, Field, IconBtn, Input, Modal, PageHead, Pager, SearchInput, Select, td, th, useUI } from "@/components/admin/ui";
import { GOLONGAN, fmt, removeItem, uid, useCollection, write } from "@/lib/store";

const PER = 10;
const rank = (g) => { const i = GOLONGAN.indexOf(g); return i < 0 ? 99 : i; };

export default function GuruAdmin() {
  const { toast, confirm } = useUI();
  const list = useCollection("guru");
  const [q, setQ] = useState("");
  const [gol, setGol] = useState("semua");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null);
  const [err, setErr] = useState({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("q");
    if (p) setQ(p);
  }, []);

  const hasil = useMemo(() => {
    const s = q.trim().toLowerCase();
    return list.map((g, i) => ({ ...g, no: i + 1 })).filter((g) => (gol === "semua" || g.gol.startsWith(gol + "/")) && (!s || g.nama.toLowerCase().includes(s)));
  }, [list, q, gol]);
  const tampil = hasil.slice((page - 1) * PER, page * PER);

  const buka = (g) => { setErr({}); setForm(g ? { ...g } : { nama: "", gol: "III/a" }); };

  const simpan = () => {
    const e = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi.";
    setErr(e);
    if (Object.keys(e).length) return;
    const item = { id: form.id || uid("guru"), nama: form.nama.trim(), gol: form.gol };
    const ada = list.some((x) => x.id === item.id);
    const next = ada ? list.map((x) => (x.id === item.id ? item : x)) : [...list, item];
    next.sort((a, b) => rank(a.gol) - rank(b.gol)); // urut stabil berdasarkan golongan
    const r = write("guru", next);
    if (!r.ok) return toast(r.error, "error");
    toast(ada ? "Data diperbarui." : "Data ditambahkan.");
    setForm(null);
  };

  const hapus = async (g) => {
    if (!(await confirm({ title: "Hapus data?", message: `${g.nama} akan dihapus dari daftar guru & tenaga kependidikan.`, confirmLabel: "Hapus", tone: "danger" }))) return;
    const r = removeItem("guru", g.id);
    r.ok ? toast("Data dihapus.") : toast(r.error, "error");
  };

  return (
    <>
      <PageHead title="Guru & Tenaga Kependidikan" crumb="Guru & Tendik" actions={<Btn variant="primary" icon="plus" onClick={() => buka(null)}>Tambah data</Btn>} />
      <Card bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-3 p-4">
          <SearchInput value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Cari nama…" className="w-full sm:w-72" />
          <Select value={gol} onChange={(e) => { setGol(e.target.value); setPage(1); }} className="w-auto" aria-label="Filter golongan">
            <option value="semua">Semua golongan</option>
            {["IV", "III", "II", "I"].map((g) => <option key={g} value={g}>Golongan {g}</option>)}
          </Select>
          <span className="ml-auto text-xs text-ad-muted">{fmt(hasil.length)} dari {fmt(list.length)} orang</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead className="border-y border-ad-line bg-ad-hover/50"><tr><th className={`${th} w-16`}>No</th><th className={th}>Nama</th><th className={th}>Golongan</th><th className={`${th} text-right`}>Aksi</th></tr></thead>
            <tbody className="divide-y divide-ad-line">
              {tampil.map((g) => (
                <tr key={g.id} className="hover:bg-ad-hover/50">
                  <td className={`${td} text-ad-muted`}>{g.no}</td>
                  <td className={`${td} font-medium`}>{g.nama}</td>
                  <td className={td}><Badge tone="info">{g.gol}</Badge></td>
                  <td className={`${td} text-right`}><IconBtn icon="pencil" label={`Ubah ${g.nama}`} onClick={() => buka(g)} /><IconBtn icon="trash" label={`Hapus ${g.nama}`} tone="danger" onClick={() => hapus(g)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {tampil.length === 0 && <Empty icon="users" title="Data tidak ditemukan" text="Coba kata kunci atau golongan lain." />}
        </div>
        <Pager page={page} perPage={PER} total={hasil.length} onPage={setPage} />
      </Card>

      <Modal open={!!form} onClose={() => setForm(null)} size="sm" title={form?.id ? "Ubah data" : "Tambah data"}
        footer={<><Btn onClick={() => setForm(null)}>Batal</Btn><Btn variant="primary" onClick={simpan}>Simpan</Btn></>}>
        {form && (
          <div className="space-y-4">
            <Field label="Nama lengkap dan gelar" error={err.nama}><Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></Field>
            <Field label="Golongan" hint="Daftar otomatis diurutkan menurut golongan."><Select value={form.gol} onChange={(e) => setForm({ ...form, gol: e.target.value })}>{GOLONGAN.map((g) => <option key={g}>{g}</option>)}</Select></Field>
          </div>
        )}
      </Modal>
    </>
  );
}
