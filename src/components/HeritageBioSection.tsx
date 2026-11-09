import React from 'react';
import { Award, ShieldCheck, HeartHandshake, History, Sparkles } from 'lucide-react';
import { Language } from '../types/astrology';

interface HeritageBioSectionProps {
  currentLanguage: Language;
}

export const HeritageBioSection: React.FC<HeritageBioSectionProps> = ({ currentLanguage }) => {
  const isTa = currentLanguage === 'ta';

  const astrologers = [
    {
      title: isTa ? 'ஜோதிடமாமேதை' : 'Astrological Luminary',
      name: isTa ? 'ராமச்சந்திரன் நாட்டார்' : 'Ramachandran Nattar',
      era: isTa ? 'மலமஞ்சனூர் மூல பரம்பரை ஸ்தாபகர்' : 'Founding Ancestral Patriarch',
      descTa:
        'பூர்வீக மலமஞ்சனூர் சுவடி ஜோதிட முறையை திருவண்ணாமலையில் நிலைநிறுத்திய ஆதி ஜோதிட வித்தகர். பல்லாயிரக்கணக்கான குடும்பங்களுக்கு துல்லியமான ஜாதகக் கணிப்பு மற்றும் ஆயுள் பலன்களை அருளியவர்.',
      descEn:
        'Pioneer of traditional Malamanjanur palm-leaf astrology in Tiruvannamalai, renowned for foundational horoscope calculations and accurate life predictions.',
      speciality: isTa ? 'சுவடி ஜோதிடம் · ஆயுள் கணிதம்' : 'Palm-Leaf Astrology · Longevity Analysis',
    },
    {
      title: isTa ? 'ஜோதிட வாஸ்து ரத்னா' : 'Jothida Vastu Rathna',
      name: isTa ? 'மாணிக்க நாட்டார் MR' : 'Manicka Nattar MR',
      era: isTa ? 'இரண்டாம் தலைமுறை வாஸ்து மாமேதை' : 'Second Generation Vastu Master',
      descTa:
        'மனையடி சாஸ்திரம், அஷ்டதிக்க வாஸ்து மற்றும் ஆலய ஸ்தபதி நுணுக்கங்களை வேத ஜோதிடத்துடன் இணைத்து வெற்றிகரமாக வழிகாட்டிய மூத்த வாஸ்து நிபுணர். எண்ணற்ற வீடுகள், வணிக வளாகங்களுக்கு சுப அஸ்திவாரம் அமைத்தவர்.',
      descEn:
        'Master of traditional Manaiyadi Shastra and structural directional energies, orchestrating auspicious home foundations and commercial prosperity.',
      speciality: isTa ? 'மனையடி சாஸ்திரம் · கோயில் வாஸ்து' : 'Manaiyadi Shastra · Directional Energies',
    },
    {
      title: isTa ? 'ஜோதிட ஆலோசகர்' : 'Astrological Consultant & Scholar',
      name: isTa ? 'ராமச்சந்திரன் MA' : 'Ramachandran MA',
      era: isTa ? 'தற்கால தலைமை ஜோதிட ஆலோசகர்' : 'Current Chief Consultant & Scholar',
      descTa:
        'முதுகலை பட்டதாரியான இவர், பரம்பரை சுவடி ஞானத்துடன் நவீன திருக்கணித மற்றும் வாக்கிய பஞ்சாங்க ஆய்வுகளை ஒன்றிணைத்து திருமணப் பொருத்தம், தசாபுத்தி பலன்கள் மற்றும் தோஷ பரிகாரங்களை வழங்கி வருகிறார்.',
      descEn:
        'Postgraduate scholar integrating ancestral heritage with precise modern ephemeris calculations for comprehensive marriage compatibility and Dasa Bukthi guidance.',
      speciality: isTa ? 'திருமணப் பொருத்தம் · தசாபுத்தி பலன்' : 'Marriage Compatibility · Dasa Bukthi',
    },
  ];

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-5">
      <div className="flex items-center gap-2.5 border-b border-amber-500/20 pb-3">
        <History className="w-5 h-5 text-amber-400" />
        <div>
          <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
            {isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிட குருமார்கள் வரலாறு' : 'Malamanjanur Hereditary Lineage Masters'}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {isTa
              ? 'ஸ்ரீ முத்தாலம்மன் அருளுடன் மூன்று தலைமுறைகளாக தொடரும் புனித ஜோதிட சேவை'
              : 'Three generations of authentic Vedic astrology dedicated in Tiruvannamalai'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {astrologers.map((astro, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 flex flex-col justify-between space-y-3 hover:border-amber-400/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    {astro.title}
                  </span>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {astro.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 block font-medium">
                    {astro.era}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed pt-1">
                {isTa ? astro.descTa : astro.descEn}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-800 text-[10px] text-amber-300/90 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{astro.speciality}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
