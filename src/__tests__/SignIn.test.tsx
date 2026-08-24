import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/test-utils'
import SignIn from '../pages/SignIn'

describe('SignIn Page', () => {
  it('renders the sign-in form', () => {
    renderWithProviders(<SignIn />)
    expect(screen.getByText('Sign in to continue to your dashboard.')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
  })

  it('has a link to the sign-up page', () => {
    renderWithProviders(<SignIn />)
    const link = screen.getByRole('link', { name: /create an account/i })
    expect(link).toHaveAttribute('href', '/signup')
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SignIn />)
    const passwordInput = screen.getByLabelText(/^password$/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    const toggleBtn = screen.getByLabelText(/show password/i)
    await user.click(toggleBtn)
    expect(passwordInput).toHaveAttribute('type', 'text')

    const hideBtn = screen.getByLabelText(/hide password/i)
    await user.click(hideBtn)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('email and password fields are required', () => {
    renderWithProviders(<SignIn />)
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })

  it('renders Forgot Password link (AUDIT: uses href="#" anti-pattern)', () => {
    renderWithProviders(<SignIn />)
    const forgotLink = screen.getByText('Forgot Password?')
    expect(forgotLink).toBeInTheDocument()
    // AUDIT FLAG: href="#" is an a11y anti-pattern
    expect(forgotLink).toHaveAttribute('href', '#')
  })

  it('AUDIT: form inputs are missing autoComplete attributes', () => {
    renderWithProviders(<SignIn />)
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    // These SHOULD have autoComplete but DON'T — accessibility issue
    expect(emailInput).not.toHaveAttribute('autoComplete')
    expect(passwordInput).not.toHaveAttribute('autoComplete')
  })
})
