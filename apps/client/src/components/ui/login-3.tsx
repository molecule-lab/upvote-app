"use client";

import * as React from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Input } from "./input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot='card'
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot='card-content'
      className={cn("px-6", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      data-slot='label'
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {}
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot='separator-root'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

const GitHubIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z' />
  </svg>
);

const GoogleIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
    <path d='M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z' />
  </svg>
);

export default function Login06() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center '>
      <div className='flex flex-col items-center space-y-8'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-10'>
            <AvatarImage src='/logo.png' alt='Aura' />
            <AvatarFallback className='bg-primary text-primary-foreground font-semibold'>
              AU
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h1 className='font-bold text-lg leading-none'>Aura</h1>
          </div>
        </div>
        <div className='space-y-2 text-center'>
          <h6 className='text-sm text-foreground'>
            Sign In required to leave feedback, comments, or votes.
          </h6>
        </div>
        <div className='w-full space-y-4'>
          <Input
            type='email'
            placeholder='Your email'
            className='w-full rounded-xl '
          />
          <div className='flex flex-col gap-2'>
            <Button
              onClick={() => router.replace("/")}
              className='w-full rounded-xl'
              size='lg'
            >
              Send me the magic link
            </Button>
          </div>

          <div className='flex items-center gap-4 py-2'>
            <Separator className='flex-1' />
            <span className='text-sm text-muted-foreground'>OR</span>
            <Separator className='flex-1' />
          </div>

          <Button variant='outline' className='w-full rounded-xl ' size='lg'>
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
        <p className='text-center text-xs w-11/12 text-muted-foreground'>
          You acknowledge that you read, and agree, to our{" "}
          <a href='#' className='underline hover:text-foreground'>
            Terms of Service
          </a>{" "}
          and our{" "}
          <a href='#' className='underline hover:text-foreground'>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
