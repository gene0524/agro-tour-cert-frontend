import { CheckCircle2, AlertCircle, Clock, Upload } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function NotificationTimeline() {
  const events = [
    {
      date: "2025/10/20",
      time: "14:30",
      title: "補件完成",
      desc: "文件已由審查員確認，消防安全申報證明審核通過",
      icon: CheckCircle2,
      iconColor: "text-[#1C4A27]",
      iconBg: "bg-[#1C4A27]/10",
      status: "completed"
    },
    {
      date: "2025/10/15",
      time: "09:15",
      title: "補件通知",
      desc: "請上傳消防安全申報證明（期限：2025/10/25）",
      icon: AlertCircle,
      iconColor: "text-[#C94A4A]",
      iconBg: "bg-[#C94A4A]/10",
      status: "urgent",
      action: "立即上傳"
    },
    {
      date: "2025/10/10",
      time: "16:45",
      title: "書審通過",
      desc: "恭喜！書審階段已通過，認證核發作業進行中",
      icon: CheckCircle2,
      iconColor: "text-[#1C4A27]",
      iconBg: "bg-[#1C4A27]/10",
      status: "completed"
    },
    {
      date: "2025/10/05",
      time: "11:20",
      title: "文件上傳成功",
      desc: "基本資料與自評表已成功提交，等待書審作業",
      icon: Upload,
      iconColor: "text-[#84A98C]",
      iconBg: "bg-[#84A98C]/10",
      status: "info"
    },
    {
      date: "2025/09/28",
      time: "10:00",
      title: "申請已建立",
      desc: "特色農遊認證申請已建立，請完成基本資料填寫",
      icon: Clock,
      iconColor: "text-[#A9B8A1]",
      iconBg: "bg-[#A9B8A1]/10",
      status: "info"
    }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4 relative">
            {/* Timeline Line */}
            {index < events.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#E5EAD9]" />
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl ${event.iconBg} flex items-center justify-center flex-shrink-0 relative z-10`}>
              <event.icon className={`w-6 h-6 ${event.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#1C4A27]">{event.title}</h3>
                    {event.status === "urgent" && (
                      <Badge className="bg-[#C94A4A] text-white">待處理</Badge>
                    )}
                    {event.status === "completed" && (
                      <Badge className="bg-[#1C4A27] text-white">已完成</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#555] mb-2">{event.desc}</p>
                  <p className="text-xs text-[#A9B8A1]">
                    {event.date} {event.time}
                  </p>
                </div>
              </div>
              {event.action && (
                <button className="mt-3 px-4 py-2 bg-[#C94A4A] text-white rounded-lg text-sm hover:bg-[#B03A3A] transition-colors">
                  {event.action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
