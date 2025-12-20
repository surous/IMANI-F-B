"use client"

import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IconUpload } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "sonner"

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Request submitted successfully!")
    }, 1500)
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Submit Request</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Submission</CardTitle>
            <CardDescription>
              Submit a new verification request, audit log, or loan application.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Request Type</Label>
                <Select required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harvest">Harvest Log</SelectItem>
                    <SelectItem value="audit">Soil/Farm Audit</SelectItem>
                    <SelectItem value="loan">Green Loan Application</SelectItem>
                    <SelectItem value="credit">Green Credit Issuance</SelectItem>
                    <SelectItem value="incident">Report Incident</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title / Reference</Label>
                <Input id="title" placeholder="e.g., Q3 Maize Harvest or Loan for Solar Pump" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description & Details</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide detailed information about this request..." 
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                  <IconUpload className="size-8" />
                  <div className="text-sm font-medium">Click to upload or drag and drop</div>
                  <div className="text-xs">PDF, JPG, PNG up to 10MB</div>
                  <Input type="file" className="hidden" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  )
}
