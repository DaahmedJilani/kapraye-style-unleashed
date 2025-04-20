
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Product360View } from "./product-360-view";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  has360View?: boolean;
  images360?: string[];
}

export function ProductGallery({ 
  images, 
  productName,
  has360View = false,
  images360 = []
}: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [view360Mode, setView360Mode] = useState(false);

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="overflow-hidden rounded-none bg-gray-50 cursor-zoom-in">
            <div className="relative pb-[125%]">
              {view360Mode && has360View ? (
                <Product360View images={images360} productName={productName} />
              ) : (
                <img
                  src={mainImage}
                  alt={productName}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300 hover:scale-105"
                />
              )}
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
                      alt={`${productName} ${index + 1}`}
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
        {has360View && (
          <button
            onClick={() => setView360Mode(!view360Mode)}
            className={`relative overflow-hidden ${
              view360Mode ? "ring-1 ring-kapraye-burgundy" : ""
            }`}
          >
            <div className="pb-[100%] relative bg-gray-100 flex items-center justify-center">
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
                360°
              </span>
            </div>
          </button>
        )}
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setMainImage(image);
              setView360Mode(false);
            }}
            className={`relative overflow-hidden ${
              mainImage === image && !view360Mode ? "ring-1 ring-kapraye-burgundy" : ""
            }`}
          >
            <div className="pb-[100%] relative">
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
