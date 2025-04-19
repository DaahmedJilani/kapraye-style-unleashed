
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface ProductTabsProps {
  product: {
    details: string[];
    care: string[];
  };
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mt-20">
      <Separator className="mb-8" />
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b mb-8">
          <TabsTrigger 
            value="details" 
            className="text-base rounded-none px-0 mr-8 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-kapraye-burgundy data-[state=active]:shadow-none"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger 
            value="care" 
            className="text-base rounded-none px-0 mr-8 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-kapraye-burgundy data-[state=active]:shadow-none"
          >
            Care Instructions
          </TabsTrigger>
          <TabsTrigger 
            value="shipping" 
            className="text-base rounded-none px-0 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-kapraye-burgundy data-[state=active]:shadow-none"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-0">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Description</h3>
                  <ul className="space-y-3">
                    {product.details.map((detail, index) => (
                      <li key={index} className="text-gray-600 flex items-baseline gap-2">
                        <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Material & Composition</h3>
                  <p className="text-gray-600 leading-relaxed">
                    This premium cotton t-shirt is crafted using only the finest Egyptian cotton, known for its exceptional
                    softness and durability. The fabric is breathable and comfortable, making it perfect for everyday wear
                    while maintaining its luxurious feel wash after wash.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="care" className="mt-0">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Care Instructions</h3>
                  <ul className="space-y-3">
                    {product.care.map((instruction, index) => (
                      <li key={index} className="text-gray-600 flex items-baseline gap-2">
                        <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Quality & Longevity</h3>
                  <p className="text-gray-600 leading-relaxed">
                    With proper care, this premium t-shirt will maintain its quality and appearance for years to come.
                    The high-quality cotton fibers and expert craftsmanship ensure excellent color retention and shape
                    preservation through multiple washes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-0">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Shipping Policy</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Free standard shipping on all orders</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Express shipping available (2-3 business days)</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>International shipping to over 90 countries</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>All orders are processed within 24 hours</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-cormorant mb-4">Returns & Exchanges</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Free returns within 30 days of purchase</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Items must be unworn with original tags attached</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Exchanges are processed within 5 business days</span>
                    </li>
                    <li className="text-gray-600 flex items-baseline gap-2">
                      <span className="inline-block w-1 h-1 bg-kapraye-burgundy rounded-full shrink-0 mt-1.5"></span>
                      <span>Contact customer service for assistance with returns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Separator className="mt-12" />
    </div>
  );
}
