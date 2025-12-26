import LoginForm from "@/components/login-form"

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAF9]">
      <LoginForm role="AUTHENTICATOR" />
    </div>
  )
}
