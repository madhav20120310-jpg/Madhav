import React, { useState } from 'react';
import { X, Search, UserCheck, Trash2, Download, Upload, PlusCircle, Users } from 'lucide-react';
import { BirthData, Language } from '../types/astrology';

interface AstrobaseModalProps {
  currentLanguage: Language;
  savedProfiles: BirthData[];
  onSelectProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
  onImportProfiles: (profiles: BirthData[]) => void;
  onClose: () => void;
}

export const AstrobaseModal: React.FC<AstrobaseModalProps> = ({
  currentLanguage,
  savedProfiles,
  onSelectProfile,
  onDeleteProfile,
  onImportProfiles,
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = savedProfiles.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.pob.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.fatherName && p.fatherName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedProfiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'madhav_astrobase_profiles.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportProfiles(parsed);
          }
        } catch {
          alert(isTa ? 'கோப்பு ஏற்றுவதில் பிழை ஏற்பட்டது.' : 'Error reading JSON file');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-900 to-indigo-950 border-b border-sky-400/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-serif">
                {isTa ? 'குடும்ப ஜாதகம் Astrobase' : 'Family Astrobase Database'}
              </h3>
              <p className="text-[11px] text-sky-200">
                {isTa ? 'சேமிக்கப்பட்ட குடும்ப உறுப்பினர்களின் ஜாதகப் பட்டியல்' : 'Saved Family Horoscopes Repository'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-3 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTa ? 'பெயர் அல்லது ஊர் தேடுக...' : 'Search by name or place...'}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-amber-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded transition-colors"
              title="JSON ஆக ஏற்றுமதி செய்க"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isTa ? 'ஏற்றுமதி' : 'Export'}</span>
            </button>
            <label className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{isTa ? 'இறக்குமதி' : 'Import'}</span>
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Profile List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              <Users className="w-8 h-8 mx-auto text-stone-600 mb-2" />
              <p>{isTa ? 'ஜாதகங்கள் எதுவும் சேமிக்கப்படவில்லை.' : 'No profiles found.'}</p>
              <p className="text-[10px] text-stone-500 mt-1">
                {isTa
                  ? 'முதன்மை பக்கத்தில் "சேமி" பட்டனை அழுத்தி குடும்ப ஜாதகங்களை இங்கு சேர்க்கவும்.'
                  : 'Click "Save" on the main screen to add profiles here.'}
              </p>
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-950/80 border border-amber-500/20 hover:border-amber-400/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-amber-200 truncate">{p.name}</h4>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        p.gender === 'male' ? 'bg-sky-900/60 text-sky-200' : 'bg-rose-900/60 text-rose-200'
                      }`}
                    >
                      {p.gender === 'male' ? (isTa ? 'ஆண்' : 'Male') : (isTa ? 'பெண்' : 'Female')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-stone-400 mt-1 font-mono">
                    <span>{p.dob}</span>
                    <span>·</span>
                    <span>{p.tob}</span>
                    <span>·</span>
                    <span className="text-amber-300/80">{p.pob}</span>
                  </div>
                  {p.fatherName && (
                    <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                      {isTa ? 'தந்தை:' : 'Father:'} {p.fatherName}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectProfile(p.id);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isTa ? 'தேர்வு' : 'Load'}</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(isTa ? `"${p.name}" ஜாதகத்தை நீக்கவா?` : `Delete "${p.name}"?`)) {
                        onDeleteProfile(p.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-400 rounded hover:bg-stone-800 transition-colors"
                    title={isTa ? 'நீக்குக' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
