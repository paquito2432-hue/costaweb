import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import nuticion1 from "@/assets/Eventos/FOTONUTRICION1.jpg";
import navidad1 from "@/assets/Eventos/NAVIDADCOSTA1.jpg";
import navidad2 from "@/assets/Eventos/NAVIDADCOSTA2.jpg";
import navidad3 from "@/assets/Eventos/NAVIDADCOSTA3.jpg";
import visita1 from "@/assets/Eventos/VISITAFERNANDO1.jpg";
import visita2 from "@/assets/Eventos/VISITAFERNANDO2.jpg";
import visita3 from "@/assets/Eventos/VISITAFERNANDO3.jpg";

const Novedades = () => {
  const categories = [
    {
      title: "Charla de Nutrición",
      description: "Taller educativo sobre alimentación saludable para jóvenes y familias.",
      images: [{ src: nuticion1, alt: "Charla de nutrición en Club Costa" }],
    },
    {
      title: "Celebración Navideña 2024",
      description: "Nuestra tradicional celebración navideña con toda la comunidad.",
      images: [
        { src: navidad1, alt: "Celebración navideña - momento de alegría" },
        { src: navidad2, alt: "Celebración navideña - decoraciones y ambiente festivo" },
        { src: navidad3, alt: "Celebración navideña - compartiendo en comunidad" },
      ],
    },
    {
      title: "Visita Especial",
      description: "Visita especial que enriqueció nuestra comunidad con experiencias únicas.",
      images: [
        { src: visita1, alt: "Visita especial - momento de intercambio" },
        { src: visita2, alt: "Visita especial - actividad grupal" },
        { src: visita3, alt: "Visita especial - compartiendo experiencias" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section con fondo VISITAFERNANDO2 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={visita2}
            alt="Novedades Club Costa - Fondo"
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
              Eventos · Comunidad · Novedades
            </div>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.05] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Nuestras{" "}
            <span className="text-gradient-yellow">Novedades</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Descubre los momentos especiales, eventos y actividades recientes del Club Costa.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
      </section>

      <main className="container mx-auto px-6 py-24">

        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="space-y-8">
              <div className="text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className={`grid gap-6 ${category.images.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {category.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="glass rounded-2xl overflow-hidden group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-foreground/80 text-sm">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 mt-20 text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Quieres estar al día?
          </h3>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
            Síguenos en nuestras redes sociales para no perderte ninguna novedad, evento o actividad especial del Club Costa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-secondary text-secondary-foreground font-heading font-bold px-6 py-3 rounded-xl hover:bg-yellow-soft transition-all duration-300">
              Ver más eventos
            </button>
            <button className="glass glass-hover text-foreground font-medium px-6 py-3 rounded-xl transition-all duration-300">
              Contactar para información
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Novedades;