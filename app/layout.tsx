import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maria Festa na Mesa | Itens de decoração em Osasco",
  description: "Pacotes de itens para decoração de festas com retirada e devolução em Osasco, SP.",
  keywords: ["decoração de aniversário", "festa na mesa", "decoração personalizada", "festa em casa", "decoração com balões"],
  openGraph: {
    title: "Maria Festa na Mesa | Sua festa linda, prática e do seu jeito",
    description: "Escolha seus itens de decoração e retire em Osasco para celebrar do seu jeito.",
    type: "website",
    locale: "pt_BR",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/logo-maria.png",
    shortcut: "/logo-maria.png",
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
          name: "Maria Festa na Mesa",
          description: "Pacotes de itens para decoração de festas com retirada e devolução em Osasco.",
          areaServed: "Osasco, SP",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Apóstolo João Batista, 16, Jardim Conceição",
            addressLocality: "Osasco",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          telephone: "+55 11 98366-0749",
          sameAs: ["https://instagram.com/festanamesa"],
        }) }} />
      </body>
    </html>
  );
}
