import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/ui/SkipToContent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI Music Studio - Create Professional Music with AI",
  description: "Generate professional-quality music in seconds using AI. Perfect for content creators, musicians, and businesses.",
  keywords: ["AI music", "music generation", "AI composer", "music creation", "SunoAPI"],
  authors: [{ name: "AI Music Studio" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "AI Music Studio - Create Professional Music with AI",
    description: "Generate professional-quality music in seconds using AI",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Music Studio",
  },
};

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipToContent />
        <ErrorBoundary>
          <SessionProvider>
            <QueryProvider>
              <main id="main-content">
                {children}
              </main>
            </QueryProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
