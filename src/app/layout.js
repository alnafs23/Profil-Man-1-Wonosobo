import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "MAN 1 Wonosobo",
  description: "Website resmi profil Madrasah Aliyah Negeri 1 Wonosobo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-stone-50 text-gray-800 min-h-screen flex flex-col">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
