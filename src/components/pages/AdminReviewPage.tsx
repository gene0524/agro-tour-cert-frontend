import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Download, Save, CheckCircle, XCircle, AlertTriangle, ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

interface AdminReviewPageProps {
  onBack: () => void;
}

// 模擬 Step 3 的題庫結構，用於評分
const REVIEW_SECTIONS = [
  {
    title: "整體環境與經營",
    items: [
      { id: "q01", q: "01. 場域環境具鄉村感", applicantScore: 4.5, note: "環境優美，但入口標示不清" },
      { id: "q02", q: "02. 特色農遊的經營理念", applicantScore: 5.0, note: "理念清晰完整" },
      { id: "q03", q: "03. 場域整體環境整潔度", applicantScore: 4.0, note: "" }
    ]
  },
  {
    title: "特色資源與設施",
    items: [
      { id: "q04", q: "04. 是否有特色農業專區供遊客參觀", applicantScore: 3.5, note: "專區範圍較小" },
      { id: "q05", q: "05. 是否具鄉村感建築", applicantScore: 4.0, note: "" },
      { id: "q06", q: "06. 場域內休憩設施完善度", applicantScore: 3.0, note: "休息座椅不足" }
    ]
  }
];

export function AdminReviewPage({ onBack }: AdminReviewPageProps) {
  const [reviewStatus, setReviewStatus] = useState<"pending" | "reviewing" | "completed">("reviewing");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [finalDecision, setFinalDecision] = useState<"approve" | "reject" | "amend" | null>(null);
  const [decisionNote, setDecisionNote] = useState("");

  const handleScoreChange = (id: string, value: string) => {
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 5)) {
      setScores(prev => ({ ...prev, [id]: value }));
    }
  };

  const calculateTotalScore = () => {
    let total = 0;
    let count = 0;
    Object.values(scores).forEach(s => {
      if (s) {
        total += parseFloat(s);
        count++;
      }
    });
    return count > 0 ? total.toFixed(1) : "0.0";
  };

  const handleSave = () => {
    toast.success("評分已暫存");
  };

  const handleSubmitDecision = () => {
    if (!finalDecision) {
      toast.error("請選擇審查決議");
      return;
    }
    if (finalDecision === "amend" && !decisionNote) {
      toast.error("請填寫補件要求說明");
      return;
    }
    
    toast.success("審查結果已送出", {
      description: finalDecision === "approve" ? "案件已通過，證書字號生成中" : 
                   finalDecision === "amend" ? "已發送補件通知給申請人" : "案件未通過"
    });
    setReviewStatus("completed");
  };

  return (
    <main className="min-h-screen bg-[#F7FAF7] pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E5EAD9] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回列表
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <h1 className="font-bold text-[#1C4A27]">AG-2025-001 綠野休閒農場</h1>
            <Badge className="bg-[#84A98C] text-white">待審查</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-xs text-gray-500">目前總分</div>
              <div className="text-2xl font-bold text-[#1C4A27]">{calculateTotalScore()}</div>
            </div>
            <Button variant="outline" onClick={handleSave} className="border-[#1C4A27] text-[#1C4A27]">
              <Save className="w-4 h-4 mr-2" />
              暫存評分
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Application Info */}
        <div className="space-y-6">
          <Card className="border border-[#E5EAD9]">
            <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
              <CardTitle className="text-lg text-[#1C4A27]">申請資料摘要</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="text-gray-500 text-xs">申請單位</Label>
                <div className="font-medium">綠野休閒農場</div>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">負責人</Label>
                <div className="font-medium">王小農</div>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">縣市 / 地址</Label>
                <div className="font-medium">宜蘭縣員山鄉...</div>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">申請類別</Label>
                <div className="font-medium">第一類：休閒農場</div>
              </div>
              <div>
                <Label className="text-gray-500 text-xs">特色類別</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline">米</Badge>
                  <Badge variant="outline">蔬菜</Badge>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2 text-[#1C4A27]" />
                  檢視申請檢核表
                </Button>
                <Button className="w-full justify-start bg-[#1C4A27] text-white hover:bg-[#2A5F38]">
                  <Download className="w-4 h-4 mr-2" />
                  下載原始自評表 PDF
                </Button>
                <p className="text-xs text-gray-400 text-center">
                  * 供列印給審查委員進行書面評分
                </p>

                {reviewStatus === "completed" && (
                  <div className="pt-4 animate-in fade-in slide-in-from-top-2">
                    <Separator className="my-4" />
                    <Button className="w-full justify-start bg-[#F4F9F6] text-[#1C4A27] border border-[#1C4A27] hover:bg-[#E5EAD9]">
                      <Download className="w-4 h-4 mr-2" />
                      下載最終評審報告 PDF
                    </Button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      包含完整評分與決議結果
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Decision Panel */}
          <Card className="border border-[#E5EAD9] shadow-md">
            <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
              <CardTitle className="text-lg text-[#1C4A27]">審查決議</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFinalDecision("approve")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    finalDecision === "approve" 
                      ? "border-[#1C4A27] bg-[#1C4A27]/5 text-[#1C4A27]" 
                      : "border-gray-200 text-gray-500 hover:border-[#1C4A27]/30"
                  }`}
                >
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium text-sm">通過</span>
                </button>
                <button
                  onClick={() => setFinalDecision("amend")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    finalDecision === "amend" 
                      ? "border-[#C94A4A] bg-[#C94A4A]/5 text-[#C94A4A]" 
                      : "border-gray-200 text-gray-500 hover:border-[#C94A4A]/30"
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                  <span className="font-medium text-sm">需補件</span>
                </button>
                <button
                  onClick={() => setFinalDecision("reject")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                    finalDecision === "reject" 
                      ? "border-gray-800 bg-gray-100 text-gray-800" 
                      : "border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  <XCircle className="w-6 h-6" />
                  <span className="font-medium text-sm">不通過</span>
                </button>
              </div>

              {finalDecision === "amend" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label>補件要求說明 *</Label>
                  <Textarea 
                    placeholder="請詳細說明需要補正的文件或內容..."
                    value={decisionNote}
                    onChange={(e) => setDecisionNote(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}

              {finalDecision === "approve" && (
                <div className="p-3 bg-[#F4F9F6] rounded-lg text-sm text-[#1C4A27] animate-in fade-in">
                  系統將自動產生證書字號並通知申請人。
                </div>
              )}

              <Button 
                className="w-full h-12 text-lg" 
                onClick={handleSubmitDecision}
                disabled={!finalDecision}
              >
                確認送出決議
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Scoring Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-[#E5EAD9]">
            <CardHeader className="bg-white border-b border-[#E5EAD9]">
              <CardTitle className="text-[#1C4A27]">委員評分輸入</CardTitle>
              <CardDescription>請依照書面審查結果輸入分數與評語</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {REVIEW_SECTIONS.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    <h3 className="font-bold text-lg text-[#1C4A27] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1C4A27] text-white flex items-center justify-center text-xs">
                        {sIdx + 1}
                      </span>
                      {section.title}
                    </h3>
                    <div className="space-y-4 pl-2 border-l-2 border-gray-100 ml-3">
                      {section.items.map((item) => (
                        <div key={item.id} className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E5EAD9]">
                          <div className="flex justify-between items-start mb-3">
                            <div className="font-medium text-[#333]">{item.q}</div>
                            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
                              申請自評：{item.applicantScore}
                            </div>
                          </div>
                          
                          {item.note && (
                            <div className="text-sm text-gray-500 mb-4 bg-white/50 p-2 rounded">
                              申請人備註：{item.note}
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <Label className="text-xs text-[#1C4A27]">委員給分 (0-5)</Label>
                              <Input 
                                type="number" 
                                min="0" 
                                max="5" 
                                step="0.1"
                                placeholder="0.0"
                                value={scores[item.id] || ""}
                                onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                className="bg-white border-[#1C4A27]/30 focus:border-[#1C4A27] text-center font-bold text-lg"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <Label className="text-xs text-[#1C4A27]">委員評語</Label>
                              <Input 
                                placeholder="請輸入評語..."
                                value={comments[item.id] || ""}
                                onChange={(e) => setComments(prev => ({...prev, [item.id]: e.target.value}))}
                                className="bg-white border-[#1C4A27]/30 focus:border-[#1C4A27]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

