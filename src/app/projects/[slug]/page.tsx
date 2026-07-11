import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects } from "@/lib/projects";
import { generateProjectMetadata } from "@/lib/seo";
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate Dynamic Metadata for Google Crawler & Social Media sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found in our database index.",
    };
  }

  // Call the robust dynamic SEO meta tag generation helper
  return generateProjectMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    imageUrl: project.imageUrl,
    keywords: project.keywords,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12" id="project-detail-layout">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        id="back-to-home"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        BACK TO PORTFOLIO
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 px-2.5 py-0.5 bg-gray-50 border border-gray-100 rounded-full w-fit mb-4">
          <Sparkles className="w-3 h-3 text-gray-700" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">Case Study Showcase</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">
          {project.title}
        </h1>
        <p className="text-sm md:text-md text-gray-500 leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative h-[250px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 mb-10">
        <Image
          src={project.imageUrl}
          alt={`${project.title} Banner image`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Project Meta Information */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Core Description (Left column, spanning 2 grid tracks) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-mono mb-3">Project Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </div>

          <div className="mt-4 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-mono mb-3">SEO Strategy & Target Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/50 px-2.5 py-1 rounded-lg"
                >
                  {kw}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              These terms are explicitly written into the page&apos;s HTML headers to allow Google Bots to rank this portfolio page for developer-related search requests.
            </p>
          </div>
        </div>

        {/* Links & Tech Stack Sidebar (Right column, spanning 1 track) */}
        <div className="flex flex-col gap-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs h-fit">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-mono">Deployments</h4>
            <div className="flex flex-col gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-semibold text-gray-800 hover:text-black bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  id={`live-preview-${project.slug}`}
                >
                  Live Application
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-semibold text-gray-800 hover:text-black bg-gray-50 border border-gray-100 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  id={`github-repo-${project.slug}`}
                >
                  GitHub Repository
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-gray-50 pt-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-mono">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono font-semibold bg-gray-50 text-gray-600 border border-gray-100/80 px-2.5 py-1 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
