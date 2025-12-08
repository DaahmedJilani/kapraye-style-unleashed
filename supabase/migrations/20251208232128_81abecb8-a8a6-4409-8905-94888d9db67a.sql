-- Hero Slides table for manageable hero section
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge text,
  title text NOT NULL,
  title_accent text,
  subtitle text,
  image_url text,
  video_url text,
  cta_text text DEFAULT 'Shop Now',
  cta_link text DEFAULT '/women',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Hero slides policies - anyone can view active slides, admins can manage
CREATE POLICY "Anyone can view active hero slides" 
ON public.hero_slides 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage hero slides" 
ON public.hero_slides 
FOR ALL 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Newsletter policies - anyone can subscribe, admins can view
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Contact messages policies - anyone can send, admins can view
CREATE POLICY "Anyone can send contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view messages" 
ON public.contact_messages 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage messages" 
ON public.contact_messages 
FOR ALL 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Insert default hero slides
INSERT INTO public.hero_slides (badge, title, title_accent, subtitle, image_url, cta_text, cta_link, display_order) VALUES
('New Collection 2024', 'Discover Your', 'Signature Style', 'Explore our curated collection of premium fashion pieces designed for the modern trendsetter.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80', 'Explore Collection', '/women', 1),
('Exclusive Designs', 'Elegance Meets', 'Modern Fashion', 'From traditional eastern wear to contemporary western styles, find your perfect look.', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', 'Shop Now', '/eastern', 2),
('Premium Quality', 'Luxury', 'Redefined', 'Experience the finest fabrics and impeccable craftsmanship in every piece.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80', 'Discover More', '/western', 3);

-- Add social_links to site_settings if not exists
INSERT INTO public.site_settings (key, category, value, description) VALUES
('social_links', 'social', '{"instagram": "https://instagram.com/kapraye", "facebook": "https://facebook.com/kapraye", "twitter": "https://twitter.com/kapraye", "tiktok": "https://tiktok.com/@kapraye"}', 'Social media profile links')
ON CONFLICT (key) DO NOTHING;