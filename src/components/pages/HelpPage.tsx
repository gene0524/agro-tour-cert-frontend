import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { HelpCircle, Phone, Mail, MapPin, FileText, Download } from "lucide-react";
import { Button } from "../ui/button";

export function HelpPage() {
  const faqs = [
    {
      category: "申請資格與條件",
      items: [
        {
          q: "我沒有公司登記證可以申請嗎？",
          a: "可以。若為個人農場或休閒農業區內的經營體，請勾選「農業旅遊經營體」並附上場域經營證明或相關文件即可。"
        },
        {
          q: "什麼樣的農場可以申請特色農遊認證？",
          a: "凡是經營休閒農業、提供農業體驗活動、具備基本安全設施的農場、牧場、漁場或林場皆可申請。需符合消防安全、投保公共意外險等基本條件。"
        },
        {
          q: "一年可以申請幾次？",
          a: "每年度可申請一次。若當年度未通過，可於次年度重新申請，但需重新提交完整資料。"
        }
      ]
    },
    {
      category: "文件上傳與格式",
      items: [
        {
          q: "上傳檔案太大怎麼辦？",
          a: "建議將檔案轉存為 PDF 或壓縮圖片後再上傳，系統單一檔案限制為 10MB。若為照片，建議解析度設定為 1920x1080，即可兼顧畫質與檔案大小。"
        },
        {
          q: "可以上傳哪些檔案格式？",
          a: "系統支援 PDF、JPG、PNG、DOC、DOCX 格式。建議優先使用 PDF 格式以確保檔案完整性，避免因版本差異造成格式跑掉。"
        },
        {
          q: "照片有什麼拍攝建議？",
          a: "建議拍攝場域入口、體驗活動區、休憩設施、安全設施等區域。照片應清晰、光線充足，並能完整呈現場域特色。每個項目至少提供 2-3 張照片。"
        }
      ]
    },
    {
      category: "審查流程與時間",
      items: [
        {
          q: "審查要多久時間？",
          a: "書審階段約 7-10 個工作天。審查通過後，約 2 週內公告認證結果。整體流程約需 3-4 週。"
        },
        {
          q: "什麼是書審？",
          a: "書審是指管理員根據您上傳的資料與自評表進行線上審查。審查通過後即可獲得認證。"
        },
        {
          q: "如果書審沒通過怎麼辦？",
          a: "若書審未通過，系統會通知補件項目。請於期限內補齊資料後重新送審。若仍未通過，可於次年度重新��請。"
        }
      ]
    },
    {
      category: "自評表填寫",
      items: [
        {
          q: "自評表要怎麼填？",
          a: "請依照場域實際狀況誠實填寫。每題分為 0、2.5、5 分三個等級，並可上傳照片佐證。建議搭配說明欄位補充具體內容，有助於審查委員理解。"
        },
        {
          q: "自評分數會影響審查結果嗎？",
          a: "自評表是評估的重要依據，管理員會根據您提供的資料與自評分數進行審查。建議如實填寫並提供相關佐證文件。"
        },
        {
          q: "可以先儲存，之後再繼續填寫嗎？",
          a: "可以。系統會自動儲存您的填寫進度，下次登入時可接續完成。建議完成後再送出，避免資料不完整影響審查。"
        }
      ]
    },
    {
      category: "補件與修改",
      items: [
        {
          q: "收到補件通知後該怎麼做？",
          a: "請登入系統至「最新消息」頁面查看補件項目，並於期限內上傳所需文件。上傳完成後系統會自動通知審查委員。"
        },
        {
          q: "送出後可以修改資料嗎？",
          a: "送出後若尚未進入書審階段，可聯繫客服協助修改。若已進入審查，則需等補件通知或次年度重新申請。"
        }
      ]
    },
    {
      category: "認證效期與掛牌",
      items: [
        {
          q: "認證有效期限多久？",
          a: "特色農遊認證效期為 3 年。到期前 3 個月會通知重新申請評鑑。"
        },
        {
          q: "通過認證後會獲得什麼？",
          a: "通過認證後將獲得認證證書與掛牌，可於場域入口處懸掛。同時會列入官方推薦名單，增加曝光機會。"
        }
      ]
    }
  ];

  const resources = [
    { title: "申請流程說明 PDF", icon: FileText, size: "2.3 MB" },
    { title: "自評表填寫範例", icon: FileText, size: "4.1 MB" },
    { title: "佐證照片拍攝指南", icon: FileText, size: "1.8 MB" },
    { title: "常見問題手冊", icon: FileText, size: "3.2 MB" }
  ];

  return (
    <main className="min-h-screen bg-[#F7FAF7]">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-[#1C4A27] mb-2">幫助中心 / 常見問題</h1>
          <p className="text-[#555]">申請流程說明與常見問題解答</p>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-[#E5EAD9] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <Phone className="w-10 h-10 text-[#1C4A27] mx-auto mb-3" />
              <h3 className="text-[#1C4A27] mb-1">電話諮詢</h3>
              <p className="text-sm text-[#555] mb-2">週一至週五 09:00-17:00</p>
              <p className="text-[#1C4A27]">(02) 1234-5678</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5EAD9] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <Mail className="w-10 h-10 text-[#1C4A27] mx-auto mb-3" />
              <h3 className="text-[#1C4A27] mb-1">Email 聯繫</h3>
              <p className="text-sm text-[#555] mb-2">24 小時內回覆</p>
              <p className="text-[#1C4A27] text-sm">certification@agrotour.org.tw</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E5EAD9] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <MapPin className="w-10 h-10 text-[#1C4A27] mx-auto mb-3" />
              <h3 className="text-[#1C4A27] mb-1">現場諮詢</h3>
              <p className="text-sm text-[#555] mb-2">需預約</p>
              <p className="text-[#1C4A27] text-sm">台北市信義區農遊路 123 號</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <Card className="border-2 border-[#E5EAD9] mb-8">
          <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
            <CardTitle className="text-[#1C4A27]">常見問題</CardTitle>
            <CardDescription>依類別查看常見問題與解答</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Accordion type="multiple" className="space-y-4">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-[#1C4A27] mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    {category.category}
                  </h3>
                  <Accordion type="multiple" className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`${categoryIndex}-${itemIndex}`}
                        className="border-2 border-[#E5EAD9] rounded-xl overflow-hidden bg-white"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-[#F4F9F6] hover:no-underline">
                          <span className="text-left text-[#333]">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-[#555] leading-relaxed">{item.a}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  {categoryIndex < faqs.length - 1 && (
                    <div className="my-6 border-t border-[#E5EAD9]" />
                  )}
                </div>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Download Resources */}
        <Card className="border-2 border-[#E5EAD9]">
          <CardHeader className="bg-[#F4F9F6] border-b border-[#E5EAD9]">
            <CardTitle className="text-[#1C4A27]">下載資源</CardTitle>
            <CardDescription>申請相關文件與參考資料</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F4F9F6] border border-[#E5EAD9] rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <resource.icon className="w-8 h-8 text-[#1C4A27]" />
                    <div>
                      <h4 className="text-[#333]">{resource.title}</h4>
                      <p className="text-xs text-[#555]">{resource.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#1C4A27] hover:bg-white">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
