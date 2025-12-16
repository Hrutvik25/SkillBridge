import React from 'react';
import { Layout } from '@/components/layout/Layout';

export default function Institutions() {
  return (
    <Layout>
      <section className="bg-gradient-hero pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-3">
              For Institutions
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-6">
              Structured, accreditation-aligned industry engagement models that enhance curriculum relevance, employability, and workforce readiness.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="inline-block px-6 py-3 bg-primary text-white rounded-md font-semibold">Partner with SKILLBRIDGE</a>
              <a href="#" className="inline-block px-6 py-3 bg-slate-600 text-white rounded-md font-semibold">Download Institutional Brochure</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">The Gap Institutions Face Today</h2>
          <p className="mb-4 text-slate-700">
            While institutions deliver strong academic foundations, many students graduate without
            sufficient exposure to real-world industry environments. This gap limits their ability
            to apply knowledge in practical settings and impacts employability outcomes.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Limited exposure to real industry workflows</li>
            <li>Insufficient domain-specific problem-solving experience</li>
            <li>Lack of practical decision-making scenarios</li>
            <li>Reduced readiness for immediate workplace contribution</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">The SKILLBRIDGE Integrated Industry–Academia Model</h2>
          <p className="mb-8 text-slate-700">SKILLBRIDGE enables institutions to embed industry intelligence into curriculum delivery through a structured, outcome-driven, and accreditation-aligned approach.</p>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
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
              <h3 className="text-lg font-semibold mb-3">Long-Term Collaboration</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>Monthly domain sessions (2–3 hours)</li>
                <li>Continuous industry exposure</li>
                <li>Progressive skill development</li>
                <li>Faculty and student participation</li>
                <li>In-depth domain expertise</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Embedded Curriculum</h3>
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">What Institutions Achieve</h2>
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

      <section className="py-16 bg-slate-50" id="alignment">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Aligned with NEP 2020 & NAAC</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2">
            <li>NEP 2020 – Experiential & skill-based learning</li>
            <li>NAAC Criterion I – Curriculum Enrichment</li>
            <li>NAAC Criterion II – Teaching–Learning</li>
            <li>NAAC Criterion III – Industry Interaction</li>
            <li>NAAC Criterion V – Student Progression</li>
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Institutional Impact</h2>
          <p className="text-slate-700 mb-4">SKILLBRIDGE goes beyond short-term training or isolated events. It represents a strategic approach to embedding industry relevance into academic learning—helping institutions produce graduates who are academically strong and professionally ready.</p>
          <strong>Academically grounded. Professionally prepared.</strong>
        </div>
      </section>

      <section className="py-16 bg-primary text-white" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Build an Industry-Integrated Learning Ecosystem</h2>
          <p className="mb-6">Connect with SKILLBRIDGE to explore a partnership tailored to your institution.</p>
          <a
            href="mailto:prasulabs@gmail.com?subject=Partnership%20Discussion&body=Hello%20SKILLBRIDGE%20team%2C%0A%0AI%20am%20interested%20in%20discussing%20an%20institutional%20partnership.%0A%0ARegards%2C%0A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-primary rounded-md font-semibold"
            onClick={(e) => {
              // fallback to ensure mailto is opened even if browser blocks default anchor behavior
              try {
                window.location.href = 'mailto:prasulabs@gmail.com?subject=Partnership%20Discussion&body=Hello%20SKILLBRIDGE%20team%2C%0A%0AI%20am%20interested%20in%20discussing%20an%20institutional%20partnership.%0A%0ARegards%2C%0A';
              } catch (err) {
                // no-op
              }
            }}
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
