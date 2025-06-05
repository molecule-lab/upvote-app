"use client";

import { Building, ChevronsUpDown, CircleCheck, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import useTenant from "@/hooks/use-tenant";
import { useQueryGetUser } from "@/api/useQuerySystemUser";

export function TeamSwitcher({
  tenants,
  openAddProjectDialog,
}: {
  tenants: any;
  openAddProjectDialog: () => void;
}) {
  const { isMobile } = useSidebar();
  const { data: systemUser } = useQueryGetUser();
  const { currentTenant: activeTeam, setCurrentTenant: setActiveTeam } =
    useTenant();

  useEffect(() => {
    setActiveTeam(tenants[0]);
  }, [systemUser]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='outline-0'>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className=' text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <Avatar className='rounded-lg'>
                  <AvatarImage src={activeTeam?.tenant?.displayLogo} />
                  <AvatarFallback className='rounded-lg'>
                    <Building />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {activeTeam?.tenant?.name}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Teams
            </DropdownMenuLabel>
            <div className='flex flex-col gap-2'>
              {tenants.map((tenant, index) => (
                <DropdownMenuItem
                  key={tenant.id}
                  onClick={() => setActiveTeam(tenant)}
                  className='flex gap-2 p-2 items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div className='flex size-6 items-center justify-center rounded-md border'>
                      <Avatar>
                        <AvatarImage src={tenant.tenant.displayLogo} />
                        <AvatarFallback>
                          <Building />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {tenant.tenant.name}
                  </div>
                  <div>
                    {activeTeam?.tenant?.id === tenant.tenant.id && (
                      <CircleCheck />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='gap-2 p-2'
              onClick={openAddProjectDialog}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
