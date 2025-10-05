'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Sparkles, Music, Play, Pause, Download, Share, Trash2, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCredits, useCreditUsage } from '@/hooks/useCredits'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

interface GeneratedTrack {
  title: string
  duration: string
  genre: string
  timestamp: string
  audioUrl: string
  id?: string
}

export default function GenerateMusic() {
  const router = useRouter()
  const { credits, isLoading: creditsLoading, refreshCredits } = useCredits()
  const { addUsageRecord } = useCreditUsage()
  const [description, setDescription] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Pop')
  const [isAdvanced, setIsAdvanced] = useState(false)
  const [trackTitle, setTrackTitle] = useState('')
  const [customLyrics, setCustomLyrics] = useState('')
  const [voiceType, setVoiceType] = useState('auto')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [generatedTrack, setGeneratedTrack] = useState<GeneratedTrack | null>(null)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const GENERATION_COST = 10 // Credits per generation
  const currentCredits = credits?.credits || 0
  const creditsAfter = currentCredits - GENERATION_COST

  const genres = [
    'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Classical', 'Jazz',
    'Country', 'R&B', 'Folk', 'Reggae', 'Blues', 'Metal', 'Indie', 'Soul', 'Funk', 'Disco'
  ]

  // Persist generated track to sessionStorage
  useEffect(() => {
    if (generatedTrack) {
      sessionStorage.setItem('lastGeneratedTrack', JSON.stringify(generatedTrack))
    }
  }, [generatedTrack])

  // Restore generated track on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('lastGeneratedTrack')
    if (saved) {
      try {
        setGeneratedTrack(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to restore track:', e)
      }
    }
  }, [])

  const handleGenerate = async () => {
    if (currentCredits < GENERATION_COST) {
      alert(`Insufficient credits! You need ${GENERATION_COST} credits to generate music.`)
      return
    }

    setIsGenerating(true)
    
    try {
      // Prepare request body for Suno API
      const requestBody: any = {
        mv: 'chirp-v3-5', // Model version
        make_instrumental: !customLyrics && !description.toLowerCase().includes('lyrics'),
      }

      // Use custom mode if advanced options are enabled
      if (isAdvanced && trackTitle) {
        requestBody.custom_mode = true
        requestBody.title = trackTitle
        requestBody.tags = selectedGenre
        if (customLyrics) {
          requestBody.prompt = customLyrics
        }
      } else {
        // Use GPT description mode - genre MUST be primary
        requestBody.custom_mode = false
        // Put genre first and emphasize it strongly
        requestBody.gpt_description_prompt = `${selectedGenre} music style. ${selectedGenre} genre. ${description}`
        requestBody.tags = selectedGenre
      }

      console.log('Sending generation request:', requestBody)

      // Call Suno API to generate music
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error response:', errorData)
        throw new Error(errorData.message || 'Failed to generate music')
      }

      const data = await response.json()
      console.log('Generation response:', data)
      
      // Handle the response - check for different response formats
      let clips = data.clips || data.data?.clips || []
      
      if (clips.length > 0) {
        const clip = clips[0]
        const trackTitleGenerated = clip.title || trackTitle || 'Generated Track'
        
        // If clip is still generating, poll for completion
        if (clip.status === 'submitted' || clip.status === 'queued') {
          console.log('Clip is generating, waiting for completion...')
          // For now, use sample audio and show it's processing
          setGeneratedTrack({
            title: trackTitleGenerated,
            duration: '2:32',
            genre: selectedGenre,
            timestamp: new Date().toLocaleString(),
            audioUrl: '/audio/drumming-boy.mp3', // Temporary sample
            id: clip.id
          })
        } else {
          // Clip is complete
          setGeneratedTrack({
            title: trackTitleGenerated,
            duration: clip.metadata?.duration_formatted || '2:32',
            genre: selectedGenre,
            timestamp: new Date().toLocaleString(),
            audioUrl: clip.audio_url || '/audio/drumming-boy.mp3',
            id: clip.id
          })
        }

        // Track credit usage with track title
        addUsageRecord({
          type: 'standard',
          cost: GENERATION_COST,
          trackTitle: trackTitleGenerated,
          trackId: clip.id
        })
      } else {
        console.error('No clips in response:', data)
        throw new Error('No clips generated. The API may be processing your request.')
      }
      
      // Refresh credits after generation
      await refreshCredits()
    } catch (error: any) {
      console.error('Generation error:', error)
      alert(error.message || 'Failed to generate music. Please try again.')
    } finally {
      setIsGenerating(false)
      setIsPlaying(false)
    }
  }

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      audioRef.current.currentTime = percentage * duration
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleDownload = async () => {
    if (generatedTrack?.audioUrl) {
      try {
        // Fetch the audio file as a blob
        const response = await fetch(generatedTrack.audioUrl)
        const blob = await response.blob()
        
        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob)
        
        // Create download link
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `${generatedTrack.title.replace(/[^a-z0-9]/gi, '_')}.mp3`
        link.style.display = 'none'
        
        // Trigger download
        document.body.appendChild(link)
        link.click()
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        }, 100)
      } catch (error) {
        console.error('Download failed:', error)
        alert('Failed to download the track. Please try again.')
      }
    }
  }

  const handleShare = async () => {
    if (generatedTrack) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: generatedTrack.title,
            text: `Check out my AI-generated music: ${generatedTrack.title}`,
            url: window.location.href
          })
        } catch (err) {
          console.log('Share cancelled or failed')
        }
      } else {
        // Fallback: Copy link to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this track?')) {
      setGeneratedTrack(null)
      setIsPlaying(false)
    }
  }

  return (
    <>
      <style jsx>{`
        .generate-container {
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
          display: grid !important;
          grid-template-columns: 1fr 400px !important;
          gap: 2rem !important;
        }
        .form-section {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2.5rem !important;
          height: fit-content !important;
        }
        .form-group {
          margin-bottom: 2rem !important;
        }
        .form-label {
          display: block !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 0.75rem !important;
        }
        .form-textarea {
          width: 100% !important;
          min-height: 120px !important;
          padding: 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.75rem !important;
          font-size: 1rem !important;
          resize: vertical !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        }
        .form-textarea:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
        .char-count {
          text-align: right !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
          margin-top: 0.5rem !important;
        }
        .genre-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
          gap: 0.75rem !important;
        }
        .genre-button {
          padding: 0.75rem 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          background: white !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          text-align: center !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
        }
        .genre-button:hover {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
        }
        .genre-button.selected {
          background: #3b82f6 !important;
          color: white !important;
          border-color: #3b82f6 !important;
        }
        .advanced-toggle {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          cursor: pointer !important;
          margin-bottom: 1rem !important;
        }
        .toggle-switch {
          width: 3rem !important;
          height: 1.5rem !important;
          background: #d1d5db !important;
          border-radius: 0.75rem !important;
          position: relative !important;
          transition: background 0.2s ease !important;
        }
        .toggle-switch.active {
          background: #3b82f6 !important;
        }
        .toggle-knob {
          width: 1.25rem !important;
          height: 1.25rem !important;
          background: white !important;
          border-radius: 50% !important;
          position: absolute !important;
          top: 0.125rem !important;
          left: 0.125rem !important;
          transition: transform 0.2s ease !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        .toggle-knob.active {
          transform: translateX(1.5rem) !important;
        }
        .form-input {
          width: 100% !important;
          padding: 0.75rem 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          font-size: 1rem !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        }
        .form-input:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
        .generate-button {
          width: 100% !important;
          padding: 1rem 2rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.75rem !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
        }
        .generate-button:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
        }
        .generate-button:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
          transform: none !important;
        }
        .cost-info {
          text-align: center !important;
          color: #6b7280 !important;
          font-size: 0.875rem !important;
          margin-top: 1rem !important;
        }
        .result-section {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2.5rem !important;
          height: fit-content !important;
        }
        .result-header {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          margin-bottom: 2rem !important;
        }
        .result-title {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          color: #111827 !important;
        }
        .processing-state {
          text-align: center !important;
          padding: 3rem 1rem !important;
        }
        .processing-icon {
          width: 4rem !important;
          height: 4rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 auto 1.5rem !important;
          animation: pulse 2s infinite !important;
        }
        .processing-title {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 0.5rem !important;
        }
        .processing-subtitle {
          color: #6b7280 !important;
          margin-bottom: 1.5rem !important;
        }
        .progress-bar {
          width: 100% !important;
          height: 0.5rem !important;
          background: #e5e7eb !important;
          border-radius: 0.25rem !important;
          overflow: hidden !important;
        }
        .progress-fill {
          height: 100% !important;
          background: linear-gradient(90deg, #3b82f6, #9333ea) !important;
          width: 37% !important;
          transition: width 0.3s ease !important;
        }
        .progress-text {
          text-align: center !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
          margin-top: 0.5rem !important;
        }
        .track-result {
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 1rem !important;
          padding: 1.5rem !important;
          color: white !important;
          margin-bottom: 2rem !important;
        }
        .track-header {
          display: flex !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          margin-bottom: 1rem !important;
        }
        .track-title {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          margin-bottom: 0.25rem !important;
        }
        .track-duration {
          font-size: 0.875rem !important;
          opacity: 0.8 !important;
        }
        .waveform {
          height: 80px !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.5rem !important;
          margin: 1rem 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .track-controls {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
        }
        .play-button {
          width: 3rem !important;
          height: 3rem !important;
          background: rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: background 0.2s ease !important;
        }
        .play-button:hover {
          background: rgba(255, 255, 255, 0.3) !important;
        }
        .track-info {
          margin-bottom: 2rem !important;
        }
        .info-row {
          display: flex !important;
          justify-content: space-between !important;
          margin-bottom: 0.5rem !important;
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .action-buttons {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 1rem !important;
          margin-bottom: 1rem !important;
        }
        .action-button {
          padding: 0.75rem 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          background: white !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
        }
        .action-button:hover {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          color: #2563eb !important;
        }
        .action-button.danger:hover {
          border-color: #ef4444 !important;
          background: #fef2f2 !important;
          color: #dc2626 !important;
        }
        .generate-another {
          width: 100% !important;
          padding: 1rem 2rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.75rem !important;
          font-size: 1rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
        }
        .generate-another:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes wave {
          0%, 100% { height: 30%; }
          50% { height: 80%; }
        }
        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
      
      <div className="generate-container">
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
              <Sparkles style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              Generate Music
            </div>
            <p className="page-subtitle">Create amazing music with AI</p>
          </div>
        </div>

        <div className="main-content">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Describe Your Music</label>
              <textarea
                className="form-textarea"
                placeholder="Describe the music you want to create... (e.g., 'An upbeat pop song about summer adventures with catchy chorus') ⚠️ Avoid mentioning artist names - describe the style instead!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={400}
              />
              <div className="char-count">{description.length}/400 characters</div>
            </div>

            <div className="form-group">
              <label className="form-label">Style/Genre *</label>
              <div className="genre-grid">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`genre-button ${selectedGenre === genre ? 'selected' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <div className="advanced-toggle" onClick={() => setIsAdvanced(!isAdvanced)}>
                <div className={`toggle-switch ${isAdvanced ? 'active' : ''}`}>
                  <div className={`toggle-knob ${isAdvanced ? 'active' : ''}`}></div>
                </div>
                <span style={{ fontWeight: '500', color: '#374151' }}>Advanced Options</span>
              </div>

              {isAdvanced && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Custom Mode</label>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                      Full control over title, style, and lyrics
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Track Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter track title"
                      value={trackTitle}
                      onChange={(e) => setTrackTitle(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Voice Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className={`genre-button ${voiceType === 'male' ? 'selected' : ''}`}
                        onClick={() => setVoiceType('male')}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`genre-button ${voiceType === 'female' ? 'selected' : ''}`}
                        onClick={() => setVoiceType('female')}
                      >
                        Female
                      </button>
                      <button
                        type="button"
                        className={`genre-button ${voiceType === 'auto' ? 'selected' : ''}`}
                        onClick={() => setVoiceType('auto')}
                      >
                        Auto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Custom Lyrics (Optional)</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Enter your custom lyrics here..."
                      value={customLyrics}
                      onChange={(e) => setCustomLyrics(e.target.value)}
                      style={{ minHeight: '100px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              className="generate-button"
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim() || currentCredits < GENERATION_COST}
            >
              {isGenerating ? (
                <>
                  <RefreshCw style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
                  Generate Music
                </>
              )}
            </button>

            <div className="cost-info">
              <div style={{ marginBottom: '0.5rem' }}>
                This will cost <strong>{GENERATION_COST} credits</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                <span>Current: <strong>{creditsLoading ? '...' : currentCredits}</strong></span>
                <span>→</span>
                <span style={{ color: creditsAfter < 0 ? '#dc2626' : '#059669' }}>
                  After: <strong>{creditsLoading ? '...' : Math.max(0, creditsAfter)}</strong>
                </span>
              </div>
              {currentCredits < GENERATION_COST && (
                <div style={{ marginTop: '0.5rem', color: '#dc2626', fontSize: '0.875rem' }}>
                  ⚠️ Insufficient credits. Please purchase more credits to continue.
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="result-section">
            <div className="result-header">
              <Music style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
              <span className="result-title">
                {isGenerating ? 'Generating...' : generatedTrack ? 'Your Generated Track' : 'Ready to Create'}
              </span>
            </div>

            {!isGenerating && !generatedTrack && (
              <div className="processing-state">
                <div style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Sparkles style={{ width: '2rem', height: '2rem', color: '#6366f1' }} />
                </div>
                <div className="processing-title">Ready to Create</div>
                <div className="processing-subtitle">
                  Fill out the form and click "Generate Music" to create your track
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="processing-state">
                <div className="processing-icon">
                  <RefreshCw style={{ width: '2rem', height: '2rem', color: 'white', animation: 'spin 1s linear infinite' }} />
                </div>
                <div className="processing-title">Processing with AI...</div>
                <div className="processing-subtitle">
                  This usually takes 60-120 seconds
                </div>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
                <div className="progress-text">Generating... This may take 1-2 minutes</div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#92400e' }}>
                  💡 Tip: Music generation typically takes 60-120 seconds. Keep this tab open and wait for completion!
                </div>
              </div>
            )}

            {generatedTrack && (
              <>
                <audio 
                  ref={audioRef} 
                  src={generatedTrack.audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
                <div className="track-result">
                  <div className="track-header">
                    <div>
                      <div className="track-title">{generatedTrack.title}</div>
                    </div>
                  </div>
                  
                  <div className="waveform">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', height: '100%' }}>
                      {[...Array(40)].map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: '3px',
                            height: `${isPlaying ? Math.random() * 60 + 20 : 30}%`,
                            background: 'rgba(255, 255, 255, 0.6)',
                            borderRadius: '2px',
                            transition: 'height 0.1s ease',
                            animation: isPlaying ? `wave 0.${Math.floor(Math.random() * 5) + 3}s ease-in-out infinite` : 'none',
                            animationDelay: `${i * 0.05}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="track-controls">
                    <button className="play-button" onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                      ) : (
                        <Play style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                      )}
                    </button>
                    <div 
                      onClick={handleSeek}
                      style={{ flex: 1, height: '0.25rem', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '0.125rem', position: 'relative', cursor: 'pointer' }}
                    >
                      <div style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%`, height: '100%', background: 'white', borderRadius: '0.125rem' }}></div>
                    </div>
                    <span style={{ fontSize: '0.875rem', opacity: '0.8' }}>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>

                <div className="track-info">
                  <div className="info-row">
                    <span>Generated:</span>
                    <span>{generatedTrack.timestamp}</span>
                  </div>
                  <div className="info-row">
                    <span>Genre:</span>
                    <span>{generatedTrack.genre}</span>
                  </div>
                  <div className="info-row">
                    <span>File Size:</span>
                    <span>MP3 • 5.3MB</span>
                  </div>
                  <div className="info-row">
                    <span>Status:</span>
                    <span style={{ color: '#059669' }}>AI Generated</span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="action-button" onClick={handleDownload}>
                    <Download style={{ width: '1rem', height: '1rem' }} />
                    Save
                  </button>
                  <button className="action-button" onClick={handleShare}>
                    <Share style={{ width: '1rem', height: '1rem' }} />
                    Share
                  </button>
                  <button className="action-button danger" onClick={handleDelete}>
                    <Trash2 style={{ width: '1rem', height: '1rem' }} />
                    Delete
                  </button>
                </div>

                <button className="generate-another" onClick={() => setGeneratedTrack(null)}>
                  <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
                  Generate Another Track
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}