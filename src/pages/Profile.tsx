import { useAuth } from '../contexts/AuthContext'
import { useUserAction } from '../contexts/UserActionContext'
import { Link, Navigate } from 'react-router'
import { Leaf, Phone, Mail, Calendar, Star, History, Filter } from 'lucide-react'

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const { history, karmaPoints, totalCo2e } = useUserAction()

  if (!currentUser) {
    return <Navigate to="/signin" />
  }

  const joinedDateStr = new Date(currentUser.joinedDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  // Group recent history if needed, or just slice
  const recentHistory = history.slice(0, 10)

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-section-gap">
      <div className="mb-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
          My Impact Dashboard
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
          Track your contributions, review your logged actions, and see the tangible difference your disciplined optimism is making.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* User Card */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/20 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-primary-fixed rounded-xl flex items-center justify-center text-primary-fixed-dim shrink-0 shadow-sm border border-outline-variant/30 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}&backgroundColor=012d1d&textColor=ffffff`} 
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary">{currentUser.name}</h2>
              <span className="inline-flex items-center gap-1 bg-primary-fixed/30 px-2 py-1 rounded-full mt-1 border border-primary-fixed">
                <Leaf size={14} className="text-primary" />
                <span className="font-label-md text-[12px] text-primary">Verified Optimist</span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-outline" />
              <span className="font-body-md text-body-md text-on-surface-variant">+91 {currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-outline" />
              <span className="font-body-md text-body-md text-on-surface-variant">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-outline" />
              <span className="font-body-md text-body-md text-on-surface-variant">Joined {joinedDateStr}</span>
            </div>
          </div>
          
          <div className="mt-auto space-y-3">
            <button 
              onClick={() => alert('Edit profile functionality is coming soon!')}
              className="w-full py-2 px-4 border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors"
            >
              Edit Profile
            </button>
            <button 
              onClick={logout}
              className="w-full py-2 px-4 border border-transparent text-error font-label-md text-label-md rounded-lg hover:bg-error/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Karma Points Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/20 flex flex-col justify-center items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold rounded-bl-full opacity-10 -z-10"></div>
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <Star size={18} className="text-accent-gold fill-accent-gold" />
              Karma Points
            </span>
            <div className="font-display-lg text-[64px] font-bold text-accent-gold leading-none my-2">{karmaPoints}</div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Top 15% of all active contributors this month.
            </p>
          </div>
          
          {/* CO2e Saved Card */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/20 flex flex-col justify-center items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-bl-full opacity-5 -z-10"></div>
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <Leaf size={18} className="text-primary-container" />
              CO₂e Saved
            </span>
            <div className="font-display-lg text-[64px] font-bold text-primary-container leading-none my-2">
              {(totalCo2e / 1000).toFixed(1)}<span className="text-3xl text-outline ml-1 font-body-lg font-normal">Kgs</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Every action counts towards a cooler planet.
            </p>
          </div>

        </div>

        {/* Action History Table */}
        <div className="md:col-span-12 mt-6 bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/50">
            <h3 className="font-headline-md text-[20px] font-semibold text-on-surface flex items-center gap-2">
              <History size={20} className="text-primary" />
              Action History
            </h3>
            <button className="flex items-center gap-2 text-primary font-label-md text-label-md hover:text-primary-container transition-colors">
              Filter <Filter size={16} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container/50 border-b border-outline-variant/30">
                  <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">Action Name</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">Date</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-outline uppercase tracking-wider font-semibold text-right">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {recentHistory.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-on-surface-variant font-body-md">
                      You haven't logged any actions yet. 
                      <Link to="/library" className="block mt-2 text-primary hover:underline">
                        Explore the Action Library
                      </Link>
                    </td>
                  </tr>
                ) : (
                  recentHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-container/30 transition-colors">
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary">
                          <Leaf size={14} />
                        </div>
                        {item.actionId}
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md text-primary-container font-semibold text-right">
                        {(item.impactValue / 1000).toFixed(2)} Kg CO₂e
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {history.length > 0 && (
            <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container/30 flex justify-center">
              <button className="text-primary font-label-md text-label-md hover:underline">
                View All History
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
