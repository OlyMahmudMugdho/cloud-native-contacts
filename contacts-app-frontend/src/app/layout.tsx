import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationMenu } from "@/components/navigation-menu";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contacts App",
  description: "A simple contacts management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavigationMenu />
          <main className="container mx-auto py-6 px-4">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
