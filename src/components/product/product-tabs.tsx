
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  product: {
    details: string[];
    care: string[];
  };
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="details" className="mt-16">
      <TabsList className="border-b w-full justify-start rounded-none">
        <TabsTrigger value="details" className="text-base">
          Details
        </TabsTrigger>
        <TabsTrigger value="care" className="text-base">
          Care Instructions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-6">
        <ul className="list-disc pl-5 space-y-2">
          {product.details.map((detail, index) => (
            <li key={index} className="text-gray-600">
              {detail}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="care" className="mt-6">
        <ul className="list-disc pl-5 space-y-2">
          {product.care.map((instruction, index) => (
            <li key={index} className="text-gray-600">
              {instruction}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
