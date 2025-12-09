import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResumeRequest {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  position: string;
  coverLetter?: string;
  resumeBase64: string;
  resumeFileName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ResumeRequest = await req.json();
    console.log("Received resume application for:", data.position, "from:", data.applicantEmail);

    const brandName = "Kapraye";
    const brandColor = "#D4AF37";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #1a1a1a; padding: 30px; text-align: center; }
          .header h1 { color: ${brandColor}; margin: 0; font-size: 28px; letter-spacing: 2px; }
          .content { padding: 40px 30px; }
          .content h2 { color: #1a1a1a; margin-top: 0; }
          .details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .details p { margin: 8px 0; color: #333; }
          .highlight { color: ${brandColor}; font-weight: bold; }
          .footer { background-color: #1a1a1a; padding: 20px; text-align: center; }
          .footer p { color: #888; margin: 5px 0; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>📄 NEW JOB APPLICATION - RESUME</h1></div>
          <div class="content">
            <h2>New Application Received</h2>
            <p>A new job application has been submitted through the Kaprayé website.</p>
            <div class="details">
              <p><strong>Position Applied:</strong> <span class="highlight">${data.position}</span></p>
              <p><strong>Applicant Name:</strong> <span class="highlight">${data.applicantName}</span></p>
              <p><strong>Email:</strong> <span class="highlight">${data.applicantEmail}</span></p>
              <p><strong>Phone:</strong> <span class="highlight">${data.applicantPhone}</span></p>
            </div>
            ${data.coverLetter ? `
              <h3>Cover Letter:</h3>
              <div class="details">
                <p>${data.coverLetter.replace(/\n/g, '<br>')}</p>
              </div>
            ` : ''}
            <p><strong>📎 Resume attached:</strong> ${data.resumeFileName}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} ${brandName} Careers</p>
            <p>This is an automated email from the careers portal</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Convert base64 to buffer for attachment
    const resumeBuffer = Uint8Array.from(atob(data.resumeBase64), c => c.charCodeAt(0));

    const emailResponse = await resend.emails.send({
      from: "Kapraye Careers <onboarding@resend.dev>",
      to: ["support@kaprayé.com"],
      subject: `📄 RESUME: ${data.position} - ${data.applicantName}`,
      html: emailHtml,
      attachments: [
        {
          filename: data.resumeFileName,
          content: resumeBuffer,
        },
      ],
    });

    console.log("Resume email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending resume:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
