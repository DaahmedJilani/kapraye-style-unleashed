
import { useState, useEffect } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Product360ViewProps {
  images: string[];
  productName: string;
}

export function Product360View({ images, productName }: Product360ViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [autoRotateIntervalId, setAutoRotateIntervalId] = useState<number | null>(null);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setImagesLoaded(prev => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
        });
      });
      await Promise.all(loadPromises);
      setIsLoading(false);
    };

    preloadImages();

    // Initial auto-rotate for 3 seconds
    const id = window.setTimeout(() => {
      startAutoRotate();
      // Stop auto-rotate after 3 full rotations
      window.setTimeout(() => {
        stopAutoRotate();
      }, 5000);
    }, 1000);

    return () => {
      window.clearTimeout(id);
      if (autoRotateIntervalId) {
        window.clearInterval(autoRotateIntervalId);
      }
    };
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Start auto-rotate function
  const startAutoRotate = () => {
    if (autoRotateIntervalId) return;
    setIsAutoRotating(true);
    const id = window.setInterval(() => {
      nextImage();
    }, 120);
    setAutoRotateIntervalId(id as unknown as number);
  };

  // Stop auto-rotate function
  const stopAutoRotate = () => {
    if (autoRotateIntervalId) {
      window.clearInterval(autoRotateIntervalId);
      setAutoRotateIntervalId(null);
    }
    setIsAutoRotating(false);
  };

  // Mouse drag rotation
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoRotate();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoRotate();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 20) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      setStartX(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 20) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      setStartX(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full aspect-square bg-gray-50">
      <div
        className="relative w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-600">Loading 360° view...</span>
          </div>
        ) : (
          <img
            src={images[currentImageIndex]}
            alt={`${productName} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 text-white text-sm">
          <CircleArrowLeft className="h-5 w-5" />
          <span>Drag to rotate</span>
          <CircleArrowRight className="h-5 w-5" />
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={previousImage}
          className="bg-black/50 text-white hover:bg-black/70 pointer-events-auto"
        >
          <CircleArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextImage}
          className="bg-black/50 text-white hover:bg-black/70 pointer-events-auto"
        >
          <CircleArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {!isLoading && (
        <Button
          variant="outline"
          size="sm"
          onClick={isAutoRotating ? stopAutoRotate : startAutoRotate}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 text-xs rounded-md"
        >
          {isAutoRotating ? "Stop Rotation" : "Auto-Rotate"}
        </Button>
      )}
    </div>
  );
}
