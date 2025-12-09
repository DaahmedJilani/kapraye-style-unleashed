import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Building, Loader2, Upload, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const positions = [
    {
      title: "Senior Fashion Designer",
      department: "Design",
      location: "Lahore",
      type: "Full-time"
    },
    {
      title: "E-commerce Manager",
      department: "Digital",
      location: "Karachi",
      type: "Full-time"
    },
    {
      title: "Retail Store Manager",
      department: "Operations",
      location: "Islamabad",
      type: "Full-time"
    }
  ];

  const handleApplyClick = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    setIsDialogOpen(true);
    setIsSubmitted(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume/CV");
      return;
    }

    setIsLoading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(resumeFile);
      const resumeBase64 = await base64Promise;

      const { error } = await supabase.functions.invoke("send-resume", {
        body: {
          applicantName: formData.name.trim(),
          applicantEmail: formData.email.toLowerCase().trim(),
          applicantPhone: formData.phone.trim(),
          position: selectedPosition,
          coverLetter: formData.coverLetter.trim(),
          resumeBase64,
          resumeFileName: resumeFile.name,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
      setResumeFile(null);
    } catch (error) {
      console.error("Application error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPosition(null);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    setResumeFile(null);
  };

  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Join Our Team</h1>
          
          <p className="text-lg mb-12">
            At <span className="font-above-beyond">Kaprayé</span>, we're always looking for talented individuals who are passionate about fashion and retail. Join us in our mission to transform the fashion industry in Pakistan.
          </p>
          
          <div className="space-y-6">
            {positions.map((position) => (
              <Card key={position.title} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">{position.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
                    onClick={() => handleApplyClick(position.title)}
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair">
              Apply for {selectedPosition}
            </DialogTitle>
          </DialogHeader>

          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-green-800 mb-2">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground mb-4">
                Thank you for applying. We'll review your resume and get back to you soon.
              </p>
              <Button onClick={handleCloseDialog} variant="outline">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Resume/CV *</label>
                <div className="border-2 border-dashed border-muted rounded-lg p-4">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {resumeFile ? resumeFile.name : "Click to upload PDF or Word document"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      Max size: 5MB
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Letter (Optional)</label>
                <Textarea
                  placeholder="Tell us why you're a great fit for this role..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  disabled={isLoading}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
