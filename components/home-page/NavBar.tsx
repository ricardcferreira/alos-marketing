import Link from "next/link";
import CalButton from "@/components/ui/CalButton";

export default function NavBar() {
  return (
    <header className="fixed top-4 md:top-8 left-0 w-full z-50 px-4">
      {/* Contentor em formato "Pílula" Flutuante */}
      <div className="max-w-7xl mx-auto h-[60px] md:h-[68px] bg-cream rounded-full px-4 md:px-6 flex items-center justify-between">
        
        {/* LOGO (Esquerda) */}
        <Link href="/" className="flex items-center gap-1">
          <img 
            src="/alos-mono.svg" 
            alt="Alos Health Logo" 
            className="w-auto h-[16px] md:h-[18px] object-contain shrink-0" 
          />
          <span className="tracking-tighter text-xl md:text-2xl font-serif leading-none translate-y-[2px] text-primary-dark">
            Alos<span className="ml-0.5 italic">Health</span>
          </span>
        </Link>

        {/* AÇÕES (Direita) */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Escondido em mobile (hidden), visível a partir de tablet (md:block) */}
          <div className="hidden md:block">
            <CalButton 
              calLink="https://cal.com/aloshealth/conversa-inicial" 
              variant="primary"
            >
              Conversa Inicial
            </CalButton>
          </div>
          
          <Link 
            href="https://app.aloshealth.com" 
            className="inline-flex items-center justify-center font-medium rounded-full md:rounded-lg border border-primary-dark text-primary-dark hover:bg-cream-light transition-colors px-4 py-1.5 md:py-2 text-xs md:text-sm"
          >
            Login
          </Link>
        </div>
        
      </div>
    </header>
  );
}