"use client"

import Layout from "@/components/layout"
import {
  IconAward,
  IconBuildingBank,
  IconCalendar,
  IconCheck,
  IconCopy,
  IconLeaf,
  IconMapPin,
  IconTractor,
  IconWallet,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const user = {
    name: "John Kamau",
    role: "Farmer",
    verificationStatus: "Verified",
    location: "Nakuru, Rift Valley",
    joinDate: "March 2021",
    email: "john.kamau@imanifarm.ke",
    walletAddress: "0x71C...9A23",
    avatar: "/avatars/john.jpg", // Placeholder
  }

  const farmStats = {
    size: "12 Acres",
    crops: ["Maize", "Beans", "Avocado"],
    sustainabilityScore: 92,
    productionCapacity: "4.5 Tons/Year",
  }

  const financialStats = {
    reputationScore: 850,
    greenCredits: 1250,
    activeLoans: 1,
    loanAmount: "KES 50,000",
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Farmer Profile</h1>
          <div className="flex gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button>Download Report</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          {/* LEFT COLUMN: IDENTITY */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">JK</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1 mb-4">
                  <Badge variant="secondary" className="rounded-full">
                    {user.role}
                  </Badge>
                  {user.verificationStatus === "Verified" && (
                    <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                      <IconCheck className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>

                <div className="w-full space-y-4 text-sm text-left mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <IconMapPin className="size-4" /> Location
                    </span>
                    <span className="font-medium">{user.location}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <IconCalendar className="size-4" /> Joined
                    </span>
                    <span className="font-medium">{user.joinDate}</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <IconWallet className="size-4" /> Wallet
                    </span>
                    <div className="flex items-center justify-between bg-muted p-2 rounded text-xs font-mono">
                      {user.walletAddress}
                      <Button variant="ghost" size="icon" className="h-4 w-4">
                        <IconCopy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="justify-start">Request Audit</Button>
                <Button variant="outline" className="justify-start">Apply for Loan</Button>
                <Button variant="outline" className="justify-start">Log Harvest</Button>
              </CardContent>
            </Card>
          </div>

          {/* MIDDLE/RIGHT COLUMN: STATS & DETAILS */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Key Metrics Row */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Reputation Score
                  </CardTitle>
                  <IconAward className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{financialStats.reputationScore}</div>
                  <p className="text-xs text-muted-foreground">
                    Excellent (Top 5% in Region)
                  </p>
                  <div className="mt-3 h-2 w-full rounded-full bg-secondary/20">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: "85%" }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Green Credits
                  </CardTitle>
                  <IconLeaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{financialStats.greenCredits}</div>
                  <p className="text-xs text-muted-foreground">
                    Available balance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Loans
                  </CardTitle>
                  <IconBuildingBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{financialStats.activeLoans}</div>
                  <p className="text-xs text-muted-foreground">
                    {financialStats.loanAmount} outstanding
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="practices">Farming Practices</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                    <CardDescription>
                      Information about the land and production.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Total Land Size</p>
                        <p className="text-lg font-semibold flex items-center gap-2">
                          <IconTractor className="size-5 text-primary" />
                          {farmStats.size}
                        </p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Est. Annual Production</p>
                        <p className="text-lg font-semibold">{farmStats.productionCapacity}</p>
                     </div>
                     <div className="col-span-full space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Primary Crops</p>
                        <div className="flex flex-wrap gap-2">
                          {farmStats.crops.map((crop) => (
                              <Badge key={crop} variant="outline" className="px-3 py-1 text-sm border-primary/30 text-primary">
                                  {crop}
                              </Badge>
                          ))}
                        </div>
                     </div>
                  </CardContent>
                </Card>

                 <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                          { title: "Soil Audit Completed", date: "2 days ago", type: "Audit" },
                          { title: "Green Credit Disbursement", date: "1 week ago", type: "Finance" },
                          { title: "Upload: Land Title Deed", date: "2 weeks ago", type: "Document" }
                      ].map((activity, i) => (
                          <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                              <div>
                                  <p className="font-medium text-sm">{activity.title}</p>
                                  <p className="text-xs text-muted-foreground">{activity.type}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">{activity.date}</span>
                          </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="practices">
                   <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                      Detailed farming logs and practices content placement.
                   </div>
              </TabsContent>
              <TabsContent value="documents">
                  <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                      Document repository content placement.
                  </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  )
}
