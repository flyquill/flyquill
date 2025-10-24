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
  Code,
  Zap,
  Check,
  Phone,
  Mail,
  User,
  Menu,
  X,
  Book
} from "lucide-react";
import ContactForm from "../_components/ContactForm";

const services = [
  {
    id: 1,
    title: "Website Assistant",
    desc: "Hire an proffessional assistant for your current website to improve Speed, SEO, Security and New Features addition.",
    icon: User,
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
    icon: Book,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    quote: "Fast, reliable, and delivers exactly what we need.",
    role: "Product Manager",
  },
  {
    id: 2,
    name: "Bilal Iqbal",
    quote: "Saved us hours with a custom automation — excellent work.",
    role: "CEO",
  },
];

const pricing = [
  {
    id: 1,
    name: "Starter",
    price: "From $19",
    billing: "one-time",
    tag: "Best for personal sites & Landing Pages",
    bullets: [
      "Static website (up to 5 pages)",
      "Mobile responsive & cross-browser tested",
      "Basic SEO (meta tags + sitemap)",
      "Contact form integration",
      "1 round of revision",
      "Delivery: 3–7 business days",
      "Hand-off: source files & simple guide",
    ],
    cta: "Get Started",
    notes:
      "Affordable entry-level plan — ideal for portfolios and small brochure sites.",
  },

  {
    id: 2,
    name: "Business",
    price: "$299",
    billing: "one-time",
    tag: "For growing businesses & e-commerce",
    bullets: [
      "Custom multi-page website (CMS: Next.js + headless or WP)",
      "E-commerce or blog integration (payments, product pages)",
      "On-page SEO + structured data setup",
      "Free domain setup (1 year) & SSL",
      "Managed basic hosting (1 year) or deployment guide",
      "Performance optimization (Lighthouse audit + fixes)",
      "Up to 3 revision rounds",
      "Staging environment & one production deployment",
      "Analytics setup (Google Analytics / GA4)",
      "Delivery: 7–14 business days",
      "Documentation + 1 hour onboarding call",
    ],
    cta: "Talk to Sales",
    notes:
      "Includes everything needed to launch a professional online presence with conversion tools.",
  },

  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    billing: "custom / retainer",
    tag: "For scale, SLAs, and complex integrations",
    bullets: [
      "Everything in Business, plus:",
      "Dedicated project manager & engineering team",
      "Custom integrations (ERP, accounting, CRM, Oracle, etc.)",
      "SLA, uptime guarantees and priority support",
      "Team training & documentation",
      "Advanced security hardening & penetration testing",
      "Custom automation & workflows (n8n / custom scripts)",
      "Monthly maintenance & feature roadmap",
      "Flexible delivery schedule (phased sprints)",
    ],
    cta: "Contact Us",
    notes:
      "Tailored for enterprises and mission-critical systems — quotes after discovery call.",
  },
];

const faqs = [
  {
    q: "How long does a typical website or project take?",
    a: "Simple landing pages take 3–7 business days. Full business websites can take 7 days to 2 months depending on features, content readiness, and revisions.",
  },
  {
    q: "Do you support ongoing maintenance or monthly retainers?",
    a: "Yes. We offer maintenance plans, content updates, hosting support, monitoring, and feature enhancements on a monthly or yearly basis.",
  },
  {
    q: "Can you work with my existing branding or designs?",
    a: "Absolutely. We can work from your brand kit, Figma/PSD designs, or we can create a new brand identity from scratch if needed.",
  },
  {
    q: "What if I don’t know exactly what I need?",
    a: "No problem. We can schedule a short discovery call to define your goals, features, and scope, then recommend the right plan and timeline.",
  },
  {
    q: "Do you support custom integrations (payments, CRMs, ERP, APIs)?",
    a: "Yes. We can integrate payment gateways, marketing tools, CRM systems, automation platforms, and internal workflow software — including Oracle and n8n setups.",
  },
  {
    q: "Can you manage my content pipeline and publishing?",
    a: "Yes. We handle content repurposing, subtitle files, social reel formatting, and automated publishing workflows so your content reaches platforms without manual friction.",
  },
];

export default function FlyQuillLanding() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
            <Image
              src="/logo.png"
              alt="FlyQuill"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">FlyQuill</div>
            <div className="text-xs text-slate-400">
              Software • Web • Automation
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#services" className="hover:text-white">
            Services
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-white">
            Clients
          </a>
          <a href="#contact" className="text-blue-400 hover:underline">
            Contact
          </a>
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded bg-slate-800/60 border border-slate-700"
          >
            <Menu size={18} />
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-lg text-sm"
          >
            Quote
          </a>
        </div>

        {/* Mobile nav panel */}
        <div
          className={`fixed inset-0 z-40 transition-transform ${
            mobileNavOpen ? "visible" : "pointer-events-none"
          } md:hidden`}
        >
          <div
            className={`absolute inset-0 bg-black/50 ${
              mobileNavOpen ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            onClick={() => setMobileNavOpen(false)}
          />

          <div
            className={`absolute top-0 right-0 w-11/12 max-w-sm h-full bg-slate-900/95 border-l border-slate-700 transform ${
              mobileNavOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
                    <Image
                      src="/logo.png"
                      alt="FlyQuill"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">FlyQuill</div>
                    <div className="text-xs text-slate-400">
                      Software • Web • Automation
                    </div>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 rounded bg-slate-800/40"
                >
                  {" "}
                  <X size={18} />{" "}
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                <a
                  onClick={() => setMobileNavOpen(false)}
                  href="#services"
                  className="py-3 px-3 rounded hover:bg-slate-800"
                >
                  Services
                </a>
                <a
                  onClick={() => setMobileNavOpen(false)}
                  href="#pricing"
                  className="py-3 px-3 rounded hover:bg-slate-800"
                >
                  Pricing
                </a>
                <a
                  onClick={() => setMobileNavOpen(false)}
                  href="#testimonials"
                  className="py-3 px-3 rounded hover:bg-slate-800"
                >
                  Clients
                </a>
                <a
                  onClick={() => setMobileNavOpen(false)}
                  href="#contact"
                  className="py-3 px-3 rounded hover:bg-slate-800"
                >
                  Contact
                </a>
                <a
                  onClick={() => setMobileNavOpen(false)}
                  href="#faq"
                  className="py-3 px-3 rounded hover:bg-slate-800"
                >
                  FAQ
                </a>
              </nav>

              <div className="mt-6">
                <a
                  href="#contact"
                  onClick={() => setMobileNavOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-blue-600 rounded-lg"
                >
                  Get a Quote
                </a>
              </div>

              <div className="mt-6 text-xs text-slate-400">
                Contact: flyquill.pk@gmail.com
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center pt-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Fast software, solid websites, and automations that save time.
            </h1>
            <p className="mt-4 text-slate-400 max-w-xl">
              We help creators and businesses publish faster and run smoother.
              From polished websites to full-stack solutions and automated workflows — FlyQuill handles it end-to-end.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 rounded-lg text-white font-medium"
              >
                Request a Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-700 rounded-lg text-slate-300"
              >
                See Services
              </a>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Check size={16} /> Fast turnaround
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} /> Fixed pricing
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} /> 24/7 Support
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-linear-to-br from-slate-800 to-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=60"
                alt="studio"
                width={1200}
                height={800}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="mt-3 text-sm text-slate-400">
              Trusted by creators and small teams.
            </div>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mt-16">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-semibold"
          >
            Our Services
          </motion.h2>
          <p className="text-slate-400 mt-2">
            Everything you need to publish, sell, and scale.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <motion.div
                key={s.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: s.id * 0.05 }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <s.icon size={22} className="text-blue-400" />
                  <div className="font-semibold">{s.title}</div>
                </div>
                <div className="text-slate-400 mt-3 text-sm">{s.desc}</div>
                <div className="mt-4">
                  <a
                    href="#contact"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Get a quote
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold">Why FlyQuill</h3>
            <p className="text-slate-400 mt-2">
              We focus on speed, clarity, and outcomes — not busywork. You get a
              fast process, clear deliverables, and measurable results.
            </p>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-1 text-green-400" /> Rapid
                delivery cycles
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-1 text-green-400" /> Transparent
                pricing & scope
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="mt-1 text-green-400" /> Dev &
                creative under one roof
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 rounded-lg"
              >
                View Pricing
              </a>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h4 className="font-semibold">Quick process</h4>
            <ol className="mt-3 text-slate-300 space-y-2 list-decimal list-inside">
              <li>Tell us your goal</li>
              <li>We propose scope & timeline</li>
              <li>Revise & deliver</li>
            </ol>
            <div className="mt-4 text-sm text-slate-400">
              Most projects start in 3–5 business days.
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">Pricing</h3>
            <p className="text-slate-400 mt-2">
              Straightforward plans designed for different business needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <div
                key={p.id}
                className="bg-slate-800 p-7 rounded-2xl border border-slate-700 flex flex-col text-center hover:border-blue-600 transition"
              >
                <div className="text-sm text-blue-400 font-medium tracking-wide">
                  {p.name}
                </div>

                <div className="text-4xl font-bold mt-3">{p.price}</div>
                <div className="text-xs text-slate-400 mt-1">{p.billing}</div>

                {p.tag && (
                  <p className="text-sm text-slate-300 mt-4 italic">{p.tag}</p>
                )}

                <ul className="mt-6 text-sm text-slate-300 space-y-2 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start text-left gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center w-full px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                  >
                    {p.cta}
                  </a>
                </div>

                {p.notes && (
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    {p.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mt-12">
          <h3 className="text-2xl font-semibold">What clients say</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
              >
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
                <p className="mt-3 text-slate-300">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-20">
          <h3 className="text-3xl font-bold">Frequently Asked Questions</h3>
          <p className="text-slate-400 mt-2">
            Straight, clear answers. No fluff.
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                className="bg-slate-800 p-4 rounded-lg border border-slate-700 transition hover:border-blue-600"
              >
                <summary className="font-medium cursor-pointer">
                  {item.q}
                </summary>
                <div className="mt-2 text-slate-400">{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="mt-12 bg-slate-900/40 p-6 rounded-2xl border border-slate-700"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold">Start a project</h3>
              <p className="text-slate-400 mt-2">
                Tell us what you need and we’ll reply with a plan and estimate.
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={16} /> +92 304 7069795
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} /> flyquill.pk@gmail.com
                </div>
                <div className="mt-4">
                  <a
                    href="https://wa.me/923047069795"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-green-600 rounded-lg"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>

        <footer className="mt-12 py-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} FlyQuill — Software, web & automation
        </footer>
      </main>
    </div>
  );
}
