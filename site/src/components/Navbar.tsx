import { Hexagon } from 'lucide-react';

const navLinks = [
  { label: 'Capabilities', href: '#capability' },
  { label: 'Pillars', superscript: '5', href: '#deck' },
  { label: 'Live Simulator', href: '#demo' },
  { label: 'Verified PDF', href: '#pdf-report' },
  { label: 'Audit Trail', href: '#sources' },
];

export default function Navbar() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/20 backdrop-blur-md"
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3.5 sm:px-8 md:px-12">
        {/* Brand Logo with Hexagon (matching Image 1 & promtforsite.txt) */}
        <a
          href="#hero"
          className="reveal flex items-center gap-2 text-white drop-shadow-md transition-opacity hover:opacity-85"
          style={{ transitionDelay: '0ms' }}
          aria-label="CashPulse – go to top"
        >
          <Hexagon size={24} strokeWidth={1.5} className="text-[#e8993e]" aria-hidden="true" />
          <span className="text-lg font-medium tracking-tight sm:text-xl">
            cashpulse
          </span>
        </a>

        {/* Center Links (hidden below md) */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="reveal flex items-center text-sm text-white/85 transition-colors hover:text-white"
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <span>{link.label}</span>
              {link.superscript && (
                <sup className="ml-1 font-mono text-[10px] text-[#e8993e]">
                  {link.superscript}
                </sup>
              )}
            </a>
          ))}
        </div>

        {/* Right CTA Button */}
        <a
          href="#sources"
          className="reveal rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:px-5 sm:text-sm"
          style={{ transitionDelay: '500ms' }}
        >
          Get Free Consultation
        </a>
      </div>
    </nav>
  );
}
