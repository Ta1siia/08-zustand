import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "NoteHub — your personal note manager",
  description:
    "NoteHub is a simple and efficient application for managing personal notes: create, filter by tag and search through your notes in one place.",
  openGraph: {
    title: "NoteHub — your personal note manager",
    description:
      "NoteHub is a simple and efficient application for managing personal notes.",
    url: "https://08-zustand-three-ashen.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub application preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
