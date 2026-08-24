import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, X, User } from 'lucide-react'
import Rethink_logo from '../../assets/logo-color.svg'
import { useAuth } from '../../contexts/AuthContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/story', label: 'The Story' },
  { to: '/library', label: 'Micro-Action Library' },
] as const

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-surface-bright shadow-sm">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          onClick={() => setMobileOpen(false)}
        >
          <img src={Rethink_logo} alt="ReThink — an initiative of Re" className="h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-label-md font-label-md pb-1 transition-all duration-200 hover:text-primary ${
                  isActive
                    ? 'border-b-2 border-primary font-bold text-primary'
                    : 'font-semibold text-on-surface-variant'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

          {/* Desktop Auth / CTA */}
          <div className="hidden md:flex">
            {currentUser ? (
              <NavLink 
                to="/profile"
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-primary-container text-on-primary' 
                      : 'bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-on-surface'
                  }`
                }
              >
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}&backgroundColor=012d1d&textColor=ffffff`}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-label-md text-label-md">{currentUser.name}</span>
              </NavLink>
              ) : (
                <NavLink
                  to="/signin"
                  className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-primary transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  Sign In
                </NavLink>
              )}
          </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="p-2 text-on-surface-variant md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="border-t border-outline-variant bg-surface-bright px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-body-lg font-body-lg block py-3 ${
                      isActive ? 'font-bold text-primary' : 'text-on-surface-variant'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {currentUser ? (
            <Link
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className="text-label-md font-label-md mt-4 flex items-center justify-center gap-3 rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-4 text-center font-semibold text-on-surface transition-all duration-200 hover:bg-surface-container"
            >
              <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}&backgroundColor=012d1d&textColor=ffffff`}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              My Profile
            </Link>
          ) : (
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="text-label-md font-label-md mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-4 text-center font-semibold text-on-primary transition-all duration-200 hover:opacity-80"
            >
              <User size={20} />
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
