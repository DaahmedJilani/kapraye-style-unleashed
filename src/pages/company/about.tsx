
import { MainLayout } from "@/components/layout/main-layout";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">About Us</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              Welcome to Kaprayé by Rayan, where tradition meets contemporary fashion. Our journey began with a vision to create a platform that celebrates the rich diversity of Eastern and Western fashion while making it accessible to everyone.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">Our Story</h2>
            <p className="mb-6">
              Founded with the belief that style knows no boundaries, Kaprayé has grown from a small boutique into a leading fashion destination. We curate collections that blend traditional aesthetics with modern sensibilities, creating a unique shopping experience for our customers.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              To provide exceptional quality clothing and accessories that empower individuals to express their unique style, while maintaining our commitment to sustainable and ethical fashion practices.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
