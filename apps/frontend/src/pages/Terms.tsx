import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              Terms of Use
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Last Updated: December 10, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
            <p className="lead">
              Welcome to SKILLBRIDGE ("we", "our", "us"). By accessing or using our website, courses, training materials, or any services offered through SKILLBRIDGE ("Services"), you agree to comply with and be bound by these Terms of Use.
            </p>
            <p>
              If you do not agree with any part of these Terms, please do not use our Services.
            </p>

            <hr className="my-8 border-border" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Eligibility</h2>
            <p>You must be at least 18 years old to use SKILLBRIDGE. By using the website, you confirm that you meet this requirement.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Website</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for lawful purposes only</li>
              <li>Not engage in activities that may harm, disrupt, or misuse the website</li>
              <li>Not attempt to copy, resell, or commercially exploit our content without written permission</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>When you create an account:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information</li>
              <li>You are responsible for maintaining confidentiality of your login details</li>
              <li>You must notify us immediately of unauthorized access to your account</li>
            </ul>
            <p className="mt-4">We reserve the right to suspend or terminate accounts at our discretion.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Course Content & Intellectual Property</h2>
            <p>All content on SKILLBRIDGE—including videos, text, designs, logos, modules, assessments, and digital materials—is owned by SKILLBRIDGE or licensed to us.</p>
            
            <p className="mt-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Copy, reproduce, distribute, or publish our content</li>
              <li>Share your login or course materials</li>
              <li>Use content for commercial purposes without permission</li>
            </ul>
            
            <p className="mt-4">You may:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access purchased content for personal, educational, non-commercial use</li>
              <li>Download permitted resources for personal learning</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payments, Refunds & Cancellations</h2>
            <p>Where applicable:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments made for courses or services are non-refundable, unless otherwise mentioned on the course page</li>
              <li>SKILLBRIDGE may modify pricing at any time</li>
              <li>If any fraudulent or unauthorized payment is detected, your access may be suspended</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Tools & Links</h2>
            <p>SKILLBRIDGE may use third-party tools, videos, analytics, forms, or external links.</p>
            <p className="mt-4">We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Content on third-party websites</li>
              <li>Privacy practices of third-party services</li>
            </ul>
            <p className="mt-4">Use of external links is at your own discretion.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
            <p>SKILLBRIDGE provides training and educational content only.</p>
            <p className="mt-4">We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Job placements</li>
              <li>Salary outcomes</li>
              <li>Accuracy of third-party data</li>
              <li>Performance of learners</li>
            </ul>
            <p className="mt-4">To the fullest extent permitted by law, SKILLBRIDGE is not liable for any direct, indirect, incidental, or consequential damages resulting from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use or inability to use our website</li>
              <li>Loss of data</li>
              <li>Errors, interruptions, or technical issues</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to the Terms</h2>
            <p>We may update these Terms from time to time. The "Last Updated" date will be revised accordingly. Continued use of SKILLBRIDGE after updates means you accept the revised Terms.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>For questions regarding these Terms, contact:</p>
            <p className="mt-2">Email: Prasulabs@gmail.com</p>
            <p>Company: PRASU Soft Lab Pvt. Ltd.</p>
            <p>Address: A 702, Ruturang Society Phase 1, Aranyeshwar Road, Pune 411009</p>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-center text-muted-foreground">
                © {new Date().getFullYear()} PRASU Soft Lab Pvt. Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}