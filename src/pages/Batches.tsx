import { Calendar, Users, Clock, Zap, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const studentBatch = {
  title: "For Students",
  icon: BookOpen,
  duration: "1 Month Program",
  startDate: "Batches starting from January 2026",
  features: [
    { icon: "🎓", text: "12 Sessions" },
    { icon: "📚", text: "Domain + 2 Tech + 2 Softskills" },
    { icon: "💻", text: "Online / Offline Batches" },
    { icon: "⏰", text: "3 Days a Week (6–8 PM)" }
  ]
};

const professionalBatch = {
  title: "Working Professionals",
  icon: Zap,
  startDate: "Batches starting from January 2026",
  features: [
    { icon: "🛠️", text: "Weekend Batches (Online / Offline)" },
    { icon: "⏱️", text: "12 Hours Sessions" },
    { icon: "📈", text: "Domain + Softskills" }
  ]
};

const collegeBatch = {
  title: "Colleges / Institutions",
  icon: Users,
  subtitle: "Customized Batches for Colleges",
  features: [
    { icon: "🎯", text: "Curriculum Customization" },
    { icon: "⏰", text: "Flexible Timings" },
    { icon: "👥", text: "Bulk Training Options" }
  ]
};

export default function Batches() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground">
                Training Batches
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80">
              Choose the program that fits your schedule and learning goals. We offer flexible options for students, professionals, and institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Batches Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Batch */}
            <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <BookOpen className="h-8 w-8 mb-3" />
                <h3 className="text-xl font-semibold">{studentBatch.title}</h3>
                <p className="text-blue-100 text-sm mt-2">{studentBatch.duration}</p>
              </div>
              
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <p className="text-sm text-primary font-medium mb-4">{studentBatch.startDate}</p>
                  <div className="space-y-3">
                    {studentBatch.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-xl">{feature.icon}</span>
                        <span className="text-sm text-muted-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to="/contact">
                  <Button className="w-full">Enroll Now</Button>
                </Link>
              </div>
            </div>

            {/* Professional Batch */}
            <div className="group bg-card rounded-2xl border border-primary/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ring-1 ring-primary/20">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                <Zap className="h-8 w-8 mb-3" />
                <h3 className="text-xl font-semibold">{professionalBatch.title}</h3>
                <p className="text-purple-100 text-sm mt-2">Accelerate Your Career</p>
              </div>
              
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <p className="text-sm text-primary font-medium mb-4">{professionalBatch.startDate}</p>
                  <div className="space-y-3">
                    {professionalBatch.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-xl">{feature.icon}</span>
                        <span className="text-sm text-muted-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to="/contact">
                  <Button className="w-full">Enroll Now</Button>
                </Link>
              </div>
            </div>

            {/* College Batch */}
            <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <Users className="h-8 w-8 mb-3" />
                <h3 className="text-xl font-semibold">{collegeBatch.title}</h3>
                <p className="text-green-100 text-sm mt-2">{collegeBatch.subtitle}</p>
              </div>
              
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <p className="text-sm text-primary font-medium mb-4">Enhance Placement Outcomes</p>
                  <div className="space-y-3">
                    {collegeBatch.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-xl">{feature.icon}</span>
                        <span className="text-sm text-muted-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to="/contact">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
              Our Learning Approach
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Free Counselling</h3>
                <p className="text-sm text-muted-foreground">
                  Have a session with our expert mentors to design your personalized roadmap to success.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Explore Industries</h3>
                <p className="text-sm text-muted-foreground">
                  Understand diverse industries and uncover potential career opportunities aligned with your goals.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Be Industry Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from Industry & Domain experts with real-world experience and practical insights.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Why Choose SkillBridge?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="text-muted-foreground">Industry-experienced trainers and mentors</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="text-muted-foreground">Blend of technical, business training and soft skills</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="text-muted-foreground">Commitment to employability and career success</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="text-muted-foreground">Supportive learning environment and post-training guidance</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <p className="text-muted-foreground">Customised programs as per individual aspiration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
