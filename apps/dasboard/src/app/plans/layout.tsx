"use client";
import { LogOut } from "lucide-react";
import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";

const PlansLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex  h-[60px] bg-[var(--card)] p-4 items-center justify-center sticky w-full top-0 left-0'>
        <div className='max-w-10/12 w-full flex items-center justify-between'>
          <div className='flex gap-2 items-center '>
            <div>
              <Logo />
            </div>
            <div className='grid flex-1 text-left text-lg leading-tight '>
              Aura
            </div>
          </div>
          <div>
            <Button className='cursor-pointer'>
              Log Out <LogOut />
            </Button>
          </div>
        </div>
      </div>
      <main className='flex flex-1 h-full items-center justify-center'>
        {children}
      </main>
    </div>
  );
};

export default PlansLayout;
