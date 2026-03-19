import tallerImg from "@/assets/activity-taller.jpg";
import deportesImg from "@/assets/activity-deportes.jpg";
import nutricionImg from "@/assets/FOTONUTRICION1.jpg";
import tertuliaImg from "@/assets/FOTORENZOTERTULIA1.jpg";
import { ArrowUpRight } from "lucide-react";

const activities = [
  { title: "Talleres Culturales", desc: "Cerámica, pintura, escritura y más. Expresa tu creatividad en comunidad.", img: tallerImg },
  { title: "Actividades Deportivas", desc: "Fútbol, vóley, running y torneos. Mantente activo con amigos.", img: deportesImg },
  { title: "Charlas de Nutrición", desc: "Aprende sobre alimentación saludable con expertos del club.", img: nutricionImg },
  { title: "Tertulias Culturales", desc: "Conversaciones inspiradoras con profesionales y líderes.", img: tertuliaImg },
];

const ActividadesSection = () => {
  return (
    <section id="actividades" className="py-24 md:py-32 bg-gradient-navy relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Programas</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">
            Actividades
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto font-light">
            Descubre nuevas experiencias cada semana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((a) => (
            <div key={a.title} className="glass-card group cursor-pointer overflow-hidden">
              <div className="h-52 overflow-hidden rounded-t-[var(--radius)]">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-heading text-lg font-bold text-foreground">{a.title}</h3>
                  <ArrowUpRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActividadesSection;
