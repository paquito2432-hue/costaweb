const QuienesSomosSection = () => {
  return (
    <section id="quienes-somos" className="py-24 md:py-32 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/3 rounded-full blur-[80px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-left mb-16">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Sobre nosotros</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">¿Quiénes somos?</h2>
          <p className="text-muted-foreground text-lg font-light max-w-3xl">
            Conoce nuestra misión, visión y los valores que nos guían en Club Costa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-secondary">M</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">Misión</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Ser un espacio de encuentro, crecimiento y formación integral para jóvenes y familias,
                promoviendo valores humanos y espirituales a través de actividades culturales, educativas
                y recreativas que fortalezcan la comunidad.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-secondary">V</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">Visión</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Ser el referente de formación juvenil y familiar en nuestra comunidad,
                reconocidos por nuestra excelencia en la promoción de valores, el desarrollo
                integral de las personas y el fortalecimiento de los lazos comunitarios.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-secondary">V</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">Valores</h3>
              </div>
              <ul className="space-y-4 text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Respeto:</strong> Valoramos la dignidad de cada persona y promovemos un trato amable y consideración mutua.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Responsabilidad:</strong> Asumimos con compromiso nuestras acciones y decisiones, tanto individuales como colectivas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Solidaridad:</strong> Nos apoyamos mutuamente, especialmente con quienes más lo necesitan, construyendo una comunidad unida.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Excelencia:</strong> Buscamos dar lo mejor de nosotros en cada actividad, proyecto y relación interpersonal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                  <span><strong>Espiritualidad:</strong> Cultivamos la dimensión espiritual como fuente de sentido y crecimiento personal.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <span className="text-2xl font-heading font-bold text-secondary">+20</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">Años de experiencia</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Desde nuestra fundación, hemos impactado positivamente en la vida de miles de jóvenes y familias,
                organizando convivencias, retiros, actividades culturales y programas formativos que han dejado
                una huella significativa en nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomosSection;