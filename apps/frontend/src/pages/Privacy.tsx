import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Last Updated: December 10, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
            <p className="lead">
              SKILLBRIDGE ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information.
            </p>
            <p>
              By using our website or services, you consent to the practices described below.
            </p>

            <hr className="my-8 border-border" />

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">a) Personal Information</h3>
            <p>When you register, contact us, or sign up for courses, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Educational or professional details (if required)</li>
              <li>Payment information (handled securely by payment gateways, not stored by us)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">b) Non-Personal Information</h3>
            <p>We may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser details</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Cookies and tracking information</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use collected data for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing and improving our services</li>
              <li>Communicating course updates, confirmations, alerts, and support</li>
              <li>Sending newsletters or promotional information (opt-out anytime)</li>
              <li>Enhancing site user experience</li>
              <li>Compliance with legal or regulatory obligations</li>
            </ul>
            <p className="mt-4">We do not sell or rent your information to third parties.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies & Tracking Technologies</h2>
            <p>SKILLBRIDGE uses cookies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Saving preferences</li>
              <li>Analytics and performance tracking</li>
              <li>Personalized browsing experience</li>
            </ul>
            <p className="mt-4">You may disable cookies in your browser, but some features may not work correctly.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
            <p>We may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers: payment gateways, hosting providers, analytics tools</li>
              <li>Legal authorities: when required for compliance, fraud prevention, or legal requests</li>
            </ul>
            <p className="mt-4">We do not share personal data with advertisers without consent.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>We use industry-standard security measures to protect your data.</p>
            <p className="mt-4">However, no online platform is 100% secure, and we cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. User Rights</h2>
            <p>You may request to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Update or correct information</li>
              <li>Delete your account</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="mt-4">Contact us at Prasulabs@gmail.com for any data-related requests.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
            <p>We retain your information only for as long as required:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For providing services</li>
              <li>For legal obligations</li>
              <li>For resolving disputes</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>SKILLBRIDGE does not knowingly collect information from children under 18 years.</p>
            <p className="mt-4">If you believe a child has provided data, contact us to remove it.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to Policy</h2>
            <p>We may update this Privacy Policy at any time. The updated policy will be posted with a new revision date.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>For privacy concerns, write to:</p>
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