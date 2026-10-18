"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackView } from "@/lib/store";

/** Navbar + Footer untuk website publik. Halaman /admin memakai tampilan sendiri. */
export default function SiteChrome({ children }) {
  const path = usePathname() || "/";
  const admin = path.startsWith("/admin");

  useEffect(() => {
    trackView(path.length > 1 ? path.replace(/\/$/, "") : path);
  }, [path]);

  if (admin) return children;
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
