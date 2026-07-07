import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Cpu, Server, Bot, Eye, Sparkles, Filter, Briefcase } from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Popular categories list with icons
const categories = [
  { id: 'llms', name: 'LLMs & GenAI', count: 184, icon: Cpu, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30' },
  { id: 'systems', name: 'AI Systems & CUDA', count: 92, icon: Server, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 'agents', name: 'AI Agents & RAG', count: 120, icon: Bot, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' },
  { id: 'vision', name: 'Computer Vision', count: 64, icon: Eye, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30' },
];

// Motion animation variations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);

  // Toggle bookmark callback
  const handleBookmarkToggle = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Filter logic for jobs
  const featuredJobs = mockJobs.filter(j => j.featured);
  const latestJobs = mockJobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.company.toLowerCase().includes(search.toLowerCase()) ||
                          j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesLoc = j.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLoc;
  });

  return (
    <div className="flex-1 bg-slate-50/30 dark:bg-dark-bg/10 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-500/10 via-transparent to-transparent">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-6 border border-brand-200/30 dark:border-brand-800/30">
              <Sparkles className="h-3 w-3" />
              The AI & Systems Job Engine
            </span>
          </motion.div>

          <motion.h1 
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Deploy Your Talents at the <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Bleeding Edge of AI
            </span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover top-tier positions at the world's leading artificial intelligence laboratories, infrastructure developers, and agent design studios.
          </motion.p>

          {/* Interactive Search Bar Section */}
          <motion.div 
            className="mx-auto mt-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border shadow-lg shadow-slate-100/50 dark:shadow-none focus-within:ring-4 focus-within:ring-brand-500/10 transition-all duration-300">
              <div className="flex items-center flex-1 px-3 py-2 md:py-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/80">
                <Search className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Role, skills (e.g. PyTorch, CUDA, RAG)..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center w-full md:w-60 px-3 py-2 md:py-0">
                <MapPin className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Location or 'Remote'..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <button className="rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-7 py-3 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-brand-500/10">
                Find Roles
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
            Popular Specializations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explore dedicated hubs for specific machine learning sub-fields.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                onClick={() => setSearch(cat.name.split(' ')[0])}
                className="glass-panel glass-panel-hover rounded-2xl p-6 cursor-pointer flex items-center gap-4 group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {cat.count} roles open
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Featured Jobs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Featured Opportunities
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top-tier roles offering industry-leading compensation and packages.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider">
            Verified Labs Only
          </span>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isFeatured={true}
              isBookmarked={bookmarks.includes(job.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </motion.div>
      </section>

      {/* Latest Jobs Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Latest Listings
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Freshly indexed postings for AI engineers and developers.
            </p>
          </div>
          
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-dark-card shadow-sm">
              <Filter className="h-3.5 w-3.5" />
              Sort: Recent
            </span>
          </div>
        </div>

        {/* Latest jobs stack list */}
        {latestJobs.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No jobs found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto text-sm font-light">
              We couldn't find any job match for your current query. Try adjusting filters or search term.
            </p>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {latestJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isBookmarked={bookmarks.includes(job.id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
