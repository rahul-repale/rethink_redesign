import { Outlet, Link, useLocation } from 'react-router'
import { Plus } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  
  return (
    <div className="font-body-md flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <Outlet />
      
      {/* Global FAB to jump to action logging, except when already on the library page */}
      {location.pathname !== '/library' && (
        <Link 
          to="/library"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary-container px-6 py-4 font-label-md text-label-md uppercase tracking-wider text-on-primary shadow-lg transition-all motion-safe:hover:-translate-y-1 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 motion-reduce:transition-none"
          aria-label="Take an action"
        >
          <Plus size={20} />
          <span>Take Action</span>
        </Link>
      )}
      
      <Footer />
    </div>
  )
}
