
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="overflow-hidden rounded-none bg-gray-50 cursor-zoom-in">
            <div className="relative pb-[125%]">
              <img
                src={mainImage}
                alt="Product"
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center h-full p-1">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="max-h-[80vh] object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative overflow-hidden ${
              mainImage === image ? "ring-1 ring-kapraye-burgundy" : ""
            }`}
          >
            <div className="pb-[100%] relative">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
