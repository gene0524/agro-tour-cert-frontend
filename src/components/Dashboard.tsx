import { StepProgress } from "./StepProgress";
import { QuickAccessCards } from "./QuickAccessCards";
import { NotificationTimeline } from "./NotificationTimeline";
import { Progress } from "./ui/progress";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F4F9F6]">
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[#1C4A27] mb-2">歡迎回來，王小農！</h1>
              <p className="text-[#555]">申請場域：綠野休閒農場｜目前申請進度：60% 已完成</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#555] mb-2">待補：佐證文件</div>
              <div className="px-4 py-2 bg-[#E5EAD9] rounded-lg text-[#1C4A27] inline-block">
                目前階段：B. 申請認證
              </div>
            </div>
          </div>
          <Progress value={60} className="h-3 bg-[#E5EAD9]" />
        </div>

        {/* Step Progress */}
        <div className="mb-6">
          <h2 className="text-[#1C4A27] mb-4">申請流程階段</h2>
          <StepProgress />
        </div>

        {/* Quick Access Cards */}
        <div className="mb-6">
          <h2 className="text-[#1C4A27] mb-4">快速入口</h2>
          <QuickAccessCards />
        </div>

        {/* Notifications Timeline */}
        <div>
          <h2 className="text-[#1C4A27] mb-4">最新通知</h2>
          <NotificationTimeline />
        </div>
      </main>
    </div>
  );
}
