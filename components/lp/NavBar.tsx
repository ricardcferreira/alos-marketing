import Link from "next/link";

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream-light backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-center">
        
        {/* LOGO */}
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
        
      </div>
    </header>
  );
}