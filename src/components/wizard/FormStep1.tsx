import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { FormData } from "../ApplicationWizard";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

interface FormStep1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  saveDraft: () => void;
}

const APPLICATION_TYPES = [
  "第一類：休閒農場",
  "第二類：農業旅遊經營體",
  "第三類：農業相關組織",
  "第四類：農村社區企業",
];

const SPECIALTY_CATEGORIES = [
  "米", "蔬菜", "水果", "茶", "咖啡",
  "花卉", "香藥染草", "雜糧", "可可", "特用作物",
  "觀賞作物", "林木", "竹林", "養殖", "娛樂漁業",
  "禽", "蜜蜂", "畜", "漁撈"
];

const CITIES = [
  "宜蘭縣", "基隆市", "臺北市", "新北市", "桃園市",
  "新竹縣", "新竹市", "苗栗縣", "臺中市", "彰化縣",
  "南投縣", "雲林縣", "嘉義縣", "嘉義市", "臺南市",
  "高雄市", "屏東縣", "臺東縣", "花蓮縣", "澎湖縣",
  "金門縣", "連江縣"
];

const PLUS_CERTIFICATIONS = [
  "Plus永續行為",
  "Plus食農體驗"
];

export function FormStep1({ formData, updateFormData, nextStep, saveDraft }: FormStep1Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.specialty || formData.specialty.length === 0) {
      toast.error("請至少選擇一項特色類別");
      // 滾動到特色類別區塊 (選填)
      const specialtySection = document.getElementById("specialty-section");
      specialtySection?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    nextStep();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const toggleSpecialty = (item: string) => {
    const current = formData.specialty || [];
    if (current.includes(item)) {
      updateFormData({ specialty: current.filter((i) => i !== item) });
    } else {
      updateFormData({ specialty: [...current, item] });
    }
  };

  const togglePlus = (item: string) => {
    const current = formData.plusCategories || [];
    if (current.includes(item)) {
      updateFormData({ plusCategories: current.filter((i) => i !== item) });
    } else {
      updateFormData({ plusCategories: [...current, item] });
    }
  };

  return (
    <Card className="border-2 border-[#E5EAD9]">
      <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
        <CardTitle className="text-[#1C4A27]">1️⃣ 基本資料填寫</CardTitle>
        <CardDescription>請輸入您的基本場域資訊與申請類別</CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 區塊 1: 基本資料 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#1C4A27] border-l-4 border-[#1C4A27] pl-3">
              基本聯絡資訊
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="farmName">申請單位名稱 *</Label>
            <Input
              id="farmName"
              value={formData.farmName}
              onChange={(e) => updateFormData({ farmName: e.target.value })}
                  placeholder="例如：山裡花園農場"
              required
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">公司登記名稱</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
                  placeholder="若無可略過"
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerName">負責人姓名 *</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => updateFormData({ ownerName: e.target.value })}
              required
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">聯絡電話 *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
                  placeholder="0912-345-678"
              required
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
          </div>
              <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* 區塊 2: 地理位置 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#1C4A27] border-l-4 border-[#1C4A27] pl-3">
              場域位置
            </h3>
            <div className="grid gap-6 md:grid-cols-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="city">縣市 *</Label>
                <Select value={formData.city} onValueChange={(value: string) => updateFormData({ city: value })}>
                  <SelectTrigger className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]">
                    <SelectValue placeholder="選擇縣市" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-4">
                <Label htmlFor="address">詳細地址 *</Label>
                <Input
              id="address"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
                  placeholder="鄉鎮市區、路街巷弄號樓"
              required
                  className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]"
            />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* 區塊 3: 申請身分 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#1C4A27] border-l-4 border-[#1C4A27] pl-3">
              申請身分類別
            </h3>
          <div className="space-y-2">
              <Label htmlFor="category">主要申請類別 *</Label>
              <Select value={formData.category} onValueChange={(value: string) => updateFormData({ category: value })}>
                <SelectTrigger className="h-14 text-lg bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]">
                  <SelectValue placeholder="請選擇您的申請類別" />
              </SelectTrigger>
              <SelectContent>
                  {APPLICATION_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="text-base py-3">
                      {type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
              <p className="text-sm text-gray-500 mt-2">
                * 第一類及第二類申請者需填寫第五構面自評表
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* 區塊 4: 特色類別 (多選) */}
          <div id="specialty-section" className="space-y-6">
            <h3 className="text-lg font-medium text-[#1C4A27] border-l-4 border-[#1C4A27] pl-3">
              特色類別 (可複選)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {SPECIALTY_CATEGORIES.map((item) => (
                <div key={item} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    id={`spec-${item}`} 
                    checked={formData.specialty?.includes(item)}
                    onCheckedChange={() => toggleSpecialty(item)}
                  />
                  <label
                    htmlFor={`spec-${item}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* 區塊 5: Plus 認證 */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#1C4A27] border-l-4 border-[#1C4A27] pl-3">
              附加 Plus 認證 (可複選)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLUS_CERTIFICATIONS.map((item) => (
                <div key={item} className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.plusCategories?.includes(item) 
                    ? "border-[#1C4A27] bg-[#1C4A27]/5" 
                    : "border-gray-200 hover:border-[#1C4A27]/50"
                }`}>
                  <Checkbox 
                    id={`plus-${item}`} 
                    checked={formData.plusCategories?.includes(item)}
                    onCheckedChange={() => togglePlus(item)}
                  />
                  <label
                    htmlFor={`plus-${item}`}
                    className="text-base font-medium cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              * 勾選項目後續將有額外的自評表需要填寫
            </p>
          </div>

          {/* Year & Submit */}
          <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="year">申請年份 *</Label>
              <Select value={formData.year} onValueChange={(value: string) => updateFormData({ year: value })}>
                <SelectTrigger className="h-12 bg-white border border-gray-200 focus:border-[#1C4A27] focus:ring-1 focus:ring-[#1C4A27]">
                  <SelectValue placeholder="年份" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year} 年</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

            <div className="flex gap-4 mt-8">
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
                className="flex-[2] h-14 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl text-lg"
            >
              下一步：申請檢核表上傳
            </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
