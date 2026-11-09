import React, { useState } from 'react';
import { X, Flame, Calendar, Clock, CheckCircle2, Filter } from 'lucide-react';
import { Language, MuhurthamSlot } from '../types/astrology';
import { getUpcomingMuhurthamSlots } from '../utils/astrologyEngine';

interface MuhurthamModalProps {
  currentLanguage: Language;
  onClose: () => void;
  onBookMuhurtham: (slot: MuhurthamSlot) => void;
}

export const MuhurthamModal: React.FC<MuhurthamModalProps> = ({
  currentLanguage,
  onClose,
  onBookMuhurtham,
}) => {
  const isTa = currentLanguage === 'ta';
  const allSlots = getUpcomingMuhurthamSlots();
  const [filterPurpose, setFilterPurpose] = useState<string>('all');

  const filteredSlots = filterPurpose === 'all'
    ? allSlots
    : allSlots.filter((s) => s.purpose === filterPurpose);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 border-b border-amber-400/40 text-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">
                {isTa ? 'சுப முகூர்த்த கால அட்டவணை (Muhurtham)' : 'Auspicious Muhurtham Timings'}
              </h3>
              <p className="text-[11px] text-stone-900/80 font-medium">
                {isTa ? 'திருமணம், கிரகப்பிரவேசம், புதிய தொழில் சுப நேரங்கள்' : 'Weddings, Housewarming & Business Launch'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-900 hover:text-white rounded-lg hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <button
            onClick={() => setFilterPurpose('all')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'all' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'அனைத்தும்' : 'All'}
          </button>
          <button
            onClick={() => setFilterPurpose('Marriage')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'Marriage' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'திருமணம்' : 'Marriage'}
          </button>
          <button
            onClick={() => setFilterPurpose('Grihapravesam')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'Grihapravesam' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'கிரகப்பிரவேசம்' : 'Housewarming'}
          </button>
          <button
            onClick={() => setFilterPurpose('Business')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'Business' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'வியாபார துவக்கம்' : 'Business'}
          </button>
          <button
            onClick={() => setFilterPurpose('Naming')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'Naming' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'பெயர் சூட்டுதல்' : 'Naming'}
          </button>
          <button
            onClick={() => setFilterPurpose('Vehicle')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${
              filterPurpose === 'Vehicle' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            {isTa ? 'வாகன பூஜை' : 'Vehicle'}
          </button>
        </div>

        {/* List of Muhurtham Slots */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredSlots.map((slot, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/25 hover:border-amber-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase">
                    {isTa ? slot.purposeTa : slot.purpose}
                  </span>
                  <span className="text-xs font-bold text-amber-100 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {slot.date} ({isTa ? slot.dayNameTa : slot.dayName})
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 text-xs text-stone-300">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {slot.timeRange}
                  </span>
                  <span>·</span>
                  <span className="text-amber-200 font-semibold">{isTa ? slot.lagnaNameTa : slot.lagnaName}</span>
                  <span>·</span>
                  <span>{isTa ? slot.nakshatraTa : slot.nakshatra}</span>
                  <span>·</span>
                  <span>{isTa ? slot.tithiTa : slot.tithi}</span>
                </div>

                <p className="text-[11px] text-stone-400 leading-relaxed">
                  {isTa ? slot.notesTa : slot.notes}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <span className="text-[10px] px-2 py-1 rounded bg-amber-900/60 text-amber-300 font-semibold border border-amber-600/30">
                  {isTa ? `கௌரி: ${slot.gowriRatingTa}` : `Gowri: ${slot.gowriRating}`}
                </span>
                <button
                  onClick={() => {
                    onBookMuhurtham(slot);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded transition-colors"
                >
                  {isTa ? 'முன்பதிவு செய்' : 'Book Date'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
