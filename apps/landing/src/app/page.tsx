import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Navigation */}
      <nav className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <span className='text-primary-foreground font-bold text-lg'>
                  A
                </span>
              </div>
              <span className='text-xl font-bold text-foreground'>Aura</span>
            </div>
            <div className='flex items-center space-x-4'>
              <a
                href='#features'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Features
              </a>
              <a
                href='#pricing'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Pricing
              </a>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* Decorative Elements */}
        <div className='absolute top-20 left-10 transform -rotate-12 hidden lg:block'>
          <div className='bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            LIVE
          </div>
        </div>

        <div className='absolute top-32 right-16 transform rotate-12 hidden lg:block'>
          <div className='bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium'>
            PLANNED
          </div>
        </div>

        <div className='absolute bottom-32 left-20 transform -rotate-6 hidden lg:block'>
          <Zap className='w-8 h-8 text-primary' />
        </div>

        <div className='absolute bottom-40 right-32 transform rotate-12 hidden lg:block'>
          <Zap className='w-6 h-6 text-accent' />
        </div>

        <div className='max-w-7xl mx-auto text-center relative'>
          <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight'>
            Build products your users
            <br />
            <span className='relative inline-block'>
              actually want.
              <svg
                className='absolute -bottom-2 left-0 w-full h-4'
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

          <p className='text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed'>
            Stop wasting development time on features nobody uses.
            <br />
            Let your users vote and prioritize what matters most.
          </p>

          <div className='flex flex-col items-center gap-6'>
            <Button
              size='lg'
              className='text-lg px-8 py-6 h-auto relative group'
            >
              <Zap className='w-5 h-5 mr-2' />
              14-DAY FREE TRIAL
              <div className='absolute inset-0 border-2 border-primary/30 rounded-lg group-hover:border-primary/50 transition-colors'></div>
            </Button>

            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Check className='w-4 h-4 text-primary' />
              No Credit Card - 14-day free trial
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Stop Guessing What Your Users Want
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Feedback scattered across emails, chats, and support tickets makes
              it impossible to identify what features matter most to your users.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Mail className='w-8 h-8 text-destructive' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                Scattered Feedback
              </h3>
              <p className='text-muted-foreground'>
                Feature requests buried in emails, support tickets, and random
                conversations
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <HelpCircle className='w-8 h-8 text-destructive' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                No Prioritization
              </h3>
              <p className='text-muted-foreground'>
                Impossible to know which features are actually important to your
                users
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                <Clock className='w-8 h-8 text-destructive' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                Wasted Development
              </h3>
              <p className='text-muted-foreground'>
                Building features nobody wants while ignoring what users
                actually need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Centralized, Transparent, User-Driven
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Upzy provides a simple voting board where your users can submit
              and upvote feature requests, giving you clear insight into what
              matters most.
            </p>
          </div>
          <div className='bg-card border border-border rounded-xl p-8 shadow-lg'>
            <div className='grid lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h3 className='text-2xl font-bold text-foreground mb-6'>
                  See What Your Users Really Want
                </h3>
                <ul className='space-y-4'>
                  <li className='flex items-start space-x-3'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Check className='w-4 h-4 text-primary-foreground' />
                    </div>
                    <span className='text-muted-foreground'>
                      Users submit feature requests directly
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Check className='w-4 h-4 text-primary-foreground' />
                    </div>
                    <span className='text-muted-foreground'>
                      Community upvotes show real demand
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Check className='w-4 h-4 text-primary-foreground' />
                    </div>
                    <span className='text-muted-foreground'>
                      Automatic prioritization by popularity
                    </span>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <Check className='w-4 h-4 text-primary-foreground' />
                    </div>
                    <span className='text-muted-foreground'>
                      Track progress with status updates
                    </span>
                  </li>
                </ul>
              </div>
              <div className='bg-muted/50 rounded-lg p-6'>
                <div className='space-y-4'>
                  <div className='bg-card border border-border rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-medium text-foreground'>
                        Dark mode support
                      </h4>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm text-muted-foreground flex items-center gap-1'>
                          <Vote className='w-4 h-4' /> 24
                        </span>
                        <span className='bg-accent text-accent-foreground px-2 py-1 rounded text-xs'>
                          Planned
                        </span>
                      </div>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Add dark mode theme option for better user experience
                    </p>
                  </div>
                  <div className='bg-card border border-border rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-medium text-foreground'>
                        Mobile app
                      </h4>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm text-muted-foreground flex items-center gap-1'>
                          <Vote className='w-4 h-4' /> 18
                        </span>
                        <span className='bg-primary text-primary-foreground px-2 py-1 rounded text-xs'>
                          In Progress
                        </span>
                      </div>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Native mobile application for iOS and Android
                    </p>
                  </div>
                  <div className='bg-card border border-border rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <h4 className='font-medium text-foreground'>
                        API integration
                      </h4>
                      <div className='flex items-center space-x-2'>
                        <span className='text-sm text-muted-foreground flex items-center gap-1'>
                          <Vote className='w-4 h-4' /> 12
                        </span>
                        <span className='bg-muted text-muted-foreground px-2 py-1 rounded text-xs'>
                          Submitted
                        </span>
                      </div>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      REST API for custom integrations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id='features' className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Everything You Need to Get Started
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Upzy MVP includes all the essential features to start collecting
              and managing user feedback effectively.
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Vote className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Public Voting Board
              </h3>
              <p className='text-muted-foreground'>
                Users can submit requests and upvote existing ones. One vote per
                request keeps it fair.
              </p>
            </div>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Palette className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Custom Branding
              </h3>
              <p className='text-muted-foreground'>
                Customize your board name, logo, and colors to match your brand
                identity.
              </p>
            </div>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <BarChart3 className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Status Management
              </h3>
              <p className='text-muted-foreground'>
                Track progress with statuses: Planned, In Progress, Completed,
                or Closed.
              </p>
            </div>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Search className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Search & Filter
              </h3>
              <p className='text-muted-foreground'>
                Users can easily find and filter through requests to discover
                existing ideas.
              </p>
            </div>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Shield className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Moderation Tools
              </h3>
              <p className='text-muted-foreground'>
                Delete inappropriate requests and maintain a clean, professional
                board.
              </p>
            </div>
            <div className='bg-card border border-border rounded-lg p-6'>
              <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4'>
                <Smartphone className='w-6 h-6 text-primary' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                Mobile Responsive
              </h3>
              <p className='text-muted-foreground'>
                Works perfectly on all devices - desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              How It Works
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Get started with Upzy in minutes. No complex setup required.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-primary-foreground font-bold text-xl'>
                  1
                </span>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                Create Your Board
              </h3>
              <p className='text-muted-foreground'>
                Sign up and create your feedback board with custom branding in
                seconds.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-primary-foreground font-bold text-xl'>
                  2
                </span>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                Share With Users
              </h3>
              <p className='text-muted-foreground'>
                Get a unique URL (e.g., yourcompany.upzy.vote) to share with
                your users.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-primary-foreground font-bold text-xl'>
                  3
                </span>
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-3'>
                Collect & Prioritize
              </h3>
              <p className='text-muted-foreground'>
                Watch as users submit and vote on requests, automatically
                prioritizing by popularity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id='pricing' className='py-24 px-4 sm:px-6 lg:px-8 bg-muted/30'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
              Simple, Transparent Pricing
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <div className='bg-card border border-border rounded-lg p-8'>
              <h3 className='text-2xl font-bold text-foreground mb-2'>Free</h3>
              <p className='text-muted-foreground mb-6'>
                Perfect for getting started
              </p>
              <div className='text-4xl font-bold text-foreground mb-6'>
                $0<span className='text-lg text-muted-foreground'>/month</span>
              </div>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    1 feedback board
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Up to 100 requests
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Basic customization
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Community support
                  </span>
                </li>
              </ul>
              <Button variant='outline' className='w-full'>
                Get Started Free
              </Button>
            </div>
            <div className='bg-card border-2 border-primary rounded-lg p-8 relative'>
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                <span className='bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2'>
                  <Star className='w-4 h-4' />
                  Most Popular
                </span>
              </div>
              <h3 className='text-2xl font-bold text-foreground mb-2'>Pro</h3>
              <p className='text-muted-foreground mb-6'>
                For growing businesses
              </p>
              <div className='text-4xl font-bold text-foreground mb-6'>
                $29<span className='text-lg text-muted-foreground'>/month</span>
              </div>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Unlimited boards
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Unlimited requests
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Full customization
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Priority support
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Check className='w-5 h-5 text-primary' />
                  <span className='text-muted-foreground'>
                    Analytics dashboard
                  </span>
                </li>
              </ul>
              <Button className='w-full'>Start Pro Trial</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-6'>
            Ready to Know What Your Users Really Want?
          </h2>
          <p className='text-lg text-muted-foreground mb-8'>
            Join businesses who are building better products with user-driven
            feedback.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='text-lg'>
              <Users className='w-5 h-5 mr-2' />
              Start Your Free Board
            </Button>
            <Button variant='outline' size='lg' className='text-lg'>
              Schedule Demo
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                  <span className='text-primary-foreground font-bold text-lg'>
                    U
                  </span>
                </div>
                <span className='text-xl font-bold text-foreground'>Upzy</span>
              </div>
              <p className='text-muted-foreground'>
                Simple feature request management for modern businesses.
              </p>
            </div>
            <div>
              <h4 className='font-semibold text-foreground mb-4'>Product</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-foreground mb-4'>Support</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-foreground mb-4'>Company</h4>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-border mt-8 pt-8 text-center'>
            <p className='text-muted-foreground'>
              © 2024 Upzy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
