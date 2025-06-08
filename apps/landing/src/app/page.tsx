"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import {
  Vote,
  Palette,
  BarChart3,
  Search,
  Shield,
  Smartphone,
  Mail,
  HelpCircle,
  Clock,
  Check,
  ArrowRight,
  Star,
  Users,
  Zap,
  Menu,
  X,
  ChevronDown,
  Quote,
  TrendingUp,
  Globe,
  Award,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();

  const onThemeChangeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechFlow",
      avatar: "SC",
      content:
        "Aura transformed how we collect user feedback. Instead of scattered emails, we now have a clear priority list that drives our roadmap.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO at StartupLab",
      avatar: "MR",
      content:
        "Our users love having a voice in product development. Feature requests increased 300% and user satisfaction is at an all-time high.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Head of Product at DataViz",
      avatar: "EW",
      content:
        "The voting system is genius. We finally know which features our users actually want, not just the loudest voices in our inbox.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How quickly can I set up my feedback board?",
      answer:
        "You can have your feedback board up and running in under 5 minutes. Simply sign up, customize your board with your branding, and share the link with your users.",
    },
    {
      question: "Can I customize the look and feel to match my brand?",
      answer:
        "Absolutely! You can customize your board name, logo, colors, and even use a custom domain like yourcompany.aura.vote to maintain your brand consistency.",
    },
    {
      question: "How do you prevent spam and inappropriate content?",
      answer:
        "We provide built-in moderation tools that allow you to review and delete inappropriate requests. You can also set up approval workflows for new submissions.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "You own your data completely. You can export all your feedback and user data at any time, and we'll retain it for 30 days after cancellation for easy migration.",
    },
    {
      question: "Do you offer integrations with other tools?",
      answer:
        "Yes! We integrate with popular project management tools like Jira, Trello, and Asana. Our API also allows custom integrations with your existing workflow.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Feature Requests Collected" },
    { number: "500+", label: "Happy Businesses" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Enhanced Navigation */}
      <nav className='border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-8'>
              <div className='flex items-center space-x-2'>
                <Logo />
                <span className='text-xl font-bold text-foreground'>Aura</span>
              </div>

              {/* Desktop Navigation - moved to left */}
              <div className='hidden md:flex items-center space-x-8'>
                <a
                  href='#features'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  Features
                </a>
                <a
                  href='#testimonials'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  Testimonials
                </a>
                <a
                  href='#pricing'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  Pricing
                </a>
                <a
                  href='#faq'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Right side - only theme toggle and CTA */}
            <div className='hidden md:flex items-center space-x-4'>
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

              <Button className='transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden flex items-center space-x-2'>
              {/* Mobile Theme Toggle */}
              <Button
                onClick={onThemeChangeHandler}
                variant='outline'
                size='icon'
                className='cursor-pointer'
              >
                {theme === "light" ? (
                  <Moon className='w-4 h-4' />
                ) : (
                  <Sun className='w-4 h-4' />
                )}
              </Button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='text-foreground hover:text-primary transition-colors duration-200'
              >
                {mobileMenuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className='md:hidden border-t border-border bg-card/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-300'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                <a
                  href='#features'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href='#testimonials'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a
                  href='#pricing'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href='#faq'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <div className='px-3 py-2'>
                  <Button className='w-full'>Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className='relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-20 left-10 transform -rotate-12 hidden lg:block animate-bounce'>
            <div className='bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              LIVE
            </div>
          </div>

          <div className='absolute top-32 right-16 transform rotate-12 hidden lg:block animate-pulse'>
            <div className='bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg'>
              PLANNED
            </div>
          </div>

          <div className='absolute bottom-32 left-20 transform -rotate-6 hidden lg:block animate-spin-slow'>
            <Zap className='w-8 h-8 text-primary' />
          </div>

          <div className='absolute bottom-40 right-32 transform rotate-12 hidden lg:block animate-ping'>
            <Zap className='w-6 h-6 text-accent opacity-75' />
          </div>

          {/* Gradient orbs */}
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
        </div>

        <div className='max-w-7xl mx-auto text-center relative'>
          <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight'>
              Build products your users
              <br />
              <span className='relative inline-block'>
                actually want.
                <svg
                  className='absolute -bottom-2 left-0 w-full h-4 animate-in fade-in duration-1000 delay-500'
                  viewBox='0 0 400 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 15 Q 200 5 390 15'
                    stroke='currentColor'
                    strokeWidth='3'
                    fill='none'
                    className='text-primary/40'
                  />
                </svg>
              </span>
            </h1>
          </div>

          <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300'>
            <p className='text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed'>
              Stop wasting development time on features nobody uses.
              <br />
              Let your users vote and prioritize what matters most.
            </p>
          </div>

          <div className='flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500'>
            <Button
              size='lg'
              className='text-lg px-8 py-6 h-auto relative group transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary/25'
            >
              <Zap className='w-5 h-5 mr-2' />
              GET STARTED TODAY
              <div className='absolute inset-0 border-2 border-primary/30 rounded-lg group-hover:border-primary/50 transition-colors duration-300'></div>
            </Button>

            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Check className='w-4 h-4 text-primary' />
              No Setup Fees • Cancel Anytime • 14 Day Free Trial
            </div>
          </div>

          {/* Stats Section */}
          <div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='text-center group hover:scale-105 transition-transform duration-300'
              >
                <div className='text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors'>
                  {stat.number}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement - Enhanced */}
      <section className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Stop Guessing What Your Users Want
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Feedback scattered across emails, chats, and support tickets makes
              it impossible to identify what features matter most to your users.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                icon: Mail,
                title: "Scattered Feedback",
                description:
                  "Feature requests buried in emails, support tickets, and random conversations",
              },
              {
                icon: HelpCircle,
                title: "No Prioritization",
                description:
                  "Impossible to know which features are actually important to your users",
              },
              {
                icon: Clock,
                title: "Wasted Development",
                description:
                  "Building features nobody wants while ignoring what users actually need",
              },
            ].map((item, index) => (
              <div
                key={index}
                className='text-center group hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className='w-16 h-16 bg-muted/50 border border-border rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-muted/70 transition-colors duration-300'>
                  <item.icon className='w-8 h-8 text-muted-foreground' />
                </div>
                <h3 className='text-lg font-semibold text-foreground mb-3'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution - Enhanced */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Centralized, Transparent, User-Driven
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Aura provides a simple voting board where your users can submit
              and upvote feature requests, giving you clear insight into what
              matters most.
            </p>
          </div>
          <div className='bg-card border border-border rounded-xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300'>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h3 className='text-2xl font-bold text-foreground mb-6'>
                  See What Your Users Really Want
                </h3>
                <ul className='space-y-4'>
                  {[
                    "Users submit feature requests directly",
                    "Community upvotes show real demand",
                    "Automatic prioritization by popularity",
                    "Track progress with status updates",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className='flex items-start space-x-3 animate-in fade-in slide-in-from-left-4 duration-500'
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <Check className='w-4 h-4 text-primary-foreground' />
                      </div>
                      <span className='text-muted-foreground'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='bg-muted/50 rounded-lg p-6 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500'>
                <div className='space-y-4'>
                  {[
                    {
                      title: "Dark mode support",
                      votes: 24,
                      status: "Planned",
                      statusColor: "bg-accent text-accent-foreground",
                    },
                    {
                      title: "Mobile app",
                      votes: 18,
                      status: "In Progress",
                      statusColor: "bg-primary text-primary-foreground",
                    },
                    {
                      title: "API integration",
                      votes: 12,
                      status: "Submitted",
                      statusColor: "bg-muted text-muted-foreground",
                    },
                  ].map((request, index) => (
                    <div
                      key={index}
                      className='bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02] transform'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <h4 className='font-medium text-foreground'>
                          {request.title}
                        </h4>
                        <div className='flex items-center space-x-2'>
                          <span className='text-sm text-muted-foreground flex items-center gap-1'>
                            <Vote className='w-4 h-4' /> {request.votes}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${request.statusColor}`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {request.title === "Dark mode support" &&
                          "Add dark mode theme option for better user experience"}
                        {request.title === "Mobile app" &&
                          "Native mobile application for iOS and Android"}
                        {request.title === "API integration" &&
                          "REST API for custom integrations"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Enhanced */}
      <section id='features' className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Everything You Need to Get Started
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Aura includes all the essential features to start collecting and
              managing user feedback effectively.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                icon: Vote,
                title: "Public Voting Board",
                description:
                  "Users can submit requests and upvote existing ones. One vote per request keeps it fair.",
              },
              {
                icon: Palette,
                title: "Custom Branding",
                description:
                  "Customize your board name, logo, and colors to match your brand identity.",
              },
              {
                icon: BarChart3,
                title: "Status Management",
                description:
                  "Track progress with statuses: Planned, In Progress, Completed, or Closed.",
              },
              {
                icon: Search,
                title: "Search & Filter",
                description:
                  "Users can easily find and filter through requests to discover existing ideas.",
              },
              {
                icon: Shield,
                title: "Moderation Tools",
                description:
                  "Delete inappropriate requests and maintain a clean, professional board.",
              },
              {
                icon: Smartphone,
                title: "Mobile Responsive",
                description:
                  "Works perfectly on all devices - desktop, tablet, and mobile.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className='bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300'>
                  <feature.icon className='w-6 h-6 text-primary' />
                </div>
                <h3 className='text-lg font-semibold text-foreground mb-2'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section id='testimonials' className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Loved by Product Teams Worldwide
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              See how teams are using Aura to build better products with
              user-driven feedback.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className='bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-4'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className='font-semibold text-foreground'>
                      {testimonial.name}
                    </h4>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className='flex mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 text-yellow-400 fill-current'
                    />
                  ))}
                </div>
                <Quote className='w-6 h-6 text-muted-foreground mb-2' />
                <p className='text-muted-foreground italic'>
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              How It Works
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Get started with Aura in minutes. No complex setup required.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                step: "1",
                title: "Create Your Board",
                description:
                  "Sign up and create your feedback board with custom branding in seconds.",
              },
              {
                step: "2",
                title: "Share With Users",
                description:
                  "Get a unique URL (e.g., yourcompany.aura.vote) to share with your users.",
              },
              {
                step: "3",
                title: "Collect & Prioritize",
                description:
                  "Watch as users submit and vote on requests, automatically prioritizing by popularity.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className='text-center group hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300'>
                  <span className='text-primary-foreground font-bold text-xl'>
                    {item.step}
                  </span>
                </div>
                <h3 className='text-lg font-semibold text-foreground mb-3'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Enhanced */}
      <section id='pricing' className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Simple, Transparent Pricing
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Choose the plan that fits your needs. All plans include our core
              features with no hidden fees.
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <div className='bg-card border border-border rounded-lg p-8 hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-1000'>
              <h3 className='text-2xl font-bold text-foreground mb-2'>Plus</h3>
              <p className='text-muted-foreground mb-6'>
                Perfect for small teams and startups
              </p>
              <div className='text-4xl font-bold text-foreground mb-6'>
                $9<span className='text-lg text-muted-foreground'>/month</span>
              </div>
              <ul className='space-y-3 mb-8'>
                {[
                  "1 Project",
                  "Unlimited Users",
                  "Product Roadmap",
                  "Changelog",
                  "Email Support",
                ].map((feature, index) => (
                  <li key={index} className='flex items-center space-x-3'>
                    <Check className='w-5 h-5 text-primary' />
                    <span className='text-muted-foreground'>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant='outline'
                className='w-full hover:scale-105 transition-transform duration-200'
              >
                Get Started with Plus
              </Button>
            </div>
            <div className='bg-card border-2 border-primary rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-1000'>
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                <span className='bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg'>
                  <Star className='w-4 h-4' />
                  Most Popular
                </span>
              </div>
              <h3 className='text-2xl font-bold text-foreground mb-2'>Pro</h3>
              <p className='text-muted-foreground mb-6'>
                For growing businesses and teams
              </p>
              <div className='text-4xl font-bold text-foreground mb-6'>
                $29<span className='text-lg text-muted-foreground'>/month</span>
              </div>
              <ul className='space-y-3 mb-8'>
                {[
                  "3 Projects",
                  "Unlimited Users",
                  "Product Roadmap",
                  "Changelog",
                  "Priority Support",
                ].map((feature, index) => (
                  <li key={index} className='flex items-center space-x-3'>
                    <Check className='w-5 h-5 text-primary' />
                    <span className='text-muted-foreground'>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className='w-full hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                Get Started with Pro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section id='faq' className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-muted-foreground'>
              Everything you need to know about Aura and how it works.
            </p>
          </div>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-card border border-border rounded-lg animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200 rounded-lg'
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className='font-semibold text-foreground'>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className='px-6 pb-4 animate-in slide-in-from-top-2 duration-300'>
                    <p className='text-muted-foreground'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Roadmap Section - New */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              What&apos; Coming Next
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              We&apos;re constantly improving Aura. Here&apos;s what we&apos;re
              working on to make your feedback management even better.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: Mail,
                title: "Email Notifications & Updates",
                description:
                  "Get notified when users submit new requests or when feature statuses change. Stay in the loop automatically.",
                status: "Coming Soon",
                statusColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
              },
              {
                icon: Globe,
                title: "Custom Domain",
                description:
                  "Use your own domain like feedback.yourcompany.com instead of yourcompany.aura.vote for better branding.",
                status: "In Development",
                statusColor:
                  "bg-orange-500/10 text-orange-600 border-orange-500/20",
              },
              {
                icon: TrendingUp,
                title: "Embedded Widget",
                description:
                  "Add a simple <script> tag to embed feedback collection directly on your website or app.",
                status: "Planned",
                statusColor:
                  "bg-purple-500/10 text-purple-600 border-purple-500/20",
              },
              {
                icon: Quote,
                title: "Comments System",
                description:
                  "Allow users to discuss and collaborate on feature requests with threaded comments and replies.",
                status: "Planned",
                statusColor:
                  "bg-green-500/10 text-green-600 border-green-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className='bg-card border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-in fade-in slide-in-from-bottom-4'
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300'>
                    <item.icon className='w-6 h-6 text-primary' />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className='text-lg font-semibold text-foreground mb-3'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className='text-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700'>
            <p className='text-muted-foreground mb-4'>
              Have a feature request or suggestion?
            </p>
            <Button
              variant='outline'
              className='hover:scale-105 transition-transform duration-200'
            >
              <Vote className='w-4 h-4 mr-2' />
              Submit Your Idea
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Ready to Know What Your Users Really Want?
            </h2>
            <p className='text-lg text-muted-foreground mb-8'>
              Join thousands of businesses who are building better products with
              user-driven feedback.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='lg'
                className='text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary/25'
              >
                <Users className='w-5 h-5 mr-2' />
                Start with Plus Plan
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='text-lg transform hover:scale-105 transition-all duration-300'
              >
                Schedule Demo
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className='border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
              <div className='flex items-center space-x-2 mb-4'>
                <Logo />
                <span className='text-xl font-bold text-foreground'>Aura</span>
              </div>
              <p className='text-muted-foreground mb-4'>
                Simple feature request management for modern businesses.
              </p>
              <div className='flex space-x-4'>
                <div className='w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer'>
                  <Globe className='w-4 h-4' />
                </div>
                <div className='w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer'>
                  <Award className='w-4 h-4' />
                </div>
              </div>
            </div>

            <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200'>
              <h4 className='font-semibold text-foreground mb-4'>Legal</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='/terms'
                    className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform inline-block'
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    href='/refund'
                    className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform inline-block'
                  >
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href='/privacy'
                    className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform inline-block'
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-border mt-8 pt-8 text-center animate-in fade-in duration-1000 delay-1000'>
            <p className='text-muted-foreground'>
              © 2024 Aura. All rights reserved. Built with ❤️ for product
              teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
