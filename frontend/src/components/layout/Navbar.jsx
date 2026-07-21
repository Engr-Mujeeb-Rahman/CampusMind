import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Replace this with your actual logo image later */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            C
          </div>

          <span className="text-xl font-bold text-blue-600">
            CampusMind
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}

          <button className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            Get Started
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}

            <button className="mt-3 rounded-xl bg-blue-600 py-3 font-semibold text-white">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;