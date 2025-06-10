import Logo from "@/components/logo";
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
              <div className='flex items-center space-x-2'>
                <Logo />
                <span className='text-xl font-bold text-foreground'>Aura</span>
              </div>
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
              By accessing and using Aura ("the Service"), you accept and agree
              to be bound by these Terms and Conditions. If you do not agree,
              please do not use the Service.
            </p>
            <p className='text-muted-foreground mb-4'>
              You must be at least 18 years old to use the Service. If you are
              using the Service on behalf of an organization, you represent that
              you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              2. Description of Service
            </h2>
            <p className='text-muted-foreground mb-4'>
              Aura is a feature request management platform that allows
              businesses to collect, prioritize, and manage user feedback
              through customizable voting boards. The Service includes user
              voting, feedback management, customization options, and analytics
              tools.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. User Accounts
            </h2>
            <p className='text-muted-foreground mb-4'>
              To access certain features of the Service, you must create an
              account. You agree to:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account details</li>
              <li>Keep your password confidential</li>
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
              <li>Infringe on any intellectual property rights</li>
              <li>Submit false, misleading, or inappropriate content</li>
              <li>Attempt unauthorized access to any part of the Service</li>
              <li>Disrupt the normal functioning of the Service or servers</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. Content and Intellectual Property
            </h2>
            <p className='text-muted-foreground mb-4'>
              You retain ownership of content you submit to the Service. By
              submitting content, you grant Aura a non-exclusive, worldwide,
              royalty-free license to use, reproduce, display, and distribute
              your content solely for the purpose of operating, improving, and
              promoting the Service.
            </p>
            <p className='text-muted-foreground mb-4'>
              The Service and its original content, features, and functionality
              are the exclusive property of Aura and are protected by
              international intellectual property laws.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Privacy
            </h2>
            <p className='text-muted-foreground mb-4'>
              Your privacy is important to us. Please review our Privacy Policy,
              which governs your use of the Service and explains our data
              practices.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Termination
            </h2>
            <p className='text-muted-foreground mb-4'>
              We reserve the right to suspend or terminate your account and
              access to the Service at our sole discretion, without notice or
              liability, if you violate these Terms or for any other reason.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Third-Party Services
            </h2>
            <p className='text-muted-foreground mb-4'>
              The Service may integrate with or contain links to third-party
              services. Aura is not responsible for the content, privacy
              policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Beta Features
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may offer experimental or beta features as part of the Service.
              These features are provided "as is" and may be modified or
              discontinued at any time.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              10. Refund and Cancellation
            </h2>
            <p className='text-muted-foreground mb-4'>
              Your use of the Service is also governed by our Refund and
              Cancellation Policy, which can be found at{" "}
              <a
                href='https://aura.vote/refund'
                className='underline text-primary'
              >
                Refund Policy
              </a>
              .
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              11. Disclaimer
            </h2>
            <p className='text-muted-foreground mb-4'>
              The Service is provided on an "as is" and "as available" basis
              without warranties of any kind. To the maximum extent permitted by
              law, Aura disclaims all warranties, express or implied.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              12. Limitation of Liability
            </h2>
            <p className='text-muted-foreground mb-4'>
              In no event shall Aura, its affiliates, officers, employees, or
              agents be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of profits,
              data, or goodwill.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              13. Changes to Terms
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may revise these Terms at any time. If changes are material, we
              will notify you by email or through a prominent notice on the
              Service at least 30 days before they take effect.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              14. Governing Law
            </h2>
            <p className='text-muted-foreground mb-4'>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Delaware, USA. You agree to submit to the
              exclusive jurisdiction of the courts located in Delaware.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              15. Contact Information
            </h2>
            <p className='text-muted-foreground mb-4'>
              If you have any questions about these Terms, please contact us at
              hello@aura.vote.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
