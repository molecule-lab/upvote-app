import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <span className='text-primary-foreground font-bold text-lg'>
                  U
                </span>
              </div>
              <span className='text-xl font-bold text-foreground'>Upzy</span>
            </Link>
            <Link href='/'>
              <Button variant='outline' size='sm'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='prose prose-gray dark:prose-invert max-w-none'>
          <h1 className='text-4xl font-bold text-foreground mb-8'>
            Terms and Conditions
          </h1>
          <p className='text-muted-foreground mb-8'>
            Last updated: December 2024
          </p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              1. Acceptance of Terms
            </h2>
            <p className='text-muted-foreground mb-4'>
              By accessing and using Upzy (&quot;the Service&quot;), you accept
              and agree to be bound by the terms and provision of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              2. Description of Service
            </h2>
            <p className='text-muted-foreground mb-4'>
              Upzy is a feature request management platform that allows
              businesses to collect, prioritize, and manage user feedback
              through customizable voting boards. The service includes user
              voting, feedback management, customization options, and analytics
              features.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. User Accounts
            </h2>
            <p className='text-muted-foreground mb-4'>
              To access certain features of the Service, you must register for
              an account. You agree to:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                Provide accurate, current, and complete information during
                registration
              </li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              4. Acceptable Use
            </h2>
            <p className='text-muted-foreground mb-4'>
              You agree not to use the Service to:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Submit false, misleading, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. Content and Intellectual Property
            </h2>
            <p className='text-muted-foreground mb-4'>
              You retain ownership of content you submit to the Service. By
              submitting content, you grant Upzy a non-exclusive, worldwide,
              royalty-free license to use, display, and distribute your content
              in connection with the Service.
            </p>
            <p className='text-muted-foreground mb-4'>
              The Service and its original content, features, and functionality
              are owned by Upzy and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Privacy
            </h2>
            <p className='text-muted-foreground mb-4'>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Termination
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Disclaimer
            </h2>
            <p className='text-muted-foreground mb-4'>
              The information on this service is provided on an &quot;as
              is&quot; basis. To the fullest extent permitted by law, this
              Company excludes all representations, warranties, conditions and
              terms.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Limitation of Liability
            </h2>
            <p className='text-muted-foreground mb-4'>
              In no event shall Upzy, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              10. Changes to Terms
            </h2>
            <p className='text-muted-foreground mb-4'>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days notice
              prior to any new terms taking effect.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              11. Contact Information
            </h2>
            <p className='text-muted-foreground mb-4'>
              If you have any questions about these Terms and Conditions, please
              contact us at legal@upzy.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
