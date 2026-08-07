import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Orcamento from "./pages/Orcamento";
import Downloads from "./pages/Downloads";
import Sobre from "./pages/Sobre";
import ProdutoRipado from "./pages/ProdutoRipado";
import ProdutoLiso from "./pages/ProdutoLiso";
import ProdutoPedraFlexivel from "./pages/ProdutoPedraFlexivel";
import ProdutosListing from "./pages/ProdutosListing";
import ObrigadoCatalogo from "./pages/ObrigadoCatalogo";
import ObrigadoOrcamento from "./pages/ObrigadoOrcamento";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/produtos" element={<ProdutosListing />} />
          <Route path="/produtos/ripado" element={<ProdutoRipado />} />
          <Route path="/produtos/liso" element={<ProdutoLiso />} />
          <Route path="/produtos/pedra-flexivel" element={<ProdutoPedraFlexivel />} />
          <Route path="/obrigado/catalogo" element={<ObrigadoCatalogo />} />
          <Route path="/obrigado/orcamento" element={<ObrigadoOrcamento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingWhatsApp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
