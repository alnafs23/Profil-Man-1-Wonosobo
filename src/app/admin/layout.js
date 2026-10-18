import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Panel Admin | MAN 1 Wonosobo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
