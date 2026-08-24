import { describe, it, expect, beforeEach } from 'vitest'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockUser } from '../test/test-utils'
import Home from '../pages/Home'

describe('Home Page', () => {
  it('renders the hero section with impact metrics', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Our Collective Impact')).toBeInTheDocument()
    expect(screen.getByText('Global Reach')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
    expect(screen.getByText('Total Carbon Reduction')).toBeInTheDocument()
  })

  it('renders the monthly action card', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText("This Month's Micro-Action")).toBeInTheDocument()
    expect(screen.getByText('Pick Up Just One Plastic Bottle')).toBeInTheDocument()
  })

  it('renders the Spot → Log → Feel Good flow steps', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Spot')).toBeInTheDocument()
    expect(screen.getByText('Log')).toBeInTheDocument()
    expect(screen.getByText('Feel Good')).toBeInTheDocument()
  })

  it('has a bottle count input that defaults to 1', () => {
    renderWithProviders(<Home />)
    const input = screen.getByLabelText(/how many bottles/i) as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('1')
  })

  it('allows changing the bottle count', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Home />)
    const input = screen.getByLabelText(/how many bottles/i) as HTMLInputElement
    await user.clear(input)
    await user.type(input, '5')
    expect(input.value).toBe('5')
  })

  it('opens ActionModal when form is submitted', async () => {
    mockUser()
    const user = userEvent.setup()
    renderWithProviders(<Home />)
    const submitBtn = screen.getByRole('button', { name: /log my action/i })
    await user.click(submitBtn)
    // Modal should appear with the action name (it also exists in the card, so multiple matches)
    const matches = screen.getAllByText(/Pick Up Just One Plastic Bottle/)
    expect(matches.length).toBeGreaterThanOrEqual(2) // card title + modal title
  })

  it('renders methodology note', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText('Methodology Note')).toBeInTheDocument()
    expect(screen.getByText(/CO2e is a standard unit/)).toBeInTheDocument()
  })

  it('renders ReThink logos', () => {
    renderWithProviders(<Home />)
    const logos = screen.getAllByAltText('ReThink Logo')
    expect(logos.length).toBe(2)
  })

  it('displays the value proposition text', () => {
    renderWithProviders(<Home />)
    expect(screen.getByText(/Sustainability doesn't have to be an overhaul/)).toBeInTheDocument()
    expect(screen.getByText('Disciplined Optimism')).toBeInTheDocument()
  })
})
