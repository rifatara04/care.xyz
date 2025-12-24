import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/components/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://carexyz.vercel.app"),
  title: {
    default: "Care.xyz – Trusted Baby, Elderly & Sick Care Services",
    template: "%s | Care.xyz",
  },
  description:
    "Care.xyz provides reliable and compassionate Baby Care, Elderly Service, and Sick People Support. Professional caregivers available for home service with trust, safety, and comfort.",

  keywords: [
    "care services",
    "baby care",
    "elderly care",
    "home nursing",
    "sick care",
    "caregiver service",
    "home caregiver",
    "care.xyz",
  ],

  authors: [{ name: "Care.xyz Team" }],
  creator: "Care.xyz",
  publisher: "Care.xyz",

  alternates: {
    canonical: "https://carexyz.vercel.app",
  },

  openGraph: {
    title: "Care.xyz – Trusted Care Services for Babies, Elderly & Sick People",
    description:
      "Compassionate home care services including Baby Care, Elderly Support, and Sick People Assistance. Trusted caregivers for every home.",
    url: "https://carexyz.vercel.app",
    siteName: "Care.xyz",
    images: [
      {
        url: "https://images2.imgbox.com/66/f6/ydF1y6Hu_o.jpg",
        width: 1200,
        height: 630,
        alt: "Care.xyz – Home Care Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.xyz – Trusted Care Services",
    description:
      "Professional caregivers providing Baby Care, Elderly Care, and Sick People Support.",
    images: [
      {
        url: "https://images2.imgbox.com/66/f6/ydF1y6Hu_o.jpg",
        alt: "Care.xyz – Home Care Service",
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Health & Personal Care",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body
          className={`${notoSans.variable} antialiased min-h-dvh flex flex-col justify-between`}
        >
          <HeaderComponent />
          <main className="flex-1 pt-20">{children}</main>
          <FooterComponent />
          <Toaster />
        </body>
      </NextAuthProvider>
    </html>
  );
}
