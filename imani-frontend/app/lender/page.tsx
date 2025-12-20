"use client"

import Link from "next/link"
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator" // unused
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowUpRight, 
  Leaf, 
  DollarSign, 
  Trees, 
  ShieldCheck, 
  // Timer, 
  TrendingUp, 
  Sprout, 
  FileCheck 
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock Data for Charts (Ported from original dashboard)
const portfolioData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 15000 },
  { month: 'Mar', value: 18000 },
  { month: 'Apr', value: 25000 },
  { month: 'May', value: 32000 },
  { month: 'Jun', value: 45000 },
]

const opportunities = [
  { 
    id: 1, 
    farmer: "Rift Valley Cooperative", 
    location: "Kenya, Rift Valley", 
    amount: 5000, 
    funded: 3200, 
    roi: "12%", 
    duration: "6 Months", 
    trustScore: 98,
    category: "Regenerative Maize",
    risk: "Low" 
  },
  { 
    id: 2, 
    farmer: "Green Highlands Tea", 
    location: "Kenya, Kericho", 
    amount: 8000, 
    funded: 1500, 
    roi: "14%", 
    duration: "9 Months", 
    trustScore: 95,
    category: "Organic Tea",
    risk: "Medium-Low" 
  },
  { 
    id: 3, 
    farmer: "Coastal Cashew Union", 
    location: "Kenya, Kilifi", 
    amount: 3000, 
    funded: 2900, 
    roi: "11%", 
    duration: "4 Months", 
    trustScore: 92,
    category: "Agroforestry",
    risk: "Low" 
  },
]

export default function LenderDashboard() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Lender Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track your impact, capital deployment, and financial returns.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: Just now</span>
            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <DollarSign className="h-4 w-4" />
              Add Funds
            </Button>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-primary/5 hover:shadow-md transition-all border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Capital Deployed</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$124,500</div>
              <p className="text-xs text-primary flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +18.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-secondary/5 hover:shadow-md transition-all border-secondary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interest Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$8,240</div>
              <p className="text-xs text-secondary flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +4.5% avg. APY
              </p>
            </CardContent>
          </Card>

           <Card className="bg-gradient-to-br from-card to-accent/5 hover:shadow-md transition-all border-accent/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Sequestered</CardTitle>
              <Trees className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">450 Tons</div>
              <p className="text-xs text-accent flex items-center mt-1">
                <Leaf className="h-3 w-3 mr-1" />
                Equivalent to 12k trees
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Farmers Funded</CardTitle>
              <Sprout className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">128</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across 3 verified regions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area: Charts & Opportunities */}
        <div className="grid gap-6 md:grid-cols-7">
          
          {/* Portfolio Health Chart */}
          <Card className="md:col-span-4 lg:col-span-5 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Performance</CardTitle>
              <CardDescription>
                Growth of deployed capital over the last 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1F7A5F" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1F7A5F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748B" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#64748B" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#F8FAF9', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#1E293B' }}
                      itemStyle={{ color: '#1F7A5F' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1F7A5F" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Smart Contract Timeline / Alerts */}
          <Card className="md:col-span-3 lg:col-span-2 shadow-sm bg-muted/20 border-l-4 border-l-secondary">
             <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-secondary" />
                Smart Contracts
              </CardTitle>
              <CardDescription>
                Live milestone verification updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative border-l border-border/50 ml-3 pl-6">
                 {/* Timeline Items */}
                 <div className="relative">
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-accent ring-4 ring-background"></span>
                    <p className="text-sm font-semibold text-foreground">Harvest Verified</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Rift Valley Coop • 2h ago</p>
                    <Badge variant="outline" className="mt-2 text-[10px] text-accent border-accent/20 bg-accent/5">
                        Funds Released: $1,200
                    </Badge>
                 </div>
                 <div className="relative">
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-secondary ring-4 ring-background"></span>
                    <p className="text-sm font-semibold text-foreground">Soil Health Audit</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Green Highlands • 5h ago</p>
                    <Badge variant="outline" className="mt-2 text-[10px] text-secondary border-secondary/20 bg-secondary/5">
                        Pending Approval
                    </Badge>
                 </div>
                 <div className="relative">
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background"></span>
                    <p className="text-sm font-semibold text-foreground">Loan Disbursed</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Coastal Union • 1d ago</p>
                    <Badge variant="outline" className="mt-2 text-[10px] text-primary border-primary/20 bg-primary/5">
                        Initial Tranche: $3,000
                    </Badge>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verified Opportunities Marketplace */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Verified Opportunities
              </h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">View All</Button>
           </div>
           
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opp) => (
                <Card key={opp.id} className="group hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30">
                  <CardHeader className="pb-3">
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border">
                              <AvatarImage src={`/avatars/farmer${opp.id}.png`} />
                              <AvatarFallback className="bg-primary/5 text-primary font-bold">{opp.farmer.substring(0,2)}</AvatarFallback>
                          </Avatar>
                          <div>
                             <CardTitle className="text-base">{opp.farmer}</CardTitle>
                             <CardDescription className="text-xs">{opp.location}</CardDescription>
                          </div>
                        </div>
                        <Badge className={`${opp.trustScore >= 95 ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-secondary/10 text-secondary hover:bg-secondary/20'} border-transparent`}>
                           {opp.trustScore} Trust
                        </Badge>
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="flex justify-between text-sm mb-4">
                        <div>
                           <p className="text-muted-foreground text-xs">Target ROI</p>
                           <p className="font-bold text-accent">{opp.roi}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-muted-foreground text-xs">Duration</p>
                           <p className="font-semibold">{opp.duration}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-muted-foreground text-xs">Risk Level</p>
                           <p className="font-semibold text-primary">{opp.risk}</p>
                        </div>
                     </div>
                     
                     <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                           <span>Funding Progress</span>
                           <span className="font-medium">{Math.round((opp.funded / opp.amount) * 100)}%</span>
                        </div>
                        <Progress value={(opp.funded / opp.amount) * 100} className="h-2 bg-muted [&>div]:bg-secondary" />
                        <div className="flex justify-between text-xs mt-1.5 text-muted-foreground">
                           <span>${opp.funded.toLocaleString()} raised</span>
                           <span>Goal: ${opp.amount.toLocaleString()}</span>
                        </div>
                     </div>

                     <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        <Link href="/profile">
                            View Details <ArrowUpRight className="h-4 w-4" />
                        </Link>
                     </Button>
                  </CardContent>
                </Card>
              ))}
           </div>
        </div>

      </div>
    </Layout>
  )
}
