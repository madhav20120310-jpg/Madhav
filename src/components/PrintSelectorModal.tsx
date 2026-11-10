import React, { useState } from 'react';
import { X, Printer, FileText, BookOpen, Layers, CheckCircle2, Download, ExternalLink, Sparkles } from 'lucide-react';
import { ComputedHoroscope, Language } from '../types/astrology';
import { generateKuripuPrintHtml, executePrintDocument, downloadPrintFile } from '../utils/printEngine';

interface PrintSelectorModalProps {
  horoscope: ComputedHoroscope;
  currentLanguage: Language;
  onClose: () => void;
  onSelectKuripu: () => void;
  onSelectJadhagam: (format: '35_a5_landscape' | '35_a5_portrait' | '16_a4_portrait') => void;
  onPrintCurrentPage: () => void;
}

export const PrintSelectorModal: React.FC<PrintSelectorModalProps> = ({
  horoscope,
  currentLanguage,
  onClose,
  onSelectKuripu,
  onSelectJadhagam,
  onPrintCurrentPage,
}) => {
  const isTa = currentLanguage === 'ta';
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);
  const [lastBlobUrl, setLastBlobUrl] = useState<string>('');

  const handleInstantPrint = () => {
    onClose();
    onSelectKuripu();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleOpenNewTab = () => {
    const html = generateKuripuPrintHtml(horoscope, currentLanguage);
    const result = executePrintDocument(html, `${horoscope.birthData.name}_Kuripu_1Page.html`, true);
    if (result.blobUrl) {
      setLastBlobUrl(result.blobUrl);
    }
    setPrintFeedback(isTa ? 'புதிய தாவலில் 1-பக்க குறிப்பு திறக்கப்பட்டது!' : '1-Page Kuripu opened in new tab!');
  };

  const handleDownloadFile = () => {
    const html = generateKuripuPrintHtml(horoscope, currentLanguage);
    downloadPrintFile(html, `${horoscope.birthData.name}_Kuripu_1Page.html`);
    setPrintFeedback(isTa ? 'அச்சு கோப்பு பதிவிறக்கம் செய்யப்பட்டது!' : 'File downloaded successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-stone-950 font-bold border-b border-amber-400">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-stone-950" />
            <h3 className="text-base sm:text-lg font-serif">
              {isTa ? 'அச்சு விருப்பங்கள் (Print Options)' : 'Astrological Printing Hub'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-900 hover:text-white rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Bar */}
        {printFeedback && (
          <div className="p-3 bg-emerald-950 border-b border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{printFeedback}</span>
            </div>
            {lastBlobUrl && (
              <a
                href={lastBlobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-amber-500 text-stone-950 rounded font-bold hover:bg-amber-400 text-[11px] flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>{isTa ? 'திறக்க' : 'Open'}</span>
              </a>
            )}
          </div>
        )}

        {/* Quick Instant Print Action Row */}
        <div className="p-3 sm:px-6 bg-stone-950/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isTa ? 'உடனடி 1-பக்க அச்சு:' : 'Instant 1-Page Action:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewTab}
              className="px-2.5 py-1.5 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              title={isTa ? 'புதிய தாவலில் தனியாகத் திறந்து அச்சிடுக' : 'Open in New Tab'}
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'புதிய தாவல்' : 'New Tab'}</span>
            </button>
            <button
              onClick={handleInstantPrint}
              className="px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isTa ? 'உடனே அச்சிடுக' : 'Print Now'}</span>
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 text-xs font-bold bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'பதிவிறக்கு' : 'Download'}</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-xs text-stone-300">
            {isTa
              ? `ஜாதகர் "${horoscope.birthData.name}" அவர்களின் ஜாதகத்தை உங்கள் தேவைக்கேற்ப அச்சிட விரும்பும் வடிவத்தைத் தேர்ந்தெடுக்கவும்:`
              : `Select your preferred print format for native "${horoscope.birthData.name}":`}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {/* 1. Kuripu - Strictly 1 Page */}
            <div
              onClick={() => {
                onClose();
                onSelectKuripu();
              }}
              className="p-4 rounded-xl bg-stone-950/80 border-2 border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-cyan-300 group-hover:text-cyan-200">
                      {isTa ? 'ஒற்றைப் பக்க ஜாதகக் குறிப்பு (Kuripu)' : 'Single Page Kuripu'}
                    </h4>
                    <span className="text-[10px] px-2 py-0.2 bg-cyan-950 text-cyan-300 rounded font-bold border border-cyan-500/30">
                      1 Page Strictly
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isTa
                      ? 'கட்டாயமாக ஒரே 1 பக்கத்தில் ராசி, நவாம்சம், கிரக நிலைகள் மற்றும் தசாபுத்தி சுருக்கம்.'
                      : 'Concise 1-page summary chart with vital planets and dasa balance.'}
                  </p>
                </div>
              </div>
              <Printer className="w-5 h-5 text-cyan-400 shrink-0" />
            </div>

            {/* 2. Jadhagam - 35 A5 Landscape */}
            <div
              onClick={() => {
                onClose();
                onSelectJadhagam('35_a5_landscape');
              }}
              className="p-4 rounded-xl bg-stone-950/80 border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-amber-300 group-hover:text-amber-200">
                      {isTa ? '35 A5 Landscape ஜாதக புத்தகம்' : '35 A5 Landscape Book'}
                    </h4>
                    <span className="text-[10px] px-2 py-0.2 bg-amber-950 text-amber-300 rounded font-bold border border-amber-500/30">
                      35 Pages
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isTa
                      ? 'அகல வடிவம் (210×148mm) - பாரம்பரிய சுருள் பைண்டிங் ஜாதக நூல்.'
                      : 'Traditional landscape booklet format for spiral binding.'}
                  </p>
                </div>
              </div>
              <Printer className="w-5 h-5 text-amber-400 shrink-0" />
            </div>

            {/* 3. Jadhagam - 35 A5 Portrait */}
            <div
              onClick={() => {
                onClose();
                onSelectJadhagam('35_a5_portrait');
              }}
              className="p-4 rounded-xl bg-stone-950/80 border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-amber-300 group-hover:text-amber-200">
                      {isTa ? '35 A5 Portrait ஜாதக புத்தகம்' : '35 A5 Portrait Book'}
                    </h4>
                    <span className="text-[10px] px-2 py-0.2 bg-amber-950 text-amber-300 rounded font-bold border border-amber-500/30">
                      35 Pages
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isTa
                      ? 'செங்குத்து வடிவம் (148×210mm) - கையேடு போன்ற அமைப்பு.'
                      : 'Vertical pocketbook edition across 35 comprehensive pages.'}
                  </p>
                </div>
              </div>
              <Printer className="w-5 h-5 text-amber-400 shrink-0" />
            </div>

            {/* 4. Jadhagam - 16 A4 Portrait */}
            <div
              onClick={() => {
                onClose();
                onSelectJadhagam('16_a4_portrait');
              }}
              className="p-4 rounded-xl bg-stone-950/80 border-2 border-emerald-500/40 hover:border-emerald-400 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-emerald-300 group-hover:text-emerald-200">
                      {isTa ? '16 A4 Portrait முழு ஜாதக நூல்' : '16 A4 Portrait Deluxe Book'}
                    </h4>
                    <span className="text-[10px] px-2 py-0.2 bg-emerald-950 text-emerald-300 rounded font-bold border border-emerald-500/30">
                      16 Pages
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isTa
                      ? 'முழு அளவிலான A4 (210×297mm) விரிவான 16 பக்க ஜாதக ஆவணம்.'
                      : 'Full-size standard A4 pages with detailed astrological sections.'}
                  </p>
                </div>
              </div>
              <Printer className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            {/* 5. Print Current Screen Analysis */}
            <div
              onClick={() => {
                onClose();
                onPrintCurrentPage();
              }}
              className="p-4 rounded-xl bg-stone-950/80 border border-stone-700 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-600 flex items-center justify-center text-stone-300 shrink-0">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-200 group-hover:text-amber-200">
                    {isTa ? 'நடப்பு திரையை அச்சிடுக (Print Current Screen)' : 'Print Current Screen'}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {isTa
                      ? 'தற்போது திரையில் தெரியும் ஜாதக கணிப்பு முடிவுகளை அச்சிட.'
                      : 'Prints active calculations and displayed tables as-is.'}
                  </p>
                </div>
              </div>
              <Printer className="w-5 h-5 text-stone-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
