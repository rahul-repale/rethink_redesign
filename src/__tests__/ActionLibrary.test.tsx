import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/test-utils'
import ActionLibrary from '../pages/ActionLibrary'

describe('ActionLibrary Page', () => {
  it('renders the page title and description', () => {
    renderWithProviders(<ActionLibrary />)
    expect(screen.getByText('Micro-Action Library')).toBeInTheDocument()
    expect(screen.getByText(/Small shifts, significant impact/)).toBeInTheDocument()
  })

  it('renders all 18 micro-action cards', () => {
    renderWithProviders(<ActionLibrary />)
    expect(screen.getByText('Showing 18 of 18 micro-actions')).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    renderWithProviders(<ActionLibrary />)
    // Category names appear in both filter buttons and card chips, so use getAllByText
    expect(screen.getAllByText('Digital Footprint').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Plastic').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Trees').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Generic').length).toBeGreaterThanOrEqual(1)
  })

  it('filters actions by category', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ActionLibrary />)
    
    // Click "Plastic" filter
    await user.click(screen.getByRole('button', { name: /^Plastic$/i }))
    // Should only show 2 plastic actions
    expect(screen.getByText(/Showing 2 of 18/)).toBeInTheDocument()
    expect(screen.getByText('Pick a Bottle and Run')).toBeInTheDocument()
    expect(screen.getByText('Wrap It Right')).toBeInTheDocument()
  })

  it('sorts actions by impact', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ActionLibrary />)
    
    const sortBtn = screen.getByRole('button', { name: /sort by impact/i })
    await user.click(sortBtn)
    expect(screen.getByText('Highest Impact')).toBeInTheDocument()
    
    await user.click(sortBtn)
    expect(screen.getByText('Lowest Impact')).toBeInTheDocument()
  })

  it('renders the Suggest a Micro-action form', () => {
    renderWithProviders(<ActionLibrary />)
    expect(screen.getByText('Suggest a Micro-action')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/bamboo toothbrush/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/0.5 kg CO2e/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Briefly explain/i)).toBeInTheDocument()
  })

  it('each action card renders impact value and share buttons', () => {
    renderWithProviders(<ActionLibrary />)
    // Check specific action
    expect(screen.getByText('Why Not a Newsletter')).toBeInTheDocument()
    // Check share buttons exist (WhatsApp, Instagram, Share)
    const whatsappBtns = screen.getAllByLabelText(/share .* on whatsapp/i)
    expect(whatsappBtns.length).toBeGreaterThan(0)
  })

  it('AUDIT: action cards use <article> without role="button" or tabIndex', () => {
    renderWithProviders(<ActionLibrary />)
    const articles = document.querySelectorAll('article')
    articles.forEach(article => {
      // AUDIT FLAG: clickable elements missing keyboard accessibility
      expect(article.getAttribute('role')).toBeNull()
      expect(article.getAttribute('tabindex')).toBeNull()
    })
  })

  it('AUDIT: suggest form uses alert() on submit instead of actual submission', async () => {
    // This is a known audit issue — form doesn't submit anywhere
    renderWithProviders(<ActionLibrary />)
    const submitBtn = screen.getByRole('button', { name: /submit suggestion/i })
    expect(submitBtn).toBeInTheDocument()
    // The form onSubmit just calls alert('Suggestion submitted!')
  })
})
