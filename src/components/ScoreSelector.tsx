import React from 'react';
import { SelfScore } from '../types/evaluation';

interface ScoreSelectorProps {
  score: SelfScore;
  onChange: (score: SelfScore) => void;
  scoreGuidelines: {
    score_0: string;
    score_2_5: string;
    score_5: string;
  };
  disabled?: boolean;
}

export const ScoreSelector: React.FC<ScoreSelectorProps> = ({
  score,
  onChange,
  scoreGuidelines,
  disabled = false
}: ScoreSelectorProps) => {
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // 允許空值，以便用戶可以清空輸入框
    if (value === '') {
      onChange(0);
      return;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      onChange(0);
    } else if (numValue < 0) {
      onChange(0);
    } else if (numValue > 5) {
      onChange(5);
    } else {
      onChange(numValue);
    }
  };

  const quickSelectScore = (value: number) => {
    onChange(value);
  };

  return (
    <div className="space-y-4">
      {/* 評分參考指引 - 移到最上方 */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-3">評分參考指引</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 min-w-[40px] justify-center">
              5分
            </span>
            <p className="text-xs text-gray-600 flex-1">{scoreGuidelines.score_5}</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 min-w-[40px] justify-center">
              2.5分
            </span>
            <p className="text-xs text-gray-600 flex-1">{scoreGuidelines.score_2_5}</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 min-w-[40px] justify-center">
              0分
            </span>
            <p className="text-xs text-gray-600 flex-1">{scoreGuidelines.score_0}</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-blue-600">
            💡 <strong>提示：</strong>您可以根據實際情況給予 0-5 分之間的任意分數，上述僅為參考標準
          </p>
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        自評分數 (0-5分)
      </label>
      
      {/* 數字輸入框 */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={score === 0 ? '' : score}
            onChange={handleScoreChange}
            disabled={disabled}
            className="form-input text-center text-lg font-bold"
            placeholder="0.0"
          />
          <p className="text-xs text-gray-500 mt-1 text-center">
            可輸入 0-5 之間的任意數值（例如：3.5）
          </p>
        </div>
        
        {/* 快速選擇按鈕 */}
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => quickSelectScore(0)}
            disabled={disabled}
            className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50"
          >
            0分
          </button>
          <button
            type="button"
            onClick={() => quickSelectScore(2.5)}
            disabled={disabled}
            className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50"
          >
            2.5分
          </button>
          <button
            type="button"
            onClick={() => quickSelectScore(5)}
            disabled={disabled}
            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 disabled:opacity-50"
          >
            5分
          </button>
        </div>
      </div>
    </div>
  );
}; 