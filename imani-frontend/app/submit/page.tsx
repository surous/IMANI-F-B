"use client"

import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IconUpload } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SubmitPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [practices, setPractices] = useState<any[]>([])
  const [selectedPractice, setSelectedPractice] = useState("")
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    fetch('/api/practices')
      .then(res => res.json())
      .then(data => setPractices(data))
      .catch(err => console.error("Failed to fetch practices", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPractice || !file) {
      toast.error("Please select a practice and upload evidence.")
      return
    }

    setIsSubmitting(true)
    const token = localStorage.getItem("token")

    const formData = new FormData()
    formData.append("practiceId", selectedPractice)
    formData.append("evidence", file)

    try {
      const res = await fetch("/api/attestations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || "Submission failed")

      toast.success("Attestation submitted successfully!")
      router.push("/reputation")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
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
                <Label htmlFor="type">Sustainable Practice</Label>
                <Select required value={selectedPractice} onValueChange={setSelectedPractice}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select practice..." />
                  </SelectTrigger>
                  <SelectContent>
                    {practices.map((p: any) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.name} ({p.points} pts)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Supporting Evidence (Image)</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors ${file ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50 cursor-pointer'}`}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <IconUpload className={`size-8 ${file ? 'text-primary' : ''}`} />
                  <div className="text-sm font-medium">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </div>
                  <div className="text-xs">JPG, PNG up to 10MB</div>
                  <Input 
                    id="file-input"
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden" 
                    accept="image/*"
                  />
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
