import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function SettingsPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <div className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm">
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                {/* Placeholder content */}
                <div className="h-64 rounded-md border border-dashed flex items-center justify-center text-muted-foreground">
                    Settings Form Placeholder
                </div>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
