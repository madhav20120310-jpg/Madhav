import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Eye, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { Language } from '../types/astrology';

interface BannerHeroProps {
  currentLanguage: Language;
  onOpenBooking: () => void;
  onOpenLocation: () => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  currentLanguage,
  onOpenBooking,
  onOpenLocation,
}) => {
  const isTa = currentLanguage === 'ta';
  const [showFullBannerModal, setShowFullBannerModal] = useState<string | null>(null);

  const services = isTa
    ? [
        { title: 'ஜாதகம்', desc: 'துல்லிய கணிப்பு & பலன்கள்' },
        { title: 'பொருத்தம்', desc: '10 திருமணப் பொருத்தங்கள்' },
        { title: 'தசாபுத்தி பலன்கள்', desc: 'விம்சோத்தரி தசா ஆய்வு' },
        { title: 'வாஸ்து ஆலோசனை', desc: 'மனையடி சாஸ்திரம்' },
        { title: 'கிரக தோஷ நிவாரணம்', desc: 'பரிகார வழிகாட்டல்' },
        { title: 'எண்ணியல் ஆலோசனை', desc: 'நியூமராலஜி தேர்வு' },
      ]
    : [
        { title: 'Horoscope (Jadhagam)', desc: 'Accurate sidereal natal chart' },
        { title: 'Compatibility (Porutham)', desc: '10 Vedic marriage checks' },
        { title: 'Dasa Bukthi Predictions', desc: 'Vimshottari lifecycle roadmap' },
        { title: 'Vastu Consultation', desc: 'Ancient Manaiyadi Shastra' },
        { title: 'Graha Dosha Remedies', desc: 'Authentic temple pariharams' },
        { title: 'Numerology', desc: 'Name & lucky factors calculation' },
      ];

  const astrologers = [
    {
      title: isTa ? 'ஜோதிடமாமேதை' : 'Astrology Legend',
      name: isTa ? 'ராமச்சந்திரன் நாட்டார்' : 'Ramachandran Nattar',
      desc: isTa ? 'மலமஞ்சனூர் மூல பரம்பரை குரு' : 'Original Ancestral Founder',
    },
    {
      title: isTa ? 'ஜோதிட வாஸ்து ரத்னா' : 'Jothida Vastu Rathna',
      name: isTa ? 'மாணிக்க நாட்டார் MR' : 'Manicka Nattar MR',
      desc: isTa ? 'வாஸ்து & ஜாதக வித்வான்' : 'Senior Vastu & Horoscope Master',
    },
    {
      title: isTa ? 'ஜோதிட ஆலோசகர்' : 'Astrological Counselor',
      name: isTa ? 'ராமச்சந்திரன் MA' : 'Ramachandran MA',
      desc: isTa ? 'தலைமை கணித ஆலோசகர்' : 'Chief Astrological Consultant',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 text-amber-50 border-b border-amber-500/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Divine Invocation Banner */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isTa ? 'ஸ்ரீ முத்தாலம்மன் துணை' : 'Sri Muthalamman Thunai'}
          </span>
        </div>

        {/* Main Title & Heritage Branding */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/assets/aistudio/image_363aba76.png"
              alt="மாதவ் ஜோதிட நிலையம் Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 shadow-lg object-cover"
            />
            <div className="text-left">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-serif tracking-tight">
                {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-amber-200/90 tracking-wide mt-0.5">
                {isTa
                  ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் - மனையடி சாஸ்திரம் (வாஸ்து)'
                  : 'Malamanjanur Hereditary Astrologer - Manaiyadi Shastra (Vastu)'}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed mt-2">
            {isTa
              ? 'திருவண்ணாமலை புனித மண்ணில், பாரம்பரிய மலமஞ்சனூர் ஜோதிட முறையில் ஜாதகம் கணித்தல், திருமணப் பொருத்தம், முகூர்த்தம், வாஸ்து மற்றும் தோஷ பரிகார ஆலோசனைகள் வழங்கப்படுகிறது.'
              : 'Traditional Vedic Astrology, Horoscope calculation, 10-Porutham marriage compatibility, Muhurtham and authentic pariharams from the sacred grounds of Tiruvannamalai.'}
          </p>
        </div>

        {/* 3 Lineage Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
          {astrologers.map((astro, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-stone-900/80 border border-amber-500/20 shadow-xs"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                  {astro.title}
                </span>
                <h4 className="text-sm font-bold text-amber-100 truncate">
                  {astro.name}
                </h4>
                <p className="text-[11px] text-stone-400 truncate">
                  {astro.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Strips: Contact & Location Quick Bar */}
        <div className="bg-amber-950/60 border border-amber-400/30 rounded-xl p-3 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-amber-200">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{isTa ? 'தொடர்புக்கு:' : 'Cell:'}</span>
              <a
                href="tel:+919042924345"
                className="font-bold text-amber-300 hover:underline font-mono"
              >
                90429 24345
              </a>
              <span>,</span>
              <a
                href="tel:+919043515667"
                className="font-bold text-amber-300 hover:underline font-mono"
              >
                90435 15667
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-xs">
                {isTa
                  ? 'எண். 1833 / G2, குபேர நகர் மெயின் ரோடு, வேங்கிக்கால் / மலமஞ்சனூர் - திருவண்ணாமலை 606 604'
                  : 'No. 1833 / G2, Kubera Nagar Main Rd, Vengikkal / Malamanjanur, Tiruvannamalai 606 604'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullBannerModal('banner1')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-amber-300 hover:text-amber-100 bg-amber-900/50 hover:bg-amber-900/80 border border-amber-500/40 rounded transition-colors"
              title="அசல் விளம்பர பலகை 1 ஐ காண்க"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isTa ? 'அசல் அறிவிப்பு' : 'Original Board'}</span>
            </button>
            <button
              onClick={onOpenLocation}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-amber-300 hover:text-amber-100 bg-amber-900/50 hover:bg-amber-900/80 border border-amber-500/40 rounded transition-colors"
              title="QR கோடு மற்றும் வழித்தடம்"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isTa ? 'QR & வழித்தடம்' : 'QR & Route'}</span>
            </button>
          </div>
        </div>

        {/* 6 Key Services Grid */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              {isTa ? '— எங்கள் சிறப்பு சேவைகள் —' : '— Our Astrological Services —'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {services.map((item, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-stone-900/60 border border-amber-500/15 text-center hover:border-amber-400/40 transition-colors"
              >
                <div className="text-xs font-bold text-amber-200">{item.title}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal to view original high-resolution banners (Image 1 or Image 2) */}
      {showFullBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-stone-900 border border-amber-500/40 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 border-b border-amber-500/20 bg-stone-950">
              <h3 className="text-sm font-bold text-amber-300">
                {isTa ? 'மாதவ் ஜோதிட நிலையம் - அசல் பதாகை' : 'Madhav Jodhida Nilayam - Authentic Board'}
              </h3>
              <button
                onClick={() => setShowFullBannerModal(null)}
                className="text-stone-400 hover:text-white px-2 py-0.5 text-xs font-bold rounded"
              >
                ✕ {isTa ? 'மூடுக' : 'Close'}
              </button>
            </div>
            <div className="p-3 bg-stone-950/80 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={
                  showFullBannerModal === 'banner1'
                    ? '/assets/aistudio/image_b2c55ef0.png'
                    : '/assets/aistudio/image_f195fea7.png'
                }
                alt="Banner preview"
                className="max-h-[75vh] w-auto rounded border border-amber-500/30 object-contain shadow-lg"
              />
            </div>
            <div className="p-3 bg-stone-900 flex justify-between items-center text-xs text-amber-200/80">
              <span>{isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் · திருவண்ணாமலை' : 'Malamanjanur Hereditary Astrologer'}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFullBannerModal('banner1')}
                  className={`px-2 py-1 rounded text-xs ${
                    showFullBannerModal === 'banner1' ? 'bg-amber-600 text-stone-900 font-bold' : 'text-stone-300'
                  }`}
                >
                  {isTa ? 'பதாகை 1 (ஜோதிடர்கள்)' : 'Board 1 (Astrologers)'}
                </button>
                <button
                  onClick={() => setShowFullBannerModal('banner2')}
                  className={`px-2 py-1 rounded text-xs ${
                    showFullBannerModal === 'banner2' ? 'bg-amber-600 text-stone-900 font-bold' : 'text-stone-300'
                  }`}
                >
                  {isTa ? 'பதாகை 2 (QR & வரைபடம்)' : 'Board 2 (QR & Map)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
