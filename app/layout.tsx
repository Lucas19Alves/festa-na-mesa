import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Festa na Mesa | Decoração de festas em São Paulo",
  description: "Decorações compactas e personalizadas para aniversários, chás e pequenas comemorações.",
  keywords: ["decoração de aniversário", "festa na mesa", "decoração personalizada", "festa em casa", "decoração com balões"],
  openGraph: {
    title: "Festa na Mesa | Sua festa linda, prática e do seu jeito",
    description: "Decorações completas e personalizadas para transformar pequenos espaços em momentos inesquecíveis.",
    type: "website",
    locale: "pt_BR",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Festa na Mesa",
          description: "Decoração compacta e personalizada para festas em São Paulo e região.",
          areaServed: "São Paulo e região",
          telephone: "+55 11 99999-9999",
          sameAs: ["https://instagram.com/festanamesa"],
        }) }} />
      </body>
    </html>
  );
}
