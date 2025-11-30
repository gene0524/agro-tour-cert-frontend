import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormData, AssessmentAnswer } from "../ApplicationWizard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Slider } from "../ui/slider";
import { useMemo, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface FormStep3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
}

interface AssessmentTemplate {
  id: string;
  section_id: string;
  section_name: string;
  question_id: string;
  question_text: string;
  evaluation_criteria: string;
  order_index: number;
  applicable_categories: string[] | null;
}

interface Section {
  title: string;
  items: {
    id: string;
    question: string;
    hint: string;
  }[];
}

// Plus 認證題庫 (暫時保持靜態，後續可遷移至資料庫)
const plusAssessmentSections: Record<string, { title: string, items: { id: string, question: string, hint: string }[] }> = {
  "Plus永續行為": {
    title: "Plus 永續行為認證",
    items: [
      { id: "p_sus_01", question: "P01. 實施節能減碳具體措施", hint: "例如：使用節能設備、再生能源等" },
      { id: "p_sus_02", question: "P02. 廢棄物減量與循環利用", hint: "例如：堆肥製作、減少一次性用品" },
      { id: "p_sus_03", question: "P03. 生態保育與友善環境耕作", hint: "例如：棲地營造、無毒耕作" }
    ]
  },
  "Plus食農體驗": {
    title: "Plus 食農體驗認證",
    items: [
      { id: "p_exp_01", question: "P01. 體驗活動結合食農教育內涵", hint: "例如：產地到餐桌、認識食物來源" },
      { id: "p_exp_02", question: "P02. 體驗活動具備教育學習單或教案", hint: "具備完整教學流程與學習目標" },
      { id: "p_exp_03", question: "P03. 運用在地食材進行料理體驗", hint: "食材來源透明、具在地特色" }
    ]
  }
};

export function FormStep3({ formData, updateFormData, nextStep, prevStep, saveDraft }: FormStep3Props) {
  const [loading, setLoading] = useState(true);
  const [basicSections, setBasicSections] = useState<Section[]>([]);

  // 從 Supabase 讀取基礎認證題目
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('assessment_templates')
          .select('*')
          .eq('is_active', true)
          .order('section_id', { ascending: true })
          .order('order_index', { ascending: true });

        if (error) throw error;

        if (data) {
          // 資料轉換: Flat List -> Nested Sections
          const sectionsMap = new Map<string, Section>();
          
          data.forEach((template: AssessmentTemplate) => {
            // 檢查是否適用於當前申請類別 (如果題目有指定 applicable_categories)
            if (template.applicable_categories && template.applicable_categories.length > 0) {
              // 如果 formData.category 為空，或者不在適用列表內，則跳過
              if (!formData.category || !template.applicable_categories.includes(formData.category)) {
                return;
              }
            }

            if (!sectionsMap.has(template.section_id)) {
              sectionsMap.set(template.section_id, {
                title: template.section_name,
                items: []
              });
            }
            
            const section = sectionsMap.get(template.section_id)!;
            section.items.push({
              id: template.question_id,
              question: template.question_text,
              hint: template.evaluation_criteria || "無評分參考"
            });
          });

          setBasicSections(Array.from(sectionsMap.values()));
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error("載入題庫失敗，請稍後再試");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [formData.category]); // 當類別改變時重新篩選

  // 合併基礎題庫與 Plus 題庫
  const assessmentSections = useMemo(() => {
    const sections = [...basicSections];

    // 加入 Plus 認證題庫 (目前仍為靜態)
    if (formData.plusCategories && formData.plusCategories.length > 0) {
      formData.plusCategories.forEach((category) => {
        if (plusAssessmentSections[category]) {
          sections.push(plusAssessmentSections[category]);
        }
      });
    }

    return sections;
  }, [basicSections, formData.plusCategories]);

  const handleScoreChange = (questionId: string, score: string) => {
    // Validate score is between 0 and 5
    const numScore = parseFloat(score);
    if (score === "" || (numScore >= 0 && numScore <= 5)) {
      const currentAnswer = formData.selfAssessment[questionId] || { score: "", files: [], note: "" };
      updateFormData({
        selfAssessment: {
          ...formData.selfAssessment,
          [questionId]: { ...currentAnswer, score }
        }
      });
    }
  };

  const handleSliderChange = (questionId: string, value: number[]) => {
    const currentAnswer = formData.selfAssessment[questionId] || { score: "", files: [], note: "" };
    updateFormData({
      selfAssessment: {
        ...formData.selfAssessment,
        [questionId]: { ...currentAnswer, score: value[0].toFixed(1) }
      }
    });
  };

  const handleNoteChange = (questionId: string, note: string) => {
    const currentAnswer = formData.selfAssessment[questionId] || { score: "", files: [], note: "" };
    updateFormData({
      selfAssessment: {
        ...formData.selfAssessment,
        [questionId]: { ...currentAnswer, note }
      }
    });
  };

  const handleFileChange = (questionId: string, files: FileList | null) => {
    if (files) {
      const currentAnswer = formData.selfAssessment[questionId] || { score: "", files: [], note: "" };
      const newFiles = Array.from(files);
      updateFormData({
        selfAssessment: {
          ...formData.selfAssessment,
          [questionId]: { ...currentAnswer, files: [...currentAnswer.files, ...newFiles] }
        }
      });
    }
  };

  const handleRemoveFile = (questionId: string, fileIndex: number) => {
    const currentAnswer = formData.selfAssessment[questionId];
    if (currentAnswer) {
      const newFiles = currentAnswer.files.filter((_, index) => index !== fileIndex);
      updateFormData({
        selfAssessment: {
          ...formData.selfAssessment,
          [questionId]: { ...currentAnswer, files: newFiles }
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.items.length, 0);
  const answeredQuestions = Object.keys(formData.selfAssessment).filter(
    key => formData.selfAssessment[key].score !== ""
  ).length;

  return (
    <Card className="border-2 border-[#E5EAD9] mb-8">
      <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
        <CardTitle className="text-[#1C4A27]">3️⃣ 填寫審查自評表</CardTitle>
        <CardDescription>
          請依場域現況進行自我評估（共 {totalQuestions} 題）
          <br />
          <span className="text-xs text-gray-400">
            適用類別：{formData.category || "未選擇"} 
            {formData.plusCategories?.length > 0 && ` | 加選：${formData.plusCategories.join("、")}`}
          </span>
        </CardDescription>
        <div className="pt-2">
          <div className="text-sm text-[#555] mb-1">
            已完成 {answeredQuestions} / {totalQuestions} 題
          </div>
          <div className="h-2 bg-[#E5EAD9] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1C4A27] transition-all"
              style={{ width: `${Math.min((answeredQuestions / totalQuestions) * 100, 100)}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-[#1C4A27]">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-lg font-medium">正在載入評核項目...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-h-[60vh] overflow-y-auto p-1 pb-2 custom-scrollbar">
              <Accordion type="multiple" className="space-y-4" defaultValue={["section-0"]}>
              {assessmentSections.map((section, sectionIndex) => (
                <AccordionItem 
                  key={sectionIndex} 
                  value={`section-${sectionIndex}`}
                  className="border-2 border-[#E5EAD9] rounded-xl overflow-hidden bg-white"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-[#F4F9F6] hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1C4A27] text-white flex items-center justify-center text-sm flex-shrink-0">
                        {sectionIndex + 1}
                      </div>
                      <span className="text-[#1C4A27] text-left">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6 pt-4">
                      {section.items.map((item) => {
                        const answer = formData.selfAssessment[item.id] || { score: "", files: [], note: "" };
                        const scoreValue = answer.score ? parseFloat(answer.score) : 0;
                        
                        return (
                          <div key={item.id} className="space-y-4 p-6 bg-[#F8FAF8] rounded-xl border-2 border-[#E5EAD9]">
                            <div>
                              <Label className="text-[#333] mb-2 block text-base font-medium">{item.question}</Label>
                              <p className="text-sm text-[#84A98C] mb-3">{item.hint}</p>
                            </div>

                            {/* Score Input and Slider */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-4">
                                <Label className="text-sm text-[#555] whitespace-nowrap font-medium">自評分數：</Label>
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  placeholder="0.0"
                                  value={answer.score}
                                  onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                  className="w-24 h-10 text-center bg-white border border-gray-300 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
                                />
                                <span className="text-sm text-[#555]">/ 5.0 分</span>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-[#555]">0</span>
                                <Slider
                                  value={[scoreValue]}
                                  onValueChange={(value: number[]) => handleSliderChange(item.id, value)}
                                  min={0}
                                  max={5}
                                  step={0.1}
                                  className="flex-1"
                                />
                                <span className="text-xs text-[#555]">5</span>
                              </div>
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                              <Label className="text-sm text-[#555] font-medium">上傳佐證資料</Label>
                              <div className="border-2 border-dashed border-[#E5EAD9] rounded-lg p-4 text-center bg-white hover:bg-[#F4F9F6] transition-colors">
                                <input
                                  type="file"
                                  id={`file-${item.id}`}
                                  multiple
                                  onChange={(e) => handleFileChange(item.id, e.target.files)}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                                <Upload className="w-6 h-6 mx-auto mb-2 text-[#1C4A27]" />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById(`file-${item.id}`)?.click()}
                                  className="border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white"
                                >
                                  選擇檔案
                                </Button>
                                <p className="text-xs text-[#A9B8A1] mt-1">支援 PDF, JPG, PNG, DOC</p>
                              </div>

                              {/* Uploaded Files */}
                              {answer.files.length > 0 && (
                                <div className="space-y-2 mt-2">
                                  {answer.files.map((file, fileIndex) => (
                                    <div key={fileIndex} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#E5EAD9]">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                        <FileText className="w-4 h-4 text-[#1C4A27] flex-shrink-0" />
                                        <span className="text-sm text-[#333] truncate">{file.name}</span>
                                      </div>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveFile(item.id, fileIndex)}
                                        className="text-[#C94A4A] hover:bg-[#FFF9E6]"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Note */}
                            <div className="space-y-2">
                              <Label className="text-sm text-[#555] font-medium">補充說明（選填）</Label>
                              <Textarea
                                placeholder="請補充說明評分理由或特色..."
                                rows={2}
                                value={answer.note}
                                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                className="bg-white border border-gray-300 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27] resize-none"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              disabled={answeredQuestions < totalQuestions}
              className="flex-[2] h-14 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg disabled:opacity-50"
            >
              下一步：確認送出
            </Button>
          </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
