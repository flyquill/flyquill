"use client";
/*
  FlyQuill Landing Page - Single-file React component
  - Tailwind + Framer Motion
  - Sections: Hero, Services, Features, Pricing, Testimonials, FAQ, Contact, Footer
  - Place in your Next.js app (e.g., app/page.jsx or components/LandingPage.jsx)
  - Swap images in /public or replace external URLs
*/

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Film,
  Code,
  Zap,
  Check,
  Phone,
  Mail,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Video Editing",
    desc: "Short-form, long-form, color grading, motion graphics, and thumbnails.",
    icon: Film,
  },
  {
    id: 2,
    title: "Website Development",
    desc: "Fast React/Next.js sites, e-commerce, landing pages and maintenance.",
    icon: Code,
  },
  {
    id: 3,
    title: "Automations",
    desc: "Workflow automation with n8n, Zapier, and custom scripts to save time.",
    icon: Zap,
  },
  {
    id: 4,
    title: "Custom Software",
    desc: "Accounting systems, integrations, and enterprise solutions.",
    icon: Play,
  },
];

const testimonials = [
  { id: 1, name: "Ayesha Khan", quote: "Fast, reliable, and delivers exactly what we need.", role: "Product Manager" },
  { id: 2, name: "Bilal Iqbal", quote: "Saved us hours with a custom automation — excellent work.", role: "CEO" },
];

const pricing = [
  { id: 1, name: "Starter", price: "$19", bullets: ["Static Website", "5 pages", "Mobile Responsive"], cta: "Get Started" },
  { id: 2, name: "Business", price: "$499", bullets: ["Daymanic Website", "Full website with SEO", "Ecommerce - Blog - Software", "Free Hosting and Domain", "SSL", "Private Server"], cta: "Talk to Sales" },
  { id: 3, name: "Enterprise", price: "Custom", bullets: ["Everything in Business", "Anything you want"], cta: "Contact Us" },
];

export default function FlyQuillLanding() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
            <Image src="/logo.png" alt="FlyQuill" fill className="object-cover" />
          </div>
          <div>
            <div className="font-semibold text-lg">FlyQuill</div>
            <div className="text-xs text-slate-400">Video • Web • Automation</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#testimonials" className="hover:text-white">Clients</a>
          <a href="#contact" className="text-blue-400 hover:underline">Contact</a>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button aria-label="Toggle menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 rounded bg-slate-800/60 border border-slate-700">
            <Menu size={18} />
          </button>
          <a href="#contact" className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-lg text-sm">Quote</a>
        </div>

        {/* Mobile nav panel */}
        <div className={`fixed inset-0 z-40 transition-transform ${mobileNavOpen ? 'visible' : 'pointer-events-none'} md:hidden`}> 
          <div className={`absolute inset-0 bg-black/50 ${mobileNavOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={() => setMobileNavOpen(false)} />

          <div className={`absolute top-0 right-0 w-11/12 max-w-sm h-full bg-slate-900/95 border-l border-slate-700 transform ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform`}> 
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
                    <Image src="/logo.png" alt="FlyQuill" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold">FlyQuill</div>
                    <div className="text-xs text-slate-400">Video • Web • Automation</div>
                  </div>
                </div>
                <button aria-label="Close menu" onClick={() => setMobileNavOpen(false)} className="p-2 rounded bg-slate-800/40"> <X size={18} /> </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                <a onClick={() => setMobileNavOpen(false)} href="#services" className="py-3 px-3 rounded hover:bg-slate-800">Services</a>
                <a onClick={() => setMobileNavOpen(false)} href="#pricing" className="py-3 px-3 rounded hover:bg-slate-800">Pricing</a>
                <a onClick={() => setMobileNavOpen(false)} href="#testimonials" className="py-3 px-3 rounded hover:bg-slate-800">Clients</a>
                <a onClick={() => setMobileNavOpen(false)} href="#contact" className="py-3 px-3 rounded hover:bg-slate-800">Contact</a>
                <a onClick={() => setMobileNavOpen(false)} href="#faq" className="py-3 px-3 rounded hover:bg-slate-800">FAQ</a>
              </nav>

              <div className="mt-6">
                <a href="#contact" onClick={() => setMobileNavOpen(false)} className="block w-full text-center px-4 py-3 bg-blue-600 rounded-lg">Get a Quote</a>
              </div>

              <div className="mt-6 text-xs text-slate-400">Contact: flyquill@example.com</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center pt-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">FlyQuill — Fast video editing, solid software, and automations that save time.</h1>
            <p className="mt-4 text-slate-400 max-w-xl">We help creators and businesses publish faster and run smoother. From polished videos to full websites and automated workflows — FlyQuill handles it end-to-end.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-lg text-white font-medium">Request a Quote</a>
              <a href="#services" className="inline-flex items-center gap-2 px-5 py-3 border border-slate-700 rounded-lg text-slate-300">See Services</a>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Check size={16} /> Fast turnaround</div>
              <div className="flex items-center gap-2"><Check size={16} /> Fixed pricing</div>
              <div className="flex items-center gap-2"><Check size={16} /> NDA available</div>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-linear-to-br from-slate-800 to-slate-900">
              <Image src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=60" alt="studio" width={1200} height={800} className="w-full h-80 object-cover" />
            </div>
            <div className="mt-3 text-sm text-slate-400">Trusted by creators and small teams.</div>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mt-16">
          <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-semibold">Our Services</motion.h2>
          <p className="text-slate-400 mt-2">Everything you need to publish, sell, and scale.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <motion.div key={s.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: s.id * 0.05 }} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <s.icon size={22} className="text-blue-400" />
                  <div className="font-semibold">{s.title}</div>
                </div>
                <div className="text-slate-400 mt-3 text-sm">{s.desc}</div>
                <div className="mt-4">
                  <a href="#contact" className="text-sm text-blue-400 hover:underline">Get a quote</a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold">Why FlyQuill</h3>
            <p className="text-slate-400 mt-2">We focus on speed, clarity, and outcomes — not busywork. You get a fast process, clear deliverables, and measurable results.</p>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex items-start gap-3"><Check size={16} className="mt-1 text-green-400" /> Rapid delivery cycles</li>
              <li className="flex items-start gap-3"><Check size={16} className="mt-1 text-green-400" /> Transparent pricing & scope</li>
              <li className="flex items-start gap-3"><Check size={16} className="mt-1 text-green-400" /> Dev & creative under one roof</li>
            </ul>

            <div className="mt-6">
              <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 rounded-lg">View Pricing</a>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h4 className="font-semibold">Quick process</h4>
            <ol className="mt-3 text-slate-300 space-y-2 list-decimal list-inside">
              <li>Tell us your goal</li>
              <li>We propose scope & timeline</li>
              <li>Revise & deliver</li>
            </ol>
            <div className="mt-4 text-sm text-slate-400">Most projects start in 3–5 business days.</div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-12">
          <h3 className="text-2xl font-semibold">Pricing</h3>
          <p className="text-slate-400 mt-2">Clear plans for common needs — custom options available.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <div key={p.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                <div className="text-sm text-slate-400">{p.name}</div>
                <div className="text-3xl font-bold mt-2">{p.price}</div>
                <ul className="mt-4 text-sm text-slate-300 space-y-2">
                  {p.bullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
                <div className="mt-6">
                  <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-lg">{p.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mt-12">
          <h3 className="text-2xl font-semibold">What clients say</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
                <p className="mt-3 text-slate-300">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold">FAQ</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <details className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <summary className="font-medium">How long does a typical video edit take?</summary>
              <div className="mt-2 text-slate-400">Turnaround ranges from 24 hours (short edits) to 5 business days for complex projects.</div>
            </details>

            <details className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <summary className="font-medium">Do you sign NDAs?</summary>
              <div className="mt-2 text-slate-400">Yes — we can sign NDAs and handle private material securely.</div>
            </details>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12 bg-slate-900/40 p-6 rounded-2xl border border-slate-700">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold">Start a project</h3>
              <p className="text-slate-400 mt-2">Tell us what you need and we’ll reply with a plan and estimate.</p>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2"><Phone size={16} /> +92 304 7069795</div>
                <div className="flex items-center gap-2"><Mail size={16} /> flyquill@example.com</div>
                <div className="mt-4">
                  <a href="https://wa.me/923047069795" className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 rounded-lg">Chat on WhatsApp</a>
                </div>
              </div>
            </div>

            <form className="space-y-3">
              <input placeholder="Your name" className="w-full p-3 rounded bg-slate-800 border border-slate-700" />
              <input placeholder="Email" className="w-full p-3 rounded bg-slate-800 border border-slate-700" />
              <input placeholder="Project (e.g., 2 min edit)" className="w-full p-3 rounded bg-slate-800 border border-slate-700" />
              <textarea placeholder="Brief description" className="w-full p-3 rounded bg-slate-800 border border-slate-700 h-28" />
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-3 bg-blue-600 rounded-lg">Send request</button>
              </div>
            </form>
          </div>
        </section>

        <footer className="mt-12 py-8 text-center text-slate-400 text-sm">© {new Date().getFullYear()} FlyQuill — Video editing, web & automation</footer>
      </main>
    </div>
  );
}
