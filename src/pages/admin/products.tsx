
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ProductForm } from "@/components/admin/product-form";
import { fetchProducts, deleteProduct } from "@/lib/supabase";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openProductForm, setOpenProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { formatPrice } = useAppSettings();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    // Map database products to local Product type
    const mappedProducts = data.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description || '',
      category: p.category_id || '',
      subcategory: p.tags?.[0] || '',
      image: p.featured_image || '',
      images: p.images || [],
      sizes: [],
      inStock: p.stock_status === 'in_stock',
      details: [],
      care: [],
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));
    setProducts(mappedProducts);
    setLoading(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) {
        toast({
          title: "Product deleted",
          description: "The product has been removed successfully",
        });
        loadProducts();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the product",
          variant: "destructive",
        });
      }
    }
  };

  const handleFormSuccess = () => {
    setOpenProductForm(false);
    setSelectedProduct(null);
    loadProducts();
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout title="Product Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button onClick={() => setOpenProductForm(true)}>Add New Product</Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            {searchTerm ? "No products found matching your search." : "No products available. Add your first product!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Stock</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <div className="w-12 h-12 bg-gray-100 rounded">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">
                      {product.category}
                      {product.subcategory && (
                        <span className="block text-xs text-gray-500">
                          {product.subcategory}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">{formatPrice(product.price)}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog open={openProductForm} onOpenChange={setOpenProductForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <Separator className="my-4" />
            <ProductForm
              initialData={selectedProduct || undefined}
              productId={selectedProduct?.id}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
