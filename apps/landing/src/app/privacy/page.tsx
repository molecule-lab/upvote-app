"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function PrivacyPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onThemeChangeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header
        className={`border-b border-border backdrop-blur-md z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 shadow-lg mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 rounded-xl border-border/50 fixed top-2 left-0 right-0 backdrop-blur-md"
            : "bg-card/80 border-border sticky top-0"
        }`}
      >
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "max-w-4xl" : "max-w-4xl"
          }`}
        >
          <div className='flex justify-between items-center transition-all duration-300 h-16'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='flex items-center space-x-2'>
                <Logo />
                <span className='text-xl font-bold text-foreground'>Aura</span>
              </div>
            </Link>
            <div
              className={`flex items-center transition-all duration-300 ${
                isScrolled ? "space-x-2" : "space-x-4"
              }`}
            >
              {/* Theme Toggle Button */}
              <Button
                onClick={onThemeChangeHandler}
                variant='outline'
                size='icon'
                className='cursor-pointer hover:scale-105 transition-transform duration-200'
              >
                {theme === "light" ? (
                  <Moon className='w-4 h-4' />
                ) : (
                  <Sun className='w-4 h-4' />
                )}
              </Button>
              <Link href='/'>
                <Button variant='outline' size='sm'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='prose prose-gray dark:prose-invert max-w-none'>
          <h1 className='text-4xl font-bold text-foreground mb-8'>
            Privacy Policy
          </h1>
          <p className='text-muted-foreground mb-8'>Last updated: June 2025</p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              1. Introduction
            </h2>
            <p className='text-muted-foreground mb-4'>
              At Aura, your privacy matters. This Privacy Policy describes how
              we collect, use, and protect your personal information when you
              use our feature request management platform.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              2. Information We Collect
            </h2>

            <h3 className='text-xl font-semibold text-foreground mb-3'>
              Personal Information
            </h3>
            <p className='text-muted-foreground mb-4'>
              We collect information you voluntarily provide, such as when you:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Register for an account</li>
              <li>Use our services</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              This may include your name, email address, company name, and
              payment information.
            </p>

            <h3 className='text-xl font-semibold text-foreground mb-3'>
              Usage Data
            </h3>
            <p className='text-muted-foreground mb-4'>
              We automatically collect technical information such as:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent</li>
              <li>Device and operating system details</li>
              <li>Referring URLs</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. Legal Basis for Processing
            </h2>
            <p className='text-muted-foreground mb-4'>
              We process your personal data under the following legal bases:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Your consent</li>
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests (e.g. to improve the platform)</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              4. How We Use Your Information
            </h2>
            <p className='text-muted-foreground mb-4'>We use your data to:</p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Operate and maintain the Service</li>
              <li>Process payments and provide customer support</li>
              <li>Send updates, product announcements, or newsletters</li>
              <li>Respond to inquiries and support requests</li>
              <li>Enhance product features and user experience</li>
              <li>Ensure platform security and detect abuse or fraud</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. Information Sharing and Disclosure
            </h2>
            <p className='text-muted-foreground mb-4'>
              We do not sell or rent your data. We may share it with:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                <strong>Service providers</strong> who help us operate and
                secure the platform
              </li>
              <li>
                <strong>Authorities</strong> if required by law or legal process
              </li>
              <li>
                <strong>Buyers</strong> in case of a merger or acquisition
              </li>
              <li>
                <strong>With your consent</strong> or at your direction
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Data Security
            </h2>
            <p className='text-muted-foreground mb-4'>
              We take data protection seriously and implement safeguards such
              as:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Encryption (TLS/SSL) for data in transit</li>
              <li>Access control and 2FA for sensitive systems</li>
              <li>Periodic vulnerability scans and audits</li>
              <li>Staff training in security and data protection</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Data Retention
            </h2>
            <p className='text-muted-foreground mb-4'>
              We retain personal data only as long as necessary for the purpose
              it was collected. Upon account deletion, we aim to remove personal
              data within 30 days, unless required for legal compliance.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Your Rights
            </h2>
            <p className='text-muted-foreground mb-4'>
              You may have the following rights depending on your jurisdiction:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Access, update, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
              <li>Object to or restrict certain processing</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              To exercise these rights, contact us at hello@aura.vote.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Cookies and Tracking
            </h2>
            <p className='text-muted-foreground mb-4'>
              We use cookies and similar technologies to analyze usage and
              personalize your experience. You can manage cookies via your
              browser settings.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              10. Third-Party Links
            </h2>
            <p className='text-muted-foreground mb-4'>
              Our platform may contain links to third-party sites. We are not
              responsible for their content or privacy practices. Please review
              their privacy policies.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              11. Children's Privacy
            </h2>
            <p className='text-muted-foreground mb-4'>
              Our services are not intended for children under 13. We do not
              knowingly collect information from children under 13. If we become
              aware of such data, we will delete it.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              12. International Transfers
            </h2>
            <p className='text-muted-foreground mb-4'>
              Your data may be processed in countries outside your own. We use
              lawful mechanisms (such as Standard Contractual Clauses) to ensure
              adequate protection.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              13. Changes to This Policy
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may update this Privacy Policy. If changes are material, we
              will notify you via email or a notice on our platform. Review this
              page periodically for updates.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              14. Contact Us
            </h2>
            <p className='text-muted-foreground mb-4'>
              For questions or concerns, reach out to:
            </p>
            <ul className='list-none text-muted-foreground mb-4 space-y-2'>
              <li>Email: hello@aura.vote</li>
              <li>Subject: Privacy Policy Inquiry</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
