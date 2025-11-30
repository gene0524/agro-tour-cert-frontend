import { Check } from "lucide-react";

export function StepProgress() {
  const steps = [
    { id: "A", label: "基本資料填寫", completed: true },
    { id: "B", label: "申請檢核表上傳", completed: false, active: true },
    { id: "C", label: "填寫審查自評表", completed: false },
    { id: "D", label: "送出申請", completed: false }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#E5EAD9] -z-0">
          <div className="h-full bg-[#1C4A27] transition-all duration-500" style={{ width: "16.6%" }} />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all ${
                step.completed
                  ? "bg-[#1C4A27] border-[#1C4A27] text-white"
                  : step.active
                  ? "bg-white border-[#1C4A27] text-[#1C4A27]"
                  : "bg-white border-[#A9B8A1] text-[#A9B8A1]"
              }`}
            >
              {step.completed ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="font-semibold">{step.id}</span>
              )}
            </div>
            <div className="text-center">
              <div className={`text-sm ${step.active || step.completed ? "text-[#1C4A27]" : "text-[#A9B8A1]"}`}>
                {step.id}. {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
