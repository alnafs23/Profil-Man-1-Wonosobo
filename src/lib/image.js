import { supabase } from "@/lib/supabase";
import { uid } from "@/lib/store";

/**
 * Mengecilkan gambar di browser lalu mengunggahnya ke Supabase Storage
 * bucket "gambar". Mengembalikan URL publik.
 */
export function fileToStorageUrl(file, { max = 1200, kualitas = 0.78 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/"))
      return reject(new Error("Berkas harus berupa gambar (JPG, PNG, atau WebP)."));

    if (!supabase)
      return reject(new Error("Koneksi ke server belum tersedia."));

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const skala = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * skala);
      c.height = Math.round(img.height * skala);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);

      c.toBlob(
        async (blob) => {
          if (!blob) return reject(new Error("Gambar tidak dapat diproses."));
          try {
            const nama = `${uid("img")}.jpg`;
            const { error: upErr } = await supabase.storage
              .from("gambar")
              .upload(nama, blob, { contentType: "image/jpeg", upsert: true });
            if (upErr) throw upErr;
            const { data } = supabase.storage.from("gambar").getPublicUrl(nama);
            resolve(data.publicUrl);
          } catch (e) {
            reject(new Error(e?.message || "Gagal mengunggah gambar ke server."));
          }
        },
        "image/jpeg",
        kualitas,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gambar tidak dapat dibaca."));
    };

    img.src = url;
  });
}
