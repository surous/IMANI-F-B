"use client"

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Farmer",
    reputation: 75,
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-900 py-12">
      <main className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PROFILE CARD */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
                JD
              </div>

              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-slate-600">{user.role}</p>
              <p className="text-sm text-slate-500">{user.email}</p>

              {/* Reputation */}
              <div className="w-full mt-4">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Reputation</span>
                  <span className="font-medium">{user.reputation}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-2 rounded-full bg-[#1F7A5F]"
                    style={{ width: `${user.reputation}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="md:col-span-2 rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold mb-1">Account Settings</h3>
            <p className="text-sm text-slate-600 mb-6">
              Manage your personal details and security
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="rounded-lg bg-[#1F7A5F] px-4 py-3 text-white hover:bg-[#17624C]">
                Edit Profile
              </button>

              <button className="rounded-lg bg-amber-400 px-4 py-3 text-slate-900 hover:bg-amber-500">
                Change Password
              </button>
            </div>

            <div className="mt-6 border-t pt-4">
              <button className="w-full rounded-lg bg-red-500 px-4 py-3 text-white hover:bg-red-600">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
