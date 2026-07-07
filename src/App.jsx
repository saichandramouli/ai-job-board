import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* Navbar */}
        <Navbar />

        {/* Main content route views */}
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
