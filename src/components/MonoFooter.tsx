import logoTerciaria from "@/assets/logo-terciaria-bege.svg";
import instagramIcon from "@/assets/icon-instagram.svg";

const footerLinks = {
  Produtos: ["Coleções", "Manuais", "Catálogo"],
  Sobre: ["Empresa", "Contato"]
};

const Footer = () => {
  return (
    <footer id="contato" style={{ backgroundColor: "hsl(var(--mono-bg-dark))" }} className="pt-16 pb-8">
      <div className="section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) =>
          <div key={category}>
              <h4 className="text-xs font-body uppercase tracking-widest text-secondary-foreground/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) =>
              <li key={link}>
                    <a
                  href="#"
                  className="text-sm font-body text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  
                      {link}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
          <div>
            <h4 className="text-xs font-body uppercase tracking-widest text-secondary-foreground/50 mb-4">
              Endereço
            </h4>
            <address className="not-italic text-sm font-body text-secondary-foreground/70 leading-relaxed">
              Av. Osvaldo Reis, 3281 - Praia Brava
              <br />
              Itajaí - SC, 88306-773
            </address>
          </div>
          <div>
            <h4 className="text-xs font-body uppercase tracking-widest text-secondary-foreground/50 mb-4">
              Siga-nos
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mono.brasil"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Instagram">
                
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-secondary-foreground/10 pt-8">
          <img src={logoTerciaria} alt="MONO" className="w-28 opacity-40" />
        </div>
      </div>
    </footer>);

};

export default Footer;