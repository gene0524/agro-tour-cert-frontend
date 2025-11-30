import { UserCircle, Bell, FileText, MessageSquare, HelpCircle, Settings, LogOut } from "lucide-react";
import { Badge } from "./ui/badge";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: "applicant" | "admin";
}

export function Navigation({ currentPage, onNavigate, userRole }: NavigationProps) {
  const applicantPages = [
    { id: "dashboard", label: "申請流程", icon: FileText },
    { id: "help", label: "幫助中心", icon: HelpCircle }
  ];

  const adminPages = [
    { id: "admin-dashboard", label: "審查總覽", icon: FileText }
  ];

  const pages = userRole === "applicant" ? applicantPages : adminPages;

  return (
    <header className="bg-[#1C4A27] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left Section: Logo & Navigation */}
          <div className="flex items-center gap-12">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate(userRole === "applicant" ? "dashboard" : "admin-dashboard")}
          >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
              🌾
            </div>
            <div>
                <div className="font-semibold text-lg tracking-wide">特色農遊認證系統</div>
                <div className="text-[10px] text-white/80 tracking-wider uppercase">Special Agro-tourism Spot Certification</div>
            </div>
          </div>

          {/* Navigation */}
            <nav className="flex items-center gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                  className={`px-4 py-2 rounded-full text-base font-medium transition-all duration-200 flex items-center gap-2 ${
                    currentPage === page.id 
                      ? "bg-white/20 text-white shadow-sm" 
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <page.icon className="w-4 h-4" />
                {page.label}
              </button>
            ))}
          </nav>
          </div>

          {/* Right Section: User */}
          <div className="flex items-center gap-6 pl-6 border-l border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <UserCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium leading-none mb-1">
                  {userRole === "applicant" ? "王小農" : "管理員"}
                </span>
                <span className="text-xs text-white/60 leading-none">
                  {userRole === "applicant" ? "申請單位" : "系統管理"}
                </span>
              </div>
            </div>
            {userRole === "admin" && (
              <button 
                onClick={() => onNavigate("login")}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="登出"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
