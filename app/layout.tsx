import type { Metadata } from "next";
import content from "./content.json";
import "./globals.css";

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={content.metadata.language}>
      <body>
        {children}
      </body>
    </html>
  );
}
