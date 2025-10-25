// 用戶相關類型
export interface User {
  id: string;
  email: string;
  phone: string;
  farm_name: string;
  contact_person: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// 農場基本資料
export interface FarmBasicInfo {
  id: string;
  name: string;
  address: string;
  contact_person: string;
  phone: string;
  email: string;
  certification_type: string;
  region: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// 申請檢核表
export interface ApplicationForm {
  id: string;
  farm_id: string;
  basic_info_complete: boolean;
  attachments_complete: boolean;
  contact_info_complete: boolean;
  status: 'draft' | 'submitted' | 'reviewed';
  created_at: string;
  updated_at: string;
}

// 自評表題目
export interface EvaluationQuestion {
  id: string;
  dimension: string;
  question_number: number;
  question_text: string;
  max_score: number;
}

// 自評表答案
export interface EvaluationAnswer {
  id: string;
  evaluation_id: string;
  question_id: string;
  answer_text: string;
  photos: string[];
  created_at: string;
  updated_at: string;
}

// 自評表
export interface SelfEvaluation {
  id: string;
  farm_id: string;
  status: 'draft' | 'submitted' | 'reviewed';
  answers: EvaluationAnswer[];
  created_at: string;
  updated_at: string;
}

// 審查結果
export interface ReviewResult {
  id: string;
  evaluation_id: string;
  question_id: string;
  score: number;
  comment: string;
  photos: string[];
  reviewer_id: string;
  created_at: string;
  updated_at: string;
}

// API 響應類型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 註冊相關
export interface RegisterRequest {
  farm_name: string;
  contact_person: string;
  email: string;
  phone: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

// 登入相關
export interface LoginRequest {
  login_method: 'email' | 'phone';
  email?: string;
  phone?: string;
}

export interface VerifyOTPRequest {
  login_method: 'email' | 'phone';
  email?: string;
  phone?: string;
  otp: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// 文件上傳
export interface FileUploadResponse {
  url: string;
  filename: string;
} 