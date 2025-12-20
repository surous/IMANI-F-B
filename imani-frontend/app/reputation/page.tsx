"use client"

import Layout from "@/components/layout"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/separator"
import { Trophy, TrendingUp, TrendingDown, Star, Award, Shield, Crown, Zap } from "lucide-react"

// Mock Data
const currentUser = {
  name: "Alex Doe",
  handle: "@alexdoe",
  reputation: 1250,
  rank: 4,
  change: "up",
  percentile: 92,
}

const leaderboard = [
  { name: "Sarah Jennings", handle: "@sarah_j", reputation: 2400, rank: 1, change: "up", avatar: "/avatars/01.png", badges: ["Top Contributor", "Admin"] },
  { name: "Michael Chen", handle: "@mchen_dev", reputation: 1950, rank: 2, change: "same", avatar: "/avatars/02.png", badges: ["Bug Hunter"] },
  { name: "Jessica Low", handle: "@jess_low", reputation: 1800, rank: 3, change: "up", avatar: "/avatars/03.png", badges: ["Mentor"] },
  { name: "Alex Doe", handle: "@alexdoe", reputation: 1250, rank: 4, change: "up", avatar: "/avatars/04.png", badges: ["Rising Star"] },
  { name: "David Kim", handle: "@dkim_builds", reputation: 1100, rank: 5, change: "down", avatar: "/avatars/05.png", badges: [] },
  { name: "Emma Wilson", handle: "@em_wils", reputation: 900, rank: 6, change: "up", avatar: "/avatars/06.png", badges: [] },
]

export default function ReputationPage() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Reputation
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Recognizing the community leaders making an impact.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg backdrop-blur-sm border border-border/50">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-sm">Season 3 Active</span>
          </div>
        </div>

        {/* My Standing Section */}
        <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-4 bg-gradient-to-br from-card to-secondary/30 border-primary/20 shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary fill-primary/20" />
                        Your Standing
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-primary/20">
                                <AvatarImage src="/avatars/04.png" alt="@alexdoe" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-2xl font-bold">{currentUser.name}</h3>
                                <p className="text-muted-foreground">{currentUser.handle}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-8 text-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rank</p>
                                <div className="text-3xl font-bold flex items-center gap-1 justify-center">
                                    #{currentUser.rank}
                                    <span className="text-xs font-normal text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full flex items-center">
                                        <TrendingUp className="h-3 w-3 mr-1" /> 2
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-12 hidden md:block" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Reputation</p>
                                <p className="text-3xl font-bold text-primary">{currentUser.reputation}</p>
                            </div>
                            <Separator orientation="vertical" className="h-12 hidden md:block" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Percentile</p>
                                <p className="text-3xl font-bold">Top {100 - currentUser.percentile}%</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Progress to next rank */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress to Rank #3</span>
                            <span className="font-medium">1250 / 1800 XP</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[70%] rounded-full shadow-[0_0_10px_var(--color-primary)] opacity-90" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Leaderboard Section */}
        <div>
            <div className="flex items-center gap-2 mb-6">
                <Crown className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold tracking-tight">Community Leaders</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {leaderboard.map((user, i) => (
                    <Card key={i} className={`
                        group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50
                        ${i < 3 ? 'border-primary/40 bg-gradient-to-b from-card to-primary/5' : 'bg-card'}
                    `}>
                        <div className={`absolute top-0 right-0 p-3 font-bold text-4xl opacity-5 select-none ${i < 3 ? 'text-primary' : 'text-muted'}`}>
                            #{user.rank}
                        </div>
                        
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                             <div className="relative">
                                <Avatar className={`h-12 w-12 ${i === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {i < 3 && (
                                    <div className="absolute -top-2 -right-2 bg-background rounded-full p-0.5 shadow-sm border">
                                        {i === 0 ? <Trophy className="h-4 w-4 text-yellow-500 fill-yellow-500" /> : 
                                         i === 1 ? <Award className="h-4 w-4 text-gray-400 fill-gray-400" /> :
                                         <Award className="h-4 w-4 text-orange-400 fill-orange-400" />}
                                    </div>
                                )}
                             </div>
                             <div>
                                <CardTitle className="text-base">{user.name}</CardTitle>
                                <CardDescription className="text-xs">{user.handle}</CardDescription>
                             </div>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{user.reputation.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Reputation</div>
                                </div>
                                <div className={`flex items-center text-xs font-medium ${
                                    user.change === 'up' ? 'text-green-500' : 
                                    user.change === 'down' ? 'text-red-500' : 'text-muted-foreground'
                                }`}>
                                    {user.change === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                                    {user.change === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                                    {user.change === 'same' && <span className="mr-1">-</span>}
                                    {user.change === 'up' ? 'Rising' : user.change === 'down' ? 'Falling' : 'Stable'}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {user.badges.map((badge, k) => (
                                    <Badge key={k} variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-secondary/50 hover:bg-secondary">
                                        {badge}
                                    </Badge>
                                ))}
                                {user.badges.length === 0 && (
                                    <span className="text-xs text-muted-foreground italic h-5 flex items-center">No badges yet</span>
                                )}
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
