/**
 * Utility Functions Test
 * Tests helper functions used throughout the app
 */

import { describe, it, expect } from '@jest/globals'

// Utility functions to test
const formatCredits = (credits: number): string => {
  return credits.toLocaleString('en-US')
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

describe('Utility Functions', () => {
  describe('formatCredits', () => {
    it('should format credits with commas', () => {
      expect(formatCredits(2370)).toBe('2,370')
      expect(formatCredits(1000000)).toBe('1,000,000')
    })

    it('should handle small numbers', () => {
      expect(formatCredits(0)).toBe('0')
      expect(formatCredits(50)).toBe('50')
      expect(formatCredits(999)).toBe('999')
    })
  })

  describe('formatDuration', () => {
    it('should format duration correctly', () => {
      expect(formatDuration(185)).toBe('3:05') // Drumming Boy
      expect(formatDuration(165)).toBe('2:45') // My Boy
      expect(formatDuration(60)).toBe('1:00')  // Sunburn
    })

    it('should pad seconds with zero', () => {
      expect(formatDuration(125)).toBe('2:05')
      expect(formatDuration(61)).toBe('1:01')
    })

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0:00')
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(500)).toBe('500 Bytes')
    })

    it('should format kilobytes correctly', () => {
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(2048)).toBe('2 KB')
    })

    it('should format megabytes correctly', () => {
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(5242880)).toBe('5 MB')
    })

    it('should handle decimal values', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2621440)).toBe('2.5 MB')
    })
  })
})
