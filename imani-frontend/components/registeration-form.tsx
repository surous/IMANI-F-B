"use client"

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: RegisterPayload = {
      email: form.email,
      username: form.username,
      role,
    }

    if (role !== "FARMER") payload.password = form.password
    if (role === "FARMER") payload.walletAddress = form.walletAddress

    console.log("Submitting payload:", payload)

    await fetch("{{baseUrl}}/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow">
      <h1 className="mb-1 text-2xl font-bold text-slate-800">
        Register as {role}
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        Create your Imani account
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full rounded-lg border px-3 py-2"
          required
        />

        {role !== "FARMER" && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        )}

        {role === "FARMER" && (
          <input
            name="walletAddress"
            placeholder="Wallet Address"
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
            required
          />
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#1F7A5F] py-2 text-white hover:bg-[#17624C]"
        >
          Register
        </button>
      </form>
    </div>
  )
}
