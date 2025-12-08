import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

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

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Empowering Learners to Achieve Their Dreams
            </h1>
            <p className="text-lg text-primary-foreground/80">
              SkillBridge was founded with a simple mission: to make quality education
              accessible to everyone and help bridge the gap between learning and career success.
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

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
              These values guide everything we do at SkillBridge.
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
                SkillBridge was born from a simple observation: there was a significant gap
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
                Today, SkillBridge serves thousands of learners worldwide, helping them master
                new skills, land their dream jobs, and build successful careers. But we're
                just getting started. Our mission to democratize education continues, and
                we're excited about the impact we can make together.
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
              Join thousands of learners who've transformed their careers with SkillBridge.
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
