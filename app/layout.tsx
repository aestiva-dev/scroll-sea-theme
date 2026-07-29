import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Untuk Belinda Cahyani — 27 Juli",
  description:
    "Sebuah ucapan ulang tahun kecil yang dibuat khusus untuk Belinda Cahyani.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
