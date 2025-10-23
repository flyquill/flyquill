'use client'
/*
  Next.js Portfolio Component (single-file)
  - Drop this file into your Next.js app (app/page.jsx or pages/index.jsx)
  - Requires: Tailwind CSS, framer-motion, lucide-react

  Install (example):
    npm install framer-motion lucide-react

  Tailwind: https://tailwindcss.com/docs/guides/nextjs

  Notes:
  - Replace placeholder images/links with your real content.
  - If you're using the pages/ router, export as default from pages/index.jsx.
  - This file is intentionally self-contained for quick preview and iteration.
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Profile from '../images/profile.png'
import ContactForm from '../../components/ContactForm';
import '../global.css'

const projects = [
  {
    id: 1,
    title: 'Accounting Dashboard',
    desc: 'Full-stack accounting dashboard with Oracle backend, reports, and automation.',
    tech: ['React', 'Next.js', 'Oracle', 'cx_Oracle'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60'
  },
  {
    id: 2,
    title: 'Forms Builder (Oracle-like)',
    desc: 'Drag-and-drop form builder inspired by Oracle Forms for enterprise workflows.',
    tech: ['React', 'Tailwind', 'Canvas'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60'
  },
  {
    id: 3,
    title: 'Automated Video Pipeline',
    desc: 'n8n + AI pipeline for generating videos, subtitles, and TTS for YouTube Shorts.',
    tech: ['n8n', 'Node.js', 'AI APIs'],
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60'
  }
];

const skills = ['Full Stack Web-development', 'Tailwind CSS', 'PHP', 'React.js', 'Next.js', 'Node.js', 'Oracle PL/SQL', 'MYSQL', 'Oracle Forms and Reports', 'DevOps'];

export default function PortfolioLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-2 md:py-4 flex items-center justify-between sticky top-0 z-50 bg-gray-50 opacity-90">
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
            <h1 className="text-lg font-semibold">Muhammad Asad</h1>
            <p className="hidden sm:block text-sm text-slate-500">Software Engineer • Accounting Systems • Full-stack</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#skills" className="text-sm hover:underline">Skills</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
          <a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-slate-50">
            <FileText size={16} /> Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border hover:bg-slate-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile nav overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMenuOpen(false)} />
        )}

        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                  <Image src={Profile} alt="Muhammad Asad" fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold">Muhammad Asad</div>
                  <div className="text-xs text-slate-500">Full-stack & Accounting</div>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              <a onClick={() => setMenuOpen(false)} href="#projects" className="py-2 px-3 rounded hover:bg-slate-50">Projects</a>
              <a onClick={() => setMenuOpen(false)} href="#skills" className="py-2 px-3 rounded hover:bg-slate-50">Skills</a>
              <a onClick={() => setMenuOpen(false)} href="#contact" className="py-2 px-3 rounded hover:bg-slate-50">Contact</a>
              <a onClick={() => setMenuOpen(false)} href="/resume.pdf" className="py-2 px-3 rounded border inline-flex items-center gap-2"><FileText size={16} /> Resume</a>
            </nav>

            <div className="mt-6 pt-4 border-t text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Mail size={16} /> <span>m.asad1856079@gmail.com</span>
              </div>
              <div className="mt-3 flex gap-3">
                <a href="https://github.com/flyquill/" aria-label="github"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" aria-label="linkedin"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <section className="grid md:grid-cols-2 gap-8 items-center py-8">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">I build reliable accounting & business tools that scale.</h2>
            <p className="mt-4 text-slate-600">I make enterprise-grade forms, reporting systems, and automation pipelines — bridging finance and engineering.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white font-medium shadow hover:shadow-lg">View Projects</a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border text-sm">Let’s Talk</a>
            </div>

            <div className="mt-6 flex gap-4 items-center text-slate-600">
              <a href="mailto:m.asad1856079@gmail.com" title="email" className="group inline-flex items-center gap-2">
                <Mail size={18} /> <span className="text-sm group-hover:underline">m.asad1856079@gmail.com</span>
              </a>
              <a href="https://github.com/flyquill" title="github" className="inline-flex items-center gap-2"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" title="linkedin" className="inline-flex items-center gap-2"><Linkedin size={18} /></a>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="relative overflow-hidden rounded-xl">
              <Image src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=900&q=60" alt="hero" width={1200} height={720} className="w-full h-56 md:h-72 object-cover rounded-xl" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-4 py-2 text-sm">Available for freelance & full-time</div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold">4+</div>
                <div className="text-xs text-slate-500">Years exp</div>
              </div>
              <div>
                <div className="text-lg font-bold">10+</div>
                <div className="text-xs text-slate-500">Projects</div>
              </div>
              <div>
                <div className="text-lg font-bold">99.9%</div>
                <div className="text-xs text-slate-500">Client satisfaction</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-12">
          <h3 className="text-2xl font-semibold">Highlighted Projects</h3>
          <p className="text-slate-600 mt-2">Selected work that shows the range of what I deliver.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <motion.a key={p.id} href={p.link} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: p.id * 0.08 }} className="group block bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
                <div className="h-44 w-full relative">
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="mt-2 text-sm text-slate-500">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map(t => <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100">{t}</span>)}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="skills" className="py-12">
          <h3 className="text-2xl font-semibold">Skills & Tools</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {skills.map(s => (
              <span key={s} className="px-3 py-2 rounded-lg border text-sm">{s}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="py-12">
          <h3 className="text-2xl font-semibold">Let's build something</h3>
          <p className="text-slate-600 mt-2">Available for consulting, freelance, and full-time roles.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactForm />

            <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold">Quick Contact</h4>
                <ul className="mt-4 text-sm text-slate-600 space-y-2">
                  <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:m.asad1856079@gmail.com" className="hover:underline"> m.asad1856079@gmail.com </a></li>
                  <li className="flex items-center gap-2"><Github size={16} /> <a href="https://github.com/flyquill" className="hover:underline">github.com/flyquill</a></li>
                  <li className="flex items-center gap-2"><Linkedin size={16} /> <a href="https://www.linkedin.com/in/muhammad-asad-67691b244/" className="hover:underline">linkedin.com/in/muhammad-asad</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Muhammad Asad — Built with Next.js 
        </footer>
      </main>
    </div>
  );
}
