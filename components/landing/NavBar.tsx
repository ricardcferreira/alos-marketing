import Link from "next/link";
import CalButton from "@/components/lp/CalButton";

export default function NavBar() {
  return (
    <header className="fixed top-8 left-0 w-full z-50 px-4">
      {/* Contentor em formato "Pílula" Flutuante */}
      <div className="max-w-7xl mx-auto h-[68px] bg-cream rounded-full px-6 flex items-center justify-between">
        
        {/* LOGO (Esquerda) */}
        <Link href="/" className="flex items-center gap-1">
          <img 
            src="/alos-mono.svg" 
            alt="Alos Health Logo" 
            className="w-auto h-[18px] object-contain shrink-0" 
          />
          <span className="tracking-tighter text-2xl font-serif leading-none translate-y-[2px] text-primary-dark">
            Alos<span className="ml-0.5 italic">Health</span>
          </span>
        </Link>

        {/* AÇÕES (Direita) */}
        <div className="flex items-center gap-3">
          <CalButton 
            calLink="https://cal.com/aloshealth/conversa-inicial" 
            variant="primary"
          >
            Conversa Inicial
          </CalButton>
          
          <Link 
            href="https://app.aloshealth.com" 
            className="inline-flex items-center justify-center font-medium rounded-lg border border-primary-dark text-primary-dark hover:bg-cream-light transition-colors px-4 py-2 text-sm"
          >
            Login
          </Link>
        </div>
        
      </div>
    </header>
  );
}