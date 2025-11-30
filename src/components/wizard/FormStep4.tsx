import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FormData } from "../ApplicationWizard";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { CheckCircle2 } from "lucide-react";

interface FormStep4Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  handleSubmit: () => void;
  prevStep: () => void;
}

export function FormStep4({ formData, updateFormData, handleSubmit, prevStep }: FormStep4Props) {
  const totalQuestions = 17;
  const answeredQuestions = Object.keys(formData.selfAssessment).filter(
    key => formData.selfAssessment[key].score !== ""
  ).length;
  const totalScore = Object.values(formData.selfAssessment).reduce((sum, answer) => {
    const score = parseFloat(answer.score) || 0;
    return sum + score;
  }, 0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmed) {
      handleSubmit();
    }
  };

  return (
    <Card className="border-2 border-[#E5EAD9]">
      <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
        <CardTitle className="text-[#1C4A27]">4️⃣ 送出申請</CardTitle>
        <CardDescription>請再次確認所有資訊無誤，然後提交您的申請</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Summary Section */}
          <div className="space-y-4">
            <h3 className="text-[#1C4A27]">申請資訊摘要</h3>
            
            <div className="bg-white border-2 border-[#E5EAD9] rounded-xl overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">場域名稱</TableCell>
                    <TableCell>{formData.farmName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">負責人</TableCell>
                    <TableCell>{formData.ownerName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">聯絡電話</TableCell>
                    <TableCell>{formData.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">E-mail</TableCell>
                    <TableCell>{formData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">場域地址</TableCell>
                    <TableCell>{formData.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">申請類別</TableCell>
                    <TableCell>{formData.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#F4F9F6]">申請年份</TableCell>
                    <TableCell>{formData.year} 年</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Checklist Summary */}
          <div className="space-y-3">
            <h3 className="text-[#1C4A27]">檢核項目</h3>
            <div className="bg-[#F4F9F6] border-2 border-[#E5EAD9] rounded-xl p-4 space-y-2">
              {formData.checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1C4A27] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#333]">{item}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-[#E5EAD9]">
                <p className="text-sm text-[#555]">
                  已上傳文件：{formData.documents.length} 個檔案
                </p>
              </div>
            </div>
          </div>

          {/* Self-Assessment Summary */}
          <div className="space-y-3">
            <h3 className="text-[#1C4A27]">自評結果</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F4F9F6] border-2 border-[#E5EAD9] rounded-xl p-4 text-center">
                <div className="text-3xl text-[#1C4A27] mb-1">{answeredQuestions}</div>
                <div className="text-sm text-[#555]">完成題數 / {totalQuestions}</div>
              </div>
              <div className="bg-[#F4F9F6] border-2 border-[#E5EAD9] rounded-xl p-4 text-center">
                <div className="text-3xl text-[#1C4A27] mb-1">{totalScore.toFixed(1)}</div>
                <div className="text-sm text-[#555]">自評總分 / 85.0</div>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="bg-[#FFF9E6] border-2 border-[#FFE4A3] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirm"
                checked={formData.confirmed}
                onCheckedChange={(checked) => updateFormData({ confirmed: checked as boolean })}
                className="mt-1 h-5 w-5 border-[#1C4A27] data-[state=checked]:bg-[#1C4A27]"
              />
              <Label htmlFor="confirm" className="cursor-pointer text-[#333] leading-relaxed">
                我已確認以上資料正確並同意提供資料予台灣休閒農業發展協會，作為特色農遊認證審查使用
              </Label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex-1 h-14 border-2 border-[#E5EAD9] text-[#555] hover:bg-[#E5EAD9] rounded-xl text-lg"
            >
              返回修改
            </Button>
            <Button
              type="submit"
              disabled={!formData.confirmed}
              className="flex-1 h-14 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg disabled:opacity-50"
            >
              提交申請
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
