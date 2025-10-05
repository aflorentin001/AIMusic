'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Music, Coins, User, Sparkles, Clock, TrendingUp, MoreHorizontal, Play, Pause, Download, Volume2, VolumeX } from 'lucide-react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

// Mock track data with audio URLs
const recentTracks = [
  {
    id: '1',
    title: 'Drumming Boy',
    genre: 'Rock',
    duration: '3:05',
    gradient: 'linear-gradient(135deg, #3b82f6, #9333ea)',
    audioUrl: '/audio/drumming-boy.mp3', // You'll need to add actual audio files
  },
  {
    id: '2',
    title: 'My Boy',
    genre: 'Pop',
    duration: '2:45',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    audioUrl: '/audio/my-boy.mp3',
  },
  {
    id: '3',
    title: "Ain't Gonna Listen",
    genre: 'Jazz',
    duration: '2:40',
    gradient: 'linear-gradient(135deg, #10b981, #0d9488)',
    audioUrl: '/audio/aint-gonna-listen.mp3',
  },
]

function TrackPlayer({ track }: { track: typeof recentTracks[0] }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const handleVolumeMouseEnter = () => {
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }
    setShowVolumeSlider(true)
  }

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
    }, 300)
  }

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = track.audioUrl
    link.download = `${track.title}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ padding: '2.5rem', borderBottom: '1px solid #f3f4f6' }}>
      <audio ref={audioRef} src={track.audioUrl} onEnded={() => setIsPlaying(false)} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '4rem', height: '4rem', background: track.gradient, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>{track.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>{track.genre} • {track.duration}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            ) : (
              <Play style={{ width: '1.25rem', height: '1.25rem', color: 'white', marginLeft: '2px' }} />
            )}
          </button>

          {/* Volume Control */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleVolumeMouseEnter}
            onMouseLeave={handleVolumeMouseLeave}
          >
            <button
              onClick={toggleMute}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'white',
                border: '2px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.background = '#eff6ff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.background = 'white'
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX style={{ width: '1.125rem', height: '1.125rem', color: '#6b7280' }} />
              ) : (
                <Volume2 style={{ width: '1.125rem', height: '1.125rem', color: '#6b7280' }} />
              )}
            </button>
            {showVolumeSlider && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '0.5rem',
                  background: 'white',
                  padding: '1rem 0.75rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #e5e7eb',
                  zIndex: 10,
                }}
                onMouseEnter={handleVolumeMouseEnter}
                onMouseLeave={handleVolumeMouseLeave}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: '80px',
                    height: '4px',
                    cursor: 'pointer',
                    accentColor: '#3b82f6',
                  }}
                  aria-label="Volume"
                />
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'white',
              border: '2px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#10b981'
              e.currentTarget.style.background = '#f0fdf4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb'
              e.currentTarget.style.background = 'white'
            }}
            aria-label="Download track"
          >
            <Download style={{ width: '1.125rem', height: '1.125rem', color: '#6b7280' }} />
          </button>

          {/* Status Badge */}
          <span style={{ padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500', background: '#dcfce7', color: '#166534' }}>
            Complete
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <>
      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%) !important;
          min-height: 100vh !important;
          width: 100% !important;
          position: relative !important;
        }
        .hero-section {
          padding-top: 5rem !important;
          padding-bottom: 6rem !important;
          position: relative !important;
        }
        .hero-overlay {
          background: linear-gradient(90deg, rgba(37, 99, 235, 0.1), rgba(147, 51, 234, 0.1)) !important;
          position: absolute !important;
          inset: 0 !important;
        }
        .gradient-text {
          background: linear-gradient(90deg, #2563eb, #9333ea) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }
        .action-card {
          background: white !important;
          border-radius: 1rem !important;
          padding: 2rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          transition: all 0.3s ease !important;
          height: 100% !important;
        }
        .action-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          transform: translateY(-2px) !important;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          padding: 2.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        .tracks-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          overflow: hidden !important;
        }
      `}</style>
      
      <div className="dashboard-container">
        {/* Header with Credits and Profile */}
        <DashboardHeader />

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div style={{ position: 'relative', maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}>
              <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem', lineHeight: '1.1' }}>
                Welcome back, <span className="gradient-text">Alexandra</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#6b7280', lineHeight: '1.6' }}>
                Ready to create your next masterpiece? Your AI music studio awaits.
              </p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem 6rem' }}>
          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
            <Link href="/generate" style={{ textDecoration: 'none' }}>
              <div className="action-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Generate Music</h3>
                    <p style={{ color: '#6b7280' }}>Create new tracks with AI</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/credits" style={{ textDecoration: 'none' }}>
              <div className="action-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg, #a855f7, #9333ea)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Coins style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Credits</h3>
                    <p style={{ color: '#6b7280' }}>Manage & purchase</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/tracks" style={{ textDecoration: 'none' }}>
              <div className="action-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Music style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>My Tracks</h3>
                    <p style={{ color: '#6b7280' }}>View & manage library</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/profile" style={{ textDecoration: 'none' }}>
              <div className="action-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Profile</h3>
                    <p style={{ color: '#6b7280' }}>Account & settings</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Music style={{ width: '1.75rem', height: '1.75rem', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>12</p>
                  <p style={{ color: '#6b7280' }}>Total Tracks</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#059669', fontWeight: '500' }}>+2 this week</span>
                <TrendingUp style={{ width: '1rem', height: '1rem', color: '#059669', marginLeft: '0.5rem' }} />
              </div>
            </div>

            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #a855f7, #9333ea)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Coins style={{ width: '1.75rem', height: '1.75rem', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>60</p>
                  <p style={{ color: '#6b7280' }}>Credits Used</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#2563eb', fontWeight: '500' }}>This month</span>
              </div>
            </div>

            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock style={{ width: '1.75rem', height: '1.75rem', color: 'white' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>42:36</p>
                  <p style={{ color: '#6b7280' }}>Time Created</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <span style={{ color: '#059669', fontWeight: '500' }}>All tracks</span>
              </div>
            </div>
          </div>

          {/* Recent Tracks */}
          <div className="tracks-card">
            <div style={{ padding: '2.5rem 2.5rem 2rem', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>Recent Tracks</h2>
                <Link href="/tracks" style={{ color: '#2563eb', fontWeight: '500', fontSize: '1.125rem', textDecoration: 'none' }}>
                  View All →
                </Link>
              </div>
            </div>
            
            <div>
              {recentTracks.map((track, index) => (
                <TrackPlayer key={track.id} track={track} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
