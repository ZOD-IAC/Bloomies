import { SITE_URL } from "@/lib/site";
import { SiteStructuredData } from "@/components/site-structured-data";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { MessageCircle } from "lucide-react";
import { business } from "@/lib/business";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import Link from "next/link";
import "./globals.css";
const serif = localFont({
  src: "./fonts/serif.otf",
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "./fonts/sans.otf", weight: "400", style: "normal" },
    { path: "./fonts/sans-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Bloomies by Aadar",
  robots: { index: true, follow: true },
  title: {
    default: "Bloomies by Aadar — Little things, big feelings",
    template: "%s | Bloomies by Aadar",
  },
  description:
    "Explore handcrafted bouquets and personalized gifting concepts from Bloomies by Aadar. Inquire about your thoughtful gift personally.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('bloomies-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}`,
          }}
        />
      </head>
      <body className={`${serif.variable} ${sans.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteStructuredData />
        <MotionProvider>
          <CartProvider>
            <ScrollProgress />
            <Header />
            <main id="main">{children}</main>
            <footer>
              <div className="footer-top">
                <div>
                  <Link href="/" className="wordmark">
                    bloomies<span>BY AADAR</span>
                  </Link>
                  <p>
                    For the moments.
                    <br />
                    For the people. For the feels.
                  </p>
                </div>
                <div>
                  <p className="eyebrow">EXPLORE</p>
                  <Link href="/shop">All gifts</Link>
                  <Link href="/custom-bouquet">Custom bouquets</Link>
                  <Link href="/about">Our story</Link>
                </div>
                <div>
                  <p className="eyebrow">SAY HELLO</p>
                  <Link href="/contact">Contact us</Link>
                  <Link href="/#faq">Frequently asked questions</Link>
                  <a
                    href="https://www.instagram.com/bloomies_by_aadar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram ↗
                  </a>
                  <Link href="/cart">Your inquiry bag</Link>
                </div>
                <p className="footer-note">
                  A thoughtful gift starts
                  <br />
                  with a little thought.
                  <br />
                  <span>Let’s make it personal.</span>
                </p>
              </div>
              <div className="footer-bottom">
                <span>© {new Date().getFullYear()} Bloomies by Aadar</span>
                <span>
                  Preview catalog · images include references; prices are
                  samples
                </span>
                <span>Made with a little extra love ✳</span>
              </div>
            </footer>
            <a
              className="whatsapp-float"
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Bloomies on WhatsApp"
            >
              <MessageCircle size={22} />
              <span>A little help?</span>
            </a>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
