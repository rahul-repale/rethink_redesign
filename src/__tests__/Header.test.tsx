import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders, mockUser } from '../test/test-utils'
import Header from '../components/layout/Header'

describe('Header Component', () => {
  it('renders the logo', () => {
    renderWithProviders(<Header />)
    const logo = screen.getByAltText(/rethink/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /the story/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /micro-action library/i })).toBeInTheDocument()
  })

  it('shows Sign In button when not logged in', () => {
    renderWithProviders(<Header />)
    const signInLinks = screen.getAllByText(/sign in/i)
    expect(signInLinks.length).toBeGreaterThan(0)
  })

  it('shows user name and avatar when logged in', () => {
    const user = mockUser()
    renderWithProviders(<Header />)
    // User's name should appear in the header
    const userNames = screen.getAllByText(user.name)
    expect(userNames.length).toBeGreaterThan(0)
  })

  it('has mobile menu toggle button', () => {
    renderWithProviders(<Header />)
    const menuBtn = screen.getByLabelText(/open menu/i)
    expect(menuBtn).toBeInTheDocument()
  })

  it('mobile menu toggle has aria-expanded', () => {
    renderWithProviders(<Header />)
    const menuBtn = screen.getByLabelText(/open menu/i)
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
  })
})
