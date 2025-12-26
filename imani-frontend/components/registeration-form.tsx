"use client"

import Link from "next/link"
import { useState } from "react"

type Role = "FARMER" | "LENDER" | "AUTHENTICATOR"

type RegisterPayload = {
  email: string
  username: string
  role: Role
  password?: string
  walletAddress?: string
}

export default function RegisterForm({ role }: { role: Role }) {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    walletAddress: "",
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setError("");

    const payload: RegisterPayload = {
      email: form.email,
      username: form.username,
      role,
    }

    if (role !== "FARMER") payload.password = form.password
    if (role === "FARMER") payload.walletAddress = form.walletAddress

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
        alert("Registration successful! Please log in.");
        window.location.href = `/Login/${role.toLowerCase()}`; 
      } else {
        const text = await res.text();
        console.error("Non-JSON response received:", text.substring(0, 200));
        throw new Error(`Server returned non-JSON response (${res.status}). See console.`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Join Imani
        </h1>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
           {role} REGISTRATION
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground ml-1">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="farmer@example.com"
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground ml-1">Full Name / Username</label>
          <input
            name="username"
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>

        {role !== "FARMER" && (
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
        )}

        {role === "FARMER" && (
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
          {loading ? "Creating Account..." : `Continue as ${role.charAt(0) + role.slice(1).toLowerCase()}`}
        </button>
      </form>
      
      <div className="text-center">
         <Link href="/auth" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Choose a different role
         </Link>
      </div>
    </div>
  )
}
