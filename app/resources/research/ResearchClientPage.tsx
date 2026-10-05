'use client'

import React, { useState } from "react";
import { submitStudyLead } from "@/app/actions/submitLead";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ResearchArticle } from "@/lib/research";
import { X, Check } from "lucide-react";

export default function ResearchClientPage({ study }: { study: ResearchArticle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await submitStudyLead({
      ...formData,
      studyName: study.title // Dynamically uses the Markdown title for Notion!
    });

    if (res.success) {
      setIsSuccess(true);
    } else {
      alert("Ocorreu um erro. Por favor, tente novamente.");
    }
    setIsSubmitting(false);
  };

  // Format the date properly for the UI
  const formattedDate = new Date(study.date).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <main className="min-h-screen mt-32 bg-cream-light text-primary-dark">
      <Header />
      
      {/* Article Header (Dynamic) */}
      <div className="mx-auto max-w-3xl space-y-4 mb-12 text-center">
        <span className="text-xs inline-block">
          {study.type} · {formattedDate}
        </span>
        <h1 className="text-4xl font-serif font-medium leading-tight">
          {study.title}
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-alos-green-light text-alos-green hover:bg-alos-green hover:text-white px-3 py-1.5 cursor-pointer text-sm rounded-sm font-medium transition-colors"
        >
          Ler estudo completo
        </button>
      </div>

      {/* Static Abstract Content (Injected from Markdown) */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div 
          className="space-y-6 text-gray-700 leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: study.html }} 
        />
      </div>

      {/* The Full-Screen Lead Wall Modal (Dynamic) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row w-full h-screen bg-cream-light overflow-y-auto">
          
          <button 
            onClick={() => !isSubmitting && setIsModalOpen(false)}
            className="absolute top-6 right-6 cursor-pointer md:top-8 hover:bg-cream md:right-8 p-1.5 bg-white backdrop-blur-sm rounded-sm text-primary-dark transition-colors focus:outline-none z-50"
          >
            <X width="12" height="12" />
          </button>

          <div className="w-full md:w-1/2 min-h-[40vh] md:h-full bg-gradient-to-tl from-white via-alos-green-light to-alos-green flex flex-col justify-center items-center p-10 md:p-16 lg:p-20 relative">
            <span className="text-5xl font-serif text-white text-center max-w-sm tracking-tight leading-tighter">
              {study.leadWallTitle}
            </span>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20 relative">
            <div className="bg-white text-primary-dark rounded-[2rem] w-full max-w-[600px] p-8 sm:p-12 relative">
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-alos-green-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check width="20" height="20" className="text-alos-green" />
                  </div>
                  <span className="font-serif text-3xl mb-4">Obrigado!</span>
                  <p className="text-gray-500 text-sm leading-relaxed mb-12 px-4">
                    Recebemos os seus dados. A nossa equipa irá enviar a sua cópia gratuita do estudo por e-mail em breve.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-alos-green-light text-alos-green hover:text-white hover:bg-alos-green px-8 py-3.5 rounded-sm font-medium cursor-pointer transition-colors"
                  >
                    Voltar para a página do estudo
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-alos-green bg-alos-green-light px-3 py-1 rounded-full">
                      100% Gratuito
                    </span>
                  </div>

                  <h2 className="text-3xl font-serif text-center mb-3">
                    Obtenha a sua <span className="italic capitalize">cópia</span> do estudo.
                  </h2>
                  <p className="text-sm text-gray-500 text-center mb-10 leading-relaxed px-4">
                    Preencha os dados abaixo para receber acesso<br></br>ao estudo completo no seu e-mail.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Primeiro nome</label>
                        <input required type="text" placeholder="" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white hover:bg-cream-light border border-cream rounded-sm px-3 py-1.5 text-sm text-primary-dark placeholder:text-gray-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">Apelido</label>
                        <input required type="text" placeholder="" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white hover:bg-cream-light border border-cream rounded-sm px-3 py-1.5 text-sm text-primary-dark placeholder:text-gray-400 focus:outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 ml-1">E-mail</label>
                      <input required type="email" placeholder="" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white hover:bg-cream-light border border-cream rounded-sm px-3 py-1.5 text-sm text-primary-dark placeholder:text-gray-400 focus:outline-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-alos-green-light text-alos-green font-medium py-3.5 cursor-pointer rounded-sm mt-4 hover:bg-alos-green hover:text-white transition-colors disabled:opacity-50">
                      {isSubmitting ? "A enviar..." : "Solicitar Estudo"}
                    </button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4">
                      Dúvidas? <a href="https://support.aloshealth.com/" className="underline hover:text-gray-600">Contacte o nosso suporte</a>
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}