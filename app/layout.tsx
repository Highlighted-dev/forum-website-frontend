import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StrefaGier Forum",
  description: "Forum for an old school gaming community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col bg-background">
          <NavBar session={session} />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
