import Link from "next/link";
import CalButton from "@/components/lp/CalButton";

export default function CtaSection() {
  return (
    <section className="w-full p-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADING */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark tracking-tight mb-2">
          <span className="italic">Ouvimos-vos.</span> Agora, continuamos a construir consigo.
        </h2>
        
        {/* PARAGRAPH */}
        <span><p className="text-base md:text-lg text-primary-dark/80 leading-relaxed max-w-2xl mx-auto mb-8">
          O Estudo-Piloto é o próximo passo dessa conversa: perceber, em detalhe, <br></br> como a Alos Health integra na sua prática clínica.
        </p></span>

        <CalButton 
          calLink="https://cal.com/aloshealth/conversa-inicial"
          className="inline-flex cursor-pointer items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown hover:text-white transition-colors font-medium rounded-sm px-3 py-2 text-xs"
        />
        
      </div>
    </section>
  );
}