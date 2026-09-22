import Link from "next/link";
import { FiInstagram, FiLinkedin, FiYoutube, FiSlack } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-cream-light">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        
        {/* Column 1: Brand, Contact & Socials */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            {/* BRAND LOGO */}
            <Link href="/" className="flex items-center gap-1">
              <img 
                src="/alos-logo.svg" 
                alt="Alos Health Logo" 
                className="w-auto h-[60px] object-contain shrink-0" 
              />
              <span className="tracking-tighter text-4xl font-serif leading-none translate-y-[2px] text-primary-dark">
                Alos <span className="italic">Health</span>
              </span>
            </Link>
            
            <div className="flex flex-col space-y-1 text-[0.7rem] pl-2 font-light text-black">
              <div className="pt-1 flex flex-col space-y-1">
                <span className="text-primary-dark text-xs tracking-tighter">O seu espaço de decisão nutricional</span>
                <a href="mailto:hello@aloshealth.com" className="hover:text-primary-dark text-primary-dark/60 transition-colors">
                  hello@aloshealth.com
                </a>
              </div>
            </div>
          </div>

        {/* SOCIALS */}
          <div className="flex flex-col pl-2 mt-6 space-y-2">
          <span className="text-primary-dark text-xs tracking-tighter">Encontre-nos em</span>
          <div className="flex flex space-x-3 text-[0.75rem] font-light text-black">
            <Link href="https://join.slack.com/t/alos-health/shared_invite/zt-4an27wbis-JCOJHbUmPJ2SEeq_DUejqA" className="hover:text-gray-700 text-black transition-colors w-fit">Slack</Link>
            <Link href="https://www.instagram.com/aloshealth/" className="hover:text-gray-700 text-black transition-colors w-fit">Instagram</Link>
            <Link href="https://www.linkedin.com/company/alos-health/" className="hover:text-gray-700 text-black transition-colors w-fit">LinkedIn</Link>
            <Link href="https://www.youtube.com/@aloshealth" className="hover:text-gray-700 text-black transition-colors w-fit">Youtube</Link>
          </div>
          </div>

        </div>

        <div className="flex space-x-10">
          {/* Column 2: Recursos */}
          <div className="flex flex-col space-y-5 md:pl-8">
            <p className="text-[0.95rem] text-primary-dark uppercase tracking-tight">Recursos</p>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="https://support.aloshealth.com/" className="hover:text-gray-700 text-black transition-colors w-fit">Central de Ajuda</Link>
              <Link href="https://www.notion.so/Compliance-35ff3de024038097b62bd4204b09beb2?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Central de Confiança</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col space-y-5">
            <p className="text-[0.95rem] text-primary-dark uppercase tracking-tight">Legal</p>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="https://app.notion.com/p/Information-to-be-provided-where-personal-data-are-collected-from-the-data-subject-360f3de0240380b78a43f14dfd82d8b3?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Política de Privacidade</Link>
              <Link href="https://app.notion.com/p/Product-Liability-Directive-360f3de0240380428d41df711f38130d?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Termos de Serviço</Link>
              <Link href="https://app.notion.com/p/ePrivacy-Directive-360f3de024038072afd4f6850e117dd5?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Política de Cookies</Link>
              <Link href="https://app.notion.com/p/Processor-360f3de02403809987c7f7af73d70b81?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Política de Utilização</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}