import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const faqs = [
  {
    question: "What programs do you offer?",
    answer: "We offer personalized programs for Students, Professionals, and Colleges/Institutions. Our domain-specific training covers IT/Computer Science, Cyber Security, Data Science & AI, Mechanical Engineering, Civil Engineering, Automobiles, Processes, Life Skills, and Green IT."
  },
  {
    question: "Who are the instructors?",
    answer: "Our instructors are industry-experienced trainers and mentors with 15-30+ years of expertise in their respective domains. They bring real-world knowledge and practical insights to every session."
  },
  {
    question: "How long are the training programs?",
    answer: "Program duration varies based on your needs. For students, we offer 1-month programs with 12 sessions (3 days a week). Professionals have flexible weekend batches, and colleges can customize the training duration according to their requirements."
  },
  {
    question: "Are the classes online or offline?",
    answer: "We offer both online and offline batches to suit your preferences and schedule. You can choose the format that works best for you during registration."
  },
  {
    question: "What is your approach to learning?",
    answer: "We follow a comprehensive approach: Free counseling with expert mentors, exploration of industries and career opportunities, and hands-on learning from industry experts to prepare you for real-world scenarios."
  },
  {
    question: "Do you provide placement assistance?",
    answer: "Yes, we are committed to employability and career success. Our programs are designed to bridge the gap between academia and industry, enhancing your placement outcomes."
  },
  {
    question: "Can I customize the training for my institution?",
    answer: "Absolutely! We offer customized batches for colleges and institutions with flexible timings, curriculum customization, and bulk training options tailored to your specific needs."
  },
  {
    question: "What domains can I choose from?",
    answer: "We offer expertise across multiple domains including Capital Markets, Banking, Insurance, Telecom, E-Commerce, Cyber Security, Data Science & AI, Civil Engineering, Mechanical Engineering, Automobiles, Green IT, and more."
  },
  {
    question: "Is there post-training support?",
    answer: "Yes, we provide supportive learning environment and post-training guidance to help you succeed in your career journey."
  },
  {
    question: "How do I enroll?",
    answer: "You can start with a free counseling session with our expert mentors. Contact us at +91 87880 69300 or email Prasulabs@gmail.com to schedule your session and design your personalized roadmap to success."
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
