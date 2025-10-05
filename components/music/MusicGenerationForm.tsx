'use client';

import { useState, useRef, useEffect } from 'react';
import { useCredits } from '@/hooks/useCredits';
import { useCreditUsage, useLowCreditWarning } from '@/hooks/useCredits';
import { LowCreditsModal } from '@/components/credits/LowCreditsModal';
import { ChevronDown, ChevronUp, Sparkles, Music, Loader2 } from 'lucide-react';
import { CREDIT_COSTS } from '@/types/credits';

const GENRES = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Classical', 
  'Jazz', 'Country', 'R&B', 'Folk', 'Reggae'
];

const MODEL_VERSIONS = [
  { value: 'chirp-v4', label: 'v4 (Faster)' },
  { value: 'chirp-v4-5', label: 'v4.5 (Balanced)' },
  { value: 'chirp-v5', label: 'v5 (Best Quality)' },
];

type GenerationStatus = 'idle' | 'submitting' | 'processing' | 'generating' | 'finalizing' | 'complete' | 'error';

export function MusicGenerationForm() {
  const { credits, refreshCredits } = useCredits();
  const { addUsageRecord } = useCreditUsage();
  const { isLow } = useLowCreditWarning();
  
  // Form state
  const [description, setDescription] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Pop');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [instrumental, setInstrumental] = useState(false);
  const [vocalGender, setVocalGender] = useState<'male' | 'female' | 'auto'>('auto');
  const [modelVersion, setModelVersion] = useState('chirp-v5');
  const [styleWeight, setStyleWeight] = useState(0.5);
  const [weirdness, setWeirdness] = useState(0.5);
  
  // Generation state
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [taskId, setTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedTrack, setGeneratedTrack] = useState<any>(null);
  const [showLowCreditsModal, setShowLowCreditsModal] = useState(false);
  
  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Progress tracking
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const characterCount = description.length;
  const maxCharacters = 400;
  const creditCost = instrumental ? CREDIT_COSTS.instrumental : customMode ? CREDIT_COSTS.custom : CREDIT_COSTS.standard;
  const hasEnoughCredits = (credits?.credits || 0) >= creditCost;

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !generatedTrack) return;

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded, duration:', audio.duration);
      setDuration(audio.duration || generatedTrack?.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      console.log('Audio playing');
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log('Audio paused');
      setIsPlaying(false);
    };

    // Set initial duration from track data
    if (generatedTrack.duration) {
      setDuration(generatedTrack.duration);
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Force load metadata
    audio.load();

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [generatedTrack]);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe the music you want to create');
      return;
    }

    if (!hasEnoughCredits) {
      setShowLowCreditsModal(true);
      return;
    }

    try {
      setStatus('submitting');
      setError(null);

      console.log('Generating music with params:', {
        custom_mode: customMode,
        gpt_description_prompt: description,
        tags: selectedGenre.toLowerCase(),
        make_instrumental: instrumental,
        mv: modelVersion,
      });

      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          custom_mode: customMode,
          gpt_description_prompt: description,
          tags: selectedGenre.toLowerCase(),
          make_instrumental: instrumental,
          mv: modelVersion,
          style_weight: styleWeight,
          weirdness_constraint: weirdness,
        }),
      });

      console.log('Generate response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Generation failed:', errorData);
        throw new Error(errorData.message || errorData.error || 'Failed to generate music');
      }

      const data = await response.json();
      console.log('Generation started:', data);
      
      setTaskId(data.id);
      setStatus('processing');

      // Start polling for status
      pollGenerationStatus(data.id);

      // Track credit usage
      addUsageRecord({
        type: instrumental ? 'instrumental' : customMode ? 'custom' : 'standard',
        cost: creditCost,
      });

      // Refresh credits
      refreshCredits();
    } catch (err: any) {
      console.error('Generation error:', err);
      setStatus('error');
      setError(err.message || 'Failed to generate music');
    }
  };

  const pollGenerationStatus = async (id: string) => {
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;
    let consecutiveErrors = 0;
    const startTime = Date.now();

    // Timer for elapsed time
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
      
      // Update progress based on elapsed time (estimate 60 seconds total)
      const estimatedProgress = Math.min((elapsed / 60) * 100, 95);
      setProgressPercent(Math.floor(estimatedProgress));
    }, 1000);

    const poll = setInterval(async () => {
      attempts++;

      if (attempts > maxAttempts) {
        clearInterval(poll);
        setStatus('error');
        setError('Generation timed out. Please try again.');
        return;
      }

      try {
        const response = await fetch(`/api/music/status/${id}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Status check failed:', response.status, errorText);
          throw new Error(`Failed to check status: ${response.status}`);
        }

        const data = await response.json();
        consecutiveErrors = 0; // Reset error counter on success

        if (data.status === 'completed') {
          clearInterval(poll);
          clearInterval(timer);
          setProgressPercent(100);
          setStatus('complete');
          setGeneratedTrack(data);
        } else if (data.status === 'failed') {
          clearInterval(poll);
          clearInterval(timer);
          setStatus('error');
          setError('Generation failed. Please try again.');
        } else {
          // Update status based on progress
          if (attempts < 5) setStatus('processing');
          else if (attempts < 15) setStatus('generating');
          else setStatus('finalizing');
        }
      } catch (err: any) {
        consecutiveErrors++;
        console.error('Polling error:', err.message);
        
        // Stop polling after 3 consecutive errors
        if (consecutiveErrors >= 3) {
          clearInterval(poll);
          clearInterval(timer);
          setStatus('error');
          setError('Unable to check generation status. Please try again or contact support.');
        }
      }
    }, 5000); // Poll every 5 seconds
  };

  const handleReset = () => {
    setStatus('idle');
    setTaskId(null);
    setError(null);
    setGeneratedTrack(null);
  };

  return (
    <>
      <div className="generation-layout">
        {/* Left Column - Form */}
        <div className="generation-form">
          <h2 className="form-title">Create Your Music</h2>
          
          {/* Main Description */}
            <div className="form-section">
              <label htmlFor="description" className="form-label">
                Describe Your Music
              </label>
              <textarea
                id="description"
                className="description-input"
                placeholder="Describe the music you want to create... (e.g., 'An upbeat pop song about summer adventures with catchy chorus')&#10;&#10;⚠️ Avoid mentioning artist names - describe the style instead!"
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, maxCharacters))}
                rows={6}
              />
              <div className="character-counter">
                {characterCount} / {maxCharacters} characters
              </div>
            </div>

            {/* Genre Selector */}
            <div className="form-section">
              <label className="form-label">Genre / Style</label>
              <div className="genre-grid">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="form-section">
              <button
                className="advanced-toggle"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span>Advanced Options</span>
                {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showAdvanced && (
                <div className="advanced-options">
                  <div className="option-row">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={customMode}
                        onChange={(e) => setCustomMode(e.target.checked)}
                      />
                      <span>Custom Mode (More control)</span>
                    </label>
                  </div>

                  <div className="option-row">
                    <label className="toggle-label">
                      <input
                        type="checkbox"
                        checked={instrumental}
                        onChange={(e) => setInstrumental(e.target.checked)}
                      />
                      <span>Instrumental Only</span>
                    </label>
                  </div>

                  <div className="option-row">
                    <label className="form-label-small">Vocal Gender</label>
                    <select
                      className="select-input"
                      value={vocalGender}
                      onChange={(e) => setVocalGender(e.target.value as any)}
                      disabled={instrumental}
                    >
                      <option value="auto">Auto</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="option-row">
                    <label className="form-label-small">Model Version</label>
                    <select
                      className="select-input"
                      value={modelVersion}
                      onChange={(e) => setModelVersion(e.target.value)}
                    >
                      {MODEL_VERSIONS.map((model) => (
                        <option key={model.value} value={model.value}>
                          {model.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="option-row">
                    <label className="form-label-small">
                      Style Weight: {styleWeight.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={styleWeight}
                      onChange={(e) => setStyleWeight(parseFloat(e.target.value))}
                      className="slider"
                    />
                  </div>

                  <div className="option-row">
                    <label className="form-label-small">
                      Weirdness: {weirdness.toFixed(2)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={weirdness}
                      onChange={(e) => setWeirdness(parseFloat(e.target.value))}
                      className="slider"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="error-banner">
                {error}
              </div>
            )}
        </div>

        {/* Right Column - Status/Preview */}
        <div className="generation-preview">
          {status === 'idle' || status === 'error' ? (
            <div className="ready-state">
              <div className="ready-icon">
                <Sparkles className="w-12 h-12" />
              </div>
              <h3>Ready to Create</h3>
              <p>Fill out the form and click "Generate Music" to create your track</p>
            </div>
          ) : status === 'complete' && generatedTrack ? (
            <div className="generation-complete">
            <div className="success-icon">
              <Music className="w-12 h-12" />
            </div>
            <h2>Your Music is Ready!</h2>
            <p className="track-title">{generatedTrack.title || 'Untitled Track'}</p>
            
            {generatedTrack.audio_url && (
              <div className="audio-container">
                <audio 
                  ref={audioRef}
                  controls 
                  className="audio-player" 
                  preload="metadata"
                  src={generatedTrack.audio_url}
                >
                  Your browser does not support the audio element.
                </audio>
                <div className="audio-time-display">
                  {formatTime(currentTime)} / {formatTime(duration || generatedTrack.duration || 0)}
                </div>
              </div>
            )}

            <div className="track-actions">
              {generatedTrack.audio_url && (
                <a
                  href={generatedTrack.audio_url}
                  download
                  className="action-btn primary"
                >
                  Download MP3
                </a>
              )}
              <button className="action-btn secondary" onClick={handleReset}>
                Create Another
              </button>
            </div>
          </div>
        ) : (
          <div className="generation-status">
            <div className="status-icon">
              <Loader2 className="w-12 h-12 animate-spin" />
            </div>
            <h2 className="status-title">
              {status === 'submitting' && 'Submitting request...'}
              {status === 'processing' && 'Processing with AI...'}
              {status === 'generating' && 'Generating audio...'}
              {status === 'finalizing' && 'Finalizing track...'}
            </h2>
            <p className="status-subtitle">This usually takes 30-60 seconds</p>
            
            <div className="progress-info">
              <span className="progress-percent">{progressPercent}% complete</span>
              <span className="progress-time">{elapsedTime}s elapsed</span>
            </div>
            
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <div className="status-stages">
              <div className={`stage ${status === 'submitting' || status === 'processing' || status === 'generating' || status === 'finalizing' ? 'active' : ''}`}>
                Submitting request
              </div>
              <div className={`stage ${status === 'processing' || status === 'generating' || status === 'finalizing' ? 'active' : ''}`}>
                Processing with AI
              </div>
              <div className={`stage ${status === 'generating' || status === 'finalizing' ? 'active' : ''}`}>
                Generating audio
              </div>
              <div className={`stage ${status === 'finalizing' ? 'active' : ''}`}>
                Finalizing track
              </div>
            </div>
            
            <div className="status-tip">
              💡 Tip: Keep this tab open while your music generates. You'll be notified when it's ready!
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Generate Button - Full width at bottom */}
      <div className="generate-footer-full">
        <div className="generate-section">
          <div className="credit-cost">
            This will cost <strong>{creditCost} credits</strong>
          </div>
          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={!hasEnoughCredits || !description.trim()}
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Music</span>
          </button>
          {!hasEnoughCredits && (
            <p className="insufficient-credits">
              Insufficient credits. You need {creditCost} credits.
            </p>
          )}
        </div>
      </div>

      <LowCreditsModal
        isOpen={showLowCreditsModal}
        onClose={() => setShowLowCreditsModal(false)}
        currentCredits={credits?.credits || 0}
        requiredCredits={creditCost}
      />

      <style jsx>{`
        .generation-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .generation-form {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: relative;
          z-index: 5;
        }

        .generation-preview {
          background: white;
          border-radius: 20px;
          padding: 48px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          position: relative;
          z-index: 5;
        }

        .form-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 24px;
        }

        .demo-mode-toggle {
          background: #f0f4ff;
          border: 2px solid #5b6ff5;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .demo-toggle-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
        }

        .demo-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #5b6ff5;
        }

        .demo-text {
          user-select: none;
        }

        .demo-notice {
          margin-top: 12px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          font-size: 14px;
          color: #4a5568;
          line-height: 1.5;
        }

        .ready-state {
          text-align: center;
          padding: 0;
          width: 100%;
        }

        .ready-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5b6ff5;
        }

        .ready-state h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 12px;
        }

        .ready-state p {
          font-size: 16px;
          color: #718096;
          line-height: 1.6;
        }
        .form-section {
          margin-bottom: 32px;
          border: none;
          border-top: none !important;
        }

        .form-label {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 12px;
        }

        .form-label-small {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
        }

        .description-input {
          width: 100%;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          font-family: inherit;
          resize: vertical;
          transition: all 0.3s;
        }

        .description-input:focus {
          outline: none;
          border-color: #5b6ff5;
          box-shadow: none;
        }

        .character-counter {
          text-align: right;
          font-size: 14px;
          color: #718096;
          margin-top: 8px;
        }

        .genre-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }

        .genre-btn {
          padding: 12px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          font-size: 15px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s;
        }

        .genre-btn:hover {
          border-color: #5b6ff5;
          color: #5b6ff5;
        }

        .genre-btn.active {
          background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
          border-color: #5b6ff5;
          color: white;
        }

        .advanced-toggle {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 10px;
          background: #f7fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s;
        }

        .advanced-toggle:hover {
          background: #edf2f7;
          color: #5b6ff5;
        }

        .advanced-options {
          margin-top: 20px;
          padding: 24px;
          background: #f7fafc;
          border-radius: 12px;
        }

        .option-row {
          margin-bottom: 20px;
        }

        .option-row:last-child {
          margin-bottom: 0;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 500;
          color: #4a5568;
          cursor: pointer;
        }

        .toggle-label input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .select-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          background: white;
          cursor: pointer;
        }

        .form-section + .form-section {
          padding-top: 0;
          border-top: none;
        }

        .select-input:focus {
          outline: none;
          border-color: #5b6ff5;
        }

        .slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #e2e8f0;
          outline: none;
          cursor: pointer;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #5b6ff5;
          cursor: pointer;
        }

        .error-banner {
          padding: 16px;
          background: #fee;
          border: 2px solid #fcc;
          border-radius: 10px;
          color: #c33;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .generate-footer-full {
          width: 100%;
          max-width: 1400px;
          margin: 32px auto 0;
          padding: 32px 0;
        }

        .generate-section {
          text-align: center;
        }

        .credit-cost {
          font-size: 16px;
          color: #718096;
          margin-bottom: 16px;
        }

        .credit-cost strong {
          color: #5b6ff5;
          font-weight: 700;
        }

        .generate-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 48px;
          background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(91, 111, 245, 0.3);
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(91, 111, 245, 0.4);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .insufficient-credits {
          margin-top: 12px;
          color: #f59e0b;
          font-weight: 600;
        }

        .generation-status {
          text-align: left;
          padding: 40px;
          width: 100%;
        }

        .status-icon {
          margin-bottom: 20px;
          color: #5b6ff5;
        }

        .status-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .status-subtitle {
          font-size: 14px;
          color: #718096;
          margin-bottom: 24px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .progress-percent {
          color: #5b6ff5;
          font-weight: 600;
        }

        .progress-time {
          color: #718096;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #5b6ff5 0%, #8b5cf6 100%);
          transition: width 0.5s ease;
        }

        .status-stages {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .stage {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          background: #f7fafc;
          color: #a0aec0;
          transition: all 0.3s;
        }

        .stage.active {
          background: #e0e7ff;
          color: #5b6ff5;
        }

        .status-tip {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: #92400e;
          line-height: 1.6;
        }

        .generation-complete {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #059669;
        }

        .generation-complete h2 {
          font-size: 32px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 12px;
        }

        .track-title {
          font-size: 20px;
          color: #5b6ff5;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .track-duration {
          font-size: 16px;
          color: #718096;
          margin-bottom: 24px;
        }

        .audio-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto 32px;
        }

        .audio-player {
          width: 100%;
          margin-bottom: 12px;
        }

        .audio-time-display {
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #5b6ff5;
          font-family: monospace;
        }

        .demo-complete-message {
          background: #f0f4ff;
          border: 2px solid #5b6ff5;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
          text-align: left;
        }

        .demo-info {
          font-size: 18px;
          font-weight: 600;
          color: #059669;
          margin-bottom: 16px;
        }

        .demo-instruction {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 12px;
        }

        .demo-steps {
          margin-left: 20px;
          color: #4a5568;
          line-height: 1.8;
        }

        .demo-steps li {
          margin-bottom: 8px;
        }

        .track-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .action-btn {
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
          color: white;
          border: none;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(91, 111, 245, 0.3);
        }

        .action-btn.secondary {
          background: white;
          color: #5b6ff5;
          border: 2px solid #5b6ff5;
        }

        .action-btn.secondary:hover {
          background: #f0f4ff;
        }

        @media (max-width: 1024px) {
          .generation-layout {
            grid-template-columns: 1fr;
          }

          .generation-preview {
            order: -1;
            padding: 32px;
          }
        }

        @media (max-width: 768px) {
          .generation-form {
            padding: 24px;
            border-radius: 16px;
          }

          .generation-preview {
            padding: 24px;
          }

          .genre-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .track-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
