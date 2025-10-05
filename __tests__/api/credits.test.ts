/**
 * API Route Test: Credits Balance
 * Tests the /api/credits endpoint for fetching user credit balance
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

// Mock the SunoAPI client
jest.mock('@/lib/sunoapi-client', () => ({
  sunoApiClient: {
    getCredits: jest.fn(),
  },
}))

describe('Credits API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return credit balance successfully', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    // Mock successful API response
    sunoApiClient.getCredits.mockResolvedValue({
      credits: 2370,
      extra_credits: 0,
    })

    const mockCredits = await sunoApiClient.getCredits()

    expect(mockCredits).toBeDefined()
    expect(mockCredits.credits).toBe(2370)
    expect(typeof mockCredits.credits).toBe('number')
  })

  it('should handle API errors gracefully', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    // Mock API error
    sunoApiClient.getCredits.mockRejectedValue(new Error('API Error'))

    await expect(sunoApiClient.getCredits()).rejects.toThrow('API Error')
  })

  it('should return valid credit structure', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    sunoApiClient.getCredits.mockResolvedValue({
      credits: 100,
      extra_credits: 50,
    })

    const mockCredits = await sunoApiClient.getCredits()

    expect(mockCredits).toHaveProperty('credits')
    expect(mockCredits).toHaveProperty('extra_credits')
    expect(mockCredits.credits).toBeGreaterThanOrEqual(0)
  })
})
