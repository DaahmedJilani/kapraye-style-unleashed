import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Kaprayé</title>
        <meta name="description" content="Your order has been placed successfully." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-20 mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            <Card>
              <CardContent className="pt-8 pb-8 space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
                </motion.div>
                
                <div>
                  <h1 className="text-2xl font-playfair font-medium text-primary mb-2">
                    Order Confirmed!
                  </h1>
                  <p className="text-muted-foreground">
                    Thank you for shopping with Kaprayé. You'll receive a confirmation email shortly.
                  </p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Gift className="w-5 h-5" />
                    <span className="font-medium">SHUKRAN Points Earned!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You've earned loyalty points with this purchase. Check your rewards in your dashboard.
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full"
                  >
                    View Order History
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </MainLayout>
    </>
  );
}