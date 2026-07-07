import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-dark-bg/80 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition-transform duration-300 group-hover:scale-105">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Future<span className="text-brand-500">Align</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-brand-600 bg-brand-50/50 dark:text-brand-400 dark:bg-brand-950/20' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Explore Jobs
            </Link>
            <Link
              to="/bookmarks"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/bookmarks') 
                  ? 'text-brand-600 bg-brand-50/50 dark:text-brand-400 dark:bg-brand-950/20' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              Bookmarks
            </Link>
            
            <span className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

            <button 
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            >
              Post a Job
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-dark-bg px-4 py-3 space-y-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium ${
              isActive('/')
                ? 'text-brand-600 bg-brand-50 dark:text-brand-400 dark:bg-brand-950/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            Explore Jobs
          </Link>
          <Link
            to="/bookmarks"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium ${
              isActive('/bookmarks')
                ? 'text-brand-600 bg-brand-50 dark:text-brand-400 dark:bg-brand-950/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Bookmark className="h-5 w-5" />
            Bookmarks
          </Link>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center block rounded-xl bg-slate-900 py-2.5 text-base font-semibold text-white shadow-sm dark:bg-white dark:text-slate-900"
            >
              Post a Job
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
