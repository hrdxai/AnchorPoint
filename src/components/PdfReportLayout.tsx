import React, { forwardRef } from 'react';
import {
  Compass,
  Briefcase,
  Layers,
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { ANCHORS } from '../data/careerAnchorData';
import { AnchorCode, AssessmentResult, AICareerReport } from '../types';

interface PdfReportLayoutProps {
  result: AssessmentResult;
  aiReport: AICareerReport;
  chartData: Array<{
    anchor: string;
    code: string;
    score: number;
    fullMark: number;
  }>;
}

export const PdfReportLayout = forwardRef<HTMLDivElement, PdfReportLayoutProps>(
  ({ result, aiReport, chartData }, ref) => {
    const topAnchorCodes = result.topAnchors;
    const primaryAnchorCode = topAnchorCodes[0] || 'TF';
    const primaryAnchor = ANCHORS[primaryAnchorCode];

    const todayDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div
        ref={ref}
        className="w-[794px] bg-white text-slate-800 p-8 font-sans border-0 shadow-none space-y-6"
        style={{
          colorScheme: 'light',
          boxSizing: 'border-box',
          lineHeight: '1.6',
        }}
      >
        {/* Header Title Section */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex justify-between items-end">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-[#00355f] text-white text-xs font-bold mb-2">
              AnchorPoint Official Career Report
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              커리어 앵커 종합 진단 결과 리포트
            </h1>
          </div>
          <div className="text-right text-xs text-slate-500 font-medium space-y-1">
            <div>진단자: <span className="font-bold text-slate-800">{result.userName || '사용자'}</span></div>
            <div>희망 직무: <span className="font-bold text-slate-800">{result.desiredJob || '미지정'}</span></div>
            <div>진단 일자: <span>{todayDate}</span></div>
          </div>
        </div>

        {/* Top Headline Summary Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6 text-center space-y-2">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Core Career Anchors
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            핵심 커리어 앵커:{' '}
            <span className="text-blue-700 underline decoration-blue-300">
              [{topAnchorCodes.map((c) => ANCHORS[c].name).join(', ')}]
            </span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium pt-1">
            "{primaryAnchor.tagline}"
          </p>
        </div>

        {/* Section 1: Radar Chart & Anchor Details */}
        <div className="grid grid-cols-12 gap-5 mb-6">
          {/* Radar Chart (Left 6 cols) */}
          <div className="col-span-6 bg-slate-50/70 rounded-2xl p-4 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#00355f]" />
              <span>8개 앵커 프로필</span>
            </h3>

            <div className="w-full h-[240px] flex items-center justify-center my-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis
                    dataKey="code"
                    tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 20]} stroke="#94a3b8" fontSize={9} />
                  <Radar
                    name="앵커 점수"
                    dataKey="score"
                    stroke="#1d4ed8"
                    fill="#3b82f6"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-200">
              {(Object.keys(ANCHORS) as AnchorCode[]).map((code) => {
                const isTop = topAnchorCodes.includes(code);
                return (
                  <div
                    key={code}
                    className={`p-1.5 rounded-lg text-center border text-[11px] ${
                      isTop
                        ? 'bg-blue-100 border-blue-300 font-bold text-[#00355f]'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-[10px] truncate">{ANCHORS[code].name}</div>
                    <div className="font-extrabold">{result.scores[code]}점</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Anchor Card (Right 6 cols) */}
          <div className="col-span-6 bg-blue-50/40 rounded-2xl p-5 border border-blue-200 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {primaryAnchor.name_en} ({primaryAnchor.code})
                  </h3>
                  <span className="text-xs font-semibold text-blue-700">{primaryAnchor.name}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {primaryAnchor.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-blue-200/80 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">핵심 동기: </span>
                  <span className="text-slate-700">{primaryAnchor.coreMotivation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">기피 환경: </span>
                  <span className="text-slate-700">{primaryAnchor.avoidEnvironment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Career Analysis */}
        <div className="border border-slate-200 rounded-2xl p-5 space-y-5 bg-white mb-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-base text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI 커리어 분석</span>
            </div>
            <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded-full">
              직무: {result.desiredJob}
            </span>
          </div>

          {/* Job Fit */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>직무 적합도 분석</span>
            </h4>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {aiReport.jobFitAnalysis}
            </p>
          </div>

          {/* Tracks */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>추천 커리어 패스</span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  {aiReport.trackA.title}
                </span>
                <p className="text-xs font-extrabold text-slate-900">{aiReport.trackA.path}</p>
                <p className="text-[11px] text-slate-600 leading-normal pt-1">
                  {aiReport.trackA.description}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  {aiReport.trackB.title}
                </span>
                <p className="text-xs font-extrabold text-slate-900">{aiReport.trackB.path}</p>
                <p className="text-[11px] text-slate-600 leading-normal pt-1">
                  {aiReport.trackB.description}
                </p>
              </div>
            </div>
          </div>

          {/* Precautions */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>주의사항</span>
            </h4>
            <p className="text-xs text-rose-950 bg-rose-50/80 p-3.5 rounded-xl border border-rose-200 leading-relaxed">
              {aiReport.precautions}
            </p>
          </div>

          {/* Interview Tips */}
          {aiReport.interviewTips && (
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>자기소개서 & 면접 어필 팁</span>
              </h4>
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] font-bold text-slate-500 mr-1 self-center">
                    추천 키워드:
                  </span>
                  {aiReport.interviewTips.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-800 italic border-t border-amber-200/60 pt-2 leading-relaxed">
                  "{aiReport.interviewTips.pitchStatement}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-400 font-medium">
          AnchorPoint Career Diagnostic System &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    );
  }
);

PdfReportLayout.displayName = 'PdfReportLayout';
