import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "API", path: "/api" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 lg:px-9">

        <NavLink to="/">
          <img
            src={logo}
            alt="logo"
            className="h-8 object-contain cursor-pointer"
          />
        </NavLink>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#5855F4]"
                    : "text-[#7E7E8C] hover:text-[#32264C]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1.5 h-[2.5px] w-full rounded-t-md bg-[#5855F4]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <button className="px-7 py-2.5 rounded-full text-white font-semibold bg-[#5855F4] hover:bg-[#4F46E5] shadow-md">
            Sign In
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-xl rounded-b-3xl overflow-hidden">
          <div className="flex flex-col">

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-4 ${
                    isActive
                      ? "text-[#5855F4] bg-indigo-50"
                      : "text-[#7E7E8C]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="p-6">
              <button className="w-full py-3 rounded-xl bg-[#5855F4] text-white font-semibold">
                Sign In
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}