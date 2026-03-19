import { useState, useEffect, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { smoothScrollTo } from "@/lib/scrollUtils";
import logo from "@/assets/LOGO.jpg";

const navItems = [
  { label: "Convivencias & Retiros", href: "/convivencias-retiros" },
  { label: "Novedades", href: "/novedades" },
  { label: "Club Escolar", href: "/club-escolar" },
  { label: "Centro Cultural", href: "/centro-cultural" },
  { label: "Código de Honor", href: "/codigo-de-honor" },
  { label: "Contactanos", href: "/contactanos" },
  { label: "Tour Virtual", href: "/centrocultural", external: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const wasMobileOpen = mobileOpen;
    // Close mobile menu first
    setMobileOpen(false);

    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Si es un enlace interno (hash) para scroll
    if (href.startsWith("#")) {
      // Calculate navbar height for offset including top-4 margin
      const navbarHeight = (navRef.current?.offsetHeight || 80) + 16; // +16px for top-4

      // Small delay if mobile menu was open to allow it to close
      const scrollDelay = wasMobileOpen ? 100 : 0;

      setTimeout(() => {
        const targetId = href.replace("#", "");
        smoothScrollTo(targetId, navbarHeight);
      }, scrollDelay);
    } else {
      // Si es una ruta de navegación (ej. /centrocultural)
      // Pequeño delay para cerrar el menú móvil si estaba abierto
      const navigateDelay = wasMobileOpen ? 100 : 0;
      setTimeout(() => {
        navigate(href);
      }, navigateDelay);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
        scrolled ? "glass-nav-scrolled" : "glass-nav"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <a
          href="/"
          className="flex items-center gap-3"
          onClick={handleNavClick}
        >
          <img src={logo} alt="Club Costa" className="h-9 w-9 rounded-full object-cover ring-1 ring-foreground/10" />
          <span className="font-heading text-lg font-bold text-foreground tracking-tight">
            Club Costa
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={handleNavClick}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.external
                    ? "bg-secondary text-secondary-foreground hover:bg-yellow-soft shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-foreground/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    item.external
                      ? "bg-secondary text-secondary-foreground hover:bg-yellow-soft shadow-sm"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
