import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { LOGO_URL } from '../../assets/images'
import { LANDING_NAV_LINKS } from '../../constants/navigation'
import Button from '../ui/Button'

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img alt="CampusMind Logo" className="h-8 w-auto" src={LOGO_URL} />
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary">
            CampusMind
          </h1>
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
          <Button as={Link} to="/dashboard" rounded="full" size="md">
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <Menu className="size-6 text-on-surface-variant" />
        </div>
      </div>
    </header>
  )
}
