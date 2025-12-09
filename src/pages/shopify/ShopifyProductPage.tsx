import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Loader2, ChevronRight, Minus, Plus, ShoppingCart, 
  Heart, Share2, Truck, Shield, RotateCcw, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MainLayout } from '@/components/layout/main-layout';
import { fetchProductByHandle, fetchRelatedProducts } from '@/lib/shopify/api';
import type { ShopifyProduct, CartItem } from '@/lib/shopify/types';
import { useCartStore } from '@/stores/cartStore';
import { RelatedProducts } from '@/components/product/related-products';

export default function ShopifyProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ShopifyProduct['node'][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      
      setLoading(true);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants?.edges?.[0]) {
          setSelectedVariant(data.variants.edges[0].node.id);
          // Initialize selected options from first variant
          const initialOptions: Record<string, string> = {};
          data.variants.edges[0].node.selectedOptions?.forEach(opt => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
        
        // Fetch related products
        if (data?.id) {
          const related = await fetchRelatedProducts(data.id);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
    window.scrollTo(0, 0);
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    
    // Find matching variant
    const matchingVariant = product?.variants.edges.find(v => {
      return v.node.selectedOptions?.every(
        opt => newOptions[opt.name] === opt.value
      );
    });
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node.id);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    const cartItem: CartItem = {
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${product.title} added to cart`, {
      position: 'top-center'
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product?.title,
        url: window.location.href
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Product Not Found</h1>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Shop
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const images = product.images?.edges || [];
  const currentImage = images[selectedImage]?.node;
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const currentVariant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
  const isOnSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || '0');
  const discountPercent = isOnSale 
    ? Math.round((1 - parseFloat(price?.amount || '0') / parseFloat(compareAtPrice.amount)) * 100)
    : 0;

  return (
    <MainLayout>
      <Helmet>
        <title>{product.title} | Kaprayé</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          {product.productType && (
            <>
              <Link to={`/women`} className="hover:text-foreground transition-colors capitalize">
                {product.productType}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted relative group">
              {currentImage ? (
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              
              {/* Sale Badge */}
              {isOnSale && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm px-3 py-1">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-secondary ring-offset-2' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Vendor & Type */}
            {(product.vendor || product.productType) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {product.vendor && <span>{product.vendor}</span>}
                {product.vendor && product.productType && <span>•</span>}
                {product.productType && <span className="capitalize">{product.productType}</span>}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-playfair font-medium text-foreground">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {price && (
                <span className="text-3xl font-bold text-primary">
                  {price.currencyCode} {parseFloat(price.amount).toLocaleString()}
                </span>
              )}
              {isOnSale && compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {compareAtPrice.currencyCode} {parseFloat(compareAtPrice.amount).toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {currentVariant?.availableForSale ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-sm text-destructive font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Variant Selection */}
            {product.options && product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-5">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      {option.name}: <span className="text-secondary">{selectedOptions[option.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const isSelected = selectedOptions[option.name] === value;
                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                              isSelected 
                                ? 'border-secondary bg-secondary text-secondary-foreground' 
                                : 'border-border hover:border-secondary text-foreground'
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-1 w-fit border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base"
                disabled={!currentVariant?.availableForSale}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {currentVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 border-border"
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                }}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-secondary text-secondary' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 border-border"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
                <Truck className="h-5 w-5 text-secondary mb-2" />
                <span className="text-xs text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
                <RotateCcw className="h-5 w-5 text-secondary mb-2" />
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
                <Shield className="h-5 w-5 text-secondary mb-2" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.slice(0, 5).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} currentProductId={product.id} />
        )}
      </div>
    </MainLayout>
  );
}
