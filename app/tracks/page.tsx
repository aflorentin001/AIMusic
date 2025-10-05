'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Music, Play, Pause, Download, Share, Trash2, MoreHorizontal, Search, Filter, Grid, List, Clock, Calendar, Heart, HeartOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

export default function MyTracks() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid') // 'grid' or 'list'
  const [filterGenre, setFilterGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [selectedTracks, setSelectedTracks] = useState<number[]>([])
  const audioRef = React.useRef<HTMLAudioElement>(null)

  // Load saved view mode from localStorage on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('tracksViewMode')
    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode)
    }
  }, [])

  // Save view mode to localStorage whenever it changes
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode)
    localStorage.setItem('tracksViewMode', mode)
  }
  
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: 'Drumming Boy',
      genre: 'Rock',
      duration: '3:05',
      createdAt: '2025-10-01',
      size: '4.2MB',
      plays: 12,
      liked: true,
      status: 'complete',
      audioUrl: '/songs/drummingboy.mp3'
    },
    {
      id: 2,
      title: 'My Boy',
      genre: 'Pop',
      duration: '2:45',
      createdAt: '2025-09-28',
      size: '2.0MB',
      plays: 8,
      liked: false,
      status: 'complete',
      audioUrl: '/songs/myboy.mp3'
    },
    {
      id: 3,
      title: "Ain't Gonna Listen",
      genre: 'Jazz',
      duration: '2:40',
      createdAt: '2025-09-25',
      size: '3.8MB',
      plays: 15,
      liked: true,
      status: 'complete',
      audioUrl: '/songs/aintgonnalisten.mp3'
    },
    {
      id: 4,
      title: 'Sunburn',
      genre: 'Electronic',
      duration: '1:00',
      createdAt: '2025-09-20',
      size: '1.3MB',
      plays: 23,
      liked: false,
      status: 'complete',
      audioUrl: '/songs/sunburn.mp3'
    },
    {
      id: 5,
      title: 'Islands of Change',
      genre: 'Classical',
      duration: '3:12',
      createdAt: '2025-09-18',
      size: '3.9MB',
      plays: 7,
      liked: true,
      status: 'complete',
      audioUrl: '/songs/islandsofchange.mp3'
    },
    {
      id: 6,
      title: 'Ballad of Barnaby the Button',
      genre: 'Folk',
      duration: '3:35',
      createdAt: '2025-09-15',
      size: '4.3MB',
      plays: 19,
      liked: false,
      status: 'complete',
      audioUrl: '/songs/balladofbarnabythebutton.mp3'
    },
    {
      id: 7,
      title: 'Good Foot',
      genre: 'Funk',
      duration: '1:50',
      createdAt: '2025-09-12',
      size: '2.2MB',
      plays: 31,
      liked: true,
      status: 'complete',
      audioUrl: '/songs/goodfoot.mp3'
    },
    {
      id: 8,
      title: 'Roots of Harmony',
      genre: 'World',
      duration: '3:18',
      createdAt: '2025-09-10',
      size: '4.0MB',
      plays: 14,
      liked: false,
      status: 'complete',
      audioUrl: '/songs/rootsofharmony.mp3'
    },
    {
      id: 9,
      title: 'Violet Beast',
      genre: 'Rock',
      duration: '4:13',
      createdAt: '2025-09-08',
      size: '5.1MB',
      plays: 26,
      liked: true,
      status: 'complete',
      audioUrl: '/songs/violetbeast.mp3'
    }
  ])

  const genres = ['all', 'Rock', 'Pop', 'Jazz', 'Electronic', 'Classical', 'Hip-Hop']
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'duration', label: 'Duration' },
    { value: 'plays', label: 'Most Played' }
  ]

  const getGenreColor = (genre: string) => {
    const colors: Record<string, string> = {
      'Rock': '#ef4444',
      'Pop': '#8b5cf6',
      'Jazz': '#10b981',
      'Electronic': '#3b82f6',
      'Classical': '#f59e0b',
      'Hip-Hop': '#ec4899',
      'Folk': '#14b8a6',
      'Funk': '#f97316',
      'World': '#06b6d4'
    }
    return colors[genre] || '#6b7280'
  }

  const togglePlay = (trackId: number) => {
    const track = tracks.find(t => t.id === trackId)
    if (!track || !audioRef.current) return

    if (playingTrack === trackId) {
      // Pause current track
      audioRef.current.pause()
      setPlayingTrack(null)
    } else {
      // Play new track
      audioRef.current.src = track.audioUrl
      audioRef.current.play()
      setPlayingTrack(trackId)
    }
  }

  const toggleLike = (trackId: number) => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, liked: !track.liked } : track
    ))
  }

  const handleDownload = (track: typeof tracks[0]) => {
    // Create a download link
    const link = document.createElement('a')
    link.href = track.audioUrl
    link.download = `${track.title.replace(/[^a-z0-9]/gi, '_')}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (track: typeof tracks[0]) => {
    try {
      // Try to fetch the audio file and share it as a file
      const response = await fetch(track.audioUrl)
      const blob = await response.blob()
      const file = new File([blob], `${track.title.replace(/[^a-z0-9]/gi, '_')}.mp3`, { type: 'audio/mpeg' })
      
      const shareData = {
        title: track.title,
        text: `Check out my AI-generated music: ${track.title}`,
        files: [file]
      }

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            throw err
          }
        }
      } else {
        // If file sharing not supported, download instead
        alert('File sharing not supported on this device. The file will be downloaded instead.')
        handleDownload(track)
      }
    } catch (error) {
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(`${window.location.origin}${track.audioUrl}`)
        alert('Audio file link copied to clipboard!')
      } catch {
        alert('Unable to share file. Please download it instead.')
      }
    }
  }

  const handleDelete = (trackId: number) => {
    if (confirm('Are you sure you want to delete this track?')) {
      setTracks(tracks.filter(track => track.id !== trackId))
    }
  }

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = filterGenre === 'all' || track.genre === filterGenre
    return matchesSearch && matchesGenre
  })

  return (
    <>
      <style>{`
        .tracks-container {
          background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%) !important;
          min-height: 100vh !important;
          width: 100% !important;
          position: relative !important;
        }
        .header-section {
          padding: 2rem 1.5rem 1rem !important;
          position: relative !important;
        }
        .back-button {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          color: #6b7280 !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: color 0.2s ease !important;
          margin-bottom: 1rem !important;
          background: none !important;
          border: none !important;
        }
        .back-button:hover {
          color: #2563eb !important;
        }
        .page-title {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          font-size: 2rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.5rem !important;
        }
        .page-subtitle {
          color: #6b7280 !important;
          font-size: 1.125rem !important;
        }
        .main-content {
          max-width: 80rem !important;
          margin: 0 auto !important;
          padding: 0 1.5rem 3rem !important;
        }
        .controls-section {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 1.5rem !important;
          margin-bottom: 2rem !important;
        }
        .controls-row {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          flex-wrap: wrap !important;
        }
        .search-box {
          position: relative !important;
          flex: 1 !important;
          min-width: 300px !important;
        }
        .search-input {
          width: 100% !important;
          padding: 0.75rem 1rem 0.75rem 2.5rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          font-size: 1rem !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        }
        .search-input:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
        .search-icon {
          position: absolute !important;
          left: 0.75rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #6b7280 !important;
        }
        .filter-select {
          padding: 0.75rem 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          background: white !important;
          cursor: pointer !important;
          transition: border-color 0.2s ease !important;
        }
        .filter-select:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
        }
        .view-toggle {
          display: flex !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          overflow: hidden !important;
        }
        .view-button {
          padding: 0.75rem !important;
          background: white !important;
          border: none !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .view-button.active {
          background: #3b82f6 !important;
          color: white !important;
        }
        .view-button:hover:not(.active) {
          background: #f3f4f6 !important;
        }
        .stats-bar {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 1.5rem !important;
          color: #6b7280 !important;
          font-size: 0.875rem !important;
        }
        .tracks-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
          gap: 1.5rem !important;
        }
        .tracks-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.5rem !important;
        }
        .track-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 1.5rem !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }
        .track-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
        .track-header {
          display: flex !important;
          align-items: flex-start !important;
          justify-content: space-between !important;
          margin-bottom: 1rem !important;
        }
        .track-info {
          flex: 1 !important;
        }
        .track-title {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .track-meta {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .genre-tag {
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
          color: white !important;
        }
        .track-actions {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        .action-button {
          padding: 0.5rem !important;
          background: #f3f4f6 !important;
          border: none !important;
          border-radius: 0.375rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .action-button:hover {
          background: #e5e7eb !important;
        }
        .action-button.primary {
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
        }
        .action-button.primary:hover {
          transform: scale(1.05) !important;
        }
        .action-button.liked {
          background: #fecaca !important;
          color: #dc2626 !important;
        }
        .waveform {
          height: 60px !important;
          background: #f3f4f6 !important;
          border-radius: 0.5rem !important;
          margin: 1rem 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #6b7280 !important;
          font-size: 0.875rem !important;
        }
        .track-stats {
          display: flex !important;
          justify-content: space-between !important;
          font-size: 0.75rem !important;
          color: #6b7280 !important;
        }
        .track-list-item {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 0.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 1rem 1.5rem !important;
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          transition: all 0.2s ease !important;
        }
        .track-list-item:hover {
          background: rgba(255, 255, 255, 0.9) !important;
          transform: translateX(4px) !important;
        }
        .track-number {
          width: 2rem !important;
          text-align: center !important;
          font-weight: 500 !important;
          color: #6b7280 !important;
        }
        .track-artwork {
          width: 3rem !important;
          height: 3rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 0.5rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .list-track-info {
          flex: 1 !important;
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
        }
        .list-track-details {
          flex: 1 !important;
        }
        .list-track-title {
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .list-track-meta {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .list-track-stats {
          display: flex !important;
          align-items: center !important;
          gap: 2rem !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .empty-state {
          text-align: center !important;
          padding: 4rem 2rem !important;
          color: #6b7280 !important;
        }
        .empty-icon {
          width: 4rem !important;
          height: 4rem !important;
          background: #f3f4f6 !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 auto 1.5rem !important;
        }
        @media (max-width: 768px) {
          .controls-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .search-box {
            min-width: auto !important;
          }
          .tracks-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <div className="tracks-container">
        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef}
          onEnded={() => setPlayingTrack(null)}
          style={{ display: 'none' }}
        />

        {/* Header with Credits and Profile */}
        <DashboardHeader />

        {/* Page Header */}
        <div className="header-section">
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <button className="back-button" onClick={() => router.push('/dashboard')}>
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
              Back to Dashboard
            </button>
            <div className="page-title">
              <Music style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              My Tracks
            </div>
            <p className="page-subtitle">View & manage your music library</p>
          </div>
        </div>

        <div className="main-content">
          {/* Controls */}
          <div className="controls-section">
            <div className="controls-row">
              <div className="search-box">
                <Search className="search-icon" style={{ width: '1.25rem', height: '1.25rem' }} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search tracks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select 
                className="filter-select"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>

              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="view-toggle">
                <button 
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('grid')}
                >
                  <Grid style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
                <button 
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('list')}
                >
                  <List style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-bar">
            <span>{filteredTracks.length} tracks found</span>
            <span>Total duration: {Math.floor(filteredTracks.reduce((acc, track) => {
              const [min, sec] = track.duration.split(':').map(Number)
              return acc + min * 60 + sec
            }, 0) / 60)}:{String(filteredTracks.reduce((acc, track) => {
              const [min, sec] = track.duration.split(':').map(Number)
              return acc + min * 60 + sec
            }, 0) % 60).padStart(2, '0')}</span>
          </div>

          {/* Tracks Display */}
          {filteredTracks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Music style={{ width: '2rem', height: '2rem', color: '#9ca3af' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                No tracks found
              </h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="tracks-grid">
              {filteredTracks.map((track) => (
                <div key={track.id} className="track-card">
                  <div className="track-header">
                    <div className="track-info">
                      <div className="track-title">{track.title}</div>
                      <div className="track-meta">
                        <span 
                          className="genre-tag"
                          style={{ backgroundColor: getGenreColor(track.genre) }}
                        >
                          {track.genre}
                        </span>
                        <Clock style={{ width: '0.875rem', height: '0.875rem' }} />
                        <span>{track.duration}</span>
                      </div>
                    </div>
                    <div className="track-actions">
                      <button 
                        className={`action-button ${track.liked ? 'liked' : ''}`}
                        onClick={() => toggleLike(track.id)}
                      >
                        {track.liked ? (
                          <Heart style={{ width: '1rem', height: '1rem' }} />
                        ) : (
                          <HeartOff style={{ width: '1rem', height: '1rem' }} />
                        )}
                      </button>
                      <button className="action-button">
                        <MoreHorizontal style={{ width: '1rem', height: '1rem' }} />
                      </button>
                    </div>
                  </div>

                  <div className="waveform">
                    🎵 Audio Waveform
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button 
                      className="action-button primary"
                      onClick={() => togglePlay(track.id)}
                    >
                      {playingTrack === track.id ? (
                        <Pause style={{ width: '1.25rem', height: '1.25rem' }} />
                      ) : (
                        <Play style={{ width: '1.25rem', height: '1.25rem' }} />
                      )}
                    </button>
                    <div style={{ flex: 1, height: '0.25rem', background: '#e5e7eb', borderRadius: '0.125rem' }}>
                      <div style={{ width: '30%', height: '100%', background: '#3b82f6', borderRadius: '0.125rem' }}></div>
                    </div>
                    <button className="action-button" onClick={() => handleDownload(track)}>
                      <Download style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <button className="action-button" onClick={() => handleShare(track)}>
                      <Share style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>

                  <div className="track-stats">
                    <span>{track.plays} plays</span>
                    <span>{track.size}</span>
                    <span>{new Date(track.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="tracks-list">
              {filteredTracks.map((track, index) => (
                <div key={track.id} className="track-list-item">
                  <div className="track-number">{index + 1}</div>
                  <div className="track-artwork">
                    <Music style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <div className="list-track-info">
                    <div className="list-track-details">
                      <div className="list-track-title">{track.title}</div>
                      <div className="list-track-meta">
                        <span 
                          className="genre-tag"
                          style={{ backgroundColor: getGenreColor(track.genre) }}
                        >
                          {track.genre}
                        </span>
                      </div>
                    </div>
                    <div className="list-track-stats">
                      <span>{track.plays} plays</span>
                      <span>{track.duration}</span>
                      <span>{new Date(track.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="track-actions">
                    <button 
                      className={`action-button ${track.liked ? 'liked' : ''}`}
                      onClick={() => toggleLike(track.id)}
                    >
                      {track.liked ? (
                        <Heart style={{ width: '1rem', height: '1rem' }} />
                      ) : (
                        <HeartOff style={{ width: '1rem', height: '1rem' }} />
                      )}
                    </button>
                    <button 
                      className="action-button primary"
                      onClick={() => togglePlay(track.id)}
                    >
                      {playingTrack === track.id ? (
                        <Pause style={{ width: '1rem', height: '1rem' }} />
                      ) : (
                        <Play style={{ width: '1rem', height: '1rem' }} />
                      )}
                    </button>
                    <button className="action-button" onClick={() => handleDownload(track)}>
                      <Download style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <button className="action-button" onClick={() => handleShare(track)}>
                      <Share style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <button className="action-button" onClick={() => handleDelete(track.id)}>
                      <Trash2 style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
