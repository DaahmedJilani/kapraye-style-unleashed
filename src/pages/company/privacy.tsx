import { MainLayout } from "@/components/layout/main-layout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              At <span className="font-above-beyond">Kaprayé</span>, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>

            <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
              <li><strong>Payment Information:</strong> We do not store credit card details; payments are processed securely by third-party providers</li>
              <li><strong>Account Information:</strong> If you create an account, we store your login credentials</li>
              <li><strong>Order History:</strong> Details of your purchases for order fulfillment and customer service</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and customer experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">3. Information Sharing</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Delivery Partners:</strong> To fulfill your orders (TCS, Leopard, etc.)</li>
              <li><strong>Payment Processors:</strong> JazzCash, EasyPaisa, banks for payment processing</li>
              <li><strong>Service Providers:</strong> Who assist us in operating our website</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mb-6">We do not sell your personal information to third parties.</p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">5. Cookies</h2>
            <p className="mb-6">
              Our website uses cookies to enhance your browsing experience. Cookies help us remember your preferences and understand how you use our website. You can manage cookie preferences through your browser settings.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct any inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">7. Data Retention</h2>
            <p className="mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Order records are kept for 7 years for tax and legal compliance.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">8. Children's Privacy</h2>
            <p className="mb-6">
              Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">9. Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting a notice on our website.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">10. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or your personal data, please contact us at:<br />
              Email: support@kapraye.com<br />
              WhatsApp: +92 300 1234567<br />
              Address: Lahore, Pakistan
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
