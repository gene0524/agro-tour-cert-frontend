import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { ApplicationWizard } from "./components/ApplicationWizard";
import { HelpPage } from "./components/pages/HelpPage";
import { LoginPage } from "./components/pages/LoginPage";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { AdminReviewPage } from "./components/pages/AdminReviewPage";
import { Button } from "./components/ui/button";
import { Toaster } from "sonner";

type Page = "login" | "dashboard" | "wizard" | "help" | "admin-dashboard" | "admin-review" | "admin-reports";
type UserRole = "applicant" | "admin" | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [hasStartedApplication, setHasStartedApplication] = useState(false);

  // Check if user has started an application (using localStorage)
  useEffect(() => {
    const savedProgress = localStorage.getItem("applicationProgress");
    if (savedProgress) {
      setHasStartedApplication(true);
    }
  }, [currentPage]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage(role === "applicant" ? "dashboard" : "admin-dashboard");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Login page
  if (currentPage === "login" || userRole === null) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Main app with navigation
  return (
    <div>
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        userRole={userRole}
      />
      
      {/* Applicant Pages */}
      {userRole === "applicant" && (
        <>
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "wizard" && <ApplicationWizard />}
          {currentPage === "help" && <HelpPage />}

          {/* Floating Action Button - only show on dashboard */}
          {currentPage === "dashboard" && (
            <div className="fixed bottom-8 right-8 z-50">
              <Button
                onClick={() => {
                  handleNavigate("wizard");
                  setHasStartedApplication(true);
                  localStorage.setItem("applicationProgress", "started");
                }}
                className="h-16 px-8 bg-[#1C4A27] hover:bg-[#2A5F38] text-white rounded-2xl shadow-2xl text-lg"
              >
                {hasStartedApplication ? "📝 繼續填寫" : "📝 開始新申請"}
              </Button>
            </div>
          )}

          {/* Back Button for wizard */}
          {currentPage === "wizard" && (
            <div className="fixed top-24 left-6 z-40">
              <Button
                onClick={() => handleNavigate("dashboard")}
                variant="outline"
                className="border-2 border-[#1C4A27] text-[#1C4A27] hover:bg-[#1C4A27] hover:text-white"
              >
                ← 返回總覽
              </Button>
            </div>
          )}
        </>
      )}

      {/* Admin Pages */}
      {userRole === "admin" && (
        <>
          {currentPage === "admin-dashboard" && <AdminDashboard onNavigate={handleNavigate} />}
          {currentPage === "admin-review" && (
            <AdminReviewPage onBack={() => handleNavigate("admin-dashboard")} />
          )}
          {/* Other admin pages would go here */}
        </>
      )}

      <Toaster />
    </div>
  );
}
