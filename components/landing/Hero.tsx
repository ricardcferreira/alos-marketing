import Link from "next/link";
import CalButton from "@/components/lp/CalButton";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center mt-16">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADING */}
        <h1 className="font-serif text-3xl text-primary-dark tracking-tight">
          O seu espaço espaço <br></br> de decisão nutricional
        </h1>
        
        {/* PARAGRAPH */}
        <span><p className="text-base md:text-lg text-primary-dark/80 leading-relaxed max-w-2xl mx-auto mb-8 mt-2">
          Transforme o seu raciocínio clínico em dados estruturados e<br></br>codificados. Sem blocos de texto-livre. Sem trabalho repetitivo.<br></br>Desenhado para dar à profissão o valor que merece.
        </p></span>
        
        <CalButton 
          calLink="https://cal.com/aloshealth/agendar-demonstracao"
          variant="secondary"
        >
          Agendar Demonstração
        </CalButton>
        
      </div>
    </section>
  );
}