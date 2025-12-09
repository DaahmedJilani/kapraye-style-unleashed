import { MainLayout } from "@/components/layout/main-layout";

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              Welcome to <span className="font-above-beyond">Kaprayé</span>. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>

            <p className="text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By using this website, you confirm that you are at least 18 years old or have obtained parental consent. If you do not agree with these terms, please do not use our services.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">2. Products and Pricing</h2>
            <p className="mb-4">All prices are listed in Pakistani Rupees (PKR) and include applicable taxes unless otherwise stated.</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>We reserve the right to modify prices without prior notice</li>
              <li>Product images are for illustration purposes; actual colors may vary slightly</li>
              <li>We make every effort to ensure product descriptions are accurate</li>
              <li>Availability of products is subject to stock levels</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">3. Orders and Payment</h2>
            <p className="mb-4">When you place an order:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You are making an offer to purchase the products</li>
              <li>We reserve the right to accept or reject any order</li>
              <li>Order confirmation will be sent via email/SMS</li>
              <li>Payment methods accepted: Cash on Delivery (COD), Bank Transfer, JazzCash, EasyPaisa</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">4. Delivery</h2>
            <p className="mb-6">
              We deliver across Pakistan. Delivery times and charges are as specified in our Shipping Policy. Risk of loss transfers to you upon delivery.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">5. Returns and Refunds</h2>
            <p className="mb-6">
              Returns and refunds are subject to our Refund Policy. Please review our Refund Policy for detailed information on eligibility and process.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-6">
              All content on this website including text, graphics, logos, images, and software is the property of <span className="font-above-beyond">Kaprayé</span> and is protected by Pakistani and international copyright laws. Unauthorized use is prohibited.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">7. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit any viruses or malicious code</li>
              <li>Infringe upon our intellectual property rights</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, <span className="font-above-beyond">Kaprayé</span> shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">9. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts in Lahore, Pakistan.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">10. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website. Continued use of the website constitutes acceptance of modified terms.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">11. Contact Information</h2>
            <p className="mb-6">
              For any questions regarding these Terms, please contact us at:<br />
              Email: support@kapraye.com<br />
              WhatsApp: +92 300 1234567
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
