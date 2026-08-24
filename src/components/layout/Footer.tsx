import logo from '../../assets/logo-color.svg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 py-12 md:flex-row md:justify-between md:px-8">
        {/* Brand */}
        <img
          src={logo}
          alt="ReThink — an initiative of Re"
          className="h-8 w-auto opacity-70 grayscale transition-all duration-300 hover:grayscale-0"
        />

        {/* Copyright */}
        <p className="text-body-md font-body-md text-secondary">
          © {year} ReThink Sustainability. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/company/rethink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label-md font-label-md text-on-secondary-container transition-colors duration-200 hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/rethink"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label-md font-label-md text-on-secondary-container transition-colors duration-200 hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="mailto:rethink@getre.org"
            className="text-label-md font-label-md text-on-secondary-container transition-colors duration-200 hover:text-primary"
          >
            rethink@getre.org
          </a>
        </div>
      </div>
    </footer>
  )
}
