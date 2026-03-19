import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ClubEscolar = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8">
          Club Escolar
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Actividades educativas y formativas para estudiantes.
        </p>
        <div className="glass rounded-2xl p-8 mt-8">
          <p className="text-foreground/80">
            Contenido en desarrollo. Pronto encontrarás información sobre nuestras actividades escolares y programas educativos.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubEscolar;