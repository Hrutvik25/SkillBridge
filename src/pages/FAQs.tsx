import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const faqs = [
  {
    question: "What is Skill Bridge — Domain & Business Training?",
    answer: "Skill Bridge is a domain-focused learning platform that teaches real-world business processes, tools, and workflows across industries (Banking, Capital Markets, Telecom, Cyber Security and Green IT etc). Our courses are designed to make learners job-ready with Business exposure and real industry knowledge."
  },
  {
    question: "How is Skill Bridge different from traditional education or generic online courses?",
    answer: "We focus on domain capability (business workflows and applications) taught by industry practitioners. Instead of abstract theory, learners get industry exposure and opportunities and build a portfolio recruiters can evaluate."
  },
  {
    question: "Who is Skill Bridge for?",
    answer: "Students, freshers, and Working professionals looking to lateral moves, and mid-career professionals seeking domain upskilling or role-transition. We also aim to work directly with Educational Institutes and Colleges for specific programs."
  },
  {
    question: "What types of domain paths do you offer?",
    answer: "Please check the Domain Page on our Website. We have a community of mentors which are from different industry backgrounds so please reach out to us in case you have specific requirements."
  },
  {
    question: "How long does a domain path take to complete?",
    answer: "Duration varies by path and level (Beginners → Intermediate → Advanced). Typical timelines range from a few weeks for short focused modules to 8–10 weeks for comprehensive job-ready tracks with projects."
  },
  {
    question: "Do you offer hands-on projects and real-world assignments?",
    answer: "Yes. Many Courses includes real world assignments. Projects and Internships are additional services."
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes. We issue a Skill Bridge Domain Capability Certificate upon successful completion of the course."
  },
  {
    question: "Do you provide job-placement support or interview help?",
    answer: "Yes, we provide placement support, resume reviews, and mock interviews as complementary service but it does not offer a job guarantee."
  },
  {
    question: "Can I access course materials after finishing the path?",
    answer: "Yes — enrolled learners have continued access to their course materials for specific duration."
  },
  {
    question: "Are there any prerequisites or age restrictions?",
    answer: "Most domain paths accept beginners as well as experienced professionals. Specific advanced modules may require foundational knowledge — prerequisites will be listed on each path page. There are no age restrictions."
  },
  {
    question: "Is online learning self-paced or instructor-led?",
    answer: "Its an instructor-led/cohort-based programs for guided learning and live interaction."
  },
  {
    question: "Do you provide group or corporate training?",
    answer: "Yes — We design custom domain training programs for corporates and Institutions. Contact us for additional details."
  },
  {
    question: "How does Skill Bridge protect my data and privacy?",
    answer: "We follow strict data-privacy practices and secure learner data. Our privacy policy (linked in the site footer) has full details on data handling and security measures."
  },
  {
    question: "Do you offer internships or apprenticeships?",
    answer: "We partner with industry for project-based apprenticeships and internship pipelines for select pro tracks. Availability depends on the program and partner needs."
  },
  {
    question: "How can I contact support or request curriculum details?",
    answer: "Refer to our Contact Page for details."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-lg text-primary-foreground/80">
              Find answers to common questions about our training programs, enrollment, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-muted/30 border-t border-border animate-fade-in">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our expert mentors are here to help. Reach out to us for a free counseling session.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-semibold">Phone:</span>
                  <a href="tel:+918788069300" className="text-primary hover:underline">
                    +91 87880 69300
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-semibold">Email:</span>
                  <a href="mailto:Prasulabs@gmail.com" className="text-primary hover:underline">
                    Prasulabs@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}