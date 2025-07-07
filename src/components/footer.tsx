import Link from 'next/link'
import { Sparkles, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react'

const footerSections = [
  {
    title: 'Company',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Product',
    links: [
      { name: 'Templates', href: '/templates' },
      { name: 'Features', href: '/features' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'API', href: '/api' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Enterprise', href: '/enterprise' },
      { name: 'Roadmap', href: '/roadmap' },
      { name: 'Changelog', href: '/changelog' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/learn' },
      { name: 'Community', href: '/community' },
      { name: 'Showcase', href: '/showcase' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Support', href: '/support' },
      { name: 'Status', href: '/status' },
      { name: 'Brand Guidelines', href: '/brand' },
      { name: 'Affiliates', href: '/affiliates' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' },
      { name: 'Report Abuse', href: '/abuse' }
    ]
  }
]

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/aibuilder',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aibuilder',
    icon: Github,
    color: 'hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/aibuilder',
    icon: Linkedin,
    color: 'hover:text-[#0077B5]'
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/aibuilder',
    icon: MessageCircle,
    color: 'hover:text-[#5865F2]'
  }
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold gradient-text">AI Builder</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Create stunning websites with AI. No coding required, just describe your vision and watch it come to life.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 AI Builder. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
              <div className="text-gray-400">
                Made with ❤️ for creators
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
