import React, { useState, useEffect } from 'react';
import {
  Users,
  HeartHandshake,
  Flame,
  PlusCircle,
  Save,
  FileText,
  BookOpen,
  CalendarDays,
  Clock,
  Sparkles,
  RotateCcw,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Printer,
} from 'lucide-react';
import { BirthData, ComputedHoroscope, Gender, Language } from '../types/astrology';
import { SOUTH_INDIAN_PLACES, formatAstroCoords } from '../data/places';
import { computeHoroscope } from '../utils/astrologyEngine';
import { SouthIndianChart } from './SouthIndianChart';
import { PlanetaryAspectsTable } from './PlanetaryAspectsTable';
import { BhavaPhalasSection } from './BhavaPhalasSection';
import { VastuShastraSection } from './VastuShastraSection';
import { TiruvannamalaiGuideSection } from './TiruvannamalaiGuideSection';
import { HeritageBioSection } from './HeritageBioSection';
import { FaqSection } from './FaqSection';

interface AstroCompanionProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAstrobase: () => void;
  onOpenCompatibility: () => void;
  onOpenMuhurtham: () => void;
  onOpenPanchangam: () => void;
  onOpenKuripu: (horoscope: ComputedHoroscope) => void;
  onOpenJadhagam: (horoscope: ComputedHoroscope, format?: '35_a5_landscape' | '35_a5_portrait' | '16_a4_portrait') => void;
  onOpenPrintSelector: (horoscope: ComputedHoroscope) => void;
  onOpenBooking: () => void;
  onOpenLocation: () => void;
  onSaveToAstrobase: (data: BirthData) => void;
  savedProfiles: BirthData[];
  selectedProfileId: string | null;
  onSelectProfile: (id: string) => void;
}

export const AstroCompanion: React.FC<AstroCompanionProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenAstrobase,
  onOpenCompatibility,
  onOpenMuhurtham,
  onOpenPanchangam,
  onOpenKuripu,
  onOpenJadhagam,
  onOpenPrintSelector,
  onOpenBooking,
  onOpenLocation,
  onSaveToAstrobase,
  savedProfiles,
  selectedProfileId,
  onSelectProfile,
}) => {
  const isTa = currentLanguage === 'ta';

  // Default initial data for Theni / Tiruvannamalai
  const initialPlace = SOUTH_INDIAN_PLACES.find((p) => p.name === 'Theni') || SOUTH_INDIAN_PLACES[0];

  const [name, setName] = useState('மு. மாதவ்');
  const [gender, setGender] = useState<Gender>('male');
  const [dob, setDob] = useState('2026-11-10');
  const [tob, setTob] = useState('18:32:12'); // 06:32:12 PM
  const [selectedPlaceName, setSelectedPlaceName] = useState('Theni');
  const [latitude, setLatitude] = useState(initialPlace.latitude);
  const [longitude, setLongitude] = useState(initialPlace.longitude);
  const [timezone, setTimezone] = useState(5.5);
  const [dst, setDst] = useState(0);
  const [fatherName, setFatherName] = useState('முத்துக்கிருஷ்ணன்');
  const [motherName, setMotherName] = useState('சாந்தி');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Update when place changes
  const handlePlaceSelect = (placeName: string) => {
    setSelectedPlaceName(placeName);
    const p = SOUTH_INDIAN_PLACES.find((x) => x.name === placeName);
    if (p) {
      setLatitude(p.latitude);
      setLongitude(p.longitude);
      setTimezone(p.timezone);
    }
  };

  // Set "Now" button: current real date & time
  const handleSetNow = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    setDob(`${yyyy}-${mm}-${dd}`);

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    setTob(`${hh}:${min}:${ss}`);
  };

  // Reset / New button
  const handleNew = () => {
    setName('');
    setFatherName('');
    setMotherName('');
    handleSetNow();
  };

  // Delete button
  const handleDelete = () => {
    if (window.confirm(isTa ? 'தகவல்களை அழிக்க விரும்புகிறீர்களா?' : 'Clear current form data?')) {
      setName('');
      setFatherName('');
      setMotherName('');
      setGender('male');
    }
  };

  // Save to Astrobase
  const handleSave = () => {
    const birthData: BirthData = {
      id: selectedProfileId || `profile_${Date.now()}`,
      name: name || (isTa ? 'பெயரிடப்படாதவர்' : 'Unnamed Profile'),
      gender,
      dob,
      tob,
      pob: selectedPlaceName,
      latitude,
      longitude,
      timezone,
      dst,
      fatherName,
      motherName,
      createdAt: new Date().toISOString(),
    };
    onSaveToAstrobase(birthData);
    setSaveSuccessMsg(isTa ? 'குடும்ப ஜாதகத்தில் சேமிக்கப்பட்டது!' : 'Saved to Astrobase!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Synchronize when a saved profile is selected
  useEffect(() => {
    if (selectedProfileId) {
      const p = savedProfiles.find((x) => x.id === selectedProfileId);
      if (p) {
        setName(p.name);
        setGender(p.gender);
        setDob(p.dob);
        setTob(p.tob);
        setSelectedPlaceName(p.pob);
        setLatitude(p.latitude);
        setLongitude(p.longitude);
        setTimezone(p.timezone);
        setDst(p.dst || 0);
        setFatherName(p.fatherName || '');
        setMotherName(p.motherName || '');
      }
    }
  }, [selectedProfileId, savedProfiles]);

  // Compute live active horoscope
  const currentBirthData: BirthData = {
    id: selectedProfileId || 'current',
    name: name || (isTa ? 'ஜாதகர்' : 'Native'),
    gender,
    dob,
    tob,
    pob: selectedPlaceName,
    latitude,
    longitude,
    timezone,
    dst,
    fatherName,
    motherName,
    createdAt: new Date().toISOString(),
  };

  const computed = computeHoroscope(currentBirthData);
  const coordsFormatted = formatAstroCoords(latitude, longitude, timezone);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top 3 Interactive Modules from Image 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* 1. குடும்ப ஜாதகம் Astrobase */}
        <button
          onClick={onOpenAstrobase}
          className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 text-white shadow-md hover:shadow-lg transition-all border border-sky-400/40 text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-pink-600/90 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold tracking-tight font-serif truncate">
              {isTa ? 'குடும்ப ஜாதகம் Astrobase' : 'Family Astrobase'}
            </h3>
            <p className="text-xs text-sky-100/80 truncate">
              {isTa ? 'சேமிக்கப்பட்ட ஜாதகங்கள் & மேலாண்மை' : 'Saved Family Horoscopes Database'}
            </p>
          </div>
        </button>

        {/* 2. திருமணப்பொருத்தம் Compatibility */}
        <button
          onClick={onOpenCompatibility}
          className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white shadow-md hover:shadow-lg transition-all border border-emerald-400/40 text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold tracking-tight font-serif truncate">
              {isTa ? 'திருமணப்பொருத்தம் Compatibility' : 'Marriage Compatibility'}
            </h3>
            <p className="text-xs text-emerald-100/80 truncate">
              {isTa ? '10 பொருத்தங்கள் & தோஷ ஆய்வு' : '10 Poruthams & Dosha Matching'}
            </p>
          </div>
        </button>

        {/* 3. முகூர்த்தம் Muhurtham */}
        <button
          onClick={onOpenMuhurtham}
          className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 text-stone-950 shadow-md hover:shadow-lg transition-all border border-amber-300/60 text-left cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-700" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold tracking-tight font-serif truncate">
              {isTa ? 'முகூர்த்தம் Muhurtham' : 'Auspicious Muhurtham'}
            </h3>
            <p className="text-xs text-stone-900/80 truncate">
              {isTa ? 'திருமணம், கிரகப்பிரவேசம் சுப நேரம்' : 'Wedding & Housewarming Dates'}
            </p>
          </div>
        </button>
      </div>

      {/* Main Astrologer Form & Console (Faithfully crafted from Image 3) */}
      <div className="bg-stone-900/95 border-2 border-amber-500/40 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 text-amber-100">
        {/* Fieldset Section Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <h2 className="text-lg font-bold text-amber-300 font-serif">
              {isTa ? 'ஜாதகம் (Horoscope Input)' : 'Horoscope Input Console'}
            </h2>
          </div>
          {saveSuccessMsg && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}
        </div>

        {/* Input Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-xs sm:text-sm">
          {/* Row 1: பெயர் (Name) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
              {isTa ? 'பெயர்:' : 'Name:'}
            </label>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isTa ? 'ஜாதகரின் பெயர்' : "Native's name"}
                className="flex-1 bg-stone-950/90 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400 font-medium"
              />
              {savedProfiles.length > 0 && (
                <select
                  value={selectedProfileId || ''}
                  onChange={(e) => onSelectProfile(e.target.value)}
                  className="bg-stone-950/90 border border-amber-500/30 rounded-md px-2 py-1.5 text-amber-200 text-xs focus:outline-hidden"
                  title={isTa ? 'சேமித்த ஜாதகம் தேர்வு' : 'Select saved profile'}
                >
                  <option value="">{isTa ? '— தேர்வு —' : '— Load —'}</option>
                  {savedProfiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.dob})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Row 2: பாலினம் (Gender) + Delete button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-amber-300/90 whitespace-nowrap sm:w-28">
                {isTa ? 'பாலினம்:' : 'Gender:'}
              </span>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-amber-100">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="accent-amber-500 w-4 h-4"
                />
                <span>{isTa ? 'ஆண்' : 'Male'}</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-amber-100">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="accent-rose-500 w-4 h-4"
                />
                <span>{isTa ? 'பெண்' : 'Female'}</span>
              </label>
            </div>

            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs transition-colors self-start sm:self-auto flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>

          {/* Row 3: பிறந்த தேதி (Date of Birth) + Now Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
              {isTa ? 'பிறந்த தேதி:' : 'Date of Birth:'}
            </label>
            <div className="flex-1 flex gap-2">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="flex-1 bg-stone-950/90 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 focus:outline-hidden focus:border-amber-400 font-mono"
              />
              <button
                type="button"
                onClick={handleSetNow}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded text-xs transition-colors shrink-0"
              >
                Now
              </button>
            </div>
          </div>

          {/* Row 4: பிறந்த நேரம் (Time of Birth) + DST */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
              {isTa ? 'பிறந்த நேரம்:' : 'Birth Time:'}
            </label>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="time"
                step="1"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="flex-1 bg-stone-950/90 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 focus:outline-hidden focus:border-amber-400 font-mono"
              />
              <div className="flex items-center gap-1 bg-stone-950 px-2 py-1 rounded border border-amber-500/20 text-xs">
                <span className="text-stone-400">- dst +</span>
                <input
                  type="number"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={dst}
                  onChange={(e) => setDst(parseFloat(e.target.value) || 0)}
                  className="w-12 bg-transparent text-center font-mono text-amber-300 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Row 5: பிறந்த ஊர் (Birth Place) with Coordinates line */}
          <div className="md:col-span-2 flex flex-col gap-1.5 bg-stone-950/60 p-3 rounded-lg border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
                {isTa ? 'பிறந்த ஊர்:' : 'Birth Place:'}
              </label>
              <select
                value={selectedPlaceName}
                onChange={(e) => handlePlaceSelect(e.target.value)}
                className="flex-1 bg-stone-900 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 focus:outline-hidden focus:border-amber-400 font-medium"
              >
                {SOUTH_INDIAN_PLACES.map((p) => (
                  <option key={p.name} value={p.name}>
                    {isTa ? p.nameTa : p.name} ({p.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Coordinates line (அ: 09:57வ. ரே: 77:22கி +05:30ம) */}
            <div className="text-center sm:text-right text-xs font-mono text-amber-300/90 pr-1">
              <span>{coordsFormatted}</span>
            </div>
          </div>

          {/* Row 6: அப்பா பெயர் (Father's Name) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
              {isTa ? 'அப்பா பெயர்:' : "Father's Name:"}
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder={isTa ? 'தந்தை பெயர்' : "Father's name"}
              className="flex-1 bg-stone-950/90 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 focus:outline-hidden focus:border-amber-400 font-medium"
            />
          </div>

          {/* Row 7: அம்மா பெயர் (Mother's Name) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-28 font-semibold text-amber-300/90 whitespace-nowrap">
              {isTa ? 'அம்மா பெயர்:' : "Mother's Name:"}
            </label>
            <input
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder={isTa ? 'தாய் பெயர்' : "Mother's name"}
              className="flex-1 bg-stone-950/90 border border-amber-500/30 rounded-md px-3 py-1.5 text-amber-100 focus:outline-hidden focus:border-amber-400 font-medium"
            />
          </div>
        </div>

        {/* Action Buttons Toolbar from Image 3 */}
        <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center gap-2.5">
          {/* ஜோதிட நண்பன் Brand Badge */}
          <div className="px-3 py-2 bg-emerald-800 text-emerald-100 font-bold text-xs sm:text-sm rounded-lg flex items-center gap-1.5 border border-emerald-400/40">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{isTa ? 'ஜோதிட நண்பன்' : 'Jothida Nanban'}</span>
          </div>

          {/* புதிய (New) */}
          <button
            onClick={handleNew}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-stone-950" />
            <span>{isTa ? 'புதிய' : 'New'}</span>
          </button>

          {/* சேமி (Save) */}
          <button
            onClick={handleSave}
            className="px-3.5 py-2 bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4 text-purple-200" />
            <span>{isTa ? 'சேமி' : 'Save'}</span>
          </button>

          {/* குறிப்பு (Kuripu - STRICTLY 1 PAGE) */}
          <button
            onClick={() => onOpenKuripu(computed)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-extrabold text-xs sm:text-sm rounded-lg transition-all shadow-sm ring-1 ring-cyan-400 flex items-center gap-1.5 cursor-pointer"
            title={isTa ? 'ஒற்றைப் பக்க ஜாதகக் குறிப்பு (1 Page strictly)' : '1 Page Kuripu Summary'}
          >
            <FileText className="w-4 h-4 text-stone-950" />
            <span>{isTa ? 'குறிப்பு (1 பக்கம்)' : 'Kuripu (1 Page)'}</span>
          </button>

          {/* ஜாதகம் (Jadhagam - 35 A5 Land, 35 A5 Port, 16 A4 Port) */}
          <button
            onClick={() => onOpenJadhagam(computed)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs sm:text-sm rounded-lg transition-all shadow-md ring-1 ring-emerald-300 flex items-center gap-1.5 cursor-pointer"
            title={isTa ? 'முழு ஜாதக புத்தகம் (35 A5 / 16 A4 அச்சிடும் வசதி)' : 'Full Jadhagam Book (35 A5 / 16 A4)'}
          >
            <BookOpen className="w-4 h-4 text-stone-950" />
            <span>{isTa ? 'ஜாதகம் (முழு நூல்)' : 'Jadhagam (Book)'}</span>
          </button>

          {/* 🖨️ அச்சுப் பலகை (Print Options Hub) */}
          <button
            onClick={() => onOpenPrintSelector(computed)}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm rounded-lg transition-all shadow-md ring-1 ring-amber-400 flex items-center gap-1.5 cursor-pointer animate-pulse"
            title={isTa ? 'அனைத்து அச்சு வடிவங்களும் (1 Page Kuripu / 35 A5 / 16 A4)' : 'All Print Formats'}
          >
            <Printer className="w-4 h-4 text-stone-950" />
            <span>{isTa ? '🖨️ அச்சிடுக (Print)' : '🖨️ Print Hub'}</span>
          </button>

          {/* பஞ்சாங்கம் (Panchangam) */}
          <button
            onClick={onOpenPanchangam}
            className="px-3.5 py-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CalendarDays className="w-4 h-4 text-stone-950" />
            <span>{isTa ? 'பஞ்சாங்கம்' : 'Panchangam'}</span>
          </button>

          {/* Language Toggle in Toolbar */}
          <div className="ml-auto flex items-center rounded-lg overflow-hidden border border-amber-500/30 text-xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                !isTa ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-3 py-1.5 font-semibold transition-colors ${
                isTa ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Quick Print Action Strip */}
      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-stone-950 via-amber-950/80 to-stone-950 border-2 border-amber-500/40 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs sm:text-sm text-amber-200 block font-serif">
              {isTa ? 'விரைவு அச்சு மையம் (Quick Print Options):' : 'Quick Astrological Print Center:'}
            </span>
            <span className="text-[10px] text-stone-400 block">
              {isTa ? 'ஒரே கிளிக்கில் அச்சிடும் அல்லது PDF ஆக பதிவிறக்கும் வசதி' : 'One-click direct print & PDF generation'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Print: 1-Page Kuripu */}
          <button
            onClick={() => onOpenKuripu(computed)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isTa ? 'குறிப்பு (1 Page)' : '1-Page Kuripu'}</span>
          </button>

          {/* Quick Print: 35 A5 Land */}
          <button
            onClick={() => onOpenJadhagam(computed, '35_a5_landscape')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isTa ? '35 A5 Landscape' : '35 A5 Land'}</span>
          </button>

          {/* Quick Print: 35 A5 Port */}
          <button
            onClick={() => onOpenJadhagam(computed, '35_a5_portrait')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isTa ? '35 A5 Portrait' : '35 A5 Port'}</span>
          </button>

          {/* Quick Print: 16 A4 Port */}
          <button
            onClick={() => onOpenJadhagam(computed, '16_a4_portrait')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isTa ? '16 A4 Portrait' : '16 A4 Port'}</span>
          </button>

          {/* Print Screen */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-600 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isTa ? 'திரை அச்சு' : 'Print Screen'}</span>
          </button>
        </div>
      </div>

      {/* Live Astrological Output Section */}
      <div className="space-y-6">
        {/* Panchanga & Astrological Vital Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'லக்னம் (Lagnam)' : 'Ascendant (Lagna)'}
            </span>
            <div className="text-base font-extrabold text-amber-950 mt-0.5">
              {isTa ? computed.lagna.rasiNameTa : computed.lagna.rasiName}
            </div>
            <span className="text-[10px] text-stone-600 font-mono">
              {computed.lagna.degreeFormatted}
            </span>
          </div>

          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'ராசி (Janma Rasi)' : 'Moon Sign (Rasi)'}
            </span>
            <div className="text-base font-extrabold text-amber-950 mt-0.5">
              {isTa
                ? computed.planets.find((p) => p.name === 'Moon')?.rasiNameTa
                : computed.planets.find((p) => p.name === 'Moon')?.rasiName}
            </div>
            <span className="text-[10px] text-stone-600">
              {isTa ? 'சந்திரனின் இருப்பிடம்' : 'Chandra Sthanam'}
            </span>
          </div>

          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'நட்சத்திரம் (Star)' : 'Birth Star'}
            </span>
            <div className="text-base font-extrabold text-amber-950 mt-0.5 truncate">
              {isTa ? computed.nakshatra.nameTa : computed.nakshatra.name}
            </div>
            <span className="text-[10px] text-amber-900 font-semibold">
              {isTa ? `பாதம்: ${computed.nakshatra.pada}` : `Pada: ${computed.nakshatra.pada}`}
            </span>
          </div>

          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'திதி (Thithi)' : 'Lunar Day'}
            </span>
            <div className="text-base font-extrabold text-amber-950 mt-0.5 truncate">
              {isTa ? computed.thithi.nameTa : computed.thithi.name}
            </div>
            <span className="text-[10px] text-stone-600 truncate block">
              {isTa ? computed.thithi.pakshaTa : computed.thithi.paksha}
            </span>
          </div>

          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'யோகம் & கரணம்' : 'Yoga & Karana'}
            </span>
            <div className="text-sm font-bold text-amber-950 mt-0.5 truncate">
              {computed.yogam.name}
            </div>
            <span className="text-[10px] text-stone-600 truncate block">
              {computed.karanam.name}
            </span>
          </div>

          <div className="bg-amber-100/90 border border-amber-300/80 p-3 rounded-xl text-stone-900 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-800 uppercase block">
              {isTa ? 'நடப்பு தசாபுத்தி' : 'Current Dasa Bukthi'}
            </span>
            <div className="text-sm font-extrabold text-rose-800 mt-0.5 truncate">
              {isTa
                ? `${computed.currentDasaBukthi.dasaLordTa} - ${computed.currentDasaBukthi.bukthiLordTa}`
                : `${computed.currentDasaBukthi.dasaLord} - ${computed.currentDasaBukthi.bukthiLord}`}
            </div>
            <span className="text-[10px] text-stone-600 font-mono">
              {computed.currentDasaBukthi.endDate} வரை
            </span>
          </div>
        </div>

        {/* Charts & Planetary Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* South Indian Rasi Chart */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-amber-300/70 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-amber-200 pb-2">
              <h3 className="font-bold text-amber-950 font-serif text-sm sm:text-base">
                {isTa ? 'ராசி கட்டம் (Rasi Chart)' : 'Rasi Chart (D1)'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                {isTa ? 'நிராயன முறை' : 'Nirayana'}
              </span>
            </div>
            <SouthIndianChart
              title="ராசி"
              titleSub={isTa ? 'மாதவ் ஜோதிடம்' : 'Madhav Jodhida'}
              planetsByRasi={computed.rasiChart}
            />
          </div>

          {/* South Indian Navamsa Chart */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-amber-300/70 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-amber-200 pb-2">
              <h3 className="font-bold text-amber-950 font-serif text-sm sm:text-base">
                {isTa ? 'நவாம்ச கட்டம் (Navamsa Chart)' : 'Navamsa Chart (D9)'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                {isTa ? 'தாம்பத்திய பலன்' : 'D9 Varga'}
              </span>
            </div>
            <SouthIndianChart
              title="நவாம்சம்"
              titleSub={isTa ? 'மாதவ் ஜோதிடம்' : 'Madhav Jodhida'}
              planetsByRasi={computed.navamsaChart}
            />
          </div>

          {/* Graha Sphutam / Planetary Table */}
          <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-amber-300/70 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h3 className="font-bold text-amber-950 font-serif text-sm sm:text-base">
                {isTa ? 'கிரக பாதசார அட்டவணை' : 'Planetary Longitudes'}
              </h3>
              <span className="text-[10px] text-stone-500">
                {isTa ? 'சித்ரபக்ஷ லாகிரி' : 'Lahiri Ayanamsha'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-amber-300/70 bg-amber-50 text-amber-950 font-semibold text-[11px]">
                    <th className="py-1 px-1.5">{isTa ? 'கிரகம்' : 'Planet'}</th>
                    <th className="py-1 px-1.5">{isTa ? 'ராசி' : 'Rasi'}</th>
                    <th className="py-1 px-1.5">{isTa ? 'பாகை' : 'Deg'}</th>
                    <th className="py-1 px-1.5">{isTa ? 'நட்சத்திரம்' : 'Star'}</th>
                    <th className="py-1 px-1.5">{isTa ? 'நிலை' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-[11px]">
                  {/* Lagna first */}
                  <tr className="bg-amber-100/50 font-semibold text-rose-950">
                    <td className="py-1 px-1.5">{isTa ? 'லக்னம்' : 'Lagna'}</td>
                    <td className="py-1 px-1.5">{isTa ? computed.lagna.rasiNameTa : computed.lagna.rasiName}</td>
                    <td className="py-1 px-1.5 font-mono">{computed.lagna.degreeFormatted}</td>
                    <td className="py-1 px-1.5">{isTa ? `${computed.lagna.nakshatraNameTa} - ${computed.lagna.pada}` : `${computed.lagna.nakshatraName} - ${computed.lagna.pada}`}</td>
                    <td className="py-1 px-1.5 text-stone-600">—</td>
                  </tr>

                  {computed.planets.map((p) => (
                    <tr key={p.name} className="hover:bg-amber-50/60">
                      <td className="py-1 px-1.5 font-semibold text-stone-900 flex items-center gap-1">
                        <span>{isTa ? p.nameTa : p.name}</span>
                        {p.isRetrograde && (
                          <span className="text-[9px] text-red-600 font-bold" title="வக்கிர கதி (Retrograde)">
                            [வ]
                          </span>
                        )}
                      </td>
                      <td className="py-1 px-1.5 text-stone-700">{isTa ? p.rasiNameTa : p.rasiName}</td>
                      <td className="py-1 px-1.5 font-mono text-stone-800">{p.degreeFormatted}</td>
                      <td className="py-1 px-1.5 text-stone-700">
                        {isTa ? `${p.nakshatraNameTa} - ${p.pada}` : `${p.nakshatraName} - ${p.pada}`}
                      </td>
                      <td className="py-1 px-1.5 font-medium">
                        <span
                          className={`text-[10px] px-1 py-0.5 rounded ${
                            p.avastha === 'Uchcham'
                              ? 'bg-emerald-100 text-emerald-800 font-bold'
                              : p.avastha === 'Aatchi'
                              ? 'bg-blue-100 text-blue-800 font-bold'
                              : p.avastha === 'Neecham'
                              ? 'bg-rose-100 text-rose-800 font-bold'
                              : 'text-stone-600'
                          }`}
                        >
                          {isTa ? p.avasthaTa : p.avastha}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Birth Dasa Balance Box */}
            <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
              <span className="font-bold text-amber-950 block">
                {isTa ? 'பிறந்த இருப்பு தசாபுத்தி:' : 'Janma Dasa Balance at Birth:'}
              </span>
              <p className="text-stone-800 font-medium mt-0.5">
                {isTa
                  ? `${computed.dasaBalance.lordTa} மகா தசை இருப்பு: ${computed.dasaBalance.years} வருடங்கள், ${computed.dasaBalance.months} மாதங்கள், ${computed.dasaBalance.days} நாட்கள்.`
                  : `${computed.dasaBalance.lord} Dasa balance: ${computed.dasaBalance.years} yrs, ${computed.dasaBalance.months} mos, ${computed.dasaBalance.days} days.`}
              </p>
            </div>
          </div>
        </div>

        {/* Dosha & Lucky Factors Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Doshas Card */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <h4 className="font-bold text-amber-950 text-sm mb-2 flex items-center gap-1.5">
              <span>{isTa ? 'தோஷ நிர்ணயம் & பரிகாரம்' : 'Dosha Analysis & Pariharam'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-stone-900">
                    {isTa ? 'செவ்வாய் தோஷம்:' : 'Kuja / Manglik Dosha:'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      computed.doshas.kujaDosha.hasDosha
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {computed.doshas.kujaDosha.hasDosha
                      ? isTa
                        ? 'தோஷம் உண்டு'
                        : 'Present'
                      : isTa
                      ? 'தோஷம் இல்லை'
                      : 'None'}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {isTa ? computed.doshas.kujaDosha.descriptionTa : computed.doshas.kujaDosha.description}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-stone-900">
                    {isTa ? 'ராகு - கேது தோஷம்:' : 'Rahu - Ketu Dosha:'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      computed.doshas.rahuKetuDosha.hasDosha
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {computed.doshas.rahuKetuDosha.hasDosha
                      ? isTa
                        ? 'ஆலோசனை தேவை'
                        : 'Present'
                      : isTa
                      ? 'சுப நிலை'
                      : 'Clear'}
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {isTa ? computed.doshas.rahuKetuDosha.descriptionTa : computed.doshas.rahuKetuDosha.description}
                </p>
              </div>
            </div>
          </div>

          {/* Lucky Factors Card */}
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
            <h4 className="font-bold text-amber-950 text-sm mb-2">
              {isTa ? 'அதிர்ஷ்ட யோகக் குறிப்புகள்' : 'Auspicious Factors & Remedies'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60">
                <span className="text-[10px] text-stone-500 block">
                  {isTa ? 'அதிர்ஷ்ட ரத்தினம்' : 'Lucky Gemstone'}
                </span>
                <span className="font-bold text-amber-950">
                  {isTa ? computed.luckyFactors.gemstoneTa : computed.luckyFactors.gemstone}
                </span>
              </div>
              <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60">
                <span className="text-[10px] text-stone-500 block">
                  {isTa ? 'அதிர்ஷ்ட நிறம்' : 'Lucky Color'}
                </span>
                <span className="font-bold text-amber-950">
                  {isTa ? computed.luckyFactors.colorTa : computed.luckyFactors.color}
                </span>
              </div>
              <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60">
                <span className="text-[10px] text-stone-500 block">
                  {isTa ? 'அதிர்ஷ்ட எண்' : 'Lucky Number'}
                </span>
                <span className="font-bold text-amber-950 font-mono text-sm">
                  {computed.luckyFactors.number}
                </span>
              </div>
              <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60">
                <span className="text-[10px] text-stone-500 block">
                  {isTa ? 'சுப திசை' : 'Auspicious Direction'}
                </span>
                <span className="font-bold text-amber-950">
                  {isTa ? computed.luckyFactors.directionTa : computed.luckyFactors.direction}
                </span>
              </div>
              <div className="col-span-2 p-2 rounded bg-amber-100/60 border border-amber-300/80">
                <span className="text-[10px] text-amber-800 block">
                  {isTa ? 'வணங்க வேண்டிய இஷ்ட தெய்வம்' : 'Worship Deity'}
                </span>
                <span className="font-extrabold text-amber-950">
                  {isTa ? computed.luckyFactors.deityTa : computed.luckyFactors.deity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Planetary Karakas & Aspects Table (Graha Dhrishti) */}
        <PlanetaryAspectsTable
          horoscope={computed}
          currentLanguage={currentLanguage}
        />

        {/* 2. Detailed 12 Bhavas (12 பாவங்களின் முழு பலன்கள்) */}
        <BhavaPhalasSection
          horoscope={computed}
          currentLanguage={currentLanguage}
        />

        {/* 3. Manaiyadi Shastra & Vastu Consultation Guide */}
        <VastuShastraSection
          currentLanguage={currentLanguage}
          onOpenBooking={onOpenBooking}
        />

        {/* 4. Sacred Tiruvannamalai Ashta Lingam & Kubera Lingam Guide */}
        <TiruvannamalaiGuideSection
          currentLanguage={currentLanguage}
          onOpenLocation={onOpenLocation}
        />

        {/* 5. Malamanjanur Lineage Heritage History */}
        <HeritageBioSection
          currentLanguage={currentLanguage}
        />

        {/* 6. Comprehensive Astrological FAQs & Guidance */}
        <FaqSection
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
};
