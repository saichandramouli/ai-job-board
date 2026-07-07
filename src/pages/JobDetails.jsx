import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, DollarSign, Calendar, Bookmark, Award, Send } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';

export default function JobDetails() {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id) || mockJobs[0]; // fallback to first job

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

        {/* Header Panel */}
        <div className="glass-panel rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-brand-500/10 to-indigo-500/0 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-bold shadow-md ${job.logoBg}`}>
                {job.logo}
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                  {job.title}
                </h1>
                <p className="text-lg text-brand-600 dark:text-brand-400 font-semibold mt-1">
                  {job.company}
                </p>
                
                {/* Meta list */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Posted {job.postedAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-dark-border dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer">
                <Bookmark className="h-4 w-4" />
                Bookmark
              </button>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold shadow-sm shadow-brand-600/10 transition-colors cursor-pointer">
                Apply Now
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Role Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Key Requirements
              </h2>
              <ul className="space-y-3.5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">
                Benefits & Perks
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Award className="h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 font-light leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                Employment Summary
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Department</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Engineering & AI</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Experience Level</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.experience}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                  <span className="text-slate-400 dark:text-slate-500">Location Strategy</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Hybrid / Remote options</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400 dark:text-slate-500">Employment Type</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.type}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 bg-gradient-to-tr from-brand-600 to-indigo-600 text-white border-none shadow-lg shadow-brand-500/25">
              <h3 className="font-display font-bold text-xl mb-2">
                Need guidance?
              </h3>
              <p className="text-brand-100 text-sm leading-relaxed mb-6 font-light">
                Our agent matching system can optimize your resume and prepare your application for top labs.
              </p>
              <button className="w-full rounded-xl bg-white hover:bg-slate-50 text-brand-600 py-3 text-sm font-semibold transition-all cursor-pointer">
                Consult AI Co-pilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
