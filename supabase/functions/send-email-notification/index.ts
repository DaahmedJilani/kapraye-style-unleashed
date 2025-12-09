import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "order_confirmed" | "order_shipped" | "order_delivered" | "order_cancelled" | "loyalty_points";
  email: string;
  customerName: string;
  orderNumber?: string;
  orderTotal?: string;
  loyaltyPoints?: number;
  trackingNumber?: string;
  userId?: string;
}

const getEmailTemplate = (data: NotificationRequest): { subject: string; html: string } => {
  const brandName = "Kapraye";
  const brandColor = "#D4AF37";
  
  const baseStyles = `
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #1a1a1a; padding: 30px; text-align: center; }
    .header h1 { color: ${brandColor}; margin: 0; font-size: 28px; letter-spacing: 2px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a1a; margin-top: 0; }
    .order-details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .order-details p { margin: 8px 0; color: #333; }
    .highlight { color: ${brandColor}; font-weight: bold; }
    .footer { background-color: #1a1a1a; padding: 20px; text-align: center; }
    .footer p { color: #888; margin: 5px 0; font-size: 12px; }
    .btn { display: inline-block; background-color: ${brandColor}; color: #1a1a1a; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
  `;

  switch (data.type) {
    case "order_confirmed":
      return {
        subject: `Order Confirmed - ${data.orderNumber} | ${brandName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${baseStyles}</style></head>
          <body>
            <div class="container">
              <div class="header"><h1>${brandName}</h1></div>
              <div class="content">
                <h2>🎉 Thank You for Your Order!</h2>
                <p>Dear ${data.customerName},</p>
                <p>We're thrilled to confirm that your order has been received and is being processed.</p>
                <div class="order-details">
                  <p><strong>Order Number:</strong> <span class="highlight">${data.orderNumber}</span></p>
                  <p><strong>Order Total:</strong> <span class="highlight">PKR ${data.orderTotal}</span></p>
                </div>
                <p>We'll send you another email once your order ships.</p>
                <p>Thank you for choosing ${brandName}!</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                <p>Premium Fashion for Everyone</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "order_shipped":
      return {
        subject: `Order Shipped - ${data.orderNumber} | ${brandName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${baseStyles}</style></head>
          <body>
            <div class="container">
              <div class="header"><h1>${brandName}</h1></div>
              <div class="content">
                <h2>🚚 Your Order is On Its Way!</h2>
                <p>Dear ${data.customerName},</p>
                <p>Great news! Your order has been shipped and is on its way to you.</p>
                <div class="order-details">
                  <p><strong>Order Number:</strong> <span class="highlight">${data.orderNumber}</span></p>
                  ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> <span class="highlight">${data.trackingNumber}</span></p>` : ""}
                </div>
                <p>You'll receive your package within 3-5 business days.</p>
                <p>Thank you for shopping with ${brandName}!</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                <p>Premium Fashion for Everyone</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "order_delivered":
      return {
        subject: `Order Delivered - ${data.orderNumber} | ${brandName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${baseStyles}</style></head>
          <body>
            <div class="container">
              <div class="header"><h1>${brandName}</h1></div>
              <div class="content">
                <h2>✅ Your Order Has Been Delivered!</h2>
                <p>Dear ${data.customerName},</p>
                <p>Your order has been successfully delivered. We hope you love your new items!</p>
                <div class="order-details">
                  <p><strong>Order Number:</strong> <span class="highlight">${data.orderNumber}</span></p>
                </div>
                <p>If you have any questions or concerns about your order, please don't hesitate to contact us.</p>
                <p>Thank you for choosing ${brandName}!</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                <p>Premium Fashion for Everyone</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "order_cancelled":
      return {
        subject: `Order Cancelled - ${data.orderNumber} | ${brandName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${baseStyles}</style></head>
          <body>
            <div class="container">
              <div class="header"><h1>${brandName}</h1></div>
              <div class="content">
                <h2>❌ Order Cancelled</h2>
                <p>Dear ${data.customerName},</p>
                <p>We're sorry to inform you that your order has been cancelled.</p>
                <div class="order-details">
                  <p><strong>Order Number:</strong> <span class="highlight">${data.orderNumber}</span></p>
                </div>
                <p>If you didn't request this cancellation or have any questions, please contact our support team.</p>
                <p>We hope to serve you again soon.</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                <p>Premium Fashion for Everyone</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    case "loyalty_points":
      return {
        subject: `You Earned ${data.loyaltyPoints} Loyalty Points! | ${brandName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><style>${baseStyles}</style></head>
          <body>
            <div class="container">
              <div class="header"><h1>${brandName}</h1></div>
              <div class="content">
                <h2>🌟 Congratulations! You Earned Loyalty Points!</h2>
                <p>Dear ${data.customerName},</p>
                <p>Thank you for your recent purchase! You've earned loyalty points.</p>
                <div class="order-details">
                  <p><strong>Points Earned:</strong> <span class="highlight">+${data.loyaltyPoints} points</span></p>
                  <p><strong>From Order:</strong> <span class="highlight">${data.orderNumber}</span></p>
                </div>
                <p>Keep shopping to earn more points and unlock exclusive rewards!</p>
                <p>Thank you for being a valued ${brandName} customer!</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
                <p>Premium Fashion for Everyone</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

    default:
      return {
        subject: `Update from ${brandName}`,
        html: `<p>Thank you for being a ${brandName} customer!</p>`,
      };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();
    console.log("Sending notification:", data.type, "to:", data.email);

    const { subject, html } = getEmailTemplate(data);

    const emailResponse = await resend.emails.send({
      from: "Kapraye <onboarding@resend.dev>",
      to: [data.email],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Also create in-app notification if userId is provided
    if (data.userId) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const notificationTitle = {
        order_confirmed: "Order Confirmed! 🎉",
        order_shipped: "Order Shipped! 🚚",
        order_delivered: "Order Delivered! ✅",
        order_cancelled: "Order Cancelled ❌",
        loyalty_points: `You earned ${data.loyaltyPoints} points! 🌟`,
      }[data.type];

      const notificationMessage = {
        order_confirmed: `Your order ${data.orderNumber} has been confirmed.`,
        order_shipped: `Your order ${data.orderNumber} is on its way!`,
        order_delivered: `Your order ${data.orderNumber} has been delivered.`,
        order_cancelled: `Your order ${data.orderNumber} has been cancelled.`,
        loyalty_points: `You earned ${data.loyaltyPoints} loyalty points from order ${data.orderNumber}.`,
      }[data.type];

      await supabase.from("notifications").insert({
        user_id: data.userId,
        type: data.type,
        title: notificationTitle,
        message: notificationMessage,
        data: { orderNumber: data.orderNumber, loyaltyPoints: data.loyaltyPoints },
      });

      console.log("In-app notification created for user:", data.userId);
    }

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
