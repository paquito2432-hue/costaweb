import { useState, useEffect, useCallback } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Calendar, MapPin } from "lucide-react";

// Importar imágenes de eventos
import nutricionImg from "@/assets/Eventos/FOTONUTRICION1.jpg";
import navidad1 from "@/assets/Eventos/NAVIDADCOSTA1.jpg";
import navidad2 from "@/assets/Eventos/NAVIDADCOSTA2.jpg";
import navidad3 from "@/assets/Eventos/NAVIDADCOSTA3.jpg";
import visita1 from "@/assets/Eventos/VISITAFERNANDO1.jpg";
import visita2 from "@/assets/Eventos/VISITAFERNANDO2.jpg";
import visita3 from "@/assets/Eventos/VISITAFERNANDO3.jpg";

const eventos = [
  {
    titulo: "Charla de Nutrición para Deportistas Adolescentes",
    descripcion: "Agradecimiento especial a la Lic. Grace de la Fuente por su charla sobre nutrición para deportistas adolescentes. Una experiencia llena de aprendizajes sobre alimentación balanceada, crecimiento y rendimiento deportivo, con herramientas valiosas para padres y jóvenes.",
    imagenes: [nutricionImg],
    fecha: "15 Mar 2026",
    lugar: "Sala de Conferencias",
  },
  {
    titulo: "Navidad en Costa 2025: Una celebración llena de alegría y unión familiar",
    descripcion: "Celebramos juntos la Navidad en Costa 2025, una tarde especial llena de alegría, esperanza y unión. La oración, los cantos, los juegos y la unión familiar hicieron de este encuentro algo inolvidable. Un sincero agradecimiento a todas las familias que nos acompañaron durante el año.",
    imagenes: [navidad1, navidad2, navidad3],
    fecha: "24 Dic 2025",
    lugar: "Jardines Club Costa",
  },
  {
    titulo: "Visita del Padre Fernando, Prelado del Opus Dei",
    descripcion: "El Padre Fernando, Prelado del Opus Dei, visitó Lima y Club Costa tuvo el honor de estar presente en este encuentro especial. Una cálida bienvenida al Perú para el Padre Fernando en un momento de gran significado espiritual y comunitario.",
    imagenes: [visita1, visita2, visita3],
    fecha: "10 Feb 2026",
    lugar: "Terraza Principal",
  },
];

// Componente de carrusel con dots interactivos
interface EventoCarouselProps {
  imagenes: string[];
  titulo: string;
}

const EventoCarousel = ({ imagenes, titulo }: EventoCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!api || !autoplay || imagenes.length <= 1) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Volver al inicio si está al final
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api, autoplay, imagenes.length]);

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setAutoplay(false); // Detener autoplay al interacción manual
      setTimeout(() => setAutoplay(true), 10000); // Reanudar después de 10 segundos
    }
  };

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  return (
    <div className="relative rounded-3xl overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {imagenes.map((img, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`${titulo} - Imagen ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {imagenes.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-full border-0 shadow-xl hover:bg-white/30 backdrop-blur-md" />
            <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-full border-0 shadow-xl hover:bg-white/30 backdrop-blur-md" />
          </>
        )}
      </Carousel>

      {/* Indicadores de puntos interactivos */}
      {imagenes.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {imagenes.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                i === current ? "bg-white scale-150 shadow-lg" : "bg-white/70 hover:bg-white hover:scale-110"
              }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador de slides */}
      {imagenes.length > 1 && (
        <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full text-sm font-medium text-white/90 backdrop-blur-md">
          {current + 1} / {imagenes.length}
        </div>
      )}
    </div>
  );
};

const EventosSection = () => {
  return (
    <section id="eventos" className="py-24 md:py-32 bg-gradient-navy relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Calendario</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-5">Eventos</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto font-light">
            Momentos especiales de nuestra comunidad.
          </p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto">
          {eventos.map((evento, idx) => (
            <div key={idx} className="glass-card p-12 rounded-3xl flex flex-col lg:flex-row gap-12 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500">
              {/* Carrusel - LADO IZQUIERDO - GRANDE */}
              <div className="lg:w-7/12">
                <EventoCarousel imagenes={evento.imagenes} titulo={evento.titulo} />
              </div>

              {/* Información del evento - LADO DERECHO */}
              <div className="lg:w-5/12 flex flex-col justify-center">
                <h3 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">{evento.titulo}</h3>
                <p className="text-muted-foreground text-base mb-10 leading-relaxed">{evento.descripcion}</p>

                <div className="space-y-5 mb-12">
                  <div className="flex items-center gap-4 text-base text-foreground/70">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{evento.fecha}</span>
                  </div>
                  <div className="flex items-center gap-4 text-base text-foreground/70">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">{evento.lugar}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Cada evento es una oportunidad para conectar, aprender y celebrar juntos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventosSection;