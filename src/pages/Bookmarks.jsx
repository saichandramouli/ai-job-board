import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, DollarSign, ArrowRight, Trash2 } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';

export default function Bookmarks() {
  // Mocking bookmarked state for layout visualization (take first 2 items)
  const savedJobs = mockJobs.slice(0, 2);

  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-dark-bg/20 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              Your Bookmarked Jobs
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Track and review positions you have saved for application.
            </p>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold text-sm">
            {savedJobs.length}
          </span>
        </div>

        {savedJobs.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <Bookmark className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-display">No saved jobs</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto text-sm font-light">
              Explore open positions and click the bookmark button to save them here.
            </p>
            <Link 
              to="/" 
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <div 
                key={job.id} 
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-bold shadow-sm ${job.logoBg}`}>
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold">
                      {job.company}
                    </p>
                    
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/50">
                  <button 
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-rose-500 hover:text-rose-600 hover:border-rose-200 dark:hover:border-rose-950 transition-all cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <Link 
                    to={`/jobs/${job.id}`} 
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-950/40 text-brand-600 dark:text-brand-400 px-4 py-2.5 text-sm font-semibold transition-all"
                  >
                    View Role
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
