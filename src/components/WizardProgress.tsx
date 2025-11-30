import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const steps = [
    { number: 1, label: "基本資料填寫" },
    { number: 2, label: "申請檢核表上傳" },
    { number: 3, label: "填寫審查自評表" },
    { number: 4, label: "送出申請" }
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#1C4A27]">步驟 {currentStep} / {totalSteps}</span>
          <span className="text-sm text-[#555]">{Math.round(progress)}% 完成</span>
        </div>
        <div className="h-2 bg-[#E5EAD9] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1C4A27] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-[#E5EAD9]">
            <div 
              className="h-full bg-[#1C4A27] transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-2 relative z-10 bg-[#F8FAF8] px-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step.number < currentStep
                    ? "bg-[#1C4A27] border-[#1C4A27] text-white"
                    : step.number === currentStep
                    ? "bg-white border-[#1C4A27] text-[#1C4A27]"
                    : "bg-white border-[#A9B8A1] text-[#A9B8A1]"
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <div className="text-center max-w-[120px]">
                <div className={`text-sm ${step.number <= currentStep ? "text-[#1C4A27]" : "text-[#A9B8A1]"}`}>
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
