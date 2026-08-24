import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test/test-utils'
import Footer from '../components/layout/Footer'

describe('Footer Component', () => {
  it('renders copyright with current year', () => {
    renderWithProviders(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument()
  })

  it('renders social links', () => {
    renderWithProviders(<Footer />)
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/company/rethink')
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')

    const instagram = screen.getByRole('link', { name: /instagram/i })
    expect(instagram).toHaveAttribute('href', 'https://instagram.com/rethink')
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders email link', () => {
    renderWithProviders(<Footer />)
    const email = screen.getByRole('link', { name: /rethink@getre.org/i })
    expect(email).toHaveAttribute('href', 'mailto:rethink@getre.org')
  })

  it('renders the footer logo', () => {
    renderWithProviders(<Footer />)
    const logo = screen.getByAltText(/rethink/i)
    expect(logo).toBeInTheDocument()
  })
})
