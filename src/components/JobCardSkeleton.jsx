import React from 'react';

export default function JobCardSkeleton() {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse">
      <div className="flex items-start gap-4 w-full md:w-auto">
        {/* Logo box */}
        <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
        
        <div className="space-y-3 w-full md:w-60">
          {/* Job Title and Type Badges */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          {/* Company */}
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          
          {/* Meta details */}
          <div className="flex gap-4">
            <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-850" />
            <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-850" />
            <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-850" />
          </div>
        </div>
      </div>

      {/* Tags and Action */}
      <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-center gap-4 border-t border-slate-100 dark:border-slate-800/50 pt-4 md:border-none md:pt-0 w-full md:w-auto">
        {/* Tags */}
        <div className="flex gap-1.5">
          <div className="h-5 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-14 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 md:mt-0">
          <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-slate-800 flex-1 sm:flex-none" />
        </div>
      </div>
    </div>
  );
}
