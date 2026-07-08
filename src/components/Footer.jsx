import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Globe, Share2, Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-dark-bg/40 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Future<span className="text-brand-500">Align</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Discover and apply to premier opportunities in Artificial Intelligence, Machine Learning, and GenAI systems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                <Link2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Candidates
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400">
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookmarks" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400">
                      Saved Roles
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-8 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                  Employers
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400">
                      Pricing Plans
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider font-display">
                Subscribe to AI alerts
              </h3>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Get weekly updates on the newest AI agent and systems roles.
              </p>
              <form className="mt-4 flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-950 placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white focus:outline-none focus:ring-4"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200/50 pt-8 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} FutureAlign Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-slate-500">Privacy Policy</a>
            <a href="#" className="hover:text-slate-500">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
