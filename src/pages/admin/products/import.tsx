
import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Upload, FileText, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ProductImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview' | 'complete'>('upload');
  const [error, setError] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState({
    total: 0,
    processed: 0,
    success: 0,
    failed: 0,
  });
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is CSV or Excel
      if (selectedFile.type === 'text/csv' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          selectedFile.type === 'application/vnd.ms-excel') {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError('Please upload a CSV or Excel file');
      }
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    // This is a placeholder for the actual import process
    // In a real implementation, you would:
    // 1. Parse the CSV/Excel file
    // 2. Map the columns to product fields
    // 3. Validate the data
    // 4. Import the products into the database
    
    setProcessing(true);
    setStep('mapping');
    
    // Simulate processing delay
    setTimeout(() => {
      setStep('preview');
      setTimeout(() => {
        // Simulate completion
        setImportStatus({
          total: 100,
          processed: 100,
          success: 95,
          failed: 5,
        });
        setStep('complete');
        setProcessing(false);
        
        toast({
          title: "Import completed",
          description: "95 products imported successfully, 5 failed",
        });
      }, 2000);
    }, 2000);
  };

  const downloadTemplate = () => {
    // In a real implementation, you would generate and download a CSV template
    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded to your device.",
    });
  };

  return (
    <AdminLayout title="Import Products">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Bulk Product Import</CardTitle>
          <CardDescription>
            Import multiple products at once using a CSV or Excel file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" value={step}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="mapping" disabled={step === 'upload'}>Column Mapping</TabsTrigger>
              <TabsTrigger value="preview" disabled={step === 'upload' || step === 'mapping'}>Preview</TabsTrigger>
              <TabsTrigger value="complete" disabled={step !== 'complete'}>Complete</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="py-6">
              <div className="space-y-6">
                <div className="bg-muted/50 p-8 rounded-lg border border-dashed border-muted-foreground/30 text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg mb-2">Upload Your Product Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your CSV or Excel file here, or click to browse
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col gap-2 items-center">
                    <Button asChild variant="outline">
                      <label htmlFor="file-upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Browse Files
                      </label>
                    </Button>
                    <Button variant="link" onClick={downloadTemplate}>
                      <FileText className="mr-2 h-4 w-4" />
                      Download template
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {file && (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>File selected</AlertTitle>
                    <AlertDescription>{file.name}</AlertDescription>
                  </Alert>
                )}
                
                <div className="bg-muted/30 p-4 rounded text-sm">
                  <h4 className="font-medium mb-2">Import Guidelines:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use CSV or Excel format (.csv, .xlsx)</li>
                    <li>Required fields: name, price, category, image URL</li>
                    <li>Images should be accessible via URL</li>
                    <li>Prices should be in decimal format without currency symbols</li>
                    <li>Up to 1,000 products can be imported at once</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mapping" className="py-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-4">Mapping Product Fields</h3>
                <p className="text-muted-foreground mb-8">
                  When implemented, this section will let you map CSV columns to product fields
                </p>
                <div className="flex justify-center">
                  <Button disabled={processing} onClick={() => setStep('preview')}>
                    Continue to Preview
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="py-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-4">Preview Your Products</h3>
                <p className="text-muted-foreground mb-8">
                  When implemented, this section will show a preview of the products to be imported
                </p>
                <div className="flex justify-center">
                  <Button disabled={processing} onClick={() => setStep('complete')}>
                    Start Import
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="complete" className="py-6">
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Import Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Your products have been successfully imported
                </p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-muted/30 p-4 rounded">
                    <div className="text-2xl font-bold">{importStatus.success}</div>
                    <div className="text-sm text-muted-foreground">Successfully imported</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded">
                    <div className="text-2xl font-bold">{importStatus.failed}</div>
                    <div className="text-sm text-muted-foreground">Failed to import</div>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => {
                    setFile(null);
                    setStep('upload');
                  }}>
                    Import More Products
                  </Button>
                  <Button asChild>
                    <a href="/admin/products">View All Products</a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 'upload' && (
            <>
              <Button variant="ghost" disabled>Back</Button>
              <Button 
                disabled={!file || processing} 
                onClick={handleImport}
              >
                Continue
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </AdminLayout>
  );
}
