import Link from "next/link";
import CalButton from "@/components/lp/CalButton";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center mt-16">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADING */}
        <h1 className="font-serif text-3xl text-primary-dark tracking-tight">
          O seu espaço<br></br>de decisão nutricional
        </h1>
        
        {/* PARAGRAPH */}
        <span><p className="text-base md:text-lg text-primary-dark/80 leading-relaxed max-w-2xl mx-auto mb-8 mt-2">
          Transforme o seu raciocínio clínico em dados estruturados e<br></br>codificados. Sem blocos de texto-livre. Sem trabalho repetitivo.<br></br>Desenhado para dar à profissão o valor que merece.
        </p></span>
        
        <div className="flex justify-center gap-4">
        <CalButton 
              calLink="https://cal.com/aloshealth/conversa-inicial" 
              variant="primary"
            >
              Conversa Inicial
        </CalButton>

        {/* BUTTON */}
        <Link
          href="https://aloshealth.com/resources/research" 
          className="inline-flex items-center justify-center bg-alos-green-light text-alos-green hover:bg-alos-green hover:text-white transition-colors font-medium rounded-sm px-3 py-2 text-xs"
        >
          Ver estudo
        </Link>
        </div>
        
      </div>
    </section>
  );
}