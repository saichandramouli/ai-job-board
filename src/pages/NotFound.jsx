import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50/50 dark:bg-dark-bg/20 py-24 px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-12 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-6">
          <HelpCircle className="h-8 w-8" />
        </div>

        <h1 className="font-display font-black text-6xl text-slate-900 dark:text-white mb-2">
          404
        </h1>
        <h2 className="font-display font-bold text-xl text-slate-800 dark:text-slate-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed mb-8">
          The page you are looking for doesn't exist or has been relocated to another galaxy. Let's get you back on track.
        </p>

        <Link 
          to="/" 
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-3 text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore Jobs
        </Link>
      </div>
    </div>
  );
}
