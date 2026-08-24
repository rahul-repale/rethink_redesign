import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Mock login: just create a dummy user based on the email
    login({
      id: crypto.randomUUID(),
      name: email.split('@')[0], // Extract name from email for demo
      email,
      phone: '9999999999',
      joinedDate: new Date().toISOString(),
    })
    navigate('/')
  }

  return (
    <main className="flex-grow flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-ambient p-8 sm:p-12 relative overflow-hidden border border-outline-variant/30">
        {/* Decorative subtle element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-fixed opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="text-center mb-10 relative z-10">
          <h1 className="font-headline-md text-headline-md font-semibold text-primary mb-2">ReThink</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Sign in to continue to your dashboard.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block font-label-md text-label-md uppercase text-on-surface mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              className="block w-full rounded-md border border-outline-variant bg-transparent py-3 px-4 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
              id="email" 
              name="email" 
              placeholder="you@example.com" 
              required 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block font-label-md text-label-md uppercase text-on-surface" htmlFor="password">
                Password
              </label>
              <a className="font-label-md text-label-md text-primary-fixed-dim hover:text-primary transition-colors" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input 
                className="block w-full rounded-md border border-outline-variant bg-transparent py-3 pl-4 pr-12 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm font-label-md text-label-md uppercase text-on-primary bg-primary-container hover:bg-primary transition-colors duration-200" 
            type="submit"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center relative z-10">
          <p className="font-body-md text-body-md text-on-surface-variant">
            New to ReThink?{' '}
            <Link className="font-label-md text-label-md text-primary hover:underline transition-all" to="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
