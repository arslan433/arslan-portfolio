import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';
import ChatBot from "@/components/chat/ChatBot.jsx";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arslan Muhammad | Full Stack Developer Portfolio",
  description:
    "Hi, I'm Arslan. I build smart web applications using Laravel, Next.js, React.js, and MySQL. Explore my real-world projects, from robust e-commerce backends to custom local AI chat models.",
  keywords: [
    "hire Next.js developer",
    "hire web developer",
    "hire laravel developer",
    "hire generative AI developer",
    "hire full stack developer",
    "freelance generative AI developer",
    "Laravel backend developer",
    "Next.js web apps",
    "custom AI chatbot developer",
    "Python and LangChain integration",
    "local LLM and RAG apps",
    "e-commerce dashboard developer",
    "AI-powered web applications",
    "custom AI chatbots",
    "smart data dashboards",
    "full stack web development",
    "Next.js and React.js projects",
    "Laravel and MySQL solutions",
    "AI integration for web apps",
    "portfolio of a full stack developer",
    "real-world web development projects",
    "AI-driven web solutions",
    "innovative web applications",
    "cutting-edge AI web development",
    "custom web application development",
    "smart web solutions with AI",
    "full stack developer portfolio",
    "web development with Arslan Muhammad",
    "hire Arslan Muhammad for web projects",
    "freelance full stack developer services",
    "Custom Web Applications Creator",
    ""
  ],
  verification: {
    google: "-L-Lb66Y16FhRw5TQiXoH7qj3wRN-r5qYyBe2UsMxII",
  },
  openGraph: {
    type: "website",
    url: "https://arslan-dev.vercel.app",
    title: "Arslan Muhammad | Full Stack Developer",
    description:
      "Looking for a developer who bridges traditional web development with cutting-edge AI? Explore my portfolio featuring e-commerce platforms, custom AI chatbots, and smart data dashboards.",
    images: [
      {
        url: "https://arslan-dev.vercel.app/assets/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Arslan Muhammad - Web and AI Projects Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arslan Muhammad | Full Stack Developer",
    description:
      "I build smart web applications using Laravel, Next.js, React.js, and MySQL. Explore my real-world projects, from robust e-commerce backends to custom local AI chat models.",
    images: ["https://arslan-dev.vercel.app/assets/og-image.webp"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var originalFetch = window.fetch;
                  if (originalFetch) {
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return originalFetch; },
                      set: function(val) { 
                        console.warn('Ignored fetch override:', val); 
                        originalFetch = val;
                      },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {
                  console.warn('Could not patch fetch:', e);
                }
              })();
            `
          }}
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FFV976J51W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FFV976J51W');
          `}
        </Script>

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ToastProvider>
            <div>
              {children}
            </div>
            <SpeedInsights />
          </ToastProvider>
        </ThemeProvider>
        <ChatBot />
      </body>
    </html>
  );
}
