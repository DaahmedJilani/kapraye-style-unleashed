
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

// NOTE: This page is temporarily disabled until the notes table is created in Phase 2
// The notes feature will be part of the CMS functionality

export default function NotesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally redirect users away from this page
    // navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-kapraye-burgundy font-bold">
              Notes Feature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                The notes feature is currently being rebuilt as part of the new admin system.
                This functionality will be available in Phase 2 when we create the database tables.
                Please check back soon!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
