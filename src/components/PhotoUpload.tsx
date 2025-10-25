import React, { useState, useRef } from 'react';

interface PhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
  disabled?: boolean;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photos,
  onChange,
  maxPhotos = 5,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 檢查檔案數量限制
    if (photos.length + files.length > maxPhotos) {
      alert(`最多只能上傳 ${maxPhotos} 張照片`);
      return;
    }

    setUploading(true);

    try {
      const newPhotoUrls: string[] = [];
      
      for (const file of files) {
        // 檢查檔案類型
        if (!(file instanceof File) || !file.type.startsWith('image/')) {
          alert('只能上傳圖片檔案');
          continue;
        }

        // 檢查檔案大小 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('圖片檔案不能超過 5MB');
          continue;
        }

        // 開發模式：創建本地 URL
        const photoUrl = URL.createObjectURL(file);
        newPhotoUrls.push(photoUrl);
        
        // 模擬上傳延遲
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      onChange([...photos, ...newPhotoUrls]);
    } catch (error) {
      console.error('照片上傳失敗:', error);
      alert('照片上傳失敗，請重試');
    } finally {
      setUploading(false);
      // 清空 input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_: string, i: number) => i !== index);
    onChange(newPhotos);
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* 現有照片顯示 */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`佐證照片 ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 上傳按鈕 */}
      {!disabled && photos.length < maxPhotos && (
        <div>
          <button
            type="button"
            onClick={handleAddPhoto}
            disabled={uploading}
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                <span className="text-sm mt-1">上傳中...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm mt-1">
                  新增照片 ({photos.length}/{maxPhotos})
                </span>
              </>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <p className="text-xs text-gray-500 mt-2">
            支援 JPG、PNG 格式，單檔不超過 5MB，最多上傳 {maxPhotos} 張
          </p>
        </div>
      )}
    </div>
  );
}; 