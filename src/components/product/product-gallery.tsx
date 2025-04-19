
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-zoom-in">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${
              mainImage === image ? "ring-2 ring-kapraye-burgundy" : ""
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
