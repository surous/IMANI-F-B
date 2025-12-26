"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/progress"
import { 
  IconActivity, 
  IconDatabase, 
  IconServer, 
  IconShieldCheck,
  IconCpu,
  IconDeviceFloppy,
  IconNetwork
} from "@tabler/icons-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const performanceData = [
  { time: '10:00', cpu: 45, mem: 62 },
  { time: '10:05', cpu: 52, mem: 65 },
  { time: '10:10', cpu: 48, mem: 63 },
  { time: '10:15', cpu: 70, mem: 68 },
  { time: '10:20', cpu: 55, mem: 66 },
  { time: '10:25', cpu: 42, mem: 64 },
  { time: '10:30', cpu: 38, mem: 62 },
]

export default function SystemHealthPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">System Health</h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring of platform services and infrastructure.
            </p>
          </div>
          <Badge variant="outline" className="gap-2 py-1 px-3 border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <IconCpu className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">38.2%</div>
              <Progress value={38.2} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <IconDeviceFloppy className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.2 GB / 8 GB</div>
              <Progress value={52} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Latency</CardTitle>
              <IconNetwork className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">24 ms</div>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <IconActivity className="size-3" /> Optimal performance
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <IconShieldCheck className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">99.98%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-12 lg:col-span-5">
            <CardHeader>
              <CardTitle>Infrastructure Performance</CardTitle>
              <CardDescription>Load monitoring over the last 30 minutes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F7A5F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1F7A5F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#F8FAF9', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                    <Area type="monotone" dataKey="cpu" stroke="#1F7A5F" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" />
                    <Area type="monotone" dataKey="mem" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMem)" name="Memory %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-12 lg:col-span-2">
            <CardHeader>
              <CardTitle>Microservices</CardTitle>
              <CardDescription>Status of independent services.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Auth Service", status: "Healthy" },
                  { name: "Payment Gateway", status: "Healthy" },
                  { name: "Blockchain Node", status: "Healthy" },
                  { name: "Notification Engine", status: "Healthy" },
                  { name: "File Storage", status: "Healthy" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-2 border-b last:border-0 last:pb-0">
                    <span className="text-sm font-medium">{s.name}</span>
                    <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
                      {s.status}
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
