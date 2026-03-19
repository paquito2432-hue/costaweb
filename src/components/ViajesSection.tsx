import { MapPin, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VideoPlayer } from "@/components/ui/video-player";

import chiclayo1 from "@/assets/Viajes/CHICLAYO20251.jpg";
import chiclayo2 from "@/assets/Viajes/CHICLAYO20252.jpg";
import chiclayo3 from "@/assets/Viajes/CHICLAYO20253.jpg";
import yauyosVideo from "@/assets/Viajes/YAUYOS1.mp4";

const trips = [
  {
    dest: "Chiclayo",
    country: "Perú",
    date: "Próximamente 2026",
    desc: "Descubre la riqueza cultural y arqueológica de la costa norte peruana.",
    images: [chiclayo1, chiclayo2, chiclayo3],
    type: "carousel"
  },
  {
    dest: "Yauyos",
    country: "Perú",
    date: "Próximamente 2026",
    desc: "Aventúrate en los paisajes andinos y cascadas espectaculares de la sierra limeña.",
    video: yauyosVideo,
    type: "video"
  },
];

const ViajesSection = () => {
  const chiclayoTrip = trips[0];
  const yauyosTrip = trips[1];

  return (
    <section id="viajes" className="py-24 md:py-32 bg-gradient-navy-subtle relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Destinos</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">Viajes</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto font-light">
            Explora nuevos destinos con Club Costa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Columna izquierda: Carrusel de Chiclayo */}
          <div className="group relative rounded-none overflow-hidden h-[480px] glass-card border-0 shadow-none bg-transparent backdrop-filter-none">
            <Carousel className="absolute inset-0 w-full h-full">
              <CarouselContent className="h-full ml-0">
                {chiclayoTrip.images.map((img, idx) => (
                  <CarouselItem key={idx} className="h-full pl-0">
                    <img
                      src={img}
                      alt={`${chiclayoTrip.dest} ${idx + 1}`}
                      className="w-full h-full object-cover min-w-full min-h-full"
                      style={{ objectPosition: 'center' }}
                      loading="lazy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/90">
                  <MapPin className="w-3 h-3" /> {chiclayoTrip.country}
                </span>
                <span className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/90">
                  <Calendar className="w-3 h-3" /> {chiclayoTrip.date}
                </span>
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-3">{chiclayoTrip.dest}</h3>
              <p className="text-white/80 text-sm mb-0 leading-relaxed max-w-sm">{chiclayoTrip.desc}</p>
            </div>
          </div>

          {/* Columna derecha: Video de Yauyos */}
          <div className="group relative rounded-2xl overflow-hidden h-[480px] glass-card">
            <VideoPlayer
              src={yauyosTrip.video}
              className="absolute inset-0 w-full h-full"
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute bottom-16 left-0 right-0 p-8 pointer-events-none z-30">
              <div className="flex items-center gap-4 mb-4">
                <span className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/90">
                  <MapPin className="w-3 h-3" /> {yauyosTrip.country}
                </span>
                <span className="glass inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/90">
                  <Calendar className="w-3 h-3" /> {yauyosTrip.date}
                </span>
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-3">{yauyosTrip.dest}</h3>
              <p className="text-white/80 text-sm mb-0 leading-relaxed max-w-sm">{yauyosTrip.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViajesSection;
