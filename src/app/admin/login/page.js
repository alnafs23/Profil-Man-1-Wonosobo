"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/admin/Icon";
import { login, useSekolah } from "@/lib/store";

const inputCls =
  "w-full rounded-lg border border-emerald-600/50 bg-emerald-950/55 px-3.5 py-2.5 text-sm text-white placeholder:text-emerald-200/45 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30";

export default function LoginPage() {
  const router = useRouter();
  const sekolah = useSekolah();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [lihat, setLihat] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const kirim = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await login(u, p);
    setLoading(false);
    if (!r.ok) return setErr(r.error);
    router.replace("/admin");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-emerald-950 px-4 py-8 text-emerald-50">
      <img
        src="/sekolah.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/80 to-emerald-700/70" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-amber-300/15 blur-3xl" />

      <main className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/40 md:grid-cols-[1.1fr_1fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-8 md:flex">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M-20 330 C 80 260, 160 380, 260 330 S 420 240, 430 300 L 430 520 L -20 520 Z"
              fill="#a7f3d0"
              opacity=".55"
            />
            <path
              d="M-20 400 C 90 350, 170 450, 280 400 S 410 350, 430 390 L 430 520 L -20 520 Z"
              fill="#6ee7b7"
              opacity=".45"
            />
            <circle cx="340" cy="70" r="46" fill="#fde68a" opacity=".55" />
            <circle cx="40" cy="250" r="22" fill="#a7f3d0" opacity=".7" />
          </svg>

          <div className="relative flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo MAN 1 Wonosobo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-wide text-emerald-900">
                MAN 1 WONOSOBO
              </p>
              <p className="text-[11px] text-emerald-800/70">
                Kementerian Agama Republik Indonesia
              </p>
            </div>
          </div>

          <div className="relative mx-auto my-6 w-full max-w-[17rem]">
            <div className="absolute -inset-3 rounded-[58%_42%_52%_48%/48%_56%_44%_52%] bg-emerald-300/40" />
            <img
              src="/sekolah.png"
              alt="Gedung MAN 1 Wonosobo"
              className="relative aspect-square w-full rounded-[58%_42%_52%_48%/48%_56%_44%_52%] border-4 border-white object-cover shadow-xl shadow-emerald-900/20"
            />
          </div>

          <div className="relative">
            <p className="text-lg font-bold leading-snug text-emerald-900">
              Panel Admin Website Madrasah
            </p>
            <p className="mt-1 text-xs text-emerald-800/75">{sekolah.slogan}</p>
            <span className="mt-3 block h-1 w-12 rounded-full bg-amber-400" />
          </div>
        </section>

        {/* panel kanan: formulir (kaca hijau) */}
        <section className="bg-emerald-900/75 p-7 backdrop-blur-xl sm:p-10">
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <img
              src="/logo.png"
              alt="Logo MAN 1 Wonosobo"
              className="h-11 w-11 rounded-full object-cover"
            />
            <p className="text-sm font-extrabold leading-tight tracking-wide text-white">
              MAN 1 WONOSOBO
              <span className="block text-[11px] font-normal tracking-normal text-emerald-100/70">
                Panel Admin
              </span>
            </p>
          </div>

          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="mt-1 text-sm text-emerald-100/75">
            Masuk untuk mengelola konten website madrasah.
          </p>
          <span className="mt-3 block h-1 w-10 rounded-full bg-amber-300" />

          <form onSubmit={kirim} noValidate className="mt-7 space-y-4">
            {err && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-300/50 bg-red-500/15 px-3 py-2 text-xs text-red-100"
              >
                <Icon name="alert" size={14} className="mt-px" />
                {err}
              </p>
            )}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-emerald-50">
                Username
              </span>
              <input
                className={inputCls}
                value={u}
                onChange={(e) => {
                  setU(e.target.value);
                  setErr("");
                }}
                placeholder="Masukkan username"
                autoComplete="username"
                autoFocus
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-emerald-50">
                Password
              </span>
              <div className="relative">
                <input
                  className={`${inputCls} pr-11`}
                  type={lihat ? "text" : "password"}
                  value={p}
                  onChange={(e) => {
                    setP(e.target.value);
                    setErr("");
                  }}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setLihat((v) => !v)}
                  aria-label={
                    lihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                  }
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-emerald-100/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                >
                  <Icon name={lihat ? "eyeOff" : "eye"} size={16} />
                </button>
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-400 py-2.5 text-sm font-bold text-emerald-950 shadow-lg shadow-black/20 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:opacity-60"
            >
              {loading ? "Memproses…" : "Masuk"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-emerald-100/75">
            <a
              href="/"
              className="underline underline-offset-2 hover:text-white"
            >
              ← Kembali ke website
            </a>
          </p>
          <p className="mt-6 text-center text-[11px] text-emerald-100/50">
            {sekolah.namaLengkap} © {sekolah.tahun}
          </p>
        </section>
      </main>
    </div>
  );
}
