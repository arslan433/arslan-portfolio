import { Metadata } from "next";

export interface ProjectSEOInput {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  keywords?: string[];
}

export function generateProjectMetadata(project: ProjectSEOInput): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://developer-portfolio.vercel.app";
  const projectUrl = `${baseUrl}/projects/${project.slug}`;
  const defaultKeywords = [
    "Full Stack Developer",
    "Software Engineer",
    "Web Development Projects",
    "React Developer",
    "Next.js Specialist",
    "TypeScript Expert",
    "Firebase Supabase Developer"
  ];

  const mergedKeywords = Array.from(
    new Set([...(project.keywords || []), ...defaultKeywords])
  );

  return {
    title: `${project.title} | Portfolio Project`,
    description: project.description,
    keywords: mergedKeywords,
    authors: [{ name: "Professional Full-Stack Developer" }],
    creator: "Full-Stack Developer",
    openGraph: {
      title: `${project.title} - Built by Full-Stack Developer`,
      description: project.description,
      url: projectUrl,
      siteName: "Developer Portfolio",
      images: [
        {
          url: project.imageUrl || `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${project.title} Showcase Preview`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Developer Portfolio`,
      description: project.description,
      images: [project.imageUrl || `${baseUrl}/og-default.png`],
      creator: "@dev_portfolio",
    },
    alternates: {
      canonical: projectUrl,
    },
    other: {
      "google-site-verification": "verification_token_here",
      "robots": "index, follow",
    }
  };
}
