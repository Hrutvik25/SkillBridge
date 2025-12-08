import { Layout } from "@/components/layout/Layout";
import { Zap } from "lucide-react";

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
              <div
                key={idx}
                className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-full p-6">
                  <h3 className="text-lg font-semibold text-primary mb-6">
                    {domain.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {domain.domains.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
