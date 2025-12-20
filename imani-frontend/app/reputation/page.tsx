"use client"

import Layout from "@/components/layout"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, TrendingUp, TrendingDown, Star, Award, Shield, Tractor, Sprout, Leaf, Activity } from "lucide-react"

// Mock Data for Farmers
const currentFarmer = {
  name: "You (Farm Admin)",
  handle: "Regional Manager",
  trustScore: 98,
  rank: "Elite",
  change: "up",
  activeLoans: 12,
}

const topFarmers = [
  { name: "John K. (Happy Valley)", location: "Rift Valley", score: 98, yield: "120%", repayment: "100%", avatar: "/avatars/farmer1.png", badges: ["Top Yield", "Eco-Friendly"] },
  { name: "Sarah M. (Green Acres)", location: "Central", score: 95, yield: "115%", repayment: "98%", avatar: "/avatars/farmer2.png", badges: ["Sustainable"] },
  { name: "David O. (Highland)", location: "Western", score: 92, yield: "110%", repayment: "100%", avatar: "/avatars/farmer3.png", badges: ["Early Adopter"] },
  { name: "Grace W. (Sunny Side)", location: "Eastern", score: 88, yield: "105%", repayment: "95%", avatar: "/avatars/farmer4.png", badges: ["Rising Star"] },
  { name: "Samuel T. (River Bed)", location: "Coast", score: 85, yield: "98%", repayment: "92%", avatar: "/avatars/farmer5.png", badges: [] },
  { name: "Emma L. (Valley View)", location: "Nyanza", score: 82, yield: "95%", repayment: "90%", avatar: "/avatars/farmer6.png", badges: [] },
]

export default function ReputationPage() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Farmer Trust Scores
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitoring performance, reliability, and sustainable practices.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/20 p-2 rounded-lg backdrop-blur-sm border border-secondary/50">
            <Activity className="h-5 w-5 text-secondary" />
            <span className="font-semibold text-sm text-secondary-foreground">Live Monitoring Active</span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-4 bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2 text-primary">
                        <Shield className="h-5 w-5" />
                        Regional Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                <Tractor className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Rift Valley Region</h3>
                                <p className="text-muted-foreground">3 Zones Monitored</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-8 text-center flex-1 justify-end">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Trust Score</p>
                                <div className="text-3xl font-bold flex items-center gap-1 justify-center text-primary">
                                    92
                                    <span className="text-xs font-normal text-accent bg-accent/10 px-1.5 py-0.5 rounded-full flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" /> +2%
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-12 hidden md:block" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Yield</p>
                                <p className="text-3xl font-bold text-secondary">112%</p>
                            </div>
                            <Separator orientation="vertical" className="h-12 hidden md:block" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                                <p className="text-3xl font-bold">45</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Farmers Grid */}
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Sprout className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Top Performing Farmers</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {topFarmers.map((farmer, i) => (
                    <Card key={i} className={`
                        group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/50
                        ${i < 3 ? 'border-secondary/40 bg-gradient-to-b from-card to-secondary/5' : 'bg-card'}
                    `}>
                        <div className={`absolute top-0 right-0 p-3 font-bold text-4xl opacity-5 select-none ${i < 3 ? 'text-secondary' : 'text-muted'}`}>
                            #{i + 1}
                        </div>
                        
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                             <div className="relative">
                                <Avatar className={`h-12 w-12 border-2 ${i < 3 ? 'border-secondary' : 'border-transparent'}`}>
                                    <AvatarImage src={farmer.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary">{farmer.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                {i < 3 && (
                                    <div className="absolute -top-2 -right-2 bg-background rounded-full p-0.5 shadow-sm border border-secondary/20">
                                        <Leaf className="h-4 w-4 text-secondary fill-secondary" />
                                    </div>
                                )}
                             </div>
                             <div>
                                <CardTitle className="text-base text-foreground">{farmer.name}</CardTitle>
                                <CardDescription className="text-xs">{farmer.location}</CardDescription>
                             </div>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="flex justify-between items-end mb-4 bg-muted/30 p-2 rounded-lg">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-primary">{farmer.score}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Trust Score</div>
                                </div>
                                <Separator orientation="vertical" className="h-8" />
                                <div className="text-center">
                                    <div className="text-xl font-bold text-secondary">{farmer.yield}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Yield</div>
                                </div>
                                <Separator orientation="vertical" className="h-8" />
                                <div className="text-center">
                                    <div className="text-xl font-bold">{farmer.repayment}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Repay</div>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {farmer.badges.map((badge, k) => (
                                    <Badge key={k} variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 border-secondary/20">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  )
}
