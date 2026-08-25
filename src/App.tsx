import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Orcamento from "./pages/Orcamento";
import Downloads from "./pages/Downloads";
import Sobre from "./pages/Sobre";
import Revendedor from "./pages/Revendedor";
import OndeComprar from "./pages/OndeComprar";
import ProdutoRipado from "./pages/ProdutoRipado";
import ProdutoLiso from "./pages/ProdutoLiso";
import ProdutosListing from "./pages/ProdutosListing";
import ProdutosOverview from "./pages/ProdutosOverview";
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
          <Route path="/revendedor" element={<Revendedor />} />
          <Route path="/onde-comprar" element={<OndeComprar />} />
          <Route path="/produtos" element={<ProdutosOverview />} />
          <Route path="/produtos/catalogo" element={<ProdutosListing />} />
          {/* A rota antiga circulou antes de virar /catalogo: redireciona em vez de 404. */}
          <Route
            path="/produtos/carrinho"
            element={<Navigate to="/produtos/catalogo" replace />}
          />
          <Route path="/produtos/ripado" element={<ProdutoRipado />} />
          <Route path="/produtos/liso" element={<ProdutoLiso />} />
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
