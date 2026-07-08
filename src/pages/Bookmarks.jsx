import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
};

export default function Bookmarks({ bookmarks, setBookmarks }) {
  // Fetch real saved jobs from mockJobs database
  const savedJobs = mockJobs.filter((job) => bookmarks.includes(job.id));

  const handleBookmarkToggle = (id) => {
    setBookmarks(bookmarks.filter((bId) => bId !== id));
  };

  return (
    <motion.div 
      className="flex-1 bg-slate-50/50 dark:bg-dark-bg/20 py-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              Your Bookmarked Jobs
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
              Track and review positions you have saved for application.
            </p>
          </div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold text-sm">
            {savedJobs.length}
          </span>
        </div>

        {savedJobs.length === 0 ? (
          /* Premium Empty State */
          <div className="glass-panel rounded-3xl p-12 text-center border-dashed border-2 border-slate-200 dark:border-slate-800">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-6">
              <Bookmark className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-display">No saved jobs</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto text-sm font-light leading-relaxed">
              Explore open positions in our listing engine and click the bookmark icon on any job card to save them here for quick application.
            </p>
            <Link 
              to="/" 
              className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md shadow-brand-500/10 hover:shadow-brand-500/20"
            >
              Browse Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={true}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
