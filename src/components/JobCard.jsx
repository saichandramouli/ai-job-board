import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, ArrowRight, Bookmark } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function JobCard({ 
  job, 
  isFeatured = false, 
  isBookmarked = false, 
  onBookmarkToggle 
}) {
  const {
    id,
    title,
    company,
    logo,
    logoBg,
    location,
    type,
    salary,
    postedAt,
    experience,
    description,
    tags
  } = job;

  // Render featured card style
  if (isFeatured) {
    return (
      <motion.div
        variants={cardVariants}
        className="glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden border-brand-200/50 dark:border-brand-900/30 bg-gradient-to-tr from-white via-white to-brand-50/20 dark:from-dark-card dark:via-dark-card dark:to-brand-950/10"
      >
        <div className="absolute top-4 right-4 bg-brand-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
          Featured
        </div>

        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-md ${logoBg}`}>
            {logo}
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
              {company}
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-light leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-slate-400" />
            {salary}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
            {experience}
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 2).map((t, idx) => (
              <span key={idx} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (onBookmarkToggle) onBookmarkToggle(id);
              }}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'border-brand-500 bg-brand-50/50 text-brand-600 dark:bg-brand-950/20 dark:text-brand-400' 
                  : 'border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-slate-400 hover:text-slate-500'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/jobs/${id}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              Apply Role
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Render standard list card style
  return (
    <motion.div
      variants={cardVariants}
      className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-bold shadow-sm ${logoBg}`}>
          {logo}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
              {title}
            </h3>
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">
              {type}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-400">
              {experience}
            </span>
          </div>
          <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
            {company}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              {salary}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {postedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-center gap-4 border-t border-slate-100 dark:border-slate-800/50 pt-4 md:border-none md:pt-0">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400 font-light">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (onBookmarkToggle) onBookmarkToggle(id);
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked 
                ? 'border-brand-500 bg-brand-50/50 text-brand-600 dark:bg-brand-950/20 dark:text-brand-400' 
                : 'border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-slate-400 hover:text-slate-500'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Role"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/jobs/${id}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-950/40 text-brand-600 dark:text-brand-400 px-4 py-2 text-sm font-semibold transition-all"
          >
            Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
