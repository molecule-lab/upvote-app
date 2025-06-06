import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RefundPage() {
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
            Refund Policy
          </h1>
          <p className='text-muted-foreground mb-8'>
            Last updated: December 2024
          </p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              1. Overview
            </h2>
            <p className='text-muted-foreground mb-4'>
              At Upzy, we want you to be completely satisfied with our service.
              This Refund Policy explains the circumstances under which refunds
              may be provided and the process for requesting them.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              2. 30-Day Money-Back Guarantee
            </h2>
            <p className='text-muted-foreground mb-4'>
              We offer a 30-day money-back guarantee for all paid subscriptions.
              If you are not satisfied with our service within the first 30 days
              of your paid subscription, you may request a full refund.
            </p>
            <p className='text-muted-foreground mb-4'>
              To be eligible for the 30-day money-back guarantee:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                The refund request must be made within 30 days of your first
                payment
              </li>
              <li>You must provide a reason for the refund request</li>
              <li>Your account must not have violated our Terms of Service</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. Subscription Cancellation
            </h2>
            <p className='text-muted-foreground mb-4'>
              You can cancel your subscription at any time through your account
              settings. Upon cancellation:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                Your subscription will remain active until the end of the
                current billing period
              </li>
              <li>
                You will continue to have access to all paid features until the
                subscription expires
              </li>
              <li>
                No refund will be provided for the remaining time in the current
                billing period (except within the 30-day guarantee period)
              </li>
              <li>
                Your account will automatically downgrade to the free plan after
                expiration
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              4. Exceptional Circumstances
            </h2>
            <p className='text-muted-foreground mb-4'>
              In exceptional circumstances, we may consider refund requests
              outside of our standard policy. These may include:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                Extended service outages that significantly impact your ability
                to use the service
              </li>
              <li>Billing errors or duplicate charges</li>
              <li>
                Technical issues that prevent you from using the service as
                intended
              </li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              Each case will be reviewed individually, and refunds are at our
              sole discretion.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. How to Request a Refund
            </h2>
            <p className='text-muted-foreground mb-4'>
              To request a refund, please contact our support team at
              support@upzy.com with the following information:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Your account email address</li>
              <li>The reason for your refund request</li>
              <li>
                Any relevant details about your experience with our service
              </li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              We will respond to your refund request within 2-3 business days.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Processing Time
            </h2>
            <p className='text-muted-foreground mb-4'>
              Once a refund is approved, it will be processed within 5-10
              business days. The refund will be credited back to the original
              payment method used for the purchase.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Non-Refundable Items
            </h2>
            <p className='text-muted-foreground mb-4'>
              The following are not eligible for refunds:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Custom development work or professional services</li>
              <li>Third-party integrations or add-ons</li>
              <li>Accounts terminated for violation of Terms of Service</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Changes to This Policy
            </h2>
            <p className='text-muted-foreground mb-4'>
              We reserve the right to modify this Refund Policy at any time.
              Changes will be effective immediately upon posting on our website.
              We will notify existing customers of any material changes via
              email.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Contact Us
            </h2>
            <p className='text-muted-foreground mb-4'>
              If you have any questions about this Refund Policy, please contact
              us at:
            </p>
            <ul className='list-none text-muted-foreground mb-4 space-y-2'>
              <li>Email: support@upzy.com</li>
              <li>Subject: Refund Policy Inquiry</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
