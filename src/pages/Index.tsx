import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuienesSomosSection from "@/components/QuienesSomosSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <QuienesSomosSection />
      <Footer />
    </div>
  );
};

export default Index;
