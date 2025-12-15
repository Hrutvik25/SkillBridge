import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "About Us", href: "/about" },
    { name: "Our Mentors", href: "/mentors" },
    { name: "Domains", href: "/domains" },
  ],
  support: [
    { name: "All Courses", href: "/courses" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ],
  legal: [
    { name: "Help", href: "/support" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1Bo5a6KmQb/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/skillbridgeofficial_?igsh=MXUxaTBoeGZoenUwOA==" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/skill-bridge-prasu-soft-lab/about/?viewAsMember=true" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/images/Skill-Bridge-Logo.jpg" 
                alt="SkillBridge Hub Logo" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold font-display">SKILLBRIDGE</span>
            </Link>
            <p className="text-sm text-background/70 mb-6 leading-relaxed">
              SKILLBRIDGE, Product of PRASU Soft Lab, is a domain-driven platform that connects education with industry. 
              Through modular coaching and precision hiring tools, we empower students, institutions, and companies to achieve real-world impact.
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+918788069300" className="hover:text-accent transition-colors">+91 87880 69300</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:Prasulabs@gmail.com" className="hover:text-accent transition-colors">Prasulabs@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>A 702, Ruturang Society Phase 1, Aranyeshwar Road, Pune 411009</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold mb-4">EXPLORE</h3>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">CONTACT</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+918788069300"
                    className="text-sm text-background/70 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    +91 87880 69300
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Prasulabs@gmail.com"
                    className="text-sm text-background/70 hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Prasulabs@gmail.com
                  </a>
                </li>
              </ul>
              
              {/* Map moved here and made smaller */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Find Us</h3>
                <div className="rounded-lg overflow-hidden border border-background/10 shadow-md bg-background">
                  <iframe
                    title="SKILLBRIDGE Location"
                    src="https://www.google.com/maps?q=A%20702%2C%20Ruturang%20Society%20Phase%201%2C%20Aranyeshwar%20Road%2C%20Pune%20411009&output=embed"
                    width="100%"
                    height="150"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href="https://maps.app.goo.gl/ZzeekqhX6yngLvsFA"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-xs text-background/70 hover:text-accent px-2 py-1"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            Copyright © {new Date().getFullYear()} PRASU Soft Lab Pvt. Ltd.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-accent transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}