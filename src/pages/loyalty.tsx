import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Gift, Star, Crown, ShoppingBag, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLoyalty } from "@/hooks/use-loyalty";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";

const tiers = [
  {
    name: "Bronze",
    icon: ShoppingBag,
    minPoints: 0,
    maxPoints: 1000,
    benefits: ["Free shipping on orders over PKR 5,000", "Birthday special offer"]
  },
  {
    name: "Silver",
    icon: Star,
    minPoints: 1000,
    maxPoints: 2500,
    benefits: ["5% discount on all orders", "Early access to sales", "Free returns"]
  },
  {
    name: "Gold",
    icon: Crown,
    minPoints: 2500,
    maxPoints: 5000,
    benefits: ["10% discount on all orders", "Priority customer support", "Exclusive events access", "Double points weekends"]
  },
  {
    name: "Platinum",
    icon: Crown,
    minPoints: 5000,
    maxPoints: Infinity,
    benefits: ["15% discount on all orders", "VIP customer support", "Free express shipping", "Exclusive member-only products"]
  }
];

export default function Loyalty() {
  const { profile, transactions, loading, error, getTierProgress } = useLoyalty();
  const navigate = useNavigate();
  const tierProgress = getTierProgress();

  // Get current tier info
  const currentTierIndex = tiers.findIndex(t => 
    t.name.toLowerCase() === (profile?.loyalty_tier || 'bronze').toLowerCase()
  );
  const currentTier = tiers[currentTierIndex] || tiers[0];
  const nextTier = tiers[currentTierIndex + 1];

  if (loading) {
    return (
      <MainLayout>
        <Helmet>
          <title>SHUKRAN Rewards - Kaprayé</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <Helmet>
          <title>SHUKRAN Rewards - Kaprayé</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 text-center">
          <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-playfair font-medium text-primary mb-4">
            Join SHUKRAN Rewards
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sign in or create an account to start earning loyalty points and unlock exclusive benefits.
          </p>
          <Button onClick={() => navigate('/auth')}>
            Sign In to Get Started
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>SHUKRAN Rewards - Kaprayé</title>
        <meta name="description" content="Earn loyalty points and unlock exclusive benefits with SHUKRAN Rewards at Kaprayé." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16 space-y-8">
        {/* Current Status */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-primary">
              SHUKRAN Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{profile.loyalty_points.toLocaleString()} points</span>
                  {nextTier && (
                    <span className="text-sm text-muted-foreground">
                      {(nextTier.minPoints - profile.loyalty_points).toLocaleString()} points to {nextTier.name}
                    </span>
                  )}
                </div>
                <Progress value={tierProgress.progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentTier.name}</span>
                  {nextTier && <span>{nextTier.name}</span>}
                </div>
              </div>
              <div className="text-center md:text-right">
                <currentTier.icon className="w-12 h-12 mx-auto md:ml-auto md:mr-0 text-primary mb-2" />
                <h3 className="text-xl font-medium capitalize">{profile.loyalty_tier} Member</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={tier.name.toLowerCase() === profile.loyalty_tier.toLowerCase() 
                ? 'border-primary ring-2 ring-primary/20' 
                : ''
              }
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tier.icon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                </div>
                {tier.name.toLowerCase() === profile.loyalty_tier.toLowerCase() && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full w-fit">
                    Current Tier
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {tier.maxPoints === Infinity 
                    ? `${tier.minPoints.toLocaleString()}+ points`
                    : `${tier.minPoints.toLocaleString()} - ${tier.maxPoints.toLocaleString()} points`
                  }
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Gift className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
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
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start shopping to earn SHUKRAN points!
                </p>
                <Button onClick={() => navigate('/')} className="mt-4">
                  Start Shopping
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="capitalize">{transaction.type}</TableCell>
                      <TableCell>{transaction.order_id || '-'}</TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === 'earned' ? 'text-green-600' : 
                        transaction.type === 'redeemed' ? 'text-orange-600' : 
                        'text-muted-foreground'
                      }`}>
                        {transaction.type === 'earned' ? '+' : 
                         transaction.type === 'redeemed' ? '-' : ''
                        }{transaction.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* How to Earn */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <ShoppingBag className="w-10 h-10 mx-auto text-primary mb-3" />
                <h4 className="font-medium mb-1">Shop & Earn</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 1 point for every PKR 100 spent
                </p>
              </div>
              <div className="text-center p-4">
                <Star className="w-10 h-10 mx-auto text-primary mb-3" />
                <h4 className="font-medium mb-1">Write Reviews</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 50 bonus points per product review
                </p>
              </div>
              <div className="text-center p-4">
                <Gift className="w-10 h-10 mx-auto text-primary mb-3" />
                <h4 className="font-medium mb-1">Birthday Bonus</h4>
                <p className="text-sm text-muted-foreground">
                  Get 200 bonus points on your birthday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}