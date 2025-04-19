
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardOrders() {
  const orders = [
    {
      id: "#ORD-001",
      date: "2024-04-19",
      status: "Delivered",
      total: "$249.99",
      items: 3
    },
    {
      id: "#ORD-002",
      date: "2024-04-15",
      status: "Processing",
      total: "$129.99",
      items: 2
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">My Orders</h1>
      
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order {order.id}</span>
                <span className="text-sm font-normal">{order.date}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                  <p className="text-sm text-muted-foreground">Items: {order.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

