
import { MainLayout } from "@/components/layout/main-layout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              At <span className="font-above-beyond">Kaprayé</span>, we take your privacy seriously. This Privacy Policy document contains types of information that is collected and recorded by <span className="font-above-beyond">Kaprayé</span> and how we use it.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">Information We Collect</h2>
            <p className="mb-6">
              We only collect information about you if we have a reason to do so — for example, to provide our services, to communicate with you, or to make our services better.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-6">
              We use the information we collect in various ways, including to:
              - Provide, operate, and maintain our website
              - Improve, personalize, and expand our website
              - Understand and analyze how you use our website
              - Develop new products, services, features, and functionality
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">Data Protection</h2>
            <p className="mb-6">
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
