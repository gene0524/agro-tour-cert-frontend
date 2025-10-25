// 認證類型
export type CertificationType = 'type1' | 'type2' | 'type3' | 'type4';

// 自評分數 - 允許 0-5 之間的任意數值
export type SelfScore = number;

// 構面定義
export interface Dimension {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

// 題目定義
export interface Question {
  id: string;
  number: number;
  title: string;
  description: string;
  scoreGuidelines: {
    score_0: string;
    score_2_5: string;
    score_5: string;
  };
  requiredFor?: CertificationType[]; // 如果未定義，則所有類型都需要
}

// 自評答案
export interface SelfEvaluationAnswer {
  questionId: string;
  evidence: string; // 佐證說明
  photos: string[]; // 照片 URLs
  selfScore: SelfScore; // 自評分
}

// 基本資料
export interface EvaluationBasicInfo {
  farmName: string;
  applicantName: string;
  contactPhone: string;
  contactEmail: string;
  farmAddress: string;
  certificationType: CertificationType;
  applicationDate: string;
}

// 完整自評表
export interface SelfEvaluationForm {
  id?: string;
  basicInfo: EvaluationBasicInfo;
  answers: SelfEvaluationAnswer[];
  totalScore: number;
  status: 'draft' | 'submitted' | 'reviewed';
  createdAt?: string;
  updatedAt?: string;
}

// 構面和題目數據結構
export const EVALUATION_DIMENSIONS: Dimension[] = [
  {
    id: 'dimension1',
    name: '構面一：農場基本條件',
    description: '評估農場的基本硬體設施和條件',
    questions: [
      {
        id: 'q1',
        number: 1,
        title: '農場環境與設施',
        description: '農場環境整潔、設施完善，具備基本的遊客接待能力',
        scoreGuidelines: {
          score_0: '農場環境髒亂，設施不完善，無法接待遊客',
          score_2_5: '農場環境一般，設施基本完善，可接待少量遊客',
          score_5: '農場環境優美整潔，設施完善，具備良好的遊客接待能力'
        }
      },
      {
        id: 'q2',
        number: 2,
        title: '交通便利性',
        description: '農場交通便利，有明確的指標引導',
        scoreGuidelines: {
          score_0: '交通不便，無指標引導，遊客難以到達',
          score_2_5: '交通一般，有基本指標，遊客可到達但不太方便',
          score_5: '交通便利，指標清楚，遊客容易到達'
        }
      },
      {
        id: 'q3',
        number: 3,
        title: '停車場設施',
        description: '提供足夠的停車空間，停車場規劃完善',
        scoreGuidelines: {
          score_0: '無停車場或停車空間嚴重不足',
          score_2_5: '有停車場但空間不足或規劃不佳',
          score_5: '停車場空間充足，規劃完善'
        }
      },
      {
        id: 'q4',
        number: 4,
        title: '廁所等基本設施',
        description: '提供乾淨的廁所及其他基本設施',
        scoreGuidelines: {
          score_0: '無廁所設施或設施極差',
          score_2_5: '有廁所但清潔度或設施有待改善',
          score_5: '廁所乾淨整潔，設施完善'
        }
      }
    ]
  },
  {
    id: 'dimension2',
    name: '構面二：農業特色與體驗',
    description: '評估農場的農業特色和體驗活動品質',
    questions: [
      {
        id: 'q5',
        number: 5,
        title: '農業生產特色',
        description: '具有明顯的農業生產特色，產品品質優良',
        scoreGuidelines: {
          score_0: '無明顯農業特色，產品品質差',
          score_2_5: '有一定農業特色，產品品質一般',
          score_5: '農業特色鮮明，產品品質優良'
        }
      },
      {
        id: 'q6',
        number: 6,
        title: '體驗活動設計',
        description: '設計豐富多樣的農業體驗活動',
        scoreGuidelines: {
          score_0: '無體驗活動或活動單調乏味',
          score_2_5: '有基本體驗活動，但缺乏創意',
          score_5: '體驗活動豐富多樣，具有創意和教育意義'
        }
      },
      {
        id: 'q7',
        number: 7,
        title: '季節性活動規劃',
        description: '根據農業生產季節規劃相應的體驗活動',
        scoreGuidelines: {
          score_0: '無季節性活動規劃',
          score_2_5: '有簡單的季節性活動',
          score_5: '季節性活動規劃完善，配合農業生產週期'
        }
      },
      {
        id: 'q8',
        number: 8,
        title: '導覽解說服務',
        description: '提供專業的導覽解說服務',
        scoreGuidelines: {
          score_0: '無導覽解說服務',
          score_2_5: '有基本導覽但專業度不足',
          score_5: '提供專業詳細的導覽解說服務'
        }
      }
    ]
  },
  {
    id: 'dimension3',
    name: '構面三：服務品質與安全',
    description: '評估服務品質和安全管理',
    questions: [
      {
        id: 'q9',
        number: 9,
        title: '服務人員素質',
        description: '服務人員態度親切，具備基本服務技能',
        scoreGuidelines: {
          score_0: '服務人員態度差，缺乏基本服務技能',
          score_2_5: '服務人員態度一般，服務技能有待提升',
          score_5: '服務人員態度親切，服務技能優良'
        }
      },
      {
        id: 'q10',
        number: 10,
        title: '安全管理措施',
        description: '建立完善的安全管理制度和措施',
        scoreGuidelines: {
          score_0: '無安全管理措施',
          score_2_5: '有基本安全措施但不完善',
          score_5: '安全管理制度完善，措施到位'
        }
      },
      {
        id: 'q11',
        number: 11,
        title: '保險與責任',
        description: '投保相關責任保險，保障遊客安全',
        scoreGuidelines: {
          score_0: '未投保任何責任保險',
          score_2_5: '有基本保險但保障不足',
          score_5: '投保完善的責任保險'
        }
      },
      {
        id: 'q12',
        number: 12,
        title: '緊急應變能力',
        description: '具備處理緊急狀況的能力和預案',
        scoreGuidelines: {
          score_0: '無緊急應變預案',
          score_2_5: '有基本應變能力但預案不完善',
          score_5: '緊急應變能力強，預案完善'
        }
      }
    ]
  },
  {
    id: 'dimension4',
    name: '構面四：永續經營與創新',
    description: '評估永續經營理念和創新能力',
    questions: [
      {
        id: 'q13',
        number: 13,
        title: '環境保護措施',
        description: '實施環境保護措施，注重生態平衡',
        scoreGuidelines: {
          score_0: '無環境保護意識，破壞生態環境',
          score_2_5: '有基本環保措施，但執行不力',
          score_5: '環保措施完善，注重生態保護'
        }
      },
      {
        id: 'q14',
        number: 14,
        title: '資源循環利用',
        description: '有效利用農業廢棄物，實現資源循環',
        scoreGuidelines: {
          score_0: '農業廢棄物處理不當',
          score_2_5: '有簡單的廢棄物處理',
          score_5: '農業廢棄物有效循環利用'
        }
      },
      {
        id: 'q15',
        number: 15,
        title: '創新經營模式',
        description: '採用創新的經營模式和行銷策略',
        scoreGuidelines: {
          score_0: '經營模式傳統，無創新',
          score_2_5: '有一些創新嘗試但不突出',
          score_5: '經營模式創新，行銷策略有效'
        }
      },
      {
        id: 'q16',
        number: 16,
        title: '品牌建設',
        description: '建立農場品牌，提升知名度',
        scoreGuidelines: {
          score_0: '無品牌意識',
          score_2_5: '有基本品牌概念但不明確',
          score_5: '品牌形象鮮明，知名度高'
        }
      }
    ]
  },
  {
    id: 'dimension5',
    name: '構面五：社區連結與文化傳承',
    description: '評估與社區的連結和文化傳承（僅第三類、第四類申請單位需填寫）',
    questions: [
      {
        id: 'q17',
        number: 17,
        title: '在地文化展現',
        description: '展現在地文化特色，傳承傳統技藝',
        scoreGuidelines: {
          score_0: '無在地文化展現',
          score_2_5: '有簡單的文化展示',
          score_5: '在地文化特色鮮明，傳承完整'
        },
        requiredFor: ['type3', 'type4']
      },
      {
        id: 'q18',
        number: 18,
        title: '社區合作關係',
        description: '與在地社區建立良好合作關係',
        scoreGuidelines: {
          score_0: '與社區無合作關係',
          score_2_5: '與社區有基本合作',
          score_5: '與社區合作密切，互利共贏'
        },
        requiredFor: ['type3', 'type4']
      },
      {
        id: 'q19',
        number: 19,
        title: '在地食材運用',
        description: '積極運用在地食材，支持在地農業',
        scoreGuidelines: {
          score_0: '未使用在地食材',
          score_2_5: '部分使用在地食材',
          score_5: '大量使用在地食材，支持在地農業'
        },
        requiredFor: ['type3', 'type4']
      },
      {
        id: 'q20',
        number: 20,
        title: '文化教育功能',
        description: '發揮文化教育功能，推廣農村文化',
        scoreGuidelines: {
          score_0: '無文化教育功能',
          score_2_5: '有基本文化介紹',
          score_5: '文化教育功能完善，推廣效果好'
        },
        requiredFor: ['type3', 'type4']
      }
    ]
  }
];

// 獲取特定認證類型需要填寫的題目
export const getQuestionsForCertificationType = (certType: CertificationType): Question[] => {
  const allQuestions = EVALUATION_DIMENSIONS.flatMap(dim => dim.questions);
  return allQuestions.filter(q => 
    !q.requiredFor || q.requiredFor.includes(certType)
  );
};

// 計算總分
export const calculateTotalScore = (answers: SelfEvaluationAnswer[]): number => {
  return answers.reduce((total, answer) => total + answer.selfScore, 0);
}; 