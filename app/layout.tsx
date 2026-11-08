
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bíblia Quest — Sua jornada de conhecimento bíblico",
  description: "Conheça a Palavra, desafie sua mente e fortaleça sua jornada de fé.",
  applicationName: "Bíblia Quest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
