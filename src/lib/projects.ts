export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  slug: string;
  imageUrl: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  keywords: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "EcoSmart Mobility Platform",
    description: "An AI-powered routing engine that reduces electric vehicle fleet emission and calculates green routing metrics.",
    longDescription: "EcoSmart Mobility Platform is an enterprise-scale fleet management and green-routing application. Built using Next.js App Router and integrated with Google Maps Routes API, it optimizes paths for heavy-duty electric and hybrid vehicles by factoring in elevation, battery depletion rates, and micro-grid charging infrastructure. It leverages real-time traffic streaming and historical delivery logs to achieve an average 18% energy savings across test fleets.",
    slug: "ecosmart-mobility",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
    tech: ["Next.js", "TypeScript", "Google Maps Platform", "Tailwind CSS", "Supabase"],
    liveUrl: "https://ecosmart-demo.example.com",
    githubUrl: "https://github.com/developer/ecosmart-mobility",
    keywords: ["Green Fleet Management", "EV Routing API", "Next.js Google Maps integration", "Carbon Offset Tracker"]
  },
  {
    id: "2",
    title: "DocuMind Intelligent Search",
    description: "Enterprise PDF and knowledge base indexing and semantic querying engine utilizing Gemini embeddings.",
    longDescription: "DocuMind is an intelligent semantic indexing engine designed for heavy legal and medical compliance documentation. It processes scanned files through OCR pipelines, extracts hierarchical paragraphs, and stores embedding vectors in a vector database. Users can perform natural language searches and retrieve synthesized answers grounded directly in matching source citations.",
    slug: "documind-search",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
    tech: ["React", "Node.js", "@google/genai", "Vector DB", "Firebase Auth"],
    liveUrl: "https://documind-search.example.com",
    githubUrl: "https://github.com/developer/documind-search",
    keywords: ["AI Semantic Search", "PDF OCR parsing", "Gemini embedding vectors", "Knowledge Base Assistant"]
  },
  {
    id: "3",
    title: "SyncBoard Real-Time Editor",
    description: "Collaborative rich text and architectural mockup canvas with instant multi-user synchronization.",
    longDescription: "SyncBoard is a lightning-fast, collaborative whiteboard and text documentation space built to foster real-time design reviews. Utilizing state-of-the-art WebSockets and conflict-free replicated data types (CRDTs), it guarantees smooth collaborative canvas edits even under heavy structural modification, maintaining cursor coordination and detailed revision logs.",
    slug: "syncboard-canvas",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    tech: ["Next.js", "WebSockets", "Canvas API", "framer-motion", "Tailwind CSS"],
    liveUrl: "https://syncboard-app.example.com",
    githubUrl: "https://github.com/developer/syncboard",
    keywords: ["Real-time collaborative canvas", "Whiteboard WebSocket", "CRDT document editing", "Design collaboration tool"]
  }
];
