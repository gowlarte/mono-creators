import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface BentoGalleryProps {
  images: GalleryImage[];
}

const BentoGallery = ({ images }: BentoGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  // Bento grid layout patterns based on image count
  const getGridClass = (index: number, total: number): string => {
    if (total <= 2) return "aspect-[4/3]";
    if (total === 3) {
      if (index === 0) return "row-span-2 aspect-auto h-full";
      return "aspect-[4/3]";
    }
    if (total === 4) {
      if (index === 0) return "col-span-2 aspect-[16/9]";
      return "aspect-square";
    }
    // 5+
    if (index === 0) return "col-span-2 row-span-2 aspect-auto h-full";
    return "aspect-[4/3]";
  };

  const getGridCols = (total: number): string => {
    if (total <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (total === 3) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-2 sm:grid-cols-3";
  };

  return (
    <>
      <div className={`grid ${getGridCols(images.length)} gap-2 auto-rows-auto`}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-lg cursor-pointer group ${getGridClass(i, images.length)}`}
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-background/80 hover:text-background transition-colors"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 lg:left-8 text-background/60 hover:text-background transition-colors"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Anterior"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                className="absolute right-4 lg:right-8 text-background/60 hover:text-background transition-colors"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Próximo"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-6 text-background/60 text-sm font-body">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default BentoGallery;
