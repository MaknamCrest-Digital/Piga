import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500", "600", "700", "800"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Pineapple Growers Association | PiGA", template: "%s | PiGA" },
  description: "PiGA brings Ghana’s pineapple growers together for a fair price, timely payment, training and access to buyers. Membership is free.",
};

export const viewport: Viewport = { themeColor: "#f7fcf9" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings();
  return (
    <html lang="en-GH" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-forest-900 focus:px-4 focus:py-2 focus:text-mint-50">
          Skip to content
        </a>
        <Header logos={s.logos} join={s.ctas.join} banner={s.launchBanner} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
