import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full pt-32 md:pt-40 px-4 md:px-8">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/landscape/apples-bg.png"
          alt="Maçãs em fundo"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto bg-cream rounded-t-2xl md:rounded-t-[3rem] pt-10 md:pt-12 pb-8 px-6 md:px-12 flex flex-col min-h-[300px] justify-between">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-1">
              <img 
                src="/alos-mono.svg" 
                alt="Alos Health Logo" 
                className="w-auto h-[24px] md:h-[28px] object-contain shrink-0"  
              />
              <span className="tracking-tighter text-2xl md:text-4xl font-serif leading-none translate-y-[2px] md:translate-y-[4px] text-primary-dark">
                Alos<span className="ml-1 italic">Health</span>
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 w-full md:w-auto">
            
            {/* Column 1: Resources */}
            <div className="flex flex-col space-y-4">
              <p className="text-sm md:text-base font-medium text-primary-dark tracking-tight">Recursos</p>
              <div className="flex flex-col space-y-3 text-xs md:text-sm font-light text-primary-dark/70">
                <Link href="https://aloshealth.com/resources/research" className="hover:text-primary-dark transition-colors w-fit">Investigação</Link>
                <Link href="https://support.aloshealth.com/" className="hover:text-primary-dark transition-colors w-fit">Central de Ajuda</Link>
                <Link href="https://www.notion.so/Compliance-35ff3de024038097b62bd4204b09beb2?source=copy_link" className="hover:text-primary-dark transition-colors w-fit">Central de Confiança</Link>
              </div>
            </div>

            {/* Column 2: Legal */}
            <div className="flex flex-col space-y-4">
              <p className="text-sm md:text-base font-medium text-primary-dark tracking-tight">Legal</p>
              <div className="flex flex-col space-y-3 text-xs md:text-sm font-light text-primary-dark/70">
                <Link href="https://app.notion.com/p/Information-to-be-provided-where-personal-data-are-collected-from-the-data-subject-360f3de0240380b78a43f14dfd82d8b3?source=copy_link" className="hover:text-primary-dark transition-colors w-fit">Política de Privacidade</Link>
                <Link href="https://app.notion.com/p/Product-Liability-Directive-360f3de0240380428d41df711f38130d?source=copy_link" className="hover:text-primary-dark transition-colors w-fit">Termos de Serviço</Link>
                <Link href="https://app.notion.com/p/ePrivacy-Directive-360f3de024038072afd4f6850e117dd5?source=copy_link" className="hover:text-primary-dark transition-colors w-fit">Política de Cookies</Link>
                <Link href="https://app.notion.com/p/Processor-360f3de02403809987c7f7af73d70b81?source=copy_link" className="hover:text-primary-dark transition-colors w-fit">Política de Utilização</Link>
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-xs md:text-[0.8rem] text-primary-dark/50">
          
          {/* Slogan */}
          <div>
            <span className="tracking-tighter">O seu espaço de decisão nutricional</span>
          </div>
          
          {/* Email */}
          <div>
            <a href="mailto:hello@aloshealth.com" className="hover:text-primary-dark transition-colors">
              hello@aloshealth.com
            </a>
          </div>

          {/* Socials */}
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/aloshealth/" className="hover:text-primary-dark transition-colors">Instagram</Link>
            <Link href="https://www.linkedin.com/company/alos-health/" className="hover:text-primary-dark transition-colors">LinkedIn</Link>
            <Link href="https://www.youtube.com/@aloshealth" className="hover:text-primary-dark transition-colors">Youtube</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}