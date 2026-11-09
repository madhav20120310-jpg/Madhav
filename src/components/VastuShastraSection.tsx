import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { Language } from '../types/astrology';

interface VastuShastraSectionProps {
  currentLanguage: Language;
  onOpenBooking: () => void;
}

export const VastuShastraSection: React.FC<VastuShastraSectionProps> = ({
  currentLanguage,
  onOpenBooking,
}) => {
  const isTa = currentLanguage === 'ta';
  const [selectedAdi, setSelectedAdi] = useState<number>(27);

  // Traditional Manaiyadi Shastra Feet Dimensions Table (மனையடி சாஸ்திர அளவுகள்)
  const manaiyadiRules: { [feet: number]: { status: 'Uthama' | 'Madhyama' | 'Adhama'; descTa: string; descEn: string } } = {
    16: { status: 'Uthama', descTa: 'தன லாபம், குடும்ப சுபிட்சம் மற்றும் நிம்மதி தரும் உத்தம அடி.', descEn: 'Brings wealth, family prosperity, and peace of mind.' },
    17: { status: 'Adhama', descTa: 'சத்ரு பயம், கடன் தொல்லை உண்டாகும்; தவிர்க்க வேண்டும்.', descEn: 'Causes fear of enemies and financial strain; avoid.' },
    18: { status: 'Adhama', descTa: 'குடும்பத்தில் விரயமும் அமைதியின்மையும் வரக்கூடும்.', descEn: 'Losses and unrest in family life; avoid.' },
    19: { status: 'Uthama', descTa: 'மங்கள காரியம் கை கூடும்; புத்திர பாக்கியம் அருளும் நற்பலன்.', descEn: 'Auspicious events succeed; blessed with good progeny.' },
    20: { status: 'Adhama', descTa: 'வீண் விரயம் மற்றும் வழக்குகளை உருவாக்கலாம்.', descEn: 'Unnecessary expenditure and legal disputes.' },
    21: { status: 'Uthama', descTa: 'பொருளாதார வளர்ச்சி, கல்வி மேன்மை மற்றும் தானிய விருத்தி தரும்.', descEn: 'Financial growth, academic excellence and abundant grains.' },
    22: { status: 'Adhama', descTa: 'அடிக்கடி உடல்நலக்குறைவு ஏற்பட வாய்ப்பு உண்டு.', descEn: 'Frequent minor ailments; not recommended.' },
    23: { status: 'Uthama', descTa: 'சுப நிகழ்வுகள் தடையின்றி நடக்கும்; பெரும் செல்வம் சேரும்.', descEn: 'Smooth family celebrations; steady accumulation of fortune.' },
    24: { status: 'Uthama', descTa: 'ராஜ யோகம் தரும் உன்னத அடி; ஆடை, ஆபரண சேர்க்கை உண்டு.', descEn: 'Royal fortune, jewels, and immense household honor.' },
    25: { status: 'Adhama', descTa: 'மனக்குழப்பமும் சஞ்சலமும் நிலவும்.', descEn: 'Mental anxiety and domestic turbulence.' },
    26: { status: 'Adhama', descTa: 'பொருள் விரயம் ஏற்படலாம்.', descEn: 'Loss of liquid wealth; avoid.' },
    27: { status: 'Uthama', descTa: 'குபேர சம்பத்து மற்றும் சகல சவுபாக்கியங்களும் தரும் மகா உத்தம அடி.', descEn: 'Kubera wealth and comprehensive auspiciousness (Supreme dimension).' },
    28: { status: 'Adhama', descTa: 'சகோதர ஒற்றுமை குறையலாம்.', descEn: 'Discord among kin; not recommended.' },
    29: { status: 'Uthama', descTa: 'வாகன யோகம் மற்றும் சமூக புகழ் அருளும்.', descEn: 'Comfortable conveyances and public renown.' },
    30: { status: 'Uthama', descTa: 'லட்சுமி கடாட்சம் மற்றும் வம்ச விருத்தி தரும் சிறப்பு அடி.', descEn: 'Lakshmi kataksham and fruitful lineage expansion.' },
    31: { status: 'Adhama', descTa: 'கடன் சுமை அதிகரிக்கும்; தவிர்க்க நலம்.', descEn: 'Debt load increases; to be avoided.' },
    32: { status: 'Uthama', descTa: 'அரசு அனுகிரகம் மற்றும் தொழிலில் பெரும் வெற்றி தரும்.', descEn: 'State patronage and towering business success.' },
    33: { status: 'Uthama', descTa: 'அஷ்ட ஐஸ்வர்யங்களும் இல்லத்தில் குடியேறும் உத்தம அடி.', descEn: 'Ashta Aishwaryams abide permanently in the household.' },
    36: { status: 'Uthama', descTa: 'மகா பாக்கிய யோகம் மற்றும் நீண்ட ஆயுள் தரும் அமிர்த அடி.', descEn: 'Great fortune and long healthy lifespan.' },
  };

  const currentRule = manaiyadiRules[selectedAdi] || manaiyadiRules[27];

  const vastuCorners = [
    {
      name: isTa ? 'வடகிழக்கு (ஈசானியம் - Eesanyam)' : 'North-East (Eesanyam)',
      element: isTa ? 'ஜலம் (நீர்)' : 'Water',
      rules: isTa ? 'பூஜை அறை, திறந்த வெளி, போர்வெல், குடிநீர் தொட்டி அமைக்க உகந்தது. கழிப்பறை அல்லது கனமான சுமை வைக்கக்கூடாது.' : 'Ideal for Pooja room, open space, borewell, drinking water tank. Never place toilets or heavy weights.',
      ideal: isTa ? 'பூஜை அறை / திறந்த முற்றம்' : 'Pooja / Open Porch',
    },
    {
      name: isTa ? 'தென்கிழக்கு (அக்னி மூலை - Agni)' : 'South-East (Agni)',
      element: isTa ? 'அக்னி (நெருப்பு)' : 'Fire',
      rules: isTa ? 'சமையலறை, கேஸ் அடுப்பு, மின்சார விநியோக பெட்டி அமைக்க உத்தமம். தண்ணீர் தொட்டி அல்லது பள்ளம் இருக்கக்கூடாது.' : 'Kitchen, stove, electrical main switchboard. Avoid water bodies or deep sump here.',
      ideal: isTa ? 'சமையலறை (Kitchen)' : 'Kitchen / Electricals',
    },
    {
      name: isTa ? 'தென்மேற்கு (நிருதி மூலை - Kubera/Niruthi)' : 'South-West (Niruthi)',
      element: isTa ? 'பூமி (நிலம்)' : 'Earth',
      rules: isTa ? 'குடும்பத் தலைவர் படுக்கையறை, பணப்பெட்டி (குபேர லாக்கர்), மேல்நிலை தொட்டி. இங்கு பள்ளம் அல்லது வாசல் வைக்கக்கூடாது.' : 'Master bedroom, safe/locker, overhead water tank. Highest elevation; strictly no deep excavations.',
      ideal: isTa ? 'தலைமை படுக்கையறை / பணப்பெட்டி' : 'Master Bed / Wealth Locker',
    },
    {
      name: isTa ? 'வடமேற்கு (வாயு மூலை - Vayu)' : 'North-West (Vayu)',
      element: isTa ? 'வாயு (காற்று)' : 'Air',
      rules: isTa ? 'விருந்தினர் அறை, தானியக் கிடங்கு, வாகன நிறுத்துமிடம், கழிவறை அமைக்க சிறந்தது. வீட்டின் காற்றோட்டம் சீராக இருக்க வேண்டும்.' : 'Guest room, grains storage, garage, septic tank/restroom. Facilitates continuous energetic flow.',
      ideal: isTa ? 'விருந்தினர் அறை / கிடங்கு' : 'Guest Room / Granary',
    },
  ];

  return (
    <section className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-amber-100 shadow-xl space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-amber-300 font-serif">
              {isTa ? 'மலமஞ்சனூர் மனையடி சாஸ்திரம் & வாஸ்து வழிகாட்டி' : 'Malamanjanur Manaiyadi Shastra & Vastu'}
            </h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {isTa
              ? 'ஜோதிட வாஸ்து ரத்னா மாணிக்க நாட்டார் MR அவர்களின் பாரம்பரிய வாஸ்து ஆய்வு நெறிமுறைகள்'
              : 'Ancestral Vastu guidelines from Jothida Vastu Rathna Manicka Nattar MR'}
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{isTa ? 'நேரடி வாஸ்து முன்பதிவு' : 'Book Vastu Consultation'}</span>
        </button>
      </div>

      {/* Interactive Manaiyadi Feet Calculator */}
      <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-300">
              {isTa ? 'மனையடி அளவு கணிப்பான் (Manaiyadi Dimension Checker):' : 'Manaiyadi Dimension Checker:'}
            </span>
            <p className="text-[11px] text-stone-400">
              {isTa ? 'வீட்டின் நீளம் அல்லது அகலம் (அடி) தேர்வு செய்து பலன் அறிக' : 'Select room length or building width in feet'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-300">{isTa ? 'அடி:' : 'Feet:'}</span>
            <select
              value={selectedAdi}
              onChange={(e) => setSelectedAdi(parseInt(e.target.value, 10))}
              className="bg-stone-900 border border-amber-500/40 rounded px-3 py-1.5 text-xs text-amber-200 font-bold font-mono focus:outline-hidden"
            >
              {Object.keys(manaiyadiRules).map((ft) => (
                <option key={ft} value={ft}>
                  {ft} அடி ({ft} Feet)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dimension Result Card */}
        <div className="p-3 bg-stone-900 rounded-lg border border-amber-500/30 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-amber-200 font-mono">
                {selectedAdi} அடி ({selectedAdi} Feet)
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  currentRule.status === 'Uthama'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                }`}
              >
                {currentRule.status === 'Uthama' ? (isTa ? 'உத்தம அடி (பொருந்தும்)' : 'Auspicious') : (isTa ? 'தவிர்க்க வேண்டிய அடி' : 'Inauspicious')}
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {isTa ? currentRule.descTa : currentRule.descEn}
            </p>
          </div>

          {currentRule.status === 'Uthama' ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
          )}
        </div>
      </div>

      {/* 4 Corners Energy Matrix Grid */}
      <div>
        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
          {isTa ? '— 4 மூலைகளின் வாஸ்து தத்துவங்கள் & அமைக்கும் முறைகள் —' : '— 4 Corners Vastu Matrix —'}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {vastuCorners.map((corner, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-500/20 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-200 text-xs sm:text-sm">
                  {corner.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 font-mono">
                  {corner.element}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                {corner.rules}
              </p>
              <div className="text-[10px] text-amber-400 font-semibold pt-1">
                {isTa ? 'சிறந்தது:' : 'Ideal:'} {corner.ideal}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
