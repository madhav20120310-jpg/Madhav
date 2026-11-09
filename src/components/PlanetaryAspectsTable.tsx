import React from 'react';
import { Eye, ShieldAlert, Sparkles, Star } from 'lucide-react';
import { ComputedHoroscope, Language } from '../types/astrology';

interface PlanetaryAspectsTableProps {
  horoscope: ComputedHoroscope;
  currentLanguage: Language;
}

export const PlanetaryAspectsTable: React.FC<PlanetaryAspectsTableProps> = ({
  horoscope,
  currentLanguage,
}) => {
  const isTa = currentLanguage === 'ta';
  const { planets, lagna } = horoscope;

  const getAspects = (name: string, rasiIdx: number): string => {
    const formatSign = (idx: number) => {
      const targetIdx = (idx + 12) % 12;
      return horoscope.planets.find(p => p.rasiIndex === targetIdx)?.rasiNameTa || `${targetIdx + 1}-ம் ராசி`;
    };

    const asp7 = (rasiIdx + 6) % 12 + 1;
    if (name === 'Mars') {
      const asp4 = (rasiIdx + 3) % 12 + 1;
      const asp8 = (rasiIdx + 7) % 12 + 1;
      return isTa ? `4, 7, 8-ம் பார்வைகள் (${asp4}, ${asp7}, ${asp8}-ம் வீடுகள்)` : `4th, 7th, 8th Houses`;
    }
    if (name === 'Jupiter') {
      const asp5 = (rasiIdx + 4) % 12 + 1;
      const asp9 = (rasiIdx + 8) % 12 + 1;
      return isTa ? `5, 7, 9-ம் குரு பார்வைகள் (சுப பலன்)` : `5th, 7th, 9th (Benefic)`;
    }
    if (name === 'Saturn') {
      const asp3 = (rasiIdx + 2) % 12 + 1;
      const asp10 = (rasiIdx + 9) % 12 + 1;
      return isTa ? `3, 7, 10-ம் சனி பார்வைகள்` : `3rd, 7th, 10th Houses`;
    }
    if (name === 'Rahu' || name === 'Ketu') {
      return isTa ? `5, 7, 9-ம் சாயா பார்வைகள்` : `5th, 7th, 9th Aspects`;
    }
    return isTa ? `7-ம் நேர் பார்வை (${asp7}-ம் வீடு)` : `7th Direct Aspect`;
  };

  const getKarakam = (name: string): string => {
    switch (name) {
      case 'Sun': return isTa ? 'பித்ருகாரகன், ஆன்ம பலம், அரசு' : 'Father, Soul, Authority';
      case 'Moon': return isTa ? 'மாத்ருகாரகன், மனோபலம், தாய்' : 'Mother, Mind, Emotions';
      case 'Mars': return isTa ? 'பூமிகாரகன், தைரியம், உடன்பிறப்பு' : 'Land, Courage, Siblings';
      case 'Mercury': return isTa ? 'வித்யாகாரகன், புத்தி, வர்த்தகம்' : 'Intelligence, Trade, Speech';
      case 'Jupiter': return isTa ? 'புத்திரகாரகன், தனம், குரு அருள்' : 'Progeny, Wealth, Preceptor';
      case 'Venus': return isTa ? 'களத்திரகாரகன், வாகனம், கலை' : 'Spouse, Luxury, Arts';
      case 'Saturn': return isTa ? 'ஆயுள்காரகன், உழைப்பு, தொழில்' : 'Longevity, Labor, Career';
      case 'Rahu': return isTa ? 'போககாரகன், வெளிநாட்டு வாசம்' : 'Desires, Foreign Travel';
      case 'Ketu': return isTa ? 'ஞானகாரகன், மோட்சம், ஆன்மீகம்' : 'Spiritual Wisdom, Moksha';
      default: return '—';
    }
  };

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-amber-400" />
          <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
            {isTa ? 'நவக்கிரக காரகத்துவங்கள் & பார்வை அட்டவணை (Planetary Aspects)' : 'Planetary Karakas & Special Aspects'}
          </h3>
        </div>
        <span className="text-[11px] text-stone-400">
          {isTa ? 'கிரக பார்வை ஆய்வறிக்கை' : 'Dhrishti Analysis'}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-800">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-950 text-amber-300 border-b border-stone-800 font-semibold">
              <th className="p-2 sm:p-2.5">{isTa ? 'கிரகம்' : 'Planet'}</th>
              <th className="p-2 sm:p-2.5">{isTa ? 'அமர்ந்த ராசி' : 'Occupied Sign'}</th>
              <th className="p-2 sm:p-2.5">{isTa ? 'ஸ்தான பலம்' : 'Dignity'}</th>
              <th className="p-2 sm:p-2.5">{isTa ? 'காரகத்துவம்' : 'Karakam (Governs)'}</th>
              <th className="p-2 sm:p-2.5">{isTa ? 'கிரக பார்வைகள் (Dhrishti)' : 'Special Aspects'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/80 text-[11px]">
            {planets.map((p) => (
              <tr key={p.name} className="hover:bg-amber-500/5 transition-colors">
                <td className="p-2 sm:p-2.5 font-bold text-white flex items-center gap-1.5">
                  <span>{isTa ? p.nameTa : p.name}</span>
                  {p.isRetrograde && (
                    <span className="text-[9px] px-1 bg-red-950 text-red-300 rounded font-semibold border border-red-500/30">
                      வ
                    </span>
                  )}
                </td>
                <td className="p-2 sm:p-2.5 text-amber-200">
                  {isTa ? p.rasiNameTa : p.rasiName} ({p.degreeFormatted})
                </td>
                <td className="p-2 sm:p-2.5">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      p.avastha === 'Uchcham'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : p.avastha === 'Aatchi'
                        ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                        : p.avastha === 'Neecham'
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                        : 'text-stone-300'
                    }`}
                  >
                    {isTa ? p.avasthaTa : p.avastha}
                  </span>
                </td>
                <td className="p-2 sm:p-2.5 text-stone-300">
                  {getKarakam(p.name)}
                </td>
                <td className="p-2 sm:p-2.5 text-amber-300/90 font-mono text-[10px]">
                  {getAspects(p.name, p.rasiIndex)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
