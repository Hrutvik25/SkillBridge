import React from "react";
import { Layout } from "@/components/layout/Layout";

export default function Institutions() {
  return (
    <Layout>
      {/* HERO SECTION (left-aligned with animation) */}
      <section className="bg-gradient-hero pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-display font-bold text-primary-foreground mb-3 animate-fade-in-up leading-tight">
              <span className="block whitespace-nowrap">Structured, accreditation-aligned industry engagement models</span>
              <span className="block whitespace-nowrap">that enhance curriculum relevance, employability, and workforce readiness.</span>
            </h1>

            <div className="flex flex-wrap gap-4 mt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <a
                href="#contact"
                className="inline-block px-6 py-3 bg-primary text-white rounded-md font-semibold"
              >
                Partner with SKILLBRIDGE
              </a>
              <a
                href="#"
                className="inline-block px-6 py-3 bg-slate-600 text-white rounded-md font-semibold"
              >
                Download Institutional Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GAP SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            The Challenges Institutions Face Today
          </h2>
          <p className="mb-4 text-slate-700">
            While institutions deliver strong academic foundations, many students
            graduate without sufficient exposure to real-world industry
            environments. This gap limits their ability to apply knowledge in
            practical settings and impacts employability outcomes.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Limited exposure to real industry workflows</li>
            <li>Insufficient domain-specific problem-solving experience</li>
            <li>Lack of practical decision-making scenarios</li>
            <li>Reduced readiness for immediate workplace contribution</li>
          </ul>
        </div>
      </section>

      {/* MODEL SECTION */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            The SKILLBRIDGE Integrated Industry–Academia Model
          </h2>
          <p className="mb-8 text-slate-700">
            SKILLBRIDGE enables institutions to embed industry intelligence into
            curriculum delivery through a structured, outcome-driven, and
            accreditation-aligned approach.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">SKILLBRIDGE Flux</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>4–6 hour experiential learning program</li>
                <li>Real-world industry case studies</li>
                <li>End-to-end business workflows</li>
                <li>Analytical and strategic decision-making</li>
                <li>Capstone assessment of industry readiness</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">
                Long-Term Collaboration
              </h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Monthly domain sessions (2–3 hours)</li>
                <li>Continuous industry exposure</li>
                <li>Progressive skill development</li>
                <li>Faculty and student participation</li>
                <li>In-depth domain expertise</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">
                Embedded Curriculum
              </h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Value Added Courses (VAC / SEC)</li>
                <li>Credit-linked industry courses</li>
                <li>Industry-aligned curriculum add-ons</li>
                <li>No syllabus replacement required</li>
                <li>Experiential & skill-based learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            What Institutions Achieve
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">Student Outcomes</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Enhanced domain mastery</li>
                <li>Portfolio-ready industry experience</li>
                <li>Improved employability & placements</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Faculty Outcomes</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Exposure to industry practices</li>
                <li>Improved teaching relevance</li>
                <li>No additional workload</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Institutional Outcomes</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Sustainable industry partnerships</li>
                <li>NAAC & accreditation readiness</li>
                <li>Institutional differentiation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ALIGNMENT */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            Aligned with NEP 2020 & NAAC
          </h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>NEP 2020 – Experiential & skill-based learning</li>
            <li>NAAC Criterion I – Curriculum Enrichment</li>
            <li>NAAC Criterion II – Teaching–Learning</li>
            <li>NAAC Criterion III – Industry Interaction</li>
            <li>NAAC Criterion V – Student Progression</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            Build an Industry-Integrated Learning Ecosystem
          </h2>
          <p className="mb-6">
            Connect with SKILLBRIDGE to explore a partnership tailored to your
            institution.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-primary rounded-md font-semibold"
          >
            Request a Partnership Discussion
          </a>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-200 py-8">
        <div className="container mx-auto px-4">
          <p>© SKILLBRIDGE | Industry–Academia Collaboration Platform</p>
        </div>
      </footer>
    </Layout>
  );
}
