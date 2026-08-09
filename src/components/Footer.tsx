import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white/50 py-8 text-xs text-slate-500">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="font-sans">
          © 2026 Anchor Point. Professional Career Diagnostic Services.
        </p>

        <div className="flex items-center gap-6 text-slate-500">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-800 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-800 transition-colors">
            Terms of Service
          </a>
          <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-slate-800 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};
