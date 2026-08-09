export type AnchorCode = 'TF' | 'GM' | 'AU' | 'SE' | 'EC' | 'SV' | 'CH' | 'LS';

export interface AnchorDetail {
  code: AnchorCode;
  name: string;
  name_en: string;
  tagline: string;
  description: string;
  coreMotivation: string;
  avoidEnvironment: string;
  color: string;
  questions: number[];
}

export interface Question {
  id: number;
  text: string;
  anchor: AnchorCode;
}

export type ScoreMap = Record<AnchorCode, number>;

export interface AICareerReport {
  summaryHeadline: string;
  jobFitAnalysis: string;
  trackA: {
    title: string;
    path: string;
    description: string;
  };
  trackB: {
    title: string;
    path: string;
    description: string;
  };
  precautions: string;
  interviewTips?: {
    keywords: string[];
    pitchStatement: string;
  };
}

export interface AssessmentResult {
  id: string;
  createdAt: string;
  userName?: string;
  desiredJob: string;
  answers: Record<number, number>; // questionId -> 1..4
  scores: ScoreMap;
  topAnchors: AnchorCode[];
  aiReport?: AICareerReport;
}

export type ViewState = 'intro' | 'assessment' | 'job_input' | 'results';
