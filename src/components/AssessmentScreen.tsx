import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Grid, ListOrdered, RotateCcw } from 'lucide-react';
import { QUESTIONS, SCALE } from '../data/careerAnchorData';

interface AssessmentScreenProps {
  answers: Record<number, number>;
  onAnswer: (questionId: number, value: number) => void;
  onComplete: () => void;
  onReset: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  answers,
  onAnswer,
  onComplete,
  onReset,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const currentSelectedValue = answers[currentQuestion.id];

  const progressPercentage = Math.round(((currentIndex + 1) / total) * 100);

  // Auto-advance or select logic
  const handleSelectOption = (val: number) => {
    onAnswer(currentQuestion.id, val);
    if (currentIndex < total - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (answeredCount === total) {
        onComplete();
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') handleSelectOption(1);
      else if (e.key === '2') handleSelectOption(2);
      else if (e.key === '3') handleSelectOption(3);
      else if (e.key === '4') handleSelectOption(4);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers]);

  return (
    <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
      {/* Top Header info */}
      <div className="w-full max-w-[720px] flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            id="toggle-question-map-btn"
          >
            <Grid className="w-3.5 h-3.5 text-slate-500" />
            <span>문항 목록 ({answeredCount}/{total})</span>
          </button>
        </div>

        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          처음부터 다시
        </button>
      </div>

      {/* Main Question Card matching design image 3 */}
      <div className="w-full max-w-[720px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between min-h-[460px] relative transition-all">
        {/* Progress bar at top of card */}
        <div className="w-full bg-slate-100 h-1.5 relative">
          <div
            className="bg-[#00355f] h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Card Header Info */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase">
          <span className="text-[#00355f] font-bold">CAREER DIAGNOSTIC</span>
          <span>Question {currentIndex + 1} of {total}</span>
        </div>

        {/* Question Text Body */}
        <div className="px-6 sm:px-10 py-8 text-center my-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug sm:leading-relaxed font-sans">
            {currentQuestion.text}
          </h2>
        </div>

        {/* 4-point Scale Option Buttons Grid */}
        <div className="px-6 sm:px-10 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((val) => {
              const label = SCALE.labels[val as keyof typeof SCALE.labels];
              const isSelected = currentSelectedValue === val;

              return (
                <button
                  key={val}
                  onClick={() => handleSelectOption(val)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group focus:outline-hidden ${
                    isSelected
                      ? 'border-[#00355f] bg-blue-50/60 ring-2 ring-[#00355f]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  id={`option-btn-${val}`}
                >
                  {/* Circle Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#00355f] bg-[#00355f] text-white'
                        : 'border-slate-300 group-hover:border-slate-400 bg-white'
                    }`}
                  >
                    {isSelected ? (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">{val}</span>
                    )}
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      isSelected ? 'text-[#00355f]' : 'text-slate-700'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Footer Navigation Bar */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-lg border text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
            id="prev-question-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            이전
          </button>

          <div className="text-xs text-slate-400 font-medium hidden sm:block">
            키보드 숫자키 (1~4) 및 화살표로 빠르게 응답 가능
          </div>

          {currentIndex === total - 1 ? (
            <button
              onClick={() => {
                if (answeredCount < total) {
                  alert(`아직 응답하지 않은 문항이 있습니다. (${total - answeredCount}개 미응답)`);
                  return;
                }
                onComplete();
              }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer flex items-center gap-1.5"
              id="finish-question-btn"
            >
              진단 완료하기
              <CheckCircle className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              id="next-question-btn"
            >
              다음
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Question Map Drawer / Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-[#00355f]" />
                전체 문항 응답 현황 ({answeredCount}/{total})
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                닫기 ✕
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 py-2">
              {QUESTIONS.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowMap(false);
                    }}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'border-[#00355f] bg-[#00355f] text-white ring-2 ring-[#00355f]/30'
                        : isAnswered
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    Q{q.id}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-200 border border-emerald-400 inline-block" />
                  응답 완료
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300 inline-block" />
                  미응답
                </span>
              </div>

              {answeredCount === total && (
                <button
                  onClick={() => {
                    setShowMap(false);
                    onComplete();
                  }}
                  className="px-4 py-1.5 bg-amber-500 text-white font-bold rounded-lg text-xs hover:bg-amber-600"
                >
                  결과 제출하기
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
