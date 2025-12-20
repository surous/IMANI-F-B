"use client"

import Layout from "@/components/layout"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  IconLeaf,
  IconMapPin,
  IconDroplet,
  IconTractor,
  IconCertificate,
  IconTimeline,
  IconCheck,
  IconClock,
  IconBrandCarbon,
  IconLink,
  IconWorld,
  IconPlant2
} from "@tabler/icons-react"  // Using Tabler icons as seen in sidebar

export default function MyFarmPage() {
  const farmDetails = {
    name: "Kamau Family Estate",
    owner: "John Kamau",
    location: "Nakuru, Rift Valley (0.3031° S, 36.0800° E)",
    size: "12 Acres",
    type: "Regenerative Mixed Farming",
    crops: ["Maize (H6213)", "Climbing Beans", "Hass Avocado"],
    established: "2015"
  }

  const impactMetrics = {
    waterSaved: "124,000 L",
    waterSavedGrowth: "+12%",
    soilHealth: "High (3.8% OM)",
    soilHealthGrowth: "+0.4%", 
    carbonSequestered: "45 Tons",
    biodiversityIndex: "88/100"
  }

  const reputation = {
    score: 850,
    level: "Platinum Farmer",
    verifiedPractices: 8,
    lastAudit: "Oct 15, 2025"
  }

  const timeline = [
    {
      id: 1,
      title: "Cover Cropping Verified",
      date: "Dec 10, 2025",
      status: "Verified",
      verifier: "Sentinel-2 Satellite Analysis",
      hash: "0x7f...8a2b",
      description: "Post-harvest cover crops identified via NDVI spectral signature."
    },
    {
      id: 2,
      title: "Soil Sample Audit",
      date: "Nov 22, 2025",
      status: "Verified",
      verifier: "Field Agent: Sarah M.",
      hash: "0x3c...9d1e",
      description: "Organic carbon levels verified at 3.8%. Lab report #8821 attached."
    },
    {
      id: 3,
      title: "Drip Irrigation Install",
      date: "Oct 05, 2025",
      status: "Pending",
      verifier: "IoT Sensor Network",
      hash: null,
      description: "Flow rate data transmission initiating. Awaiting 30-day baseline."
    }
  ]

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-8 animate-in fade-in duration-500 max-w-7xl mx-auto w-full">
        
        {/* HEADER & IDENTITY */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
               <IconTractor className="size-4" />
               <span className="text-sm font-medium tracking-wide uppercase">Farm Profile</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{farmDetails.name}</h1>
            <div className="flex items-center gap-2 mt-2">
               <Badge variant="outline" className="gap-1 rounded-md text-muted-foreground">
                  <IconMapPin className="size-3" /> {farmDetails.location}
               </Badge>
               <Badge variant="secondary" className="gap-1 rounded-md bg-emerald-50 text-emerald-700 border-emerald-200">
                  <IconCertificate className="size-3" /> Certified Organic
               </Badge>
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2">
                <IconWorld className="size-4" /> Public View
             </Button>
             <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 shadow-lg">
                <IconLeaf className="size-4" /> Log New Practice
             </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
           
           {/* LEFT COL: DETAILS & METRICS */}
           <div className="md:col-span-8 space-y-6">
              
              {/* ENVIRONMENTAL IMPACT CARDS */}
              <div className="grid gap-4 sm:grid-cols-3">
                 <Card className="bg-blue-50/50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <IconDroplet className="size-4" /> Water Saved
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="text-2xl font-bold">{impactMetrics.waterSaved}</div>
                       <p className="text-xs text-muted-foreground mt-1 text-emerald-600 font-medium">
                          {impactMetrics.waterSavedGrowth} vs last season
                       </p>
                    </CardContent>
                 </Card>
                 <Card className="bg-amber-50/50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400 flex items-center gap-2">
                          <IconPlant2 className="size-4" /> Soil Health
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="text-2xl font-bold">{impactMetrics.soilHealth}</div>
                       <p className="text-xs text-muted-foreground mt-1 text-emerald-600 font-medium">
                          {impactMetrics.soilHealthGrowth} organic matter
                       </p>
                    </CardContent>
                 </Card>
                 <Card className="bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <IconBrandCarbon className="size-4" /> Carbon
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="text-2xl font-bold">{impactMetrics.carbonSequestered}</div>
                       <p className="text-xs text-muted-foreground mt-1">
                          Sequestered YTD
                       </p>
                    </CardContent>
                 </Card>
              </div>

              {/* TIMELINE SECTION */}
              <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                       <IconTimeline className="size-5 text-primary" /> Verification Timeline
                    </CardTitle>
                    <CardDescription>Real-time record of your sustainable practices and verifications.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="relative border-l border-border/60 ml-3 space-y-8 pl-8 py-2">
                       {timeline.map((item) => (
                          <div key={item.id} className="relative group">
                             <div className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-background ${item.status === 'Verified' ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'}`}>
                                {item.status === 'Verified' ? <IconCheck className="size-3" /> : <IconClock className="size-3" />}
                             </div>
                             
                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                <div>
                                   <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                                      <Badge variant={item.status === 'Verified' ? 'default' : 'secondary'} className={`text-[10px] h-5 ${item.status==='Verified' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
                                         {item.status}
                                      </Badge>
                                   </div>
                                   <p className="text-sm text-muted-foreground mt-1 max-w-lg">{item.description}</p>
                                   <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                         <IconCertificate className="size-3" /> {item.verifier}
                                      </span>
                                      <span>{item.date}</span>
                                   </div>
                                </div>
                                
                                {item.hash && (
                                   <div className="bg-muted/50 p-2 rounded border border-border/50 font-mono text-[10px] text-muted-foreground flex flex-col gap-1 sm:text-right mt-2 sm:mt-0 group-hover:border-primary/30 transition-colors">
                                      <span className="flex items-center gap-1 justify-end text-primary font-bold uppercase tracking-wider text-[9px]">
                                         <IconLink className="size-3" /> Cardano Proof
                                      </span>
                                      <span className="truncate max-w-[120px]">{item.hash}</span>
                                   </div>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>

           </div>

           {/* RIGHT COL: SUMMARY & TRUST */}
           <div className="md:col-span-4 space-y-6">
              
              {/* TRUST SCORE CARD */}
              <Card className="overflow-hidden border-2 border-primary/10 shadow-lg shadow-emerald-900/5">
                 <div className="bg-emerald-600 p-4 text-white text-center">
                    <p className="text-emerald-100 text-xs uppercase tracking-wider font-semibold mb-1">Reputation Score</p>
                    <div className="text-4xl font-extrabold">{reputation.score}</div>
                    <Badge className="mt-2 bg-emerald-500/50 hover:bg-emerald-500/70 text-white border-0">
                       {reputation.level}
                    </Badge>
                 </div>
                 <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Verified Practices</span>
                          <span className="font-medium">{reputation.verifiedPractices}/10 Targets</span>
                       </div>
                       <Progress value={80} className="h-2 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-emerald-500" />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                       <h4 className="font-semibold text-sm">Farm Stats</h4>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                             <p className="text-[10px] uppercase text-muted-foreground font-semibold">Size</p>
                             <p className="font-medium">{farmDetails.size}</p>
                          </div>
                          <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                             <p className="text-[10px] uppercase text-muted-foreground font-semibold">Est.</p>
                             <p className="font-medium">{farmDetails.established}</p>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">Primary Crops</p>
                          <div className="flex flex-wrap gap-1.5">
                             {farmDetails.crops.map(crop => (
                                <Badge key={crop} variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80">
                                   {crop}
                                </Badge>
                             ))}
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              {/* BLOCKCHAIN BADGE */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10">
                 <div className="size-10 rounded-full bg-background border flex items-center justify-center shadow-sm">
                    <IconLink className="size-5 text-blue-600" />
                 </div>
                 <div className="space-y-0.5">
                    <p className="text-sm font-semibold">On-Chain Verified</p>
                    <p className="text-xs text-muted-foreground">All data attested on Cardano</p>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </Layout>
  )
}
