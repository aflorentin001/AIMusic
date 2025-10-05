'use client'

import React, { useState, useEffect } from 'react'
import { Coins, User, Settings, LogOut, ChevronDown, RefreshCw, Home, Music, Zap, Library } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useCredits } from '@/hooks/useCredits'

interface DashboardHeaderProps {
  currentPage?: string
}

export default function DashboardHeader({ currentPage }: DashboardHeaderProps = {}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const { credits, isLoading, refreshCredits } = useCredits()

  // Get current page name
  const getPageName = () => {
    if (currentPage) return currentPage
    if (pathname === '/dashboard') return 'Home'
    if (pathname === '/generate') return 'Generate Music'
    if (pathname === '/credits') return 'Credits'
    if (pathname === '/tracks') return 'My Tracks'
    if (pathname === '/profile') return 'Profile'
    return 'Home'
  }

  // Get page icon
  const getPageIcon = () => {
    const pageName = getPageName()
    if (pageName === 'Home') return <Home style={{ width: '1.25rem', height: '1.25rem' }} />
    if (pageName === 'Generate Music') return <Music style={{ width: '1.25rem', height: '1.25rem' }} />
    if (pageName === 'Credits') return <Zap style={{ width: '1.25rem', height: '1.25rem' }} />
    if (pageName === 'My Tracks') return <Library style={{ width: '1.25rem', height: '1.25rem' }} />
    if (pageName === 'Profile') return <User style={{ width: '1.25rem', height: '1.25rem' }} />
    return <Home style={{ width: '1.25rem', height: '1.25rem' }} />
  }

  // Page navigation items
  const pageItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Generate Music', path: '/generate', icon: Music },
    { name: 'Credits', path: '/credits', icon: Zap },
    { name: 'My Tracks', path: '/tracks', icon: Library },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
      if (!target.closest('.page-dropdown')) {
        setIsPageDropdownOpen(false)
      }
    }

    if (isDropdownOpen || isPageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen, isPageDropdownOpen])

  const handleSignOut = async () => {
    setIsDropdownOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false)
    router.push(path)
  }

  // Get user initials
  const getInitials = () => {
    if (!session?.user?.name) return 'U'
    return session.user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get display name
  const getDisplayName = () => {
    return session?.user?.name || 'User'
  }

  // Get email
  const getEmail = () => {
    return session?.user?.email || ''
  }

  // Handle refresh credits
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshCredits()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <>
      <style jsx>{`
        .header-container {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 1rem 1.5rem !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
        }
        .header-content {
          max-width: 80rem !important;
          margin: 0 auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }
        .page-dropdown {
          position: relative !important;
        }
        .page-button {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          background: transparent !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          padding: 0.5rem !important;
          border-radius: 0.5rem !important;
        }
        .page-button:hover {
          background: rgba(59, 130, 246, 0.1) !important;
        }
        .page-dropdown-menu {
          position: absolute !important;
          top: calc(100% + 0.5rem) !important;
          left: 0 !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 1rem !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          min-width: 220px !important;
          padding: 0.5rem !important;
          z-index: 100 !important;
        }
        .header-title {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: #111827 !important;
          margin: 0 !important;
        }
        .header-right {
          display: flex !important;
          align-items: center !important;
          gap: 2rem !important;
        }
        .credits-display {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          background: rgba(255, 255, 255, 0.9) !important;
          padding: 0.75rem 1.25rem !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
        .credits-icon {
          width: 2rem !important;
          height: 2rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 0.5rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .credits-text {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
        }
        .credits-label {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        .refresh-btn {
          background: none !important;
          border: none !important;
          color: #6b7280 !important;
          cursor: pointer !important;
          padding: 0.25rem !important;
          border-radius: 0.25rem !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .refresh-btn:hover:not(:disabled) {
          background: #f3f4f6 !important;
          color: #3b82f6 !important;
        }
        .refresh-btn:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
        .user-dropdown {
          position: relative !important;
        }
        .user-button {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          background: rgba(255, 255, 255, 0.9) !important;
          padding: 0.75rem 1rem !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .user-button:hover {
          background: rgba(255, 255, 255, 1) !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }
        .user-avatar {
          width: 2.5rem !important;
          height: 2.5rem !important;
          background: linear-gradient(135deg, #f97316, #ea580c) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: 600 !important;
          color: white !important;
        }
        .user-info {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
        }
        .user-name {
          font-size: 1rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
          line-height: 1.2 !important;
        }
        .user-email {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
          line-height: 1.2 !important;
        }
        .dropdown-menu {
          position: absolute !important;
          top: calc(100% + 0.5rem) !important;
          right: 0 !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 1rem !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          min-width: 200px !important;
          padding: 0.5rem !important;
          z-index: 100 !important;
        }
        .dropdown-item {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          padding: 0.75rem 1rem !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: #374151 !important;
        }
        .dropdown-item:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          color: #2563eb !important;
        }
        .dropdown-item.danger:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #dc2626 !important;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      
      <div className="header-container">
        <div className="header-content">
          {/* Page Navigation Dropdown */}
          <div className="page-dropdown">
            <button 
              className="page-button"
              onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
            >
              {getPageIcon()}
              <h1 className="header-title">{getPageName()}</h1>
              <ChevronDown 
                style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  color: '#6b7280',
                  transform: isPageDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} 
              />
            </button>

            {isPageDropdownOpen && (
              <div className="page-dropdown-menu">
                {pageItems.filter(item => item.name !== getPageName()).map((item) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={item.path}
                      className="dropdown-item"
                      onClick={() => {
                        setIsPageDropdownOpen(false)
                        router.push(item.path)
                      }}
                    >
                      <Icon style={{ width: '1rem', height: '1rem' }} />
                      {item.name}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          <div className="header-right">
            {/* Credits Display */}
            <div className="credits-display">
              <div className="credits-icon">
                <Coins style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
              </div>
              <div>
                <div className="credits-text">
                  {isLoading ? '...' : formatNumber(credits?.credits || 0)}
                </div>
                <div className="credits-label">Credits</div>
              </div>
              <button
                onClick={handleRefresh}
                className="refresh-btn"
                disabled={isRefreshing}
                aria-label="Refresh credits"
              >
                <RefreshCw 
                  style={{ 
                    width: '1rem', 
                    height: '1rem',
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
                  }} 
                />
              </button>
            </div>

            {/* User Dropdown */}
            <div className="user-dropdown">
              <button 
                className="user-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="user-avatar">{getInitials()}</div>
                <div className="user-info">
                  <div className="user-name">{getDisplayName()}</div>
                  <div className="user-email">{getEmail()}</div>
                </div>
                <ChevronDown 
                  style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    color: '#6b7280',
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} 
                />
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div 
                    className="dropdown-item"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User style={{ width: '1rem', height: '1rem' }} />
                    Profile
                  </div>
                  <div 
                    className="dropdown-item"
                    onClick={() => handleNavigation('/profile#security')}
                  >
                    <Settings style={{ width: '1rem', height: '1rem' }} />
                    Settings
                  </div>
                  <div 
                    className="dropdown-item danger"
                    onClick={handleSignOut}
                  >
                    <LogOut style={{ width: '1rem', height: '1rem' }} />
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
