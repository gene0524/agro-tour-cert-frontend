import React, { useState } from 'react';
import { RegisterRequest } from '../types';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    farm_name: '',
    contact_person: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 模擬註冊流程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 儲存註冊資料到 localStorage（開發模式）
      localStorage.setItem('registrationData', JSON.stringify(formData));
      
      setSuccess(true);
      console.log('模擬註冊成功:', formData);
      
      // 3秒後跳轉到登入頁面
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '註冊失敗');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              註冊成功！
            </h2>
            <p className="text-gray-600 mb-4">
              歡迎 <strong>{formData.farm_name}</strong> 加入特色農遊認證系統
            </p>
            <p className="text-sm text-gray-500">
              3 秒後自動跳轉到登入頁面...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            註冊農場帳號
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            加入特色農遊認證系統
          </p>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>開發模式:</strong> 填寫完成後會自動跳轉到登入頁面
            </p>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="farm_name" className="form-label">
                農場名稱 <span className="text-red-500">*</span>
              </label>
              <input
                id="farm_name"
                name="farm_name"
                type="text"
                required
                className="form-input"
                placeholder="例如：陽光生態農場"
                value={formData.farm_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="contact_person" className="form-label">
                聯絡人姓名 <span className="text-red-500">*</span>
              </label>
              <input
                id="contact_person"
                name="contact_person"
                type="text"
                required
                className="form-input"
                placeholder="例如：王大明"
                value={formData.contact_person}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                聯絡信箱 <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="例如：farm@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                用於接收驗證碼和系統通知
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                手機號碼 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="form-input"
                placeholder="例如：0912345678"
                value={formData.phone}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500">
                用於接收 SMS 驗證碼（備用）
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => window.location.href = '/login'}
                className="btn-secondary flex-1"
              >
                已有帳號？登入
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? '註冊中...' : '註冊'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 