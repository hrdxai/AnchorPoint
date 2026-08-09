import React from 'react';
import { Compass, Clock, FileText, Anchor, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
  onOpenAbout: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onOpenAbout }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center">
      {/* Hero Header */}
      <div className="text-center max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#00355f] text-xs font-semibold tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Edgar Schein's 8 Career Anchors Diagnostic
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#00355f] tracking-tight leading-tight">
          커리어 앵커 진단 <span className="text-slate-700 font-semibold">(직업가치관검사)</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          당신의 흔들리지 않는 직업적 가치관을 발견하세요. 에드가 샤인(Edgar Schein) 교수의
          이론을 바탕으로 한 40문항 진단을 통해 당신의 커리어 나침반을 찾아드립니다.
        </p>

        {/* Start Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            id="start-diagnostic-btn"
          >
            <Compass className="w-6 h-6 animate-spin-slow" />
            진단 시작하기
          </button>
        </div>

        {/* Time and Question Metadata */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>소요 시간: 약 10분</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>문항 수: 40문항</span>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
        {/* Card 1: What is Career Anchor (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#00355f]">
                <Anchor className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                에드가 샤인 교수의 '커리어 앵커'란?
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              조직 심리학의 대가 에드가 샤인(Edgar Schein) 교수가 고안한 개념으로, 배가 닻(Anchor)을 내리면
              흔들리지 않듯, 개인이 직업을 선택하고 커리어를 발전시켜 나갈 때 결코 포기할 수 없는 가장
              핵심적인 가치관, 동기, 능력을 의미합니다. 이 진단을 통해 당신 내면의 닻이 어디에 내려져
              있는지 확인해보세요.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              8가지 직업 가치관 유형
            </span>
            <button
              onClick={onOpenAbout}
              className="text-xs font-bold text-[#00355f] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              8개 앵커 유형 상세보기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Provided Benefits */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              진단 결과 제공 내역
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  8가지 앵커 기반 레이더 차트
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  AI 기반 맞춤형 커리어 분석
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  주요 직업 가치관 심층 설명
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              * 희망 직무를 함께 입력하시면 AI가 직무 적합도와 자소서/면접 어필 팁까지 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
