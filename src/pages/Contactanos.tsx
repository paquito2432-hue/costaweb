import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactoSection from "@/components/ContactoSection";

const Contactanos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contactanos;