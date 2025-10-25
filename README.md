# 特色農遊認證系統 - 前端

這是特色農遊認證申請數位化系統的前端應用，使用 React + TypeScript + Tailwind CSS 開發。

## 功能特色

- 📱 手機號碼 + OTP 登入驗證
- 📝 農場基本資料填寫
- ✅ 申請檢核表填寫
- 📊 認證審查自評表（4個構面，20題）
- 📸 照片上傳與預覽
- 💾 草稿儲存功能
- 📄 PDF 報告生成
- 🎨 現代化 UI 設計

## 技術棧

- **React 18** - 前端框架
- **TypeScript** - 類型安全
- **Tailwind CSS** - 樣式框架
- **React Router** - 路由管理
- **React Hook Form** - 表單處理
- **Axios** - HTTP 客戶端
- **React Toastify** - 通知組件

## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發環境運行

```bash
npm start
```

應用將在 [http://localhost:3000](http://localhost:3000) 啟動。

### 構建生產版本

```bash
npm run build
```

## 項目結構

```
src/
├── components/     # 可重用組件
├── hooks/         # 自定義 Hooks
├── pages/         # 頁面組件
├── services/      # API 服務
├── types/         # TypeScript 類型定義
├── utils/         # 工具函數
├── App.tsx        # 主應用組件
├── index.tsx      # 應用入口
└── index.css      # 全局樣式
```

## 環境變數

創建 `.env` 文件：

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

## 開發指南

### 添加新頁面

1. 在 `src/pages/` 創建新頁面組件
2. 在 `src/App.tsx` 添加路由
3. 更新導航（如需要）

### 添加新 API

1. 在 `src/types/` 定義相關類型
2. 在 `src/services/api.ts` 添加 API 函數
3. 在組件中使用

### 樣式指南

- 使用 Tailwind CSS 類名
- 自定義樣式在 `src/index.css` 中定義
- 組件特定樣式使用 CSS Modules 或 styled-components

## 部署

### Vercel (推薦)

1. 連接 GitHub 倉庫
2. 設置環境變數
3. 自動部署

### Netlify

1. 連接 GitHub 倉庫
2. 構建命令：`npm run build`
3. 發布目錄：`build`

## 貢獻

1. Fork 項目
2. 創建功能分支
3. 提交變更
4. 發起 Pull Request

## 授權

MIT License 