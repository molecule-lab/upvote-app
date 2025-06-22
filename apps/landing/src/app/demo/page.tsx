"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import {
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Users,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function DemoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Simple check - we know we're on demo page if this component is rendering
  const isDemoPage = true;

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
      {/* Enhanced Navigation */}
      <nav
        className={`border-b border-border backdrop-blur-md z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 shadow-lg mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 rounded-xl border-border/50 fixed top-2 left-0 right-0 backdrop-blur-md"
            : "bg-card/80 border-border sticky top-0"
        }`}
      >
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "max-w-4xl" : "max-w-7xl"
          }`}
        >
          <div className='flex justify-between items-center transition-all duration-300 h-16'>
            <div className='flex items-center space-x-8'>
              <a
                href='/'
                className='flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200'
              >
                <Logo />
                <span className='text-xl font-bold text-foreground'>Aura</span>
              </a>

              {/* Desktop Navigation - moved to left */}
              <div
                className={`hidden md:flex items-center transition-all duration-300 ${
                  isScrolled ? "space-x-4" : "space-x-8"
                }`}
              >
                <a
                  href='/#features'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  Features
                </a>
                <a
                  href='/demo'
                  className={`transition-colors duration-200 hover:scale-105 transform ${
                    isDemoPage
                      ? "text-foreground font-medium border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Demo
                </a>
                <a
                  href='/#pricing'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  Pricing
                </a>
                <a
                  href='/#faq'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-105 transform'
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Right side - only theme toggle and CTA */}
            <div
              className={`hidden md:flex items-center transition-all duration-300 ${
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

              <Button
                onClick={() => window.open("https://app.aura.vote")}
                className='transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl bg-primary text-white hover:bg-primary/90'
              >
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
                  href='/#features'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href='/demo'
                  className={`block px-3 py-2 transition-colors duration-200 ${
                    isDemoPage
                      ? "text-foreground font-medium bg-primary/10 rounded-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Demo
                </a>
                <a
                  href='/#pricing'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href='/#faq'
                  className='block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <div className='px-3 py-2'>
                  <Button
                    onClick={() => window.open("https://app.aura.vote")}
                    className='w-full bg-primary text-white hover:bg-primary/90'
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Demo Content */}
      <section className='relative pt-0 px-4 sm:px-6 lg:px-8 overflow-hidden '>
        {/* Subtle Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          {/* Gradient orbs for subtle visual interest */}
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000'></div>

          {/* Floating decorative elements */}
          <div className='absolute top-20 right-20 transform rotate-12 hidden lg:block animate-pulse'>
            <div className='w-3 h-3 bg-primary/20 rounded-full'></div>
          </div>
          <div className='absolute bottom-32 left-16 transform -rotate-12 hidden lg:block animate-bounce'>
            <div className='w-2 h-2 bg-primary/30 rounded-full'></div>
          </div>
        </div>

        <div className='relative z-10 flex h-full items-center'>
          <div className='container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-24 lg:grid-cols-2 lg:py-32'>
            <div className='text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-1000'>
              <h1 className='relative text-5xl font-bold tracking-tight text-foreground sm:text-7xl'>
                Demo
                <svg
                  className='absolute -bottom-2 left-1/2 w-48 -translate-x-1/2 transform text-primary lg:left-0 lg:w-64 lg:-translate-x-0 animate-in fade-in duration-1000 delay-500'
                  viewBox='0 0 259 19'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2.99982 11.235C55.0847 2.02344 180.165 -2.71533 255.834 15.75C257.481 16.2083 257.481 18.6667 255.834 18.2083C180.165 -0.215332 55.0847 4.52344 2.99982 13.735C1.52513 14.1554 1.52513 11.6554 2.99982 11.235Z'
                    fill='currentColor'
                  />
                </svg>
              </h1>
              <p className='mt-8 text-lg text-muted-foreground sm:text-xl leading-relaxed'>
                Replace chaotic spreadsheets and buried feedback forms with a
                clear, public voting board that drives real product decisions.
                <br />
                <br />
                <strong className='font-semibold text-foreground'>
                  Your users get a voice. You get clarity.
                </strong>
              </p>
            </div>

            <div className='flex items-center justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300'>
              <Button
                size='lg'
                variant='outline'
                className='group h-14 rounded-xl border-2 border-primary bg-transparent px-8 text-lg text-primary shadow-lg transition-all hover:scale-105 hover:border-primary/80 hover:bg-primary/10 hover:shadow-xl'
                onClick={() => window.open("https://acmeai.aura.vote")}
              >
                View Live Board
                <ExternalLink className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='relative  px-4 sm:px-6 lg:px-8 overflow-hidden w-full'>
        <div className='max-w-7xl mx-auto'>
          <div className='p-4'>
            <iframe
              className='w-full h-[900px] rounded-lg shadow-lg border-1'
              src='https://acmeai.aura.vote'
              title='Aura Demo'
              loading='lazy'
            />
          </div>
        </div>
      </section>

      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-muted/30'>
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
                className='text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary/25 bg-primary text-white hover:bg-primary/90'
                onClick={() => window.open("https://app.aura.vote")}
              >
                <Users className='w-5 h-5 mr-2' />
                Get Started Today
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='text-lg transform hover:scale-105 transition-all duration-300'
                onClick={() =>
                  window.open(
                    "https://calendly.com/rushildhinoja-moleculelab/aura-vote-demo-see-what-users-actually-want"
                  )
                }
              >
                Schedule a Call
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
