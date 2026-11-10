import React from 'react';
import { PlanetPosition } from '../types/astrology';

interface SouthIndianChartProps {
  title: string;
  titleSub?: string;
  planetsByRasi: { [rasiIndex: number]: PlanetPosition[] };
  compact?: boolean;
  size?: 'compact' | 'medium' | 'standard';
  highlightLagna?: boolean;
}

// Fixed South Indian chart layout indices in 4x4 matrix:
// [11, 0,  1, 2]
// [10, C,  C, 3]
// [9,  C,  C, 4]
// [8,  7,  6, 5]

const RASI_TAMIL_NAMES: { [key: number]: string } = {
  0: 'மேஷம்',
  1: 'ரிஷபம்',
  2: 'மிதுனம்',
  3: 'கடகம்',
  4: 'சிம்மம்',
  5: 'கன்னி',
  6: 'துலாம்',
  7: 'விருச்சிகம்',
  8: 'தனுசு',
  9: 'மகரம்',
  10: 'கும்பம்',
  11: 'மீனம்',
};

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  title,
  titleSub,
  planetsByRasi,
  compact = false,
  size,
}) => {
  const chartSize = size || (compact ? 'compact' : 'standard');

  const renderCell = (rasiIdx: number) => {
    const planets = planetsByRasi[rasiIdx] || [];
    const rasiName = RASI_TAMIL_NAMES[rasiIdx];

    return (
      <div
        key={rasiIdx}
        className={`relative flex flex-col justify-between border border-amber-800/40 bg-amber-50/70 transition-colors hover:bg-amber-100/60 ${
          chartSize === 'compact'
            ? 'min-h-[30px] p-0.5 text-[8px]'
            : chartSize === 'medium'
            ? 'min-h-[46px] p-1 text-[9px]'
            : 'min-h-[85px] p-1.5 text-xs'
        }`}
      >
        {/* Rasi Name label in corner */}
        <span className={`font-semibold text-amber-900/60 tracking-wider ${
          chartSize === 'compact' ? 'text-[7.5px]' : chartSize === 'medium' ? 'text-[8.5px]' : 'text-[10px]'
        }`}>
          {rasiName}
        </span>

        {/* Planet badges inside this Rasi */}
        <div className={`flex flex-wrap items-center content-center ${chartSize === 'compact' ? 'gap-0.5 py-0.5' : 'gap-1 py-1'}`}>
          {planets.map((p) => {
            const isLagna = p.name === 'Lagnam';
            return (
              <span
                key={p.name}
                className={`inline-flex items-center rounded font-bold transition-transform ${
                  isLagna
                    ? 'bg-rose-700 text-amber-50 shadow-xs ring-1 ring-rose-900 font-extrabold'
                    : 'bg-amber-950/10 text-stone-900 border border-amber-900/20'
                } ${chartSize === 'compact' ? 'text-[7px] px-0.5 py-0' : chartSize === 'medium' ? 'text-[8.5px] px-1 py-0.5' : 'text-[11px] px-1 py-0.5'}`}
                title={`${p.nameTa} (${p.degreeFormatted})`}
              >
                {p.symbol}
                {chartSize !== 'compact' && p.degreesInRasi !== undefined && (
                  <span className="ml-0.5 text-[7.5px] opacity-75 font-mono">
                    {Math.floor(p.degreesInRasi)}°
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full mx-auto select-none ${
      chartSize === 'compact' ? 'max-w-[210px]' : chartSize === 'medium' ? 'max-w-[340px]' : 'max-w-[440px]'
    }`}>
      <div className="grid grid-cols-4 grid-rows-4 border-2 border-amber-900 bg-amber-900/10 shadow-sm rounded-sm overflow-hidden aspect-square">
        {/* Row 1: Meenam (11), Mesham (0), Rishabham (1), Mithunam (2) */}
        {renderCell(11)}
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}

        {/* Row 2: Kumbam (10), Center (col-span-2 row-span-2), Kadagam (3) */}
        {renderCell(10)}

        {/* Center Box for Title */}
        <div className={`col-span-2 row-span-2 flex flex-col items-center justify-center border border-amber-800/40 bg-amber-100/90 text-center shadow-inner ${
          chartSize === 'compact' ? 'p-1' : chartSize === 'medium' ? 'p-1.5' : 'p-2'
        }`}>
          <div className={`rounded-full border border-amber-700/40 flex items-center justify-center bg-amber-50 ${
            chartSize === 'compact' ? 'w-5 h-5 mb-0.5' : chartSize === 'medium' ? 'w-7 h-7 mb-0.5' : 'w-8 h-8 mb-1'
          }`}>
            <span className={`text-amber-800 font-serif font-bold ${chartSize === 'compact' ? 'text-[10px]' : 'text-xs'}`}>ௐ</span>
          </div>
          <span className={`font-bold text-amber-950 font-serif tracking-wide ${
            chartSize === 'compact' ? 'text-[11px]' : chartSize === 'medium' ? 'text-sm' : 'text-base md:text-lg'
          }`}>
            {title}
          </span>
          {titleSub && (
            <span className={`text-amber-900/80 font-medium ${chartSize === 'compact' ? 'text-[7.5px]' : 'text-[9px] mt-0.5'}`}>
              {titleSub}
            </span>
          )}
        </div>

        {renderCell(3)}

        {/* Row 3: Makaram (9), Kadagam right is above, Simmam (4) */}
        {renderCell(9)}
        {renderCell(4)}

        {/* Row 4: Dhanusu (8), Viruchigam (7), Thulaam (6), Kanni (5) */}
        {renderCell(8)}
        {renderCell(7)}
        {renderCell(6)}
        {renderCell(5)}
      </div>
    </div>
  );
};
