"use client";
import { LogOut, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/icons/logo";

const EmailVerify = ({ setIsEmailSent }) => {
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendLink = async () => {
    setIsResending(true);
    // Simulate API call to resend verification email
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("emailForSignIn");
    setIsEmailSent(false);
  };

  const openEmailClient = (client: string) => {
    let url = "";
    switch (client) {
      case "gmail":
        url = "https://mail.google.com/";
        break;
      case "outlook":
        url = "https://outlook.live.com/";
        break;
      default:
        url = "";
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className='flex w-full h-dvh flex-col'>
      <div className='flex  h-[60px] bg-[var(--card)] p-4 items-center justify-center'>
        <div className='max-w-10/12 w-full flex items-center justify-between'>
          <div className='flex gap-2 items-center '>
            <div></div>
            <div className='flex gap-2 items-center'>
              <Logo /> <h2 className='text-2xl'>Aura</h2>
            </div>
          </div>
          <div>
            <Button onClick={handleLogout} className='cursor-pointer'>
              Log Out <LogOut />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <Card className='w-10/12 md:w-1/4'>
          <CardHeader className='flex items-center justify-center flex-col gap-4'>
            <CardTitle className='text-2xl'>Verify Your Email</CardTitle>
            <div className='w-20 h-20 bg-muted rounded-full flex items-center justify-center'>
              <MailCheck className='w-10 h-10 text-muted-foreground' />
            </div>
            <div className='flex flex-col items-center justify-center gap-2'>
              <CardDescription>We've sent you a magic link at</CardDescription>
              <CardDescription className='text-white'>
                {localStorage.getItem("emailForSignIn")}
              </CardDescription>
              <CardDescription>
                Follow the link in your inbox to get started.
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className='flex flex-col gap-2'>
            <Button
              disabled={countdown > 0 || isResending}
              className='w-full cursor-pointer'
              variant='secondary'
              onClick={handleResendLink}
            >
              {countdown > 0 ? `Resend link (${countdown})` : "Resend link"}
            </Button>
            <Button
              className='w-full cursor-pointer'
              variant='outline'
              onClick={() => openEmailClient("gmail")}
            >
              Open Gmail
            </Button>
            <Button
              className='w-full cursor-pointer'
              variant='outline'
              onClick={() => openEmailClient("outlook")}
            >
              Open Outlook
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export { EmailVerify };
