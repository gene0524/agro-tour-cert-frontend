# Agro-Tour-Cert Frontend

## 🚀 快速開始

### 環境變數設定

創建 `.env.local` 文件：

```env
# API 基礎 URL
VITE_API_BASE=/api
```

### 部署說明

1. **Vercel 部署**：
   - 前端會部署到 `https://agro-tour-cert-frontend.vercel.app`
   - API 請求會通過 `vercel.json` 轉發到後端

2. **後端 URL 更新**：
   - 當後端部署完成後，更新 `vercel.json` 中的 `your-backend-url-here`
   - 例如：`https://agro-tour-api-xxxxx-uc.a.run.app`

### 開發環境

```bash
npm install
npm run dev
```

前端將在 [http://localhost:5173](http://localhost:5173) 啟動