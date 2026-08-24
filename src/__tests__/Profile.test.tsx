import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockUser } from '../test/test-utils'
import Profile from '../pages/Profile'

describe('Profile Page', () => {
  it('redirects to /signin when not logged in', () => {
    renderWithProviders(<Profile />)
    // When not authenticated, Navigate to /signin is rendered
    // The profile content should NOT be visible
    expect(screen.queryByText('My Impact Dashboard')).not.toBeInTheDocument()
  })

  it('renders user info when logged in', () => {
    const user = mockUser()
    renderWithProviders(<Profile />)
    expect(screen.getByText('My Impact Dashboard')).toBeInTheDocument()
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(user.email))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(user.phone))).toBeInTheDocument()
  })

  it('renders karma points and CO2e stats', () => {
    mockUser()
    renderWithProviders(<Profile />)
    expect(screen.getByText('Karma Points')).toBeInTheDocument()
    expect(screen.getByText('CO₂e Saved')).toBeInTheDocument()
  })

  it('renders empty action history with link to library', () => {
    mockUser()
    renderWithProviders(<Profile />)
    expect(screen.getByText(/You haven't logged any actions yet/)).toBeInTheDocument()
    const libraryLink = screen.getByRole('link', { name: /explore the action library/i })
    expect(libraryLink).toHaveAttribute('href', '/library')
  })

  it('renders the "Verified Optimist" badge', () => {
    mockUser()
    renderWithProviders(<Profile />)
    expect(screen.getByText('Verified Optimist')).toBeInTheDocument()
  })

  it('renders Sign Out button', () => {
    mockUser()
    renderWithProviders(<Profile />)
    expect(screen.getByText('Sign Out')).toBeInTheDocument()
  })

  it('AUDIT: Edit Profile button uses alert() instead of actual functionality', async () => {
    mockUser()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const user = userEvent.setup()
    renderWithProviders(<Profile />)
    
    const editBtn = screen.getByText('Edit Profile')
    await user.click(editBtn)
    // AUDIT FLAG: Uses native alert instead of proper UI
    expect(alertSpy).toHaveBeenCalledWith('Edit profile functionality is coming soon!')
    alertSpy.mockRestore()
  })

  it('AUDIT: "View All History" button has no onClick handler (dead code)', () => {
    // Pre-populate some history so the button appears
    const user = mockUser()
    const history = [{
      id: 'test-1',
      actionId: 'Pick a Bottle and Run',
      impactValue: 0.05,
      dateStr: '2026-08-24',
      timestamp: Date.now()
    }]
    localStorage.setItem(`rethink_history_${user.id}`, JSON.stringify(history))
    
    renderWithProviders(<Profile />)
    const viewAllBtn = screen.getByText('View All History')
    // AUDIT FLAG: Button exists but has no onClick handler
    expect(viewAllBtn.onclick).toBeNull()
  })

  it('AUDIT: Filter button in action history has no onClick handler (dead code)', () => {
    mockUser()
    renderWithProviders(<Profile />)
    const filterBtn = screen.getByText('Filter')
    // AUDIT FLAG: Button exists but has no onClick handler
    expect(filterBtn.closest('button')?.onclick).toBeNull()
  })
})
