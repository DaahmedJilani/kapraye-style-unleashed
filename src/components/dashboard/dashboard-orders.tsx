
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Package, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const orders = [
    {
      id: "#ORD-001",
      date: "2024-04-19",
      status: "Delivered",
      total: "$249.99",
      items: [
        { name: "Silk Scarf - Rose Gold", price: "$89.99", quantity: 1 },
        { name: "Premium Leather Handbag", price: "$120.00", quantity: 1 },
        { name: "Gold Pendant Necklace", price: "$40.00", quantity: 1 }
      ],
      shipping: {
        address: "123 Fashion Ave, Style City",
        method: "Express Delivery",
        tracking: "KPY7891234XZ",
        estimatedDelivery: "Delivered on April 21, 2024"
      }
    },
    {
      id: "#ORD-002",
      date: "2024-04-15",
      status: "Processing",
      total: "$129.99",
      items: [
        { name: "Satin Evening Gown - Burgundy", price: "$89.99", quantity: 1 },
        { name: "Crystal Earrings", price: "$40.00", quantity: 1 }
      ],
      shipping: {
        address: "456 Glamour St, Trendy Town",
        method: "Standard Shipping",
        tracking: "KPY4567890AB",
        estimatedDelivery: "Expected by April 25, 2024"
      }
    },
    {
      id: "#ORD-003",
      date: "2024-03-30",
      status: "Cancelled",
      total: "$75.50",
      items: [
        { name: "Designer Sunglasses", price: "$75.50", quantity: 1 }
      ],
      shipping: {
        address: "789 Fashion Blvd, Chic City",
        method: "Standard Shipping",
        tracking: "Cancelled",
        estimatedDelivery: "Cancelled"
      }
    }
  ];

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = filterStatus 
    ? orders.filter(order => order.status === filterStatus)
    : orders;

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">My Orders</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs px-3 border-kapraye-mauve",
              filterStatus === null ? "bg-kapraye-cream" : ""
            )}
            onClick={() => setFilterStatus(null)}
          >
            All Orders
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs px-3 border-green-200",
              filterStatus === "Delivered" ? "bg-green-100" : ""
            )}
            onClick={() => setFilterStatus("Delivered")}
          >
            Delivered
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs px-3 border-blue-200",
              filterStatus === "Processing" ? "bg-blue-100" : ""
            )}
            onClick={() => setFilterStatus("Processing")}
          >
            Processing
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs px-3 border-red-200",
              filterStatus === "Cancelled" ? "bg-red-100" : ""
            )}
            onClick={() => setFilterStatus("Cancelled")}
          >
            Cancelled
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No orders found with the selected filter.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{order.id}</span>
                    <Badge className={cn("ml-2", getStatusColor(order.status))}>
                      {order.status}
                    </Badge>
                  </div>
                  <span className="text-sm font-normal flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {order.date}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Items: {order.items.length}</p>
                    <p className="font-medium">{order.total}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOrderExpand(order.id)}
                    className="text-kapraye-burgundy hover:text-kapraye-pink hover:bg-kapraye-cream/50"
                  >
                    {expandedOrder === order.id ? (
                      <><span>Hide Details</span><ChevronUp className="ml-2 h-4 w-4" /></>
                    ) : (
                      <><span>View Details</span><ChevronDown className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="mt-4 animate-fade-in">
                    <div className="border-t border-kapraye-cream pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Order Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div>
                              <span>{item.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                x{item.quantity}
                              </span>
                            </div>
                            <span>{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-kapraye-cream pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Shipping Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="w-24 text-muted-foreground">Address:</span>
                          <span>{order.shipping.address}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-24 text-muted-foreground">Method:</span>
                          <span>{order.shipping.method}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-24 text-muted-foreground">Tracking:</span>
                          <span className="font-medium">{order.shipping.tracking}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-24 text-muted-foreground">Delivery:</span>
                          <span>
                            {order.status === "Delivered" ? (
                              <span className="text-green-600 flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                {order.shipping.estimatedDelivery}
                              </span>
                            ) : order.status === "Cancelled" ? (
                              <span className="text-red-600">Cancelled</span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {order.shipping.estimatedDelivery}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-kapraye-cream pt-4 mt-4 flex justify-end">
                      {order.status !== "Cancelled" && (
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-kapraye-burgundy border-kapraye-mauve hover:bg-kapraye-cream"
                        >
                          {order.status === "Delivered" ? "Return Items" : "Cancel Order"}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
