"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { 
  IconWallet, 
  IconTrendingUp, 
  IconChartPie, 
  IconHistory,
  IconArrowUpRight,
  IconLeaf,
  IconAlertCircle
} from "@tabler/icons-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const growthData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 12500 },
  { month: 'Mar', value: 11800 },
  { month: 'Apr', value: 15400 },
  { month: 'May', value: 18200 },
  { month: 'Jun', value: 24500 },
]

const allocationData = [
  { name: 'Regenerative Agriculture', value: 45, color: '#1F7A5F' },
  { name: 'Clean Energy', value: 30, color: '#8b5cf6' },
  { name: 'Cold Chain', value: 15, color: '#f59e0b' },
  { name: 'Water Tech', value: 10, color: '#0ea5e9' },
]

export default function LenderPortfolioPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">My Portfolio</h1>
            <p className="text-muted-foreground mt-1">
              Track your investments, returns, and environmental impact.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <IconHistory className="size-4" /> History
            </Button>
            <Button className="gap-2">
              <IconWallet className="size-4" /> Add Funds
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <IconWallet className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,500.00</div>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <IconTrendingUp className="size-3" /> +12.5% this year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
              <IconLeaf className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground mt-1">Across 3 regions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Yield</CardTitle>
              <IconTrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Annualized ROI</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <IconAlertCircle className="size-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Moderate</div>
              <p className="text-xs text-orange-500 mt-1">Balanced allocation</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
              <CardDescription>Value of your investments over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F7A5F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1F7A5F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#F8FAF9', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                    <Area type="monotone" dataKey="value" stroke="#1F7A5F" fillOpacity={1} fill="url(#colorGrowth)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
              <CardDescription>Distribution of capital by agriculture sector.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full">
                {allocationData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-xs text-muted-foreground truncate">{s.name}</span>
                    <span className="text-xs font-bold ml-auto">{s.value}%</span>
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
