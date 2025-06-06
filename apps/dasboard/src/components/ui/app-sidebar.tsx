"use client";

import {
  GalleryVerticalEnd,
  Info,
  LayoutDashboard,
  MapIcon,
  MessageSquareText,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AddProjectDialog } from "../dialogs/add-project";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquareText,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Roadmap",
      url: "/roadmap",
      icon: MapIcon,
    },
    {
      title: "Changelog",
      url: "/changelog",
      icon: Info,
    },
    {
      title: "Customization",
      url: "/customization",
      icon: Wrench,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const { systemUser } = useAuth();

  const openAddProjectDialog = () => {
    setIsAddProjectDialogOpen(true);
  };

  return (
    <Sidebar collapsible='icon' {...props} variant='inset'>
      <SidebarHeader>
        <TeamSwitcher
          tenants={systemUser?.tenantMappings}
          openAddProjectDialog={openAddProjectDialog}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={systemUser} />
      </SidebarFooter>
      <SidebarRail />
      <AddProjectDialog
        isOpen={isAddProjectDialogOpen}
        onClose={() => {
          setIsAddProjectDialogOpen(false);
        }}
      />
    </Sidebar>
  );
}
