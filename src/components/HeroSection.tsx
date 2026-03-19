import heroImg from "@/assets/FOTO1.jpg";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={heroImg}
          alt="Comunidad Club Costa"
          className="w-full h-full object-cover animate-zoom-slow will-change-transform animate-zoom-slow-css"
        />
      </div>

      {/* Gradient overlays removed */}

      {/* Floating glass orbs for depth */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/6 w-48 h-48 rounded-full bg-yellow/3 blur-2xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="animate-fade-in-up">
          <div className="glass inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm text-white/70">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Centro Cultural · Comunidad · Experiencias
          </div>
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.05] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Bienvenido a{" "}
          <span className="text-gradient-yellow">Club Costa</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Cultura, viajes y experiencias que conectan personas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/convivencias-retiros"
            className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold px-8 py-4 rounded-2xl text-base hover:bg-yellow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,212,59,0.3)]"
          >
            Explorar convivencias
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/novedades"
            className="glass glass-hover inline-flex items-center gap-2 text-white/80 font-medium px-8 py-4 rounded-2xl text-base transition-all duration-300"
          >
            <CalendarDays className="w-4 h-4" />
            Ver novedades
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
    </section>
  );
};

export default HeroSection;
