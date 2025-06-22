import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Award, Globe } from "lucide-react";
import Logo from "@/components/logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura - Simple Feature Request Management",
  description:
    "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
  keywords: [
    "feature requests",
    "user feedback",
    "product management",
    "voting",
    "prioritization",
  ],
  authors: [{ name: "Aura Team" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aura - Simple Feature Request Management",
    description:
      "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura - Simple Feature Request Management",
    description:
      "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Script id='mixpanel-init' strategy='afterInteractive'>
          {`
            (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
            
            mixpanel.init("44ede743d7f4b351a341ed76b2ffd7f6", {
           debug: true,
      track_pageview: true,
      persistence: "localStorage",
      batch_size: 2,
      autocapture: {
        pageview: "url-with-path-and-query-string",
        click: true,
        input: true,
        scroll: true,
        submit: true,
        capture_text_content: true,
      },
            });
          `}
        </Script>
        <Script
          src='https://aura.vote/widget/widget.iife.js?tenantId=01JXD1SE7ZRNDNMNE0YZAFBC9K'
          data-theme='dark'
          data-position='right'
          data-cta-text='Feature Request'
        ></Script>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <footer className='border-t border-border bg-muted/30 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
              <div className='grid md:grid-cols-2 gap-8 items-center'>
                <div className='animate-in fade-in slide-in-from-bottom-4 duration-1000'>
                  <div className='flex items-center space-x-2 mb-4'>
                    <Logo />
                    <span className='text-xl font-bold text-foreground'>
                      Aura
                    </span>
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
                  © 2025 Aura. All rights reserved. Built with ❤️ for product
                  teams.
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
