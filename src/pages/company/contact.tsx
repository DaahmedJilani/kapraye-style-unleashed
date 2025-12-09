import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          message: message.trim(),
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-center space-x-4 p-6 bg-kapraye-cream/20 rounded-lg">
              <Mail className="h-6 w-6 text-kapraye-burgundy" />
              <div>
                <h3 className="font-medium mb-1">Email Us</h3>
                <a href="mailto:support@kaprayé.com" className="text-sm text-muted-foreground hover:text-kapraye-burgundy transition-colors">
                  support@kaprayé.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-kapraye-cream/20 rounded-lg">
              <Phone className="h-6 w-6 text-kapraye-burgundy" />
              <div>
                <h3 className="font-medium mb-1">Call Us</h3>
                <a href="tel:+923360126555" className="text-sm text-muted-foreground hover:text-kapraye-burgundy transition-colors">
                  +92 336 0126555
                </a>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 bg-green-50 rounded-lg">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-playfair font-medium text-green-800 mb-2">
                Message Sent!
              </h2>
              <p className="text-green-700 mb-6">
                Thank you for reaching out. We'll get back to you within 24-48 hours.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full md:w-auto bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
