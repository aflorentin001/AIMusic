'use client'

import React, { useState } from 'react'
import { ArrowLeft, Coins, RefreshCw, Calendar, TrendingUp, BarChart3, Clock, Music, CreditCard, Check, Zap, X, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useCredits, useCreditUsage } from '@/hooks/useCredits'

export default function CreditsManagement() {
  const router = useRouter()
  const { credits, isLoading, refreshCredits } = useCredits()
  const { getUsageHistory, clearUsageHistory } = useCreditUsage()
  const [selectedPlan, setSelectedPlan] = useState('starter')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ credits: number; price: number; name?: string } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const currentCredits = credits?.credits || 0
  const usageHistory = getUsageHistory()
  const creditsUsed = usageHistory.totalUsed
  const usagePercentage = currentCredits > 0 ? Math.round((creditsUsed / (currentCredits + creditsUsed)) * 100) : 0

  // Calculate usage analytics
  const now = new Date()
  const last24Hours = usageHistory.records.filter(record => {
    const recordDate = new Date(record.timestamp)
    return (now.getTime() - recordDate.getTime()) < 24 * 60 * 60 * 1000
  }).reduce((sum, record) => sum + record.cost, 0)

  const last7Days = usageHistory.records.filter(record => {
    const recordDate = new Date(record.timestamp)
    return (now.getTime() - recordDate.getTime()) < 7 * 24 * 60 * 60 * 1000
  }).reduce((sum, record) => sum + record.cost, 0)

  const usageData = [
    { period: 'Last 24 Hours', count: last24Hours, color: '#3b82f6' },
    { period: 'Last 7 Days', count: last7Days, color: '#8b5cf6' },
    { period: 'All Time', count: creditsUsed, color: '#10b981' }
  ]

  // Generate placeholder names for untitled tracks
  const generatePlaceholderName = (index: number) => {
    const names = [
      'Sunset Dreams',
      'Electric Vibes',
      'Midnight Echo',
      'Ocean Waves',
      'City Lights',
      'Summer Breeze',
      'Neon Nights',
      'Golden Hour',
      'Starlight Symphony',
      'Rhythm & Soul'
    ]
    return names[index % names.length]
  }

  const transactionHistory = usageHistory.records.map((record, index) => ({
    id: record.id,
    type: record.type,
    description: record.trackTitle || generatePlaceholderName(index),
    amount: -10, // Always show -10 credits
    date: new Date(record.timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date(record.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    icon: Music
  }))

  const quickPurchaseOptions = [
    { credits: 50, price: 4.99 },
    { credits: 100, price: 9.99 },
    { credits: 250, price: 19.99 }
  ]

  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      popular: false,
      features: ['100 AI generations', 'Standard quality', 'Email support']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      credits: 500,
      price: billingCycle === 'monthly' ? 39.99 : 399.99,
      popular: true,
      features: ['500 AI generations', 'High quality', 'Priority support', 'Advanced features']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 2000,
      price: billingCycle === 'monthly' ? 149.99 : 1499.99,
      popular: false,
      features: ['2,000 AI generations', 'Premium quality', '24/7 support', 'Custom features', 'API access']
    }
  ]

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshCredits()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleQuickPurchase = (pkg: { credits: number; price: number }) => {
    setSelectedPackage(pkg)
    setShowPaymentModal(true)
  }

  const handlePurchase = () => {
    // TODO: Integrate with payment gateway (Stripe, PayPal, etc.)
    alert('Payment integration coming soon!')
    setShowPaymentModal(false)
  }

  const handlePlanPurchase = (plan: typeof creditPackages[0]) => {
    setSelectedPackage({
      credits: plan.credits,
      price: plan.price,
      name: plan.name
    })
    setShowPaymentModal(true)
  }

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your transaction history? This cannot be undone.')) {
      clearUsageHistory()
      window.location.reload()
    }
  }

  const exportToCSV = () => {
    const headers = ['Track Name', 'Type', 'Credits Used', 'Date', 'Time']
    const rows = transactionHistory.map(t => [
      t.description,
      t.type,
      t.amount,
      t.date,
      t.time
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `credit_history_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportToTXT = () => {
    const content = [
      'CREDIT USAGE HISTORY',
      '===================',
      '',
      `Generated: ${new Date().toLocaleString()}`,
      `Total Transactions: ${transactionHistory.length}`,
      `Total Credits Used: ${creditsUsed}`,
      '',
      '-------------------',
      '',
      ...transactionHistory.map(t => 
        `Track: ${t.description}\n` +
        `Type: ${t.type}\n` +
        `Credits: ${t.amount}\n` +
        `Date: ${t.date} at ${t.time}\n` +
        '-------------------\n'
      )
    ].join('\n')
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `credit_history_${new Date().toISOString().split('T')[0]}.txt`
    link.click()
  }

  const exportToXLSX = () => {
    // Create a simple HTML table that Excel can open
    const table = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8"></head>
      <body>
        <table border="1">
          <tr>
            <th>Track Name</th>
            <th>Type</th>
            <th>Credits Used</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
          ${transactionHistory.map(t => `
            <tr>
              <td>${t.description}</td>
              <td>${t.type}</td>
              <td>${t.amount}</td>
              <td>${t.date}</td>
              <td>${t.time}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `
    
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `credit_history_${new Date().toISOString().split('T')[0]}.xls`
    link.click()
  }

  return (
    <>
      <style>{`
        .credits-container {
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
        .credits-overview {
          display: grid !important;
          grid-template-columns: 1fr 300px !important;
          gap: 2rem !important;
          margin-bottom: 3rem !important;
        }
        .balance-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2.5rem !important;
          position: relative !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
        }
        .balance-card::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 4px !important;
          background: linear-gradient(90deg, #3b82f6, #9333ea) !important;
        }
        .balance-header {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 2rem !important;
          width: 100% !important;
          position: relative !important;
        }
        .balance-title {
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem !important;
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
        }
        .balance-icon {
          width: 2.5rem !important;
          height: 2.5rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 0.75rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .refresh-button {
          padding: 0.5rem !important;
          background: #f3f4f6 !important;
          border: none !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: background 0.2s ease !important;
          position: absolute !important;
          right: 0 !important;
        }
        .refresh-button:hover {
          background: #e5e7eb !important;
        }
        .balance-amount {
          font-size: 3rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.5rem !important;
        }
        .balance-label {
          color: #6b7280 !important;
          font-size: 1.125rem !important;
          margin-bottom: 2rem !important;
        }
        .usage-stats {
          display: flex !important;
          justify-content: space-between !important;
          gap: 1rem !important;
          width: 100% !important;
        }
        .usage-stat {
          flex: 1 !important;
        }
        .usage-stat:first-child {
          text-align: left !important;
        }
        .usage-stat:last-child {
          text-align: right !important;
        }
        .usage-number {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .usage-label {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .quick-purchase {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1.5rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2rem !important;
        }
        .quick-purchase-title {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
          margin-bottom: 1rem !important;
        }
        .quick-options {
          display: grid !important;
          gap: 0.75rem !important;
          margin-bottom: 1.5rem !important;
        }
        .quick-option {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 0.75rem 1rem !important;
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 0.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .quick-option:hover {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
        }
        .quick-option-credits {
          font-weight: 600 !important;
          color: #111827 !important;
        }
        .quick-option-price {
          color: #3b82f6 !important;
          font-weight: 500 !important;
        }
        .buy-now-button {
          width: 100% !important;
          padding: 0.75rem 1.5rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .buy-now-button:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
        }
        .analytics-section {
          margin-bottom: 3rem !important;
        }
        .section-title {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 1.5rem !important;
        }
        .analytics-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
          gap: 1.5rem !important;
        }
        .analytics-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2rem !important;
        }
        .analytics-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 1.5rem !important;
        }
        .analytics-title {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
        }
        .analytics-value {
          font-size: 2.5rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.5rem !important;
        }
        .analytics-label {
          color: #6b7280 !important;
        }
        .plans-section {
          margin-bottom: 3rem !important;
        }
        .billing-toggle {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0 !important;
          margin-bottom: 2rem !important;
        }
        .toggle-option {
          padding: 0.5rem 1rem !important;
          border: 1px solid #d1d5db !important;
          background: white !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-weight: 500 !important;
        }
        .toggle-option:first-child {
          border-radius: 0.5rem 0 0 0.5rem !important;
        }
        .toggle-option:last-child {
          border-radius: 0 0.5rem 0.5rem 0 !important;
        }
        .toggle-option.active {
          background: #3b82f6 !important;
          color: white !important;
          border-color: #3b82f6 !important;
        }
        .plans-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
          gap: 1.5rem !important;
        }
        .plan-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 2rem !important;
          position: relative !important;
          transition: all 0.2s ease !important;
        }
        .plan-card:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
        .plan-card.popular {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 1px #3b82f6 !important;
        }
        .popular-badge {
          position: absolute !important;
          top: -0.5rem !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          padding: 0.25rem 1rem !important;
          border-radius: 1rem !important;
          font-size: 0.75rem !important;
          font-weight: 600 !important;
        }
        .plan-name {
          font-size: 1.25rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.5rem !important;
        }
        .plan-price {
          font-size: 2.5rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .plan-period {
          color: #6b7280 !important;
          margin-bottom: 1.5rem !important;
        }
        .plan-features {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 0 2rem 0 !important;
        }
        .plan-feature {
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          margin-bottom: 0.75rem !important;
          color: #374151 !important;
        }
        .plan-button {
          width: 100% !important;
          padding: 0.75rem 1.5rem !important;
          border: 1px solid #d1d5db !important;
          border-radius: 0.5rem !important;
          background: white !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          font-weight: 600 !important;
        }
        .plan-button:hover {
          border-color: #3b82f6 !important;
          background: #eff6ff !important;
          color: #2563eb !important;
        }
        .plan-button.selected {
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          color: white !important;
          border-color: transparent !important;
        }
        .transaction-section {
          margin-bottom: 3rem !important;
        }
        .transaction-card {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 1rem !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          overflow: hidden !important;
        }
        .transaction-header {
          padding: 1.5rem 2rem !important;
          border-bottom: 1px solid #f3f4f6 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 1rem !important;
        }
        .transaction-title {
          font-size: 1.25rem !important;
          font-weight: bold !important;
          color: #111827 !important;
          flex: 1 !important;
        }
        .transaction-actions {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
        }
        .export-button {
          display: flex !important;
          align-items: center !important;
          padding: 0.5rem 1rem !important;
          background: #3b82f6 !important;
          color: white !important;
          border: none !important;
          border-radius: 0.5rem !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: background 0.2s ease !important;
        }
        .export-button:hover {
          background: #2563eb !important;
        }
        .export-menu {
          position: absolute !important;
          top: 100% !important;
          right: 0 !important;
          margin-top: 0.5rem !important;
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
          overflow: hidden !important;
          z-index: 10 !important;
          min-width: 160px !important;
        }
        .export-menu button {
          display: block !important;
          width: 100% !important;
          padding: 0.75rem 1rem !important;
          text-align: left !important;
          background: white !important;
          border: none !important;
          cursor: pointer !important;
          font-size: 0.875rem !important;
          color: #374151 !important;
          transition: background 0.2s ease !important;
        }
        .export-menu button:hover {
          background: #f3f4f6 !important;
          color: #2563eb !important;
        }
        .export-menu button:not(:last-child) {
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .clear-history {
          color: #ef4444 !important;
          font-size: 0.875rem !important;
          cursor: pointer !important;
          transition: color 0.2s ease !important;
          background: none !important;
          border: none !important;
        }
        .clear-history:hover {
          color: #dc2626 !important;
        }
        .transaction-list {
          max-height: 400px !important;
          overflow-y: auto !important;
        }
        .transaction-item {
          display: flex !important;
          align-items: center !important;
          gap: 1rem !important;
          padding: 1.5rem 2rem !important;
          border-bottom: 1px solid #f3f4f6 !important;
          transition: background 0.2s ease !important;
        }
        .transaction-item:hover {
          background: rgba(0, 0, 0, 0.02) !important;
        }
        .transaction-item:last-child {
          border-bottom: none !important;
        }
        .transaction-icon {
          width: 2.5rem !important;
          height: 2.5rem !important;
          background: linear-gradient(135deg, #3b82f6, #9333ea) !important;
          border-radius: 0.5rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .transaction-details {
          flex: 1 !important;
        }
        .transaction-description {
          font-weight: 500 !important;
          color: #111827 !important;
          margin-bottom: 0.25rem !important;
        }
        .transaction-date {
          font-size: 0.875rem !important;
          color: #6b7280 !important;
        }
        .transaction-amount {
          font-weight: 600 !important;
          color: #ef4444 !important;
        }
        .empty-state {
          text-align: center !important;
          padding: 3rem 2rem !important;
          color: #6b7280 !important;
        }
        @media (max-width: 1024px) {
          .credits-overview {
            grid-template-columns: 1fr !important;
          }
          .analytics-grid, .plans-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      
      <div className="credits-container">
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
              <Coins style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              Credits Management
            </div>
            <p className="page-subtitle">Track your credit usage and manage your account balance</p>
          </div>
        </div>

        <div className="main-content">
          {/* Credits Overview */}
          <div className="credits-overview">
            <div className="balance-card">
              <div className="balance-header">
                <div className="balance-title">
                  <div className="balance-icon">
                    <Coins style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  Available Credits
                </div>
                <button className="refresh-button" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    color: '#6b7280',
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
                  }} />
                </button>
              </div>
              
              <div className="balance-amount">{isLoading ? '...' : formatNumber(currentCredits)}</div>
              <div className="balance-label">Usage: {usagePercentage}%</div>
              
              <div className="usage-stats">
                <div className="usage-stat">
                  <div className="usage-number">{isLoading ? '...' : formatNumber(currentCredits + creditsUsed)}</div>
                  <div className="usage-label">Total Credits</div>
                </div>
                <div className="usage-stat">
                  <div className="usage-number">{formatNumber(creditsUsed)}</div>
                  <div className="usage-label">Credits Used</div>
                </div>
              </div>
            </div>

            <div className="quick-purchase">
              <div className="quick-purchase-title">Quick Purchase</div>
              <div className="quick-options">
                {quickPurchaseOptions.map((option) => (
                  <div 
                    key={option.credits} 
                    className="quick-option"
                    onClick={() => handleQuickPurchase(option)}
                  >
                    <span className="quick-option-credits">{option.credits} Credits</span>
                    <span className="quick-option-price">${option.price}</span>
                  </div>
                ))}
              </div>
              <button 
                className="buy-now-button"
                onClick={() => handleQuickPurchase(quickPurchaseOptions[1])}
              >
                <CreditCard style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                Buy Now
              </button>
            </div>
          </div>

          {/* Usage Analytics */}
          <div className="analytics-section">
            <h2 className="section-title">Usage Analytics</h2>
            <div className="analytics-grid">
              {usageData.map((data, index) => (
                <div key={index} className="analytics-card">
                  <div className="analytics-header">
                    <div className="analytics-title">
                      {index === 0 && <Calendar style={{ width: '1.25rem', height: '1.25rem', color: data.color }} />}
                      {index === 1 && <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: data.color }} />}
                      {index === 2 && <BarChart3 style={{ width: '1.25rem', height: '1.25rem', color: data.color }} />}
                      {data.period}
                    </div>
                  </div>
                  <div className="analytics-value">{data.count}</div>
                  <div className="analytics-label">credits used</div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Plans */}
          <div className="plans-section">
            <h2 className="section-title">Credit Plans</h2>
            
            <div className="billing-toggle">
              <button 
                className={`toggle-option ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`toggle-option ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly (Save 20%)
              </button>
            </div>

            <div className="plans-grid">
              {creditPackages.map((plan) => (
                <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Most Popular</div>}
                  
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">${formatNumber(plan.price)}</div>
                  <div className="plan-period">per {billingCycle === 'monthly' ? 'month' : 'year'}</div>
                  
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="plan-feature">
                        <Check style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`plan-button ${selectedPlan === plan.id ? 'selected' : ''}`}
                    onClick={() => handlePlanPurchase(plan)}
                  >
                    Purchase Plan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="transaction-section">
            <h2 className="section-title">Transaction History</h2>
            <div className="transaction-card">
              <div className="transaction-header">
                <div className="transaction-title">Usage History ({transactionHistory.length})</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {transactionHistory.length > 0 && (
                    <>
                      <div style={{ position: 'relative' }}>
                        <button 
                          className="export-button"
                          onClick={() => setShowExportMenu(!showExportMenu)}
                        >
                          <Download style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                          Export
                        </button>
                        {showExportMenu && (
                          <div className="export-menu">
                            <button onClick={() => { exportToCSV(); setShowExportMenu(false); }}>
                              Export as CSV
                            </button>
                            <button onClick={() => { exportToXLSX(); setShowExportMenu(false); }}>
                              Export as Excel
                            </button>
                            <button onClick={() => { exportToTXT(); setShowExportMenu(false); }}>
                              Export as TXT
                            </button>
                          </div>
                        )}
                      </div>
                      <button className="clear-history" onClick={handleClearHistory}>Clear History</button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="transaction-list">
                {transactionHistory.length > 0 ? (
                  transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-icon">
                        <transaction.icon style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-description">{transaction.description}</div>
                        <div className="transaction-date">Music Generation • {transaction.date} at {transaction.time}</div>
                      </div>
                      <div className="transaction-amount">{transaction.amount} credits</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <Clock style={{ width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem' }} />
                    <div>No analytics data yet</div>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                      Start generating music to see your usage analytics.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPackage && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              position: 'relative'
            }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
              </button>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                {selectedPackage.name || 'Purchase Credits'}
              </h3>

              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {formatNumber(selectedPackage.credits)}
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>Credits</div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                background: '#f3f4f6',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ color: '#6b7280' }}>Total Amount:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                  ${selectedPackage.price}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
                  💳 Payment integration coming soon! This will redirect to a secure payment gateway.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    background: 'white',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#374151'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
