"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconTrophy,
  IconBook,
  IconLeaf,
  IconShieldCheck,
  IconWallet
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"

// Role-based Navigation Configurations
const navConfigs = {
  admin: [
      { title: "Admin Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "User Management", url: "/users", icon: IconUsers },
      { title: "System Health", url: "/system", icon: IconChartBar },
      { title: "Platform Standards", url: "/standards", icon: IconBook }, 
  ],
  lender: [
      { title: "Lender Dashboard", url: "/lender", icon: IconChartBar },
      { title: "Opportunities", url: "/lender/market", icon: IconSearch },
      { title: "My Portfolio", url: "/lender/portfolio", icon: IconInnerShadowTop },
      { title: "Reports", url: "/lender/reports", icon: IconFileDescription },
  ],
  farmer: [
      { title: "My Profile", url: "/profile", icon: IconUsers },
      { title: "My Farm", url: "/profile/farm", icon: IconLeaf },
      { title: "Wallet", url: "/profile/wallet", icon: IconWallet },
      { title: "Submit Request", url: "/submit", icon: IconFileAi },
  ]
}



const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatar-placeholder.png",
  },
  navSecondary: [
    { title: "Settings", url: "/settings", icon: IconSettings },
    { title: "Help & Support", url: "/help", icon: IconHelp },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Determine Role based on Path
  let currentNav = navConfigs.admin; // Default
  let roleLabel = "Admin Console";
  let homeLink = "/dashboard";

  if (pathname.startsWith("/lender")) {
    currentNav = navConfigs.lender;
    roleLabel = "Lender Portal";
    homeLink = "/lender";
  } else if (pathname.startsWith("/profile") || pathname.startsWith("/submit")) {
    currentNav = navConfigs.farmer;
    roleLabel = "Farmer App";
    homeLink = "/profile";
  }

  // Also include Common links if needed, or keep strictly separate.
  // For Standards and Reputation, maybe they are public/shared?
  // Let's keep them in secondary or append them.
  // For now, let's keep it strict as per user request.

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href={homeLink}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <IconInnerShadowTop className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Imani</span>
                    <span className="truncate text-xs">{roleLabel}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Nav */}
        <NavMain items={currentNav} />

        {/* Dynamic Context Warning (Optional, for demo clarity) */}
         {/* <div className="px-4 py-2 opacity-50 text-[10px] uppercase tracking-wider">
            Viewing as {roleLabel}
         </div> */}


        {/* Secondary Nav */}
        <div className="mt-auto">
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
