import Link from "next/link";
import React from "react";

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      {/* Cabeçalho exclusivo do Centro de Suporte */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold text-xl text-primary-dark tracking-tight">
              Alos Health <span className="font-light text-gray-400">| Suporte</span>
            </Link>
          </div>
          <nav>
            {/* Link para a plataforma app.aloshealth.com (ajuste o URL conforme a sua app real) */}
            <a 
              href="https://app.aloshealth.com" 
              className="text-sm font-medium text-primary-dark/70 hover:text-primary-dark transition-colors"
            >
              Ir para a Aplicação &rarr;
            </a>
          </nav>
        </div>
      </header>

      {/* O conteúdo das páginas de suporte vai ser renderizado aqui dentro */}
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}