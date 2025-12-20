"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "User",
    reputation: 75,
    avatar: "/avatar-placeholder.png",
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#F8FAF9] text-[#1E293B]">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="col-span-1 md:col-span-1 border-l-4 border-[#1F7A5F] shadow-lg bg-[#F8FAF9]">
              <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-2 border-[#1F7A5F] object-cover"
                />
                <h2 className="text-xl font-semibold text-[#1E293B]">{user.name}</h2>
                <p className="text-[#1E293B]/80">{user.role}</p>
                <p className="text-[#1E293B]/70">{user.email}</p>
                <div className="mt-4">
                  <span className="bg-[#2ECC71] text-[#F8FAF9] px-3 py-1 rounded-full font-semibold text-sm">
                    Reputation: {user.reputation}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card className="col-span-1 md:col-span-2 border-l-4 border-[#D4A373] shadow-lg bg-[#F8FAF9]">
              <CardHeader>
                <CardTitle className="text-[#1E293B]">Actions</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4 p-6">
                <Button className="flex-1 bg-[#1F7A5F] hover:bg-[#14543B] text-[#F8FAF9]">
                  Edit Profile
                </Button>
                <Button className="flex-1 bg-[#D4A373] hover:bg-[#B88657] text-[#1F7A5F]">
                  Change Password
                </Button>
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
