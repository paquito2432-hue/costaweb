import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CentroCulturalTour from "./pages/CentroCulturalTour.tsx";
import ConvivenciasRetiros from "./pages/ConvivenciasRetiros.tsx";
import Novedades from "./pages/Novedades.tsx";
import ClubEscolar from "./pages/ClubEscolar.tsx";
import CentroCultural from "./pages/CentroCultural.tsx";
import CodigoDeHonor from "./pages/CodigoDeHonor.tsx";
import Contactanos from "./pages/Contactanos.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/centrocultural" element={<CentroCulturalTour />} />
          <Route path="/convivencias-retiros" element={<ConvivenciasRetiros />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/club-escolar" element={<ClubEscolar />} />
          <Route path="/centro-cultural" element={<CentroCultural />} />
          <Route path="/codigo-de-honor" element={<CodigoDeHonor />} />
          <Route path="/contactanos" element={<Contactanos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
