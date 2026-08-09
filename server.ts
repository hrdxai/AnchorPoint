import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // Initialize Gemini AI Client
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route: Analyze Career with Gemini
  app.post('/api/analyze-career', async (req, res) => {
    try {
      const { topAnchors, scores, desiredJob, anchorDetails } = req.body;

      if (!desiredJob || !topAnchors || !Array.isArray(topAnchors)) {
        return res.status(400).json({ error: '필수 파라미터가 누락되었습니다.' });
      }

      const ai = getGenAI();

      const systemPrompt = `당신은 에드가 샤인(Edgar Schein)의 커리어 앵커 이론을 정통한 전문 커리어 컨설턴트 및 HRD 전문가입니다.
사용자의 커리어 앵커 검사 결과와 희망 직무를 분석하여 실용적이고 통찰력 있는 커리어 분석 리포트를 한국어로 생성하세요.

검사 결과 정보:
- 희망 직무: ${desiredJob}
- 주요 커리어 앵커 코드: ${topAnchors.join(', ')}
- 주요 앵커 세부 정보: ${JSON.stringify(anchorDetails)}
- 전체 8개 앵커 점수 (5~20점 범위): ${JSON.stringify(scores)}

요구사항:
1. summaryHeadline: 희망 직무와 핵심 앵커의 결합적 강점을 명확히 짚어주는 인상적인 요약 문장 (1~2문장)
2. jobFitAnalysis: 주요 성향이 이 희망 직무에서 어떻게 발휘되며 왜 높은/특정한 적합도를 보이는지 구체적으로 설명 (3~5문장)
3. trackA: 직무 수행자로서 가장 추천하는 커리어 패스 트랙 (Specialist / Core Track)
   - title: 트랙명 (예: Track A: 전문가/스페셜리스트)
   - path: 단계별 직무명 경로 (예: 데이터 분석가 → 시니어 데이터 사이언티스트 → Staff Data Scientist)
   - description: 이 경로의 핵심 특징 및 성장 지점 설명
4. trackB: 대체 또는 확장 형태의 커리어 패스 트랙 (Hybrid / Extension Track)
   - title: 트랙명 (예: Track B: 프로덕트 리더십)
   - path: 단계별 직무명 경로 (예: 서비스 기획자 → 시니어 프로덕트 매니저 → Head of Product)
   - description: 이 경로의 핵심 특징 및 확장 가능성 설명
5. precautions: 이 커리어 앵커 성향을 가진 사람이 해당 직무나 조직 생활에서 주의해야 할 실질적 피해야 할 함정 및 조언 (2~4문장)
6. interviewTips:
   - keywords: 이 성향을 입사 지원/면접에서 어필할 핵심 강점 키워드 3~4개 (문자열 배열)
   - pitchStatement: 자기소개서나 면접에서 바로 활용 가능한 1분 강점 어필 스피치 문구 (2~3문장)
`;

      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: '위 사용자의 커리어 앵커 진단 결과를 바탕으로 분석 리포트를 생성해 주세요.',
            config: {
              systemInstruction: systemPrompt,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  summaryHeadline: { type: Type.STRING },
                  jobFitAnalysis: { type: Type.STRING },
                  trackA: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      path: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                    required: ['title', 'path', 'description'],
                  },
                  trackB: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      path: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                    required: ['title', 'path', 'description'],
                  },
                  precautions: { type: Type.STRING },
                  interviewTips: {
                    type: Type.OBJECT,
                    properties: {
                      keywords: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      pitchStatement: { type: Type.STRING },
                    },
                    required: ['keywords', 'pitchStatement'],
                  },
                },
                required: [
                  'summaryHeadline',
                  'jobFitAnalysis',
                  'trackA',
                  'trackB',
                  'precautions',
                  'interviewTips',
                ],
              },
            },
          });

          if (response.text) {
            const parsedData = JSON.parse(response.text.trim());
            return res.json({ success: true, report: parsedData });
          }
        } catch (geminiError) {
          console.error('Gemini API call error:', geminiError);
          // Fall back gracefully below
        }
      }

      // Fallback response if Gemini API key is missing or call fails
      const mainAnchor = topAnchors[0] || 'TF';
      const anchorNames: Record<string, string> = {
        TF: '전문가형(TF)',
        GM: '관리자형(GM)',
        AU: '자율/독립형(AU)',
        SE: '안전/안정형(SE)',
        EC: '기업가적 창조형(EC)',
        SV: '봉사/헌신형(SV)',
        CH: '순수 도전형(CH)',
        LS: '라이프스타일형(LS)',
      };

      const fallbackReport = {
        summaryHeadline: `${anchorNames[mainAnchor]} 성향의 당신은 데이터와 본질적 문제를 해결하는 [${desiredJob}] 직무에 매우 뛰어난 잠재력을 가지고 있습니다.`,
        jobFitAnalysis: `${anchorNames[mainAnchor]} 성향이 강한 당신은 ${desiredJob} 분야에서 깊이 있는 전문성과 집요한 문제 해결력을 발휘할 수 있습니다. 복잡한 과제를 체계적으로 분석하고 최적의 솔루션을 설계하는 과정에서 높은 성취감을 느낄 것이며, 동료들에게도 확실한 전문적 신뢰를 얻을 가능성이 큽니다.`,
        trackA: {
          title: 'Track A: 스페셜리스트 패스',
          path: `${desiredJob} 담당자 → 시니어 ${desiredJob} → 도메인 수석 전문가 / Staff Specialist`,
          description: '실무 영역의 깊이를 다지고 독보적인 전문 영역을 개척하여 조직 내 최고의 핵심 인재로 성장하는 패스입니다.',
        },
        trackB: {
          title: 'Track B: 프로덕트 및 리더십 패스',
          path: `${desiredJob} 리드 → 프로덕트 매니저(PM) → C-Level / Head of Department`,
          description: '전문성을 토대로 다양한 직군과의 커뮤니케이션 및 리더십 역량을 통합하여 전체 조직/프로덕트를 이끄는 패스입니다.',
        },
        precautions: `${anchorNames[mainAnchor]} 성향을 추구하는 과정에서 조직 내 정치나 일반적인 사람 관리(People Management) 업무를 지나치게 등한시할 수 있습니다. 시니어 레벨로 성장하기 위해서는 타 직군과의 커뮤니케이션 능력을 의도적으로 기르고 타협점을 찾는 훈련이 필요합니다.`,
        interviewTips: {
          keywords: ['전문적 분석력', '도메인 몰입도', '문제 해결력', '지속적 학습'],
          pitchStatement: `저는 ${desiredJob} 직무에 필요한 최신 기술 역량과 데이터 기반 분석력을 바탕으로 문제의 원인을 깊이 파악하여 최적의 해법을 도출하는 데 강점이 있습니다. 최고의 기술적 완결성을 목표로 조직의 성과 창출에 기여하겠습니다.`,
        },
      };

      return res.json({ success: true, report: fallbackReport, fallback: true });
    } catch (err: any) {
      console.error('Server error analyzing career:', err);
      res.status(500).json({ error: '리포트 생성 중 오류가 발생했습니다.' });
    }
  });

  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
