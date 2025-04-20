
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Building } from "lucide-react";

export default function CareersPage() {
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

  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Join Our Team</h1>
          
          <p className="text-lg mb-12">
            At Kaprayé, we're always looking for talented individuals who are passionate about fashion and retail. Join us in our mission to transform the fashion industry in Pakistan.
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
                  <Button className="bg-kapraye-burgundy hover:bg-kapraye-burgundy/90">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
