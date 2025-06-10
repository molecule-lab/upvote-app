"use client";
import { useTheme } from "next-themes";
import {
  Building,
  Info,
  MapIcon,
  MessageSquareText,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { LoginDialog } from "../dialogs/login-dialog";
import { useState } from "react";
import useTenant from "@/hooks/use-tenant";
import useAuth from "@/hooks/use-auth";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { isLoginDialogOpen, setIsLoginDialogOpen, systemUser, firebaseUser } =
    useAuth();
  const { tenant } = useTenant();
  const onThemeChangeHandler = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='bg-background shadow-md w-[95%] max-w-[1000px] rounded-b-2xl border p-4'>
        {/* Responsive grid layout */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-0 items-center'>
          {/* Logo and brand */}
          <div className='order-1 flex items-center gap-3'>
            <Avatar className='size-10'>
              <AvatarImage src={tenant.displayLogo} alt='Aura' />
              <AvatarFallback className='bg-primary text-primary-foreground font-semibold'>
                <Building />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h1 className='font-bold text-lg leading-none max-w-[150px]'>
                {tenant.name}
              </h1>
            </div>
          </div>

          {/* Login section */}
          <div className='order-2 md:order-3 flex items-center gap-2 justify-end'>
            {(!systemUser || !firebaseUser) && (
              <Button
                variant='outline'
                className='sm:w-auto sm:px-4'
                size='icon'
                onClick={() => setIsLoginDialogOpen(true)}
              >
                <User className='sm:mr-2' />
                <span className='hidden sm:inline'>Login</span>
              </Button>
            )}
            {systemUser && firebaseUser && (
              <Button
                variant='outline'
                className='sm:w-auto sm:px-4'
                size='icon'
                onClick={() => router.push("/profile")}
              >
                <User className='sm:mr-2' />
                <span className='hidden sm:inline'>Profile</span>
              </Button>
            )}
            <Button
              onClick={onThemeChangeHandler}
              variant='outline'
              size='icon'
              className='cursor-pointer'
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>
          </div>

          {/* Navigation buttons */}
          <div className='order-3 md:order-2 col-span-2 md:col-span-1 flex items-center justify-center gap-2'>
            <Button
              variant={pathname === "/" ? "outline" : "ghost"}
              className='flex-1 md:flex-none cursor-pointer'
              onClick={() => router.push("/")}
            >
              <MessageSquareText className='md:mr-2' />
              <span className='inline'>All Posts</span>
            </Button>
            <Button
              onClick={() => router.push("/roadmap")}
              variant={pathname === "/roadmap" ? "outline" : "ghost"}
              size='icon'
              className='md:w-auto md:px-4 cursor-pointer'
            >
              <MapIcon className='md:mr-2' />
              <span className='hidden md:inline'>Roadmap</span>
            </Button>
            <Button
              onClick={() => router.push("/changelog")}
              variant={pathname === "/changelog" ? "outline" : "ghost"}
              size='icon'
              className='md:w-auto md:px-4 cursor-pointer'
            >
              <Info className='md:mr-2' />
              <span className='hidden md:inline'>Changelog</span>
            </Button>
          </div>
        </div>
      </div>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </div>
  );
};

export { Header };
