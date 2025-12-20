"use client"

import Layout from "@/components/layout"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { IconArrowRight, IconBook, IconCloudRain, IconDownload, IconLeaf, IconScale, IconSearch, IconUsers } from "@tabler/icons-react"

export default function StandardsPage() {
  const standards = [
    {
      title: "Soil Health Protocol",
      description: "Guidelines for maintaining and improving soil organic matter and biodiversity.",
      icon: IconLeaf,
      category: "Environment",
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Water Management",
      description: "Efficient irrigation practices and water conservation requirements.",
      icon: IconCloudRain,
      category: "Environment",
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Fair Labor Practices",
      description: "Compliance standards for worker safety, wages, and working conditions.",
      icon: IconUsers,
      category: "Social",
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Carbon Measurement",
      description: "Methodologies for calculating and reporting carbon sequestration.",
      icon: IconScale,
      category: "Technical",
      color: "text-purple-600 bg-purple-100",
    },
  ]

  const resources = [
    { title: "Imani Verification Handbook v2.0", type: "PDF", size: "2.4 MB" },
    { title: "Soil Sample Collection Guide", type: "PDF", size: "1.1 MB" },
    { title: "Green Credit Calculation Template", type: "XLSX", size: "450 KB" },
  ]

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-8 p-4 lg:gap-8 lg:p-8 animate-in fade-in duration-500 max-w-6xl mx-auto w-full">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 py-8">
          <Badge variant="outline" className="mb-2">Knowledge Base</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Platform Standards & Guidelines</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Understand the requirements for verification, green credit issuance, and sustainable farming on Imani.
          </p>
          
          <div className="relative max-w-md mx-auto mt-6">
            <IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 bg-background" placeholder="Search standards..." />
          </div>
        </div>

        <Separator />

        {/* STANDARDS GRID */}
        <div>
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-semibold flex items-center gap-2">
                <IconBook className="size-5 text-primary" /> Core Standards
             </h2>
             <Button variant="link" className="text-muted-foreground">View all</Button>
           </div>
           
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {standards.map((item, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer group border-muted">
                    <CardHeader>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.color}`}>
                            <item.icon className="size-6" />
                        </div>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                        <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Read Guidelines <IconArrowRight className="ml-1 size-4" />
                        </div>
                    </CardContent>
                </Card>
             ))}
           </div>
        </div>

        {/* RESOURCES SECTION */}
        <div className="bg-muted/30 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-6">Downloadable Resources</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {resources.map((res, i) => (
                    <div key={i} className="flex items-center gap-4 bg-background p-4 rounded-lg border hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 bg-primary/10 text-primary rounded flex items-center justify-center">
                            <IconDownload className="size-5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{res.title}</p>
                            <p className="text-xs text-muted-foreground">{res.type} • {res.size}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </Layout>
  )
}
