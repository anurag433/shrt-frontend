import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    "Home",
    "Features",
    "Pricing",
    "API",
    "Dashboard",
  ];

  return (
    <header className="sticky top-0 z-50  backdrop-blur-md ">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 lg:px-9">
        
        <div className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-8 object-contain cursor-pointer"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`relative text-[15px] font-semibold transition-colors duration-200
              ${
                index === 0
                  ? "text-[#5855F4]"
                  : "text-[#5e5e6d] hover:text-[#32264C]"
              }`}
            >
              {item}
              {index === 0 && (
                <span className="absolute left-0 -bottom-1.5 h-[2.5px] w-full rounded-t-md bg-[#5855F4]" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <button className="px-7 py-2.5 rounded-full text-white font-semibold bg-[#5855F4] hover:bg-[#4F46E5] shadow-md shadow-[#5855F4]/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            Sign In
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#32264C] p-2"
        >
          {open ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="flex flex-col py-2">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`px-6 py-4 font-medium border-b border-gray-50 ${
                  index === 0 ? "text-[#5855F4] bg-indigo-50/50" : "text-[#7E7E8C]"
                }`}
              >
                {item}
              </a>
            ))}
            <div className="px-6 py-6">
              <button className="w-full py-3.5 rounded-xl text-white font-semibold bg-[#5855F4] shadow-md">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}