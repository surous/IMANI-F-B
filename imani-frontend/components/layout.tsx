"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/60 backdrop-blur-xl px-6 sticky top-0 z-10 transition-all supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 mr-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          
          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="relative w-full max-w-sm hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 md:w-[300px] lg:w-[300px]"
                />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background"></span>
                </Button>
                <div className="flex items-center gap-3 pl-2 border-l">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@imani.com</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm ring-2 ring-background shadow-sm">
                        AD
                    </div>
                </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 animate-in fade-in duration-500">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
