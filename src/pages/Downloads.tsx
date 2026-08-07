import { useEffect } from "react";
import { Monitor, BookOpen, FileText, Wrench, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import MonoFooter from "@/components/MonoFooter";

const documentos = [
  { label: "Book de Obras", icon: Monitor },
  { label: "Catálogo", icon: BookOpen },
  { label: "Ficha Técnica", icon: FileText },
  { label: "Manual de Instalação", icon: Wrench },
  { label: "Termo de Garantia", icon: Shield },
];

const Downloads = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="section-padding py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left — Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-heading uppercase tracking-wider text-foreground">
                Catálogo
              </h1>
              <div className="w-12 h-0.5 bg-foreground" />
              <p className="text-sm text-muted-foreground font-body">
                Acesse os materiais exclusivos da Mono para seus projetos
              </p>
            </div>

            <div className="border-t border-mono-accent/30 pt-6">
              <p className="text-sm font-body font-medium text-foreground mb-6">
                Preencha o formulário para acessar:
              </p>
              <div className="space-y-5">
                {documentos.map((doc) => (
                  <div key={doc.label} className="flex items-center gap-4">
                    <doc.icon size={20} className="text-muted-foreground shrink-0" />
                    <span className="text-sm font-body text-foreground/80">{doc.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/FCGsCMpDTKXcNsdZKqzc"
            style={{ width: "100%", height: "888px", border: "none", borderRadius: "3px" }}
            id="inline-FCGsCMpDTKXcNsdZKqzc"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="[02] [MONO] [FORM] [DOWNLOAD CATALOGO SITE]"
            data-height="888"
            data-layout-iframe-id="inline-FCGsCMpDTKXcNsdZKqzc"
            data-form-id="FCGsCMpDTKXcNsdZKqzc"
            title="[02] [MONO] [FORM] [DOWNLOAD CATALOGO SITE]"
          />
        </div>
      </div>

      <MonoFooter />
    </div>
  );
};

export default Downloads;
