"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconUser, IconBuildingBank, IconShieldCheck, IconArrowRight } from "@tabler/icons-react"

export default function AuthSelectionPage() {
  const roles = [
    {
      title: "Farmer",
      description: "Submit sustainable practices and build your trust score.",
      href: "/Registration/farmer",
      loginHref: "/Login/farmer",
      icon: <IconUser className="size-8 text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Lender / Investor",
      description: "Discover and fund verified climate-resilient farming.",
      href: "/Registration/lender",
      loginHref: "/Login/lender",
      icon: <IconBuildingBank className="size-8 text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Authenticator",
      description: "Verify farming evidence and secure the network.",
      href: "/Registration/authenticator",
      loginHref: "/Login/authenticator",
      icon: <IconShieldCheck className="size-8 text-accent" />,
      color: "bg-accent/10",
    },
  ]

  return (
    <main className="min-h-screen bg-[#F8FAF9] flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Welcome to Imani</h1>
          <p className="text-muted-foreground text-lg">Choose your perspective to get started</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
              <CardHeader className="text-center">
                <div className={`mx-auto rounded-full p-4 w-fit mb-4 ${role.color}`}>
                  {role.icon}
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  href={role.href}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Join as {role.title} <IconArrowRight className="size-4" />
                </Link>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Already have an account? </span>
                  <Link href={role.loginHref} className="text-sm font-semibold text-primary hover:underline">
                    Log in
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Link href="/" className="inline-block text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to Landing Page
        </Link>
      </div>
    </main>
  )
}
