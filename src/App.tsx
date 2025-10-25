import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SelfEvaluation } from './pages/SelfEvaluation';

// 受保護的路由組件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">載入中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


// 主要應用組件
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farm-info"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    農場基本資料
                  </h2>
                  <p className="text-gray-600">
                    此頁面正在開發中...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/application-form"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    申請檢核表
                  </h2>
                  <p className="text-gray-600">
                    此頁面正在開發中...
                  </p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/self-evaluation"
          element={
            <ProtectedRoute>
              <Layout>
                <SelfEvaluation />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// 根組件
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 