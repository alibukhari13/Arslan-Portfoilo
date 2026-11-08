import localFont from "next/font/local";
import { Inter, Jersey_20 } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import { getSite } from "@/lib/getSite";
import "./globals.css";

const switzer = localFont({
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jersey = Jersey_20({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
  display: "swap",
  preload: true,
});

const bebas = localFont({
  src: "../fonts/bebas-neue.woff2",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const display = localFont({
  src: "../fonts/inter-display-600.woff2",
  weight: "600",
  variable: "--font-display",
  display: "swap",
});

export const viewport = {
  themeColor: "#F9452D",
};

export async function generateMetadata() {
  const { profile } = await getSite();
  return {
    metadataBase: new URL("https://marslansabir.com"),
    title: {
      default: `${profile.name} — ${profile.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.intro,
    icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
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
    <html lang="en" className={`${inter.variable} ${switzer.variable} ${jersey.variable} ${bebas.variable} ${display.variable}`}>
      <body className="min-h-svh antialiased">
        <SiteChrome
          skip={site.copy.skipToContent}
          showNav={site.hidden?.["chrome-nav"] !== true}
          showFooter={site.hidden?.["chrome-footer"] !== true}
          wordmark={site.profile.wordmark || site.profile.name}
          name={site.profile.name}
          role={site.profile.role}
          phone={site.profile.phone}
          phoneHref={site.profile.phoneHref}
          email={site.profile.email}
          location={site.profile.location}
          socials={site.profile.socials}
          projectCount={site.projects.length}
          copy={site.copy}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
