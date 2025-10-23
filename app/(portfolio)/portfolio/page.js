'use client'
/*
  Next.js Portfolio Component (DARK MODE + ENHANCED)
  - Full dark theme conversion
  - Added "Scroll to Top" button
  - Added staggered animations for skills
  - Added hover animations for cards and buttons
  - Added gradient text for hero title
  - Assumes images like 'profile.png' are in the /public folder.
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Menu, X, ArrowUp } from 'lucide-react';
import Image from 'next/image';
// import Profile from '../images/profile.png' // Original
import Profile from '../images/profile.png' // Assuming profile.png is in /public
// import ContactForm from '../../components/ContactForm'; // Original
import '../global.css'
import CountUp from '../../components/CountUp';
import ContactForm from '../../components/ContactForm';


const projects = [
  {
    id: 1,
    title: 'Accounting Software',
    desc: 'Full-stack accounting software with Oracle forms and reports using PL/SQL.',
    tech: ['Oracle', 'PL/SQL', 'Oracle Forms', 'Oracle Reports'],
    link: '#',
    image: '/oracle.png' // Assumes in /public
  },
  {
    id: 2,
    title: 'GTA MOD STATION',
    desc: 'Created a website in react js for my client who sells GTA mods.',
    tech: ['Reactjs', 'Bootstrap', 'PHP Backend'],
    link: 'https://gtamodstation.com/',
    image: '/gtamodstation.png' // Assumes in /public
  },
  {
    id: 3,
    title: 'Internal Website for a company',
    desc: 'Created a website for internal use of a company and connected with the oracle software',
    tech: ['PHP', 'MySql', 'Bootstrap', 'Oracle Forms', 'Oracle Reports'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60'
  }
];

const skills = ['Full Stack Web-development', 'Tailwind CSS', 'Bootstrap', 'PHP', 'React.js', 'Next.js', 'Node.js', 'Oracle PL/SQL', 'MYSQL', 'Oracle Forms and Reports', 'DevOps'];

// --- ANIMATION VARIANTS ---
const sectionFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const skillsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const skillItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
// --- END VARIANTS ---


export default function PortfolioLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // --- FEATURE: Scroll to Top ---
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);
  // --- END FEATURE ---


  return (
    // Base: bg-slate-900, text-slate-100
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">

      {/* Header: Sticky, backdrop-blur */}
      <header className={`max-w-6xl mx-auto px-6 py-2 md:py-4 flex items-center justify-between sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 ${menuOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm">
            <Image
              src={Profile}
              alt="Muhammad Asad"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          <div className="">
            <h1 className="text-lg font-semibold text-slate-100">Muhammad Asad</h1>
            <p className="hidden sm:block text-sm text-slate-400">Software Engineer • Accounting Systems • Full-stack</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a href="#projects" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
          <a href="#skills" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">Skills</a>
          <a href="#contact" className="text-sm text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
          <a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 py-2 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-colors">
            <FileText size={16} /> Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile nav overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setMenuOpen(false)} />
        )}

        {/* Mobile nav panel: bg-slate-800 */}
        <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-slate-800 shadow-lg z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform border-l border-slate-700`}>
          <div className="p-4 bg-slate-800 min-h-screen">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image src={Profile} alt="Muhammad Asad" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-slate-100">Muhammad Asad</div>
                  <div className="text-xs text-slate-400">Full-stack & Accounting</div>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              <a onClick={() => setMenuOpen(false)} href="#projects" className="py-2 px-3 rounded text-slate-200 hover:bg-slate-700">Projects</a>
              <a onClick={() => setMenuOpen(false)} href="#skills" className="py-2 px-3 rounded text-slate-200 hover:bg-slate-700">Skills</a>
              <a onClick={() => setMenuOpen(false)} href="#contact" className="py-2 px-3 rounded text-slate-200 hover:bg-slate-700">Contact</a>
              <a onClick={() => setMenuOpen(false)} href="/resume.pdf" className="py-2 px-3 rounded border border-slate-700 inline-flex items-center gap-2 text-slate-200 hover:bg-slate-700"><FileText size={16} />Resume</a>
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-700 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <Mail size={16} /> <span>m.asad1856079@gmail.com</span>
              </div>
              <div className="mt-3 flex gap-3">
                <a href="https://github.com/flyquill/" aria-label="github" className="hover:text-blue-400"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" aria-label="linkedin" className="hover:text-blue-400"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <section className="grid md:grid-cols-2 gap-10 items-center py-12 md:py-20">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>

            {/* --- FEATURE: Gradient Text --- */}
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 py-2">
              I build reliable accounting & business tools that scale.
            </h2>
            <p className="mt-4 text-lg text-slate-400">I make enterprise-grade forms, reporting systems, and automation pipelines — bridging finance and engineering.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* --- ANIMATION: Button Hover --- */}
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let’s Talk
              </motion.a>
            </div>

            <div className="mt-8 flex gap-5 items-center text-slate-400">
              <a href="mailto:m.asad1856079@gmail.com" title="email" className="group inline-flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail size={18} /> <span className="text-sm group-hover:underline">m.asad1856079@gmail.com</span>
              </a>
              <a href="https://github.com/flyquill" title="github" className="hover:text-blue-400 transition-colors"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" title="linkedin" className="hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
            </div>
          </motion.div>

          {/* Hero Card: bg-slate-800 */}
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-slate-800 rounded-2xl p-4 md:p-6 border border-slate-700">
            <div className="relative overflow-hidden rounded-xl">
              <Image src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=900&q=60" alt="hero" width={1200} height={720} className="w-full h-56 md:h-72 object-cover rounded-xl" />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur rounded-lg px-4 py-2 text-sm font-medium">Available for freelance & full-time</div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400"><CountUp
                  from={0}
                  to={4}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />+</div>
                <div className="text-xs text-slate-400">Years exp</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400"><CountUp
                  from={0}
                  to={10}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />+</div>
                <div className="text-xs text-slate-400">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400"><CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={2}
                  className="count-up-text"
                />%</div>
                <div className="text-xs text-slate-400">Client satisfaction</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-16">
          <motion.h3 variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-3xl font-semibold">Highlighted Projects</motion.h3>
          <motion.p variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-slate-400 mt-2">Selected work that shows the range of what I deliver.</motion.p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <motion.a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: p.id * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -4px rgba(59, 130, 246, 0.1)" }}
                className="group block bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden transition-all hover:border-blue-500/30"
              >
                {/* --- FEATURE: Image Zoom on Hover --- */}
                <div className="h-44 w-full relative overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-slate-100">{p.title}</h4>
                  <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-700 text-slate-300">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16">
          <motion.h3 variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-3xl font-semibold">Skills & Tools</motion.h3>

          {/* --- ANIMATION: Staggered Skill Tags --- */}
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            variants={skillsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skills.map(s => (
              <motion.span
                key={s}
                className="px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:border-blue-500/50 hover:text-blue-400"
                variants={skillItemVariants}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="py-16">
          <motion.h3 variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-3xl font-semibold">Let's build something</motion.h3>
          <motion.p variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-slate-400 mt-2">Available for consulting, freelance, and full-time roles.</motion.p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form: Styled for dark mode */}
            <motion.div variants={sectionFadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <ContactForm />
            </motion.div>

            {/* Quick Contact Card: bg-slate-800 */}
            <motion.div
              variants={sectionFadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-semibold text-slate-100">Quick Contact</h4>
                <ul className="mt-4 text-slate-400 space-y-3">
                  <li className="flex items-center gap-3"><Mail size={16} /> <a href="mailto:m.asad1856079@gmail.com" className="hover:underline hover:text-blue-400"> m.asad1856079@gmail.com </a></li>
                  <li className="flex items-center gap-3"><Github size={16} /> <a href="https://github.com/flyquill" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-400">github.com/flyquill</a></li>
                  <li className="flex items-center gap-3"><Linkedin size={16} /> <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-400">linkedin.com/in/muhammad-asad</a></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-slate-500 border-t border-slate-800">
          © {new Date().getFullYear()} Muhammad Asad — Built with Next.js
        </footer>
      </main>

      {/* --- FEATURE: Scroll to Top Button --- */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollTop}
            className="fixed bottom-6 right-6 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}