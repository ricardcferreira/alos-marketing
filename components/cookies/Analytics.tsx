"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics() {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Função para verificar o consentimento
    const checkConsent = () => {
      const consentStr = localStorage.getItem("alos_cookie_consent");
      if (consentStr) {
        try {
          const consent = JSON.parse(consentStr);
          // Se o utilizador aceitou a categoria analytics, ativamos o script
          if (consent.analytics === true) {
            setConsentGranted(true);
          }
        } catch (e) {
          console.error("Erro a ler consentimento de cookies", e);
        }
      }
    };

    // Verificar no carregamento inicial
    checkConsent();

    // Criar um "listener" para reagir quando o utilizador clica em "Aceitar" no banner
    window.addEventListener("cookieConsentUpdated", checkConsent);

    return () => {
      window.removeEventListener("cookieConsentUpdated", checkConsent);
    };
  }, []);

  if (!consentGranted) return null;

  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />;
}