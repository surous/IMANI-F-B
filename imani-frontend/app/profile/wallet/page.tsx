"use client"

import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { 
  IconWallet, 
  IconArrowUpRight, 
  IconArrowDownLeft, 
  IconLeaf,
  IconCoins,
  IconClock,
  IconDots
} from "@tabler/icons-react"

const transactions = [
  { id: 1, type: "Disbursement", amount: "+$3,000.00", status: "Completed", date: "Today", detail: "Solar Pump Loan #122" },
  { id: 2, type: "Credit Earned", amount: "+$420.00", status: "Completed", date: "Yesterday", detail: "Carbon Credits - Q3 Harvest" },
  { id: 3, type: "Marketplace", amount: "-$150.00", status: "Completed", date: "Oct 12", detail: "Seed Procurement" },
  { id: 4, type: "Yield Payout", amount: "+$1,200.00", status: "Pending", date: "Oct 10", detail: "Corn Yield Verification" },
]

export default function FarmerWalletPage() {
  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">My Wallet</h1>
            <p className="text-muted-foreground mt-1">
              Manage your loan disbursements, carbon earnings, and payments.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none gap-2">
              <IconArrowUpRight className="size-4" /> Send
            </Button>
            <Button className="flex-1 md:flex-none gap-2">
              <IconArrowDownLeft className="size-4" /> Withdraw
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1 bg-gradient-to-br from-primary to-primary-foreground text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <IconWallet className="size-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-widest">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$4,470.00</div>
              <div className="mt-8 flex gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] opacity-70">Pending Credits</p>
                  <p className="text-sm font-bold">$1,200.00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] opacity-70">Total Earned</p>
                  <p className="text-sm font-bold">$12,850.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
              <IconCoins className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,240 <span className="text-xs font-normal text-muted-foreground">IMANI</span></div>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                Value: $1,240.00
              </p>
              <Button variant="ghost" className="w-full mt-4 text-xs h-8 text-primary font-bold bg-primary/5 hover:bg-primary/10">Convert to USD</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-1 border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
              <IconDots className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium">Bank *8842</span>
                  </div>
                  <Badge variant="outline" className="text-[8px] h-4">Primary</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50 opacity-50">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium">M-Pesa 254...</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-[10px] h-7 border-dashed">+ Link Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest financial transactions and credit earnings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${tx.amount.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                      {tx.amount.startsWith('+') ? <IconArrowDownLeft className="size-4" /> : <IconArrowUpRight className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{tx.detail}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{tx.type}</span>
                        <span>•</span>
                        <span>{tx.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                      {tx.amount}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      {tx.status === "Pending" && <IconClock className="size-3 text-orange-500 animate-pulse" />}
                      <span className={`text-[10px] uppercase font-bold tracking-tighter ${tx.status === "Pending" ? "text-orange-500" : "text-muted-foreground"}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-muted-foreground">See full transaction history</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
