"use client";

import { useState } from "react";
import { Btn, Card, Field, Input, PageHead, useUI } from "@/components/admin/ui";
import Icon from "@/components/admin/Icon";
import {
  clearPengaduan, clearStats, exportAll, useCollection, write,
} from "@/lib/store";

const TABS = [["profil", "Profil madrasah", "school"], ["data", "Data & cadangan", "download"]];

export default function Pengaturan() {
  const [tab, setTab] = useState("profil");
  return (
    <>
      <PageHead title="Pengaturan" crumb="Pengaturan" />
      <div role="tablist" className="mb-4 flex gap-1 overflow-x-auto border-b border-ad-line">
        {TABS.map(([k, l, i]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3.5 py-2.5 text-[13px] font-medium ${tab === k ? "border-ad-primary text-ad-primary" : "border-transparent text-ad-muted hover:text-ad-fg"}`}>
            <Icon name={i} size={14} />{l}
          </button>
        ))}
      </div>
      {tab === "profil" && <Profil />}
      {tab === "data" && <Data />}
    </>
  );
}

const FIELD_PROFIL = [
  ["nama", "Nama singkat"], ["namaLengkap", "Nama lengkap"], ["slogan", "Slogan"], ["telepon", "Telepon"],
  ["email", "Email madrasah"], ["emailTu", "Email Tata Usaha"], ["instagram", "Tautan Instagram"], ["instagramHandle", "Nama akun Instagram"],
  ["facebook", "Tautan Facebook"], ["youtube", "Tautan YouTube"], ["tiktok", "Tautan TikTok"],
];

function Profil() {
  const { toast } = useUI();
  const data = useCollection("sekolah");
  const [f, setF] = useState(data);
  const simpan = async (e) => {
    e.preventDefault();
    const r = await write("sekolah", { ...data, ...f });
    r.ok ? toast("Profil madrasah disimpan. Footer dan halaman Kontak ikut berubah.") : toast(r.error, "error");
  };
  return (
    <Card title="Profil madrasah" sub="Dipakai di footer dan halaman Kontak website.">
      <form onSubmit={simpan} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {FIELD_PROFIL.map(([k, l]) => <Field key={k} label={l}><Input value={f[k] || ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></Field>)}
        </div>
        <Field label="Alamat"><Input value={f.alamat || ""} onChange={(e) => setF({ ...f, alamat: e.target.value })} /></Field>
        <div className="flex justify-end"><Btn variant="primary" type="submit">Simpan profil</Btn></div>
      </form>
    </Card>
  );
}

function Data() {
  const { toast, confirm } = useUI();
  const stats = useCollection("stats");

  const ekspor = async () => {
    const obj = await exportAll();
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cadangan-man1-wonosobo-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Cadangan diunduh.");
  };

  const aksi = async (judul, pesan, label, fn, ok) => {
    if (!(await confirm({ title: judul, message: pesan, confirmLabel: label, tone: "danger" }))) return;
    const r = await fn();
    r?.ok === false ? toast(r.error, "error") : toast(ok);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Cadangkan data" sub="Simpan data admin ke berkas JSON.">
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn icon="download" onClick={ekspor}>Unduh cadangan</Btn>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ad-muted">Data tersimpan di Supabase dan dapat diakses dari browser manapun.</p>
      </Card>

      <Card title="Statistik kunjungan" sub={Object.keys(stats.daily).length === 0 ? "Belum ada data kunjungan." : "Berisi kunjungan nyata."}>
        <div className="mt-4"><Btn icon="refresh" onClick={() => aksi("Kosongkan statistik?", "Seluruh angka kunjungan di dashboard akan dikosongkan dan dihitung ulang dari nol.", "Kosongkan", clearStats, "Statistik dikosongkan.")}>Kosongkan statistik</Btn></div>
      </Card>

      <Card title="Pengaduan masuk" sub="Hapus seluruh data pengaduan dari database." className="lg:col-span-2">
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn variant="danger" icon="trash" onClick={() => aksi("Hapus semua pengaduan?", "Seluruh pengaduan masuk akan dihapus permanen dari database.", "Hapus semua", clearPengaduan, "Pengaduan dihapus.")}>Hapus semua pengaduan</Btn>
        </div>
      </Card>
    </div>
  );
}
