"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "User",
    reputation: 75,
    avatar: "/avatar-placeholder.png",
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <main className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="col-span-1 shadow">
            <CardContent className="flex flex-col items-center text-center gap-4 p-6">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-2 border-slate-200 object-cover"
              />
              <h2 className="text-lg md:text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-slate-600">{user.role}</p>
              <p className="text-sm text-slate-500">{user.email}</p>

              <div className="w-full mt-3">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Reputation</span>
                  <span className="font-medium">{user.reputation}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${user.reputation}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions / Settings */}
          <Card className="col-span-1 md:col-span-2 shadow">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal details and security</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Edit Profile</Button>
                <Button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900">Change Password</Button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
