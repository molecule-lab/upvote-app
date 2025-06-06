import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className='text-muted-foreground mb-8'>
            Last updated: December 2024
          </p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              1. Introduction
            </h2>
            <p className='text-muted-foreground mb-4'>
              At Upzy, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our feature request management platform.
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
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Register for an account</li>
              <li>Use our services</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              This information may include: name, email address, company name,
              and payment information.
            </p>

            <h3 className='text-xl font-semibold text-foreground mb-3'>
              Usage Data
            </h3>
            <p className='text-muted-foreground mb-4'>
              We automatically collect certain information when you access our
              service, including:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our service</li>
              <li>Device information and operating system</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. How We Use Your Information
            </h2>
            <p className='text-muted-foreground mb-4'>
              We use the information we collect to:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Provide, operate, and maintain our service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our service and develop new features</li>
              <li>Monitor usage and analyze trends</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              4. Information Sharing and Disclosure
            </h2>
            <p className='text-muted-foreground mb-4'>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties except in the following
              circumstances:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                <strong>Service Providers:</strong> We may share information
                with trusted third-party service providers who assist us in
                operating our service
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information
                if required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> Information may be
                transferred in connection with a merger, acquisition, or sale of
                assets
              </li>
              <li>
                <strong>Consent:</strong> We may share information with your
                explicit consent
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. Data Security
            </h2>
            <p className='text-muted-foreground mb-4'>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Data Retention
            </h2>
            <p className='text-muted-foreground mb-4'>
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. When you
              delete your account, we will delete your personal information
              within 30 days, except where we are required to retain it for
              legal purposes.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Your Rights and Choices
            </h2>
            <p className='text-muted-foreground mb-4'>
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                <strong>Access:</strong> Request access to your personal
                information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your data in a
                portable format
              </li>
              <li>
                <strong>Objection:</strong> Object to certain processing of your
                information
              </li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              To exercise these rights, please contact us at privacy@upzy.com.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Cookies and Tracking Technologies
            </h2>
            <p className='text-muted-foreground mb-4'>
              We use cookies and similar tracking technologies to enhance your
              experience on our service. Cookies are small data files stored on
              your device. You can control cookie settings through your browser
              preferences.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Third-Party Links
            </h2>
            <p className='text-muted-foreground mb-4'>
              Our service may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              10. Children's Privacy
            </h2>
            <p className='text-muted-foreground mb-4'>
              Our service is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected personal information
              from a child under 13, we will take steps to delete such
              information.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              11. International Data Transfers
            </h2>
            <p className='text-muted-foreground mb-4'>
              Your information may be transferred to and processed in countries
              other than your own. We ensure that such transfers comply with
              applicable data protection laws and implement appropriate
              safeguards.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              12. Changes to This Privacy Policy
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new Privacy
              Policy on this page and updating the "Last updated" date. We
              encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              13. Contact Us
            </h2>
            <p className='text-muted-foreground mb-4'>
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <ul className='list-none text-muted-foreground mb-4 space-y-2'>
              <li>Email: privacy@upzy.com</li>
              <li>Subject: Privacy Policy Inquiry</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
