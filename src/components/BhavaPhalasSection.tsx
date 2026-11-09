import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { ComputedHoroscope, Language } from '../types/astrology';

interface BhavaPhalasSectionProps {
  horoscope: ComputedHoroscope;
  currentLanguage: Language;
}

export const BhavaPhalasSection: React.FC<BhavaPhalasSectionProps> = ({
  horoscope,
  currentLanguage,
}) => {
  const isTa = currentLanguage === 'ta';
  const [expandedBhava, setExpandedBhava] = useState<number | null>(1);

  const { lagna, planets, rasiChart } = horoscope;

  // 12 Bhavas interpretation templates
  const bhavas = [
    {
      num: 1,
      name: isTa ? '1. லக்ன பாவம் (தனு பாவம்)' : '1. Lagna Bhava (Thanu Bhava)',
      karaka: isTa ? 'சூரியன்' : 'Sun',
      significance: isTa ? 'உடல் அமைப்பு, ஆயுள், தோற்றம், குணம், ஆரோக்கியம், சுய முயற்சி' : 'Physical constitution, vitality, persona, health & life longevity',
      phalanTa: `${lagna.rasiNameTa} லக்னத்தில் பிறந்த உங்களுக்கு நற்பண்புகள், ஆளுமைத் திறன் மற்றும் எதையும் சுயமாகச் சாதிக்கும் மனோதிடம் உண்டு. லக்னாதிபதி சுப பார்வை பெற்றுள்ளதால் நீண்ட ஆயுளும் சமூக மதிப்பும் அமையும்.`,
      phalanEn: `Born in ${lagna.rasiName} Ascendant, you possess natural leadership, strong willpower, and dignified demeanour. Vitality and personal integrity remain high.`,
    },
    {
      num: 2,
      name: isTa ? '2. தன & குடும்ப பாவம்' : '2. Dhana & Kudumba Bhava',
      karaka: isTa ? 'குரு' : 'Jupiter',
      significance: isTa ? 'பொருளாதாரம், குடும்ப வாழ்க்கை, வாக்கு வன்மை, சேமிப்பு, கண் பார்வை' : 'Wealth accumulation, family harmony, eloquent speech, liquid assets',
      phalanTa: 'இரண்டாம் வீட்டில் சுப அம்சம் நிலவுவதால் வாக்கில் இனிமையும், குடும்பத்தில் சுபிட்சமும் சேமிப்பு பலமும் நிலைக்கும். பூர்வீக சொத்து சேர்க்கை மற்றும் வர்த்தகத்தில் நிலையான லாபம் கிட்டும்.',
      phalanEn: 'Auspicious indications for financial stability, harmonious domestic life, and persuasive speech with steady wealth accumulation.',
    },
    {
      num: 3,
      name: isTa ? '3. தைரிய & சோதர பாவம் (பிராத்ரு பாவம்)' : '3. Sahaja & Brathru Bhava',
      karaka: isTa ? 'செவ்வாய்' : 'Mars',
      significance: isTa ? 'தைரியம், உடன் பிறந்தோர், குறுகிய பயணம், முயற்சி, எழுத்துத் திறன்' : 'Courage, siblings, short journeys, communication, valor',
      phalanTa: 'உடன் பிறந்தவர்களுடன் இணக்கமான உறவு நிலவும். எத்தகைய கடினமான சவால்களையும் துணிச்சலுடன் எதிர்கொள்ளும் தைரிய வீரியம் உடையவர். எழுத்து மற்றும் தகவல் தொடர்பில் தனித்திறன் உண்டு.',
      phalanEn: 'Courageous mindset with affectionate relationship with siblings. Aptitude for communications, short travel, and bold initiatives.',
    },
    {
      num: 4,
      name: isTa ? '4. மாத்ரு & சுக பாவம்' : '4. Mathru & Sukha Bhava',
      karaka: isTa ? 'சந்திரன் / புதன்' : 'Moon / Mercury',
      significance: isTa ? 'தாய், கல்வி, நிலம், வீடு, வாகனம், மன அமைதி' : 'Mother, education, real estate, vehicles, inner contentment',
      phalanTa: 'தாயின் பரிபூரண ஆசியும், உயர்கல்வி யோகமும் உண்டு. சொந்த வீடு, வசதியான பூமி மற்றும் சுப வாகன யோகம் உரிய காலத்தில் அமையும். மன அமைதி தரும் வாஸ்து அமைப்பு இல்லறத்தில் நிலைக்கும்.',
      phalanEn: 'Strong maternal blessings, academic excellence, real estate acquisition, comfortable vehicles, and deep peace of mind.',
    },
    {
      num: 5,
      name: isTa ? '5. பூர்வ புண்ணிய & புத்திர பாவம்' : '5. Poorvapunya & Putra Bhava',
      karaka: isTa ? 'குரு' : 'Jupiter',
      significance: isTa ? 'புத்திர பாக்கியம், பூர்வ ஜென்ம புண்ணியம், அறிவுக்கூர்மை, ஆன்மீகம்' : 'Progeny, past-life merits, intellect, devotion, creative talents',
      phalanTa: 'பூர்வ புண்ணிய பலத்தால் புத்தி கூர்மை, தெய்வ பக்தி மற்றும் கலை ஆர்வம் கூடும். நற்குணமும் கல்வியறிவும் கொண்ட சந்தான பாக்கியம் வாய்க்கும். இஷ்ட தெய்வ வழிபாட்டால் காரிய சித்தி உண்டு.',
      phalanEn: 'Deep intellect, karmic merits from past deeds, obedient and accomplished children, with inclination toward sacred scriptures.',
    },
    {
      num: 6,
      name: isTa ? '6. சத்ரு & ரோக பாவம்' : '6. Satru & Roga Bhava',
      karaka: isTa ? 'செவ்வாய் / சனி' : 'Mars / Saturn',
      significance: isTa ? 'எதிரிகள் வெற்றி, கடன் தீர்வு, ஆரோக்கிய சவால்கள், போட்டித் தேர்வு' : 'Victory over adversaries, debt management, immunity, competitive exams',
      phalanTa: 'போட்டித் தேர்வுகளில் வெற்றி வாய்ப்பும், சத்ரு ஜெயம் அடையும் யோகமும் உண்டு. தேவையற்ற கடன்களைத் தவிர்த்து முறையான நிதி மேலாண்மை மேற்கொண்டால் எதிர்ப்புகளை எளிதில் முறியடிக்கலாம்.',
      phalanEn: 'High resistance and capability to overcome rivals and competition. Prudent debt management ensures financial freedom.',
    },
    {
      num: 7,
      name: isTa ? '7. களத்திர பாவம் (தாம்பத்தியம்)' : '7. Kalathra Bhava (Marriage)',
      karaka: isTa ? 'சுக்கிரன்' : 'Venus',
      significance: isTa ? 'வாழ்க்கைத் துணை, திருமணம், கூட்டு தொழில், வெளிநாட்டு தொடர்பு' : 'Spouse, marital harmony, business partnerships, public relations',
      phalanTa: 'அன்பும் பண்பும் நிறைந்த வாழ்க்கைத் துணை அமைவார். இரு குடும்பத்தினரின் நல்லாசியுடன் தாம்பத்திய வாழ்க்கை அமையும். கூட்டுத் தொழிலில் நம்பிக்கை உரியவர்களுடன் செயல்படுவது மேன்மை தரும்.',
      phalanEn: 'Harmonious matrimony with a supportive and cultured life partner. Fruitful public connections and honorable partnerships.',
    },
    {
      num: 8,
      name: isTa ? '8. ஆயுள் & ரந்திர பாவம்' : '8. Ayur & Randhra Bhava',
      karaka: isTa ? 'சனி' : 'Saturn',
      significance: isTa ? 'ஆயுள் பலம், திடீர் யோகம், விபத்து தவிர்ப்பு, மறைமுக அறிவு' : 'Longevity, sudden fortunes, occult knowledge, research',
      phalanTa: 'தீர்க்காயுள் பாக்கியம் தரும் ஸ்தானம். எதிர்பாராத சொத்து அல்லது உயில் மூலமான ஆதாயம் கிட்டும். ஆன்மீக மற்றும் ஜோதிட நுட்பங்களை எளிதில் கிரகிக்கும் ஆற்றல் அமையும்.',
      phalanEn: 'Enduring lifespan with protection from major afflictions. Potential for unexpected windfalls and deep intuitive wisdom.',
    },
    {
      num: 9,
      name: isTa ? '9. பாக்கிய & தர்ம பாவம் (பித்ரு பாவம்)' : '9. Bhagya & Dharma Bhava',
      karaka: isTa ? 'குரு / சூரியன்' : 'Jupiter / Sun',
      significance: isTa ? 'தந்தை, பாக்கிய யோகம், குரு அருள், தீர்த்த யாத்திரை, தர்ம குணம்' : 'Father, divine luck, pilgrimage, dharma, preceptor guidance',
      phalanTa: 'தந்தையின் ஆதரவும், குலதெய்வ அருளும் முழுமையாக உண்டு. புண்ணிய ஸ்தல யாத்திரைகள் மேற்கொள்வீர்கள். பிறருக்கு உதவும் தர்ம சிந்தனையால் வாழ்வில் பாக்கிய யோகங்கள் பெருகும்.',
      phalanEn: 'Paternal fortune, high moral values, inclination for pilgrimage, and divine fortune bestowed by spiritual masters.',
    },
    {
      num: 10,
      name: isTa ? '10. கர்ம & ஜீவன பாவம்' : '10. Karma & Jeevana Bhava',
      karaka: isTa ? 'சூரியன் / புதன் / குரு / சனி' : 'Sun / Mercury / Jupiter / Saturn',
      significance: isTa ? 'தொழில், உத்தியோகம், சமூக அந்தஸ்து, புகழ், அரசு தொடர்பு' : 'Career, profession, social authority, fame, achievements',
      phalanTa: 'உழைப்புக்கு ஏற்ற உயர்ந்த சமூக அந்தஸ்து மற்றும் உத்தியோக உயர்வு உண்டு. வர்த்தகம் அல்லது நிர்வாகப் பொறுப்புகளில் தலைமை வகிக்கும் தலைமைப் பண்பு வாய்க்கும்.',
      phalanEn: 'Flourishing professional trajectory, authority in chosen vocation, recognition from superiors, and respectable social status.',
    },
    {
      num: 11,
      name: isTa ? '11. லாப பாவம்' : '11. Labha Bhava',
      karaka: isTa ? 'குரு' : 'Jupiter',
      significance: isTa ? 'லாபம், விருப்பங்கள் நிறைவேறுதல், மூத்த சகோதரர், நட்பு வட்டம்' : 'Gains, fulfillment of ambitions, elder siblings, influential circle',
      phalanTa: 'செய்யும் தொழிலில் பல வழிகளிலும் வருமானம் பெருகும் சுப லாப ஸ்தானம். எடுத்த சுப காரியங்கள் யாவும் நிறைவேறுதல் உண்டு. செல்வாக்கு மிக்க நண்பர்களின் ஒத்துழைப்பு கிட்டும்.',
      phalanEn: 'Multiple streams of income, fulfillment of core desires, supportive elderly associates, and expanding prosperity.',
    },
    {
      num: 12,
      name: isTa ? '12. விரய & மோட்ச பாவம்' : '12. Vraya & Moksha Bhava',
      karaka: isTa ? 'சனி / கேது' : 'Saturn / Ketu',
      significance: isTa ? 'சுப விரயம், தூக்கம், வெளிநாட்டு வாசம், தான தர்மம், மோட்சம்' : 'Auspicious expenditures, restful sleep, distant travel, spiritual liberation',
      phalanTa: 'வீடு வாங்குதல், திருமணம், ஆன்மீக திருப்பணிகள் போன்ற சுப விரயங்களே நிகழும். தூர தேச அல்லது வெளிநாட்டு பயண யோகம் உண்டு. தர்ம காரியங்களில் மனம் ஈடுபடும்.',
      phalanEn: 'Expenditures directed toward auspicious causes like real estate and charity. Opportunities for spiritual transcendence and overseas travels.',
    },
  ];

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
            {isTa ? '12 பாவங்களின் முழுமையான பலன் ஆய்வு (Detailed 12 Bhavas)' : 'Comprehensive 12 Bhava Life Phalas'}
          </h3>
        </div>
        <span className="text-[11px] text-stone-400 hidden sm:block">
          {isTa ? `${lagna.rasiNameTa} லக்ன அடிப்படையிலான ஆய்வு` : `Based on ${lagna.rasiName} Ascendant`}
        </span>
      </div>

      <p className="text-xs text-stone-300 leading-relaxed">
        {isTa
          ? 'ஜாதகரின் லக்னத்தை முதலாவது இடமாகக் கொண்டு மனித வாழ்வின் 12 அங்கங்களும் (உடல், செல்வம், சோதரம், சுகம், புத்திரம், ரோகம், களத்திரம், ஆயுள், பாக்கியம், தொழில், லாபம், விரயம்) விரிவாக இங்கு கணிக்கப்பட்டுள்ளது.'
          : 'Detailed predictive analysis for all 12 houses of life from the natal ascendant.'}
      </p>

      {/* 12 Bhavas Accordion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {bhavas.map((bhava) => {
          const isOpen = expandedBhava === bhava.num;
          return (
            <div
              key={bhava.num}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-stone-950 border-amber-400/60 shadow-md ring-1 ring-amber-400/20'
                  : 'bg-stone-950/60 border-stone-800 hover:border-amber-500/30'
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedBhava(isOpen ? null : bhava.num)}
                className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-200">
                    {bhava.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 block mt-0.5 truncate max-w-[280px] sm:max-w-xs">
                    {bhava.significance}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-950 text-amber-300 rounded font-mono">
                    {isTa ? `காரகர்: ${bhava.karaka}` : `Lord: ${bhava.karaka}`}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-stone-300 border-t border-amber-500/15 leading-relaxed bg-amber-500/5">
                  <p className="text-stone-200 font-medium">
                    {isTa ? bhava.phalanTa : bhava.phalanEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
