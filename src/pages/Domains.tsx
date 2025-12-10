"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Zap, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full Domain Expertise page with collapsible, animated domain cards.
 * Drop this file in your pages/components (e.g., `app/domain-expertise/page.tsx` or `components/DomainExpertise.tsx`).
 *
 * Requirements:
 *  - framer-motion
 *  - lucide-react
 *  - your project's Layout component and Tailwind CSS classes used below
 */

const domains = [
  {
    title: "IT / Computer Science",
    domains: [
      { icon: "💹", name: "Capital Markets" },
      { icon: "🏦", name: "Banking" },
      { icon: "🛡", name: "Insurance" },
      { icon: "📡", name: "Telecom" },
      { icon: "🛍", name: "E-Commerce" },
      { icon: "🎓", name: "Education" }
    ]
  },
  {
    title: "Cyber Security",
    domains: [
      { icon: "🧠", name: "Infosec Concepts" },
      { icon: "📜", name: "Security Compliance" },
      { icon: "🛰️", name: "Security Operations" },
      { icon: "🧩", name: "Product Security" },
      { icon: "🕵️‍♂️", name: "Ethical Hacking" }
    ]
  },
  {
    title: "Data Science & AI",
    domains: [
      { icon: "🗣️", name: "NLP" },
      { icon: "👁️", name: "Computer Vision" },
      { icon: "📈", name: "Predictive Modelling" },
      { icon: "🎯", name: "Recommendation Systems" },
      { icon: "⏳", name: "Time-Series Forecasting" }
    ]
  },
  {
    title: "Mechanical Engineering",
    domains: [
      { icon: "🚗", name: "Automotive Designs" },
      { icon: "❄️", name: "HVAC Systems" },
      { icon: "🛠️", name: "Tooling and Fixtures" },
      { icon: "💧", name: "Fluid Systems" }
    ]
  },
  {
    title: "Civil Engineering",
    domains: [
      { icon: "🏗️", name: "Fields of Application" },
      { icon: "🏛️", name: "RCC and Structural Design" },
      { icon: "🌋", name: "UG, Geotech, and Dynamics" },
      { icon: "🤝", name: "Interdisciplinary and Vendor Interface" },
      { icon: "🏢", name: "Buildings and Architecture" }
    ]
  },
  {
    title: "Automobiles",
    domains: [
      { icon: "⚙️", name: "Auto Components" },
      { icon: "🔋", name: "EV Systems" },
      { icon: "🏎️", name: "Engine Designs" },
      { icon: "🛞", name: "Chassis & Suspension" },
      { icon: "💡", name: "Electronic Components" }
    ]
  },
  {
    title: "Processes & Compliance",
    domains: [
      { icon: "📏", name: "ISO Standards" },
      { icon: "🎯", name: "Six Sigma" },
      { icon: "🔄", name: "SAFe Agile Lean" },
      { icon: "🧾", name: "Compliance" },
      { icon: "🔐", name: "GDPR" },
      { icon: "🏥", name: "HIPAA" },
      { icon: "💳", name: "PCI-DSS" },
      { icon: "📊", name: "SOX" },
      { icon: "📈", name: "SEBI" },
      { icon: "📘", name: "MiFID" }
    ]
  },
  {
    title: "Life Skills & Soft Skills",
    domains: [
      { icon: "🗣️", name: "Communication & Collaboration" },
      { icon: "👥", name: "Group Discussion & Interview Skills" },
      { icon: "🕰️", name: "Time Management & Prioritization" },
      { icon: "📱", name: "Digital Etiquette & Online Presence" },
      { icon: "🧾", name: "Financial Literacy & Management" }
    ]
  },
  {
    title: "Green IT",
    domains: [
      { icon: "💻", name: "Green Software Development" },
      { icon: "🌿", name: "Green Architecture" },
      { icon: "♻️", name: "Green Deployment" },
      { icon: "🌍", name: "Green IT Consulting" },
      { icon: "🌫️", name: "Carbon Emission Reporting & Analysis" }
    ]
  }
];

function CollapsibleDomainCard({ domain }: { domain: typeof domains[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-6"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-background">
            {domain.domains?.[0]?.icon ?? "📚"}
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold text-primary">{domain.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 hidden md:block">
              {domain.domains.slice(0, 3).map((d) => d.name).join(" • ")}
            </p>
          </div>
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="px-6 pb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {domain.domains.map((item, i) => (
                <motion.div
                  key={item.name + i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div className="text-sm font-medium text-foreground">{item.name}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 items-center">
              <button className="px-4 py-2 rounded-full border border-primary/20 text-sm font-medium hover:bg-primary/5">
                View Program
              </button>
              <button className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted/10">
                Request Syllabus
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DomainExpertise() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground">
                Explore Our Domain Expertise
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80">
              Master industry-relevant skills across diverse domains. From IT and Cyber Security to Green IT and Engineering,
              we provide comprehensive training across multiple sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Domains Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, idx) => (
              <CollapsibleDomainCard key={idx} domain={domain} />
            ))}
          </div>

          {/* Expertise Info */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Learn with Purpose. Grow with Impact.
            </h2>
            <p className="text-muted-foreground mb-6">
              Personalized programs for Students, Professionals & Institutions—crafted for clarity, confidence, and career success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">For Students</h3>
                <p className="text-sm text-muted-foreground">
                  Turn your degree into a career advantage with domain-specific training that builds confidence and prepares you for the real world.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">For Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  Stay ahead with targeted upskilling. Whether switching roles or accelerating growth, gain practical and industry-aligned expertise.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">For Colleges & Institutions</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance placement outcomes and bridge the academia-industry gap through co-created and outcome-driven training programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
