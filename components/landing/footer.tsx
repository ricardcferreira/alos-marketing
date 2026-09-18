import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#FCFAF8] py-16 px-8">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        
        {/* Column 1: Brand & Contact */}
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center cursor-pointer flex gap-3 items-center transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
              <img src="/logo.svg" alt="Nuts Logo" className="w-auto h-[24px] object-contain" />
              <span className="text-[1.8rem] text-black tracking-tighter font-regular">areunuts</span>
            </div>
            <span className="text-black text-xs tracking-tighter">Your Nutrition Care Process</span>
          </div>
          
          <div className="flex flex-col space-y-1 text-[0.7rem] font-light text-black">
            <div className="pt-6 flex flex-col">
              <a href="mailto:hello@areunuts.com" className="hover:text-black pb-1 text-gray-700 text-[0.7rem] transition-colors">
                hello@areunuts.app
              </a>
              <button className="text-left hover:text-gray-700 text-[0.7rem] text-black transition-colors w-fit">
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-10">
          {/* Column 2: Compliance */}
          <div className="flex flex-col space-y-5 md:pl-8">
            <h3 className="text-[0.8rem] text-black font-light uppercase tracking-tighter">Compliance</h3>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Safety</Link>
              <Link href="https://www.notion.so/Compliance-35ff3de024038097b62bd4204b09beb2?source=copy_link" className="hover:text-gray-700 text-black transition-colors w-fit">Trust Dashboard</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-[0.8rem] text-black font-light uppercase tracking-tighter">Legal</h3>
            <div className="flex flex-col space-y-3 text-[0.75rem] font-light text-black">
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Terms of Service</Link>
              <Link href="#" className="hover:text-gray-700 text-black transition-colors w-fit">Usage Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}