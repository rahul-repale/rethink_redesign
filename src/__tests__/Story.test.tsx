import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/test-utils'
import Story from '../pages/Story'

describe('Story Page', () => {
  it('renders the story section with founder name', () => {
    renderWithProviders(<Story />)
    expect(screen.getByText('The Story')).toBeInTheDocument()
    expect(screen.getByText(/Nirmal Topiwala/)).toBeInTheDocument()
  })

  it('renders the hero image with proper alt text', () => {
    renderWithProviders(<Story />)
    const img = screen.getByAltText(/Lush green leaves representing sustainability/i)
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('unsplash.com'))
  })

  it('AUDIT: hero image is missing loading="lazy" and decoding="async"', () => {
    renderWithProviders(<Story />)
    const img = screen.getByAltText(/Lush green leaves representing sustainability/i)
    // AUDIT FLAG: Performance — should have lazy loading
    expect(img).not.toHaveAttribute('loading', 'lazy')
    expect(img).not.toHaveAttribute('decoding', 'async')
  })

  it('renders FAQ section with title', () => {
    renderWithProviders(<Story />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
    expect(screen.getByText('Everything you need to know about participating.')).toBeInTheDocument()
  })

  it('shows first 5 FAQs initially', () => {
    renderWithProviders(<Story />)
    expect(screen.getByText('What is ReThink?')).toBeInTheDocument()
    expect(screen.getByText('Is there a cost to participate?')).toBeInTheDocument()
    expect(screen.getByText('How much time will I need to commit every month?')).toBeInTheDocument()
    expect(screen.getByText('How does one earn Karma points?')).toBeInTheDocument()
    expect(screen.getByText('Can I suggest new micro-actions?')).toBeInTheDocument()
  })

  it('first FAQ is expanded by default', () => {
    renderWithProviders(<Story />)
    // The answer to the first FAQ should be visible
    expect(screen.getByText(/ReThink is a program designed/)).toBeInTheDocument()
  })

  it('toggles FAQ open/closed on click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Story />)
    
    // Click second FAQ to open it
    const secondQ = screen.getByText('Is there a cost to participate?')
    await user.click(secondQ)
    expect(screen.getByText(/Accessing the foundational Micro-Action Library/)).toBeInTheDocument()
  })

  it('shows "See more questions" button to reveal all FAQs', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Story />)
    
    const seeMoreBtn = screen.getByText(/See more questions/)
    expect(seeMoreBtn).toBeInTheDocument()
    
    await user.click(seeMoreBtn)
    // After clicking, all 11 FAQs should be shown
    expect(screen.getByText('Who can join the ReThink community?')).toBeInTheDocument()
    expect(screen.getByText('How can I become an ambassador?')).toBeInTheDocument()
  })

  it('FAQ buttons have aria-expanded attribute', () => {
    renderWithProviders(<Story />)
    const faqButtons = screen.getAllByRole('button', { expanded: true })
    expect(faqButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('AUDIT: FAQ buttons missing aria-controls attribute', () => {
    renderWithProviders(<Story />)
    const faqButtons = screen.getAllByRole('button').filter(
      btn => btn.hasAttribute('aria-expanded')
    )
    // AUDIT FLAG: aria-expanded exists but aria-controls is missing
    faqButtons.forEach(btn => {
      expect(btn).not.toHaveAttribute('aria-controls')
    })
  })
})
