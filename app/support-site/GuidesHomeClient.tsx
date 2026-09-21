// app/(support)/GuidesHomeClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import "@/app/globals.css";
import React from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

interface CollectionWithCount {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
}

export default function GuidesHomeClient({
  collections,
}: {
  collections: CollectionWithCount[];
}) {
  const [query, setQuery] = useState("");

  // FIX/ADD: category pills are generated from the real collections list,
  // not an invented taxonomy — with only one collection today, this shows
  // one pill + "Todas" until more collections exist, which is correct,
  // not a bug. null = "Todas" (no category filter applied).
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const filtered = collections.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCollection ? c.slug === activeCollection : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Header />

      <div className="flex-grow w-full max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-32">
        
        {/* Title Section */}
        <div className="mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-primary-dark tracking-tight leading-tight">
            Conselhos e respostas da<br className="hidden sm:block" /> equipa Alos Health
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col justify-center rounded-2xl border border-cream p-8 transition-all"
            >
              <h2 className="font-serif text-2xl text-primary-dark mb-2 group-hover:opacity-70 transition-opacity">
                {c.title}
              </h2>
              <p className="text-sm font-medium group-hover:opacity-70 text-gray-500">
                {c.articleCount} {c.articleCount === 1 ? "artigo" : "artigos"}
              </p>
            </Link>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}