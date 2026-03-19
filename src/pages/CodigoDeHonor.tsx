import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CodigoDeHonor = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-24">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8">
          Código de Honor
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Los principios y valores que guían nuestra comunidad.
        </p>
        <div className="glass rounded-2xl p-8 mt-8">
          <p className="text-foreground/80">
            Contenido en desarrollo. Pronto encontrarás nuestro código de honor y los valores fundamentales del Club Costa.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CodigoDeHonor;