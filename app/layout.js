import { Jersey_20, Manrope } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { getSite } from "@/lib/getSite";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jersey = Jersey_20({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
  display: "swap",
});

export async function generateMetadata() {
  const { profile } = await getSite();
  return {
    metadataBase: new URL("https://marslansabir.com"),
    title: {
      default: `${profile.name} — ${profile.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.intro,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title: `${profile.name} — ${profile.role}`,
      description: profile.intro,
      images: [profile.portrait || "/arslan.png"],
    },
  };
}

export default async function RootLayout({ children }) {
  const site = await getSite();
  return (
    <html lang="en" className={`${manrope.variable} ${jersey.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" />
      </head>
      <body className="min-h-svh bg-ink text-white antialiased">
        <SiteChrome site={site}>{children}</SiteChrome>
      </body>
    </html>
  );
}
