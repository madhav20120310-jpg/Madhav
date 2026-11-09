/**
 * Madhav Jodhida Nilayam - Main Application Entry
 * Traditional Vedic Astrology, 1-Page Kuripu, 35/16-Page Jadhagam,
 * Astrobase, 10-Poruthams Compatibility, Muhurtham & Panchangam.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { AstroCompanion } from './components/AstroCompanion';
import { KuripuModal } from './components/KuripuModal';
import { JadhagamModal, JadhagamFormat } from './components/JadhagamModal';
import { PrintSelectorModal } from './components/PrintSelectorModal';
import { AstrobaseModal } from './components/AstrobaseModal';
import { CompatibilityModal } from './components/CompatibilityModal';
import { MuhurthamModal } from './components/MuhurthamModal';
import { PanchangamModal } from './components/PanchangamModal';
import { BookingModal } from './components/BookingModal';
import { LocationModal } from './components/LocationModal';
import { BirthData, ComputedHoroscope, Language, MuhurthamSlot } from './types/astrology';
import { computeHoroscope } from './utils/astrologyEngine';

const DEFAULT_PROFILES: BirthData[] = [
  {
    id: 'profile_1',
    name: 'மு. மாதவ்',
    gender: 'male',
    dob: '2026-11-10',
    tob: '18:32:12',
    pob: 'Theni',
    latitude: 9.9658,
    longitude: 77.4777,
    timezone: 5.5,
    dst: 0,
    fatherName: 'முத்துக்கிருஷ்ணன்',
    motherName: 'சாந்தி',
    createdAt: '2026-10-29T08:00:00.000Z',
  },
  {
    id: 'profile_2',
    name: 'சு. கார்த்திகேயன்',
    gender: 'male',
    dob: '1998-05-14',
    tob: '08:15:00',
    pob: 'Tiruvannamalai',
    latitude: 12.2253,
    longitude: 79.0747,
    timezone: 5.5,
    dst: 0,
    fatherName: 'சுப்ரமணியன்',
    motherName: 'மீனாட்சி',
    createdAt: '2026-10-29T08:10:00.000Z',
  },
  {
    id: 'profile_3',
    name: 'ரா. பவித்ரா',
    gender: 'female',
    dob: '2001-09-22',
    tob: '14:45:00',
    pob: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 5.5,
    dst: 0,
    fatherName: 'ராஜேந்திரன்',
    motherName: 'காயத்ரி',
    createdAt: '2026-10-29T08:15:00.000Z',
  },
];

export default function App() {
  const [language, setLanguage] = useState<Language>('ta');
  const [activeTab, setActiveTab] = useState<'home' | 'astrobase' | 'compatibility' | 'muhurtham' | 'panchangam'>('home');

  // Astrobase profiles with localStorage persistence
  const [savedProfiles, setSavedProfiles] = useState<BirthData[]>(() => {
    try {
      const stored = localStorage.getItem('madhav_astrobase_profiles');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILES;
    } catch {
      return DEFAULT_PROFILES;
    }
  });

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(DEFAULT_PROFILES[0].id);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAstrobaseOpen, setIsAstrobaseOpen] = useState(false);
  const [isCompatibilityOpen, setIsCompatibilityOpen] = useState(false);
  const [isMuhurthamOpen, setIsMuhurthamOpen] = useState(false);
  const [isPanchangamOpen, setIsPanchangamOpen] = useState(false);
  const [isPrintSelectorOpen, setIsPrintSelectorOpen] = useState(false);
  const [selectedJadhagamFormat, setSelectedJadhagamFormat] = useState<JadhagamFormat>('35_a5_landscape');
  const [activeKuripuHoroscope, setActiveKuripuHoroscope] = useState<ComputedHoroscope | null>(null);
  const [activeJadhagamHoroscope, setActiveJadhagamHoroscope] = useState<ComputedHoroscope | null>(null);
  const [currentHoroscope, setCurrentHoroscope] = useState<ComputedHoroscope>(() => computeHoroscope(DEFAULT_PROFILES[0]));
  const [prefilledMuhurthamSlot, setPrefilledMuhurthamSlot] = useState<MuhurthamSlot | null>(null);

  // Sync saved profiles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('madhav_astrobase_profiles', JSON.stringify(savedProfiles));
    } catch {
      // ignore storage error
    }
  }, [savedProfiles]);

  const handleSaveToAstrobase = (profile: BirthData) => {
    setSavedProfiles((prev) => {
      const idx = prev.findIndex((p) => p.id === profile.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = profile;
        return copy;
      }
      return [profile, ...prev];
    });
    setSelectedProfileId(profile.id);
  };

  const handleDeleteProfile = (id: string) => {
    setSavedProfiles((prev) => prev.filter((p) => p.id !== id));
    if (selectedProfileId === id) {
      setSelectedProfileId(null);
    }
  };

  const handleImportProfiles = (profiles: BirthData[]) => {
    setSavedProfiles(profiles);
  };

  const handleTabSelect = (tab: 'home' | 'astrobase' | 'compatibility' | 'muhurtham' | 'panchangam') => {
    setActiveTab(tab);
    if (tab === 'astrobase') setIsAstrobaseOpen(true);
    if (tab === 'compatibility') setIsCompatibilityOpen(true);
    if (tab === 'muhurtham') setIsMuhurthamOpen(true);
    if (tab === 'panchangam') setIsPanchangamOpen(true);
  };

  const handleOpenJadhagamWithFormat = (
    horoscope: ComputedHoroscope,
    format?: JadhagamFormat
  ) => {
    setCurrentHoroscope(horoscope);
    if (format) {
      setSelectedJadhagamFormat(format);
    }
    setActiveJadhagamHoroscope(horoscope);
  };

  const handleOpenKuripu = (horoscope: ComputedHoroscope) => {
    setCurrentHoroscope(horoscope);
    setActiveKuripuHoroscope(horoscope);
  };

  const handleOpenPrintHub = (horoscope?: ComputedHoroscope) => {
    if (horoscope) {
      setCurrentHoroscope(horoscope);
    }
    setIsPrintSelectorOpen(true);
  };

  const isTa = language === 'ta';

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Main page content - hidden when modal is open during print so only the modal prints */}
      <div className={`flex flex-col flex-1 ${activeKuripuHoroscope || activeJadhagamHoroscope ? 'print:hidden' : ''}`}>
        {/* 3-Zone Top Bar */}
        <Header
          currentLanguage={language}
          onLanguageChange={setLanguage}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLocation={() => setIsLocationOpen(true)}
          onOpenPrint={() => handleOpenPrintHub(currentHoroscope)}
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
        />

        {/* Hero & Ancestral Astrologers Banner (Image 1 & 2 details) */}
        <BannerHero
          currentLanguage={language}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenLocation={() => setIsLocationOpen(true)}
        />

        {/* Main Astrological Software Companion (Image 3 options + In-depth sections) */}
        <main className="flex-1">
          <AstroCompanion
            currentLanguage={language}
            onLanguageChange={setLanguage}
            onOpenAstrobase={() => setIsAstrobaseOpen(true)}
            onOpenCompatibility={() => setIsCompatibilityOpen(true)}
            onOpenMuhurtham={() => setIsMuhurthamOpen(true)}
            onOpenPanchangam={() => setIsPanchangamOpen(true)}
            onOpenKuripu={handleOpenKuripu}
            onOpenJadhagam={handleOpenJadhagamWithFormat}
            onOpenPrintSelector={handleOpenPrintHub}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenLocation={() => setIsLocationOpen(true)}
            onSaveToAstrobase={handleSaveToAstrobase}
            savedProfiles={savedProfiles}
            selectedProfileId={selectedProfileId}
            onSelectProfile={setSelectedProfileId}
          />
        </main>

        {/* Footer conforming to Frontend Constitution */}
        <footer className="bg-stone-950 border-t border-amber-500/20 py-8 px-4 sm:px-6 text-stone-400 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_363aba76.png"
                alt="மாதவ் ஜோதிட நிலையம் Logo"
                className="w-10 h-10 rounded-full border border-amber-500/50 object-cover"
              />
              <div>
                <span className="font-bold text-amber-300 text-sm font-serif">
                  {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
                </span>
                <p className="text-[11px] text-stone-500">
                  {isTa
                    ? 'ஸ்ரீ முத்தாலம்மன் துணை · மலமஞ்சனூர் பரம்பரை ஜோதிடர்'
                    : 'Sri Muthalamman Thunai · Malamanjanur Lineage'}
                </p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-amber-200/90 font-mono">
                செல்: 90429 24345 / 90435 15667
              </p>
              <p className="text-stone-500 text-[11px]">
                எண். 1833 / G2, குபேர நகர் மெயின் ரோடு, வேங்கிக்கால், திருவண்ணாமலை 606 604
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <span>© {new Date().getFullYear()} மாதவ் ஜோதிட நிலையம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsLocationOpen(true)} className="hover:text-amber-300 transition-colors">
                {isTa ? 'முகவரி வரைபடம்' : 'Location Map'}
              </button>
              <span>·</span>
              <button onClick={() => setIsBookingOpen(true)} className="hover:text-amber-300 transition-colors">
                {isTa ? 'முன்பதிவு (WhatsApp)' : 'Book Consultation'}
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* MODALS */}

      {/* 1. Kuripu Modal (Strictly 1 Page) */}
      {activeKuripuHoroscope && (
        <KuripuModal
          horoscope={activeKuripuHoroscope}
          currentLanguage={language}
          onClose={() => setActiveKuripuHoroscope(null)}
        />
      )}

      {/* 2. Jadhagam Book Modal (35 A5 Landscape / 35 A5 Portrait / 16 A4 Portrait) */}
      {activeJadhagamHoroscope && (
        <JadhagamModal
          horoscope={activeJadhagamHoroscope}
          currentLanguage={language}
          initialFormat={selectedJadhagamFormat}
          onClose={() => setActiveJadhagamHoroscope(null)}
        />
      )}

      {/* 2b. Astrological Print Hub Modal */}
      {isPrintSelectorOpen && currentHoroscope && (
        <PrintSelectorModal
          horoscope={currentHoroscope}
          currentLanguage={language}
          onClose={() => setIsPrintSelectorOpen(false)}
          onSelectKuripu={() => {
            setActiveKuripuHoroscope(currentHoroscope);
          }}
          onSelectJadhagam={(format) => {
            setSelectedJadhagamFormat(format);
            setActiveJadhagamHoroscope(currentHoroscope);
          }}
          onPrintCurrentPage={() => {
            window.print();
          }}
        />
      )}

      {/* 3. Kudumba Jadhagam Astrobase Modal */}
      {isAstrobaseOpen && (
        <AstrobaseModal
          currentLanguage={language}
          savedProfiles={savedProfiles}
          onSelectProfile={setSelectedProfileId}
          onDeleteProfile={handleDeleteProfile}
          onImportProfiles={handleImportProfiles}
          onClose={() => {
            setIsAstrobaseOpen(false);
            setActiveTab('home');
          }}
        />
      )}

      {/* 4. Compatibility Modal (10 Poruthams) */}
      {isCompatibilityOpen && (
        <CompatibilityModal
          currentLanguage={language}
          onClose={() => {
            setIsCompatibilityOpen(false);
            setActiveTab('home');
          }}
        />
      )}

      {/* 5. Muhurtham Modal */}
      {isMuhurthamOpen && (
        <MuhurthamModal
          currentLanguage={language}
          onClose={() => {
            setIsMuhurthamOpen(false);
            setActiveTab('home');
          }}
          onBookMuhurtham={(slot) => {
            setPrefilledMuhurthamSlot(slot);
            setIsBookingOpen(true);
          }}
        />
      )}

      {/* 6. Panchangam Modal */}
      {isPanchangamOpen && (
        <PanchangamModal
          currentLanguage={language}
          onClose={() => {
            setIsPanchangamOpen(false);
            setActiveTab('home');
          }}
        />
      )}

      {/* 7. Munpadhivu & WhatsApp Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          currentLanguage={language}
          onClose={() => {
            setIsBookingOpen(false);
            setPrefilledMuhurthamSlot(null);
          }}
          prefilledSlot={prefilledMuhurthamSlot}
        />
      )}

      {/* 8. Location & Map Guide Modal (from Image 2) */}
      {isLocationOpen && (
        <LocationModal
          currentLanguage={language}
          onClose={() => setIsLocationOpen(false)}
        />
      )}
    </div>
  );
}
