import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Theesma Sports | Built for Performance. Proven in Competition.",
    template: "%s | Theesma Sports"
  },
  description: "Theesma Sports is an elite athletic arsenal. Engineering professional-grade gear for Cricket, Football, Badminton, and high-intensity Training.",
  keywords: ["Sports Gear", "Theesma Sports", "Elite Performance", "Cricket Gear", "Athletic Apparel", "Tournament Equipment"],
  authors: [{ name: "Theesma Engineering Team" }],
  openGraph: {
    title: "Theesma Sports | Built for Power. Driven by Grit.",
    description: "Experience the next evolution of sports technology. Engineered by athletes, for those who refuse to settle.",
    url: "https://theesmasports.com",
    siteName: "Theesma Sports",
    images: [
      {
        url: "https://theesmasports.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theesma Sports | Built for Power",
    description: "Engineered by athletes, for those who refuse to settle.",
    images: ["https://theesmasports.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-brand-black`}>
      <body className="min-h-screen flex flex-col font-inter text-white selection:bg-brand-blue/30 antialiased">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            <PageWrapper>
              {children}
            </PageWrapper>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}


