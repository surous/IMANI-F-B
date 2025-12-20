export default function LoginForm() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold text-[#1E293B]">
        Welcome to Imani
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Trusted access to green finance
      </p>

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

      <p className="mt-4 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <a href="#" className="font-medium text-[#D4A373] hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}
