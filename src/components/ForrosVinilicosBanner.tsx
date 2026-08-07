import forrosHero from "@/assets/forros-hero.jpg";

const ForrosVinilicosBanner = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[420px] md:h-[68vh] overflow-hidden bg-[#1A1A1A]">
      <img
        src={forrosHero}
        alt="Forro vinílico de madeira em ambiente moderno"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/45" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs md:text-sm font-body uppercase tracking-[0.4em] text-white/70 mb-4 md:mb-6">
          MONO Revestimentos
        </p>
        <h1 className="font-heading font-bold text-white leading-[1.1] drop-shadow-lg">
          <span style={{ fontSize: "clamp(32px, 5vw, 68px)" }}>Forros Vinílicos</span>
        </h1>
        <div className="w-16 h-px bg-white/60 mt-6 md:mt-8" />
      </div>
    </section>
  );
};

export default ForrosVinilicosBanner;
