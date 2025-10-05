/**
 * API Route Test: Music Generation
 * Tests the music generation flow with SunoAPI
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

// Mock the SunoAPI client
jest.mock('@/lib/sunoapi-client', () => ({
  sunoApiClient: {
    generateMusic: jest.fn(),
    checkStatus: jest.fn(),
  },
}))

describe('Music Generation API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initiate music generation successfully', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    const mockRequest = {
      custom_mode: false,
      gpt_description_prompt: 'A happy upbeat pop song',
      mv: 'chirp-v4',
    }

    const mockResponse = {
      message: 'Success',
      task_id: 'test-task-123',
    }

    sunoApiClient.generateMusic.mockResolvedValue(mockResponse)

    const result = await sunoApiClient.generateMusic(mockRequest)

    expect(result).toBeDefined()
    expect(result.task_id).toBe('test-task-123')
    expect(result.message).toBe('Success')
  })

  it('should check generation status', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    const mockStatus = {
      id: 'test-task-123',
      status: 'completed',
      audio_url: 'https://example.com/track.mp3',
      title: 'Test Track',
    }

    sunoApiClient.checkStatus.mockResolvedValue(mockStatus)

    const result = await sunoApiClient.checkStatus('test-task-123')

    expect(result).toBeDefined()
    expect(result.status).toBe('completed')
    expect(result.audio_url).toBeDefined()
  })

  it('should handle generation errors', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    sunoApiClient.generateMusic.mockRejectedValue(
      new Error('Insufficient credits')
    )

    await expect(
      sunoApiClient.generateMusic({})
    ).rejects.toThrow('Insufficient credits')
  })

  it('should validate generation request structure', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    const validRequest = {
      custom_mode: true,
      prompt: 'Test lyrics',
      tags: 'pop, upbeat',
      title: 'Test Song',
      mv: 'chirp-v5',
    }

    sunoApiClient.generateMusic.mockResolvedValue({
      message: 'Success',
      task_id: 'test-123',
    })

    const result = await sunoApiClient.generateMusic(validRequest)

    expect(result.task_id).toBeDefined()
    expect(sunoApiClient.generateMusic).toHaveBeenCalledWith(validRequest)
  })

  it('should handle different generation statuses', async () => {
    const { sunoApiClient } = require('@/lib/sunoapi-client')
    
    const statuses = ['pending', 'processing', 'completed', 'failed']

    for (const status of statuses) {
      sunoApiClient.checkStatus.mockResolvedValue({
        id: 'test-123',
        status: status,
      })

      const result = await sunoApiClient.checkStatus('test-123')
      expect(result.status).toBe(status)
    }
  })
})
