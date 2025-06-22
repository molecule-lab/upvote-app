"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function RefundPage() {
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
            Refund Policy
          </h1>
          <p className='text-muted-foreground mb-8'>Last updated: June 2025</p>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              1. Overview
            </h2>
            <p className='text-muted-foreground mb-4'>
              At Aura, we want you to be completely satisfied with our service.
              This Refund Policy outlines the conditions under which refunds may
              be issued and how to request them.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              2. 14-Day Money-Back Guarantee
            </h2>
            <p className='text-muted-foreground mb-4'>
              We offer a 14-day money-back guarantee for all paid subscriptions.
              If you're not satisfied with Aura within the first 14 days of your
              paid subscription, you may request a full refund.
            </p>
            <p className='text-muted-foreground mb-4'>To qualify:</p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                Your refund request must be made within 14 days of your first
                payment
              </li>
              <li>You must provide a brief explanation for the request</li>
              <li>Your account must not have violated our Terms of Service</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              3. Subscription Cancellation
            </h2>
            <p className='text-muted-foreground mb-4'>
              You can cancel your subscription anytime via your account
              settings. Upon cancellation:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>
                Your subscription remains active through the current billing
                cycle
              </li>
              <li>All premium features stay available until expiration</li>
              <li>
                No refund is issued for unused time outside the 14-day guarantee
                window
              </li>
              <li>
                Your account will automatically downgrade to the free plan
              </li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              4. Exceptional Circumstances
            </h2>
            <p className='text-muted-foreground mb-4'>
              In rare cases, we may approve refunds beyond our standard policy,
              such as:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Extended outages that significantly disrupt usage</li>
              <li>Billing mistakes or duplicate charges</li>
              <li>Critical technical issues preventing service access</li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              All such requests are assessed individually and refunds are
              granted at our sole discretion.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              5. How to Request a Refund
            </h2>
            <p className='text-muted-foreground mb-4'>
              To request a refund, email our support team at{" "}
              <strong>hello@aura.vote</strong> with:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>The email associated with your Aura account</li>
              <li>The reason for your request</li>
              <li>Any relevant context or supporting details</li>
            </ul>
            <p className='text-muted-foreground mb-4'>
              We typically respond within 2–3 business days.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              6. Processing Time
            </h2>
            <p className='text-muted-foreground mb-4'>
              Once a refund is approved, it will be processed within 5–10
              business days. The refund will be issued to the original payment
              method used.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              7. Non-Refundable Items
            </h2>
            <p className='text-muted-foreground mb-4'>
              Refunds are not available for:
            </p>
            <ul className='list-disc list-inside text-muted-foreground mb-4 space-y-2'>
              <li>Custom development or consulting services</li>
              <li>Third-party integrations or extensions</li>
              <li>Accounts terminated for Terms of Service violations</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              8. Changes to This Policy
            </h2>
            <p className='text-muted-foreground mb-4'>
              We may update this Refund Policy at any time. Changes take effect
              immediately upon publication. We will notify active subscribers of
              any material updates via email.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-foreground mb-4'>
              9. Contact Us
            </h2>
            <p className='text-muted-foreground mb-4'>
              If you have questions or concerns about this Refund Policy, reach
              out to us at:
            </p>
            <ul className='list-none text-muted-foreground mb-4 space-y-2'>
              <li>Email: hello@aura.vote</li>
              <li>Subject: Refund Policy Inquiry</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
