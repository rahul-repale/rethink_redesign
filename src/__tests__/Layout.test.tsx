import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test/test-utils'
import Layout from '../components/layout/Layout'

describe('Layout Component', () => {
  it('renders Header and Footer', () => {
    renderWithProviders(<Layout />)
    // Header and Footer both render logos with alt text matching /rethink/i
    const logos = screen.getAllByAltText(/rethink/i)
    expect(logos.length).toBeGreaterThanOrEqual(2)
    // Footer should have copyright
    expect(screen.getByText(/ReThink Sustainability/)).toBeInTheDocument()
  })

  it('renders "Take Action" FAB when not on /library', () => {
    renderWithProviders(<Layout />)
    const fab = screen.getByLabelText('Take an action')
    expect(fab).toBeInTheDocument()
    expect(fab).toHaveAttribute('href', '/library')
  })
})
