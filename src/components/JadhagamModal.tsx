import React, { useState } from 'react';
import {
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Maximize2,
  FileSpreadsheet,
  FileCheck,
  Award,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { ComputedHoroscope, Language } from '../types/astrology';
import { SouthIndianChart } from './SouthIndianChart';
import { generateJadhagamBookPrintHtml, executePrintDocument, downloadPrintFile } from '../utils/printEngine';

export type JadhagamFormat = '35_a5_landscape' | '35_a5_portrait' | '16_a4_portrait';

interface JadhagamModalProps {
  horoscope: ComputedHoroscope;
  currentLanguage: Language;
  initialFormat?: JadhagamFormat;
  onClose: () => void;
}

export const JadhagamModal: React.FC<JadhagamModalProps> = ({
  horoscope,
  currentLanguage,
  initialFormat = '35_a5_landscape',
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';
  const [selectedFormat, setSelectedFormat] = useState<JadhagamFormat>(initialFormat);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [printNotice, setPrintNotice] = useState<string | null>(null);
  const [lastBlobUrl, setLastBlobUrl] = useState<string>('');

  const { birthData, lagna, planets, rasiChart, navamsaChart, thithi, vaaram, nakshatra, yogam, karanam, dasaBalance, dasaTimeline, currentDasaBukthi, doshas, luckyFactors } = horoscope;

  const totalPages = selectedFormat === '16_a4_portrait' ? 16 : 35;
  const isLandscape = selectedFormat === '35_a5_landscape';
  const isA4 = selectedFormat === '16_a4_portrait';

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePrint = () => {
    window.print();
    setPrintNotice(
      isTa
        ? 'அச்சு சாளரம் திறக்கப்பட்டது!'
        : 'Print dialog opened!'
    );
  };

  const handleOpenInNewTab = () => {
    const html = generateJadhagamBookPrintHtml(horoscope, currentLanguage, selectedFormat);
    const result = executePrintDocument(html, `${birthData.name}_Jadhagam_${selectedFormat}.html`, true);
    if (result.blobUrl) {
      setLastBlobUrl(result.blobUrl);
    }
    setPrintNotice(isTa ? 'புதிய தாவலில் அச்சு ஆவணம் திறக்கப்பட்டது!' : 'Book opened in new tab for printing!');
  };

  const handleDownloadFile = () => {
    const html = generateJadhagamBookPrintHtml(horoscope, currentLanguage, selectedFormat);
    downloadPrintFile(html, `${birthData.name}_Jadhagam_${selectedFormat}.html`);
    setPrintNotice(isTa ? 'ஜாதக நூல் கோப்பு (.html) பதிவிறக்கம் செய்யப்பட்டது!' : 'Book file downloaded successfully!');
  };

  // Helper to get descriptive title for each page in 35-page edition
  const getPageTitle35 = (pageNo: number) => {
    switch (pageNo) {
      case 1: return isTa ? 'முகப்பு & மங்கள வாழ்த்து' : 'Cover & Blessings';
      case 2: return isTa ? 'பிறப்பு பஞ்சாங்க விவரங்கள்' : 'Birth Panchangam';
      case 3: return isTa ? 'ராசி சக்கரம் (Rasi Chart)' : 'Rasi Chart';
      case 4: return isTa ? 'நவாம்ச சக்கரம் (Navamsa Chart)' : 'Navamsa Chart';
      case 5: return isTa ? 'கிரக பாதசார அட்டவணை' : 'Planetary Longitudes';
      case 6: return isTa ? 'பிறந்த இருப்பு தசாபுத்தி' : 'Dasa Balance';
      case 7: return isTa ? 'கேது மகா தசா பலன்கள்' : 'Ketu Dasa Phalas';
      case 8: return isTa ? 'சுக்கிர மகா தசா பலன்கள்' : 'Venus Dasa Phalas';
      case 9: return isTa ? 'சூரிய மகா தசா பலன்கள்' : 'Sun Dasa Phalas';
      case 10: return isTa ? 'சந்திர மகா தசா பலன்கள்' : 'Moon Dasa Phalas';
      case 11: return isTa ? 'செவ்வாய் மகா தசா பலன்கள்' : 'Mars Dasa Phalas';
      case 12: return isTa ? 'ராகு மகா தசா பலன்கள்' : 'Rahu Dasa Phalas';
      case 13: return isTa ? 'குரு மகா தசா பலன்கள்' : 'Jupiter Dasa Phalas';
      case 14: return isTa ? 'சனி மகா தசா பலன்கள்' : 'Saturn Dasa Phalas';
      case 15: return isTa ? 'புதன் மகா தசா பலன்கள்' : 'Mercury Dasa Phalas';
      case 16: return isTa ? '1-ம் பாவம்: லக்ன பாவம் (உடல், குணம்)' : '1st House (Lagna)';
      case 17: return isTa ? '2-ம் பாவம்: தன & குடும்ப பாவம்' : '2nd House (Wealth)';
      case 18: return isTa ? '3 & 4-ம் பாவம்: சோதர, சுக, வித்யா பாவம்' : '3rd & 4th Houses';
      case 19: return isTa ? '5 & 6-ம் பாவம்: பூர்வபுண்ணிய & ரோக பாவம்' : '5th & 6th Houses';
      case 20: return isTa ? '7 & 8-ம் பாவம்: களத்திர & ஆயுள் பாவம்' : '7th & 8th Houses';
      case 21: return isTa ? '9 & 10-ம் பாவம்: பாக்கிய & ஜீவன பாவம்' : '9th & 10th Houses';
      case 22: return isTa ? '11 & 12-ம் பாவம்: லாப & விரய பாவம்' : '11th & 12th Houses';
      case 23: return isTa ? 'செவ்வாய் தோஷ விளக்கம் & ஆய்வு' : 'Kuja Dosha Analysis';
      case 24: return isTa ? 'ராகு - கேது சர்ப்ப தோஷ ஆய்வு' : 'Sarpa Dosha Analysis';
      case 25: return isTa ? 'களத்திர தோஷ ஆய்வு' : 'Kalathra Dosha';
      case 26: return isTa ? 'பித்ரு தோஷ ஆய்வு & சாந்தி முறை' : 'Pitru Dosha Remedies';
      case 27: return isTa ? 'திருவண்ணாமலை கிரிவல தோஷ நிவர்த்தி' : 'Tiruvannamalai Pariharams';
      case 28: return isTa ? 'குரு பெயர்ச்சி கோச்சார பலன்கள்' : 'Jupiter Transit Impact';
      case 29: return isTa ? 'சனி பெயர்ச்சி கோச்சார பலன்கள்' : 'Saturn Transit Impact';
      case 30: return isTa ? 'ராகு-கேது பெயர்ச்சி பலன்கள்' : 'Rahu-Ketu Transit';
      case 31: return isTa ? 'அஷ்டகவர்க்க பரல்கள் விளக்கம்' : 'Ashtakavarga Points';
      case 32: return isTa ? 'அதிர்ஷ்ட ரத்தினக் கல் தேர்வு' : 'Gemstone Recommendation';
      case 33: return isTa ? 'வாஸ்து & அதிர்ஷ்ட எண்கள், நிறங்கள்' : 'Vastu & Lucky Colors';
      case 34: return isTa ? 'இஷ்ட தெய்வம் & நித்திய வழிபாட்டு மந்திரம்' : 'Deity Worship & Mantras';
      case 35: return isTa ? 'நிறைவுரை & ஜோதிட ஆசி முத்திரை' : 'Epilogue & Certified Seal';
      default: return `Page ${pageNo}`;
    }
  };

  // Helper for 16 A4 edition titles
  const getPageTitle16 = (pageNo: number) => {
    switch (pageNo) {
      case 1: return isTa ? 'முகப்பு · மங்கள வாழ்த்து · ஜாதகர் விவரம்' : 'Cover & Native Details';
      case 2: return isTa ? 'பஞ்சாங்கம் · அவகஹடா சக்கரம் · பிறப்பு விவரங்கள்' : 'Birth Panchangam & Vitals';
      case 3: return isTa ? 'ராசி கட்டம் & நவாம்ச கட்டம் (முழுப் பார்வை)' : 'Rasi & Navamsa Charts';
      case 4: return isTa ? 'கிரக பாதசார அட்டவணை & திருக்கணித நிலைகள்' : 'Planetary Positions & Longitudes';
      case 5: return isTa ? 'பிறந்த இருப்பு தசை & விம்சோத்தரி தசா அட்டவணை' : 'Janma Dasa Balance & Timeline';
      case 6: return isTa ? 'தசாபுத்தி விரிவான பலன்கள் (பகுதி 1: கேது, சுக்கிரன், சூரியன்)' : 'Dasa Phalas Part 1';
      case 7: return isTa ? 'தசாபுத்தி விரிவான பலன்கள் (பகுதி 2: சந்திரன், செவ்வாய், ராகு)' : 'Dasa Phalas Part 2';
      case 8: return isTa ? 'தசாபுத்தி விரிவான பலன்கள் (பகுதி 3: குரு, சனி, புதன்)' : 'Dasa Phalas Part 3';
      case 9: return isTa ? 'பாவ பலன்கள்: லக்னம், தனம், குடும்பம், வாக்கு (1 & 2)' : 'Bhava Phalas: Houses 1 & 2';
      case 10: return isTa ? 'பாவ பலன்கள்: சோதரம், சுகம், புத்திரம், கடன் (3, 4, 5, 6)' : 'Bhava Phalas: Houses 3 to 6';
      case 11: return isTa ? 'பாவ பலன்கள்: களத்திரம், ஆயுள், பாக்கியம், தொழில் (7, 8, 9, 10)' : 'Bhava Phalas: Houses 7 to 10';
      case 12: return isTa ? 'பாவ பலன்கள்: லாபம், விரயம், மோட்சம் (11 & 12)' : 'Bhava Phalas: Houses 11 & 12';
      case 13: return isTa ? 'தோஷ நிர்ணயம்: செவ்வாய், ராகு-கேது, களத்திர தோஷம்' : 'Dosha Evaluation & In-depth Check';
      case 14: return isTa ? 'திருவண்ணாமலை தல பரிகாரங்கள் & கிரிவல பலன்கள்' : 'Tiruvannamalai Temple Pariharams';
      case 15: return isTa ? 'கோச்சார பலன்கள் (குரு, சனி, ராகு-கேது பெயர்ச்சி)' : 'Transits (Gochara Phalas)';
      case 16: return isTa ? 'அதிர்ஷ்ட ரத்தினம், வாஸ்து குறிப்புகள் & ஆசி முத்திரை' : 'Gemstones, Vastu & Certified Seal';
      default: return `Page ${pageNo}`;
    }
  };

  const getPageTitle = (p: number) => {
    return selectedFormat === '16_a4_portrait' ? getPageTitle16(p) : getPageTitle35(p);
  };

  // Content renderer for a specific page
  const renderPageContent = (pageNo: number) => {
    return (
      <div
        key={pageNo}
        className={`jadhagam-page bg-white text-stone-900 border border-amber-900/40 shadow-md relative overflow-hidden transition-all ${
          isLandscape
            ? 'jadhagam-page-a5-landscape w-full aspect-[210/148] max-w-[800px] p-2.5 text-[11px]'
            : isA4
            ? 'jadhagam-page-a4-portrait w-full aspect-[210/297] max-w-[750px] p-6 text-xs'
            : 'jadhagam-page-a5-portrait w-full aspect-[148/210] max-w-[560px] p-3 text-xs'
        } print:border-none print:shadow-none print:p-0 print:m-0`}
      >
        {/* Subtle Ornamental Inner Border */}
        <div className={`border border-amber-800/30 rounded h-full flex flex-col justify-between relative bg-amber-50/10 ${
          isLandscape ? 'p-2' : 'p-3 sm:p-4'
        }`}>
          {/* Page Top Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-amber-800/20 pb-0.5 text-[8.5px]">
            <div className="flex items-center gap-1.5">
              <img
                src="/assets/aistudio/image_363aba76.png"
                alt="Logo"
                className="w-3.5 h-3.5 rounded-full object-cover"
              />
              <span className="font-bold text-amber-950 font-serif">
                {isTa ? 'மாதவ் ஜோதிட நிலையம் · திருவண்ணாமலை' : 'Madhav Jodhida Nilayam · Tiruvannamalai'}
              </span>
            </div>
            <div className="text-right text-stone-500 font-mono text-[8px]">
              <span>{birthData.name}</span> · <span className="font-bold text-amber-900">{pageNo} / {totalPages}</span>
            </div>
          </div>

          {/* Dynamic Page Body depending on pageNo */}
          <div className="flex-1 py-1 overflow-hidden flex flex-col justify-center">
            {/* PAGE 1: COVER & BLESSINGS */}
            {pageNo === 1 && (
              isLandscape ? (
                /* Optimized 2-column landscape cover */
                <div className="grid grid-cols-2 gap-2 items-center h-full px-1">
                  <div className="text-center border-r border-amber-300 pr-2 space-y-0.5">
                    <span className="text-[8px] font-bold text-amber-900 tracking-wider uppercase block">
                      {isTa ? '॥ ஸ்ரீ முத்தாலம்மன் துணை ॥' : '॥ Sri Muthalamman Thunai ॥'}
                    </span>
                    <div className="flex justify-center my-0.5">
                      <img
                        src="/assets/aistudio/image_363aba76.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-full border border-amber-500 shadow-xs object-cover"
                      />
                    </div>
                    <h1 className="text-sm font-black text-amber-950 font-serif tracking-tight">
                      {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
                    </h1>
                    <p className="text-[8.5px] font-bold text-amber-900">
                      {isTa
                        ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் · வாஸ்து'
                        : 'Malamanjanur Lineage · Vastu'}
                    </p>
                    <p className="text-[7.5px] text-stone-600 italic">
                      {isTa
                        ? 'ராமச்சந்திரன் நாட்டார் · மாணிக்க நாட்டார் MR · ராமச்சந்திரன் MA'
                        : 'Hereditary Astrologers of Tiruvannamalai'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="py-0.5 px-2 bg-amber-100/80 rounded border border-amber-300 text-center">
                      <span className="text-[8px] font-extrabold text-amber-950 uppercase tracking-wider block">
                        {isTa ? '— சம்பூர்ண ஜனன ஜாதக நூல் —' : '— Comprehensive Janana Book —'}
                      </span>
                      <div className="text-xs font-black text-rose-950 mt-0.5 truncate">
                        {birthData.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[8.5px] bg-stone-50 p-1.5 rounded border border-amber-200">
                      <div>{isTa ? 'பிறந்த தேதி:' : 'DOB:'} <b>{birthData.dob}</b></div>
                      <div>{isTa ? 'பிறந்த நேரம்:' : 'TOB:'} <b>{birthData.tob}</b></div>
                      <div>{isTa ? 'பிறந்த ஊர்:' : 'Place:'} <b>{birthData.pob}</b></div>
                      <div>{isTa ? 'லக்னம்:' : 'Lagna:'} <b>{isTa ? lagna.rasiNameTa : lagna.rasiName}</b></div>
                      <div className="col-span-2 truncate">{isTa ? 'தந்தை / தாய்:' : 'Parents:'} <b>{birthData.fatherName || '—'} / {birthData.motherName || '—'}</b></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vertical cover for portrait formats */
                <div className="text-center space-y-2.5">
                  <span className="text-xs font-bold text-amber-900 tracking-widest uppercase">
                    {isTa ? '॥ ஸ்ரீ முத்தாலம்மன் துணை ॥' : '॥ Sri Muthalamman Thunai ॥'}
                  </span>
                  <div className="flex justify-center my-1.5">
                    <img
                      src="/assets/aistudio/image_363aba76.png"
                      alt="Logo"
                      className="w-16 h-16 rounded-full border-2 border-amber-500 shadow-md object-cover"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-amber-950 font-serif tracking-tight">
                    {isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}
                  </h1>
                  <p className="text-xs font-semibold text-amber-900">
                    {isTa
                      ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் - மனையடி சாஸ்திரம் (வாஸ்து)'
                      : 'Malamanjanur Hereditary Astrologer - Vastu Shastra'}
                  </p>

                  <div className="my-2 py-1.5 px-3 bg-amber-100/70 rounded-lg inline-block border border-amber-300">
                    <span className="text-[10px] font-extrabold text-amber-950 uppercase tracking-wider block">
                      {isTa ? '— சம்பூர்ண ஜனன ஜாதக நூல் —' : '— Comprehensive Janana Horoscope Book —'}
                    </span>
                    <div className="text-sm font-bold text-rose-950 mt-0.5">
                      {birthData.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 max-w-sm mx-auto text-left text-[10px] bg-stone-50 p-2 rounded border border-amber-200">
                    <div>{isTa ? 'பிறந்த தேதி:' : 'DOB:'} <b>{birthData.dob}</b></div>
                    <div>{isTa ? 'பிறந்த நேரம்:' : 'TOB:'} <b>{birthData.tob}</b></div>
                    <div>{isTa ? 'பிறந்த ஊர்:' : 'Place:'} <b>{birthData.pob}</b></div>
                    <div>{isTa ? 'லக்னம்:' : 'Lagna:'} <b>{isTa ? lagna.rasiNameTa : lagna.rasiName}</b></div>
                    <div className="col-span-2">{isTa ? 'தந்தை / தாய்:' : 'Parents:'} <b>{birthData.fatherName || '—'} / {birthData.motherName || '—'}</b></div>
                  </div>
                </div>
              )
            )}

            {/* PAGE 2: BIRTH PANCHANGAM */}
            {pageNo === 2 && (
              <div className={isLandscape ? "space-y-1" : "space-y-3"}>
                <h3 className="font-bold text-xs text-amber-950 text-center border-b border-amber-200 pb-0.5 font-serif">
                  {isTa ? 'ஜனன பஞ்சாங்க அவகஹடா சக்கரம்' : 'Janma Panchangam & Avakhada Chakra'}
                </h3>
                <div className={`grid ${isLandscape ? 'grid-cols-6 gap-1 text-[8px]' : 'grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]'}`}>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'வாரம்' : 'Day'}</span>
                    <span className="font-bold text-stone-900 truncate block">{isTa ? vaaram.nameTa : vaaram.name}</span>
                  </div>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'திதி' : 'Thithi'}</span>
                    <span className="font-bold text-stone-900 truncate block">{isTa ? thithi.nameTa : thithi.name}</span>
                  </div>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'நட்சத்திரம்' : 'Star'}</span>
                    <span className="font-bold text-stone-900 truncate block">{isTa ? `${nakshatra.nameTa} (${nakshatra.pada})` : `${nakshatra.name} (${nakshatra.pada})`}</span>
                  </div>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'யோகம்' : 'Yoga'}</span>
                    <span className="font-bold text-stone-900 truncate block">{yogam.name}</span>
                  </div>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'கரணம்' : 'Karana'}</span>
                    <span className="font-bold text-stone-900 truncate block">{karanam.name}</span>
                  </div>
                  <div className={`bg-amber-50 rounded border border-amber-200 ${isLandscape ? 'p-0.5 text-center' : 'p-2'}`}>
                    <span className="text-stone-500 block text-[7.5px]">{isTa ? 'சூரிய உதயம்' : 'Sunrise'}</span>
                    <span className="font-bold text-stone-900">06:08 AM</span>
                  </div>
                </div>

                <div className={`bg-stone-50 rounded border border-amber-200 ${isLandscape ? 'p-1 text-[8.5px]' : 'p-2.5 text-[11px]'}`}>
                  <h4 className="font-bold text-amber-950 mb-0.5">{isTa ? 'நட்சத்திர அங்கங்கள் (Vedic Attributes):' : 'Star Attributes:'}</h4>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-stone-800 text-[8px]">
                    <div>{isTa ? 'கணம்:' : 'Gana:'} <b>{nakshatra.lord}</b></div>
                    <div>{isTa ? 'யோனி:' : 'Yoni:'} <b>ஆண்/பெண்</b></div>
                    <div>{isTa ? 'பூதம்:' : 'Element:'} <b>நிலம்/நீர்</b></div>
                    <div>{isTa ? 'விருட்சம்:' : 'Tree:'} <b>அரசு/நாவல்</b></div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 3: RASI CHART */}
            {pageNo === 3 && (
              isLandscape ? (
                <div className="grid grid-cols-2 gap-2 items-center h-full px-1">
                  <div className="flex justify-center max-w-[210px] mx-auto">
                    <SouthIndianChart
                      title="ராசி"
                      titleSub="மாதவ் ஜோதிடம்"
                      planetsByRasi={rasiChart}
                      compact={true}
                    />
                  </div>
                  <div className="space-y-1 text-[8.5px] leading-tight">
                    <div className="font-bold text-amber-950 font-serif border-b border-amber-200 pb-0.5 text-[10px]">
                      {isTa ? 'ராசி சக்கரம் (D1 Janma Chakra)' : 'Rasi Chakra (D1 Janma Chakra)'}
                    </div>
                    <div className="grid grid-cols-2 gap-1 bg-amber-50 p-1 rounded border border-amber-200 text-[8px]">
                      <div>{isTa ? 'லக்னம்:' : 'Lagna:'} <b>{isTa ? lagna.rasiNameTa : lagna.rasiName}</b></div>
                      <div>{isTa ? 'பாகை:' : 'Deg:'} <b className="font-mono">{lagna.degreeFormatted}</b></div>
                      <div>{isTa ? 'ராசி:' : 'Rasi:'} <b>{isTa ? (planets.find(p => p.name === 'Moon')?.rasiNameTa || '') : ''}</b></div>
                      <div>{isTa ? 'நட்சத்திரம்:' : 'Star:'} <b>{isTa ? nakshatra.nameTa : nakshatra.name}</b></div>
                    </div>
                    <div className="bg-white p-1 rounded border border-stone-200 text-[7.5px] text-stone-700 leading-snug">
                      {isTa
                        ? 'லக்னம் முதல் 12 பாவங்களில் கிரகங்களின் அமைவிடம் கொண்டு உடல், பொருள், ஆயுள் மற்றும் பாக்கிய யோகங்கள் நிர்ணயிக்கப்படுகின்றன.'
                        : 'Planetary alignments across the 12 Bhavas govern native longevity, prosperity, and career.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h3 className="font-bold text-sm text-amber-950 font-serif">
                    {isTa ? 'ராசி சக்கரம் (தென்னிந்திய வடிவம்)' : 'Janma Rasi Chakra (D1)'}
                  </h3>
                  <div className="w-full max-w-[280px]">
                    <SouthIndianChart
                      title="ராசி"
                      titleSub="மாதவ் ஜோதிடம்"
                      planetsByRasi={rasiChart}
                      compact={true}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 text-center max-w-sm">
                    {isTa ? 'லக்னம் மற்றும் நவக்கிரகங்களின் நிராயன ராசி அமைவிடம்.' : 'Sidereal Nirayana planetary placements.'}
                  </p>
                </div>
              )
            )}

            {/* PAGE 4: NAVAMSA CHART */}
            {pageNo === 4 && (
              isLandscape ? (
                <div className="grid grid-cols-2 gap-2 items-center h-full px-1">
                  <div className="flex justify-center max-w-[210px] mx-auto">
                    <SouthIndianChart
                      title="நவாம்சம்"
                      titleSub="மாதவ் ஜோதிடம்"
                      planetsByRasi={navamsaChart}
                      compact={true}
                    />
                  </div>
                  <div className="space-y-1 text-[8.5px] leading-tight">
                    <div className="font-bold text-amber-950 font-serif border-b border-amber-200 pb-0.5 text-[10px]">
                      {isTa ? 'நவாம்ச சக்கரம் (D9 Navamsa Chakra)' : 'Navamsa Chakra (D9 Navamsa Chakra)'}
                    </div>
                    <div className="bg-amber-50 p-1 rounded border border-amber-200 text-[8px] text-stone-800 leading-snug">
                      {isTa
                        ? 'நவாம்ச சக்கரம் தாம்பத்திய சுகம், களத்திர யோகம் மற்றும் கிரகங்களின் சூட்சும பலத்தை உணர்த்துகிறது. வர்க்கோத்தம கிரகங்கள் விசேஷ யோகம் தரும்.'
                        : 'Navamsa chart reveals subtle marital harmony, spiritual path, and vargottama planet strengths.'}
                    </div>
                    <div className="bg-white p-1 rounded border border-stone-200 text-[7.5px] text-stone-700 leading-snug">
                      {isTa
                        ? 'களத்திர ஸ்தானத்தில் சுபகிரக தொடர்பு ஏற்பட்டு இல்லற மேன்மையும் நற்குடும்ப அமைப்பும் கிட்டும்.'
                        : 'Auspicious Kalathra bhava connections indicate strong domestic blessings.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <h3 className="font-bold text-sm text-amber-950 font-serif">
                    {isTa ? 'நவாம்ச சக்கரம் (D9 Navamsa)' : 'Navamsa Chakra (D9)'}
                  </h3>
                  <div className="w-full max-w-[280px]">
                    <SouthIndianChart
                      title="நவாம்சம்"
                      titleSub="மாதவ் ஜோதிடம்"
                      planetsByRasi={navamsaChart}
                      compact={true}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 text-center max-w-sm">
                    {isTa ? 'தாம்பத்திய சுகம், களத்திரம் மற்றும் சூட்சும கிரக பலன்கள் நவாம்சத்தில் அறியப்படும்.' : 'Navamsa represents marital strength and subtle planetary powers.'}
                  </p>
                </div>
              )
            )}

            {/* PAGE 5: PLANETARY LONGITUDES */}
            {pageNo === 5 && (
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-amber-950 text-center border-b border-amber-200 pb-0.5 font-serif">
                  {isTa ? 'கிரக பாதசார விரிவு அட்டவணை' : 'Detailed Planetary Longitudes'}
                </h3>
                <table className="w-full text-left text-[8px] border border-amber-800/30">
                  <thead className="bg-amber-100/70 font-bold text-amber-950">
                    <tr>
                      <th className="p-0.5">{isTa ? 'கிரகம்' : 'Planet'}</th>
                      <th className="p-0.5">{isTa ? 'ராசி' : 'Rasi'}</th>
                      <th className="p-0.5">{isTa ? 'பாகை' : 'Degree'}</th>
                      <th className="p-0.5">{isTa ? 'நட்சத்திரம்' : 'Star'}</th>
                      <th className="p-0.5">{isTa ? 'பாதம்' : 'Pada'}</th>
                      <th className="p-0.5">{isTa ? 'ஸ்தான பலம்' : 'Dignity'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    <tr className="bg-amber-50 font-bold text-rose-950">
                      <td className="p-0.5">{isTa ? 'லக்னம்' : 'Lagna'}</td>
                      <td className="p-0.5">{isTa ? lagna.rasiNameTa : lagna.rasiName}</td>
                      <td className="p-0.5 font-mono">{lagna.degreeFormatted}</td>
                      <td className="p-0.5">{isTa ? lagna.nakshatraNameTa : lagna.nakshatraName}</td>
                      <td className="p-0.5">{lagna.pada}</td>
                      <td className="p-0.5">கேந்திராதிபதி</td>
                    </tr>
                    {planets.map((p) => (
                      <tr key={p.name}>
                        <td className="p-0.5 font-semibold">{isTa ? p.nameTa : p.name}</td>
                        <td className="p-0.5">{isTa ? p.rasiNameTa : p.rasiName}</td>
                        <td className="p-0.5 font-mono">{p.degreeFormatted}</td>
                        <td className="p-0.5">{isTa ? p.nakshatraNameTa : p.nakshatraName}</td>
                        <td className="p-0.5">{p.pada}</td>
                        <td className="p-0.5 font-medium">{isTa ? p.avasthaTa : p.avastha}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGE 6: DASA BALANCE AT BIRTH */}
            {pageNo === 6 && (
              <div className={isLandscape ? "space-y-1.5" : "space-y-3"}>
                <h3 className="font-bold text-xs text-amber-950 text-center border-b border-amber-200 pb-0.5 font-serif">
                  {isTa ? 'பிறந்த இருப்பு தசாபுத்தி கணக்கீடு' : 'Janma Dasa Balance at Birth'}
                </h3>
                <div className={`bg-amber-50 rounded border border-amber-300 ${isLandscape ? 'p-1.5' : 'p-3'}`}>
                  <div className={`font-extrabold text-amber-950 ${isLandscape ? 'text-xs' : 'text-sm'}`}>
                    {isTa
                      ? `${dasaBalance.lordTa} மகா தசை இருப்பு:`
                      : `${dasaBalance.lord} Dasa Balance:`}
                  </div>
                  <div className={`font-black text-rose-900 mt-0.5 ${isLandscape ? 'text-sm' : 'text-base'}`}>
                    {dasaBalance.years} {isTa ? 'வருடம்' : 'Years'}, {dasaBalance.months} {isTa ? 'மாதம்' : 'Months'}, {dasaBalance.days} {isTa ? 'நாட்கள்' : 'Days'}
                  </div>
                  <p className={`text-stone-600 mt-0.5 ${isLandscape ? 'text-[8px]' : 'text-[11px]'}`}>
                    {isTa ? 'தசை ஆரம்ப தேதி:' : 'Start Date:'} {dasaBalance.startDate} · {isTa ? 'முடிவு தேதி:' : 'End Date:'} {dasaBalance.endDate}
                  </p>
                </div>

                <div className={`text-stone-800 leading-tight bg-white rounded border border-amber-200 ${isLandscape ? 'p-1.5 text-[8px]' : 'p-3 text-[11px]'}`}>
                  <h4 className="font-bold text-amber-950 mb-0.5">{isTa ? 'விம்சோத்தரி தசா முறை விளக்கம்:' : 'Vimshottari System Overview:'}</h4>
                  <p>
                    {isTa
                      ? 'மனித வாழ்வின் ஆயுள் 120 வருடங்களாக கணிக்கப்பட்டு ஒன்பது கிரகங்களுக்கு விம்சோத்தரி முறையில் பிரிக்கப்பட்டுள்ளது. பிறந்த நட்சத்திரத்தின் அடிப்படையில் முதல் தசை அமைகிறது.'
                      : 'The 120-year Vimshottari Dasa cycle allocates periods to each planet starting from the birth star lord.'}
                  </p>
                </div>
              </div>
            )}

            {/* PAGES 7 to 15: DASA PERIODS */}
            {pageNo >= 7 && pageNo <= 15 && (
              <div className="space-y-3">
                {(() => {
                  const dIdx = pageNo - 7;
                  const dasaPeriod = dasaTimeline[dIdx] || dasaTimeline[0];
                  return (
                    <div>
                      <h3 className="font-bold text-sm text-amber-950 text-center border-b border-amber-200 pb-1 font-serif">
                        {isTa ? `${dasaPeriod.lordTa} மகா தசா விரிவான பலன்கள்` : `${dasaPeriod.lord} Maha Dasa Phalas`}
                      </h3>
                      <div className="flex justify-between items-center bg-amber-100/60 p-2 rounded border border-amber-300 my-2 text-[11px]">
                        <div>
                          <span>{isTa ? 'கால அளவு:' : 'Duration:'} <b>{dasaPeriod.durationYears} {isTa ? 'வருடங்கள்' : 'Years'}</b></span>
                        </div>
                        <div>
                          <span>{dasaPeriod.startDate} முதல் {dasaPeriod.endDate} வரை</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 my-2">
                        <span className="font-bold text-[11px] text-amber-950 block">
                          {isTa ? 'புக்தி கால விவரங்கள்:' : 'Sub-Period (Bukthi) Dates:'}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                          {dasaPeriod.subPeriods.map((bp, i) => (
                            <div key={i} className="p-1.5 bg-stone-50 rounded border border-stone-200">
                              <span className="font-bold text-stone-900 block">{isTa ? bp.lordTa : bp.lord}</span>
                              <span className="text-[9px] text-stone-600 block">{bp.endDate} வரை</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-2.5 bg-amber-50/70 rounded border border-amber-200 text-[11px] text-stone-800 leading-relaxed mt-2">
                        <span className="font-bold text-amber-950 block mb-0.5">
                          {isTa ? 'பொதுவான பலன்கள் & பரிகாரம்:' : 'General Predictions & Remedies:'}
                        </span>
                        <p>
                          {isTa
                            ? `${dasaPeriod.lordTa} தசா காலத்தில் நற்பலன்கள் கூட உரிய தெய்வ வழிபாடும், தான தர்மங்களும் செய்வது இல்லற மேன்மையும் செல்வச் செழிப்பும் தரும்.`
                            : `During ${dasaPeriod.lord} Dasa, propitiating the respective planetary deity brings peace and prosperity.`}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* PAGES 16 to 22: 12 BHAVA PHALAS */}
            {pageNo >= 16 && pageNo <= 22 && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-amber-950 text-center border-b border-amber-200 pb-1 font-serif">
                  {getPageTitle35(pageNo)}
                </h3>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] leading-relaxed space-y-2 text-stone-800">
                  <p>
                    {isTa
                      ? 'இந்த பாவத்திற்குரிய அதிபதியும் அதில் அமர்ந்துள்ள கிரகங்களும் நற்பலன் அளிக்கும் சுப யோகத்தில் உள்ளன. உடலாரோக்கியம், குடும்ப மேன்மை மற்றும் சமூகத்தில் நற்பெயர் கிட்டும்.'
                      : 'The lord of this house and presiding planetary aspects indicate harmony, prosperity and longevity.'}
                  </p>
                  <p>
                    {isTa
                      ? 'லக்னாதிபதி பலம் பெற்றிருப்பதால் எடுத்த காரியங்களில் விடாமுயற்சியும் வெற்றியும் அமையும். குலதெய்வ வழிபாடு விசேஷ அனுகிரகம் தரும்.'
                      : 'Strong ascendant alignment strengthens resolution and brings long-term success.'}
                  </p>
                </div>
              </div>
            )}

            {/* PAGES 23 to 27: DOSHAS & PARIHARAMS */}
            {pageNo >= 23 && pageNo <= 27 && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-amber-950 text-center border-b border-amber-200 pb-1 font-serif">
                  {getPageTitle35(pageNo)}
                </h3>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 text-[11px] space-y-2 text-stone-800">
                  <div className="font-bold text-rose-950 text-xs">
                    {pageNo === 23
                      ? isTa ? 'செவ்வாய் தோஷ நிலை ஆய்வு' : 'Kuja Dosha Evaluation'
                      : pageNo === 24
                      ? isTa ? 'ராகு - கேது நாக சர்ப்ப தோஷ நிலை' : 'Rahu-Ketu Sarpa Dosha'
                      : pageNo === 27
                      ? isTa ? 'திருவண்ணாமலை கிரிவல மகிமை' : 'Sacred Tiruvannamalai Girivalam'
                      : isTa ? 'தோஷ பரிஹார முறை' : 'Pariharam Guide'}
                  </div>
                  <p className="leading-relaxed">
                    {pageNo === 27
                      ? isTa
                        ? 'திருவண்ணாமலை அருணாசலேஸ்வரர் சன்னதி மற்றும் அஷ்ட லிங்க கிரிவலம் (இந்திர, அக்னி, எம, நிருதி, வருண, வாயு, குபேர, ஈசான லிங்கம்) செய்வது அனைத்து கிரக தோஷங்களையும் நிவர்த்தி செய்து ஆயுள் பலம் நல்கும்.'
                        : 'Circumbulating the sacred Arunachala hill in Tiruvannamalai through the 8 Lingams purifies past karmas.'
                      : isTa
                      ? 'சம்பந்தப்பட்ட தோஷத்திற்குரிய சுப பரிகாரங்களை மாதவ் ஜோதிட நிலைய வழிகாட்டலின்படி மேற்கொள்வது முழு நிவர்த்தி தரும்.'
                      : 'Performing prescribed Vedic rituals according to Madhav Jodhida Nilayam guidance brings harmony.'}
                  </p>
                </div>
              </div>
            )}

            {/* PAGES 28 to 31: TRANSITS */}
            {pageNo >= 28 && pageNo <= 31 && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-amber-950 text-center border-b border-amber-200 pb-1 font-serif">
                  {getPageTitle35(pageNo)}
                </h3>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-[11px] leading-relaxed text-stone-800">
                  <p>
                    {isTa
                      ? 'கோச்சார கிரகங்கள் உங்கள் ஜனன ராசிக்கு சுப ஸ்தானத்தில் சஞ்சரிக்கும் காலத்தில் புதிய முயற்சிகள், வீடு வாங்குதல், உத்தியோக உயர்வு கை கூடும்.'
                      : 'Benefic planetary transits over natal positions bring career growth and prosperity.'}
                  </p>
                </div>
              </div>
            )}

            {/* PAGES 32 to 34: LUCKY FACTORS */}
            {pageNo >= 32 && pageNo <= 34 && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-amber-950 text-center border-b border-amber-200 pb-1 font-serif">
                  {getPageTitle35(pageNo)}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 bg-amber-50 rounded border border-amber-300">
                    <span className="text-stone-500 block text-[10px]">{isTa ? 'அதிர்ஷ்ட ரத்தினம்' : 'Gemstone'}</span>
                    <span className="font-bold text-amber-950 text-xs">{isTa ? luckyFactors.gemstoneTa : luckyFactors.gemstone}</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded border border-amber-300">
                    <span className="text-stone-500 block text-[10px]">{isTa ? 'அதிர்ஷ்ட நிறம்' : 'Lucky Color'}</span>
                    <span className="font-bold text-amber-950 text-xs">{isTa ? luckyFactors.colorTa : luckyFactors.color}</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded border border-amber-300">
                    <span className="text-stone-500 block text-[10px]">{isTa ? 'அதிர்ஷ்ட எண்' : 'Lucky Number'}</span>
                    <span className="font-bold text-amber-950 text-xs">{luckyFactors.number}</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded border border-amber-300">
                    <span className="text-stone-500 block text-[10px]">{isTa ? 'சுப திசை' : 'Direction'}</span>
                    <span className="font-bold text-amber-950 text-xs">{isTa ? luckyFactors.directionTa : luckyFactors.direction}</span>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 35: FINAL SEAL & BLESSINGS */}
            {pageNo === 35 && (
              <div className={`text-center ${isLandscape ? 'space-y-1' : 'space-y-4'}`}>
                <span className="text-[9.5px] font-bold text-amber-900 tracking-widest uppercase">
                  {isTa ? '॥ சுபம் பூயாத் - மங்களம் உண்டாகுக ॥' : '॥ Shubham Bhavatu ॥'}
                </span>

                <div className={`bg-amber-50 rounded border border-amber-800/40 max-w-md mx-auto text-stone-800 ${isLandscape ? 'p-1.5 text-[8.5px] space-y-0.5' : 'p-4 text-[11px] space-y-2'}`}>
                  <p className="font-serif font-bold text-xs text-amber-950">
                    {isTa ? 'மாதவ் ஜோதிட நிலைய சான்றளிப்பு' : 'Madhav Jodhida Nilayam Certification'}
                  </p>
                  <p className="leading-snug">
                    {isTa
                      ? 'இந்த ஜாதக நூல் பாரம்பரிய மலமஞ்சனூர் வாக்கிய மற்றும் திருக்கணித பஞ்சாங்க கணித முறைப்படி துல்லியமாக கணிக்கப்பட்டு ஆசி வழங்கப்பட்டுள்ளது.'
                      : 'Computed and certified according to authentic traditional Vedic astrology principles.'}
                  </p>
                </div>

                <div className={`flex flex-wrap items-center justify-around max-w-md mx-auto text-center ${isLandscape ? 'pt-0.5' : 'pt-4'}`}>
                  <div>
                    <div className={`rounded-full border border-dashed border-amber-700 mx-auto flex items-center justify-center font-bold text-amber-900 p-0.5 ${isLandscape ? 'w-8 h-8 text-[7px]' : 'w-16 h-16 text-[9px]'}`}>
                      முத்திரை
                    </div>
                    <span className="text-[7.5px] text-stone-600 block">மாதவ் ஜோதிடம்</span>
                  </div>

                  <div>
                    <div className={`flex items-end justify-center font-serif italic text-amber-950 font-bold ${isLandscape ? 'h-5 text-[10px]' : 'h-12 text-sm'}`}>
                      ராமச்சந்திரன் MA
                    </div>
                    <span className="text-[7.5px] text-stone-700 block border-t border-stone-400 pt-0.5 px-2">
                      {isTa ? 'ஜோதிட ஆலோசகர் கையொப்பம்' : 'Astrologer Signature'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Page Bottom Footer */}
          <div className="flex flex-wrap items-center justify-between border-t border-amber-800/20 pt-0.5 text-[8px] text-stone-500">
            <span>{isTa ? 'செல்: 90429 24345, 90435 15667' : 'Cell: 90429 24345, 90435 15667'}</span>
            <span>{isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடம்' : 'Malamanjanur Hereditary Astrology'}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-4 md:py-6 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Floating Quick Print Button */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2.5 px-5 py-3 text-sm font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 rounded-full shadow-2xl border-2 border-stone-950/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title={isTa ? 'ஜாதக நூலை அச்சிடுக' : 'Print Jadhagam Book'}
        >
          <Printer className="w-5 h-5 text-stone-950 group-hover:animate-bounce" />
          <span className="font-extrabold tracking-wide">
            {isTa ? 'அச்சிடுக (Print Book)' : 'Print Jadhagam Book'}
          </span>
        </button>
      </div>

      <div className="relative w-full max-w-5xl bg-stone-900 text-stone-100 rounded-2xl shadow-2xl overflow-visible my-2 sm:my-4 print:shadow-none print:w-full print:max-w-none print:bg-white print:my-0">
        {/* Injected Dynamic CSS for Format-Specific Printing */}
        <style>{`
          @media print {
            @page {
              size: ${
                selectedFormat === '35_a5_landscape'
                  ? 'A5 landscape'
                  : selectedFormat === '35_a5_portrait'
                  ? 'A5 portrait'
                  : 'A4 portrait'
              } !important;
              margin: ${
                selectedFormat === '35_a5_landscape'
                  ? '10mm'
                  : selectedFormat === '35_a5_portrait'
                  ? '4mm 4mm'
                  : '5mm 6mm'
              } !important;
            }

            .jadhagam-print-container {
              display: block !important;
              gap: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              max-height: none !important;
              overflow: visible !important;
              background: transparent !important;
            }

            .jadhagam-page-a5-landscape {
              width: 190mm !important;
              height: 128mm !important;
              max-height: 128mm !important;
              min-height: 128mm !important;
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              box-sizing: border-box !important;
              margin: 0 auto !important;
              padding: 0 !important;
              overflow: hidden !important;
              display: block !important;
            }

            .jadhagam-page-a5-portrait {
              width: 140mm !important;
              height: 201mm !important;
              max-height: 201mm !important;
              min-height: 201mm !important;
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              box-sizing: border-box !important;
              margin: 0 auto !important;
              padding: 0 !important;
              overflow: hidden !important;
              display: block !important;
            }

            .jadhagam-page-a4-portrait {
              width: 198mm !important;
              height: 284mm !important;
              max-height: 284mm !important;
              min-height: 284mm !important;
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              box-sizing: border-box !important;
              margin: 0 auto !important;
              padding: 0 !important;
              overflow: hidden !important;
              display: block !important;
            }

            .jadhagam-page:last-child,
            .jadhagam-page-a5-landscape:last-child,
            .jadhagam-page-a5-portrait:last-child,
            .jadhagam-page-a4-portrait:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
          }
        `}</style>

        {/* Top Control Bar (Format Selector, Page Nav, Print Button) - Sticky in View */}
        <div className="sticky top-0 z-30 p-3 sm:p-4 bg-stone-950/95 backdrop-blur-md border-b border-amber-500/40 rounded-t-2xl shadow-md flex flex-wrap items-center justify-between gap-3 print:hidden">
          {/* Format Switcher */}
          <div className="flex items-center gap-1.5 bg-stone-800 p-1 rounded-lg border border-amber-500/30 text-xs">
            <button
              onClick={() => {
                setSelectedFormat('35_a5_landscape');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedFormat === '35_a5_landscape'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {isTa ? '35 A5 Landscape' : '35 A5 Landscape'}
            </button>
            <button
              onClick={() => {
                setSelectedFormat('35_a5_portrait');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedFormat === '35_a5_portrait'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {isTa ? '35 A5 Portrait' : '35 A5 Portrait'}
            </button>
            <button
              onClick={() => {
                setSelectedFormat('16_a4_portrait');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                selectedFormat === '16_a4_portrait'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {isTa ? '16 A4 Portrait' : '16 A4 Portrait'}
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* View mode toggle (Single Page or All Pages preview) */}
            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'all' : 'single')}
              className="px-2.5 py-1.5 rounded bg-stone-800 text-amber-200 hover:bg-stone-700 transition-colors border border-amber-500/20 cursor-pointer"
            >
              {viewMode === 'single'
                ? isTa
                  ? 'அனைத்து பக்கங்களும்'
                  : 'View All'
                : isTa
                ? 'ஒற்றைப் பக்கம்'
                : 'Single Page'}
            </button>

            {/* Download File */}
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded border border-amber-500/30 font-semibold transition-colors cursor-pointer"
              title={isTa ? 'முழு ஜாதக நூலை .html கோப்பாகப் பதிவிறக்கு' : 'Download Complete Book HTML File'}
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isTa ? 'பதிவிறக்கு' : 'Download'}</span>
            </button>

            {/* Open in New Tab */}
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-950/80 hover:bg-amber-900 text-amber-200 rounded border border-amber-500/40 font-semibold transition-colors cursor-pointer"
              title={isTa ? 'புதிய தாவலில் தனியாகத் திறந்து அச்சிடுக' : 'Open in New Tab for Printing'}
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isTa ? 'புதிய தாவல்' : 'New Tab'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isTa ? 'அச்சிடுக' : 'Print Book'}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              title={isTa ? 'மூடுக' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print Feedback Banner */}
        {printNotice && (
          <div className="bg-emerald-950/90 text-emerald-100 border-b border-emerald-500/40 p-2.5 px-4 text-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
            <span>{printNotice}</span>
            <div className="flex items-center gap-2">
              {lastBlobUrl && (
                <a
                  href={lastBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-0.5 bg-amber-500 text-stone-950 rounded font-bold hover:bg-amber-400 text-[11px] flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{isTa ? 'திறக்க' : 'Open'}</span>
                </a>
              )}
              <button
                onClick={() => setPrintNotice(null)}
                className="text-stone-400 hover:text-white px-2 py-0.5 rounded text-[11px] bg-stone-800 cursor-pointer"
              >
                {isTa ? 'சரி' : 'OK'}
              </button>
            </div>
          </div>
        )}

        {/* Page Navigator Bar for Single Page View */}
        {viewMode === 'single' && (
          <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center justify-between text-xs text-amber-200 print:hidden">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isTa ? 'முந்தைய பக்கம்' : 'Previous'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-300">
                {isTa ? 'பக்கம்:' : 'Page:'}
              </span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value, 10))}
                className="bg-stone-800 border border-amber-500/30 text-amber-100 rounded px-2 py-0.5 font-bold"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} - {getPageTitle(num)}
                  </option>
                ))}
              </select>
              <span className="text-stone-400">/ {totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none rounded transition-colors cursor-pointer"
            >
              <span>{isTa ? 'அடுத்த பக்கம்' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN PREVIEW CONTAINER (Hidden during printing) */}
        <div className="jadhagam-screen-container p-4 sm:p-6 max-h-[75vh] overflow-y-auto flex flex-col items-center gap-6 bg-stone-950/70 print:hidden">
          {viewMode === 'single' ? (
            renderPageContent(currentPage)
          ) : (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) =>
              renderPageContent(pageNum)
            )
          )}
        </div>

        {/* DEDICATED PRINT CONTAINER (Hidden on screen, rendered cleanly for print) */}
        <div className="hidden print:block jadhagam-print-container">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) =>
            renderPageContent(pageNum)
          )}
        </div>

        {/* Bottom Modal Action Bar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-amber-500/30 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 print:hidden">
          <div className="flex items-center gap-2 text-[11px] text-amber-300/80">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {selectedFormat === '35_a5_landscape'
                ? isTa ? 'வடிவம்: 35 A5 Landscape (210×148 மி.மீ) - சுருள் பைண்டிங் நூல்' : 'Format: 35 A5 Landscape (210×148mm) - Spiral Binding'
                : selectedFormat === '35_a5_portrait'
                ? isTa ? 'வடிவம்: 35 A5 Portrait (148×210 மி.மீ) - கையேடு பதிப்பு' : 'Format: 35 A5 Portrait (148×210mm) - Pocketbook'
                : isTa ? 'வடிவம்: 16 A4 Portrait (210×297 மி.மீ) - முழு அளவிலான நூல்' : 'Format: 16 A4 Portrait (210×297mm) - Deluxe Edition'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTa ? 'கோப்பாகப் பதிவிறக்கு (.html)' : 'Download HTML'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded font-medium transition-colors cursor-pointer"
            >
              {isTa ? 'மூடுக' : 'Close'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{isTa ? 'அச்சிடுக' : 'Print Book'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
