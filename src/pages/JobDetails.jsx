import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, MapPin, DollarSign, Calendar, Bookmark, Award, 
  Send, Sparkles, Building2, Briefcase, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function JobDetails() {
  const { id } = useParams();
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
  const [applied, setApplied] = useState(false);

  // Find job, default to first job if not found
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <h2 className="text-xl font-bold mb-4">Job Listing Not Found</h2>
        <Link to="/" className="text-brand-600 hover:underline">Return to listings</Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(job.id);

  // Toggle bookmark callback
  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(bId => bId !== job.id));
    } else {
      setBookmarks([...bookmarks, job.id]);
    }
  };

  // Recommendation engine: matching tags, fall back to other jobs if none share tags
  let similarJobs = mockJobs.filter(
    (j) => j.id !== job.id && j.tags.some(tag => job.tags.includes(tag))
  );
  if (similarJobs.length === 0) {
    similarJobs = mockJobs.filter((j) => j.id !== job.id).slice(0, 2);
  }

  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-dark-bg/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to listings
        </Link>

        {/* Hero Banner Card */}
        <motion.div 
          className="glass-panel rounded-3xl p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-brand-500/10 to-indigo-500/0 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold shadow-md ${job.logoBg}`}>
                {job.logo}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                    {job.title}
                  </h1>
                  {job.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 dark:bg-brand-950/40 px-2.5 py-0.5 text-[10px] font-semibold text-brand-600 dark:text-brand-400 border border-brand-200/20">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-lg text-brand-600 dark:text-brand-400 font-semibold mt-1">
                  {job.company}
                </p>
                
                {/* Meta list */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Posted {job.postedAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={handleBookmarkToggle}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border transition-colors px-4 py-2.5 text-sm font-semibold cursor-pointer ${
                  isBookmarked 
                    ? 'border-brand-500 bg-brand-50/50 text-brand-600 dark:bg-brand-950/20 dark:text-brand-400' 
                    : 'border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl text-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors cursor-pointer ${
                  applied 
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10' 
                    : 'bg-brand-600 hover:bg-brand-500 shadow-brand-600/10'
                }`}
              >
                {applied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Applied
                  </>
                ) : (
                  <>
                    Apply Now
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Detailed Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main specifications details (left column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Role Overview / Description */}
            <motion.div 
              className="glass-panel rounded-3xl p-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Role Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {job.description}
              </p>
            </motion.div>

            {/* Responsibilities */}
            {job.responsibilities && (
              <motion.div 
                className="glass-panel rounded-3xl p-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  Key Responsibilities
                </h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-400 mt-2 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Required Skills (Requirements) */}
            <motion.div 
              className="glass-panel rounded-3xl p-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Requirements & Required Skills
              </h2>
              
              <ul className="space-y-3.5 mb-6">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tags list representation */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Benefits & Perks */}
            <motion.div 
              className="glass-panel rounded-3xl p-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                Benefits & Perks
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 font-light leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right sidebar info */}
          <div className="space-y-6">
            
            {/* Company Information Card */}
            <motion.div 
              className="glass-panel rounded-3xl p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="h-4.5 w-4.5 text-brand-600 dark:text-brand-400" />
                Company Profile
              </h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl font-bold ${job.logoBg}`}>
                  {job.logo}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{job.company}</h4>
                  <span className="text-xs text-slate-400">GenAI Innovation Lab</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-4">
                {job.companyDescription || `${job.company} is a leading machine learning enterprise designing foundational algorithms.`}
              </p>

              <a 
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
              >
                Visit website
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Employment Summary sidebar */}
            <motion.div 
              className="glass-panel rounded-3xl p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                Role Summary
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Department</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">AI Engineering</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Experience Level</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.experience}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Location Strategy</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Hybrid / Remote</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400 dark:text-slate-500">Employment Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.type}</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Similar Jobs recommendation widget */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800/80 pt-12">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-8">
            Similar Opportunities
          </h2>
          
          <div className="space-y-4">
            {similarJobs.map((similarJob) => (
              <JobCard
                key={similarJob.id}
                job={similarJob}
                isBookmarked={bookmarks.includes(similarJob.id)}
                onBookmarkToggle={() => {
                  if (bookmarks.includes(similarJob.id)) {
                    setBookmarks(bookmarks.filter(bId => bId !== similarJob.id));
                  } else {
                    setBookmarks([...bookmarks, similarJob.id]);
                  }
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
