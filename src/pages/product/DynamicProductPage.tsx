
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { SimilarItems } from "@/components/product/similar-items";
import { useToast } from "@/hooks/use-toast";
import { useWooCommerceCart } from "@/contexts/WooCommerceCartContext";
import { WCProduct, woocommerceApi } from "@/lib/woocommerce";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function DynamicProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useWooCommerceCart();
  const [product, setProduct] = useState<WCProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setError('No product slug provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const productData = await woocommerceApi.getProductBySlug(slug);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (product.attributes?.some(attr => attr.name.toLowerCase().includes('size')) && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await addItem(product, quantity, undefined, selectedSize);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10 mt-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10 mt-16 max-w-7xl">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const productImages = product.images?.map(img => img.src) || [];
  const hasSize = product.attributes?.some(attr => attr.name.toLowerCase().includes('size'));
  const sizeOptions = hasSize ? 
    product.attributes?.find(attr => attr.name.toLowerCase().includes('size'))?.options || [] : 
    [];

  return (
    <>
      <Helmet>
        <title>{product.name} - Kaprayé</title>
        <meta name="description" content={product.short_description || product.description} />
        <meta property="og:title" content={`${product.name} - Kaprayé`} />
        <meta property="og:description" content={product.short_description || product.description} />
        <meta property="og:image" content={product.images?.[0]?.src} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="PKR" />
        <link rel="canonical" href={`https://kapraye.com/product/${product.slug}`} />
      </Helmet>

      <MainLayout>
        <div className="container mx-auto px-4 py-10 mt-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <ProductGallery 
                images={productImages} 
                productName={product.name}
                has360View={false}
              />
            </div>
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {/* Product Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <span
                        key={category.id}
                        className="text-sm text-kapraye-burgundy uppercase tracking-wide"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Product Name */}
                <h1 className="text-3xl lg:text-4xl font-playfair font-medium text-gray-900">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-kapraye-burgundy">
                    Rs. {parseFloat(product.price).toLocaleString()}
                  </span>
                  {product.on_sale && product.regular_price && (
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {parseFloat(product.regular_price).toLocaleString()}
                    </span>
                  )}
                  {product.on_sale && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Sale
                    </span>
                  )}
                </div>

                {/* Short Description */}
                {product.short_description && (
                  <div 
                    className="text-gray-600 prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                  />
                )}

                {/* Size Selection */}
                {hasSize && sizeOptions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? 'border-kapraye-burgundy bg-kapraye-burgundy text-white'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-md w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center py-2 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    product.stock_status === 'instock' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm text-gray-600">
                    {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock_status !== 'instock'}
                  className="w-full h-12 bg-kapraye-burgundy hover:bg-kapraye-burgundy/90 text-white font-medium"
                  size="lg"
                >
                  {product.stock_status === 'instock' ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                {/* Product SKU */}
                {product.sku && (
                  <div className="text-sm text-gray-500">
                    SKU: {product.sku}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details and Similar Items */}
          <div className="mt-16 space-y-16">
            {product.description && (
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-playfair font-medium mb-6">Product Details</h2>
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            )}
            
            <SimilarItems currentProductId={product.id.toString()} />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
