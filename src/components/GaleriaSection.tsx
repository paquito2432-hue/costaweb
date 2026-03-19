import { useState } from "react";
import { X } from "lucide-react";
import foto1 from "@/assets/FOTO1.jpg";
import fotoN1 from "@/assets/FOTONUTRICION1.jpg";
import fotoN2 from "@/assets/FOTONUTRICION2.jpg";
import fotoR1 from "@/assets/FOTORENZOTERTULIA1.jpg";
import fotoR2 from "@/assets/FOTORENZOTERTULIA2.jpg";
import actTaller from "@/assets/activity-taller.jpg";

const images = [
  { src: foto1, alt: "Comunidad Club Costa" },
  { src: fotoN1, alt: "Charla de nutrición" },
  { src: fotoR1, alt: "Tertulia cultural" },
  { src: fotoN2, alt: "Evento al aire libre" },
  { src: fotoR2, alt: "Grupo de tertulia" },
  { src: actTaller, alt: "Taller creativo" },
];

const GaleriaSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 md:py-32 bg-gradient-navy-subtle relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-yellow/3 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Momentos</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">Galería</h2>
          <p className="text-muted-foreground text-lg font-light">Momentos que nos definen.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer rounded-2xl overflow-hidden group relative"
              onClick={() => setSelected(i)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/30 transition-colors duration-300 rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass px-4 py-2 rounded-xl">
                  <p className="text-foreground/80 text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          style={{ background: "rgba(5, 12, 23, 0.95)", backdropFilter: "blur(20px)" }}
        >
          <button
            className="absolute top-6 right-6 glass w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[selected].src}
            alt={images[selected].alt}
            className="max-w-full max-h-[85vh] rounded-2xl object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GaleriaSection;
