import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FormData } from "../ApplicationWizard";
import { Upload, FileText, Download } from "lucide-react";
import { useState } from "react";

interface FormStep2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
}

export function FormStep2({ formData, updateFormData, nextStep, prevStep, saveDraft }: FormStep2Props) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const checklistItems = [
    "已具備合法場域證明或許可證",
    "已具備商業登記或相關營業核准文件",
    "已具備公共安全檢查合格證明"
  ];

  const handleDownloadTemplate = () => {
    // 這裡模擬下載，實際應連結到後端 API 或靜態檔案
    alert("正在下載檢核表模板...");
  };

  const handleChecklistChange = (item: string, checked: boolean) => {
    const newChecklist = checked
      ? [...formData.checklist, item]
      : formData.checklist.filter(i => i !== item);
    updateFormData({ checklist: newChecklist });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileNames = files.map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
      updateFormData({ documents: [...formData.documents, ...files] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Card className="border-2 border-[#E5EAD9]">
      <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#1C4A27]">2️⃣ 申請檢核表上傳</CardTitle>
            <CardDescription>請確認您是否具備申請條件並上傳相關文件</CardDescription>
          </div>
          <Button 
            variant="outline" 
            className="border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white gap-2"
            onClick={handleDownloadTemplate}
          >
            <Download className="w-4 h-4" />
            下載檢核表模板
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Checklist */}
          <div className="space-y-4">
            <Label>請確認以下項目 *</Label>
            <div className="space-y-4 bg-white border-2 border-[#E5EAD9] rounded-xl p-6">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Checkbox
                    id={`checklist-${index}`}
                    checked={formData.checklist.includes(item)}
                    onCheckedChange={(checked: boolean) => handleChecklistChange(item, checked)}
                    className="mt-1 h-5 w-5 border-[#1C4A27] data-[state=checked]:bg-[#1C4A27]"
                  />
                  <label
                    htmlFor={`checklist-${index}`}
                    className="text-[#333] leading-relaxed cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#555]">
              已勾選 {formData.checklist.length} / {checklistItems.length} 項
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <Label htmlFor="documents">上傳附件（例如保單或登記證）</Label>
            <div className="border-2 border-dashed border-[#E5EAD9] rounded-xl p-8 text-center bg-white hover:bg-[#F4F9F6] transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#1C4A27]" />
              <p className="text-[#555] mb-4">
                拖曳檔案至此或點擊上傳
              </p>
              <input
                type="file"
                id="documents"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('documents')?.click()}
                className="border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white"
              >
                選擇檔案
              </Button>
              <p className="text-xs text-[#A9B8A1] mt-2">
                支援格式：PDF, JPG, PNG, DOC, DOCX
              </p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>已上傳檔案：</Label>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-[#F4F9F6] rounded-lg">
                    <FileText className="w-5 h-5 text-[#1C4A27]" />
                    <span className="text-sm text-[#333]">{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex-1 h-14 border-2 border-[#E5EAD9] text-[#555] hover:bg-[#E5EAD9] rounded-xl text-lg"
            >
              上一步
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={saveDraft}
              className="flex-1 h-14 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-lg"
            >
              暫存草稿
            </Button>
            <Button
              type="submit"
              disabled={formData.checklist.length < checklistItems.length}
              className="flex-[2] h-14 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg disabled:opacity-50"
            >
              下一步：填寫審查自評表
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
