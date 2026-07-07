import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, DollarSign, Calendar, ArrowRight, Bookmark, 
  Cpu, Server, Bot, Eye, Sparkles, Filter, Briefcase
} from 'lucide-react';
import { mockJobs } from '../data/mockJobs';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
                variants={itemVariants}
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
            <motion.div
              key={job.id}
              variants={itemVariants}
              className="glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden border-brand-200/50 dark:border-brand-900/30 bg-gradient-to-tr from-white via-white to-brand-50/20 dark:from-dark-card dark:via-dark-card dark:to-brand-950/10"
            >
              {/* Featured Badge */}
              <div className="absolute top-4 right-4 bg-brand-600 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
                Featured
              </div>

              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-md ${job.logoBg}`}>
                  {job.logo}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                    {job.company}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-light leading-relaxed">
                {job.description}
              </p>

              {/* Meta information tags */}
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                  {job.salary}
                </span>
              </div>

              {/* Tags & Action row */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  Apply Role
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
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
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-bold shadow-sm ${job.logoBg}`}>
                    {job.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                        {job.title}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-850 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                      {job.company}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
