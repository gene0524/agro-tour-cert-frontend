import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Lock, User, Shield } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: "applicant" | "admin") => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [applicantUsername, setApplicantUsername] = useState("");
  const [applicantPassword, setApplicantPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleApplicantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 只要有輸入任何內容就可以登入
    if (applicantUsername && applicantPassword) {
      onLogin("applicant");
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 只要有輸入任何內容就可以登入
    if (adminUsername && adminPassword) {
      onLogin("admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF7] flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-[#1C4A27] text-white">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              🌾
            </div>
            <div>
              <div className="font-semibold">特色農遊認證系統</div>
              <div className="text-xs text-white/80">Special Agro-tourism Spot Certification</div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-2 border-[#E5EAD9] mt-20">
        <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
          <CardTitle className="text-[#1C4A27] text-center">系統登入</CardTitle>
          <CardDescription className="text-center">請選擇身份登入認證系統</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="applicant" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="applicant" className="data-[state=active]:bg-[#1C4A27] data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                申請者
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-[#1C4A27] data-[state=active]:text-white">
                <Shield className="w-4 h-4 mr-2" />
                管理員
              </TabsTrigger>
            </TabsList>

            {/* Applicant Login */}
            <TabsContent value="applicant">
              <form onSubmit={handleApplicantLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="applicant-username">帳號 / Email</Label>
                  <Input
                    id="applicant-username"
                    type="text"
                    placeholder="請輸入帳號或 Email"
                    value={applicantUsername}
                    onChange={(e) => setApplicantUsername(e.target.value)}
                    required
                    className="h-12 bg-white border-[#E5EAD9] focus:border-[#1C4A27]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant-password">密碼</Label>
                  <Input
                    id="applicant-password"
                    type="password"
                    placeholder="請輸入密碼"
                    value={applicantPassword}
                    onChange={(e) => setApplicantPassword(e.target.value)}
                    required
                    className="h-12 bg-white border-[#E5EAD9] focus:border-[#1C4A27]"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-[#1C4A27] hover:underline">
                    忘記密碼？
                  </a>
                  <a href="#" className="text-[#1C4A27] hover:underline">
                    還沒有帳號？註冊
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg mt-6"
                >
                  <User className="w-5 h-5 mr-2" />
                  登入申請者系統
                </Button>
              </form>
            </TabsContent>

            {/* Admin Login */}
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">管理員帳號</Label>
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="請輸入管理員帳號"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    className="h-12 bg-white border-[#E5EAD9] focus:border-[#1C4A27]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">密碼</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="請輸入密碼"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="h-12 bg-white border-[#E5EAD9] focus:border-[#1C4A27]"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-[#1C4A27] hover:underline">
                    忘記密碼？
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg mt-6"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  登入管理後台
                </Button>
              </form>

              <div className="mt-4 p-3 bg-[#FFF9E6] border border-[#FFE4A3] rounded-lg">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-[#D4A017] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#555] leading-relaxed">
                    管理員帳號由協會統一核發，若有登入問題請聯繫系統管理員
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-center text-sm text-[#555]">
        <p>© 2025 台灣休閒農業發展協會 | 特色農遊認證數位化系統 v1.0</p>
        <p className="mt-1">客服專線：(02) 1234-5678 | Email: certification@agrotour.org.tw</p>
        <p className="mt-2 text-xs text-[#84A98C]">💡 測試模式：隨意輸入帳號密碼即可登入</p>
      </div>
    </div>
  );
}
