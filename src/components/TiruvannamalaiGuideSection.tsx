import React from 'react';
import { MapPin, Navigation, Sparkles, Flame, ExternalLink } from 'lucide-react';
import { Language } from '../types/astrology';

interface TiruvannamalaiGuideSectionProps {
  currentLanguage: Language;
  onOpenLocation: () => void;
}

export const TiruvannamalaiGuideSection: React.FC<TiruvannamalaiGuideSectionProps> = ({
  currentLanguage,
  onOpenLocation,
}) => {
  const isTa = currentLanguage === 'ta';

  const lingams = [
    {
      name: isTa ? '1. இந்திர லிங்கம் (Indra Lingam)' : '1. Indra Lingam',
      direction: isTa ? 'கிழக்கு (East)' : 'East',
      rasi: isTa ? 'மேஷம், ரிஷபம்' : 'Mesham, Rishabham',
      benefit: isTa ? 'அரசு பதவி, செல்வாக்கு மற்றும் சமூக கௌரவம் அருளும்.' : 'Bestows leadership, administrative power, and social prestige.',
    },
    {
      name: isTa ? '2. அக்னி லிங்கம் (Agni Lingam)' : '2. Agni Lingam',
      direction: isTa ? 'தென்கிழக்கு (South-East)' : 'South-East',
      rasi: isTa ? 'சிம்மம்' : 'Simmam (Leo)',
      benefit: isTa ? 'மனோபலம், தைரியம் மற்றும் பயம் நீக்கும் அனுகிரகம் தரும்.' : 'Removes fears and bestows intense willpower and vitality.',
    },
    {
      name: isTa ? '3. எம லிங்கம் (Yama Lingam)' : '3. Yama Lingam',
      direction: isTa ? 'தெற்கு (South)' : 'South',
      rasi: isTa ? 'விருச்சிகம்' : 'Viruchigam (Scorpio)',
      benefit: isTa ? 'ஆயுள் பலம், கண்டங்கள் நீங்குதல் மற்றும் பித்ரு தோஷ நிவர்த்தி.' : 'Longevity, health rejuvenation, and liberation from Pitru doshas.',
    },
    {
      name: isTa ? '4. நிருதி லிங்கம் (Niruthi Lingam)' : '4. Niruthi Lingam',
      direction: isTa ? 'தென்மேற்கு (South-West)' : 'South-West',
      rasi: isTa ? 'துலாம்' : 'Thulaam (Libra)',
      benefit: isTa ? 'ராகு-கேது தோஷம், புத்திர தடை மற்றும் திருஷ்டி நீக்கும்.' : 'Eradicates Rahu-Ketu impediments, evil eye, and progeny delay.',
    },
    {
      name: isTa ? '5. வருண லிங்கம் (Varuna Lingam)' : '5. Varuna Lingam',
      direction: isTa ? 'மேற்கு (West)' : 'West',
      rasi: isTa ? 'மகரம், கும்பம்' : 'Makaram, Kumbam',
      benefit: isTa ? 'சனி தோஷ நிவர்த்தி மற்றும் தீராத நோய்களிலிருந்து விடுதலை.' : 'Relief from Saturn transits and chronic health troubles.',
    },
    {
      name: isTa ? '6. வாயு லிங்கம் (Vayu Lingam)' : '6. Vayu Lingam',
      direction: isTa ? 'வடமேற்கு (North-West)' : 'North-West',
      rasi: isTa ? 'கடகம்' : 'Kadagam (Cancer)',
      benefit: isTa ? 'சுவாச ஆரோக்கியம், மன அமைதி மற்றும் இதய பலம் அளிக்கும்.' : 'Respiratory wellness, emotional serenity, and peace of heart.',
    },
    {
      name: isTa ? '7. குபேர லிங்கம் (Kubera Lingam - எங்கள் நிலையம் அருகில்)' : '7. Kubera Lingam (Near Office)',
      direction: isTa ? 'வடக்கு (North)' : 'North',
      rasi: isTa ? 'தனுசு, மீனம்' : 'Dhanusu, Meenam',
      benefit: isTa ? 'மகா தன ஆகர்ஷணம், கடன் சுமை தீர்தல் மற்றும் குபேர ஐஸ்வர்யம்.' : 'Immense wealth magnet, debt freedom, and boundless Kubera prosperity.',
      highlight: true,
    },
    {
      name: isTa ? '8. ஈசான லிங்கம் (Eesanya Lingam)' : '8. Eesanya Lingam',
      direction: isTa ? 'வடகிழக்கு (North-East)' : 'North-East',
      rasi: isTa ? 'மிதுனம், கன்னி' : 'Mithunam, Kanni',
      benefit: isTa ? 'ஞானம், கல்வி வெற்றி, குரு அருள் மற்றும் மோட்ச சாதன யோகம்.' : 'Spiritual illumination, academic triumph, and divine preceptor grace.',
    },
  ];

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
              {isTa ? 'திருவண்ணாமலை அஷ்டலிங்க கிரிவல வழிகாட்டி' : 'Tiruvannamalai Ashta Lingam Spiritual Guide'}
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {isTa
              ? 'அருள்மிகு குபேர லிங்கம் அருகில் அமைந்துள்ள மாதவ் ஜோதிட நிலைய கிரிவல தோஷ பரிகார முறை'
              : 'Sacred 14-km Girivalam pilgrimage & Kubera Lingam spiritual remedies'}
          </p>
        </div>

        <button
          onClick={onOpenLocation}
          className="self-start sm:self-auto px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span>{isTa ? 'அலுவலக வழியைக் காண்க' : 'View Office Route'}</span>
        </button>
      </div>

      {/* Kubera Lingam Spotlight Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/90 via-stone-950 to-amber-950/90 border-2 border-amber-400/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-300 uppercase tracking-widest">
              {isTa ? 'அருள்மிகு குபேர லிங்க மகிமை' : 'Divine Arulmigu Kubera Lingam'}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white font-serif">
            {isTa ? 'மாதவ் ஜோதிட நிலையம் அமைந்துள்ள குபேர நகர் ஸ்தல சிறப்பு' : 'Blessed Site Near Our Tiruvannamalai Office'}
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
            {isTa
              ? 'திருவண்ணாமலை கிரிவலப் பாதையில் ஏழாவது லிங்கமான அருள்மிகு குபேர லிங்கம், செல்வத்தின் அதிபதியான குபேரனால் பிரதிஷ்டை செய்யப்பட்டது. இங்கு வணங்கி மாதவ் ஜோதிட நிலையத்தில் ஆலோசனை பெறுவது வறுமை நீங்கி தனவிருத்தி அடைய வழிவகுக்கும்.'
              : 'Located on Kubera Nagar Main Road right near the renowned Kubera Lingam, the supreme wealth-conferring sanctuary of Tiruvannamalai.'}
          </p>
        </div>

        <div className="shrink-0 text-center">
          <span className="text-[10px] text-amber-300/80 block uppercase tracking-wider">
            {isTa ? 'முகவரி அடையாளம்' : 'Landmark Address'}
          </span>
          <span className="text-xs font-bold text-white block mt-0.5">
            1833/G2, குபேர நகர் மெயின் ரோடு
          </span>
          <span className="text-[11px] text-amber-400 font-mono block">
            வேங்கிக்கால், திருவண்ணாமலை
          </span>
        </div>
      </div>

      {/* Ashta Lingams Grid */}
      <div>
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
          {isTa ? '— 8 லிங்கங்களும் தொடர்புடைய ராசிகள் & பலன்கள் —' : '— 8 Lingams & Associated Rasis —'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {lingams.map((lingam, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all ${
                lingam.highlight
                  ? 'bg-amber-950/70 border-amber-400/70 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-stone-950/70 border-stone-800 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-amber-200 text-xs">
                  {lingam.name}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-300">
                  {lingam.direction}
                </span>
              </div>
              <div className="text-[10px] text-amber-400 font-medium">
                {isTa ? 'ராசி:' : 'Rasi:'} {lingam.rasi}
              </div>
              <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                {lingam.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
