import localFont from "next/font/local";
import { Jersey_20 } from "next/font/google";
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

const jersey = Jersey_20({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
  display: "swap",
  preload: true,
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
    <html lang="en" className={`${switzer.variable} ${jersey.variable}`}>
      <body className="min-h-svh bg-ink text-white antialiased">
        <SiteChrome
          skip={site.copy.skipToContent}
          showNav={site.hidden?.["chrome-nav"] !== true}
          showFooter={site.hidden?.["chrome-footer"] !== true}
          nav={site.nav}
          cta={site.copy.navCta}
          name={site.profile.name}
          profile={{
            email: site.profile.email,
            name: site.profile.name,
            location: site.profile.location,
            role: site.profile.role,
            socials: site.profile.socials,
          }}
          footerNav={site.footerNav}
          resourceNav={site.resourceNav}
          copy={{
            newsletterTitle: site.copy.newsletterTitle,
            footerEmail: site.copy.footerEmail,
            footerPlaceholder: site.copy.footerPlaceholder,
            footerSend: site.copy.footerSend,
            footerMailSubject: site.copy.footerMailSubject,
            footerMailBody: site.copy.footerMailBody,
            footerNote: site.copy.footerNote,
            footerNoteDone: site.copy.footerNoteDone,
            footerPages: site.copy.footerPages,
            footerResources: site.copy.footerResources,
            footerFollow: site.copy.footerFollow,
            footerRights: site.copy.footerRights,
          }}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
