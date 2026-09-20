"use client";

import { useState } from "react";

const faqs = [
  {
    question: "O que é a Alos Health?",
    answer: "A Alos Health é o seu espaço de decisão nutricional. Transformamos o seu raciocínio clínico em dados estruturados e codificados, eliminando o trabalho repetitivo e blocos de texto livre."
  },
  {
    question: "A Alos integra com o meu sistema de registo clínico atual?",
    answer: "Sim. A Alos foi desenhada com interoperabilidade em mente, permitindo a exportação de dados estruturados para os principais sistemas de registo clínico e garantindo a continuidade da informação."
  },
  {
    question: "Preciso de instalar algum software especial?",
    answer: "Não. A Alos Health é uma plataforma baseada na nuvem (cloud-based), acessível a partir de qualquer navegador web moderno, sem necessidade de instalações complexas ou hardware específico."
  },
  {
    question: "Como é garantida a segurança e privacidade dos dados?",
    answer: "Garantimos sempre que os seus dados são tratados segundo o Regulamento Geral de Proteção de Dados (RGPD), com encriptação end-to-end, protegendo a sua privacidade e a dos seus pacientes."
  }
];

export default function FaqSection() {
  // We set 0 as the default so the first question is open automatically, just like your wireframe
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      
      {/* HEADER BLOCK */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl text-primary-dark tracking-tight">FAQ</h1>
      </div>

      {/* FAQ CARD CONTAINER */}
      <div>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border-b border-alos-brown last:border-0`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center cursor-pointer justify-between py-6 text-left focus:outline-none transition-colors hover:text-alos-green group"
              >
                <span className="font-serif text-xl text-primary-dark group-hover:text-alos-green transition-colors pr-8">
                  {faq.question}
                </span>
                
                {/* Plus / Minus Indicator */}
                <span className="text-2xl font-light text-primary-dark shrink-0">
                  {isOpen ? "-" : "+"}
                </span>
              </button>
              
              {/* Expandable Content Area */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100 pb-6" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-base text-primary-dark/80 max-w-[600px] leading-relaxed pr-8 md:pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
    </section>
  );
}