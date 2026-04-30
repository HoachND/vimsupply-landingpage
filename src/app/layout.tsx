import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VimSupply — Chuỗi Cung Ứng Vật Tư Công Nghiệp B2B | VIMGROUP",
  description: "VimSupply by VIMGROUP — Cung ứng bao bì carton, nylon PE, bulong ốc vít, pallet gỗ, ván ép Plywood, chỉ may, dây đai nhựa, băng dính. Giải pháp B2B toàn quốc. Hotline 0974.516.670",
  icons: { icon: "/images/logo-vimsupply.png" },
  metadataBase: new URL("https://b2b.vimgroup.vn"),
  openGraph: {
    title: "VimSupply — Chuỗi Cung Ứng B2B | VIMGROUP",
    description: "Giải pháp vật tư công nghiệp toàn diện cho nhà máy & xưởng sản xuất",
    type: "website",
    url: "https://b2b.vimgroup.vn",
    images: [
      {
        url: "/images/og-vimsupply.png",
        width: 1200,
        height: 630,
        alt: "VimSupply B2B Industrial Supply",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VimSupply — Chuỗi Cung Ứng B2B | VIMGROUP",
    description: "Giải pháp vật tư công nghiệp toàn diện cho nhà máy & xưởng sản xuất",
    images: ["/images/og-vimsupply.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050a14] text-white antialiased">{children}</body>
    </html>
  );
}
