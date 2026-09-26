import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MinimalHeader } from './components/MinimalHeader';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';

// Lazy load below-the-fold and heavy modal components for maximum initial load performance
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ServicesSection = lazy(() =>
  import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const ExperienceSection = lazy(() =>
  import('./components/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const ClientSuccessSection = lazy(() =>
  import('./components/ClientSuccessSection').then((m) => ({ default: m.ClientSuccessSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const BookingModal = lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);

// Graceful Section Fallback Skeleton preventing layout shifts
const SectionFallback = () => (
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
    <div className="w-full h-48 rounded-3xl bg-neutral-100/60 animate-pulse" />
  </div>
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBookingOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // High-performance scroll spy with requestAnimationFrame throttling (zero forced reflows)
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const sections = [
        { id: 'contact-section', tab: 'Contact' },
        { id: 'client-success-section', tab: 'Reviews' },
        { id: 'experience-section', tab: 'Experience' },
        { id: 'services-section', tab: 'Services' },
        { id: 'about-section', tab: 'About' },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && scrollY >= el.offsetTop - 280) {
          setActiveTab(sec.tab);
          ticking = false;
          return;
        }
      }
      setActiveTab('Home');
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutClick = () => {
    const el = document.getElementById('about-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesClick = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExperienceClick = () => {
    const el = document.getElementById('experience-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReviewsClick = () => {
    const el = document.getElementById('client-success-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0118] text-[#141414] flex flex-col justify-between selection:bg-[#f16738]/20 selection:text-[#f16738] overflow-x-hidden">
      {/* Top Floating Dark Navigation */}
      <MinimalHeader
        onHireMe={handleContactClick}
        onServicesClick={handleServicesClick}
        onExperienceClick={handleExperienceClick}
        onReviewsClick={handleReviewsClick}
        onAboutClick={handleAboutClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Experience */}
      <main className="flex-1 flex flex-col justify-center items-center relative">
        {/* Above-the-fold Hero rendered immediately for fast FCP/LCP */}
        <HeroSection
          onHireMe={handleContactClick}
          onServicesClick={handleServicesClick}
        />

        {/* Lazy loaded sections wrapped in Suspense with smooth zero-CLS fallback */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection
            onBookCall={() => setIsBookingOpen(true)}
            onExploreServices={handleServicesClick}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ServicesSection
            onSelectService={(_service) => {
              setIsBookingOpen(true);
            }}
            onBookCall={() => setIsBookingOpen(true)}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection
            onBookCall={() => setIsBookingOpen(true)}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ClientSuccessSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        </Suspense>
      </main>

      {/* Bespoke Comprehensive Footer */}
      <Footer
        onOpenBooking={() => setIsBookingOpen(true)}
        onContactClick={handleContactClick}
        onServicesClick={handleServicesClick}
        onAboutClick={handleAboutClick}
        onExperienceClick={handleExperienceClick}
        onReviewsClick={handleReviewsClick}
      />

      {/* Lazy Loaded Modals */}
      <Suspense fallback={null}>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
