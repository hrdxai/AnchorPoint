import { Question, AnchorCode, AnchorDetail } from '../types';

export const SCALE = {
  min: 1,
  max: 4,
  labels: {
    1: "전혀 아니다",
    2: "아니다",
    3: "그렇다",
    4: "항상 그렇다"
  }
};

export const ANCHORS: Record<AnchorCode, AnchorDetail> = {
  TF: {
    code: 'TF',
    name: '전문가형',
    name_en: 'Technical/Functional',
    tagline: '뛰어난 전문성을 바탕으로 문제 해결에 집중하며, 자신의 분야에서 최고의 실력을 인정받는 것을 중요하게 생각합니다.',
    description: '전문가형(TF)은 특정 직무 영역에서 자신의 전문성과 기술을 개발하고 발휘하는 데서 가장 큰 동기를 얻습니다. 이들은 \'경영진\'이 되는 것보다 \'최고의 엔지니어\' 혹은 \'최고의 분석가\'로 남기를 원하며, 자신의 기술적 역량이 도전받는 환경을 선호합니다.',
    coreMotivation: '전문성 심화 및 기술적 도전',
    avoidEnvironment: '전문성과 무관한 일반 관리직으로의 강제 전환',
    color: '#3B82F6', // Blue
    questions: [1, 9, 17, 26, 35]
  },
  GM: {
    code: 'GM',
    name: '관리자형',
    name_en: 'General Managerial',
    tagline: '조직의 전반적인 성과를 총괄하고 리더십을 발휘하여 다양한 사람과 자원을 통합 관리하는 것을 선호합니다.',
    description: '관리자형(GM)은 한 분야의 전문가에 머물기보다는 조직 전체를 총괄하고 책임을 지는 리더가 되고 싶어 합니다. 이들은 전략적 사고, 사람 관리 능력을 바탕으로 경영 성과를 창출할 때 가장 큰 성취감을 얻습니다.',
    coreMotivation: '조직 총괄 책임, 의사결정 권한, 리더십 발휘',
    avoidEnvironment: '실무에만 매여 관리 직군 및 경영진으로의 승진이 제한되는 환경',
    color: '#6366F1', // Indigo
    questions: [2, 10, 21, 30, 36]
  },
  AU: {
    code: 'AU',
    name: '자율/독립형',
    name_en: 'Autonomy/Independence',
    tagline: '타인의 지시나 규칙에서 벗어나 자신의 자율성과 방식에 따라 주도적으로 일하는 것을 최우선으로 합니다.',
    description: '자율/독립형(AU)은 규율과 통제가 강한 조직 구조를 불편해하며, 자율권이 부여된 상태에서 스케줄과 업무 방식을 스스로 정할 수 있을 때 최상의 능력을 발휘합니다.',
    coreMotivation: '재량권, 자유로운 업무 방식, 독립성',
    avoidEnvironment: '과도한 감시, 경직된 규율과 프로세스를 강요하는 환경',
    color: '#8B5CF6', // Violet
    questions: [3, 11, 18, 31, 38]
  },
  SE: {
    code: 'SE',
    name: '안전/안정형',
    name_en: 'Security/Stability',
    tagline: '직업의 안정성, 보장성, 예측 가능한 조직 환경을 가장 중요한 가치로 생각합니다.',
    description: '안전/안정형(SE)은 지속 가능하고 안정적인 고용 환경과 보장된 혜택을 중시합니다. 위험 부담이 큰 도전보다는 안정적인 고용 관계 속에서 안심하고 일할 때 지속적인 몰입이 가능합니다.',
    coreMotivation: '직업적·재정적 안정감, 예측 가능한 커리어 패스',
    avoidEnvironment: '불안정한 고용 체계, 잦은 구조조정 및 예측 불가능성이 높은 환경',
    color: '#06B6D4', // Cyan
    questions: [5, 12, 19, 25, 37]
  },
  EC: {
    code: 'EC',
    name: '기업가적 창조형',
    name_en: 'Entrepreneurial Creativity',
    tagline: '자신의 아이디어나 서비스, 사업을 직접 창출하고 주도하여 성과를 만들어내는 데 열정을 쏟습니다.',
    description: '기업가적 창조형(EC)은 남이 만들어놓은 시스템에 안주하기보다, 자신의 능력과 창의성을 바탕으로 새로운 제품, 프로젝트, 또는 기업을 창출해 내고 싶어 합니다.',
    coreMotivation: '신규 사업/제품 창출, 자기주도적 성과 창출',
    avoidEnvironment: '타인이 구축한 틀 안에서의 단조롭고 수동적인 업무',
    color: '#F59E0B', // Amber
    questions: [4, 13, 20, 29, 33]
  },
  SV: {
    code: 'SV',
    name: '봉사/헌신형',
    name_en: 'Service/Dedication',
    tagline: '사회나 타인에게 기여하고 긍정적인 영향을 줄 수 있는 가치 지향적 업무에 보람을 느낍니다.',
    description: '봉사/헌신형(SV)은 단순한 재정적 성공보다 자신의 일이 사람들의 삶이나 사회 개선에 도움이 되는지 여부를 핵심 기준으로 삼습니다. 가치가 정립된 직무일 때 깊이 몰입합니다.',
    coreMotivation: '가치 실현, 타인 및 사회 기여',
    avoidEnvironment: '윤리적으로 어긋나거나 사회적 이익 없이 순수 이익만 추구하는 환경',
    color: '#10B981', // Emerald
    questions: [7, 14, 22, 28, 34]
  },
  CH: {
    code: 'CH',
    name: '순수 도전형',
    name_en: 'Pure Challenge',
    tagline: '풀기 어려운 극도로 까다로운 문제나 불가능해 보이는 목표에 도전하여 극복해내는 데서 에너지를 얻습니다.',
    description: '순수 도전형(CH)은 단조로운 업무를 매우 지루해합니다. 누구도 해결하지 못한 과제나 고난도의 장애물을 마주하여 그것을 증명하고 극복해낼 때 비로소 진정한 성취감을 느낍니다.',
    coreMotivation: '문제 해결, 난제 극복, 지속적인 성장의 기회',
    avoidEnvironment: '변화가 없고 쉬운 과제만 반복되는 단조로운 환경',
    color: '#EF4444', // Red
    questions: [8, 15, 23, 32, 40]
  },
  LS: {
    code: 'LS',
    name: '라이프스타일형',
    name_en: 'Lifestyle',
    tagline: '개인의 삶, 가족, 직업 생활 사이의 균형을 유지하고 유연한 라이프스타일을 영위하는 것을 중시합니다.',
    description: '라이프스타일형(LS)은 직업 성공을 인생 전체의 한 부분으로 바라봅니다. 따라서 개인의 건강, 가족과의 시간, 직무의 성취가 균형을 이루는 통합적인 삶을 추구합니다.',
    coreMotivation: '워라밸, 삶과의 조화, 유연한 커리어 설계',
    avoidEnvironment: '가정 및 사생활을 과도하게 희생해야 하거나 야근이 상습화된 직무',
    color: '#EC4899', // Pink
    questions: [6, 16, 24, 27, 39]
  }
};

export const QUESTIONS: Question[] = [
  { id: 1, text: "내가 맡고 있는 일을 매우 잘해서 다른 사람들에게 전문적인 조언을 해주고 싶다.", anchor: "TF" },
  { id: 2, text: "다른 사람들의 일을 총괄하고 지휘할 수 있을 때 성취감을 느낀다.", anchor: "GM" },
  { id: 3, text: "내 방식과 스케줄에 따라 일할 수 있는 충분한 결정권이 있는 일을 하고 싶다.", anchor: "AU" },
  { id: 4, text: "나는 항상 내 사업을 하기 위한 아이디어를 구상한다.", anchor: "EC" },
  { id: 5, text: "보장성과 안정성이 자유와 자율보다 더 중요하다.", anchor: "SE" },
  { id: 6, text: "개인적이거나 가족과 관련된 일에 지장을 초래하는 업무를 맡게 되면 차라리 그 일을 그만두겠다.", anchor: "LS" },
  { id: 7, text: "사회를 위해 실질적 기여를 했다고 느낄 때만 내 일에서 성공했다고 느낄 수 있을 것이다.", anchor: "SV" },
  { id: 8, text: "항상 어려운 문제를 던져 주고, 그 문제에 도전하도록 하는 일을 하고 싶다.", anchor: "CH" },
  { id: 9, text: "내가 가진 전문적 능력을 최고 수준에 올려놓아야만 성공했다고 느낄 것이다.", anchor: "TF" },
  { id: 10, text: "나는 조직 전체의 총괄 책임자가 되고 싶다.", anchor: "GM" },
  { id: 11, text: "나는 업무, 스케줄 및 진행 절차 등을 전적으로 자유롭게 정할 수 있는 일을 하고 싶다.", anchor: "AU" },
  { id: 12, text: "조직 내에서 내 안전을 위협하는 일을 해야 한다면 그 조직을 떠나겠다.", anchor: "SE" },
  { id: 13, text: "타인 소유의 조직에서 최고 경영자의 위치에 오르기보다는 내 사업을 키워 나가는 것이 더 중요하다.", anchor: "EC" },
  { id: 14, text: "일을 하면서 나의 재능을 타인을 위해 사용할 때 가장 큰 성취감을 느낀다.", anchor: "SV" },
  { id: 15, text: "나는 매우 어려운 도전에 직면하면 그것을 극복하여 성취감을 맛볼 때 내 커리어에서 성공했다고 느낀다.", anchor: "CH" },
  { id: 16, text: "나는 나 자신과 가족 그리고 나의 일이 내 생활에서 균형을 이룰 수 있는 직업을 원한다.", anchor: "LS" },
  { id: 17, text: "내 관심 분야의 전문가가 되는 것이 여러 분야의 총괄 관리자가 되는 것보다 더 매력적이라고 생각한다.", anchor: "TF" },
  { id: 18, text: "내 일에서 전적으로 자율과 자유가 주어진 상황에서 목표를 달성할 수 있을 때 더 큰 성취감을 맛볼 수 있다.", anchor: "AU" },
  { id: 19, text: "나는 무엇보다 보장성과 안정성이 높은 조직에서 일하고 싶다.", anchor: "SE" },
  { id: 20, text: "내 능력과 노력의 결과로 무엇인가를 이뤘을 때 성취감을 만끽한다.", anchor: "EC" },
  { id: 21, text: "나는 한 조직의 모든 일을 총괄하는 관리자가 되어야만 성공했다고 생각한다.", anchor: "GM" },
  { id: 22, text: "보다 나은 세상을 만들기 위해 내 기술을 활용하는 것이 내 커리어 선택을 하는 데 있어 가장 중요한 가치다.", anchor: "SV" },
  { id: 23, text: "나는 해결할 수 없을 것 같은 문제를 해결하고, 불가능해 보이는 것을 가능하게 만들었을 때 성취감을 느낀다.", anchor: "CH" },
  { id: 24, text: "나는 개인, 가족 그리고 일을 추구하는 데 있어 적절한 균형을 유지하는 것이 진정한 의미의 성공적인 인생이라고 생각한다.", anchor: "LS" },
  { id: 25, text: "나는 보장성과 안정성을 느낄 수 있는 일을 희망한다.", anchor: "SE" },
  { id: 26, text: "내 전문 분야가 아닌 일을 맡게 된다면, 차라리 조직을 떠나겠다.", anchor: "TF" },
  { id: 27, text: "최고 경영인이 되기보다는 개인적인 삶과 직업 생활을 균형 있게 유지하는 것이 내게 더 중요하다.", anchor: "LS" },
  { id: 28, text: "나는 인류와 사회에 실질적으로 기여할 수 있는 직업을 갖고 싶다.", anchor: "SV" },
  { id: 29, text: "온 힘을 다해 나 자신의 생산품이나 아이디어인 무엇인가를 개발하거나 만들어 내는 일을 하기 원하며, 그 속에서 성공을 거둘 때 가장 큰 성취감을 느낄 것이다.", anchor: "EC" },
  { id: 30, text: "내 전문 분야에서 깊이 있는 전문가가 되기보다는 여러 분야를 넓게 아우르는 총괄 관리자가 되기를 더 희망한다.", anchor: "GM" },
  { id: 31, text: "나는 규칙과 제약에 얽매이지 않고 내 방식대로 일할 수 있는 것에 매력을 느낀다고 생각한다.", anchor: "AU" },
  { id: 32, text: "나는 문제해결 능력을 강하게 요구하는 일을 하고 싶다.", anchor: "CH" },
  { id: 33, text: "나는 개인 사업을 꿈꾼다.", anchor: "EC" },
  { id: 34, text: "나는 그 무엇보다도 다른 사람에게 봉사하고 다른 사람을 돕는 일을 할 수 있기를 바라며, 다른 사람에게 스트레스를 주는 일을 맡을 바에는 조직을 떠나겠다.", anchor: "SV" },
  { id: 35, text: "내 전문적 기술과 재능을 활용할 수 있는 일을 할 때 가장 큰 성취감을 맛볼 수 있을 것이다.", anchor: "TF" },
  { id: 36, text: "나는 사장과 같은 조직의 총괄 관리자가 될 수 있는 경력에서 멀어지는 일을 맡을 바에는 차라리 조직을 떠나겠다.", anchor: "GM" },
  { id: 37, text: "나는 재정적으로나 직업적으로 내게 완벽한 안정감을 줄 때만 일에 더 몰입할 수 있으며, 더욱 많은 성취감을 느끼게 된다.", anchor: "SE" },
  { id: 38, text: "나는 자율과 자유가 보장되지 않는 일을 하느니 차라리 조직을 떠나겠다.", anchor: "AU" },
  { id: 39, text: "나는 언제나 개인이나 가족 문제에 최대한 지장을 주지 않는 직업을 찾으려 한다.", anchor: "LS" },
  { id: 40, text: "고위 관리직을 맡게 되는 것보다는 해결하기 힘든 문제와 씨름하여 일을 마무리하는 것이 내게는 더 중요하다.", anchor: "CH" }
];

export function calculateScores(answers: Record<number, number>): Record<AnchorCode, number> {
  const scores: Record<AnchorCode, number> = {
    TF: 0, GM: 0, AU: 0, SE: 0, EC: 0, SV: 0, CH: 0, LS: 0
  };

  QUESTIONS.forEach(q => {
    const val = answers[q.id] || 0;
    scores[q.anchor] += val;
  });

  return scores;
}

export function getTopAnchors(scores: Record<AnchorCode, number>): AnchorCode[] {
  const entries = Object.entries(scores) as [AnchorCode, number][];
  entries.sort((a, b) => b[1] - a[1]);
  
  const maxScore = entries[0][1];
  // return top anchors matching max score or top 2
  const tops = entries.filter(e => e[1] === maxScore).map(e => e[0]);
  if (tops.length === 1 && entries.length > 1) {
    tops.push(entries[1][0]);
  }
  return tops;
}
