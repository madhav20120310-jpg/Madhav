import React from 'react';
import { CalendarClock, PhoneCall, MessageCircle, MapPin, Printer } from 'lucide-react';
import { Language } from '../types/astrology';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenLocation: () => void;
  onOpenPrint: () => void;
  activeTab: string;
  onSelectTab: (tab: 'home' | 'astrobase' | 'compatibility' | 'muhurtham' | 'panchangam') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenBooking,
  onOpenLocation,
  onOpenPrint,
  activeTab,
  onSelectTab,
}) => {
  const isTa = currentLanguage === 'ta';

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-500/20 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Zone with Logo */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img
            src="/assets/aistudio/image_363aba76.png"
            alt="மாதவ் ஜோதிட நிலையம் சின்னம்"
            className="w-11 h-11 rounded-full border-2 border-amber-400/80 shadow-sm object-cover transition-transform group-hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-amber-300 font-serif whitespace-nowrap">
                {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
              </span>
            </div>
            <p className="text-[10px] text-amber-200/70 hidden sm:block whitespace-nowrap">
              {isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் · திருவண்ணாமலை' : 'Hereditary Astrologer · Tiruvannamalai'}
            </p>
          </div>
        </div>

        {/* Zone 2: Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-amber-100/80">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-amber-300 ${
              activeTab === 'home' ? 'text-amber-300 border-b-2 border-amber-400 font-semibold' : ''
            }`}
          >
            {isTa ? 'ஜாதக கணிப்பு' : 'Horoscope'}
          </button>
          <button
            onClick={() => onSelectTab('astrobase')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-amber-300 ${
              activeTab === 'astrobase' ? 'text-amber-300 border-b-2 border-amber-400 font-semibold' : ''
            }`}
          >
            {isTa ? 'குடும்ப ஜாதகம் (Astrobase)' : 'Family Astrobase'}
          </button>
          <button
            onClick={() => onSelectTab('compatibility')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-amber-300 ${
              activeTab === 'compatibility' ? 'text-amber-300 border-b-2 border-amber-400 font-semibold' : ''
            }`}
          >
            {isTa ? 'திருமணப்பொருத்தம்' : 'Compatibility'}
          </button>
          <button
            onClick={() => onSelectTab('muhurtham')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-amber-300 ${
              activeTab === 'muhurtham' ? 'text-amber-300 border-b-2 border-amber-400 font-semibold' : ''
            }`}
          >
            {isTa ? 'முகூர்த்தம்' : 'Muhurtham'}
          </button>
          <button
            onClick={() => onSelectTab('panchangam')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-amber-300 ${
              activeTab === 'panchangam' ? 'text-amber-300 border-b-2 border-amber-400 font-semibold' : ''
            }`}
          >
            {isTa ? 'பஞ்சாங்கம்' : 'Panchangam'}
          </button>
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors whitespace-nowrap text-amber-200/90"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{isTa ? 'முகவரி & வழி' : 'Location & Map'}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Language Toggle + Munpadhivu / WhatsApp) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center border border-amber-500/30 rounded-md overflow-hidden text-xs bg-stone-800">
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2 py-1 font-medium transition-colors ${
                isTa ? 'bg-amber-600 text-stone-900 font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 font-medium transition-colors ${
                !isTa ? 'bg-amber-600 text-stone-900 font-bold' : 'text-stone-300 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Print Hub Button */}
          <button
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-200 hover:text-white bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 rounded-lg shadow-xs transition-colors cursor-pointer"
            title={isTa ? 'அச்சு விருப்பங்கள் (Print Options)' : 'Print Options'}
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{isTa ? 'அச்சிடுக' : 'Print'}</span>
          </button>

          {/* Quick Call */}
          <a
            href="tel:+919042924345"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-amber-200 hover:text-amber-100 hover:bg-stone-800 rounded-lg transition-colors border border-amber-500/20"
            title="அழைக்க: 90429 24345"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">90429 24345</span>
          </a>

          {/* Online Munpadhivu / WhatsApp CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <CalendarClock className="w-4 h-4 text-stone-950" />
            <span>{isTa ? 'முன்பதிவு (Booking)' : 'Book Consultation'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
