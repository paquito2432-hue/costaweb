import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactoSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el teléfono esté presente (obligatorio)
    if (!form.phone) {
      alert("Por favor, ingresa tu número de teléfono para contactarte.");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar datos al webhook
      const response = await fetch("https://n8n.neuralia.lat/webhook/costa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: "club-costa-website",
        }),
      });

      if (response.ok) {
        alert("¡Gracias por tu mensaje! Te contactaremos pronto.");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error enviando formulario:", error);
      alert("Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contactanos" className="py-24 md:py-32 bg-gradient-navy-subtle relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-secondary text-sm font-semibold tracking-widest uppercase mb-3">Hablemos</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">Contacto</h2>
          <p className="text-muted-foreground text-lg font-light">¿Tienes preguntas? Escríbenos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass border-0 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-secondary/30 focus:outline-none transition-all bg-transparent"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            />
            <input
              type="email"
              placeholder="Email (opcional)"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass border-0 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-secondary/30 focus:outline-none transition-all bg-transparent"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            />
            <input
              type="tel"
              placeholder="Teléfono *"
              required
              maxLength={20}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass border-0 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-secondary/30 focus:outline-none transition-all bg-transparent"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            />
            <textarea
              placeholder="Mensaje"
              required
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl glass border-0 text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-secondary/30 focus:outline-none transition-all resize-none bg-transparent"
              style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-heading font-bold py-3.5 rounded-xl hover:bg-yellow-soft transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,212,59,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </>
              )}
            </button>
          </form>

          <div className="space-y-8 flex flex-col justify-center">
            {[
              { icon: Mail, label: "Email", value: "clubcosta@losalamos.edu.pe" },
              { icon: Phone, label: "Teléfono", value: "+51 949 764 945" },
              { icon: MapPin, label: "Ubicación", value: "Jr. Costa Rica 268" },
            ].map((item) => (
              <div key={item.label} className="glass-card flex items-center gap-5 p-5">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground text-sm">{item.label}</h4>
                  <p className="text-muted-foreground text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
