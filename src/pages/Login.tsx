import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, verifyOTP } = useAuth();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginMethod === 'email') {
        await login(email, 'email');
      } else {
        await login(phone, 'phone');
      }
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '發送驗證碼失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginMethod === 'email') {
        await verifyOTP(email, otp, 'email');
      } else {
        await verifyOTP(phone, otp, 'phone');
      }
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : '驗證失敗');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOtpSent(false);
    setOtp('');
    setError('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登入認證系統
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            使用 Email 或手機號碼登入
          </p>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>開發模式:</strong> 任何 Email/手機都會"發送成功"，驗證碼請輸入 <code className="bg-blue-100 px-1 rounded">123456</code>
            </p>
          </div>
        </div>

        <div className="card">
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              {/* 登入方式選擇 */}
              <div>
                <label className="form-label">登入方式</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="email"
                      checked={loginMethod === 'email'}
                      onChange={(e) => setLoginMethod(e.target.value as 'email')}
                      className="mr-2"
                    />
                    Email 驗證碼（免費）
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="phone"
                      checked={loginMethod === 'phone'}
                      onChange={(e) => setLoginMethod(e.target.value as 'phone')}
                      className="mr-2"
                    />
                    SMS 驗證碼
                  </label>
                </div>
              </div>

              {/* 輸入欄位 */}
              {loginMethod === 'email' ? (
                <div>
                  <label htmlFor="email" className="form-label">
                    Email 信箱
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="例如：farm@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    驗證碼將發送到您的信箱
                  </p>
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="form-label">
                    手機號碼
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="例如：0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    驗證碼將以 SMS 發送
                  </p>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => window.location.href = '/register'}
                  className="btn-secondary flex-1"
                >
                  註冊新帳號
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? '發送中...' : '發送驗證碼'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="text-sm text-green-600 mb-4">
                ✅ 驗證碼已發送到 {loginMethod === 'email' ? email : phone}
                {loginMethod === 'email' && (
                  <div className="text-xs text-gray-500 mt-1">
                    請檢查您的信箱（包含垃圾郵件資料夾）
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="otp" className="form-label">
                  驗證碼
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="form-input text-center text-lg tracking-widest"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">
                  開發模式：請輸入 123456
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary flex-1"
                >
                  重新選擇
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1"
                >
                  {loading ? '驗證中...' : '登入'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}; 