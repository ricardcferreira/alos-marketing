"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Estado para as preferências no modal
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Verifica se já existe consentimento guardado
    const consent = localStorage.getItem("alos_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleSave = (analytics: boolean, marketing: boolean) => {
    const consentData = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem("alos_cookie_consent", JSON.stringify(consentData));
    
    setShowBanner(false);
    setShowModal(false);

    window.dispatchEvent(new Event("cookieConsentUpdated"));

    if (analytics) {
      console.log("Ativar Google Analytics / Plausible...");
    }
  };

  const handleAcceptAll = () => handleSave(true, true);
  const handleRejectAll = () => handleSave(false, false);
  const handleSavePreferences = () => handleSave(preferences.analytics, preferences.marketing);

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* BANNER FLUTUANTE */}
      {showBanner && !showModal && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] space-y-5 md:w-[380px] p-6 bg-cream-light rounded-[1.5rem] shadow-2xl flex flex-col">
          <div className="flex-col space-y-4 flex border-b border-primary-dark/15 pb-5">
            <p className="text-sm text-primary-dark font-semibold">
                Utilizamos cookies
            </p>
            <span className="text-xs text-primary-dark/80 leading-relaxed">
                Utilizamos cookies para melhorar a sua experiência de navegação, apresentar conteúdo personalizado e analisar o nosso tráfego. Ao clicar em "Aceitar todos", concorda com a nossa utilização de cookies.
            </span>
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <button
              onClick={handleAcceptAll}
              className="w-full hover:bg-alos-green bg-alos-green-light cursor-pointer hover:text-white text-alos-green py-2.5 rounded-xl text-sm font-medium"
            >
              Aceitar todos
            </button>
            <button
              onClick={handleRejectAll}
              className="w-full hover:bg-alos-brown cursor-pointer hover:text-white text-alos-brown bg-alos-yellow py-2.5 rounded-xl text-sm font-medium"
            >
              Rejeitar todos
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-cream-light cursor-pointer border border-primary-dark-50 text-primary-dark py-2.5 rounded-xl text-sm font-medium hover:bg-cream transition-colors"
            >
              Gerir preferências
            </button>
          </div>

          <div className="flex items-center justify-start">
            <Link 
              href="https://aloshealth.notion.site/Information-to-be-provided-where-personal-data-are-collected-from-the-data-subject-360f3de0240380b78a43f14dfd82d8b3" 
              className="text-xs text-alos-green underline hover:text-primary-dark transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      )}

      {/* MODAL DE PREFERÊNCIAS */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary-dark/40">
          <div className="w-full max-w-lg bg-cream-light rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header do Modal */}
            <div className="flex-col items-center justify-between">
            <div className="flex items-center justify-between py-4 px-6 border-b border-primary-dark/15">
              <p className="text-sm text-primary-dark font-semibold">
                Preferências de Cookies
              </p>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setShowBanner(true);
                }}
                className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-cream-light text-primary-dark hover:bg-cream transition-colors"
              >
                ✕
              </button>
              </div>
              <p className="text-xs px-6 text-primary-dark/80 leading-relaxed">
                Quando visita o nosso website, este pode armazenar ou recolher dados no seu browser. Este armazenamento é muitas vezes necessário para as funcionalidades básicas do website, bem como para marketing e análise estatística. Pode optar por desativar certas categorias.
              </p>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">

              <div className="space-y-1">
                {/* Categoria: Essencial */}
                <div className="flex items-center justify-between p-4 border border-primary-dark/15 rounded-xl bg-cream">
                  <span className="text-sm font-medium text-primary-dark">Essencial</span>
                  <input type="checkbox" checked disabled className="accent-primary-dark" />
                </div>

                {/* Categoria: Analytics */}
                <div className="flex items-center justify-between p-4 bg-cream border border-primary-dark/15 rounded-xl">
                  <span className="text-sm font-medium text-primary-dark">Analíticos</span>
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="accent-alos-green cursor-pointer" 
                  />
                </div>

                {/* Categoria: Marketing */}
                <div className="flex items-center justify-between p-4 border border-primary-dark/15 rounded-xl bg-cream">
                  <span className="text-sm font-medium text-primary-dark">Marketing</span>
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="accent-alos-green cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-4 border-t border-primary-dark/10 justify-between flex flex-col sm:flex-row gap-3">
            <div className="flex w-full gap-2">
              <button
                onClick={handleAcceptAll}
                className="hover:bg-alos-green bg-alos-green-light px-4 cursor-pointer hover:text-white text-alos-green py-2.5 rounded-xl text-xs font-medium"
              >
                Aceitar todos
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 hover:bg-alos-brown cursor-pointer hover:text-white text-alos-brown bg-alos-yellow py-2.5 rounded-xl text-xs font-medium"
              >
                Rejeitar todos
              </button>
            </div>
              <button
                onClick={handleSavePreferences}
                className="px-4 bg-cream-light cursor-pointer border border-primary-dark-50 text-primary-dark py-2.5 rounded-xl text-xs font-medium hover:bg-cream transition-colors"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}