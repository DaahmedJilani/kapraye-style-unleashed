
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DashboardLoyalty() {
  const points = 1250;
  const nextTier = 2000;
  const progress = (points / nextTier) * 100;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">SHUKRAN Rewards</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Points Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-kapraye-burgundy">{points}</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next tier</span>
                <span>{points} / {nextTier}</span>
              </div>
              <Progress value={progress} className="h-2 bg-kapraye-burgundy/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Purchase Points</p>
                  <p className="text-sm text-muted-foreground">Order #ORD-001</p>
                </div>
                <span className="text-green-600">+180</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Redeemed Points</p>
                  <p className="text-sm text-muted-foreground">Discount on Order #ORD-002</p>
                </div>
                <span className="text-red-600">-500</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

