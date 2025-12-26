"use client"

import Link from "next/link"
import { useState } from "react"

type Role = "FARMER" | "LENDER" | "AUTHENTICATOR"

export default function LoginForm({ role }: { role: Role }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    walletAddress: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    let payload: any = {}
    if (role === "FARMER") {
      payload = {
        walletAddress: form.walletAddress,
        signedMessage: "mock-signature", // In real app, use Lucid/Wallet extension
        message: "Login to Imani"
      }
    } else {
      payload = {
        email: form.email,
        password: form.password
      }
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Login failed")

      // Store token in LocalStorage for demo (shoud use httpOnly cookies in production)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Direct to dashboard based on role
      if (data.user.role === "FARMER") window.location.href = "/profile"
      else if (data.user.role === "LENDER") window.location.href = "/lender"
      else window.location.href = "/dashboard"

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
           {role} LOGIN
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {role !== "FARMER" ? (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="user@example.com"
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>
          </>
        ) : (
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground ml-1">Cardano Wallet Address</label>
            <input
              name="walletAddress"
              placeholder="addr1..."
              onChange={handleChange}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-sm hover:translate-y-[-1px] active:translate-y-[0px] hover:shadow-md transition-all active:opacity-90 disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Login to Imani"}
        </button>
      </form>

      <div className="text-center">
         <Link href="/auth" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Switch role
         </Link>
      </div>
    </div>
  )
}
