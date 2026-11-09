import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types/astrology';

interface FaqSectionProps {
  currentLanguage: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLanguage }) => {
  const isTa = currentLanguage === 'ta';
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qTa: 'லக்னம் மற்றும் ராசிக்கு உள்ள வேறுபாடு என்ன?',
      qEn: 'What is the distinction between Lagna (Ascendant) and Janma Rasi?',
      aTa: 'ராசி என்பது ஒரு மனிதன் பிறக்கும் போது சந்திரன் எந்த ராசியில் சஞ்சரிக்கிறாரோ அதைக் குறிக்கும். ஆனால் லக்னம் என்பது பிறக்கும் அந்த குறிப்பிட்ட நிமிடத்தில் கிழக்கு அடிவானத்தில் உதிக்கும் ராசியைக் குறிக்கிறது. லக்னமே மனிதனின் உயிர், உடல், ஆயுள் மற்றும் சுய ஆளுமையைத் தீர்மானிக்கும் முதன்மை ஆதாரமாகும்.',
      aEn: 'Rasi reflects the sign inhabited by the Moon at birth, governing mind and emotions. Lagna (Ascendant) is the exact zodiac sign rising in the Eastern horizon at the birth minute, dictating the physical body, vitality, longevity, and overall destiny.',
    },
    {
      qTa: 'ராசி கட்டத்திற்கும் நவாம்ச கட்டத்திற்கும் என்ன வித்தியாசம்?',
      qEn: 'What is the relationship between Rasi Chart (D1) and Navamsa Chart (D9)?',
      aTa: 'ராசி கட்டம் என்பது வெளிப்படையாகத் தெரியும் மரத்தின் அடிமரம் போன்றது; நவாம்சம் என்பது அதன் வேர் போன்றது. ராசி கட்டத்தில் ஒரு கிரகம் பலவீனமாக இருந்தாலும் நவாம்சத்தில் உச்சம் அல்லது ஆட்சி பெற்றால் நற்பலன் தரும். குறிப்பாக திருமணம், வாழ்க்கைத் துணை மற்றும் 35 வயதுக்குப் பிந்தைய வாழ்வின் பலன்களை நவாம்சமே துல்லியமாக உறுதி செய்கிறது.',
      aEn: 'Rasi (D1) represents the manifest tree of life, whereas Navamsa (D9) constitutes the subtle root. A planet weak in Rasi may gain immense strength in Navamsa. Navamsa specifically validates marital harmony, spouse characteristics, and post-maturity life phalas.',
    },
    {
      qTa: 'திருமணப் பொருத்தத்தில் ரஜ்ஜுப் பொருத்தம் ஏன் மிக முக்கியமாகக் கருதப்படுகிறது?',
      qEn: 'Why is Rajju Porutham considered paramount in marriage matching?',
      aTa: 'பத்து பொருத்தங்களில் ரஜ்ஜுப் பொருத்தம் என்பது மாங்கல்ய பலம் மற்றும் தம்பதியரின் தீர்க்காயுளைக் குறிப்பதாகும். பெண்ணின் நட்சத்திரமும் ஆணின் நட்சத்திரமும் ஒரே ரஜ்ஜுவாக இருந்தால் (ரஜ்ஜு தட்டுதல்) மனக்கசப்பும் மாங்கல்ய பாதிப்பும் ஏற்படும் என சாஸ்திரங்கள் எச்சரிக்கின்றன. ஆகவே வெவ்வேறு ரஜ்ஜு அமைவதே உத்தமமாகும்.',
      aEn: 'Among all 10 Poruthams, Rajju governs the marital longevity (Mangalya Bhagyam). When the bride and groom share the identical Rajju, classical texts warn of afflictions; diverse Rajjus ensure harmonious and durable matrimony.',
    },
    {
      qTa: 'செவ்வாய் தோஷம் என்றால் என்ன? எப்போது அது நிவர்த்தியாகும்?',
      qEn: 'What constitutes Kuja (Manglik) Dosha, and when is it cancelled?',
      aTa: 'லக்னம், சந்திரன் அல்லது சுக்கிரனிலிருந்து 2, 4, 7, 8, 12 ஆகிய இடங்களில் செவ்வாய் அமர்வது செவ்வாய் தோஷமாகும். ஆனால் செவ்வாய் தனது சொந்த வீட்டில் (மேஷம், விருச்சிகம்) அல்லது உச்ச வீட்டில் (மகரம்) இருந்தாலோ, குரு பகவானின் சுப பார்வை பெற்றாலோ தோஷம் நிவர்த்தியாகும் (சம தோஷ ஜாதகம் சேர்ப்பது உத்தமம்).',
      aEn: 'Placement of Mars in 2nd, 4th, 7th, 8th, or 12th from Lagna, Moon, or Venus is termed Kuja Dosha. However, when Mars occupies its own houses (Aries/Scorpio), exaltation (Capricorn), or receives the benefic aspect of Jupiter, the dosha is neutralized.',
    },
    {
      qTa: 'மாதவ் ஜோதிட நிலையத்தில் ஜாதகப் புத்தகம் அச்சிட்டு தபாலில் பெற முடியுமா?',
      qEn: 'Can I receive physical printed Jadhagam books by courier?',
      aTa: 'ஆம், எங்கள் இணையதளத்தில் நீங்கள் 1-பக்க குறிப்பு, 35 A5 Landscape / Portrait புத்தகம் அல்லது 16 A4 Portrait நூலாக உடனே அச்சிடலாம். மேலும் அசல் சுருள் பைண்டிங் செய்யப்பட்ட ஜாதக புத்தகத்தை தமிழ்நாடு மற்றும் இந்தியா முழுவதும் தபால் அல்லது கூரியர் மூலம் பெற WhatsApp (90429 24345 / 90435 15667) மூலம் தொடர்புகொள்ளலாம்.',
      aEn: 'Yes! You can instantly print the 1-page Kuripu or 35/16-page book online, or contact us directly on WhatsApp (90429 24345 / 90435 15667) to order deluxe spiral-bound printed books delivered to your doorstep.',
    },
  ];

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-amber-500/20 pb-3">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
          {isTa ? 'அடிக்கடி கேட்கப்படும் ஜோதிட விளக்கங்கள் (Astrology FAQ)' : 'Astrological FAQs & Insights'}
        </h3>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-stone-800 bg-stone-950/60 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-stone-900/80 transition-colors"
              >
                <span className="font-bold text-xs sm:text-sm text-amber-200 pr-2">
                  {isTa ? faq.qTa : faq.qEn}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-stone-800/60 bg-amber-500/5">
                  <p>{isTa ? faq.aTa : faq.aEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
