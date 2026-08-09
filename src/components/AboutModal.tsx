import React from 'react';
import { Anchor, X, Layers, CheckCircle2 } from 'lucide-react';
import { ANCHORS } from '../data/careerAnchorData';
import { AnchorCode } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2 text-[#00355f] font-bold text-xl">
            <Anchor className="w-6 h-6" />
            <span>에드가 샤인(Edgar Schein)의 커리어 앵커 가이드</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Concept Intro */}
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 text-sm leading-relaxed space-y-2">
          <p className="font-bold text-[#00355f] text-base">
            닻(Anchor)처럼 흔들리지 않는 8가지 커리어 가치관
          </p>
          <p>
            조직 심리학의 대가 에드가 샤인 교수가 정의한 '커리어 앵커(Career Anchor)'는 개인이 직업을 선택하거나
            이직, 승진, 커리어 전환 상황에서 결코 포기할 수 없는 자기 인식(Self-Concept)의 핵심입니다.
          </p>
          <p className="text-xs text-slate-500 pt-1">
            * 검사는 각 앵커당 5문항씩, 총 40문항(1~4점 척도)으로 구성되어 각 앵커별 최소 5점에서 최대 20점까지 산출됩니다.
          </p>
        </div>

        {/* 8 Anchors Grid */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            8가지 앵커 유형 상세 설명
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(ANCHORS) as AnchorCode[]).map((code) => {
              const item = ANCHORS[code];
              return (
                <div
                  key={code}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{item.name} ({item.name_en})</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal pt-1">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <div><span className="font-semibold text-slate-700">핵심 동기:</span> {item.coreMotivation}</div>
                    <div><span className="font-semibold text-slate-700">기피 환경:</span> {item.avoidEnvironment}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00355f] text-white font-bold text-sm rounded-xl hover:bg-[#0f4c81]"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
