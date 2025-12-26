"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { 
  IconFileText, 
  IconDownload, 
  IconChartBar, 
  IconLeaf,
  IconCalendar,
  IconSearch,
  IconExternalLink
} from "@tabler/icons-react"

const reports = [
  { id: 1, title: "Q3 Impact Summary", type: "Impact", date: "2024-10-15", size: "2.4 MB" },
  { id: 2, title: "Annual Financial Statement", type: "Financial", date: "2024-01-20", size: "4.1 MB" },
  { id: 3, title: "Carbon Offset Certificate #442", type: "Environmental", date: "2024-03-05", size: "1.2 MB" },
  { id: 4, title: "Monthly Yield Report - Sep", type: "Performance", date: "2024-10-01", size: "850 KB" },
]

export default function LenderReportsPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Documentation</h1>
            <p className="text-muted-foreground mt-1">
              Access your financial statements, impact audits, and carbon certificates.
            </p>
          </div>
          <Button className="gap-2">
            <IconChartBar className="size-4" /> Generate New Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Documents</CardTitle>
                <div className="relative w-48">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input className="w-full bg-muted border-none rounded-md pl-9 py-1.5 text-xs outline-none" placeholder="Search files..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <IconFileText className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{report.title}</p>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><IconCalendar className="size-3" /> {report.date}</span>
                          <span className="flex items-center gap-1">Type: {report.type}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconDownload className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconLeaf className="size-5" /> Carbon Impact
                </CardTitle>
                <CardDescription className="text-primary-foreground/70">Cumulative environmental contribution.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">428.5</div>
                <p className="text-sm mt-1">Metric Tons CO2e Sequestered</p>
                <Separator className="my-4 bg-primary-foreground/20" />
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Trees Equivalent</span>
                    <span>~8,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Projects</span>
                    <span>12</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-white text-primary hover:bg-white/90 gap-2 font-bold">
                  View Certificates <IconExternalLink className="size-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-foreground">Report Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Auto-generate Monthly</span>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">On</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Email Notifications</span>
                  <Badge variant="outline">Off</Badge>
                </div>
                <Button variant="outline" className="w-full text-xs h-8">Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { Separator } from "@/components/ui/separator"
