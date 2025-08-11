import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultBusinessConfig } from '@/config/business';
import Script from 'next/script';
import ClientAnalytics from '@/components/ClientAnalytics';

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://suaempresa.com.br';

export const metadata: Metadata = {
  title: {
    default: defaultBusinessConfig.name,
    template: `%s | ${defaultBusinessConfig.name}`
  },
  description: defaultBusinessConfig.description,
  keywords: "serviços profissionais, qualidade, atendimento personalizado, soluções empresariais",
  authors: [{ name: defaultBusinessConfig.name }],
  creator: defaultBusinessConfig.name,
  publisher: defaultBusinessConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    title: defaultBusinessConfig.name,
    description: defaultBusinessConfig.description,
    siteName: defaultBusinessConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultBusinessConfig.name,
    description: defaultBusinessConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
  {children}
  <ClientAnalytics />
      </body>
    </html>
  );
}
