"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleMeta } from "@/lib/guides";
import { Search } from "lucide-react";

export default function CollectionGrid({ 
  articles, 
  collectionSlug 
}: { 
  articles: ArticleMeta[];
  collectionSlug: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // 1. Define the exact order you want (matching the exact text from your markdown files)
  const categoryOrder = [
    "Fluxo de Trabalho",
    "Rastreio Nutricional",
    "Avaliação do Estado Nutricional",
    "Diagnóstico Nutricional",
    "Monitorização do Estado Nutricional"
  ];

  // 2. Extract unique sections from the articles
  const rawSections = Array.from(
    new Set(articles.map((a) => a.section || "Geral").filter(Boolean))
  );

  // 3. Sort them based on your custom order array
  rawSections.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both exist in your custom list, sort them by that specific order
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If a category isn't in your list, push it to the end
    if (indexA === -1 && indexB !== -1) return 1;
    if (indexA !== -1 && indexB === -1) return -1;
    // If neither is in the list, sort them alphabetically at the end
    return a.localeCompare(b);
  });

  // 4. Prepend "All" to the final sorted array
  const sections = ["All", ...rawSections];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || (article.section || "Geral") === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full mb-16">
      
      {/* Bloco de Pesquisa (Floating Container) */}
      <div className="w-full flex justify-center py-20">
        {/* O container "flutuante" com cantos muito arredondados e fundo bege */}
        <div className="w-full max-w-3xl bg-cream-light rounded-2xl p-4 md:p-6 shadow-lg border border-cream">
          
          {/* Input de Pesquisa */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-dark" />
            <input
              type="text"
              placeholder="Explore Alos Guides"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-sm border border-cream focus:outline-none focus:border-primary-dark bg-white"
            />
          </div>
          
          {/* Tabs / Pills (Alinhados à esquerda) */}
          <div className="flex flex-wrap items-center gap-1 md:gap-2 pl-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveTab(section)}
                className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                  activeTab === section 
                    ? "bg-alos-yellow text-alos-brown" // Ativo: Pill escura
                    : "bg-cream text-primary-dark hover:text-alos-brown hover:bg-alos-yellow" // Inativo: Apenas texto, sem fundo
                }`}
              >
                {section}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Grelha de Artigos */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div key={article.slug} className="group flex flex-col">
              <Link href={`/${collectionSlug}/${article.slug}`} className="block h-full">
                
                {/* Banner de Imagem */}
                <div className="w-full aspect-[2/1] bg-gradient-to-tl from-white via-alos-green-light to-alos-green rounded-xl overflow-hidden border border-gray-100 relative">
                  {article.image && (
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  )}
                </div>
                
                {/* Conteúdo do Cartão */}
                <div className="pt-5 pb-4 flex flex-col grow">
                  <span className="text-xs font-light uppercase tracking-tight text-primary-dark mb-2">
                    {article.section || "Guia"}
                  </span>
                  <h4 className="text-xl font-serif text-primary-dark mb-4 transition-opacity">
                    {article.title}
                  </h4>
                  
                  {/* Rodapé (Autor/Data) */}
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                      {article.authorAvatar && (
                        <img src={article.authorAvatar} alt={article.authorName} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-primary-dark">{article.authorName || "Alos Team"}</span>
                      <span className="text-xs text-gray-500">
                        {article.date || "Recent"} • {article.readTime || "5 min read"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-primary-dark">
                  Ler artigo completo
                </div>

              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Nenhum artigo encontrado para a sua pesquisa.
          </div>
        )}
      </div>

    </div>
  );
}