
import { MainLayout } from "@/components/layout/main-layout";

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="container py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-playfair font-medium text-kapraye-burgundy mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg">
            <p className="text-lg mb-6">
              Welcome to <span className="font-above-beyond">Kaprayé</span>. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">1. Use License</h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) on <span className="font-above-beyond">Kaprayé</span>'s website for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">2. Disclaimer</h2>
            <p className="mb-6">
              The materials on <span className="font-above-beyond">Kaprayé</span>'s website are provided on an 'as is' basis. <span className="font-above-beyond">Kaprayé</span> makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-2xl font-playfair text-kapraye-burgundy mt-8 mb-4">3. Limitations</h2>
            <p className="mb-6">
              In no event shall <span className="font-above-beyond">Kaprayé</span> or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on <span className="font-above-beyond">Kaprayé</span>'s website.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
