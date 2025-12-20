"use client"

import Layout from "@/components/layout"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function ReputationPage() {
  const users = [
    { name: "Alice", reputation: 95 },
    { name: "Bob", reputation: 87 },
    { name: "Charlie", reputation: 78 },
  ]

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-charcoal">Reputation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, i) => (
          <Card key={i} className="border-l-4 border-primary">
            <CardHeader>
              <CardTitle className="text-charcoal">{user.name}</CardTitle>
              <CardDescription>User reputation score</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-primary">{user.reputation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
