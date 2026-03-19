import logo from "@/assets/LOGO.jpg";

const Footer = () => (
  <footer className="py-12 bg-navy-deep border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Club Costa" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10" />
          <span className="font-heading text-lg font-bold text-white tracking-tight">Club Costa</span>
        </div>
        <div className="flex gap-8 text-white/70 text-sm">
          <a href="#actividades" className="hover:text-secondary transition-colors">Actividades</a>
          <a href="#viajes" className="hover:text-secondary transition-colors">Viajes</a>
          <a href="#eventos" className="hover:text-secondary transition-colors">Eventos</a>
          <a href="#contacto" className="hover:text-secondary transition-colors">Contacto</a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/50 text-xs">
        © 2026 Club Costa. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
