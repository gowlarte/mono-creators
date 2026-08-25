import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoMono from "@/assets/logo-mono-vinilicos.png";

const navLinks = [
  { label: "Produtos", href: "/produtos" },
  { label: "Catálogo de cores", href: "/produtos/catalogo-cores" },
  { label: "Sobre a Mono", href: "/sobre" },
  { label: "Baixe o catálogo", href: "/downloads" },
  { label: "Seja revendedor", href: "/revendedor" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#E8E4DC]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 lg:px-20 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={logoMono}
            alt="MONO Vinílicos"
            className="h-8 xl:h-10 w-auto"
            width={1834}
            height={423}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-body text-[#8B6644] hover:text-[#6B4426] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/onde-comprar"
            className="text-[14px] font-body text-white px-5 py-2 rounded transition-opacity hover:opacity-85"
            style={{ backgroundColor: "hsl(27 55% 50%)" }}
          >
            Comprar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-[#6B4426]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#E8E4DC] animate-fade-in">
          <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-body text-[#8B6644] hover:text-[#6B4426]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/onde-comprar"
              className="text-[15px] font-body text-white px-5 py-2 rounded text-center transition-opacity hover:opacity-85"
              style={{ backgroundColor: "hsl(27 55% 50%)" }}
              onClick={() => setMobileOpen(false)}
            >
              Comprar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
