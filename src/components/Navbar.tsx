import React, { useState } from 'react';
import { Compass, Bookmark, Info, HelpCircle, Menu, X, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenAbout: () => void;
  onOpenSavedHistory: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAbout,
  onOpenSavedHistory,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('intro')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          id="nav-logo-btn"
        >
          <div className="w-9 h-9 rounded-xl bg-[#00355f] text-white flex items-center justify-center shadow-xs group-hover:bg-[#0f4c81] transition-colors">
            <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </div>
          <span className="font-bold text-xl text-[#00355f] tracking-tight font-sans">
            Anchor Point
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate('intro')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              currentView === 'intro'
                ? 'text-[#00355f] bg-slate-100/80 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            id="nav-home-btn"
          >
            Home
          </button>

          <button
            onClick={onOpenAbout}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            id="nav-about-btn"
          >
            <Info className="w-4 h-4 text-slate-400" />
            About
          </button>

          <button
            onClick={() => onNavigate('assessment')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
              currentView === 'assessment' || currentView === 'job_input'
                ? 'text-[#00355f] bg-slate-100/80 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            id="nav-assessment-btn"
          >
            Assessment
            {(currentView === 'assessment' || currentView === 'job_input') && (
              <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#00355f] rounded-full" />
            )}
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#00355f] hover:bg-[#0f4c81] rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            id="nav-start-btn"
          >
            Start Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle Menu"
          id="nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top duration-150">
          <button
            onClick={() => {
              onNavigate('intro');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            About 커리어 앵커란?
          </button>
          <button
            onClick={() => {
              onNavigate('assessment');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Assessment (진단 시작)
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                onNavigate('assessment');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#00355f] text-white font-semibold text-sm rounded-lg text-center"
            >
              Start Free (진단하기)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
