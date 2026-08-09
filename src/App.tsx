import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { IntroScreen } from './components/IntroScreen';
import { AssessmentScreen } from './components/AssessmentScreen';
import { JobInputModal } from './components/JobInputModal';
import { ResultsScreen } from './components/ResultsScreen';
import { AboutModal } from './components/AboutModal';
import { SavedHistoryModal } from './components/SavedHistoryModal';
import { calculateScores, getTopAnchors, ANCHORS } from './data/careerAnchorData';
import { ViewState, AssessmentResult, AICareerReport } from './types';

const STORAGE_KEY = 'anchor_point_saved_results_v1';

export default function App() {
  const [view, setView] = useState<ViewState>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [desiredJob, setDesiredJob] = useState('');
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [savedResults, setSavedResults] = useState<AssessmentResult[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Modals
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSavedHistoryOpen, setIsSavedHistoryOpen] = useState(false);

  // Load saved history from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedResults(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Failed to load saved history:', e);
    }
  }, []);

  // Sync saved history to localStorage
  const saveResultsToStorage = (list: AssessmentResult[]) => {
    setSavedResults(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleAnswerQuestion = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleResetAssessment = () => {
    setAnswers({});
    setCurrentResult(null);
    setView('intro');
  };

  // Called when 40 questions are completed
  const handleAssessmentCompleted = () => {
    setView('job_input');
  };

  // Called when desired job title is submitted in JobInputModal
  const handleJobSubmitted = async (jobTitle: string) => {
    setIsLoadingAI(true);
    setDesiredJob(jobTitle);

    const scores = calculateScores(answers);
    const topAnchors = getTopAnchors(scores);

    const anchorDetails = topAnchors.map((code) => ANCHORS[code]);

    let aiReport: AICareerReport | undefined;

    try {
      const response = await fetch('/api/analyze-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topAnchors,
          scores,
          desiredJob: jobTitle,
          anchorDetails,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.report) {
          aiReport = data.report;
        }
      }
    } catch (err) {
      console.error('Failed to fetch AI report:', err);
    }

    const newResult: AssessmentResult = {
      id: 'res_' + Date.now(),
      createdAt: new Date().toISOString(),
      desiredJob: jobTitle,
      answers,
      scores,
      topAnchors,
      aiReport,
    };

    setCurrentResult(newResult);
    setIsLoadingAI(false);
    setView('results');
  };

  // Save current result into history
  const handleSaveToHistory = (userName?: string) => {
    if (!currentResult) return;
    const updated = { ...currentResult, userName };

    // Check if already in list
    const exists = savedResults.some((item) => item.id === updated.id);
    let newList: AssessmentResult[];
    if (exists) {
      newList = savedResults.map((item) => (item.id === updated.id ? updated : item));
    } else {
      newList = [updated, ...savedResults];
    }

    setCurrentResult(updated);
    saveResultsToStorage(newList);
  };

  const handleDeleteHistoryItem = (id: string) => {
    const newList = savedResults.filter((item) => item.id !== id);
    saveResultsToStorage(newList);
  };

  const handleClearAllHistory = () => {
    if (window.confirm('저장된 전체 진단 기록을 삭제하시겠습니까?')) {
      saveResultsToStorage([]);
    }
  };

  const handleSelectHistoryItem = (item: AssessmentResult) => {
    setCurrentResult(item);
    setAnswers(item.answers);
    setDesiredJob(item.desiredJob);
    setView('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      {/* Navbar */}
      <Navbar
        currentView={view}
        onNavigate={(v) => {
          if (v === 'assessment' && Object.keys(answers).length === 0) {
            setView('assessment');
          } else {
            setView(v);
          }
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSavedHistory={() => setIsSavedHistoryOpen(true)}
        savedCount={savedResults.length}
      />

      {/* Main Content Area based on ViewState */}
      <div className="flex-1">
        {view === 'intro' && (
          <IntroScreen
            onStart={() => setView('assessment')}
            onOpenAbout={() => setIsAboutOpen(true)}
          />
        )}

        {view === 'assessment' && (
          <AssessmentScreen
            answers={answers}
            onAnswer={handleAnswerQuestion}
            onComplete={handleAssessmentCompleted}
            onReset={handleResetAssessment}
          />
        )}

        {view === 'job_input' && (
          <JobInputModal
            onSubmit={handleJobSubmitted}
            isLoading={isLoadingAI}
          />
        )}

        {view === 'results' && currentResult && (
          <ResultsScreen
            result={currentResult}
            onRestart={handleResetAssessment}
            onSaveToHistory={handleSaveToHistory}
            isAlreadySaved={savedResults.some((r) => r.id === currentResult.id)}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* About Edgar Schein Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Saved Reports History Modal */}
      <SavedHistoryModal
        isOpen={isSavedHistoryOpen}
        onClose={() => setIsSavedHistoryOpen(false)}
        savedResults={savedResults}
        onSelectResult={handleSelectHistoryItem}
        onDeleteResult={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}
