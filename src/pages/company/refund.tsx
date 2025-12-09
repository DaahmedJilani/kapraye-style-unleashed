import { MainLayout } from "@/components/layout/main-layout";

export default function RefundPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Refund & Return Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              At <span className="font-above-beyond">Kaprayé</span>, we want you to be completely satisfied with your purchase. Please read our refund and return policy carefully.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">1. Return Eligibility</h2>
            <p className="mb-4">Items can be returned within 7 days of delivery if:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>The item is unused, unwashed, and in its original packaging</li>
              <li>All tags and labels are still attached</li>
              <li>You have the original receipt or proof of purchase</li>
              <li>The item is not a sale or clearance item (unless defective)</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">2. Non-Returnable Items</h2>
            <p className="mb-4">The following items cannot be returned:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Undergarments and intimate wear</li>
              <li>Cosmetics and beauty products (if opened)</li>
              <li>Custom or personalized items</li>
              <li>Items marked as "Final Sale"</li>
            </ul>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">3. How to Initiate a Return</h2>
            <p className="mb-4">To initiate a return:</p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Contact us via WhatsApp or email within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Wait for our team to approve the return request</li>
              <li>Ship the item back or schedule a pickup (within Lahore)</li>
            </ol>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">4. Refund Process</h2>
            <p className="mb-6">
              Once we receive and inspect the returned item, we will process your refund within 5-7 business days. Refunds will be issued to the original payment method. For Cash on Delivery orders, refunds will be processed via bank transfer or JazzCash/EasyPaisa.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">5. Exchange Policy</h2>
            <p className="mb-6">
              We offer free exchanges for size or color variations within 7 days of delivery, subject to availability. The same return conditions apply.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">6. Defective or Damaged Items</h2>
            <p className="mb-6">
              If you receive a defective or damaged item, please contact us immediately with photos. We will arrange a free replacement or full refund at no extra cost to you.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">7. Contact Us</h2>
            <p className="mb-6">
              For any return or refund queries, contact us at:<br />
              Email: support@kapraye.com<br />
              WhatsApp: +92 300 1234567
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
