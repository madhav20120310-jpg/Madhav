import React, { useState } from 'react';
import { X, CalendarDays, Sun, Moon, Clock, ShieldAlert, Sparkles } from 'lucide-react';
import { Language } from '../types/astrology';
import { getDailyPanchangam } from '../utils/astrologyEngine';

interface PanchangamModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const PanchangamModal: React.FC<PanchangamModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const p = getDailyPanchangam(selectedDate);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 border-b border-amber-400/40 text-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">
                {isTa ? 'நித்திய பஞ்சாங்கம் (Daily Panchangam)' : 'Daily Vedic Panchangam'}
              </h3>
              <p className="text-[11px] text-stone-950/80 font-medium">
                {isTa ? 'திதி, வாரம், நட்சத்திரம், யோகம், கரணம், ஹோரை' : 'Five Limbs of Time & Auspicious Hours'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-950 hover:text-white rounded-lg hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Selector Row */}
        <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">
              {isTa ? 'தேதி தேர்வு:' : 'Select Date:'}
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-stone-900 border border-stone-700 rounded px-2.5 py-1 text-amber-100 font-mono text-xs focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="text-right text-xs text-amber-300/90 font-medium">
            <span>{p.tamilYear} · {p.tamilMonth} {p.tamilDate}</span>
          </div>
        </div>

        {/* Panchanga Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* 5 Angas Card */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 text-center">
              <span className="text-[10px] text-stone-400 uppercase block">{isTa ? 'வாரம் (கிழமை)' : 'Vaaram'}</span>
              <span className="text-sm font-extrabold text-amber-200 mt-1 block">{isTa ? p.vaaramTa : p.vaaram}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 text-center">
              <span className="text-[10px] text-stone-400 uppercase block">{isTa ? 'திதி' : 'Thithi'}</span>
              <span className="text-xs font-extrabold text-amber-200 mt-1 block truncate">{isTa ? p.tithiTa : p.tithi}</span>
              <span className="text-[9px] text-stone-500 block">{p.tithiEndTime}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 text-center">
              <span className="text-[10px] text-stone-400 uppercase block">{isTa ? 'நட்சத்திரம்' : 'Nakshatra'}</span>
              <span className="text-xs font-extrabold text-amber-200 mt-1 block truncate">{isTa ? p.nakshatraTa : p.nakshatra}</span>
              <span className="text-[9px] text-stone-500 block">{p.nakshatraEndTime}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 text-center">
              <span className="text-[10px] text-stone-400 uppercase block">{isTa ? 'யோகம்' : 'Yogam'}</span>
              <span className="text-xs font-bold text-amber-200 mt-1 block truncate">{isTa ? p.yogamTa : p.yogam}</span>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-stone-400 uppercase block">{isTa ? 'கரணம்' : 'Karanam'}</span>
              <span className="text-xs font-bold text-amber-200 mt-1 block truncate">{isTa ? p.karanamTa : p.karanam}</span>
            </div>
          </div>

          {/* Sun Times & Auspicious Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-amber-500/20 space-y-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>{isTa ? 'சூரிய உதயம் & நல்ல நேரம்:' : 'Sunrise & Auspicious Hours:'}</span>
              </span>
              <div className="space-y-1 text-stone-300">
                <div className="flex justify-between">
                  <span>{isTa ? 'சூரிய உதயம் / அஸ்தமனம்:' : 'Sunrise / Sunset:'}</span>
                  <span className="font-mono text-amber-200">{p.sunrise} / {p.sunset}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isTa ? 'நல்ல நேரம்:' : 'Nalla Neram:'}</span>
                  <span className="font-mono text-emerald-400 font-bold">{p.nallaNeram}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isTa ? 'கௌரி நல்ல நேரம்:' : 'Gowri Nalla Neram:'}</span>
                  <span className="font-mono text-emerald-400">{p.gowriNallaNeram}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isTa ? 'அபிஜித் முகூர்த்தம்:' : 'Abhijit Muhurtham:'}</span>
                  <span className="font-mono text-amber-200">{p.abhijit}</span>
                </div>
              </div>
            </div>

            {/* Inauspicious Periods (Rahu Kalam, etc.) */}
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-rose-500/20 space-y-2">
              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>{isTa ? 'ராகு காலம் & எமகண்டம் (தவிர்க்க வேண்டியவை):' : 'Inauspicious Periods:'}</span>
              </span>
              <div className="space-y-1 text-stone-300">
                <div className="flex justify-between">
                  <span>{isTa ? 'ராகு காலம்:' : 'Rahu Kalam:'}</span>
                  <span className="font-mono text-rose-400 font-bold">{p.rahuKalam}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isTa ? 'எமகண்டம்:' : 'Yamagandam:'}</span>
                  <span className="font-mono text-rose-300">{p.yamagandam}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isTa ? 'குளிகை காலம்:' : 'Gulikai:'}</span>
                  <span className="font-mono text-stone-300">{p.gulikai}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subha Horai Table */}
          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-amber-500/20">
            <span className="font-bold text-amber-300 block mb-2 text-xs">
              {isTa ? 'இன்றைய சுப ஹோரைகள் (Auspicious Horai):' : 'Today\'s Auspicious Planetary Horas:'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {p.subhaHorai.map((h, i) => (
                <div key={i} className="p-2 bg-stone-900 rounded border border-stone-800 text-center">
                  <span className="font-bold text-amber-200 block text-xs">{isTa ? h.planetTa : h.planet}</span>
                  <span className="text-[10px] font-mono text-stone-400 block mt-0.5">{h.timeRange}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
