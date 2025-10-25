import { 
  LoginRequest,
  VerifyOTPRequest,
  LoginResponse,
  ApiResponse
} from '../types';

// API 基礎配置
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// 通用請求函數
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'API 請求失敗'
      };
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '網路錯誤'
    };
  }
};

// 認證相關 API
export const authAPI = {
  // 發送 OTP
  sendOTP: async (data: LoginRequest): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 驗證 OTP
  verifyOTP: async (data: VerifyOTPRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 登出
  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// 農場相關 API (暫時返回模擬數據)
export const farmAPI = {
  getBasicInfo: async () => {
    return { success: false, data: null };
  },
  updateBasicInfo: async () => {
    return { success: false, data: null };
  },
  createBasicInfo: async () => {
    return { success: false, data: null };
  },
};

// 申請檢核表 API (暫時返回模擬數據)
export const applicationAPI = {
  getApplicationForm: async () => {
    return { success: false, data: null };
  },
  updateApplicationForm: async () => {
    return { success: false, data: null };
  },
  submitApplicationForm: async () => {
    return { success: false, data: null };
  },
};

// 自評表 API (暫時返回模擬數據)
export const evaluationAPI = {
  getSelfEvaluation: async () => {
    return { success: false, data: null };
  },
  updateAnswer: async () => {
    return { success: false, data: null };
  },
  submitSelfEvaluation: async () => {
    return { success: false, data: null };
  },
  getQuestions: async () => {
    return { success: false, data: null };
  },
};

// 通用 API 實例
export const api = {
  get: async <T>(url: string, config?: any): Promise<{ data: T }> => {
    const result = await apiRequest<T>(url, { method: 'GET', ...config });
    if (result.success) {
      return { data: result.data! };
    }
    throw new Error(result.error || 'API 請求失敗');
  },
  
  post: async <T>(url: string, data?: any, config?: any): Promise<{ data: T }> => {
    const result = await apiRequest<T>(url, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...config 
    });
    if (result.success) {
      return { data: result.data! };
    }
    throw new Error(result.error || 'API 請求失敗');
  },
  
  put: async <T>(url: string, data?: any, config?: any): Promise<{ data: T }> => {
    const result = await apiRequest<T>(url, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...config 
    });
    if (result.success) {
      return { data: result.data! };
    }
    throw new Error(result.error || 'API 請求失敗');
  },
  
  delete: async <T>(url: string, config?: any): Promise<{ data: T }> => {
    const result = await apiRequest<T>(url, { method: 'DELETE', ...config });
    if (result.success) {
      return { data: result.data! };
    }
    throw new Error(result.error || 'API 請求失敗');
  }
};

export default { authAPI, farmAPI, applicationAPI, evaluationAPI, api }; 