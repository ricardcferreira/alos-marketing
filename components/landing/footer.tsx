import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-cream-light">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        {/* Column 1: Brand & Contact */}
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
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
          </div>
          
          <div className="flex flex-col space-y-1 text-[0.7rem] pl-2 font-light text-black">
            <div className="pt-1 flex flex-col space-y-1">
              <span className="text-primary-dark text-xs tracking-tighter">O seu espaço de decisão nutricional</span>
              <a href="mailto:hello@aloshealth.com" className="hover:text-primary-dark text-primary-dark/60 transition-colors">
                hello@aloshealth.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex space-x-10">
          {/* Column 2: Compliance */}
          <div className="flex flex-col space-y-5 md:pl-8">
            <p className="text-[0.95rem] text-primary-dark uppercase tracking-tight">Compliance</p>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Safety</Link>
              <Link href="https://www.notion.so/Compliance-35ff3de024038097b62bd4204b09beb2?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Trust Dashboard</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col space-y-5">
            <p className="text-[0.95rem] text-primary-dark uppercase tracking-tight">Legal</p>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Terms of Service</Link>
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Cookie Preferences</Link>
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Usage Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}