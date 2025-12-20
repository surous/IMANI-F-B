"use client"

import Link from "next/link"
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
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatar-placeholder.png",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Reputation", url: "/reputation", icon: IconTrophy },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <IconInnerShadowTop className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Imani</span>
                    <span className="truncate text-xs">Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Nav */}
        <NavMain items={data.navMain} />

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
