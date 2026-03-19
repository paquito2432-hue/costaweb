import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImg from "@/assets/FOTO1.jpg";
import chiclayo1 from "@/assets/Viajes/CHICLAYO20251.jpg";
import chiclayo2 from "@/assets/Viajes/CHICLAYO20252.jpg";
import chiclayo3 from "@/assets/Viajes/CHICLAYO20253.jpg";
import yauyosVideo from "@/assets/Viajes/YAUYOS1.mp4";
import { Link } from "react-router-dom";

const ConvivenciasRetiros = () => {
  // Configuración del carrusel Embla para Chiclayo
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section con fondo igual al inicio */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background image container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={heroImg}
            alt="Convivencias y Retiros - Club Costa"
            className="w-full h-full object-cover animate-zoom-slow will-change-transform animate-zoom-slow-css"
          />
        </div>

        {/* Floating glass orbs for depth */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/6 w-48 h-48 rounded-full bg-yellow/3 blur-2xl animate-float" style={{ animationDelay: "2s" }} />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="animate-fade-in-up">
            <div className="glass inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm text-white/70">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Espiritualidad · Comunidad · Crecimiento
            </div>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.05] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Convivencias &{" "}
            <span className="text-gradient-yellow">Retiros</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Espacios de encuentro, reflexión y crecimiento personal en comunidad.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
      </section>

      {/* Contenido principal - Viajes y Experiencias */}
      <main className="container mx-auto px-6 py-24">
        {/* Sección de Viajes */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Viajes & <span className="text-gradient-yellow">Experiencias</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestras aventuras espirituales y comunitarias a través de estos destinos especiales.
            </p>
          </div>

          {/* Tabs para separar Convivencias y Retiros */}
          <Tabs defaultValue="convivencias" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass rounded-2xl p-1">
              <TabsTrigger value="convivencias" className="text-lg font-heading font-bold py-3 glass-hover data-[state=active]:glass data-[state=active]:bg-background/20 data-[state=active]:text-foreground rounded-xl transition-all duration-300">
                Convivencias
              </TabsTrigger>
              <TabsTrigger value="retiros" className="text-lg font-heading font-bold py-3 glass-hover data-[state=active]:glass data-[state=active]:bg-background/20 data-[state=active]:text-foreground rounded-xl transition-all duration-300">
                Retiros
              </TabsTrigger>
            </TabsList>

            {/* Tab de Convivencias */}
            <TabsContent value="convivencias" className="space-y-12">
              {/* Galería Chiclayo - Carrusel */}
              <div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Convivencia en Chiclayo 2025
                </h3>

                <div className="embla overflow-hidden rounded-2xl glass">
                  <div className="embla__viewport overflow-hidden rounded-2xl" ref={emblaRef} style={{ cursor: 'grab' }}>
                    <div className="embla__container flex">
                      {[chiclayo1, chiclayo2, chiclayo3].map((img, index) => (
                        <div className="embla__slide flex-[0_0_100%] min-w-0 pl-4" key={index}>
                          <div className="glass rounded-2xl overflow-hidden h-full">
                            <img
                              src={img}
                              alt={`Chiclayo 2025 - Imagen ${index + 1}`}
                              className="w-full h-[400px] md:h-[500px] object-cover"
                            />
                            <div className="p-6">
                              <p className="text-lg text-foreground/80 font-medium">
                                {index === 0 && "Momento de oración comunitaria"}
                                {index === 1 && "Compartiendo experiencias"}
                                {index === 2 && "Celebración final del retiro"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-6 gap-2">
                    <button
                      className="embla__prev bg-secondary text-secondary-foreground p-3 rounded-full hover:bg-yellow-soft transition-colors"
                      onClick={() => emblaApi && emblaApi.scrollPrev()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>
                    <div className="flex gap-2 mx-4">
                      {scrollSnaps.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === selectedIndex ? 'bg-secondary' : 'bg-foreground/20'
                          }`}
                          onClick={() => scrollTo(index)}
                          aria-label={`Ir a slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      className="embla__next bg-secondary text-secondary-foreground p-3 rounded-full hover:bg-yellow-soft transition-colors"
                      onClick={() => emblaApi && emblaApi.scrollNext()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 mt-6">
                  <p className="text-foreground/80">
                    Nuestra convivencia anual en Chiclayo reúne a miembros de toda la comunidad para compartir,
                    aprender y fortalecer los lazos espirituales. Tres días intensos de talleres, oración y
                    actividades recreativas que renovaron el espíritu de todos los participantes.
                  </p>
                </div>
              </div>

              {/* Próximas Convivencias */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Próximas Convivencias
                </h3>
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Convivencia Juvenil:</strong> Para jóvenes de 15-25 años en la sierra central.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Convivencia de Verano:</strong> Encuentro comunitario en la playa para todas las edades.</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/contactanos"
                    className="inline-block bg-secondary text-secondary-foreground font-heading font-bold px-6 py-3 rounded-xl hover:bg-yellow-soft transition-all duration-300"
                  >
                    Más información e inscripciones
                  </Link>
                </div>
              </div>
            </TabsContent>

            {/* Tab de Retiros */}
            <TabsContent value="retiros" className="space-y-12">
              {/* Video Yauyos */}
              <div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Retiro en Yauyos
                </h3>
                <div className="glass rounded-2xl overflow-hidden max-w-2xl mx-auto">
                  <video
                    src={yauyosVideo}
                    controls
                    className="w-full h-auto"
                    poster={chiclayo1} // Usar primera imagen como poster
                  >
                    Tu navegador no soporta el elemento de video.
                  </video>
                  <div className="p-6">
                    <p className="text-foreground/80">
                      Experiencia transformadora en las montañas de Yauyos. Un retiro espiritual donde la naturaleza
                      se convierte en el escenario perfecto para la reflexión y el crecimiento personal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Próximos Retiros */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Próximos Retiros
                </h3>
                <ul className="space-y-4 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Retiro de Semana Santa 2025:</strong> En las playas de Paracas. Inscripciones abiertas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Retiro Familiar:</strong> Fin de semana diseñado para familias completas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span><strong>Retiro de Silencio:</strong> Experiencia contemplativa en monasterio.</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/contactanos"
                    className="inline-block bg-secondary text-secondary-foreground font-heading font-bold px-6 py-3 rounded-xl hover:bg-yellow-soft transition-all duration-300"
                  >
                    Más información e inscripciones
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <style>{`
        .embla {
          --slide-spacing: 1rem;
          --slide-size: 100%;
        }
        .embla__viewport {
          overflow: hidden;
          border-radius: 1rem;
        }
        .embla__container {
          backface-visibility: hidden;
          display: flex;
          touch-action: pan-y;
          margin-left: calc(var(--slide-spacing) * -1);
        }
        .embla__slide {
          transform: translate3d(0, 0, 0);
          flex: 0 0 var(--slide-size);
          min-width: 0;
          padding-left: var(--slide-spacing);
        }
        .embla__slide img {
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default ConvivenciasRetiros;