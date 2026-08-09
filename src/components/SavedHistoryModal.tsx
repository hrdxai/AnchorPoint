import React from 'react';
import { Bookmark, X, Trash2, Calendar, Briefcase, ExternalLink } from 'lucide-react';
import { AssessmentResult } from '../types';
import { ANCHORS } from '../data/careerAnchorData';

interface SavedHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedResults: AssessmentResult[];
  onSelectResult: (result: AssessmentResult) => void;
  onDeleteResult: (id: string) => void;
  onClearAll: () => void;
}

export const SavedHistoryModal: React.FC<SavedHistoryModalProps> = ({
  isOpen,
  onClose,
  savedResults,
  onSelectResult,
  onDeleteResult,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2 text-[#00355f] font-bold text-xl">
            <Bookmark className="w-6 h-6 text-amber-500" />
            <span>저장된 진단 리포트 히스토리</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List or Empty State */}
        {savedResults.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Bookmark className="w-6 h-6" />
            </div>
            <p className="text-slate-600 font-bold text-base">저장된 리포트가 없습니다.</p>
            <p className="text-xs text-slate-400">
              커리어 앵커 진단을 완료한 후 결과 페이지에서 '결과 저장하기'를 클릭해보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>총 {savedResults.length}개의 리포트가 저장되어 있습니다.</span>
              <button
                onClick={onClearAll}
                className="text-rose-600 hover:underline font-semibold"
              >
                전체 삭제
              </button>
            </div>

            <div className="space-y-3">
              {savedResults.map((item) => {
                const dateStr = new Date(item.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const topNames = item.topAnchors
                  .map((c) => ANCHORS[c]?.name || c)
                  .join(', ');

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#00355f] border border-blue-100">
                          {topNames}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {item.desiredJob}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.userName ? `${item.userName}님 · ` : ''}{dateStr}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onSelectResult(item);
                          onClose();
                        }}
                        className="px-3.5 py-2 bg-[#00355f] hover:bg-[#0f4c81] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>리포트 보기</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteResult(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
