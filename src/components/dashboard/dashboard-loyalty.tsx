
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Crown, ShoppingBag, Loader2 } from "lucide-react";
import { useLoyalty } from "@/hooks/use-loyalty";
import { format } from "date-fns";

const tierIcons = {
  bronze: ShoppingBag,
  silver: Star,
  gold: Crown,
  platinum: Crown,
};

const tierColors = {
  bronze: "text-amber-600",
  silver: "text-slate-500",
  gold: "text-yellow-500",
  platinum: "text-purple-600",
};

export function DashboardLoyalty() {
  const { profile, transactions, loading, getTierProgress } = useLoyalty();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading loyalty data...</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">SHUKRAN Rewards</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to view your loyalty points.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tierProgress = getTierProgress();
  const TierIcon = tierIcons[profile.loyalty_tier as keyof typeof tierIcons] || ShoppingBag;
  const tierColor = tierColors[profile.loyalty_tier as keyof typeof tierColors] || "text-amber-600";

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">SHUKRAN Rewards</h1>
      
      <div className="grid gap-4">
        <Card className="bg-gradient-to-r from-kapraye-burgundy/10 to-kapraye-pink/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TierIcon className={`h-6 w-6 ${tierColor}`} />
              Your Points Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-kapraye-burgundy">
              {profile.loyalty_points.toLocaleString()}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next tier</span>
                <span>{profile.loyalty_points} / {tierProgress.next === Infinity ? '∞' : tierProgress.next.toLocaleString()}</span>
              </div>
              {tierProgress.next !== Infinity && (
                <Progress value={tierProgress.progress} className="h-2" />
              )}
              <p className="text-sm text-muted-foreground capitalize">
                Current tier: {profile.loyalty_tier}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No transactions yet</p>
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 10).map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium capitalize">{transaction.type} Points</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.created_at), 'PPp')}
                      </p>
                    </div>
                    <span className={`font-medium ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.points > 0 ? '+' : ''}{transaction.points}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
