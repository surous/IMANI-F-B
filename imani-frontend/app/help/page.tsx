"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/input"
import { 
  IconHelp, 
  IconSearch, 
  IconMessageCircle, 
  IconMail, 
  IconPhone,
  IconChevronRight,
  IconBook,
  IconLifebuoy
} from "@tabler/icons-react"

const faqs = [
  { q: "How are trust scores calculated?", a: "Trust scores are based on historical yield consistency, loan repayment efficiency, and adherence to sustainable farming standards verified by our auditors." },
  { q: "How do I withdraw funds?", a: "You can withdraw funds to your linked bank account or mobile money wallet through the 'Wallet' tab in your profile." },
  { q: "What documents are required for a loan?", a: "Standard requirements include farm ownership/lease proof, last 3 harvest logs, and identity verification." },
  { q: "What is an IMANI carbon credit?", a: "One IMANI token represents one metric ton of CO2 sequestered through regenerative practices confirmed on our platform." },
]

export default function HelpPage() {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-8">
          <Badge className="bg-primary/10 text-primary border-none py-1 px-3 text-xs font-bold uppercase tracking-widest">Support Center</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">How can we help you?</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Search our knowledge base or contact a support agent directly.
          </p>
          <div className="relative max-w-xl mx-auto mt-8">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input className="pl-12 py-6 text-base rounded-2xl shadow-sm" placeholder="Search for answers..." />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-2 group-hover:scale-110 transition-transform">
                <IconBook className="size-6" />
              </div>
              <CardTitle className="text-lg">Knowledge Base</CardTitle>
              <CardDescription>Detailed guides on using the platform.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-2 group-hover:scale-110 transition-transform">
                <IconLifebuoy className="size-6" />
              </div>
              <CardTitle className="text-lg">Community</CardTitle>
              <CardDescription>Connect with other farmers and lenders.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary mb-2 group-hover:scale-110 transition-transform">
                <IconMessageCircle className="size-6" />
              </div>
              <CardTitle className="text-lg">Live Chat</CardTitle>
              <CardDescription>Talk to our human support team 24/7.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold px-1">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="bg-muted/30 border-none">
                <CardHeader className="py-4 cursor-pointer">
                  <div className="flex justify-between items-center group">
                    <CardTitle className="text-base font-semibold">{faq.q}</CardTitle>
                    <IconChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                    "{faq.a}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle>Still need help?</CardTitle>
            <CardDescription className="text-primary-foreground/70">Our dedicated team is ready to assist you.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4 justify-center py-6">
            <Button className="bg-white text-primary hover:bg-white/90 gap-2 font-bold px-8">
              <IconMail className="size-4" /> Email Us
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white gap-2 px-8">
              <IconPhone className="size-4" /> Request a Callback
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
