'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin')
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-100 bg-green-500/20 border border-green-300/30 p-4 rounded-md backdrop-blur-sm">
          <p className="font-medium">Conta criada com sucesso!</p>
          <p className="text-sm mt-2">Redirecionando...</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-white font-medium">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/30 focus:border-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-white font-medium">Senha</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/30 focus:border-white/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-white font-medium">Confirmar Senha</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          minLength={6}
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/30 focus:border-white/50"
        />
      </div>

      {error && (
        <div className="text-sm text-red-100 bg-red-500/20 border border-red-300/30 p-3 rounded-md backdrop-blur-sm">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold shadow-lg" 
        disabled={loading}
      >
        {loading ? 'Criando conta...' : 'Criar conta'}
      </Button>
    </form>
  )
}
