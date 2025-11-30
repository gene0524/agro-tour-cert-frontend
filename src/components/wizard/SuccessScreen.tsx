import { CheckCircle, Home, FileText, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface SuccessScreenProps {
  onReset: () => void;
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-2 border-[#E5EAD9]">
        <CardContent className="pt-12 pb-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-[#1C4A27] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-[#1C4A27] mb-3">✅ 申請已送出！</h1>
            <p className="text-[#555] mb-4">
              我們已收到您的資料，審查結果將以 Email 通知您。
            </p>
            <div className="inline-block bg-[#F4F9F6] border-2 border-[#E5EAD9] rounded-xl px-6 py-3">
              <p className="text-sm text-[#333]">
                申請編號：<span className="text-[#1C4A27]">AG-2025-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
              </p>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#F4F9F6] border border-[#E5EAD9] rounded-xl p-4">
              <FileText className="w-8 h-8 text-[#1C4A27] mx-auto mb-2" />
              <h4 className="text-[#1C4A27] mb-1">書審作業</h4>
              <p className="text-sm text-[#555]">約 7-10 個工作天</p>
            </div>
            <div className="bg-[#F4F9F6] border border-[#E5EAD9] rounded-xl p-4">
              <CheckCircle className="w-8 h-8 text-[#1C4A27] mx-auto mb-2" />
              <h4 className="text-[#1C4A27] mb-1">認證核發</h4>
              <p className="text-sm text-[#555]">審查通過後核發</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white border-2 border-[#E5EAD9] rounded-xl p-6 text-left mb-8">
            <h3 className="text-[#1C4A27] mb-4">📌 接下來的流程</h3>
            <ol className="space-y-3 text-sm text-[#555]">
              <li className="flex gap-3">
                <span className="text-[#1C4A27]">1.</span>
                <span>您將在 1 個工作天內收到申請確認信</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1C4A27]">2.</span>
                <span>管理員將審查您的申請資料與自評表</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1C4A27]">3.</span>
                <span>若需補件，將以 Email 通知並標示補件項目</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1C4A27]">4.</span>
                <span>書審通過後，約 2 週內公告認證結果</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onReset}
              className="flex-1 h-14 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首頁
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-14 border-2 border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white rounded-xl text-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              查看申請紀錄
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-[#E5EAD9]">
            <p className="text-sm text-[#555]">
              如有任何問題，請聯繫：<br />
              <span className="text-[#1C4A27]">Taiwan Agro-Tour Certification Center</span><br />
              Email: certification@agrotour.org.tw | Tel: (02) 1234-5678
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
