import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GripVertical, Image, Video, Loader2 } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string | null;
  title: string;
  title_accent: string | null;
  subtitle: string | null;
  image_url: string | null;
  video_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const emptySlide: Omit<HeroSlide, 'id'> = {
  badge: "",
  title: "",
  title_accent: "",
  subtitle: "",
  image_url: "",
  video_url: "",
  cta_text: "Shop Now",
  cta_link: "/women",
  display_order: 0,
  is_active: true,
};

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<HeroSlide, 'id'>>(emptySlide);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero-slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-video-${Date.now()}.${fileExt}`;
      const filePath = `hero-slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      setFormData({ ...formData, video_url: publicUrl });
      toast.success("Video uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      if (editingSlide) {
        const { error } = await supabase
          .from("hero_slides")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingSlide.id);

        if (error) throw error;
        toast.success("Slide updated successfully");
      } else {
        const maxOrder = Math.max(...slides.map(s => s.display_order || 0), 0);
        const { error } = await supabase
          .from("hero_slides")
          .insert({
            ...formData,
            display_order: maxOrder + 1,
          });

        if (error) throw error;
        toast.success("Slide created successfully");
      }

      setIsDialogOpen(false);
      setEditingSlide(null);
      setFormData(emptySlide);
      fetchSlides();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save slide");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      const { error } = await supabase
        .from("hero_slides")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Slide deleted");
      fetchSlides();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete slide");
    }
  };

  const handleToggleActive = async (id: string, currentState: boolean | null) => {
    try {
      const { error } = await supabase
        .from("hero_slides")
        .update({ is_active: !currentState })
        .eq("id", id);

      if (error) throw error;
      fetchSlides();
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update slide");
    }
  };

  const openEditDialog = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      badge: slide.badge || "",
      title: slide.title,
      title_accent: slide.title_accent || "",
      subtitle: slide.subtitle || "",
      image_url: slide.image_url || "",
      video_url: slide.video_url || "",
      cta_text: slide.cta_text || "Shop Now",
      cta_link: slide.cta_link || "/women",
      display_order: slide.display_order,
      is_active: slide.is_active,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingSlide(null);
    setFormData(emptySlide);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout title="Hero Slides">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-medium">Hero Slides</h1>
            <p className="text-muted-foreground mt-1">
              Manage your homepage hero section slides
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Slide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSlide ? "Edit Slide" : "Create New Slide"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input
                      placeholder="e.g., New Collection 2025"
                      value={formData.badge || ""}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={formData.display_order || 0}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="Main title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title Accent</Label>
                    <Input
                      placeholder="Accent text (italic)"
                      value={formData.title_accent || ""}
                      onChange={(e) => setFormData({ ...formData, title_accent: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    placeholder="Description text"
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Image URL or upload"
                      value={formData.image_url || ""}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="flex-1"
                    />
                    <Button variant="outline" className="relative" disabled={uploading}>
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploading}
                      />
                    </Button>
                  </div>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded-md mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Video (optional - overrides image)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Video URL or upload"
                      value={formData.video_url || ""}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      className="flex-1"
                    />
                    <Button variant="outline" className="relative" disabled={uploading}>
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploading}
                      />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input
                      placeholder="e.g., Shop Now"
                      value={formData.cta_text || ""}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input
                      placeholder="e.g., /women"
                      value={formData.cta_link || ""}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {editingSlide ? "Update" : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : slides.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Image className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hero slides yet</p>
              <Button className="mt-4" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Slide
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {slides.map((slide) => (
              <Card key={slide.id} className={!slide.is_active ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex items-center text-muted-foreground">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="w-32 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {slide.video_url ? (
                        <video
                          src={slide.video_url}
                          className="w-full h-full object-cover"
                          muted
                        />
                      ) : slide.image_url ? (
                        <img
                          src={slide.image_url}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium truncate">
                            {slide.title} {slide.title_accent && <span className="text-secondary italic">{slide.title_accent}</span>}
                          </h3>
                          {slide.badge && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {slide.badge}
                            </span>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {slide.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={slide.is_active || false}
                            onCheckedChange={() => handleToggleActive(slide.id, slide.is_active)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(slide)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(slide.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Order: {slide.display_order}</span>
                        <span>Link: {slide.cta_link}</span>
                        {slide.video_url && <span className="text-secondary">Has Video</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}