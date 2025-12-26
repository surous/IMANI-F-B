"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/input"
import { 
  IconSearch, 
  IconFilter, 
  IconTrendingUp, 
  IconShieldCheck,
  IconClock,
  IconArrowUpRight,
  IconLeaf
} from "@tabler/icons-react"

const opportunities = [
  { 
    id: 1, 
    title: "Regenerative Maize Support", 
    location: "Rift Valley, Kenya", 
    amount: "5,000", 
    roi: "12%", 
    duration: "6 Months", 
    trustScore: 98,
    tags: ["Eco-Friendly", "Smallholder"]
  },
  { 
    id: 2, 
    title: "Organic Coffee Expansion", 
    location: "Central, Kenya", 
    amount: "8,500", 
    roi: "14%", 
    duration: "9 Months", 
    trustScore: 95,
    tags: ["Export-Ready", "Women-Led"]
  },
  { 
    id: 3, 
    title: "Solar Irrigation Pumps", 
    location: "Coastal Region, Kenya", 
    amount: "3,200", 
    roi: "11%", 
    duration: "4 Months", 
    trustScore: 92,
    tags: ["Sustainability", "Infrastructure"]
  },
  { 
    id: 4, 
    title: "Dairy Cold Chain Project", 
    location: "Meru, Kenya", 
    amount: "12,000", 
    roi: "15%", 
    duration: "12 Months", 
    trustScore: 97,
    tags: ["Technology", "Value-Add"]
  },
]

export default function LenderMarketPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Verified Opportunities</h1>
            <p className="text-muted-foreground mt-1">
              Discover and fund sustainable agricultural initiatives with verified impact.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search projects, locations, or crop types..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2">
            <IconFilter className="size-4" /> Filter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="group hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    {opp.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold py-0">{tag}</Badge>
                    ))}
                  </div>
                  <Badge className="bg-primary/10 text-primary border-transparent text-[10px]">
                    {opp.trustScore} Trust
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{opp.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <IconLeaf className="size-3" /> {opp.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Target ROI</p>
                    <p className="text-lg font-bold text-accent flex items-center gap-1">
                      <IconTrendingUp className="size-4" /> {opp.roi}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Duration</p>
                    <p className="text-lg font-bold text-foreground flex items-center justify-end gap-1">
                      <IconClock className="size-4" /> {opp.duration}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Goal</p>
                    <p className="text-lg font-bold text-foreground">${opp.amount}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Verification</p>
                    <p className="text-lg font-bold text-primary flex items-center justify-end gap-1">
                      <IconShieldCheck className="size-4" /> Full
                    </p>
                  </div>
                </div>
                
                <Button className="w-full gap-2">
                  Invest Now <IconArrowUpRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
