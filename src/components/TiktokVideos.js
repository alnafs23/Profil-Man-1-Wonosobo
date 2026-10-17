"use client";

import { useState } from "react";
import { sekolah } from "@/data/sekolah";

function ambilId(url) {
  const m = String(url).match(/video\/(\d+)/);
  return m ? m[1] : null;
}

function normalisasi(daftar) {
  return daftar
    .map((v, i) => {
      const url = typeof v === "string" ? v : v.url;
      const judul = typeof v === "string" || !v.judul ? `Video ${i + 1}` : v.judul;
      return { url, judul: judul.trim(), id: ambilId(url) };
    })
    .filter((v) => v.id);
}

export default function TiktokVideos({ videos = [] }) {
  const list = normalisasi(videos);
  const [idx, setIdx] = useState(0);
  const [main, setMain] = useState(false);
  const v = list[idx];

  function pilih(n) {
    setIdx(n);
    setMain(true);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-800">Video TikTok</h2>
        <div className="w-16 h-1 bg-amber-400 mx-auto mt-3 rounded" />
        <p className="text-gray-600 mt-3">Kegiatan terbaru {sekolah.nama}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden grid lg:grid-cols-[380px_1fr]">
        <div className="bg-gray-50 p-6 flex justify-center lg:border-r border-gray-200">
          <div className="w-[325px] max-w-full h-[700px] rounded-xl overflow-hidden border border-gray-200 bg-white">
            {v && main ? (
              <iframe
                key={v.id}
                src={`https://www.tiktok.com/embed/v2/${v.id}`}
                title={v.judul}
                allow="fullscreen; encrypted-media"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : v ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-emerald-50 px-8">
                <p className="text-xs font-semibold tracking-widest text-emerald-700 mb-3">VIDEO TIKTOK</p>
                <h3 className="text-xl font-bold text-emerald-900 leading-snug mb-6">{v.judul}</h3>
                <button
                  onClick={() => setMain(true)}
                  className="bg-emerald-600 text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-emerald-700"
                >
                  Putar Video
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-8">
                <p className="font-bold text-emerald-900 mb-1">Video belum ditambahkan</p>
                <p className="text-sm text-gray-500">Tempel link video TikTok di src/data/video.js</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col min-h-0 lg:h-[748px]">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="font-bold text-emerald-900">Daftar Video</h3>
            <span className="text-sm text-gray-500">{list.length} video</span>
          </div>

          <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 border-y border-gray-100 max-h-[420px] lg:max-h-none">
            {list.map((x, n) => {
              const aktif = n === idx;
              return (
                <li key={x.id}>
                  <button
                    onClick={() => pilih(n)}
                    className={`w-full text-left flex items-center gap-4 px-3 py-4 border-l-4 transition ${
                      aktif ? "border-emerald-600 bg-emerald-50" : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <span className={`w-7 text-sm font-semibold ${aktif ? "text-emerald-700" : "text-gray-400"}`}>
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 leading-snug ${aktif ? "font-semibold text-emerald-900" : "font-medium text-gray-800"}`}>
                      {x.judul}
                    </span>
                    {aktif && main && <span className="text-xs font-semibold text-emerald-700">Diputar</span>}
                  </button>
                </li>
              );
            })}
            {list.length === 0 && <li className="py-6 text-sm text-gray-500 text-center">Belum ada video.</li>}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            {v && (
              <a href={v.url.split("?")[0]} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-emerald-700">
                Buka di TikTok
              </a>
            )}
            <a href={sekolah.tiktok} target="_blank" rel="noreferrer" className="border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-2 rounded-lg hover:border-emerald-600 hover:text-emerald-700">
              Lihat Akun TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
