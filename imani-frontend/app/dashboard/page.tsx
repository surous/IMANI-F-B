"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/separator"
import { 
  IconUsers,
  IconShieldCheck,
  IconActivity,
  IconAlertTriangle,
  IconServer,
  IconDatabase,
  IconLock
} from "@tabler/icons-react"

export default function SuperadminDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch('/api/submissions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSubmissions(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <Layout><div className="p-8 text-center text-primary font-bold">Initializing Admin Console...</div></Layout>

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Console</h1>
            <p className="text-muted-foreground mt-1">
              System health, user management, and platform verification overview.
            </p>
          </div>
          <Badge variant="outline" className="gap-2 bg-background data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
             System Operational
          </Badge>
        </div>

        {/* System Health Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <IconUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
              <p className="text-xs text-muted-foreground mt-1">
                +180 this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verifications</CardTitle>
              <IconShieldCheck className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requires manual review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Load</CardTitle>
              <IconActivity className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Server capacity healthy
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
              <IconAlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground mt-1">
                API Latency spike detected
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {/* Quick Audit Log */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                         <IconDatabase className="size-5" /> Recent System Audits
                    </CardTitle>
                    <CardDescription>Latest administrative actions tracked.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { action: "User Role Updated", user: "admin_jane", time: "10 mins ago" },
                            { action: "Schema Migration", user: "system_bot", time: "1 hour ago" },
                            { action: "API Key Revoked", user: "security_monitor", time: "3 hours ago" },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-medium">{log.action}</p>
                                    <p className="text-xs text-muted-foreground">by {log.user}</p>
                                </div>
                                <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Server Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                         <IconServer className="size-5" /> Service Status
                    </CardTitle>
                    <CardDescription>Monitoring critical platform services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Verification API", status: "Operational", color: "text-emerald-500" },
                            { name: "Blockchain Node", status: "Syncing (99%)", color: "text-blue-500" },
                            { name: "User Auth Service", status: "Operational", color: "text-emerald-500" },
                            { name: "Notification Relay", status: "Degraded", color: "text-orange-500" },
                        ].map((service, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`h-2.5 w-2.5 rounded-full bg-current ${service.color}`} />
                                    <span className="text-sm font-medium">{service.name}</span>
                                </div>
                                <Badge variant="outline" className={`${service.color} border-current/20 bg-background`}>
                                    {service.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </Layout>
  )
}
