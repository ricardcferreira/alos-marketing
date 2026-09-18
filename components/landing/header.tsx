import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";

export function Header() {
  return (
    <header className="w-full h-[90px] bg-white flex justify-center items-center px-8 z-10 relative">
      <div className="max-w-[1000px] items-center w-full flex justify-between">
        {/* BRAND LOGO */}
        <Link href="/" className="outline-none">
          <div className="flex gap-3 items-center cursor-pointer transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
            <img src="/logo.svg" alt="Nuts Logo" className="w-auto h-[16px] object-contain" />
            <span className="text-[1.2rem] text-black tracking-tighter font-regular">areunuts</span>
          </div>
        </Link>
        
        {/* AUTHENTICATION BUTTON */}
        <div className="flex items-center gap-6">
          
          <a 
            href="https://app.aloshealth.com/sign-in" 
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            Log in
          </a>

        </div>
      </div>
    </header>
  );
}