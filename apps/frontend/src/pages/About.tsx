import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { teamApi, TeamMember } from "@/lib/api";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from course content to student support.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about education and helping our students achieve their dreams.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We foster a supportive community where learners help each other grow.",
  },
];

const stats = [
  { value: "10,000+", label: "Students Enrolled" },
  { value: "200+", label: "Expert Mentors" },
  { value: "500+", label: "Courses Available" },
  { value: "95%", label: "Success Rate" },
];

const fallbackTeam: TeamMember[] = [
  {
    _id: "rahul-bhide",
    name: "Rahul Bhide",
    title: "Founder and CEO",
    bio: "With 27 years of experience across Capital Markets and FinTech, Rahul specializes in reviving stalled initiatives, delivering multi-million-dollar transformations, and leading client services organizations at scale.",
    image_url: "/images/1.jpeg",
    skills: ["Capital Markets", "FinTech", "Transformation Leadership", "Client Services", "Global Delivery", "Trading Systems", "Post-Trade", "Compliance"],
    linkedin: "https://www.linkedin.com/in/rahul1bhide/",
    active: true,
  },
  {
    _id: "swanand-kakade",
    name: "Swanand Kakade",
    title: "Co-Founder and COO",
    bio: "With 20+ years in capital markets and trading systems, Swanand’s expertise spans OMS, DMA, Risk Gateways, Smart Algos, and market data platforms across the US, UK, and APAC regions.",
    image_url: "/images/2.jpeg",
    skills: ["Order Management Systems", "Direct Market Access", "Risk Gateways", "Smart Algos", "Market Data Platforms", "Python", "SQL", "Linux", "Automation", "Technical Analysis"],
    linkedin: "https://www.linkedin.com/in/swanand-kakade-912ba76/",
    active: true,
  },
];

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await teamApi.getAll();
        if (data && data.length > 0) {
          setTeam(data);
        }
      } catch (error) {
        console.error("Failed to fetch team", error);
      }
    }
    loadTeam();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 lg:py-24 flex items-center"
        style={{ minHeight: "calc(100vh - 72px)", background: "linear-gradient(135deg,#032a63 0%,#0b4a9e 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-12 left-8 w-56 h-56 md:w-80 md:h-80 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-12 right-8 w-72 h-72 md:w-96 md:h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <h1 className="inline-block text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-in-up whitespace-nowrap">
              Empowering Careers, <span className="text-accent">Elevating Institutions.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Your bridge to domain coaching, skilled-development, and hiring for students and educational partners.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to quality education by connecting aspiring learners with
                industry experts. We believe that everyone deserves the opportunity to learn
                new skills, advance their careers, and achieve their full potential—regardless
                of their background or circumstances.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted platform for skill development and career
                advancement. We envision a future where quality education is available to
                everyone, and where learning leads directly to meaningful career opportunities
                and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Team */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Team</h2>
            <p className="text-muted-foreground">Meet the leaders shaping SKILLBRIDGE.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member._id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-muted flex-shrink-0">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-semibold text-muted-foreground">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      {member.linkedin && (
                        <a href={member.linkedin} className="text-primary text-sm hover:underline" target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    {member.bio && <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>}
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {member.skills.slice(0, 6).map((skill) => (
                          <span key={skill} className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground border border-border">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These values guide everything we do at SKILLBRIDGE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                SKILLBRIDGE was born from a simple observation: there was a significant gap
                between what traditional education offered and what the job market demanded.
                Too many talented individuals were unable to access quality, practical education
                that could help them advance their careers.
              </p>
              <p>
                We set out to change that. By partnering with industry experts and experienced
                professionals, we created a platform where anyone can learn in-demand skills
                from people who've actually worked in the field.
              </p>
              <p>
                Today, SKILLBRIDGE want learners help to master new skills, land their dream
                jobs, and build successful careers. But we're just getting started. Our mission
                to democratize education continues, and we're excited about the impact we can
                make together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of learners who've transformed their careers with SKILLBRIDGE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button variant="hero" size="lg">
                  Explore Courses
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero-outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
