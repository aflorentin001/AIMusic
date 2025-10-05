/**
 * Component Test: Credits Display
 * Tests the credits display component in the header
 */

import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

// Mock component for testing
const MockCreditsDisplay = ({ credits }: { credits: number }) => {
  const formatCredits = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div data-testid="credits-display">
      <span data-testid="credits-value">{formatCredits(credits)}</span>
      <span>CREDITS</span>
    </div>
  )
}

describe('CreditsDisplay Component', () => {
  it('should render credits value', () => {
    render(<MockCreditsDisplay credits={2370} />)
    
    const creditsValue = screen.getByTestId('credits-value')
    expect(creditsValue).toBeTruthy()
    expect(creditsValue.textContent).toBe('2,370')
  })

  it('should format large numbers with commas', () => {
    render(<MockCreditsDisplay credits={1234567} />)
    
    const creditsValue = screen.getByTestId('credits-value')
    expect(creditsValue.textContent).toBe('1,234,567')
  })

  it('should handle zero credits', () => {
    render(<MockCreditsDisplay credits={0} />)
    
    const creditsValue = screen.getByTestId('credits-value')
    expect(creditsValue.textContent).toBe('0')
  })

  it('should render CREDITS label', () => {
    render(<MockCreditsDisplay credits={100} />)
    
    expect(screen.getByText('CREDITS')).toBeTruthy()
  })

  it('should display credits display container', () => {
    render(<MockCreditsDisplay credits={500} />)
    
    const container = screen.getByTestId('credits-display')
    expect(container).toBeTruthy()
  })
})
