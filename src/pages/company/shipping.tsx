import { MainLayout } from "@/components/layout/main-layout";

export default function ShippingPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Shipping Policy</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              <span className="font-above-beyond">Kaprayé</span> delivers across Pakistan. We are committed to getting your order to you safely and on time.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">1. Delivery Areas</h2>
            <p className="mb-6">
              We currently deliver to all major cities and towns across Pakistan including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and surrounding areas.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">2. Delivery Time</h2>
            <div className="mb-6">
              <p className="mb-2"><strong>Major Cities:</strong> 2-4 business days</p>
              <p className="mb-2"><strong>Other Cities:</strong> 4-7 business days</p>
              <p className="mb-2"><strong>Remote Areas:</strong> 7-10 business days</p>
              <p className="text-sm text-muted-foreground mt-2">*Delivery times may vary during sale periods, Eid, and other peak seasons.</p>
            </div>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">3. Shipping Charges</h2>
            <div className="mb-6">
              <p className="mb-2"><strong>Orders above PKR 5,000:</strong> FREE delivery</p>
              <p className="mb-2"><strong>Orders below PKR 5,000:</strong> PKR 200 flat rate</p>
              <p className="mb-2"><strong>Remote areas:</strong> Additional PKR 100 may apply</p>
            </div>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">4. Order Tracking</h2>
            <p className="mb-6">
              Once your order is dispatched, you will receive a tracking number via SMS and email. You can track your order using our courier partner's tracking system.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">5. Cash on Delivery (COD)</h2>
            <p className="mb-6">
              We offer Cash on Delivery across Pakistan. Please have the exact amount ready at the time of delivery. Our courier will provide you with a receipt.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">6. Delivery Attempts</h2>
            <p className="mb-6">
              Our courier partner will make up to 3 delivery attempts. If delivery fails after 3 attempts, the order will be returned to us. Please ensure your contact number is correct and reachable.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">7. Order Confirmation</h2>
            <p className="mb-6">
              Our team may call to confirm your order before dispatch, especially for COD orders. Please ensure your phone number is active.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">8. Contact Us</h2>
            <p className="mb-6">
              For shipping queries, contact us at:<br />
              Email: support@kapraye.com<br />
              WhatsApp: +92 300 1234567
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
