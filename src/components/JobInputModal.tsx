import React, { useState } from 'react';
import { Briefcase, Search, ArrowRight, Sparkles } from 'lucide-react';

interface JobInputModalProps {
  onSubmit: (jobTitle: string) => void;
  isLoading?: boolean;
}

export const JobInputModal: React.FC<JobInputModalProps> = ({ onSubmit, isLoading }) => {
  const [jobTitle, setJobTitle] = useState('');

  const quickTags = [
    '프로덕트 매니저',
    '데이터 분석가',
    '서비스 기획자',
    '마케터',
    '소프트웨어 엔지니어',
    'HRD / 인재개발',
    '경영기획 / 전략',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      onSubmit('기획자 / 프로덕트 매니저'); // fallback default
    } else {
      onSubmit(jobTitle.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-[560px] w-full p-8 sm:p-10 shadow-2xl border border-slate-200/80 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00355f] via-blue-600 to-amber-500" />

        <div className="flex flex-col items-center text-center space-y-6 pt-2">
          {/* Briefcase Icon Circle */}
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#00355f] shadow-xs">
            <Briefcase className="w-8 h-8" />
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              AI 맞춤형 커리어 분석을 위해<br />
              <span className="text-amber-500">희망 직무</span>를 알려주세요.
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              어떤 분야에서 일하고 싶으신가요? 편하게 작성해 주시면, 당신의 성향에 꼭 맞는 커리어 패스를 제안해 드립니다.
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5 pt-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="예: 프로덕트 매니저, 데이터 분석가, 마케터 등"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#00355f] focus:ring-2 focus:ring-[#00355f]/20 text-slate-800 text-sm sm:text-base outline-hidden transition-all shadow-2xs"
                autoFocus
                id="desired-job-input"
              />
            </div>

            {/* Quick Tag Recommendations */}
            <div className="flex flex-wrap gap-1.5 justify-center pt-1">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setJobTitle(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    jobTitle === tag
                      ? 'bg-blue-50 border-blue-300 text-[#00355f] font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base rounded-full shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
                id="submit-job-btn"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>AI 리포트 분석 중...</span>
                  </>
                ) : (
                  <>
                    <span>결과 보기</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
