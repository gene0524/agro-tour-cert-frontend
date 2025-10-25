import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* 歡迎訊息和農場資訊 */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              歡迎回來，{user?.contact_person}！
            </h2>
            <div className="space-y-1 text-gray-600">
              <p><strong>農場名稱：</strong>{user?.farm_name}</p>
              <p><strong>聯絡信箱：</strong>{user?.email}</p>
              <p><strong>聯絡電話：</strong>{user?.phone}</p>
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user?.is_verified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user?.is_verified ? '✓ 已驗證' : '⚠ 待驗證'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 認證申請進度 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          認證申請進度
        </h3>
        <div className="relative">
          {/* 進度條 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                1
              </div>
              <span className="text-xs text-gray-600">農場基本資料</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mb-2">
                2
              </div>
              <span className="text-xs text-gray-600">申請檢核表</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mb-2">
                3
              </div>
              <span className="text-xs text-gray-600">認證審查自評表</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mb-2">
                4
              </div>
              <span className="text-xs text-gray-600">等待審查</span>
            </div>
          </div>
        </div>
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">農場基本資料</h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
              待完成
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            完善農場基本資料，包括地址、營業項目、設施介紹等
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">進度: 10%</span>
            <button className="btn-primary text-sm px-3 py-1">
              繼續填寫
            </button>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">申請檢核表</h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
              未開始
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            檢核申請資格和必要文件，確保符合認證要求
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">進度: 0%</span>
            <button className="btn-secondary text-sm px-3 py-1" disabled>
              等待開放
            </button>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">認證審查自評表</h3>
            <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
              可填寫
            </span>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            完成 4-5 個構面共 16-20 題的自我評估
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">進度: 0%</span>
            <button 
              className="btn-primary text-sm px-3 py-1"
              onClick={() => window.location.href = '/self-evaluation'}
            >
              開始填寫
            </button>
          </div>
        </div>
      </div>

      {/* 最近動態 */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          最近動態
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">已完成帳號註冊</p>
              <p className="text-xs text-gray-500">剛剛</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-600">開始填寫農場基本資料</p>
              <p className="text-xs text-gray-500">待進行</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 