export default function LoginForm() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold text-[#1E293B]">
        Welcome to Imani
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Trusted access to green finance
      </p>

      {/* LOGIN FORM */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[#1E293B] outline-none focus:border-[#1F7A5F] focus:ring-2 focus:ring-[#1F7A5F]/30"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[#1E293B] outline-none focus:border-[#1F7A5F] focus:ring-2 focus:ring-[#1F7A5F]/30"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#1F7A5F] py-2 font-medium text-white transition hover:bg-[#17624C]"
        >
          Login
        </button>
      </form>

      {/* DIVIDER */}
      <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
        <span className="h-px w-full bg-gray-200" />
        OR
        <span className="h-px w-full bg-gray-200" />
      </div>

      {/* REGISTRATION OPTIONS */}
      <div className="space-y-3">
        <a
          href="/register/farmer"
          className="block w-full rounded-lg border border-[#1F7A5F] px-4 py-2 text-center font-medium text-[#1F7A5F] hover:bg-[#1F7A5F]/10"
        >
          🌱 Register as Farmer
        </a>

        <a
          href="/register/lender"
          className="block w-full rounded-lg border border-[#D4A373] px-4 py-2 text-center font-medium text-[#8B5E34] hover:bg-[#D4A373]/20"
        >
          💰 Register as Lender
        </a>

        <a
          href="/register/authenticator"
          className="block w-full rounded-lg border border-slate-400 px-4 py-2 text-center font-medium text-slate-700 hover:bg-slate-100"
        >
          ✅ Register as Authenticator
        </a>
      </div>
    </div>
  )
}
