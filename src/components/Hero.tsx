import AnimateOnScroll from "./AnimateOnScroll";

const Hero = () => {
  return (
    <section className="bg-[#E8E4DC] py-10 px-6 md:py-16 md:px-16 lg:px-20">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-8">
        {/* Left column — text */}
        <AnimateOnScroll className="flex flex-col items-center md:items-start text-center md:text-left md:w-[40%]">
          <h1
            className="font-heading font-bold leading-[1.2] text-[#6B4426]"
            style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
          >
            Dizem que o essencial é invisível aos olhos
          </h1>
          <p className="text-[16px] text-[#8B7B6B] font-body mt-4 md:block hidden">
            Mas a nossa essência é inevitável.
          </p>
          {/* Mobile: subtitle + button rendered after octagon */}
          <a
            href="/produtos"
            className="hidden md:inline-block mt-7 bg-[#1A1A1A] text-white text-[14px] font-body px-7 py-3.5 rounded hover:opacity-85 transition-opacity"
          >
            Conheça nossos produtos
          </a>
        </AnimateOnScroll>

        {/* Right column — octagon + product image */}
        <AnimateOnScroll className="md:w-[55%] flex justify-center items-center">
          <img
            src="/lovable-uploads/737bbb06-b092-447c-9747-93d276b7dded.png"
            alt="Ripas de madeira empilhadas - revestimentos MONO"
            className="w-[280px] md:w-[400px] h-auto"
            loading="lazy"
          />
        </AnimateOnScroll>

        {/* Mobile-only subtitle + button below octagon */}
        <div className="flex flex-col items-center md:hidden">
          <p className="text-[16px] text-[#8B7B6B] font-body">
            Mas a nossa essência é inevitável.
          </p>
          <a
            href="/produtos"
            className="mt-7 bg-[#1A1A1A] text-white text-[14px] font-body px-7 py-3.5 rounded hover:opacity-85 transition-opacity w-full max-w-[320px] text-center"
          >
            Conheça nossos produtos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
