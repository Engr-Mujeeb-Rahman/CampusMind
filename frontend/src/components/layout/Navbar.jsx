import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { LANDING_NAV_LINKS } from '../../constants/navigation'
import Button from '../ui/Button'
import apiClient from '../../services/apiClient'

export default function Navbar() {
  const isAuthenticated = apiClient.auth.isAuthenticated();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-headline-lg text-headline-lg font-bold text-primary">
            CampusMind
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LANDING_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Button as={Link} to="/dashboard" rounded="full" size="md">
              Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="font-label-md text-on-surface-variant hover:text-primary transition-colors">Sign In</Link>
              <Button as={Link} to="/signup" rounded="full" size="md">
                Get Started
              </Button>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <Menu className="size-6 text-on-surface-variant" />
        </div>
      </div>
    </header>
  )
}
