import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsObj = (data || []).reduce((acc, setting: any) => {
        acc[setting.key] = setting.value?.value || setting.value;
        return acc;
      }, {} as Record<string, any>);

      setSettings(settingsObj);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading settings",
        description: error.message,
      });
    }
  }

  async function updateSetting(key: string, value: any) {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value: { value },
          category: getCategoryForKey(key),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: "Setting updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving setting",
        description: error.message,
      });
    }
  }

  function getCategoryForKey(key: string): string {
    if (key.startsWith('contact_')) return 'contact';
    if (key.startsWith('social_')) return 'social';
    if (key.startsWith('payment_')) return 'payments';
    if (key.startsWith('enable_')) return 'features';
    return 'general';
  }

  const handleSaveGeneral = async () => {
    setLoading(true);
    await Promise.all([
      updateSetting('site_name', settings.site_name),
      updateSetting('site_tagline', settings.site_tagline),
    ]);
    setLoading(false);
  };

  const handleSaveContact = async () => {
    setLoading(true);
    await Promise.all([
      updateSetting('contact_email', settings.contact_email),
      updateSetting('contact_phone', settings.contact_phone),
      updateSetting('contact_address', settings.contact_address),
    ]);
    setLoading(false);
  };

  return (
    <AdminLayout title="Site Settings">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic site information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                  placeholder="Kaprayé"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_tagline">Site Tagline</Label>
                <Input
                  id="site_tagline"
                  value={settings.site_tagline || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, site_tagline: e.target.value }))}
                  placeholder="Pakistani Fashion & Beauty"
                />
              </div>
              <Button onClick={handleSaveGeneral} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your business contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email Address</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                  placeholder="ahmedjilani97@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                  placeholder="+92 XXX XXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address">Business Address</Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact_address || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, contact_address: e.target.value }))}
                  placeholder="Your business address in Pakistan"
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveContact} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Connect your social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, social_instagram: e.target.value }))}
                  placeholder="https://instagram.com/kapraye"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, social_facebook: e.target.value }))}
                  placeholder="https://facebook.com/kapraye"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_tiktok">TikTok</Label>
                <Input
                  id="social_tiktok"
                  value={settings.social_tiktok || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, social_tiktok: e.target.value }))}
                  placeholder="https://tiktok.com/@kapraye"
                />
              </div>
              <Button onClick={async () => {
                setLoading(true);
                await Promise.all([
                  updateSetting('social_instagram', settings.social_instagram),
                  updateSetting('social_facebook', settings.social_facebook),
                  updateSetting('social_tiktok', settings.social_tiktok),
                ]);
                setLoading(false);
              }} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Social Links
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure Pakistani payment gateways
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold">Easypaisa</h3>
                <p className="text-sm text-muted-foreground">
                  Integration with Easypaisa will be configured in Phase 5
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold">JazzCash</h3>
                <p className="text-sm text-muted-foreground">
                  Integration with JazzCash will be configured in Phase 5
                </p>
              </div>
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold">Bank Transfer</h3>
                <p className="text-sm text-muted-foreground">
                  Manual bank transfer details can be added here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>
                Enable or disable site features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_loyalty">Loyalty Points</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable customer loyalty points system
                  </p>
                </div>
                <Switch
                  id="enable_loyalty"
                  checked={settings.enable_loyalty || false}
                  onCheckedChange={(checked) => updateSetting('enable_loyalty', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable newsletter signup forms
                  </p>
                </div>
                <Switch
                  id="enable_newsletter"
                  checked={settings.enable_newsletter || false}
                  onCheckedChange={(checked) => updateSetting('enable_newsletter', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
