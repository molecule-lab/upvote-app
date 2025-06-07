import React from "react";

export default function SiteNotFound() {
  return (
    <div className='min-h-screen bg-background flex flex-col justify-center items-center px-4'>
      <div className='max-w-md w-full text-center'>
        {/* Main heading */}
        <h1 className='text-4xl font-bold text-foreground mb-4'>
          Site Not Found
        </h1>

        {/* Description */}
        <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
          We couldn't find the site you're looking for.
        </p>

        {/* Contact message */}
        <div className='bg-card rounded-lg border border-border p-6 mb-8 shadow-sm'>
          <p className='text-card-foreground mb-2'>
            If this is your site, please contact us at:
          </p>
          <a
            href='mailto:hello@aura.vote'
            className='text-primary hover:text-primary/80 font-medium text-lg transition-colors duration-200'
          >
            hello@aura.vote
          </a>
        </div>

        {/* Additional help text */}
        <p className='text-sm text-muted-foreground'>
          Double-check the URL or contact the site owner for assistance.
        </p>
      </div>
    </div>
  );
}
