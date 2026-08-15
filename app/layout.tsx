import type { Metadata } from "next";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "NoteHub — organize your notes",
  description:
    "NoteHub is a simple app for creating, searching and managing your personal notes.",
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
      <body>
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
