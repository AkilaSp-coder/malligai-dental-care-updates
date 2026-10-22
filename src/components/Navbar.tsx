import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Shield, Clock, MapPin, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (prefillService?: string, prefillDoctor?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services', highlight: '4 New' },
    { label: 'Facilities', href: '#facilities', badge: 'Digital Tech' },
    { label: 'Our Doctors', href: '#doctors' },
    { label: 'Clinic Tour', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>Mon - Sat: 9:30 AM – 1:30 PM & 4:30 PM – 9:00 PM | Sun: 10:00 AM – 1:00 PM</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Main Road, Tamil Nadu</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20inquire%20about%20dental%20treatments.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-4 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Clinic Brand & Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            {/* Real Logo Emblem styled from the clinic's exterior sign */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center p-2 shadow-md border border-slate-700 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-white fill-current"
              >
                <path d="M12 2C8.5 2 6 4.5 6 8c0 2.2.8 4.2 2 5.5.8.9 1.3 2 1.5 3.2.3 1.8 1.1 4.3 2.5 4.3s2.2-2.5 2.5-4.3c.2-1.2.7-2.3 1.5-3.2 1.2-1.3 2-3.3 2-5.5 0-3.5-2.5-6-6-6zm-2.2 4.5c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.3-.8.8-.8zm4.4 0c.4 0 .8.4.8.8 0 .5-.4.9-.8.9-.5 0-.8-.4-.8-.9 0-.4.4-.8.8-.8z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  MALLIGAI <span className="bg-slate-900 text-white font-black px-1.5 py-0.5 rounded-md ml-1 shadow-sm">DENTAL</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Care & Implant Centre
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors flex items-center space-x-1.5 relative py-1"
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.highlight}
                  </span>
                )}
                {link.badge && (
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-colors"
              title="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => onOpenBooking()}
              className="bg-sky-600 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1 sm:hidden"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-base font-semibold text-slate-800 border-b border-slate-100"
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.highlight}
                    </span>
                  )}
                  {link.badge && (
                    <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

              <div className="pt-3 flex flex-col space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>

                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-2.5 border border-slate-300 rounded-xl font-semibold text-xs text-slate-700 text-center flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    <span>Call Clinic</span>
                  </a>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20book%20an%20appointment`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-xs text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
