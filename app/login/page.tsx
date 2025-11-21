import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Acesse o painel administrativo da Homsi Engenharia',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: 'https://homsiengenharia.com.br/login',
  },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/background-login.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-xl bg-black/40 rounded-2xl border border-white/20 shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <img 
                src="/images/icon-white.svg?v=2" 
                alt="Homsi Engenharia" 
                className="w-6 h-6 transition-all duration-300 brightness-0 invert"
              />
              <h1 className="text-xl font-bold !text-white tracking-wide">
                HOMSI ENGENHARIA
              </h1>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
