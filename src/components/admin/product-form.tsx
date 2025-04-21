import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormData } from "@/types/product";
import { createProduct, updateProduct, uploadProductImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
  onSuccess: () => void;
}

export function ProductForm({ initialData, productId, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      name: "",
      price: 0,
      description: "",
      category: "",
      subcategory: "",
      image: "",
      images: [],
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: true,
      details: [""],
      care: [""],
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    arrayName: "sizes" | "details" | "care"
  ) => {
    setFormData((prev) => {
      const array = [...(prev[arrayName] || [])];
      array[index] = value;
      return { ...prev, [arrayName]: array };
    });
  };

  const addArrayItem = (arrayName: "sizes" | "details" | "care") => {
    setFormData((prev) => {
      const array = [...(prev[arrayName] || []), ""];
      return { ...prev, [arrayName]: array };
    });
  };

  const removeArrayItem = (index: number, arrayName: "sizes" | "details" | "care") => {
    setFormData((prev) => {
      const array = [...(prev[arrayName] || [])];
      array.splice(index, 1);
      return { ...prev, [arrayName]: array };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAdditionalImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;
      
      // Upload main image if provided
      if (imageFile) {
        const uploadedUrl = await uploadProductImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      // Upload additional images if provided
      let additionalImages = formData.images || [];
      if (additionalImageFiles.length > 0) {
        for (const file of additionalImageFiles) {
          const uploadedUrl = await uploadProductImage(file);
          if (uploadedUrl) {
            additionalImages = [...additionalImages, uploadedUrl];
          }
        }
      }

      const productData = {
        ...formData,
        image: imageUrl,
        images: additionalImages,
        price: Number(formData.price),
      };

      let result;
      if (productId) {
        // Update existing product
        result = await updateProduct(productId, productData);
        if (result) {
          toast({
            title: "Success",
            description: "Product updated successfully",
          });
        }
      } else {
        // Create new product
        result = await createProduct(productData);
        if (result) {
          toast({
            title: "Success",
            description: "Product created successfully",
          });
        }
      }

      if (result) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "There was a problem saving the product",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="subcategory">Subcategory (Optional)</Label>
          <Input
            id="subcategory"
            name="subcategory"
            value={formData.subcategory || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="inStock"
            checked={formData.inStock}
            onCheckedChange={(checked) => handleSwitchChange("inStock", checked)}
          />
          <Label htmlFor="inStock">In Stock</Label>
        </div>

        <div>
          <Label htmlFor="mainImage">Main Product Image</Label>
          <div className="flex items-center gap-4 mt-2">
            {formData.image && (
              <div className="relative w-24 h-24 bg-gray-100 rounded">
                <img
                  src={formData.image}
                  alt="Product"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <Input
              id="mainImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="additionalImages">Additional Images</Label>
          <Input
            id="additionalImages"
            type="file"
            accept="image/*"
            onChange={handleAdditionalImagesChange}
            className="mt-2"
            multiple
          />
          
          <div className="grid grid-cols-5 gap-4 mt-4">
            {/* Existing images */}
            {formData.images?.map((img, index) => (
              <div key={`existing-${index}`} className="relative w-full aspect-square bg-gray-100 rounded">
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
            
            {/* New images to be uploaded */}
            {additionalImageFiles.map((file, index) => (
              <div key={`new-${index}`} className="relative w-full aspect-square bg-gray-100 rounded">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New upload ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>Sizes</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => addArrayItem("sizes")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Size
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.sizes?.map((size, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={size}
                  onChange={(e) => handleArrayChange(index, e.target.value, "sizes")}
                  placeholder="Size"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "sizes")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>Product Details</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => addArrayItem("details")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Detail
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.details?.map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={detail}
                  onChange={(e) => handleArrayChange(index, e.target.value, "details")}
                  placeholder="Product detail"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "details")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label>Care Instructions</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => addArrayItem("care")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Care Instruction
            </Button>
          </div>
          <div className="space-y-2 mt-2">
            {formData.care?.map((care, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={care}
                  onChange={(e) => handleArrayChange(index, e.target.value, "care")}
                  placeholder="Care instruction"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "care")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
