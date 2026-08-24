import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [terms, setTerms] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!terms) return
    
    // Add validation for 10 digits if a phone is provided
    if (phone && !/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.")
      return
    }
    
    signup({
      name,
      email,
      phone: phone || '9999999999',
    })
    navigate('/')
  }

  return (
    <main className="flex-grow flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-ambient p-8 sm:p-12 border border-outline-variant/30 relative overflow-hidden">
        {/* Brand Identity */}
        <div className="mb-8 text-center relative z-10">
          <h1 className="font-headline-md text-headline-md font-semibold text-primary mb-2">ReThink</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Join the movement of disciplined optimism.</p>
        </div>
        
        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6 relative z-10">
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface uppercase mb-2" htmlFor="fullName">Full Name</label>
              <input 
                className="w-full bg-transparent border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 outline-none" 
                id="fullName" 
                name="fullName" 
                placeholder="Jane Doe" 
                required 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface uppercase mb-2" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-transparent border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 outline-none" 
                id="email" 
                name="email" 
                placeholder="jane@example.com" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface uppercase mb-2" htmlFor="phone">Phone Number (WhatsApp)</label>
              <input 
                className="w-full bg-transparent border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary px-4 py-3 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 outline-none" 
                id="phone" 
                name="phone" 
                placeholder="10-digit number (e.g. 9876543210)" 
                pattern="\d{10}"
                title="Please enter a valid 10-digit phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
            {/* Password */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface uppercase mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border border-outline-variant rounded-md focus:border-primary focus:ring-1 focus:ring-primary py-3 pl-4 pr-12 font-body-md text-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/50 outline-none" 
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
          </div>
          
          {/* Terms */}
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input 
                className="h-4 w-4 rounded border-outline-variant text-primary-container focus:ring-primary-container bg-transparent" 
                id="terms" 
                name="terms" 
                required 
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-body-md text-body-md text-on-surface-variant" htmlFor="terms">
                I agree to the <a className="text-primary underline hover:text-primary-fixed transition-colors" href="/terms.pdf" target="_blank">Terms of Service</a> and <a className="text-primary underline hover:text-primary-fixed transition-colors" href="#">Privacy Policy</a>.
              </label>
            </div>
          </div>
          
          {/* CTA */}
          <button 
            className="w-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider py-4 rounded-lg shadow-sm hover:bg-primary transition-colors flex justify-center items-center gap-2" 
            type="submit"
          >
            Join ReThink
            <ArrowRight size={18} />
          </button>
        </form>
        
        {/* Sign In Link */}
        <div className="mt-8 text-center relative z-10">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already a member?{' '}
            <Link className="text-primary font-semibold hover:underline transition-all" to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
