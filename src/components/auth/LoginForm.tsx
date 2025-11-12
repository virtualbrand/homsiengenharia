'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState({ email: false, password: false })
  const router = useRouter()
  const supabase = createClient()

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/admin')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const emailError = touched.email && email && !validateEmail(email)
  const passwordError = touched.password && password && password.length < 6

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="w-full">
        <label htmlFor="email" className="block text-white font-semibold mb-2">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
          required
          disabled={loading}
          className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
            emailError
              ? 'border-red-400 focus:ring-red-400'
              : 'border-white/20 focus:ring-primary-500 focus:border-transparent'
          }`}
        />
        {emailError && (
          <p className="text-sm mt-1 text-red-300">Por favor, insira um e-mail válido</p>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="password" className="block text-white font-semibold mb-2">
          Senha *
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched({ ...touched, password: true })}
            required
            disabled={loading}
            className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all pr-12 ${
              passwordError
                ? 'border-red-400 focus:ring-red-400'
                : 'border-white/20 focus:ring-primary-500 focus:border-transparent'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {passwordError && (
          <p className="text-red-400 text-xs mt-1">A senha deve ter pelo menos 6 caracteres</p>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-100 bg-red-500/20 border border-red-300/30 p-3 rounded-lg backdrop-blur-sm">
          {error}
        </div>
      )}

      <button
        type="submit" 
        className="w-full btn-primary rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed transition-all" 
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
