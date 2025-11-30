import { FileEdit, Upload, PieChart, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function QuickAccessCards() {
  const cards = [
    {
      icon: FileEdit,
      title: "基本資料填寫",
      desc: "填寫基本場域與負責人資料",
      status: "進行中",
      statusColor: "bg-[#84A98C]",
      button: "前往填寫",
      progress: 75
    },
    {
      icon: Upload,
      title: "申請檢核表上傳",
      desc: "上傳檢核表PDF檔案",
      status: "未完成",
      statusColor: "bg-[#A9B8A1]",
      button: "上傳文件",
      progress: 40
    },
    {
      icon: PieChart,
      title: "填寫審查自評表",
      desc: "填寫20題指標自評表",
      status: "進行中",
      statusColor: "bg-[#84A98C]",
      button: "查看進度",
      progress: 70
    },
    {
      icon: Bell,
      title: "🔔 通知與補件",
      desc: "有 1 則補件要求尚未回覆",
      status: "待處理",
      statusColor: "bg-[#C94A4A]",
      button: "查看通知",
      alert: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className={`border-2 ${card.alert ? "border-[#C94A4A]" : "border-transparent"} hover:shadow-lg transition-shadow`}>
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className={`w-12 h-12 rounded-xl ${card.statusColor} bg-opacity-10 flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-[#1C4A27]" />
              </div>
              <Badge className={`${card.statusColor} text-white`}>
                {card.status}
              </Badge>
            </div>
            <CardTitle className="text-[#1C4A27]">{card.title}</CardTitle>
            <CardDescription>{card.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            {card.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[#555] mb-1">
                  <span>完成度</span>
                  <span>{card.progress}%</span>
                </div>
                <Progress value={card.progress} className="h-2 bg-[#E5EAD9]" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-xl">
              {card.button}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
