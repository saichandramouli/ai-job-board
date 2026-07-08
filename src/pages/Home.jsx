import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, ArrowRight, Cpu, Server, Bot, Eye, Sparkles, 
  Filter, Briefcase, X, SlidersHorizontal, DollarSign, Calendar
} from 'lucide-react';
import { mockJobs } from '../data/mockJobs';
import JobCard from '../components/JobCard';
import JobCardSkeleton from '../components/JobCardSkeleton';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Popular categories list with icons
const categories = [
  { id: 'llms', name: 'LLMs & GenAI', count: 184, icon: Cpu, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30' },
  { id: 'systems', name: 'AI Systems & CUDA', count: 92, icon: Server, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 'agents', name: 'AI Agents & RAG', count: 120, icon: Bot, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' },
  { id: 'vision', name: 'Computer Vision', count: 64, icon: Eye, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
};

// Helper to parse minimum yearly salary
const getMinSalary = (salaryStr) => {
  if (!salaryStr) return 0;
  if (salaryStr.includes('/ hr')) {
    const match = salaryStr.match(/\$(\d+)/);
    if (match) {
      const hourly = parseInt(match[1], 10);
      return hourly * 2000;
    }
  }
  const match = salaryStr.replace(/,/g, '').match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Helper to parse location strategy
const getLocationStrategy = (locationStr) => {
  const lower = locationStr.toLowerCase();
  if (lower.includes('remote')) return 'remote';
  if (lower.includes('hybrid')) return 'hybrid';
  return 'onsite';
};

export default function Home({ bookmarks, setBookmarks }) {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Advanced Filter states
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [minSalary, setMinSalary] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Simulate sub-filter loading for premium feel
  const triggerSubLoading = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  // Toggle bookmark callback
  const handleBookmarkToggle = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bId => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Toggle filter helper
  const handleFilterToggle = (value, list, setList) => {
    triggerSubLoading();
    if (list.includes(value)) {
      setList(list.filter(v => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Reset all filters
  const handleResetAll = () => {
    triggerSubLoading();
    setSearch('');
    setLocationFilter('');
    setSelectedStrategies([]);
    setSelectedTypes([]);
    setSelectedExperience([]);
    setMinSalary(0);
  };

  // Check if any advanced filters are active
  const hasActiveFilters = 
    search || 
    locationFilter || 
    selectedStrategies.length > 0 || 
    selectedTypes.length > 0 || 
    selectedExperience.length > 0 || 
    minSalary > 0;

  // Filter helper
  const filterJob = (j) => {
    const matchesSearch = !search || 
                          j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.company.toLowerCase().includes(search.toLowerCase()) ||
                          j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesLoc = !locationFilter || 
                        j.location.toLowerCase().includes(locationFilter.toLowerCase());

    const strategy = getLocationStrategy(j.location);
    const matchesStrategy = selectedStrategies.length === 0 || selectedStrategies.includes(strategy);

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(j.type);

    const matchesExperience = selectedExperience.length === 0 || selectedExperience.some(exp => 
      j.experience.toLowerCase().includes(exp.toLowerCase())
    );

    const jobMinSalary = getMinSalary(j.salary);
    const matchesSalary = minSalary === 0 || jobMinSalary >= minSalary;

    return matchesSearch && matchesLoc && matchesStrategy && matchesType && matchesExperience && matchesSalary;
  };

  // Filter logic for jobs
  const featuredJobs = mockJobs.filter(j => j.featured && filterJob(j));
  const latestJobs = mockJobs.filter(j => filterJob(j));

  // Shared filters sidebar content
  const FiltersSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-brand-600 dark:text-brand-400" />
          Filter Positions
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={handleResetAll}
            className="text-xs font-semibold text-brand-600 hover:text-brand-500 cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Workplace Strategy */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-3">
          Workplace Strategy
        </h4>
        <div className="space-y-2.5">
          {['Remote', 'Hybrid', 'Onsite'].map((strategy) => {
            const val = strategy.toLowerCase();
            const checked = selectedStrategies.includes(val);
            return (
              <label key={strategy} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-350 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFilterToggle(val, selectedStrategies, setSelectedStrategies)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 h-4.5 w-4.5 cursor-pointer transition-colors"
                />
                <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {strategy}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-3">
          Job Type
        </h4>
        <div className="space-y-2.5">
          {['Full-time', 'Contract'].map((type) => {
            const checked = selectedTypes.includes(type);
            return (
              <label key={type} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-350 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFilterToggle(type, selectedTypes, setSelectedTypes)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 h-4.5 w-4.5 cursor-pointer transition-colors"
                />
                <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-3">
          Experience Level
        </h4>
        <div className="space-y-2.5">
          {['Senior', 'Staff', 'Mid'].map((exp) => {
            const checked = selectedExperience.includes(exp);
            return (
              <label key={exp} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-350 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFilterToggle(exp, selectedExperience, setSelectedExperience)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 h-4.5 w-4.5 cursor-pointer transition-colors"
                />
                <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {exp} {exp === 'Senior' ? '& Above' : ''}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Salary Range */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider mb-3">
          Minimum Salary (Yearly)
        </h4>
        <div className="space-y-2.5">
          {[0, 120000, 150000, 180000].map((val) => {
            const labelStr = val === 0 ? 'Any Salary' : `$${(val / 1000)}k+`;
            return (
              <label key={val} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-350 cursor-pointer group">
                <input
                  type="radio"
                  name="salary"
                  checked={minSalary === val}
                  onChange={() => {
                    triggerSubLoading();
                    setMinSalary(val);
                  }}
                  className="border-slate-300 text-brand-600 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 h-4.5 w-4.5 cursor-pointer transition-colors"
                />
                <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {labelStr}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      className="flex-1 bg-slate-50/30 dark:bg-dark-bg/10 pb-20"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-500/10 via-transparent to-transparent">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 px-4 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-6 border border-brand-200/30 dark:border-brand-800/30">
              <Sparkles className="h-3 w-3 animate-pulse" />
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
                  onChange={(e) => {
                    triggerSubLoading();
                    setSearch(e.target.value);
                  }}
                />
                {search && (
                  <button 
                    onClick={() => {
                      triggerSubLoading();
                      setSearch('');
                    }}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center w-full md:w-60 px-3 py-2 md:py-0">
                <MapPin className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Location or 'Remote'..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
                  value={locationFilter}
                  onChange={(e) => {
                    triggerSubLoading();
                    setLocationFilter(e.target.value);
                  }}
                />
                {locationFilter && (
                  <button 
                    onClick={() => {
                      triggerSubLoading();
                      setLocationFilter('');
                    }}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
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
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-light">
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
                onClick={() => {
                  triggerSubLoading();
                  setSearch(cat.name.split(' ')[0]);
                }}
                className="glass-panel glass-panel-hover rounded-2xl p-6 cursor-pointer flex items-center gap-4 group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${cat.color}`}>
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

      {/* Main Jobs & Filters Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Filters bar on Mobile viewports */}
        <div className="flex lg:hidden items-center justify-between mb-6">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-dark-border dark:bg-dark-card dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters & Parameters
          </button>

          {hasActiveFilters && (
            <button 
              onClick={handleResetAll}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filters Sidebar (pinned left) */}
          <div className="hidden lg:block lg:col-span-1 glass-panel rounded-3xl p-6 sticky top-20">
            <FiltersSidebar />
          </div>

          {/* Jobs Listing Stack (middle & right columns) */}
          <div className="lg:col-span-3 space-y-12">
            
            {isLoading ? (
              /* Loading Skeletons stack view */
              <div className="space-y-4">
                <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-6" />
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
              </div>
            ) : (
              <>
                {/* Featured Jobs Section */}
                {featuredJobs.length > 0 && (
                  <div>
                    <div className="flex items-end justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                          Featured Opportunities
                        </h2>
                      </div>
                      <span className="text-xs text-slate-450 dark:text-slate-500 uppercase tracking-widest font-semibold">
                        {featuredJobs.length} roles found
                      </span>
                    </div>

                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      key={`featured-${featuredJobs.length}`}
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
                  </div>
                )}

                {/* Latest Jobs Section */}
                <div>
                  <div className="border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                        Latest Openings
                      </h2>
                    </div>
                    <div className="text-xs text-slate-450 dark:text-slate-500 font-semibold">
                      {latestJobs.length} matches found
                    </div>
                  </div>

                  {latestJobs.length === 0 ? (
                    <div className="glass-panel rounded-3xl p-12 text-center border-dashed border-2 border-slate-200 dark:border-slate-800">
                      <Briefcase className="mx-auto h-12 w-12 text-slate-355 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white font-display">No matches found</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto text-sm font-light leading-relaxed">
                        We couldn't find any job listings matching your query. Try clearing filters to explore all roles.
                      </p>
                      <button
                        onClick={handleResetAll}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 text-sm font-semibold transition-colors duration-205 cursor-pointer shadow-md shadow-brand-550/10"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      key={`latest-${latestJobs.length}`}
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
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* Mobile Drawer Slide-over Filter Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white dark:bg-dark-card p-6 shadow-2xl overflow-y-auto border-l border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-display font-bold text-lg dark:text-white">Filters</span>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-850 dark:text-slate-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <FiltersSidebar />

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full rounded-xl bg-brand-600 hover:bg-brand-500 text-white py-3 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Apply & Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
