"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/Badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  IconSearch, 
  IconUserPlus, 
  IconDotsVertical,
  IconShieldCheck,
  IconAlertCircle,
  IconFilter
} from "@tabler/icons-react"

const users = [
  { id: 1, name: "Samuel Omondi", email: "samuel@farm.co", role: "Farmer", status: "Verified", joinDate: "2024-03-12" },
  { id: 2, name: "Alice Mwangi", email: "alice@invest.com", role: "Lender", status: "Pending", joinDate: "2024-03-14" },
  { id: 3, name: "Dr. Peter Kwabe", email: "p.kwabe@soil.org", role: "Auditor", status: "Verified", joinDate: "2024-02-28" },
  { id: 4, name: "Jane Doe", email: "jane@imani.com", role: "Admin", status: "Verified", joinDate: "2024-01-15" },
  { id: 5, name: "Mike Tyson", email: "mike@greenharvest.com", role: "Farmer", status: "Suspended", joinDate: "2024-03-01" },
]

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage platform participants, verify identities, and assign roles.
            </p>
          </div>
          <Button className="gap-2">
            <IconUserPlus className="size-4" />
            Add New User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <CardTitle>Platform Users</CardTitle>
                <CardDescription>A total of {users.length} registered users.</CardDescription>
              </div>
              <div className="flex flex-1 md:max-w-sm items-center gap-2">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search name, email, or role..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <IconFilter className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.status === "Verified" ? (
                            <IconShieldCheck className="size-4 text-emerald-500" />
                          ) : user.status === "Suspended" ? (
                            <IconAlertCircle className="size-4 text-destructive" />
                          ) : (
                            <div className="size-2 rounded-full bg-orange-500 animate-pulse" />
                          )}
                          <span className={
                            user.status === "Verified" ? "text-emerald-600 dark:text-emerald-400" :
                            user.status === "Suspended" ? "text-destructive" :
                            "text-orange-600 dark:text-orange-400"
                          }>
                            {user.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.joinDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <IconDotsVertical className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
