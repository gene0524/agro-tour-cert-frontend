import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormData, AssessmentAnswer } from "../ApplicationWizard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Upload, FileText, X } from "lucide-react";
import { Slider } from "../ui/slider";
import { useMemo } from "react";

interface FormStep3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  saveDraft: () => void;
}

// 基礎題庫 (四個構面)
const baseAssessmentSections = [
  {
    title: "整體環境與經營",
    items: [
      {
        id: "q01",
        question: "01. 場域環境具鄉村感",
        hint: "評分參考：0分=缺乏鄉村感、2.5分=具鄉村感、5分=濃厚鄉村感"
      },
      {
        id: "q02",
        question: "02. 特色農遊的經營理念",
        hint: "評分參考：0分=無、2.5分=有理念、5分=具創意與完整性"
      },
      {
        id: "q03",
        question: "03. 場域整體環境整潔度",
        hint: "評分參考：0分=不整潔、2.5分=普通、5分=非常整潔"
      }
    ]
  },
  {
    title: "特色資源與設施",
    items: [
      {
        id: "q04",
        question: "04. 是否有特色農業專區供遊客參觀",
        hint: "評分參考：0分=無、2.5分=有但一般、5分=有且規劃良好"
      },
      {
        id: "q05",
        question: "05. 是否具鄉村感建築",
        hint: "評分參考：0分=無、2.5分=部分具特色、5分=具濃厚鄉村感"
      },
      {
        id: "q06",
        question: "06. 場域內休憩設施完善度",
        hint: "評分參考：0分=不完善、2.5分=普通、5分=非常完善"
      }
    ]
  },
  {
    title: "體驗活動與服務",
    items: [
      {
        id: "q07",
        question: "07. 提供農業相關體驗活動",
        hint: "評分參考：0分=無、2.5分=有基本體驗、5分=有豐富多元體驗"
      },
      {
        id: "q08",
        question: "08. 體驗活動安全性與導覽說明",
        hint: "評分參考：0分=不足、2.5分=普通、5分=非常完善"
      },
      {
        id: "q09",
        question: "09. 服務人員態度與專業度",
        hint: "評分參考：0分=不佳、2.5分=普通、5分=優良"
      },
      {
        id: "q10",
        question: "10. 場域特色商品開發",
        hint: "評分參考：0分=無、2.5分=有一般商品、5分=有特色創意商品"
      }
    ]
  },
  {
    title: "安全與環境保護",
    items: [
      {
        id: "q11",
        question: "11. 場域安全管理措施",
        hint: "評分參考：0分=不足、2.5分=普通、5分=完善"
      },
      {
        id: "q12",
        question: "12. 環境保護與資源利用",
        hint: "評分參考：0分=未實施、2.5分=有基本措施、5分=落實永續經營"
      },
      {
        id: "q13",
        question: "13. 垃圾分類與環境清潔",
        hint: "評分參考：0分=不佳、2.5分=普通、5分=優良"
      }
    ]
  }
];

// 第五構面 (僅第一類、第二類適用)
const fifthSection = {
  title: "在地連結與創新 (第五構面)",
  items: [
    {
      id: "q14",
      question: "14. 與在地社區合作程度",
      hint: "評分參考：0分=無、2.5分=有基本合作、5分=深度合作"
    },
    {
      id: "q15",
      question: "15. 運用在地食材與農產品",
      hint: "評分參考：0分=無、2.5分=部分使用、5分=大量使用"
    },
    {
      id: "q16",
      question: "16. 場域創新與特色發展",
      hint: "評分參考：0分=無特色、2.5分=有一定特色、5分=非常創新獨特"
    },
    {
      id: "q17",
      question: "17. 農業文化傳承與教育",
      hint: "評分參考：0分=無、2.5分=有基本介紹、5分=深入教育傳承"
    }
  ]
};

// Plus 認證題庫
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
  // 動態生成題庫
  const assessmentSections = useMemo(() => {
    const sections = [...baseAssessmentSections];

    // 判斷是否需要加入第五構面 (第一類或第二類)
    // 這裡假設 formData.category 的字串包含 "第一類" 或 "第二類"
    if (formData.category?.includes("第一類") || formData.category?.includes("第二類")) {
      sections.push(fifthSection);
    }

    // 加入 Plus 認證題庫
    if (formData.plusCategories && formData.plusCategories.length > 0) {
      formData.plusCategories.forEach((category) => {
        if (plusAssessmentSections[category]) {
          sections.push(plusAssessmentSections[category]);
        }
      });
    }

    return sections;
  }, [formData.category, formData.plusCategories]);

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
      </CardContent>
    </Card>
  );
}
