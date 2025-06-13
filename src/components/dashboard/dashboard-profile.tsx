
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoyalty } from "@/hooks/use-loyalty";
import { Loader2, Save } from "lucide-react";

export function DashboardProfile() {
  const { profile, loading, updateProfile } = useLoyalty();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);

  // Update form when profile loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-playfair font-bold text-kapraye-burgundy">My Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Loyalty Status</Label>
              <div className="flex items-center gap-4 p-3 bg-kapraye-cream/20 rounded-lg">
                <div>
                  <p className="font-medium">Points: {profile?.loyalty_points || 0}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    Tier: {profile?.loyalty_tier || 'Bronze'}
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={saving}
              className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
