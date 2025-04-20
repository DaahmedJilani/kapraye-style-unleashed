
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
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
                <p className="text-sm text-muted-foreground">support@kapraye.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-kapraye-cream/20 rounded-lg">
              <Phone className="h-6 w-6 text-kapraye-burgundy" />
              <div>
                <h3 className="font-medium mb-1">Call Us</h3>
                <p className="text-sm text-muted-foreground">+92 300 1234567</p>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="Your email" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
            </div>
            
            <Button className="w-full md:w-auto bg-kapraye-burgundy hover:bg-kapraye-burgundy/90">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
