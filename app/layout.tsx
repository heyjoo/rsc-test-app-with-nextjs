import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RSC Learning Lab",
  description: "React Server Components 동작 원리 학습",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/1-server", label: "1. Server Component" },
  { href: "/2-client", label: "2. Client Component" },
  { href: "/3-streaming", label: "3. Streaming" },
  { href: "/4-composition", label: "4. Composition" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistMono.variable} font-mono antialiased bg-gray-950 text-gray-100 min-h-screen`}
      >
        <nav className="border-b border-gray-800 bg-gray-900 px-6 py-3">
          <div className="max-w-4xl mx-auto flex gap-6 items-center flex-wrap">
            <span className="text-gray-400 text-sm font-bold tracking-wider">
              RSC LAB
            </span>
            <div className="flex gap-4 flex-wrap">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
