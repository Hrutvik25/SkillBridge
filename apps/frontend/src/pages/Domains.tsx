"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Zap, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* -------------------- DATA -------------------- */

const domains = [
  {
    title: "IT / Computer Science",
    domains: [
      { icon: "💹", name: "Capital Markets" },
      { icon: "🏦", name: "Banking" },
      { icon: "🛡", name: "Insurance" },
      { icon: "📡", name: "Telecom" },
      { icon: "🛍", name: "E-Commerce" },
      { icon: "🎓", name: "Education" },
    ],
  },
  {
    title: "Cyber Security",
    domains: [
      { icon: "🧠", name: "Infosec Concepts" },
      { icon: "📜", name: "Security Compliance" },
      { icon: "🛰️", name: "Security Operations" },
      { icon: "🧩", name: "Product Security" },
      { icon: "🕵️‍♂️", name: "Ethical Hacking" },
    ],
  },
  {
    title: "Data Science & AI",
    domains: [
      { icon: "🗣️", name: "NLP" },
      { icon: "👁️", name: "Computer Vision" },
      { icon: "📈", name: "Predictive Modelling" },
      { icon: "🎯", name: "Recommendation Systems" },
      { icon: "⏳", name: "Time-Series Forecasting" },
    ],
  },
  {
    title: "Mechanical Engineering",
    domains: [
      { icon: "🚗", name: "Automotive Designs" },
      { icon: "❄️", name: "HVAC Systems" },
      { icon: "🛠️", name: "Tooling & Fixtures" },
      { icon: "💧", name: "Fluid Systems" },
    ],
  },
  {
    title: "Civil Engineering",
    domains: [
      { icon: "🏗️", name: "Fields of Application" },
      { icon: "🏛️", name: "RCC & Structural Design" },
      { icon: "🌋", name: "Geotech & Dynamics" },
      { icon: "🏢", name: "Buildings & Architecture" },
    ],
  },
  {
    title: "Automobiles",
    domains: [
      { icon: "⚙️", name: "Auto Components" },
      { icon: "🔋", name: "EV Systems" },
      { icon: "🏎️", name: "Engine Designs" },
      { icon: "🛞", name: "Chassis & Suspension" },
    ],
  },
  {
    title: "Processes & Compliance",
    domains: [
      { icon: "📏", name: "ISO Standards" },
      { icon: "🎯", name: "Six Sigma" },
      { icon: "🔄", name: "SAFe Agile Lean" },
      { icon: "🔐", name: "GDPR" },
      { icon: "💳", name: "PCI-DSS" },
    ],
  },
  {
    title: "Life Skills & Soft Skills",
    domains: [
      { icon: "🗣️", name: "Communication" },
      { icon: "👥", name: "Interview Skills" },
      { icon: "🕰️", name: "Time Management" },
      { icon: "📱", name: "Digital Etiquette" },
    ],
  },
  {
    title: "Green IT",
    domains: [
      { icon: "💻", name: "Green Software" },
      { icon: "🌿", name: "Green Architecture" },
      { icon: "♻️", name: "Green Deployment" },
      { icon: "🌍", name: "Carbon Reporting" },
    ],
  },
];

/* -------------------- CARD -------------------- */

function CollapsibleDomainCard({
  domain,
  isOpen,
  onToggle,
}: {
  domain: typeof domains[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
            {domain.domains[0].icon}
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-primary">
              {domain.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {domain.domains.slice(0, 3).map(d => d.name).join(" • ")}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border px-6 pb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {domain.domains.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 rounded-full border text-sm">
                View Program
              </button>
              <button className="px-4 py-2 rounded-full border text-sm">
                Request Syllabus
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------- PAGE -------------------- */

export default function DomainExpertise() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-3xl font-bold text-primary-foreground">
              Explore Our Domain Expertise
            </h1>
          </div>
        </div>
      </section>

      {/* FLEX COLUMN LAYOUT (KEY FIX) */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {[0, 1, 2].map(col => (
              <div key={col} className="flex-1 flex flex-col gap-8">
                {domains
                  .filter((_, i) => i % 3 === col)
                  .map((domain, idx) => {
                    const realIndex = col + idx * 3;
                    return (
                      <CollapsibleDomainCard
                        key={realIndex}
                        domain={domain}
                        isOpen={openIndex === realIndex}
                        onToggle={() =>
                          setOpenIndex(
                            openIndex === realIndex ? null : realIndex
                          )
                        }
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
