import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream-light backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-1">
          <img 
            src="/alos-logo.svg" 
            alt="Alos Health Logo" 
            className="w-auto h-[32px] object-contain shrink-0" 
          />
          <span className="tracking-tighter text-2xl font-serif leading-none translate-y-[2px] text-primary-dark">
            Alos <span className="italic">Health</span>
          </span>
        </Link>
        
        {/* AUTHENTICATION BUTTON */}
        <div className="flex items-center gap-6">
          
          <a 
            href="https://app.aloshealth.com/sign-in" 
            className="text-sm font-medium text-gray-700 hover:text-black tracking-tight transition-colors"
          >
            Log in
          </a>

        </div>
      </div>
    </header>
  );
}