import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle2, AlertTriangle, XCircle, Printer } from 'lucide-react';
import { Language } from '../types/astrology';
import { NAKSHATRAS, calculateTenPoruthams } from '../utils/astrologyEngine';

interface CompatibilityModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const CompatibilityModal: React.FC<CompatibilityModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';

  const [boyNakIdx, setBoyNakIdx] = useState(3); // Rohini
  const [boyPada, setBoyPada] = useState(2);
  const [girlNakIdx, setGirlNakIdx] = useState(1); // Bharani
  const [girlPada, setGirlPada] = useState(1);

  const result = calculateTenPoruthams(boyNakIdx, boyPada, girlNakIdx, girlPada);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:bg-white print:text-stone-900 print:rounded-none">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-900 border-b border-emerald-500/30 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-serif">
                {isTa ? 'திருமணப் பொருத்தம் (10 Poruthams Matching)' : 'Marriage Compatibility Matching'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {isTa ? 'பாரம்பரிய தசவித பொருத்தங்கள் & தோஷ சமநிலை கணிப்பு' : 'Traditional Vedic 10-Porutham Analysis'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{isTa ? 'அச்சிடுக' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Selector Row - Hidden in print */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs print:hidden">
          {/* Boy details */}
          <div className="p-3 bg-stone-900/90 rounded-xl border border-sky-500/30 space-y-2">
            <span className="font-bold text-sky-300 block text-sm">
              {isTa ? 'மணமகன் (Boy) விவரம்:' : 'Groom Details:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-[10px] text-stone-400 block mb-0.5">{isTa ? 'நட்சத்திரம்' : 'Nakshatra'}</label>
                <select
                  value={boyNakIdx}
                  onChange={(e) => setBoyNakIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 text-amber-100"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.index} value={n.index}>
                      {isTa ? n.nameTa : n.name} ({n.lordTa})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-stone-400 block mb-0.5">{isTa ? 'பாதம்' : 'Pada'}</label>
                <select
                  value={boyPada}
                  onChange={(e) => setBoyPada(parseInt(e.target.value, 10))}
                  className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 text-amber-100"
                >
                  {[1, 2, 3, 4].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-[11px] text-stone-300">
              {isTa ? 'கணிக்கப்பட்ட ராசி:' : 'Derived Rasi:'}{' '}
              <b className="text-amber-300">{isTa ? result.boy.rasiTa : result.boy.rasi}</b>
            </div>
          </div>

          {/* Girl details */}
          <div className="p-3 bg-stone-900/90 rounded-xl border border-rose-500/30 space-y-2">
            <span className="font-bold text-rose-300 block text-sm">
              {isTa ? 'மணமகள் (Girl) விவரம்:' : 'Bride Details:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-[10px] text-stone-400 block mb-0.5">{isTa ? 'நட்சத்திரம்' : 'Nakshatra'}</label>
                <select
                  value={girlNakIdx}
                  onChange={(e) => setGirlNakIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 text-amber-100"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.index} value={n.index}>
                      {isTa ? n.nameTa : n.name} ({n.lordTa})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] text-stone-400 block mb-0.5">{isTa ? 'பாதம்' : 'Pada'}</label>
                <select
                  value={girlPada}
                  onChange={(e) => setGirlPada(parseInt(e.target.value, 10))}
                  className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 text-amber-100"
                >
                  {[1, 2, 3, 4].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-[11px] text-stone-300">
              {isTa ? 'கணிக்கப்பட்ட ராசி:' : 'Derived Rasi:'}{' '}
              <b className="text-amber-300">{isTa ? result.girl.rasiTa : result.girl.rasi}</b>
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 print:p-4">
          {/* Print Header */}
          <div className="hidden print:block text-center border-b border-amber-900/40 pb-2 mb-4">
            <h2 className="text-xl font-bold font-serif text-amber-950">மாதவ் ஜோதிட நிலையம்</h2>
            <p className="text-xs text-stone-600">திருமணப் பொருத்தம் ஆய்வு அறிக்கை · திருவண்ணாமலை</p>
          </div>

          {/* Verdict Score Ribbon */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4 print:bg-amber-50 print:border-amber-300 print:text-stone-900">
            <div>
              <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest block">
                {isTa ? 'பொருத்த முடிவு (Verdict)' : 'Overall Verdict'}
              </span>
              <div className="text-xl sm:text-2xl font-black text-amber-200 font-serif print:text-amber-950">
                {isTa ? result.verdictTa : result.verdict}
              </div>
              <p className="text-xs text-stone-300 mt-0.5 print:text-stone-700">
                {result.rajjuPoruthamStatus
                  ? isTa
                    ? 'ரஜ்ஜு பொருத்தம் உத்தமமாக பொருந்துகிறது.'
                    : 'Rajju match is completely harmonious.'
                  : isTa
                  ? 'ரஜ்ஜு தட்டுகிறது - சிறப்பு ஜோதிட ஆலோசனை தேவை.'
                  : 'Same Rajju detected; consultation required.'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 block">{isTa ? 'மொத்த மதிப்பெண்' : 'Score'}</span>
              <div className="text-3xl font-black text-amber-400 font-mono print:text-amber-800">
                {result.totalScore} <span className="text-lg text-stone-400 font-normal">/ 10</span>
              </div>
            </div>
          </div>

          {/* 10 Poruthams Detailed Table */}
          <div className="rounded-xl border border-amber-500/20 overflow-hidden bg-stone-950/50 print:bg-white print:border-amber-900/30">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-950/60 text-amber-200 border-b border-amber-500/20 font-semibold print:bg-amber-100 print:text-stone-900">
                  <th className="p-2 sm:p-2.5">#</th>
                  <th className="p-2 sm:p-2.5">{isTa ? 'பொருத்தம்' : 'Porutham'}</th>
                  <th className="p-2 sm:p-2.5">{isTa ? 'நிலை' : 'Status'}</th>
                  <th className="p-2 sm:p-2.5">{isTa ? 'மதிப்பெண்' : 'Score'}</th>
                  <th className="p-2 sm:p-2.5">{isTa ? 'விளக்கம்' : 'Astrological Significance'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 print:divide-amber-100 text-[11px]">
                {result.poruthams.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-amber-500/5 transition-colors ${
                      item.isCrucial ? 'bg-amber-950/20 print:bg-amber-50/50 font-medium' : ''
                    }`}
                  >
                    <td className="p-2 sm:p-2.5 text-stone-400">{idx + 1}</td>
                    <td className="p-2 sm:p-2.5 font-bold text-amber-200 print:text-stone-900">
                      {isTa ? item.nameTa : item.name}
                      {item.isCrucial && (
                        <span className="ml-1.5 text-[9px] px-1 py-0.2 rounded bg-rose-900/80 text-rose-200 font-semibold">
                          {isTa ? 'முக்கியம்' : 'Vital'}
                        </span>
                      )}
                    </td>
                    <td className="p-2 sm:p-2.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold ${
                          item.score === 1
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 print:bg-emerald-100 print:text-emerald-800'
                            : item.score === 0.5
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40 print:bg-amber-100 print:text-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-500/40 print:bg-rose-100 print:text-rose-800'
                        }`}
                      >
                        {item.score === 1 ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : item.score === 0.5 ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        <span>{isTa ? item.statusTa : item.status}</span>
                      </span>
                    </td>
                    <td className="p-2 sm:p-2.5 font-mono font-bold text-amber-300 print:text-stone-900">
                      {item.score}
                    </td>
                    <td className="p-2 sm:p-2.5 text-stone-300 print:text-stone-700 leading-relaxed">
                      {isTa ? item.explanationTa : item.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kuja Dosha Samyam Notes */}
          <div className="p-3 bg-stone-950 rounded-xl border border-amber-500/20 text-xs print:bg-amber-50 print:border-amber-200">
            <span className="font-bold text-amber-300 block mb-1 print:text-amber-950">
              {isTa ? 'செவ்வாய் தோஷ சமநிலை (Kuja Dosha Samyam):' : 'Kuja Dosha Balance:'}
            </span>
            <p className="text-stone-300 print:text-stone-800 leading-relaxed">
              {isTa ? result.kujaDoshaCheck.notesTa : result.kujaDoshaCheck.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
