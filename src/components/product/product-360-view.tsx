
import { useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product360ViewProps {
  images: string[];
  productName: string;
}

export function Product360View({ images, productName }: Product360ViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Mouse drag rotation
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
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
      >
        <img
          src={images[currentImageIndex]}
          alt={`${productName} - View ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
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
    </div>
  );
}
