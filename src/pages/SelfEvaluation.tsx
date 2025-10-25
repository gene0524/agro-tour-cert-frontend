import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PhotoUpload } from '../components/PhotoUpload';
import { ScoreSelector } from '../components/ScoreSelector';
import {
  CertificationType,
  EvaluationBasicInfo,
  SelfEvaluationAnswer,
  SelfEvaluationForm,
  EVALUATION_DIMENSIONS,
  getQuestionsForCertificationType,
  calculateTotalScore
} from '../types/evaluation';

export const SelfEvaluation: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 基本資料
  const [basicInfo, setBasicInfo] = useState<EvaluationBasicInfo>({
    farmName: user?.farm_name || '',
    applicantName: user?.contact_person || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
    farmAddress: '',
    certificationType: 'type1',
    applicationDate: new Date().toISOString().split('T')[0]
  });

  // 自評答案
  const [answers, setAnswers] = useState<SelfEvaluationAnswer[]>([]);
  const [formStatus, setFormStatus] = useState<'draft' | 'submitted' | 'reviewed'>('draft');

  // 根據認證類型獲取需要填寫的題目
  const availableQuestions = getQuestionsForCertificationType(basicInfo.certificationType);
  const totalQuestions = availableQuestions.length;

  // 初始化答案
  useEffect(() => {
    const newAnswers: SelfEvaluationAnswer[] = availableQuestions.map(q => {
      const existingAnswer = answers.find(a => a.questionId === q.id);
      return existingAnswer || {
        questionId: q.id,
        evidence: '',
        photos: [],
        selfScore: 0
      };
    });
    setAnswers(newAnswers);
  }, [basicInfo.certificationType]);

  // 載入儲存的資料
  useEffect(() => {
    const savedData = localStorage.getItem('selfEvaluation');
    if (savedData) {
      try {
        const parsed: SelfEvaluationForm = JSON.parse(savedData);
        setBasicInfo(parsed.basicInfo);
        setAnswers(parsed.answers);
        setFormStatus(parsed.status);
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // 更新答案
  const updateAnswer = (questionId: string, field: keyof SelfEvaluationAnswer, value: any) => {
    setAnswers(prev => prev.map(answer =>
      answer.questionId === questionId
        ? { ...answer, [field]: value }
        : answer
    ));
  };

  // 儲存草稿
  const saveDraft = async () => {
    setSaving(true);
    try {
      const formData: SelfEvaluationForm = {
        basicInfo,
        answers,
        totalScore: calculateTotalScore(answers),
        status: 'draft'
      };
      
      localStorage.setItem('selfEvaluation', JSON.stringify(formData));
      
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('草稿已儲存');
    } catch (error) {
      alert('儲存失敗，請重試');
    } finally {
      setSaving(false);
    }
  };

  // 提交自評表
  const submitEvaluation = async () => {
    // 驗證必填欄位
    const incompleteAnswers = answers.filter(answer => 
      !answer.evidence.trim()
    );

    if (incompleteAnswers.length > 0) {
      alert(`還有 ${incompleteAnswers.length} 題的佐證說明未填寫，請填寫完整後再提交`);
      return;
    }

    if (!window.confirm('確定要提交自評表嗎？提交後將無法修改。')) {
      return;
    }

    setSubmitting(true);
    try {
      const formData: SelfEvaluationForm = {
        basicInfo,
        answers,
        totalScore: calculateTotalScore(answers),
        status: 'submitted'
      };
      
      localStorage.setItem('selfEvaluation', JSON.stringify(formData));
      setFormStatus('submitted');
      
      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('自評表提交成功！');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('提交失敗，請重試');
    } finally {
      setSubmitting(false);
    }
  };

  // 分步驟內容
  const steps = [
    '基本資料',
    ...EVALUATION_DIMENSIONS.map(dim => dim.name.replace('構面', '').replace('：', ''))
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* 提示訊息 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>📋 基礎資料說明：</strong>以下資料來自您的註冊資訊，如需修改請先到農場基本資料頁面更新。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">農場名稱</label>
          <input
            type="text"
            className="form-input bg-gray-50"
            value={basicInfo.farmName}
            disabled={true}
          />
          <p className="text-xs text-gray-500 mt-1">來自註冊資料</p>
        </div>
        
        <div>
          <label className="form-label">申請人姓名</label>
          <input
            type="text"
            className="form-input bg-gray-50"
            value={basicInfo.applicantName}
            disabled={true}
          />
          <p className="text-xs text-gray-500 mt-1">來自註冊資料</p>
        </div>

        <div>
          <label className="form-label">聯絡電話</label>
          <input
            type="tel"
            className="form-input bg-gray-50"
            value={basicInfo.contactPhone}
            disabled={true}
          />
          <p className="text-xs text-gray-500 mt-1">來自註冊資料</p>
        </div>

        <div>
          <label className="form-label">聯絡信箱</label>
          <input
            type="email"
            className="form-input bg-gray-50"
            value={basicInfo.contactEmail}
            disabled={true}
          />
          <p className="text-xs text-gray-500 mt-1">來自註冊資料</p>
        </div>

        {/* TODO: 後端需求 - 農場地址需要從 farm_basic_info 表獲取 */}
        <div className="md:col-span-2">
          <label className="form-label">農場地址</label>
          <input
            type="text"
            className="form-input"
            value={basicInfo.farmAddress}
            onChange={(e) => setBasicInfo(prev => ({ ...prev, farmAddress: e.target.value }))}
            placeholder="請輸入完整農場地址（將來會從農場基本資料自動帶入）"
            disabled={formStatus === 'submitted'}
          />
          <p className="text-xs text-gray-500 mt-1">
            <strong>🔧 後端開發註記：</strong>此欄位需要從 farm_basic_info 表的 address 欄位自動帶入
          </p>
        </div>

        <div>
          <label className="form-label">認證類別</label>
          <select
            className="form-input"
            value={basicInfo.certificationType}
            onChange={(e) => setBasicInfo(prev => ({ ...prev, certificationType: e.target.value as CertificationType }))}
            disabled={formStatus === 'submitted'}
          >
            <option value="type1">第一類：農業生產體驗</option>
            <option value="type2">第二類：農業教育學習</option>
            <option value="type3">第三類：農村文化體驗</option>
            <option value="type4">第四類：農村生活體驗</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {basicInfo.certificationType === 'type3' || basicInfo.certificationType === 'type4' 
              ? '此類別需額外填寫第五構面（社區連結與文化傳承）' 
              : '此類別需填寫前四個構面'}
          </p>
        </div>

        <div>
          <label className="form-label">申請日期</label>
          <input
            type="date"
            className="form-input"
            value={basicInfo.applicationDate}
            onChange={(e) => setBasicInfo(prev => ({ ...prev, applicationDate: e.target.value }))}
            disabled={formStatus === 'submitted'}
          />
        </div>
      </div>
    </div>
  );

  const renderDimension = (dimensionIndex: number) => {
    const dimension = EVALUATION_DIMENSIONS[dimensionIndex];
    const dimensionQuestions = dimension.questions.filter(q => 
      !q.requiredFor || q.requiredFor.includes(basicInfo.certificationType)
    );

    if (dimensionQuestions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          此構面不適用於您選擇的認證類別
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{dimension.name}</h3>
          <p className="text-gray-600">{dimension.description}</p>
        </div>

        {dimensionQuestions.map((question) => {
          const answer = answers.find(a => a.questionId === question.id);
          if (!answer) return null;

          return (
            <div key={question.id} className="card border-l-4 border-l-blue-500">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  題目 {question.number}：{question.title}
                </h4>
                <p className="text-gray-600 text-sm">{question.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 左側：佐證說明和照片 */}
                <div className="space-y-4">
                  <div>
                    <label className="form-label">佐證說明</label>
                    <textarea
                      className="form-input h-32"
                      value={answer.evidence}
                      onChange={(e) => updateAnswer(question.id, 'evidence', e.target.value)}
                      placeholder="請詳細說明您的農場在此項目的具體情況、措施或成果..."
                      disabled={formStatus === 'submitted'}
                    />
                  </div>

                  <div>
                    <label className="form-label">佐證照片</label>
                    <PhotoUpload
                      photos={answer.photos}
                      onChange={(photos: string[]) => updateAnswer(question.id, 'photos', photos)}
                      disabled={formStatus === 'submitted'}
                    />
                  </div>
                </div>

                {/* 右側：評分 */}
                <div>
                  <ScoreSelector
                    score={answer.selfScore}
                    onChange={(score: number) => updateAnswer(question.id, 'selfScore', score)}
                    scoreGuidelines={question.scoreGuidelines}
                    disabled={formStatus === 'submitted'}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const currentTotalScore = calculateTotalScore(answers);
  const maxPossibleScore = availableQuestions.length * 5;
  const completedAnswers = answers.filter(a => a.evidence.trim()).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 標題和進度 */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回儀表板
            </button>
            <h1 className="text-2xl font-bold text-gray-900">認證審查自評表</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              formStatus === 'submitted' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {formStatus === 'submitted' ? '已提交' : '草稿'}
            </span>
            <span className="text-sm text-gray-600">
              進度：{completedAnswers}/{totalQuestions} 題
            </span>
          </div>
        </div>

        {/* 步驟指示器 */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === currentStep
                    ? 'bg-blue-600 text-white'
                    : index < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="ml-2 text-xs text-gray-600 hidden md:block">{step}</span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-2 ${index < currentStep ? 'bg-green-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>

        {/* 總分顯示 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="font-medium text-gray-700">目前總分</span>
          <span className="text-xl font-bold text-blue-600">
            {currentTotalScore} / {maxPossibleScore} 分
          </span>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="card">
        {currentStep === 0 ? renderBasicInfo() : renderDimension(currentStep - 1)}
      </div>

      {/* 操作按鈕 */}
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="btn-secondary"
                disabled={submitting}
              >
                上一步
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {formStatus !== 'submitted' && (
              <button
                onClick={saveDraft}
                disabled={saving || submitting}
                className="btn-secondary"
              >
                {saving ? '儲存中...' : '儲存草稿'}
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="btn-primary"
                disabled={submitting}
              >
                下一步
              </button>
            ) : formStatus !== 'submitted' ? (
              <button
                onClick={submitEvaluation}
                disabled={submitting || completedAnswers < totalQuestions}
                className="btn-primary"
              >
                {submitting ? '提交中...' : '提交自評表'}
              </button>
            ) : (
              <span className="text-green-600 font-medium">✓ 已提交完成</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 