import { useState, useEffect } from "react";
import { WizardProgress } from "./WizardProgress";
import { FormStep1 } from "./wizard/FormStep1";
import { FormStep2 } from "./wizard/FormStep2";
import { FormStep3 } from "./wizard/FormStep3";
import { FormStep4 } from "./wizard/FormStep4";
import { SuccessScreen } from "./wizard/SuccessScreen";
import { toast } from "sonner";

export interface AssessmentAnswer {
  score: string;
  files: File[];
  note: string;
}

export interface FormData {
  // Step 1
  farmName: string;
  companyName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  category: string;
  specialty: string[];
  plusCategories: string[];
  year: string;
  
  // Step 2
  checklist: string[];
  documents: File[];
  
  // Step 3
  selfAssessment: { [key: string]: AssessmentAnswer };
  
  // Step 4
  confirmed: boolean;
}

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    farmName: "",
    companyName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    category: "",
    specialty: [],
    plusCategories: [],
    year: new Date().getFullYear().toString(),
    checklist: [],
    documents: [],
    selfAssessment: {},
    confirmed: false
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("certification_draft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        // Note: File objects are lost in JSON serialization/deserialization
        // In a real app, you'd handle file re-hydration or store file URLs
        setFormData(prev => ({
          ...prev,
          ...parsedDraft,
          // Ensure we don't overwrite with undefined if schema changed
          documents: [], // Files cannot be restored from localStorage text
          selfAssessment: Object.keys(parsedDraft.selfAssessment || {}).reduce((acc, key) => {
            acc[key] = {
              ...parsedDraft.selfAssessment[key],
              files: [] // Files cannot be restored
            };
            return acc;
          }, {} as { [key: string]: AssessmentAnswer })
        }));
        toast.success("已載入上次的草稿");
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSaveDraft = () => {
    try {
      // Create a copy to strip out File objects before saving
      const draftData = { ...formData };
      // Files cannot be stringified, so we ignore them for localStorage draft
      // In a real implementation with backend, files would be uploaded first
      localStorage.setItem("certification_draft", JSON.stringify(draftData));
      toast.success("草稿已儲存", { description: "您可以隨時回來繼續填寫（檔案需重新上傳）" });
    } catch (e) {
      toast.error("儲存失敗", { description: "瀏覽器儲存空間可能已滿" });
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    localStorage.removeItem("certification_draft"); // Clear draft on success
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    localStorage.removeItem("certification_draft");
    setFormData({
      farmName: "",
      companyName: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      category: "",
      specialty: [],
      plusCategories: [],
      year: new Date().getFullYear().toString(),
      checklist: [],
      documents: [],
      selfAssessment: {},
      confirmed: false
    });
  };

  if (isSubmitted) {
    return <SuccessScreen onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8]">

      {/* Progress */}
      <div className="sticky top-[72px] z-40 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <WizardProgress currentStep={currentStep} totalSteps={4} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {currentStep === 1 && (
          <FormStep1 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            saveDraft={handleSaveDraft}
          />
        )}
        {currentStep === 2 && (
          <FormStep2 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
            saveDraft={handleSaveDraft}
          />
        )}
        {currentStep === 3 && (
          <FormStep3 
            formData={formData} 
            updateFormData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
            saveDraft={handleSaveDraft}
          />
        )}
        {currentStep === 4 && (
          <FormStep4 
            formData={formData} 
            updateFormData={updateFormData} 
            handleSubmit={handleSubmit} 
            prevStep={prevStep} 
          />
        )}
      </main>
    </div>
  );
}
