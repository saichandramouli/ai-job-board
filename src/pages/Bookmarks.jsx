import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);

  // Fetch real saved jobs from mockJobs database
  const savedJobs = mockJobs.filter((job) => bookmarks.includes(job.id));

  const handleBookmarkToggle = (id) => {
    setBookmarks(bookmarks.filter((bId) => bId !== id));
  };

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
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Browse Jobs
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
    </div>
  );
}
