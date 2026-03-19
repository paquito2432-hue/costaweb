import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CalendarDays, Users, BookOpen, Music, Palette } from "lucide-react";
import { Link } from "react-router-dom";

// Importar imágenes del centro cultural
import grade1 from "@/assets/Centro Cultural/The grade/THEGRADE1.jpeg";
import grade2 from "@/assets/Centro Cultural/The grade/THEGRADE2.jpeg";
import grade3 from "@/assets/Centro Cultural/The grade/THEGRADE3.jpeg";
import grade4 from "@/assets/Centro Cultural/The grade/THEGRADE4.jpeg";
import actividadDeportes from "@/assets/activity-deportes.jpg";
import actividadTaller from "@/assets/activity-taller.jpg";

const CentroCultural = () => {
  const actividades = [
    {
      title: "The Grade",
      description: "Nuestro programa bandera de formación cultural y artística para jóvenes.",
      images: [
        { src: grade1, alt: "Sesión de The Grade - Trabajo en equipo" },
        { src: grade2, alt: "The Grade - Presentación artística" },
        { src: grade3, alt: "The Grade - Actividad grupal" },
        { src: grade4, alt: "The Grade - Creación colaborativa" },
      ],
      icon: <Music className="w-6 h-6" />,
      features: ["Formación artística integral", "Talleres especializados", "Presentaciones públicas", "Desarrollo de habilidades blandas"],
    },
    {
      title: "Actividades Deportivas",
      description: "Programas deportivos para promover la salud y el trabajo en equipo.",
      images: [{ src: actividadDeportes, alt: "Actividad deportiva en Club Costa" }],
      icon: <Users className="w-6 h-6" />,
      features: ["Deportes de equipo", "Actividades recreativas", "Competencias amistosas", "Promoción de vida saludable"],
    },
    {
      title: "Talleres Culturales",
      description: "Espacios de aprendizaje y creación en diversas disciplinas artísticas.",
      images: [{ src: actividadTaller, alt: "Taller cultural en Club Costa" }],
      icon: <Palette className="w-6 h-6" />,
      features: ["Artes plásticas", "Teatro y expresión corporal", "Música y canto", "Literatura y escritura creativa"],
    },
  ];

  const eventos = [
    {
      title: "Exposiciones Artísticas",
      description: "Muestras periódicas de obras creadas por nuestros miembros.",
      date: "Primer sábado de cada mes",
    },
    {
      title: "Noches Culturales",
      description: "Veladas de música, poesía y performances en comunidad.",
      date: "Último viernes de cada mes",
    },
    {
      title: "Talleres Abiertos",
      description: "Sesiones gratuitas para probar diferentes disciplinas artísticas.",
      date: "Cada quincena",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={grade1}
            alt="Centro Cultural Club Costa - Fondo"
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
              Cultura · Arte · Comunidad · Creatividad
            </div>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-[1.05] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Centro{" "}
            <span className="text-gradient-yellow">Cultural</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Un espacio vibrante donde el arte, la cultura y la creatividad se encuentran para transformar vidas y construir comunidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/centro-cultural-tour"
              className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold px-8 py-4 rounded-2xl text-base hover:bg-yellow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,212,59,0.3)]"
            >
              Ver tour virtual
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#actividades"
              className="glass glass-hover inline-flex items-center gap-2 text-white/80 font-medium px-8 py-4 rounded-2xl text-base transition-all duration-300"
            >
              <BookOpen className="w-4 h-4" />
              Explorar actividades
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-24">
        {/* Introducción */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Donde la cultura{" "}
              <span className="text-gradient-yellow">cobra vida</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El Centro Cultural Club Costa es más que un espacio físico: es un ecosistema vivo donde
              el arte se convierte en herramienta de transformación personal y comunitaria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Comunidad Activa</h3>
              <p className="text-foreground/80">Más de 200 miembros participan regularmente en nuestras actividades culturales.</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Programa Continuo</h3>
              <p className="text-foreground/80">Eventos y talleres durante todo el año, adaptados a todas las edades e intereses.</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">Multidisciplinario</h3>
              <p className="text-foreground/80">Desde artes plásticas hasta teatro, música, deporte y expresión corporal.</p>
            </div>
          </div>
        </section>

        {/* Actividades Principales */}
        <section id="actividades" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Nuestras{" "}
              <span className="text-gradient-yellow">Actividades</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Descubre los programas y espacios que hacen del Centro Cultural un lugar único de crecimiento y expresión.
            </p>
          </div>

          <div className="space-y-16">
            {actividades.map((actividad, index) => (
              <div key={index} className={`glass rounded-2xl overflow-hidden ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex`}>
                {/* Galería de imágenes */}
                <div className="md:w-1/2">
                  <div className={`grid gap-2 p-4 ${actividad.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {actividad.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="overflow-hidden rounded-xl aspect-square">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información */}
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      {actividad.icon}
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                      {actividad.title}
                    </h3>
                  </div>

                  <p className="text-foreground/80 mb-6">
                    {actividad.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-heading text-lg font-bold text-foreground mb-3">Características:</h4>
                    <ul className="space-y-2">
                      {actividad.features.map((feature, featIndex) => (
                        <li key={featIndex} className="flex items-start gap-2">
                          <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contactanos"
                    className="inline-block glass glass-hover text-foreground font-medium px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Más información
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Próximos Eventos */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Próximos{" "}
              <span className="text-gradient-yellow">Eventos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mantente al día con nuestra agenda cultural. ¡Hay siempre algo nuevo por descubrir!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eventos.map((evento, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{evento.title}</h3>
                    <p className="text-sm text-foreground/60">{evento.date}</p>
                  </div>
                </div>
                <p className="text-foreground/80 mb-4">{evento.description}</p>
                <button className="text-secondary font-medium text-sm hover:underline">
                  Agregar a mi calendario
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para ser parte de{" "}
            <span className="text-gradient-yellow">nuestra cultura</span>?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Ya sea que quieras participar, colaborar o simplemente conocer más sobre nuestro Centro Cultural,
            estamos aquí para acompañarte en este viaje creativo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contactanos"
              className="inline-block bg-secondary text-secondary-foreground font-heading font-bold px-8 py-4 rounded-2xl hover:bg-yellow-soft transition-all duration-300"
            >
              Inscribirme en actividades
            </Link>
            <Link
              to="/contactanos"
              className="inline-block glass glass-hover text-foreground font-medium px-8 py-4 rounded-2xl transition-all duration-300"
            >
              Contactar para colaborar
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CentroCultural;