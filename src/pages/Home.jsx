import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Calendar, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-dark-bg/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 text-center sm:px-6 lg:px-8 border-b border-slate-200/40 dark:border-slate-800/40 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-950/40 dark:text-brand-400 mb-6">
            ✨ Initializing Structure for AI Jobs
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
            Find the Next Frontier in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">AI & Systems Engineering</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            The premier platform connecting senior machine learning researchers, systems designers, and agent architects with forward-thinking laboratories.
          </p>

          {/* Dummy Search bar container */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-md focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all duration-300">
              <div className="flex items-center flex-1 px-3">
                <Search className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search titles, skills, or companies..."
                  className="w-full bg-transparent text-slate-950 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Jobs List */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white font-display">
              Latest Openings
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Showing mock listings for the initial structural design.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400">
              Active Filters: None
            </span>
          </div>
        </div>

        {/* Jobs cards stack */}
        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div 
              key={job.id} 
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl font-bold shadow-sm ${job.logoBg}`}>
                  {job.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-1">
                    {job.company}
                  </p>
                  
                  {/* Meta items */}
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {job.postedAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags and Action */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-center gap-4 border-t border-slate-100 dark:border-slate-800/50 pt-4 md:border-none md:pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-slate-400 hover:text-slate-500 transition-colors cursor-pointer"
                    title="Bookmark Role"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <Link 
                    to={`/jobs/${job.id}`} 
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-950/40 text-brand-600 dark:text-brand-400 px-4 py-2 text-sm font-semibold transition-all"
                  >
                    Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
