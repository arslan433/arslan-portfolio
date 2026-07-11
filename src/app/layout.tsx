// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "@/app/globals.css";
// import { ToastProvider } from "@/components/ui/Toast";
// import Navbar from "@/components/Navbar";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Professional Full-Stack Developer Portfolio | Web Apps & Systems",
//   description: "Explore the engineering portfolio of a senior software developer building robust full-stack web applications, dynamic cloud platforms, and interactive user interfaces using Next.js, React, TypeScript, Firebase, and Supabase.",
//   keywords: [
//     "Full Stack Developer Portfolio",
//     "Software Engineer Portfolio",
//     "Hire Senior React Developer",
//     "Next.js Development Expert",
//     "Supabase Web Apps Developer",
//     "Firebase Full Stack Solutions",
//     "TypeScript Engineering Projects",
//     "Custom Web Applications Creator"
//   ],
//   authors: [{ name: "Professional Full-Stack Developer" }],
//   openGraph: {
//     title: "Professional Full-Stack Developer Portfolio | Innovative Web Solutions",
//     description: "Explore senior-level projects, live application demos, and interactive cloud systems engineered for performance and scalability.",
//     type: "website",
//     locale: "en_US",
//     siteName: "Developer Portfolio Hub",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Senior Full-Stack Developer Portfolio",
//     description: "Dynamic responsive web systems built with TypeScript, Next.js, and modern serverless backends.",
//   },
//   other: {
//     "robots": "index, follow",
//   }
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
//       <body className="font-sans bg-[#fbfbfb] text-gray-950 min-h-screen flex flex-col selection:bg-gray-200 selection:text-black" suppressHydrationWarning>
//         <ToastProvider>
//           <Navbar />
//           <main className="flex-grow pt-16">
//             {children}
//           </main>
        
//         </ToastProvider>
//       </body>
//     </html>
//   );
// }

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
  title: "Arslan Muhammad | Web & Generative AI Developer Portfolio",
  description:
    "Hi, I'm Arslan. I build smart, fast, and scalable web apps. By combining Laravel and Next.js with Generative AI, Python, and LangChain, I create next-level digital experiences. Check out my latest work!",
  keywords: [
    "hire web developer",
    "hire generative AI developer",
    "hire full stack developer",
    "freelance generative AI developer",
    "Laravel backend developer",
    "Next.js web apps",
    "custom AI chatbot developer",
    "Python and LangChain integration",
    "local LLM and RAG apps",
    "e-commerce dashboard developer"
  ],
  verification: {
    google: "-L-Lb66Y16FhRw5TQiXoH7qj3wRN-r5qYyBe2UsMxII",
  },
  openGraph: {
    type: "website",
    url: "https://arslan-dev.vercel.app",
    title: "Arslan Muhammad | Web & Generative AI Developer",
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
    title: "Arslan Muhammad | Web & Generative AI Developer",
    description:
      "I build smart web applications using Laravel, Next.js, and Python. Explore my real-world projects, from robust e-commerce backends to custom local AI chat models.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
