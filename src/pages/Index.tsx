// src/pages/index.tsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { CourseCard } from "@/components/CourseCard";
import { MentorCard } from "@/components/MentorCard";
import { coursesApi, mentorsApi, Course, Mentor } from "@/lib/api";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Expert Mentors", value: "200+", icon: GraduationCap },
  { label: "Courses Available", value: "500+", icon: BookOpen },
  { label: "Success Stories", value: "5,000+", icon: Award },
];

const features = [
  {
    title: "Industry-Relevant Curriculum",
    description:
      "Learn skills that employers actually need, designed with input from industry leaders.",
  },
  {
    title: "Expert Mentorship",
    description: "Get guidance from professionals who've walked the path you're starting.",
  },
  {
    title: "Hands-on Projects",
    description: "Build a portfolio of real projects that showcase your capabilities.",
  },
  {
    title: "Career Support",
    description: "Resume reviews, interview prep, and job placement assistance.",
  },
];

/* --------------------------------------------------------------------------
   GlowingCard + GlowingCards components
   - Included inline so this file is copy-paste-ready.
   - Uses CSS variables and inline styles; tweak props as needed.
   -------------------------------------------------------------------------- */

export interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverEffect?: boolean;
}

export interface GlowingCardsProps {
  children: React.ReactNode;
  className?: string;
  /** Enable the glowing overlay effect */
  enableGlow?: boolean;
  /** Size of the glow effect radius (rem) */
  glowRadius?: number;
  /** Opacity of the glow effect */
  glowOpacity?: number;
  /** Animation duration for glow transitions (ms) */
  animationDuration?: number;
  /** Enable hover effects on individual cards */
  enableHover?: boolean;
  /** Gap between cards (string, e.g. '2rem') */
  gap?: string;
  /** Maximum width of cards container */
  maxWidth?: string;
  /** Padding around the container */
  padding?: string;
  /** Background color for the container */
  backgroundColor?: string;
  /** Border radius for cards */
  borderRadius?: string;
  /** Enable responsive layout */
  responsive?: boolean;
  /** Custom CSS variables for theming */
  customTheme?: {
    cardBg?: string;
    cardBorder?: string;
    textColor?: string;
    hoverBg?: string;
  };
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className,
  glowColor = "#3b82f6",
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex-1 min-w-[14rem] p-6 rounded-2xl text-black dark:text-white",
        "bg-background border",
        "transition-all duration-300 ease-out",
        className
      )}
      style={
        {
          ["--glow-color" as any]: glowColor,
        } as React.CSSProperties
      }
      {...(props as any)}
    >
      {children}
    </div>
  );
};

export const GlowingCards: React.FC<GlowingCardsProps> = ({
  children,
  className,
  enableGlow = true,
  glowRadius = 25,
  glowOpacity = 1,
  animationDuration = 400,
  enableHover = true,
  gap = "2.5rem",
  maxWidth = "75rem",
  padding = "3rem 1.5rem",
  backgroundColor,
  borderRadius = "1rem",
  responsive = true,
  customTheme,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay || !enableGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
      setShowOverlay(true);

      overlay.style.setProperty("--x", x + "px");
      overlay.style.setProperty("--y", y + "px");
      overlay.style.setProperty("--opacity", glowOpacity.toString());
    };

    const handleMouseLeave = () => {
      setShowOverlay(false);
      overlay.style.setProperty("--opacity", "0");
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enableGlow, glowOpacity]);

  const containerStyle = {
    ["--gap" as any]: gap,
    ["--max-width" as any]: maxWidth,
    ["--padding" as any]: padding,
    ["--border-radius" as any]: borderRadius,
    ["--animation-duration" as any]: animationDuration + "ms",
    ["--glow-radius" as any]: glowRadius + "rem",
    ["--glow-opacity" as any]: glowOpacity,
    backgroundColor: backgroundColor || undefined,
    ...customTheme,
  } as React.CSSProperties;

  return (
    <div className={cn("relative w-full", className)} style={containerStyle}>
      <div
        ref={containerRef}
        className={cn("relative max-w-[var(--max-width)] mx-auto", "px-6 py-2")}
        style={{ padding: "var(--padding)" }}
      >
        <div
          className={cn(
            "flex items-center justify-center flex-wrap gap-[var(--gap)]",
            responsive ? "flex-col sm:flex-row" : "flex-row"
          )}
        >
          {children}
        </div>

        {enableGlow && (
          <div
            ref={overlayRef}
            className={cn(
              "absolute inset-0 pointer-events-none select-none",
              "opacity-0 transition-all duration-[var(--animation-duration)] ease-out"
            )}
            style={
              {
                WebkitMask:
                  "radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)",
                mask:
                  "radial-gradient(var(--glow-radius) var(--glow-radius) at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)",
                opacity: showOverlay ? "var(--opacity)" : "0",
              } as React.CSSProperties
            }
          >
            <div
              className={cn(
                "flex items-center justify-center flex-wrap gap-[var(--gap)] max-w-[var(--max-width)] center mx-auto",
                responsive ? "flex-col sm:flex-row" : "flex-row"
              )}
              style={{ padding: "var(--padding)" }}
            >
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === GlowingCard) {
                  const cardGlowColor = (child.props as any).glowColor || "#3b82f6";
                  return React.cloneElement(child as React.ReactElement<any>, {
                    className: cn(
                      (child.props as any).className,
                      "bg-opacity-15 dark:bg-opacity-15",
                      "border-opacity-100 dark:border-opacity-100"
                    ),
                    style: {
                      ...(child.props as any).style,
                      backgroundColor: cardGlowColor + "15",
                      borderColor: cardGlowColor,
                      boxShadow: "0 0 0 1px inset " + cardGlowColor,
                    },
                  });
                }
                return child;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Index() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const [coursesData, mentorsData] = await Promise.all([
          coursesApi.getAll(),
          mentorsApi.getAll(),
        ]);

        if (!mounted) return;
        setCourses(coursesData.slice(0, 6));
        setMentors(mentorsData.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-in-up">
              Bridge the Gap Between
              <span className="block text-accent">Learning & Career Success</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Master in-demand skills with expert mentors and hands-on projects.
              Join thousands of learners who've transformed their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/courses">
                <Button variant="hero" size="xl">
                  Explore Courses
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="hero-outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose SkillBridge?
            </h2>
            <p className="text-muted-foreground">
              We're not just another online learning platform. We're your partner in career transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batches Section - uses GlowingCards */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Training Batches
            </h2>
            <p className="text-muted-foreground">Choose the program that fits your schedule and learning goals</p>
          </div>

          <div className="mb-8">
            <GlowingCards
              enableGlow
              glowRadius={18}
              glowOpacity={0.95}
              animationDuration={300}
              gap="1.5rem"
              maxWidth="90rem"
              padding="2rem 1rem"
              customTheme={{ cardBg: "var(--card-bg)", cardBorder: "var(--card-border)" }}
            >
              {/* Student Card */}
              <GlowingCard glowColor="#10b981" className="max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">For Students</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    1 Month Program • 12 Sessions • 3 Days/Week • Online/Offline
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground flex-grow">
                    <li>✓ Domain + 2 Tech + 2 Softskills</li>
                    <li>✓ 6–8 PM Sessions</li>
                    <li>✓ Starting Jan 2026</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/batches?type=students">
                      <Button variant="outline" className="w-full">Learn More</Button>
                    </Link>
                  </div>
                </div>
              </GlowingCard>

              {/* Professionals Card */}
              <GlowingCard glowColor="#ef4444" className="max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">For Professionals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Weekend Batches • 12 Hours Sessions • Domain + Softskills
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground flex-grow">
                    <li>✓ Flexible Timings</li>
                    <li>✓ Online/Offline</li>
                    <li>✓ Starting Jan 2026</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/batches?type=professionals">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </GlowingCard>

              {/* Colleges Card */}
              <GlowingCard glowColor="#3b82f6" className="max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-3">🏛️</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">For Colleges</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Customized Batches • Flexible Timings • Bulk Training
                  </p>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground flex-grow">
                    <li>✓ Curriculum Customization</li>
                    <li>✓ Flexible Duration</li>
                    <li>✓ Enhanced Placements</li>
                  </ul>
                  <div className="mt-auto">
                    <Link to="/batches?type=colleges">
                      <Button variant="outline" className="w-full">Explore</Button>
                    </Link>
                  </div>
                </div>
              </GlowingCard>
            </GlowingCards>
          </div>

          <div className="text-center">
            <Link to="/batches">
              <Button size="lg">
                View All Batches
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                Meet Our Mentors
              </h2>
              <p className="text-muted-foreground">Learn from industry experts who are passionate about teaching</p>
            </div>
            <Link to="/mentors" className="hidden sm:flex items-center gap-1 text-primary hover:text-primary/80 font-medium">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-5 animate-pulse">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : mentors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {mentors.map((mentor, index) => (
                <div key={mentor._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MentorCard
                    id={mentor._id}
                    name={mentor.name}
                    title={mentor.title}
                    bio={mentor.bio}
                    imageUrl={mentor.image_url}
                    skills={mentor.skills}
                    linkedin={mentor.linkedin}
                    twitter={mentor.twitter}
                    compact
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-xl">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Mentors Yet</h3>
              <p className="text-muted-foreground">Our expert mentors are joining soon!</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/mentors">
              <Button variant="outline">
                View All Mentors
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Domain Expertise Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Explore Our Domain Expertise
            </h2>
            <p className="text-muted-foreground">
              Master industry-relevant skills across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[
              { icon: "💹", name: "Capital Markets" },
              { icon: "🛡", name: "Cyber Security" },
              { icon: "🤖", name: "Data Science & AI" },
              { icon: "🚗", name: "Automobiles" },
              { icon: "🏗️", name: "Civil Engineering" },
              { icon: "⚙️", name: "Mechanical" },
              { icon: "🌍", name: "Green IT" },
              { icon: "📊", name: "Processes" },
              { icon: "🏦", name: "Banking" },
              { icon: "🎓", name: "Education" },
            ].map((domain, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-4 text-center hover:border-primary/50 transition-colors">
                <div className="text-3xl mb-2">{domain.icon}</div>
                <p className="text-sm font-medium text-foreground">{domain.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/domains">
              <Button variant="outline" size="lg">
                Explore All Domains
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about our programs</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            {[
              { q: "What programs do you offer?", a: "We offer domain-specific training for Students, Professionals, and Colleges across multiple sectors like IT, Cyber Security, Data Science, and more." },
              { q: "How long are the programs?", a: "Program duration varies. Students get 1-month programs with 12 sessions, while professionals have flexible weekend batches. Colleges can customize the duration." },
              { q: "Are classes online or offline?", a: "We offer both online and offline batches. You can choose the format that works best for you during registration." },
              { q: "Do you provide placement assistance?", a: "Yes, we're committed to employability and career success. Our programs are designed to enhance placement outcomes." },
              { q: "How do I get started?", a: "Contact us for a free counseling session with our expert mentors. They'll help design your personalized learning roadmap." },
            ].map((item, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
                <button onClick={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors">
                  <h3 className="text-base font-semibold text-foreground pr-4">{item.q}</h3>
                  <ChevronDown className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${openFAQIndex === idx ? "rotate-180" : ""}`} />
                </button>

                {openFAQIndex === idx && (
                  <div className="px-6 py-4 bg-muted/30 border-t border-border animate-fade-in">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/faqs">
              <Button size="lg">
                View All FAQs
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">Join thousands of learners who've transformed their careers with SkillBridge. Your next opportunity awaits.</p>
            <Link to="/auth?mode=register">
              <Button variant="hero" size="xl">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
