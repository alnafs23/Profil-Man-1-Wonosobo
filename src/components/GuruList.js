"use client";

import { useState } from "react";

const AWAL = 10;

export default function GuruList({ data }) {
  const [q, setQ] = useState("");
  const [semua, setSemua] = useState(false);

  const cari = q.trim().toLowerCase();
  const hasil = data
    .map((g, i) => ({ ...g, no: i + 1 }))
    .filter((g) => g.nama.toLowerCase().includes(cari));
  const tampil = semua || cari ? hasil : hasil.slice(0, AWAL);
  const bisaToggle = !cari && hasil.length > AWAL;

  return (
    <>
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama guru / tenaga kependidikan..."
          className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <p className="text-sm text-gray-600">Menampilkan {tampil.length} dari {data.length}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="px-5 py-3 w-20">No</th>
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3 w-40">Golongan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tampil.map((g) => (
              <tr key={g.nama} className="even:bg-emerald-50/50 hover:bg-emerald-100/60 transition">
                <td className="px-5 py-3 text-gray-500">{g.no}</td>
                <td className="px-5 py-3 font-semibold text-emerald-900">{g.nama}</td>
                <td className="px-5 py-3 text-gray-700">{g.gol}</td>
              </tr>
            ))}
            {tampil.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-10 text-center text-gray-500">Nama tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {bisaToggle && (
        <div className="text-center mt-6">
          <button
            onClick={() => setSemua(!semua)}
            className="bg-emerald-600 text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-emerald-700"
          >
            {semua ? "Tampilkan Lebih Sedikit" : `Tampilkan Semua (${hasil.length})`}
          </button>
        </div>
      )}
    </>
  );
}
