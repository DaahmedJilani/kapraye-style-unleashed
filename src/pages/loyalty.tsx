
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Crown, ShoppingBag } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const tiers = [
  {
    name: "Bronze",
    icon: ShoppingBag,
    points: 0,
    requiredPoints: 1000,
    benefits: ["Free shipping on orders over $100", "Birthday special offer"]
  },
  {
    name: "Silver",
    icon: Star,
    points: 1000,
    requiredPoints: 2500,
    benefits: ["5% discount on all orders", "Early access to sales", "Free returns"]
  },
  {
    name: "Gold",
    icon: Crown,
    points: 2500,
    requiredPoints: 5000,
    benefits: ["10% discount on all orders", "Priority customer support", "Exclusive events access", "Double points weekends"]
  }
];

// Mock user data - this would come from your backend
const userPoints = 1500;
const currentTier = tiers[1]; // Silver tier
const pointsToNextTier = currentTier.requiredPoints - userPoints;

const recentActivities = [
  { date: "2024-04-15", activity: "Purchase", points: 150, orderId: "#ORD-001" },
  { date: "2024-04-10", activity: "Review submitted", points: 50, orderId: "REV-001" },
  { date: "2024-04-05", activity: "Purchase", points: 200, orderId: "#ORD-002" },
];

export default function Loyalty() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 space-y-8">
        {/* Current Status */}
        <Card className="bg-gradient-to-r from-kapraye-burgundy/10 to-kapraye-pink/10">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-kapraye-burgundy">
              SHUKRAN Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{userPoints} points</span>
                  <span className="text-sm text-muted-foreground">
                    {pointsToNextTier} points to next tier
                  </span>
                </div>
                <Progress value={(userPoints / currentTier.requiredPoints) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentTier.name}</span>
                  <span>{tiers[2].name}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <currentTier.icon className="w-12 h-12 mx-auto md:ml-auto md:mr-0 text-kapraye-burgundy mb-2" />
                <h3 className="text-xl font-medium">{currentTier.name} Member</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`${tier.name === currentTier.name ? 'border-kapraye-burgundy' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tier.icon className="w-5 h-5 text-kapraye-burgundy" />
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.points.toLocaleString()} points required
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Gift className="w-4 h-4 text-kapraye-burgundy" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell>{activity.orderId}</TableCell>
                    <TableCell>+{activity.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
