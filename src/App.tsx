/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ClinicGallery } from './components/ClinicGallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);
  const [prefilledDoctor, setPrefilledDoctor] = useState<string | undefined>(undefined);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<{ src: string; title: string } | null>(null);

  const handleOpenBooking = (service?: string, doctor?: string) => {
    setPrefilledService(service);
    setPrefilledDoctor(doctor);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPrefilledService(undefined);
    setPrefilledDoctor(undefined);
  };

  const handleOpenPhoto = (src: string, title: string) => {
    setSelectedPhotoModal({ src, title });
  };

  const handleClosePhoto = () => {
    setSelectedPhotoModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero with 3D Tooth */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Advanced Dental Facilities (Intraoral Scanner & Digital X-ray) */}
        <FacilitiesSection
          onOpenBooking={(serviceName) => handleOpenBooking(serviceName)}
          onSelectPhoto={handleOpenPhoto}
        />

        {/* 3. Dental Services & 4 Requested Treatments */}
        <ServicesSection onOpenBooking={(serviceName) => handleOpenBooking(serviceName)} />

        {/* 4. Doctors Section (Dr. R. Patrajan & Dr. T. Sankari Patrajan) */}
        <DoctorsSection onOpenBooking={handleOpenBooking} />

        {/* 5. Real Clinic Gallery & Tour */}
        <ClinicGallery
          selectedPhotoModal={selectedPhotoModal}
          onClosePhotoModal={handleClosePhoto}
          onOpenPhotoModal={handleOpenPhoto}
        />

        {/* 6. Contact Information, Timings & Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialService={prefilledService}
        initialDoctor={prefilledDoctor}
      />

      {/* Persistent Floating Bottom Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-sky-600" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Malligai%20Dental%20Care,%20I%20would%20like%20to%20book%20an%20appointment`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-2.5 px-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}
