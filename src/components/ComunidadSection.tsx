import { Users, Star, Heart, ArrowRight } from "lucide-react";

const benefits = [
  { icon: Users, title: "Red de Contactos", desc: "Conecta con personas que comparten tus intereses culturales y profesionales." },
  { icon: Star, title: "Experiencias Exclusivas", desc: "Acceso a viajes, eventos y talleres organizados solo para miembros." },
  { icon: Heart, title: "Comunidad Real", desc: "Un espacio de amistad, apoyo y crecimiento personal." },
];

const ComunidadSection = () => {
  return (
    <section id="comunidad" className="py-24 md:py-32 bg-gradient-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Nosotros</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">
            Nuestra Comunidad
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Club Costa es más que un club — es una familia que comparte cultura, aventura y ganas de vivir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {benefits.map((b) => (
            <div key={b.title} className="glass-card p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 mb-6">
                <b.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold px-10 py-4 rounded-2xl text-lg hover:bg-yellow-soft transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,212,59,0.25)]"
          >
            Únete a Club Costa
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComunidadSection;
