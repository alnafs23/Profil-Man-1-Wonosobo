import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

/** Klien Supabase. Null jika env belum dikonfigurasi (mencegah crash saat build). */
export const supabase = url && key ? createClient(url, key) : null;
