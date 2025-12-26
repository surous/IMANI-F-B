import RegisterForm from "@/components/registeration-form"

export default function AuthenticatorRegister() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-6">
       <RegisterForm role="AUTHENTICATOR" />
    </main>
  )
}
