"use client";

import Link from "next/link";
import { useState } from "react";
import { menu } from "@/data/menu";
import { sekolah } from "@/data/sekolah";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-amber-400">
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-24">
        <Link
          href="/"
          className="flex items-center gap-4"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Logo MAN 1 WONOSOBO"
            className="h-16 w-16 md:h-[72px] md:w-[72px] object-contain"
          />
          <div className="leading-tight">
            <p className="font-extrabold text-emerald-800 text-xl md:text-3xl">
              MAN 1 WONOSOBO
            </p>
            <p className="text-xs md:text-base text-gray-500 hidden sm:block">
              Kementerian Agama Republik Indonesia
            </p>
          </div>
        </Link>

        <ul className="hidden xl:flex items-center gap-1">
          {menu.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className="px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1"
              >
                {item.label}
                {item.children && <span className="ml-1.5 mb-1 inline-block h-1.5 w-1.5 border-b-2 border-r-2 border-current rotate-45" />}
              </Link>
              {item.children && (
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg min-w-72 py-2">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="block px-5 py-2.5 text-base text-gray-700 hover:bg-emerald-600 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button
          className="xl:hidden px-4 py-2 text-base font-semibold rounded-lg border border-gray-300 text-emerald-800"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="xl:hidden bg-white border-t border-gray-200 px-4 py-3 max-h-[75vh] overflow-y-auto">
          {menu.map((item) => (
            <li key={item.label} className="border-b border-gray-100">
              {item.children ? (
                <>
                  <button
                    className="w-full flex justify-between py-4 text-lg font-semibold text-gray-700"
                    onClick={() =>
                      setSub(sub === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <span className={`inline-block h-2 w-2 border-b-2 border-r-2 border-current transition-transform ${sub === item.label ? "-rotate-[135deg] translate-y-1" : "rotate-45"}`} />
                  </button>
                  {sub === item.label && (
                    <ul className="pb-2 pl-4">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-base text-gray-600 hover:text-emerald-700"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg font-semibold text-gray-700"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
