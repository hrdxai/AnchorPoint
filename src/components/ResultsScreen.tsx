import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import {
  Share2,
  FileDown,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Bookmark,
  Send,
  Check,
  Briefcase,
  Layers,
  Award,
  Loader2,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import confetti from 'canvas-confetti';
import { ANCHORS } from '../data/careerAnchorData';
import { AnchorCode, AssessmentResult, AICareerReport } from '../types';
import { PdfReportLayout } from './PdfReportLayout';

interface ResultsScreenProps {
  result: AssessmentResult;
  onRestart: () => void;
  onSaveToHistory: (userName?: string) => void;
  isAlreadySaved?: boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onRestart,
  onSaveToHistory,
  isAlreadySaved = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(isAlreadySaved);
  const [userNameInput, setUserNameInput] = useState(result.userName || '');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const pdfReportRef = useRef<HTMLDivElement>(null);

  const topAnchorCodes = result.topAnchors;
  const primaryAnchorCode = topAnchorCodes[0] || 'TF';
  const primaryAnchor = ANCHORS[primaryAnchorCode];

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  // Format chart data for Recharts Radar
  const chartData = (Object.keys(ANCHORS) as AnchorCode[]).map((code) => {
    const anchor = ANCHORS[code];
    return {
      anchor: anchor.name,
      code: code,
      score: result.scores[code] || 5,
      fullMark: 20,
    };
  });

  // Handle Share / Copy Link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      setToastMessage('링크가 복사되었습니다.');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // Handle PDF Export using html2canvas-pro (native oklch / oklab support)
  const handlePrintPDF = async () => {
    const element = pdfReportRef.current || reportRef.current;
    if (!element || isExportingPDF) return;

    try {
      setIsExportingPDF(true);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
        onclone: (clonedDoc) => {
          // Ensure SVG elements have explicit width & height for Recharts rendering
          const svgs = clonedDoc.querySelectorAll('svg');
          svgs.forEach((svg) => {
            const rect = svg.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              svg.setAttribute('width', `${Math.round(rect.width)}`);
              svg.setAttribute('height', `${Math.round(rect.height)}`);
            }
          });
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      const sanitizeName = (result.userName || '사용자').replace(/[^a-zA-Z0-9가-힣]/g, '_');
      const fileName = `AnchorPoint_커리어앵커진단_${sanitizeName}.pdf`;

      // Direct download via jsPDF
      pdf.save(fileName);

      setToastMessage('PDF 파일이 성공적으로 저장되었습니다.');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error) {
      console.error('PDF Generation failed:', error);
      setToastMessage('PDF 생성 중 오류가 발생했습니다.');
      setTimeout(() => setToastMessage(null), 3500);
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Handle Save
  const handleConfirmSave = () => {
    onSaveToHistory(userNameInput.trim() || '사용자');
    setSaved(true);
    setShowSaveModal(false);
  };

  const aiReport: AICareerReport = result.aiReport || {
    summaryHeadline: `뛰어난 전문성과 본질적 가치를 중시하는 당신은 [${result.desiredJob}] 직무에서 탁월한 몰입도와 성과를 발휘할 가능성이 매우 높습니다.`,
    jobFitAnalysis: `당신의 주된 커리어 앵커인 [${primaryAnchor.name}] 성향은 ${result.desiredJob} 직무에 정밀한 분석력과 솔루션 설계 능력을 제공합니다. 복잡한 문제를 다각도로 파헤쳐 본질적인 해법을 찾고, 높은 기술적 완성도를 도출하는 과정에서 깊은 성취감을 얻을 것입니다.`,
    trackA: {
      title: 'Track A: Specialist Path',
      path: `${result.desiredJob} 실무자 → 시니어 ${result.desiredJob} → 수석 도메인 전문가`,
      description: '실무 도메인의 전문성을 극대화하여 대체 불가능한 최고의 기술 인재로 성장하는 클래식 스페셜리스트 트랙입니다.',
    },
    trackB: {
      title: 'Track B: Product & Leadership Path',
      path: `${result.desiredJob} 리드 → 프로덕트 오너(PO) / 매니저 → C-Level / 조직 총괄`,
      description: '전문성을 지반으로 타 직군 및 리더십 영역으로 커리어를 확장하여 전반적인 프로덕트 성과를 지휘하는 트랙입니다.',
    },
    precautions: '전문성에 몰두하는 과정에서 사람 관리(People Management)나 조직 정치적 커뮤니케이션을 간과할 수 있습니다. 시니어 단계로 도약하기 위해서는 기술 외의 이해관계 조율과 사업적 관점과의 균형을 맞추는 노력이 필요합니다.',
    interviewTips: {
      keywords: ['전문성 심화', '데이터 문제해결', '기술적 완성도', '주도적 성장'],
      pitchStatement: `저는 ${result.desiredJob} 분야에 대한 깊이 있는 분석력과 주도적인 문제 해결 의지를 바탕으로 최고 수준의 성과를 내기 위해 꾸준히 탐구하는 인재입니다.`,
    },
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 print:p-0 print:m-0">
      {/* Report Container for PDF export */}
      <div ref={reportRef} className="space-y-10 bg-slate-50/50 p-2 sm:p-4 rounded-3xl">
        {/* Top Banner Headline matching design image 4 */}
      <div className="text-center space-y-3 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs print:shadow-none print:border-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#00355f] text-xs font-bold tracking-wide">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          DIAGNOSTIC REPORT FOR: {result.desiredJob}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          당신의 핵심 커리어 앵커는{' '}
          <span className="text-blue-600 border-b-4 border-blue-200">
            [{topAnchorCodes.map((c) => ANCHORS[c].name).join(', ')}]
          </span>{' '}
          입니다!
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          {primaryAnchor.tagline}
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols on lg): Radar Chart + Anchor Detail */}
        <div className="lg:col-span-5 space-y-8">
          {/* Radar Chart Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#00355f]" />
                커리어 앵커 프로필
              </h2>
              <span className="text-xs font-semibold text-slate-400">8개 축 (최대 20점)</span>
            </div>

            <div className="w-full h-[280px] sm:h-[320px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="code"
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 20]} stroke="#cbd5e1" fontSize={10} />
                  <Radar
                    name="앵커 점수"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}점 / 20점`,
                      `${item.payload.anchor} (${item.payload.code})`,
                    ]}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Score Badges List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-100">
              {(Object.keys(ANCHORS) as AnchorCode[]).map((code) => {
                const isTop = topAnchorCodes.includes(code);
                const score = result.scores[code];
                return (
                  <div
                    key={code}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      isTop
                        ? 'bg-blue-50 border-blue-300 font-bold text-[#00355f]'
                        : 'bg-slate-50 border-slate-100 text-slate-600'
                    }`}
                  >
                    <div className="text-[11px] font-semibold">{ANCHORS[code].name}</div>
                    <div className="text-xs font-extrabold">{score}점</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Primary Anchor Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-8 -mt-8 pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {primaryAnchor.name_en} ({primaryAnchor.code})
                </h3>
                <span className="text-xs font-semibold text-blue-600">{primaryAnchor.name}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {primaryAnchor.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">핵심 동기: </span>
                  <span className="text-slate-600">{primaryAnchor.coreMotivation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">기피 환경: </span>
                  <span className="text-slate-600">{primaryAnchor.avoidEnvironment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols on lg): AI Career Report */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>AI 커리어 리포트</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#00355f] text-white self-start sm:self-auto">
                #{result.desiredJob} 핏
              </span>
            </div>

            {/* Section 1: Job Fit Analysis */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                직무 적합도 분석 (Job Fit Analysis)
              </h3>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-700 text-sm sm:text-base leading-relaxed">
                {aiReport.jobFitAnalysis}
              </div>
            </div>

            {/* Section 2: Career Paths Track A & Track B */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                추천 커리어 패스 (Career Path)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Track A */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                    {aiReport.trackA.title}
                  </span>
                  <p className="text-sm font-extrabold text-slate-900">
                    {aiReport.trackA.path}
                  </p>
                  <p className="text-xs text-slate-500 leading-normal pt-1">
                    {aiReport.trackA.description}
                  </p>
                </div>

                {/* Track B */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all space-y-2 shadow-2xs">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                    {aiReport.trackB.title}
                  </span>
                  <p className="text-sm font-extrabold text-slate-900">
                    {aiReport.trackB.path}
                  </p>
                  <p className="text-xs text-slate-500 leading-normal pt-1">
                    {aiReport.trackB.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Precautions (Red container match) */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-rose-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                주의사항 (Precautions)
              </h3>
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-rose-950 text-sm leading-relaxed">
                {aiReport.precautions}
              </div>
            </div>

            {/* Section 4: Resume & Interview Tips */}
            {aiReport.interviewTips && (
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  자기소개서 & 면접 어필 팁
                </h3>
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs font-bold text-slate-500 mr-2 self-center">추천 키워드:</span>
                    {aiReport.interviewTips.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-t border-amber-200/60 pt-2">
                    "{aiReport.interviewTips.pitchStatement}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Action Buttons Bar matching design image 4 print-hidden */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 print:hidden">
        {/* PDF Print Button */}
        <button
          onClick={handlePrintPDF}
          disabled={isExportingPDF}
          className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm sm:text-base rounded-2xl shadow-2xs hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
          id="save-pdf-btn"
        >
          {isExportingPDF ? (
            <>
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span>PDF 생성 중...</span>
            </>
          ) : (
            <>
              <FileDown className="w-5 h-5 text-slate-600" />
              <span>PDF로 저장하기</span>
            </>
          )}
        </button>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
          id="restart-btn"
        >
          <RotateCcw className="w-5 h-5 text-slate-500" />
          <span>다시하기</span>
        </button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              진단 결과 저장하기
            </h3>
            <p className="text-xs text-slate-500">
              이름이나 식별명을 입력하시면 저장된 리포트 목록에서 언제든 다시 조회하실 수 있습니다.
            </p>

            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder="예: 홍길동, 커리어준비생1"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#00355f] outline-hidden"
              autoFocus
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                취소
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-5 py-2 bg-[#00355f] text-white text-xs font-bold rounded-lg hover:bg-[#0f4c81]"
              >
                저장 완료
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden PDF Template Container (Fixed 794px A4 Width) */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '794px',
          overflow: 'hidden',
          zIndex: -9999,
          pointerEvents: 'none',
        }}
      >
        <PdfReportLayout
          ref={pdfReportRef}
          result={result}
          aiReport={aiReport}
          chartData={chartData}
        />
      </div>
    </main>
  );
};
