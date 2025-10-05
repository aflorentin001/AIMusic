'use client'

import React, { useState } from 'react'
import { ArrowLeft, User, Settings, Bell, Shield, CreditCard, Download, Trash2, Eye, EyeOff, Camera, Save, X, Check, Globe, Moon, Sun, Volume2, Music, Smartphone, Mail, Key, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfileSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [twoFactorAuth, setTwoFactorAuth] = useState({
    sms: false,
    authenticator: false
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    trackSharing: false,
    usageAnalytics: true
  })
  const [preferences, setPreferences] = useState({
    autoPlay: true
  })
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: 'Alexandra',
    lastName: 'Florentin',
    email: 'alexandra.fontecilla@gmail.com',
    username: 'alexandra_music',
    bio: 'Music enthusiast and AI music creator',
    location: 'San Francisco, CA',
    website: 'https://alexandra-music.com'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Music }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save logic would go here
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form logic would go here
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleToggleSMS = () => {
    const newValue = !twoFactorAuth.sms
    setTwoFactorAuth({ ...twoFactorAuth, sms: newValue })
    
    if (newValue) {
      alert('SMS Authentication enabled! You will receive verification codes via SMS.')
    } else {
      if (confirm('Are you sure you want to disable SMS authentication?')) {
        // Confirmed disable
      } else {
        // Revert if cancelled
        setTwoFactorAuth({ ...twoFactorAuth, sms: true })
      }
    }
  }

  const handleToggleAuthenticator = () => {
    const newValue = !twoFactorAuth.authenticator
    setTwoFactorAuth({ ...twoFactorAuth, authenticator: newValue })
    
    if (newValue) {
      alert('Authenticator App enabled! Please scan the QR code with your authenticator app.\n\n(QR code setup would be shown here in production)')
    } else {
      if (confirm('Are you sure you want to disable authenticator app authentication?')) {
        // Confirmed disable
      } else {
        // Revert if cancelled
        setTwoFactorAuth({ ...twoFactorAuth, authenticator: true })
      }
    }
  }

  const handleDeleteAccount = () => {
    const firstConfirm = confirm('⚠️ WARNING: Are you sure you want to delete your account?\n\nThis action CANNOT be undone!\n\nYou will lose:\n• All your tracks\n• All your credits\n• All your data\n• Your account permanently\n\nClick OK to continue or Cancel to go back.')
    
    if (firstConfirm) {
      const secondConfirm = confirm('⚠️ FINAL WARNING ⚠️\n\nThis is your last chance to cancel.\n\nAre you ABSOLUTELY CERTAIN you want to delete your account forever?')
      
      if (secondConfirm) {
        const finalConfirm = confirm('Type YES in your mind and click OK to permanently delete your account.\n\nThis action is IRREVERSIBLE.')
        
        if (finalConfirm) {
          alert('Account deletion initiated. You will be logged out and redirected to the home page.')
          // In production: Call API to delete account, then router.push('/')
        }
      }
    }
  }

  const handleSaveSettings = () => {
    // In production, this would save settings to the backend
    alert('✅ Settings saved successfully!')
    setHasUnsavedChanges(false)
  }

  const handleUpgradePlan = () => {
    alert('🎵 Upgrade Your Plan\n\nYou will be redirected to our payment page to choose a subscription plan.\n\n• Creator Plan: $9.99/month\n• Pro Plan: $39.99/month\n• Enterprise Plan: $149.99/month\n\n(Payment integration coming soon!)')
    // In production: router.push('/credits') or open payment modal
  }

  return (
    <>
      <style>{`
        .profile-container {
          background: ${darkMode 
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)'} !important;
          min-height: 100vh !important;
          width: 100% !important;
          position: relative !important;
          transition: background 0.3s ease !important;
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
          color: ${darkMode ? '#f1f5f9' : '#111827'} !important;
          margin-bottom: 0.5rem !important;
        }
        .page-subtitle {
          color: ${darkMode ? '#94a3b8' : '#6b7280'} !important;
          font-size: 1.125rem !important;
        }
        .main-content {
          max-width: 80rem !important;
          margin: 0 auto !important;
          padding: 0 1.5rem 3rem !important;
          display: grid !important;
          grid-template-columns: 250px 1fr !important;
          gap: 2rem !important;
        }
        .sidebar {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)'} !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid ${darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.2)'} !important;
          padding: 1.5rem !important;
          height: fit-content !important;
          position: sticky !important;
          top: 2rem !important;
        }
        .tab-list {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.5rem !important;
        }
        .tab-button {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          padding: 0.75rem 1rem !important;
          border: none !important;
          background: transparent !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          text-align: left !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: ${darkMode ? '#94a3b8' : '#6b7280'} !important;
        }
        .tab-button:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          color: #2563eb !important;
        }
        .tab-button.active {
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
        }
        .content-area {
          background: ${darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)'} !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid ${darkMode ? 'rgba(51, 65, 85, 0.5)' : 'rgba(255, 255, 255, 0.2)'} !important;
          padding: 2rem !important;
        }
        .content-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 2rem !important;
          padding-bottom: 1rem !important;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .content-title {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          color: ${darkMode ? '#f1f5f9' : '#111827'} !important;
        }
        .edit-button {
          padding: 0.5rem 1rem !important;
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
        }
        .edit-button:hover {
          background: #2563eb !important;
        }
        .profile-header {
          display: flex !important;
          align-items: center !important;
          gap: 2rem !important;
          margin-bottom: 2rem !important;
          padding: 2rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 1rem !important;
          color: white !important;
        }
        .avatar-section {
          position: relative !important;
        }
        .avatar {
          width: 6rem !important;
          height: 6rem !important;
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 2rem !important;
          font-weight: bold !important;
          margin-bottom: 1rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          overflow: hidden !important;
          position: relative !important;
        }
        .avatar:hover {
          transform: scale(1.05) !important;
        }
        .avatar-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .avatar-upload {
          position: absolute !important;
          bottom: 0 !important;
          right: 0 !important;
          width: 2rem !important;
          height: 2rem !important;
          background: white !important;
          color: #3b82f6 !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          border: none !important;
        }
        .profile-info {
          flex: 1 !important;
        }
        .profile-name {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-bottom: 0.5rem !important;
        }
        .profile-email {
          opacity: 0.8 !important;
          margin-bottom: 1rem !important;
        }
        .profile-stats {
          display: flex !important;
          gap: 2rem !important;
        }
        .stat-item {
          text-align: center !important;
        }
        .stat-number {
          font-size: 1.25rem !important;
          font-weight: bold !important;
          margin-bottom: 0.25rem !important;
        }
        .stat-label {
          font-size: 0.875rem !important;
          opacity: 0.8 !important;
        }
        .form-section {
          margin-bottom: 2rem !important;
        }
        .section-title {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: ${darkMode ? '#e2e8f0' : '#111827'} !important;
          margin-bottom: 1rem !important;
        }
        .form-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
          gap: 1rem !important;
        }
        .form-group {
          margin-bottom: 1rem !important;
        }
        .form-label {
          display: block !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          color: #374151 !important;
          margin-bottom: 0.5rem !important;
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
        .form-input:disabled {
          background: #f9fafb !important;
          color: #6b7280 !important;
        }
        .form-textarea {
          width: 100% !important;
          min-height: 100px !important;
          padding: 0.75rem 1rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          font-size: 1rem !important;
          resize: vertical !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
        }
        .form-textarea:focus {
          outline: none !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
        .password-input {
          position: relative !important;
        }
        .password-toggle {
          position: absolute !important;
          right: 0.75rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: none !important;
          border: none !important;
          cursor: pointer !important;
          color: #6b7280 !important;
        }
        .form-actions {
          display: flex !important;
          gap: 1rem !important;
          margin-top: 2rem !important;
        }
        .save-button {
          padding: 0.75rem 1.5rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        .save-button:hover:not(:disabled) {
          transform: translateY(-1px) !important;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
        }
        .save-button:disabled {
          background: #d1d5db !important;
          cursor: not-allowed !important;
          opacity: 0.6 !important;
        }
        .cancel-button {
          padding: 0.75rem 1.5rem !important;
          background: #f3f4f6 !important;
          color: #374151 !important;
          border: none !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        .cancel-button:hover {
          background: #e5e7eb !important;
        }
        .setting-item {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 1rem 0 !important;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .setting-item:last-child {
          border-bottom: none !important;
        }
        .setting-info {
          flex: 1 !important;
        }
        .setting-title {
          font-weight: 500 !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .setting-description {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .toggle-switch {
          width: 3rem !important;
          height: 1.5rem !important;
          background: #d1d5db !important;
          border-radius: 0.75rem !important;
          position: relative !important;
          cursor: pointer !important;
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
        .danger-zone {
          background: #fef2f2 !important;
          border: 1px solid #fecaca !important;
          border-radius: 0.5rem !important;
          padding: 1.5rem !important;
          margin-top: 2rem !important;
        }
        .danger-title {
          color: #dc2626 !important;
          font-weight: 600 !important;
          margin-bottom: 0.5rem !important;
        }
        .danger-description {
          color: #7f1d1d !important;
          font-size: 0.875rem !important;
          margin-bottom: 1rem !important;
        }
        .danger-button {
          padding: 0.5rem 1rem !important;
          background: #dc2626 !important;
          color: white !important;
          border: none !important;
          border-radius: 0.375rem !important;
          cursor: pointer !important;
          transition: background 0.2s ease !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
        }
        .danger-button:hover {
          background: #b91c1c !important;
        }
        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .sidebar {
            position: static !important;
          }
          .tab-list {
            flex-direction: row !important;
            overflow-x: auto !important;
          }
          .tab-button {
            white-space: nowrap !important;
          }
        }
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column !important;
            text-align: center !important;
          }
          .profile-stats {
            justify-content: center !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <div className="profile-container">
        {/* Header */}
        <div className="header-section">
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <button className="back-button" onClick={() => router.push('/dashboard')}>
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
              Back to Dashboard
            </button>
            <div className="page-title">
              <User style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              Profile & Settings
            </div>
            <p className="page-subtitle">Manage your account and preferences</p>
          </div>
        </div>

        <div className="main-content">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon style={{ width: '1.25rem', height: '1.25rem' }} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            {activeTab === 'profile' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">Profile Information</h2>
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="profile-header">
                  <div className="avatar-section">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="avatar" onClick={handleAvatarClick}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="avatar-image" />
                      ) : (
                        'AF'
                      )}
                    </div>
                    {isEditing && (
                      <button className="avatar-upload" onClick={handleAvatarClick}>
                        <Camera style={{ width: '1rem', height: '1rem' }} />
                      </button>
                    )}
                  </div>
                  <div className="profile-info">
                    <div className="profile-name">{profileData.firstName} {profileData.lastName}</div>
                    <div className="profile-email">{profileData.email}</div>
                    <div className="profile-stats">
                      <div className="stat-item">
                        <div className="stat-number">12</div>
                        <div className="stat-label">Tracks Created</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">2,440</div>
                        <div className="stat-label">Credits Available</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">3</div>
                        <div className="stat-label">Months Active</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileData.firstName}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileData.lastName}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileData.username}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-textarea"
                      value={profileData.bio}
                      disabled={!isEditing}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileData.location}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Website</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileData.website}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button className="save-button" onClick={handleSave}>
                        <Save style={{ width: '1rem', height: '1rem' }} />
                        Save Changes
                      </button>
                      <button className="cancel-button" onClick={handleCancel}>
                        <X style={{ width: '1rem', height: '1rem' }} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'account' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">Account Settings</h2>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Login & Security</h3>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Enter current password"
                      />
                      <button 
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} />
                        ) : (
                          <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <button className="save-button">
                    <Key style={{ width: '1rem', height: '1rem' }} />
                    Update Password
                  </button>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Two-Factor Authentication</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">SMS Authentication</div>
                      <div className="setting-description">Receive verification codes via SMS</div>
                    </div>
                    <div 
                      className={`toggle-switch ${twoFactorAuth.sms ? 'active' : ''}`}
                      onClick={handleToggleSMS}
                    >
                      <div className={`toggle-knob ${twoFactorAuth.sms ? 'active' : ''}`}></div>
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Authenticator App</div>
                      <div className="setting-description">Use an authenticator app for verification</div>
                    </div>
                    <div 
                      className={`toggle-switch ${twoFactorAuth.authenticator ? 'active' : ''}`}
                      onClick={handleToggleAuthenticator}
                    >
                      <div className={`toggle-knob ${twoFactorAuth.authenticator ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="danger-zone">
                  <div className="danger-title">Danger Zone</div>
                  <div className="danger-description">
                    Once you delete your account, there is no going back. Please be certain.
                  </div>
                  <button className="danger-button" onClick={handleDeleteAccount}>
                    <Trash2 style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Delete Account
                  </button>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">Notification Preferences</h2>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Email Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Track Generation Complete</div>
                      <div className="setting-description">Get notified when your music generation is complete</div>
                    </div>
                    <div 
                      className={`toggle-switch ${notifications.email ? 'active' : ''}`}
                      onClick={() => {
                        setNotifications({...notifications, email: !notifications.email})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${notifications.email ? 'active' : ''}`}></div>
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Account Updates</div>
                      <div className="setting-description">Important updates about your account</div>
                    </div>
                    <div 
                      className={`toggle-switch ${notifications.updates ? 'active' : ''}`}
                      onClick={() => {
                        setNotifications({...notifications, updates: !notifications.updates})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${notifications.updates ? 'active' : ''}`}></div>
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Marketing Emails</div>
                      <div className="setting-description">Receive updates about new features and promotions</div>
                    </div>
                    <div 
                      className={`toggle-switch ${notifications.marketing ? 'active' : ''}`}
                      onClick={() => {
                        setNotifications({...notifications, marketing: !notifications.marketing})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${notifications.marketing ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Push Notifications</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Browser Notifications</div>
                      <div className="setting-description">Show notifications in your browser</div>
                    </div>
                    <div 
                      className={`toggle-switch ${notifications.push ? 'active' : ''}`}
                      onClick={() => {
                        setNotifications({...notifications, push: !notifications.push})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${notifications.push ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="save-button" 
                    onClick={handleSaveSettings}
                    disabled={!hasUnsavedChanges}
                  >
                    <Save style={{ width: '1rem', height: '1rem' }} />
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeTab === 'privacy' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">Privacy & Security</h2>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Privacy Settings</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Profile Visibility</div>
                      <div className="setting-description">Make your profile visible to other users</div>
                    </div>
                    <div 
                      className={`toggle-switch ${privacySettings.profileVisibility ? 'active' : ''}`}
                      onClick={() => {
                        setPrivacySettings({...privacySettings, profileVisibility: !privacySettings.profileVisibility})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${privacySettings.profileVisibility ? 'active' : ''}`}></div>
                    </div>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Track Sharing</div>
                      <div className="setting-description">Allow others to discover your public tracks</div>
                    </div>
                    <div 
                      className={`toggle-switch ${privacySettings.trackSharing ? 'active' : ''}`}
                      onClick={() => {
                        setPrivacySettings({...privacySettings, trackSharing: !privacySettings.trackSharing})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${privacySettings.trackSharing ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Data & Analytics</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Usage Analytics</div>
                      <div className="setting-description">Help improve our service by sharing usage data</div>
                    </div>
                    <div 
                      className={`toggle-switch ${privacySettings.usageAnalytics ? 'active' : ''}`}
                      onClick={() => {
                        setPrivacySettings({...privacySettings, usageAnalytics: !privacySettings.usageAnalytics})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${privacySettings.usageAnalytics ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="save-button" 
                    onClick={handleSaveSettings}
                    disabled={!hasUnsavedChanges}
                  >
                    <Save style={{ width: '1rem', height: '1rem' }} />
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeTab === 'billing' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">Billing & Subscription</h2>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Current Plan</h3>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#111827' }}>Free Plan</div>
                        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>30 credits included</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '600', fontSize: '1.5rem', color: '#111827' }}>$0</div>
                        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>per month</div>
                      </div>
                    </div>
                    <button className="save-button" onClick={handleUpgradePlan}>
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Payment Method</h3>
                  <div style={{ padding: '1rem', border: '1px dashed #d1d5db', borderRadius: '0.5rem', textAlign: 'center', color: '#6b7280' }}>
                    No payment method on file
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Billing History</h3>
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    No billing history available
                  </div>
                </div>
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <div className="content-header">
                  <h2 className="content-title">App Preferences</h2>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Appearance</h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Dark Mode</div>
                      <div className="setting-description">Use dark theme across the application</div>
                    </div>
                    <div className={`toggle-switch ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
                      <div className={`toggle-knob ${darkMode ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Audio Settings</h3>
                  <div className="form-group">
                    <label className="form-label">Default Audio Quality</label>
                    <select className="form-input">
                      <option>High Quality (320kbps)</option>
                      <option>Standard Quality (192kbps)</option>
                      <option>Low Quality (128kbps)</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-title">Auto-play Generated Tracks</div>
                      <div className="setting-description">Automatically play tracks when generation completes</div>
                    </div>
                    <div 
                      className={`toggle-switch ${preferences.autoPlay ? 'active' : ''}`}
                      onClick={() => {
                        setPreferences({...preferences, autoPlay: !preferences.autoPlay})
                        setHasUnsavedChanges(true)
                      }}
                    >
                      <div className={`toggle-knob ${preferences.autoPlay ? 'active' : ''}`}></div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Language & Region</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <select className="form-input">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time Zone</label>
                      <select className="form-input">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="save-button" 
                    onClick={handleSaveSettings}
                    disabled={!hasUnsavedChanges}
                  >
                    <Save style={{ width: '1rem', height: '1rem' }} />
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
