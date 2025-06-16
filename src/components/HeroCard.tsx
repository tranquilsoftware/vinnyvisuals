import { GradientHeroCard } from './cards/GradientHeroCard'
import { Instagram, Facebook, Mail } from 'lucide-react'
import { CONTACT_QUOTE_EMAIL, INSTAGRAM_LINK, FACEBOOK_LINK, BRAND_NAME, BRIEF_DESCRIPTION } from '../globals'

const socialLinks = [
  {
    icon: Instagram,
    href: `${INSTAGRAM_LINK}`,
    label: 'Instagram',
    ariaLabel: 'Follow us on Instagram'
  },
  {
    icon: Facebook,
    href: `${FACEBOOK_LINK}`,
    label: 'Facebook',
    ariaLabel: 'Visit our Facebook page'
  },
  {
    icon: Mail,
    href: `mailto: ${CONTACT_QUOTE_EMAIL}`,
    label: 'Email',
    ariaLabel: 'Send us an email'
  },
]

export function HeroCard() {
  return (
    <section className="w-full">
      <GradientHeroCard
        name={BRAND_NAME}
        role={BRIEF_DESCRIPTION}
        // avatarSrc={LOGO}
      />
      
      {/* Social Links */}
      <div className="flex justify-between mt-12 w-full max-w-7xl mx-auto px-8 md:px-12">
        <div className="w-full flex justify-between max-w-3xl mx-auto">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 lg:p-6 rounded-full bg-background-dark shadow-sm hover:shadow-md 
                         transition-all duration-300 transform hover:-translate-y-1
                         active:scale-90 active:translate-y-0
                         border border-primary/20 hover:border-primary/40
                         w-[4rem] h-[4rem] sm:w-20 sm:h-20 lg:w-24 lg:h-24
                         flex items-center justify-center
                         touch-manipulation hover:bg-background-secondary"
                aria-label={link.ariaLabel}
              >
                <Icon 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                           transition-colors duration-300
                           text-primary group-hover:text-primary-dark" 
                  strokeWidth={1.5}
                />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
