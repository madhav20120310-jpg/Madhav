import React, { useState } from 'react';
import { Printer, X, Sparkles, CheckCircle, ArrowDown, Download, ExternalLink } from 'lucide-react';
import { ComputedHoroscope, Language } from '../types/astrology';
import { SouthIndianChart } from './SouthIndianChart';
import { generateKuripuPrintHtml, executePrintDocument, downloadPrintFile } from '../utils/printEngine';

interface KuripuModalProps {
  horoscope: ComputedHoroscope;
  currentLanguage: Language;
  onClose: () => void;
}

export const KuripuModal: React.FC<KuripuModalProps> = ({
  horoscope,
  currentLanguage,
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';
  const { birthData, lagna, planets, rasiChart, navamsaChart, thithi, nakshatra, dasaBalance, currentDasaBukthi, luckyFactors } = horoscope;
  const [printStatus, setPrintStatus] = useState<string | null>(null);
  const [lastBlobUrl, setLastBlobUrl] = useState<string>('');

  const handlePrint = () => {
    window.print();
    setPrintStatus(isTa ? '1-பக்க அச்சு சாளரம் திறக்கப்பட்டது!' : '1-Page print dialog triggered!');
  };

  const handleOpenInNewTab = () => {
    const html = generateKuripuPrintHtml(horoscope, currentLanguage);
    const result = executePrintDocument(html, `${birthData.name}_Kuripu_1Page.html`, true);
    if (result.blobUrl) {
      setLastBlobUrl(result.blobUrl);
    }
    setPrintStatus(isTa ? 'புதிய தாவலில் 1-பக்க குறிப்பு திறக்கப்பட்டது!' : '1-Page Kuripu opened in new tab!');
  };

  const handleDownload = () => {
    const html = generateKuripuPrintHtml(horoscope, currentLanguage);
    downloadPrintFile(html, `${birthData.name}_Kuripu_1Page.html`);
    setPrintStatus(isTa ? 'அச்சு கோப்பு (.html) பதிவிறக்கம் செய்யப்பட்டது!' : 'Print file downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-4 md:py-6 print:p-0 print:m-0 print:bg-white print:static print:overflow-visible">
      {/* Floating Quick Print Button for effortless access anywhere on screen */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden flex flex-col items-end gap-2">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2.5 px-5 py-3 text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 rounded-full shadow-2xl border-2 border-stone-950/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title={isTa ? '1 பக்கத்தில் உடனே அச்சிடுக' : 'Print 1 Page Strictly'}
        >
          <Printer className="w-5 h-5 text-stone-950 group-hover:animate-bounce" />
          <span className="font-extrabold tracking-wide">
            {isTa ? 'அச்சிடுக (Strictly 1 Page)' : 'Print (Strictly 1 Page)'}
          </span>
        </button>
      </div>

      {/* Main Modal Card */}
      <div className="kuripu-modal-wrapper relative w-full max-w-[860px] bg-white text-stone-900 rounded-2xl shadow-2xl overflow-visible my-2 sm:my-4 print:shadow-none print:w-full print:max-w-none print:rounded-none print:my-0">
        {/* Strictly 1-Page Print Styles */}
        <style>{`
          @media print {
            @page {
              size: A4 portrait !important;
              margin: 8mm 10mm 8mm 10mm !important;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #1c1917 !important;
              overflow: hidden !important;
              height: 100% !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .kuripu-modal-wrapper {
              position: static !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
              background: #ffffff !important;
            }
            .kuripu-print-page {
              width: 100% !important;
              max-width: 188mm !important;
              min-height: 270mm !important;
              height: 270mm !important;
              max-height: 270mm !important;
              margin: 0 auto !important;
              padding: 4mm 5mm !important;
              page-break-after: avoid !important;
              page-break-before: avoid !important;
              page-break-inside: avoid !important;
              break-after: avoid !important;
              break-inside: avoid !important;
              overflow: hidden !important;
              box-sizing: border-box !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
            }
            .kuripu-frame {
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              box-sizing: border-box !important;
            }
          }
        `}</style>

        {/* Sticky Modal Top Bar - Stays on screen while scrolling */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-stone-900 text-amber-200 border-b border-amber-500/40 rounded-t-2xl shadow-md print:hidden">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-serif">
              {isTa ? 'ஒற்றைப் பக்க ஜாதகக் குறிப்பு' : 'Single Page Horoscope Summary'}
            </span>
            <span className="text-[10px] sm:text-xs bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-400/50 font-bold tracking-wide">
              {isTa ? 'கட்டாயமாக 1 பக்கம்' : 'Strictly 1 Page'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in New Tab Button */}
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
              title={isTa ? 'புதிய தாவலில் தனியாகத் திறந்து அச்சிடுக' : 'Open in New Tab'}
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isTa ? 'புதிய தாவல்' : 'New Tab'}</span>
            </button>

            {/* Download Printable HTML Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
              title={isTa ? 'அச்சு கோப்பைப் பதிவிறக்குக (.html)' : 'Download Print HTML File'}
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isTa ? 'பதிவிறக்கு' : 'Download'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isTa ? 'அச்சிடுக' : 'Print'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              title={isTa ? 'மூடுக' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Feedback & Fallback Notice Banner */}
        {printStatus && (
          <div className="p-3 bg-emerald-950/90 text-emerald-100 border-b border-emerald-500/40 flex flex-wrap items-center justify-between gap-2 text-xs font-medium print:hidden">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{printStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              {lastBlobUrl && (
                <a
                  href={lastBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-stone-950 rounded font-bold hover:bg-amber-400 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isTa ? 'புதிய தாவலில் திறக்க' : 'Open in New Tab'}</span>
                </a>
              )}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded font-bold border border-amber-500/30 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isTa ? 'கோப்பாகப் பதிவிறக்கு' : 'Download File'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Scroll Helper Notice (Desktop & Mobile) */}
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-[11px] text-amber-900 font-medium print:hidden">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isTa
                ? 'கீழே உருட்டி விவரங்களைச் சரிபார்க்கவும். அச்சு எடுக்கும் போது தானாக ஒரே 1 பக்கத்தில் அமையும்.'
                : 'Scroll below to review details. When printing, it automatically fits strictly onto 1 page.'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-stone-500 text-[10px]">
            <ArrowDown className="w-3 h-3 text-amber-700 animate-pulse" />
            <span>{isTa ? 'கீழே உருட்டவும்' : 'Scroll down'}</span>
          </div>
        </div>

        {/* PRINTABLE SINGLE PAGE CONTAINER */}
        <div className="kuripu-print-page p-3 sm:p-5 bg-amber-50/15 text-stone-900 text-xs font-sans print:p-0 print:text-[10px] print:bg-white print:leading-tight">
          {/* Traditional Border Frame */}
          <div className="kuripu-frame border-2 border-amber-900/60 p-3 sm:p-4 rounded-xl bg-white relative flex flex-col justify-between h-full">
            {/* Header / Lineage Seal */}
            <div className="text-center pb-2 border-b-2 border-amber-800/40 relative">
              <div className="text-[10px] font-bold text-amber-900 tracking-widest uppercase">
                {isTa ? '॥ ஸ்ரீ முத்தாலம்மன் துணை ॥' : '॥ Sri Muthalamman Thunai ॥'}
              </div>

              <div className="flex items-center justify-center gap-3 my-1">
                <img
                  src="/assets/aistudio/image_363aba76.png"
                  alt="Madhav Jodhida Nilayam Logo"
                  className="w-12 h-12 rounded-full border border-amber-600 object-cover print:w-10 print:h-10"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-amber-950 font-serif tracking-tight">
                    {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
                  </h1>
                  <p className="text-[11px] font-bold text-amber-900">
                    {isTa
                      ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் · மனையடி சாஸ்திரம் (வாஸ்து)'
                      : 'Malamanjanur Hereditary Astrologer · Vastu Shastra'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 text-[10px] text-stone-700 mt-1 font-medium">
                <span>செல்: 90429 24345, 90435 15667</span>
                <span>·</span>
                <span>எண். 1833/G2, குபேர நகர், திருவண்ணாமலை 606 604</span>
              </div>
            </div>

            {/* Native Info Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-b border-amber-800/20 bg-amber-50/60 rounded px-2 mt-2">
              <div>
                <span className="text-[10px] text-stone-500 block">{isTa ? 'பெயர்:' : 'Name:'}</span>
                <span className="font-extrabold text-stone-900 text-xs sm:text-sm">{birthData.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">{isTa ? 'பிறந்த தேதி & நேரம்:' : 'DOB & Time:'}</span>
                <span className="font-bold text-stone-900 font-mono text-[11px]">{birthData.dob} · {birthData.tob}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">{isTa ? 'பிறந்த ஊர்:' : 'Birth Place:'}</span>
                <span className="font-bold text-stone-900">{birthData.pob}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">{isTa ? 'பெற்றோர்:' : 'Parents:'}</span>
                <span className="font-bold text-stone-900 truncate block">
                  {birthData.fatherName || '—'} / {birthData.motherName || '—'}
                </span>
              </div>
            </div>

            {/* Panchangam Vitals Row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 py-1.5 text-center border-b border-amber-800/20 text-[10px] bg-stone-50 mt-1">
              <div>
                <span className="text-stone-500 block">{isTa ? 'லக்னம்' : 'Lagna'}</span>
                <span className="font-bold text-rose-900 text-xs">{isTa ? lagna.rasiNameTa : lagna.rasiName}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isTa ? 'ராசி' : 'Rasi'}</span>
                <span className="font-bold text-stone-900 text-xs">
                  {isTa ? horoscope.planets.find(p => p.name === 'Moon')?.rasiNameTa : horoscope.planets.find(p => p.name === 'Moon')?.rasiName}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">{isTa ? 'நட்சத்திரம்' : 'Nakshatra'}</span>
                <span className="font-bold text-stone-900 text-xs">{isTa ? `${nakshatra.nameTa} (${nakshatra.pada})` : `${nakshatra.name} (${nakshatra.pada})`}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isTa ? 'திதி' : 'Thithi'}</span>
                <span className="font-bold text-stone-900 text-xs truncate block">{isTa ? thithi.nameTa : thithi.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isTa ? 'யோகம்' : 'Yoga'}</span>
                <span className="font-bold text-stone-900 text-xs truncate block">{horoscope.yogam.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isTa ? 'கரணம்' : 'Karana'}</span>
                <span className="font-bold text-stone-900 text-xs truncate block">{horoscope.karanam.name}</span>
              </div>
            </div>

            {/* Side-by-Side South Indian Charts */}
            <div className="grid grid-cols-2 gap-3 my-2 items-center">
              <div>
                <div className="text-center font-bold text-xs text-amber-950 mb-1">
                  {isTa ? 'ராசி சக்கரம் (Rasi)' : 'Rasi Chart (D1)'}
                </div>
                <SouthIndianChart
                  title="ராசி"
                  planetsByRasi={rasiChart}
                  size="medium"
                />
              </div>

              <div>
                <div className="text-center font-bold text-xs text-amber-950 mb-1">
                  {isTa ? 'நவாம்ச சக்கரம் (Navamsa)' : 'Navamsa Chart (D9)'}
                </div>
                <SouthIndianChart
                  title="நவாம்சம்"
                  planetsByRasi={navamsaChart}
                  size="medium"
                />
              </div>
            </div>

            {/* Planetary Table & Dasa Balance 2-Column Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-amber-800/20">
              {/* Planetary Longitude Table */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="font-bold text-[11px] text-amber-950 mb-1">
                    {isTa ? 'கிரக நிலைகள் (Nirayana Longitudes)' : 'Planetary Positions'}
                  </div>
                  <table className="w-full text-left text-[10px] border border-amber-800/30">
                    <thead className="bg-amber-100/70 font-semibold text-amber-950">
                      <tr>
                        <th className="p-0.5 px-1">{isTa ? 'கிரகம்' : 'Planet'}</th>
                        <th className="p-0.5 px-1">{isTa ? 'ராசி' : 'Rasi'}</th>
                        <th className="p-0.5 px-1">{isTa ? 'பாகை' : 'Deg'}</th>
                        <th className="p-0.5 px-1">{isTa ? 'நட்சத்திரம்' : 'Star'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      <tr className="bg-amber-50 font-bold text-rose-950">
                        <td className="p-0.5 px-1">{isTa ? 'லக்னம்' : 'Lagna'}</td>
                        <td className="p-0.5 px-1">{isTa ? lagna.rasiNameTa : lagna.rasiName}</td>
                        <td className="p-0.5 px-1 font-mono">{lagna.degreeFormatted}</td>
                        <td className="p-0.5 px-1">{isTa ? `${lagna.nakshatraNameTa}-${lagna.pada}` : `${lagna.nakshatraName}-${lagna.pada}`}</td>
                      </tr>
                      {planets.map((p) => (
                        <tr key={p.name}>
                          <td className="p-0.5 px-1 font-medium">{isTa ? p.nameTa : p.name}</td>
                          <td className="p-0.5 px-1">{isTa ? p.rasiNameTa : p.rasiName}</td>
                          <td className="p-0.5 px-1 font-mono">{p.degreeFormatted}</td>
                          <td className="p-0.5 px-1">{isTa ? `${p.nakshatraNameTa}-${p.pada}` : `${p.nakshatraName}-${p.pada}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50/80 border border-amber-300/80 rounded p-2 text-[9px] text-amber-950 mt-2">
                  <span className="font-bold block text-amber-900">{isTa ? 'மாதவ் வழிகாட்டுதல்:' : 'Guidance:'}</span>
                  <p className="leading-snug mt-0.5">
                    {isTa
                      ? 'லக்னாதிபதி பலம் பெற்று சுப யோகங்கள் அமைந்துள்ளதால் சகல நன்மைகளும் கூடும். குலதெய்வ வழிபாடு மற்றும் திருவண்ணாமலை கிரிவல தரிசனம் சகல தோஷ நிவர்த்தி தரும்.'
                      : 'Strong planetary alignments indicate domestic harmony and prosperity.'}
                  </p>
                </div>
              </div>

              {/* Dasa Balance & Quick Prediction Highlights */}
              <div className="flex flex-col justify-between space-y-1.5">
                <div className="bg-amber-50 p-2 rounded border border-amber-300/80">
                  <span className="font-bold text-amber-950 text-[11px] block">
                    {isTa ? 'பிறந்த இருப்பு தசாபுத்தி:' : 'Janma Dasa Balance:'}
                  </span>
                  <p className="text-[10px] text-stone-800 font-semibold mt-0.5">
                    {isTa
                      ? `${dasaBalance.lordTa} மகா தசை: ${dasaBalance.years} வருடங்கள், ${dasaBalance.months} மாதங்கள், ${dasaBalance.days} நாட்கள்.`
                      : `${dasaBalance.lord} Dasa: ${dasaBalance.years}y ${dasaBalance.months}m ${dasaBalance.days}d.`}
                  </p>
                  <p className="text-[10px] text-rose-900 font-bold mt-1">
                    {isTa ? 'நடப்பு தசாபுத்தி:' : 'Current Bukthi:'}{' '}
                    {isTa ? `${currentDasaBukthi.dasaLordTa} - ${currentDasaBukthi.bukthiLordTa}` : `${currentDasaBukthi.dasaLord} - ${currentDasaBukthi.bukthiLord}`}{' '}
                    ({currentDasaBukthi.endDate} வரை)
                  </p>
                </div>

                {/* Lucky Summary */}
                <div className="bg-white p-2 rounded border border-amber-200 text-[10px]">
                  <span className="font-bold text-amber-950 block">{isTa ? 'சுப யோகக் குறிப்புகள்:' : 'Auspicious Factors:'}</span>
                  <div className="grid grid-cols-2 gap-1 mt-0.5 text-stone-800">
                    <div>{isTa ? 'ரத்தினம்:' : 'Gem:'} <b>{isTa ? luckyFactors.gemstoneTa : luckyFactors.gemstone}</b></div>
                    <div>{isTa ? 'நிறம்:' : 'Color:'} <b>{isTa ? luckyFactors.colorTa : luckyFactors.color}</b></div>
                    <div>{isTa ? 'எண்:' : 'Num:'} <b>{luckyFactors.number}</b></div>
                    <div>{isTa ? 'திசை:' : 'Dir:'} <b>{isTa ? luckyFactors.directionTa : luckyFactors.direction}</b></div>
                  </div>
                  <div className="mt-1 text-amber-900 font-bold truncate">
                    {isTa ? 'தெய்வம்:' : 'Deity:'} {isTa ? luckyFactors.deityTa : luckyFactors.deity}
                  </div>
                </div>

                {/* Astrologer Signature & Seal Box */}
                <div className="border border-dashed border-amber-800/40 p-2 rounded text-center flex items-center justify-between">
                  <div className="text-left text-[9px] text-stone-600">
                    <span className="font-bold text-stone-800">மாதவ் ஜோதிட நிலையம்</span>
                    <br />
                    <span>மலமஞ்சனூர் பரம்பரை · திருவண்ணாமலை</span>
                  </div>
                  <div className="border border-dashed border-amber-800 rounded-full w-9 h-9 flex items-center justify-center text-[7px] font-bold text-amber-900">
                    முத்திரை
                  </div>
                  <div className="text-center">
                    <div className="h-5 flex items-end justify-center font-serif italic text-amber-950 font-bold text-xs">
                      ராமச்சந்திரன் MA
                    </div>
                    <span className="text-[9px] text-stone-700 block border-t border-stone-400 pt-0.5 px-2">
                      {isTa ? 'ஜோதிட வல்லுநர்' : 'Astrologer'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar inside modal for quick printing after scrolling to end */}
        <div className="p-4 bg-stone-900 border-t border-amber-500/30 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-amber-200/80 text-center sm:text-left">
            <span>{isTa ? 'குறிப்பு: அச்சிடும் போது Browser அமைப்பில் Margin ஐ "Minimum" அல்லது "None" எனத் தேர்வு செய்யவும்.' : 'Tip: Set Margins to "Minimum" or "None" in the print dialog for best fit.'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenInNewTab}
              className="px-3.5 py-2 text-xs font-semibold text-amber-300 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'புதிய தாவல் (New Tab)' : 'New Tab'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs font-semibold text-amber-200 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'கோப்பாகப் பதிவிறக்கு (.html)' : 'Download File'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              {isTa ? 'மூடுக' : 'Close'}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg shadow transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isTa ? 'அச்சிடுக (Strictly 1 Page)' : 'Print (Strictly 1 Page)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
