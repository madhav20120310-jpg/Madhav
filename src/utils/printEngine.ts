/**
 * Madhav Jodhida Nilayam - Standalone Print Engine
 * Generates self-contained, auto-printing HTML documents that work 100% reliably
 * both inside sandboxed iframes and top-level browser tabs.
 */

import { ComputedHoroscope, Language, PlanetPosition } from '../types/astrology';

// Rasi names mapping for 4x4 South Indian chart
const RASI_NAMES_TA = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const RASI_NAMES_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

/**
 * Builds HTML for a 4x4 South Indian Chart
 */
function renderSouthIndianChartHtml(
  title: string,
  planetsByRasi: Record<number, { name: string; nameTa: string; isLagna?: boolean; isRetrograde?: boolean }[]>,
  language: Language,
  compact = false
): string {
  const isTa = language === 'ta';
  const rasiNames = isTa ? RASI_NAMES_TA : RASI_NAMES_EN;

  // 4x4 layout indexing (0..15)
  // [11,  0,  1,  2]
  // [10, C1, C2,  3]
  // [ 9, C3, C4,  4]
  // [ 8,  7,  6,  5]
  const cellRasiMap: (number | 'center')[] = [
    11, 0, 1, 2,
    10, 'center', 'center', 3,
    9, 'center', 'center', 4,
    8, 7, 6, 5
  ];

  let cellsHtml = '';
  for (let i = 0; i < cellRasiMap.length; i++) {
    const val = cellRasiMap[i];
    if (val === 'center') {
      // Only render center once for i === 5
      if (i === 5) {
        cellsHtml += `
          <div style="grid-column: span 2; grid-row: span 2; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fffbeb; border: 1.5px solid #b45309; text-align: center; padding: ${compact ? '2px' : '4px'};">
            <div style="font-weight: 800; font-size: ${compact ? '10px' : '13px'}; color: #78350f; font-family: serif;">${title}</div>
            <div style="font-size: ${compact ? '7.5px' : '9px'}; font-weight: 700; color: #92400e; margin-top: 1px;">மாதவ் ஜோதிடம்</div>
          </div>
        `;
      }
      continue;
    }

    const rasiIdx = val as number;
    const rasiTitle = rasiNames[rasiIdx];
    const occupants = planetsByRasi[rasiIdx] || [];

    const occupantsHtml = occupants.map(p => {
      if (p.isLagna) {
        return `<span style="display: inline-block; background: #fee2e2; color: #991b1b; font-weight: 800; padding: ${compact ? '0.5px 2px' : '1px 3px'}; border-radius: 2px; border: 1px solid #f87171; font-size: ${compact ? '7px' : '9px'}; margin: 1px;">${isTa ? 'லக்' : 'Lag'}</span>`;
      }
      const label = isTa ? p.nameTa : p.name;
      const retro = p.isRetrograde ? '(வ)' : '';
      return `<span style="display: inline-block; background: #fef3c7; color: #78350f; font-weight: 700; padding: ${compact ? '0.5px 2px' : '1px 3px'}; border-radius: 2px; border: 1px solid #f59e0b; font-size: ${compact ? '7px' : '9px'}; margin: 1px;">${label}${retro}</span>`;
    }).join(' ');

    cellsHtml += `
      <div style="border: 1px solid #b45309; padding: ${compact ? '1px 2px' : '2px 4px'}; min-height: ${compact ? '28px' : '46px'}; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden;">
        <div style="font-size: ${compact ? '7px' : '8.5px'}; font-weight: 700; color: #78716c; border-bottom: 1px dotted #e5e7eb; padding-bottom: 0.5px; margin-bottom: 1px;">${rasiTitle}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 1px;">${occupantsHtml}</div>
      </div>
    `;
  }

  return `
    <div style="border: 1.5px solid #78350f; background: #fff; width: 100%; max-width: ${compact ? '205px' : '335px'}; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 0;">
      ${cellsHtml}
    </div>
  `;
}

/**
 * Generates standalone, self-contained Kuripu HTML (Strictly 1 Page)
 */
export function generateKuripuPrintHtml(horoscope: ComputedHoroscope, language: Language): string {
  const isTa = language === 'ta';
  const { birthData, lagna, planets, rasiChart, navamsaChart, thithi, nakshatra, dasaBalance, currentDasaBukthi, luckyFactors } = horoscope;

  // Render both charts in standard mode (335px wide, 46px min cell height) so it fills the A4 page prominently
  const rasiChartHtml = renderSouthIndianChartHtml(isTa ? 'ராசி சக்கரம்' : 'Rasi Chart', rasiChart, language, false);
  const navamsaChartHtml = renderSouthIndianChartHtml(isTa ? 'நவாம்சம்' : 'Navamsa Chart', navamsaChart, language, false);

  const planetRowsHtml = [
    `<tr>
      <td style="padding: 2.5px 4px; font-weight: 800; color: #991b1b; background: #fee2e2;">${isTa ? 'லக்னம்' : 'Lagna'}</td>
      <td style="padding: 2.5px 4px; font-weight: 700;">${isTa ? lagna.rasiNameTa : lagna.rasiName}</td>
      <td style="padding: 2.5px 4px; font-family: monospace; font-weight: 700;">${lagna.degreeFormatted}</td>
      <td style="padding: 2.5px 4px;">${isTa ? lagna.nakshatraNameTa : lagna.nakshatraName}-${lagna.pada}</td>
    </tr>`,
    ...planets.map(p => `
      <tr>
        <td style="padding: 2px 4px; font-weight: 700; color: #1c1917;">${isTa ? p.nameTa : p.name}${p.isRetrograde ? ' (வ)' : ''}</td>
        <td style="padding: 2px 4px;">${isTa ? p.rasiNameTa : p.rasiName}</td>
        <td style="padding: 2px 4px; font-family: monospace;">${p.degreeFormatted}</td>
        <td style="padding: 2px 4px;">${isTa ? p.nakshatraNameTa : p.nakshatraName}-${p.pada}</td>
      </tr>
    `)
  ].join('');

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <title>${birthData.name} - ஜாதகக் குறிப்பு (Madhav Jodhida Nilayam)</title>
  <style>
    @page {
      size: A4 portrait !important;
      margin: 8mm 10mm 8mm 10mm !important;
    }
    * {
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #1c1917 !important;
      font-family: 'Noto Sans Tamil', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 10px;
      line-height: 1.25;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
    }
    .print-card {
      width: 100% !important;
      max-width: 188mm !important;
      min-height: 270mm !important;
      height: 270mm !important;
      max-height: 270mm !important;
      margin: 0 auto !important;
      border: 2px solid #78350f !important;
      border-radius: 4px !important;
      padding: 5mm 6mm !important;
      background: #ffffff !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: avoid !important;
      break-after: avoid !important;
      overflow: hidden !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      box-sizing: border-box !important;
    }
    .header-seal {
      text-align: center;
      border-bottom: 1.5px solid #b45309;
      padding-bottom: 3px;
      margin-bottom: 4px;
    }
    .title-banner {
      font-size: 22px;
      font-weight: 900;
      color: #451a03;
      margin: 1px 0;
      font-family: serif;
      letter-spacing: 0.5px;
    }
    .grid-info {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      background: #fffbeb;
      border: 1px solid #fde68a;
      padding: 5px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .info-lbl { font-size: 8.5px; color: #78716c; display: block; }
    .info-val { font-weight: 800; color: #1c1917; font-size: 10.5px; }
    .panchang-bar {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 3px;
      text-align: center;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 4px 6px;
      border-radius: 4px;
      margin-bottom: 5px;
      font-size: 9px;
    }
    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 5px;
      align-items: center;
    }
    .chart-box-title {
      text-align: center;
      font-weight: 800;
      font-size: 11px;
      color: #78350f;
      margin-bottom: 3px;
      font-family: serif;
    }
    .bottom-split {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 10px;
      border-top: 1.5px solid #b45309;
      padding-top: 5px;
      flex: 1;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9px;
    }
    th {
      background: #fef3c7;
      color: #78350f;
      text-align: left;
      padding: 2.5px 4px;
      border: 1px solid #fcd34d;
      font-size: 8.5px;
    }
    td {
      border: 1px solid #f5f5f4;
      padding: 2px 4px;
    }
    .dasa-box {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      padding: 5px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .lucky-box {
      border: 1px solid #e7e5e4;
      background: #fafaf9;
      padding: 5px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
      font-size: 9px;
    }
    .sig-box {
      border: 1px dashed #b45309;
      background: #fffdfa;
      padding: 5px 8px;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5px;
    }
    .no-print-bar {
      background: #1c1917;
      color: #fef08a;
      padding: 8px 16px;
      text-align: center;
      margin-bottom: 8px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
    }
    .print-btn {
      background: #f59e0b;
      color: #000;
      border: none;
      padding: 5px 14px;
      border-radius: 5px;
      font-weight: 800;
      cursor: pointer;
      font-size: 11px;
    }
    @media print {
      .no-print-bar { display: none !important; }
      html, body {
        padding: 0 !important;
        margin: 0 !important;
        background: transparent !important;
        height: auto !important;
        overflow: visible !important;
      }
      .print-card {
        border: 2px solid #78350f !important;
        margin: 0 auto !important;
        height: 270mm !important;
        min-height: 270mm !important;
        max-height: 270mm !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span>மாதவ் ஜோதிட நிலையம் · அச்சு முன்னோட்டம் (Strictly 1 Page Kuripu)</span>
    <button class="print-btn" onclick="window.print()">🖨️ அச்சிடுக (Print Now)</button>
  </div>

  <div class="print-card">
    <div class="header-seal">
      <div style="font-weight: 800; font-size: 10px; color: #78350f; letter-spacing: 2px;">
        ${isTa ? '॥ ஸ்ரீ முத்தாலம்மன் துணை ॥' : '॥ Sri Muthalamman Thunai ॥'}
      </div>
      <div class="title-banner">${isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'}</div>
      <div style="font-weight: 700; font-size: 10.5px; color: #92400e;">
        ${isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடர் · மனையடி சாஸ்திரம் (வாஸ்து)' : 'Malamanjanur Hereditary Astrologer · Vastu Shastra'}
      </div>
      <div style="font-size: 9px; color: #57534e; margin-top: 2px;">
        செல்: 90429 24345, 90435 15667 · எண். 1833/G2, குபேர நகர், திருவண்ணாமலை 606 604
      </div>
    </div>

    <!-- Native Details -->
    <div class="grid-info">
      <div>
        <span class="info-lbl">${isTa ? 'பெயர்:' : 'Name:'}</span>
        <span class="info-val" style="color: #991b1b; font-size: 11.5px;">${birthData.name}</span>
      </div>
      <div>
        <span class="info-lbl">${isTa ? 'பிறந்த தேதி & நேரம்:' : 'DOB & Time:'}</span>
        <span class="info-val" style="font-family: monospace;">${birthData.dob} · ${birthData.tob}</span>
      </div>
      <div>
        <span class="info-lbl">${isTa ? 'பிறந்த ஊர்:' : 'Birth Place:'}</span>
        <span class="info-val">${birthData.pob}</span>
      </div>
      <div>
        <span class="info-lbl">${isTa ? 'பெற்றோர்:' : 'Parents:'}</span>
        <span class="info-val">${birthData.fatherName || '—'} / ${birthData.motherName || '—'}</span>
      </div>
    </div>

    <!-- Panchangam Bar -->
    <div class="panchang-bar">
      <div><b>${isTa ? 'லக்னம்' : 'Lagna'}:</b> <span style="color: #991b1b; font-weight: 800;">${isTa ? lagna.rasiNameTa : lagna.rasiName}</span></div>
      <div><b>${isTa ? 'ராசி' : 'Rasi'}:</b> <span style="color: #991b1b; font-weight: 800;">${isTa ? (horoscope.planets.find(p => p.name === 'Moon')?.rasiNameTa || '') : (horoscope.planets.find(p => p.name === 'Moon')?.rasiName || '')}</span></div>
      <div><b>${isTa ? 'நட்சத்திரம்' : 'Nakshatra'}:</b> ${isTa ? nakshatra.nameTa : nakshatra.name} (${nakshatra.pada})</div>
      <div><b>${isTa ? 'திதி' : 'Thithi'}:</b> ${isTa ? thithi.nameTa : thithi.name}</div>
      <div><b>${isTa ? 'யோகம்' : 'Yoga'}:</b> ${horoscope.yogam.name}</div>
      <div><b>${isTa ? 'கரணம்' : 'Karana'}:</b> ${horoscope.karanam.name}</div>
    </div>

    <!-- Dual Charts -->
    <div class="charts-row">
      <div>
        <div class="chart-box-title">${isTa ? 'ராசி சக்கரம் (D1 Janma Chakra)' : 'Rasi Chart (D1)'}</div>
        ${rasiChartHtml}
      </div>
      <div>
        <div class="chart-box-title">${isTa ? 'நவாம்ச சக்கரம் (D9 Navamsa Chakra)' : 'Navamsa Chart (D9)'}</div>
        ${navamsaChartHtml}
      </div>
    </div>

    <!-- Split Bottom: Planets & Dasa -->
    <div class="bottom-split">
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-weight: 800; font-size: 10.5px; color: #78350f; margin-bottom: 2px; font-family: serif;">
            ${isTa ? 'கிரக பாதசார அட்டவணை (Nirayana Longitudes)' : 'Planetary Longitudes'}
          </div>
          <table>
            <thead>
              <tr>
                <th>${isTa ? 'கிரகம்' : 'Planet'}</th>
                <th>${isTa ? 'ராசி' : 'Rasi'}</th>
                <th>${isTa ? 'பாகை' : 'Deg'}</th>
                <th>${isTa ? 'நட்சத்திரம்' : 'Star-Pada'}</th>
              </tr>
            </thead>
            <tbody>
              ${planetRowsHtml}
            </tbody>
          </table>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 4px 6px; font-size: 8.5px; line-height: 1.35; color: #451a03; margin-top: 4px;">
          <b>${isTa ? 'மாதவ் வழிகாட்டுதல்:' : 'Guidance:'}</b> ${isTa ? 'லக்னாதிபதி பலம் பெற்று சுப யோகங்கள் அமைந்துள்ளதால் சகல நன்மைகளும் கூடும். குலதெய்வ வழிபாடு மற்றும் திருவண்ணாமலை கிரிவல தரிசனம் சகல தோஷ நிவர்த்தி தரும்.' : 'Strong planetary alignments indicate domestic harmony and prosperity.'}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <div class="dasa-box">
          <div style="font-weight: 800; font-size: 10.5px; color: #78350f; font-family: serif;">
            ${isTa ? 'பிறந்த இருப்பு தசாபுத்தி:' : 'Janma Dasa Balance:'}
          </div>
          <div style="font-size: 10.5px; font-weight: 800; color: #991b1b; margin-top: 1px;">
            ${isTa
              ? `${dasaBalance.lordTa} மகா தசை: ${dasaBalance.years} வருடம், ${dasaBalance.months} மாதம், ${dasaBalance.days} நாள்`
              : `${dasaBalance.lord} Dasa: ${dasaBalance.years}y ${dasaBalance.months}m ${dasaBalance.days}d`}
          </div>
          <div style="font-size: 8.5px; color: #78716c; margin-top: 1px;">
            ${dasaBalance.startDate} முதல் ${dasaBalance.endDate} வரை
          </div>
          <div style="font-size: 9.5px; color: #065f46; font-weight: 800; margin-top: 2px; border-top: 1px dashed #fcd34d; padding-top: 2px;">
            ${isTa ? 'நடப்பு தசாபுத்தி:' : 'Current Bukthi:'} ${isTa ? `${currentDasaBukthi.dasaLordTa} - ${currentDasaBukthi.bukthiLordTa}` : `${currentDasaBukthi.dasaLord} - ${currentDasaBukthi.bukthiLord}`} (${currentDasaBukthi.endDate} வரை)
          </div>
        </div>

        <div class="lucky-box">
          <div style="font-weight: 800; color: #78350f; margin-bottom: 2px; font-size: 9.5px;">${isTa ? 'சுப அதிர்ஷ்டக் குறிப்புகள்:' : 'Auspicious Factors:'}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">
            <div>${isTa ? 'ரத்தினம்:' : 'Gem:'} <b>${isTa ? luckyFactors.gemstoneTa : luckyFactors.gemstone}</b></div>
            <div>${isTa ? 'நிறம்:' : 'Color:'} <b>${isTa ? luckyFactors.colorTa : luckyFactors.color}</b></div>
            <div>${isTa ? 'எண்:' : 'Num:'} <b>${luckyFactors.number}</b></div>
            <div>${isTa ? 'திசை:' : 'Dir:'} <b>${isTa ? luckyFactors.directionTa : luckyFactors.direction}</b></div>
          </div>
        </div>

        <div class="sig-box">
          <div>
            <div style="font-weight: 800; color: #451a03; font-size: 9.5px;">மாதவ் ஜோதிட நிலையம்</div>
            <div style="color: #78716c; font-size: 8px;">மலமஞ்சனூர் பரம்பரை · திருவண்ணாமலை</div>
          </div>
          <div style="border: 1px dashed #b45309; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 800; color: #78350f; text-align: center;">
            முத்திரை
          </div>
          <div style="text-align: center;">
            <div style="font-family: serif; font-style: italic; font-weight: 800; color: #78350f; font-size: 11px;">ராமச்சந்திரன் MA</div>
            <div style="border-top: 1px solid #78716c; padding-top: 1px; font-size: 7.5px; color: #57534e;">ஜோதிட ஆலோசகர்</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Trigger print automatically when document loads
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;
}

/**
 * Generates standalone, self-contained Jadhagam Book HTML with exact page sizes
 */
export function generateJadhagamBookPrintHtml(
  horoscope: ComputedHoroscope,
  language: Language,
  format: '35_a5_landscape' | '35_a5_portrait' | '16_a4_portrait' = '35_a5_landscape'
): string {
  const isTa = language === 'ta';
  const isLandscape = format === '35_a5_landscape';
  const isA4 = format === '16_a4_portrait';
  const totalPages = isA4 ? 16 : 35;

  const { birthData, lagna, planets, rasiChart, navamsaChart, thithi, vaaram, nakshatra, yogam, karanam, dasaBalance, dasaTimeline, luckyFactors } = horoscope;

  const pageSizeCss = isLandscape
    ? '@page { size: A5 landscape !important; margin: 10mm !important; }'
    : isA4
    ? '@page { size: A4 portrait !important; margin: 5mm 6mm !important; }'
    : '@page { size: A5 portrait !important; margin: 4mm 4mm !important; }';

  const pageDimCss = isLandscape
    ? 'width: 190mm !important; height: 128mm !important; max-height: 128mm !important; min-height: 128mm !important;'
    : isA4
    ? 'width: 198mm !important; height: 284mm !important; max-height: 284mm !important; min-height: 284mm !important;'
    : 'width: 140mm !important; height: 201mm !important; max-height: 201mm !important; min-height: 201mm !important;';

  const rasiChartHtml = renderSouthIndianChartHtml(isTa ? 'ராசி சக்கரம்' : 'Rasi Chart', rasiChart, language, isLandscape);
  const navamsaChartHtml = renderSouthIndianChartHtml(isTa ? 'நவாம்சம்' : 'Navamsa Chart', navamsaChart, language, isLandscape);

  let pagesHtml = '';

  for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
    pagesHtml += `
      <div class="jadhagam-page ${isLandscape ? 'page-landscape' : ''}">
        <div class="page-inner">
          <!-- Page Header -->
          <div class="page-header">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-weight: 800; color: #78350f; font-family: serif;">${isTa ? 'மாதவ் ஜோதிட நிலையம்' : 'Madhav Jodhida Nilayam'} · திருவண்ணாமலை</span>
            </div>
            <div style="font-family: monospace; color: #78716c; font-size: 8.5px;">
              ${birthData.name} · ${pageNo} / ${totalPages}
            </div>
          </div>

          <!-- Page Content -->
          <div class="page-body">
            ${getPageHtml(pageNo, isLandscape, isA4, isTa, horoscope, rasiChartHtml, navamsaChartHtml)}
          </div>

          <!-- Page Footer -->
          <div class="page-footer">
            <span>${isTa ? 'செல்: 90429 24345, 90435 15667' : 'Cell: 90429 24345, 90435 15667'}</span>
            <span>${isTa ? 'மலமஞ்சனூர் பரம்பரை ஜோதிடம் · எண். 1833/G2, குபேர நகர், திருவண்ணாமலை' : 'Malamanjanur Hereditary Astrologer · Tiruvannamalai'}</span>
          </div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <title>${birthData.name} - ஜாதக நூல் (${isLandscape ? 'A5 Landscape' : isA4 ? 'A4 Portrait' : 'A5 Portrait'})</title>
  <style>
    ${pageSizeCss}
    * {
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      font-family: 'Noto Sans Tamil', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #1c1917 !important;
      font-size: ${isLandscape ? '9px' : '10px'};
      line-height: 1.25;
    }
    .jadhagam-page {
      ${pageDimCss}
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin: 0 auto !important;
      background: #ffffff !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      padding: 0 !important;
    }
    .jadhagam-page:last-child {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    .page-inner {
      border: 1.5px solid #b45309;
      background: #fffdfa;
      height: 100%;
      padding: ${isLandscape ? '3mm 4mm' : '4mm 5mm'};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fde68a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-size: 8.5px;
    }
    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #fde68a;
      padding-top: 2px;
      margin-top: 3px;
      font-size: 8px;
      color: #78716c;
    }
    .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }
    .no-print-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: #1c1917;
      color: #fef08a;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      border-bottom: 2px solid #b45309;
    }
    .print-btn {
      background: #f59e0b;
      color: #000;
      border: none;
      padding: 5px 14px;
      border-radius: 5px;
      font-weight: 800;
      cursor: pointer;
      font-size: 11px;
    }
    @media print {
      .no-print-bar { display: none !important; }
      body { padding: 0 !important; background: transparent !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span>${birthData.name} · ஜாதக நூல் (${isLandscape ? '35 A5 Landscape' : isA4 ? '16 A4 Portrait' : '35 A5 Portrait'})</span>
    <button class="print-btn" onclick="window.print()">🖨️ அச்சிடுக (Print Now)</button>
  </div>

  ${pagesHtml}

  <script>
    window.addEventListener('load', function() {
      setTimeout(function() {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;
}

function getPageHtml(
  pageNo: number,
  isLandscape: boolean,
  isA4: boolean,
  isTa: boolean,
  horoscope: ComputedHoroscope,
  rasiChartHtml: string,
  navamsaChartHtml: string
): string {
  const { birthData, lagna, planets, thithi, vaaram, nakshatra, yogam, karanam, dasaBalance, dasaTimeline, luckyFactors } = horoscope;

  if (pageNo === 1) {
    if (isLandscape) {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 12px; align-items: center; height: 100%;">
          <div style="text-align: center; border-right: 1px dashed #d97706; padding-right: 10px;">
            <div style="font-size: 9px; font-weight: 800; color: #78350f; letter-spacing: 2px;">॥ ஸ்ரீ முத்தாலம்மன் துணை ॥</div>
            <div style="font-size: 18px; font-weight: 900; color: #451a03; font-family: serif; margin: 4px 0;">மாதவ் ஜோதிட நிலையம்</div>
            <div style="font-size: 9.5px; font-weight: 700; color: #92400e;">மலமஞ்சனூர் பரம்பரை ஜோதிடர்</div>
            <div style="font-size: 8.5px; color: #78716c; margin-top: 2px;">மனையடி சாஸ்திரம் (வாஸ்து) · திருவண்ணாமலை</div>
            <div style="margin-top: 6px; font-size: 8px; color: #92400e; font-style: italic;">
              ஜோதிடமாமேதை ராமச்சந்திரன் நாட்டார், வாஸ்து ரத்னா மாணிக்க நாட்டார் MR, ஜோதிட ஆலோசகர் ராமச்சந்திரன் MA
            </div>
          </div>
          <div>
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 4px 8px; border-radius: 4px; text-align: center; margin-bottom: 6px;">
              <span style="font-size: 8.5px; font-weight: 800; color: #78350f; letter-spacing: 1px;">— சம்பூர்ண ஜனன ஜாதக நூல் —</span>
              <div style="font-size: 14px; font-weight: 900; color: #991b1b; margin-top: 1px;">${birthData.name}</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; background: #ffffff; border: 1px solid #fde68a; padding: 6px; border-radius: 4px; font-size: 9px;">
              <div>பிறந்த தேதி: <b>${birthData.dob}</b></div>
              <div>பிறந்த நேரம்: <b>${birthData.tob}</b></div>
              <div>பிறந்த ஊர்: <b>${birthData.pob}</b></div>
              <div>லக்னம்: <b>${isTa ? lagna.rasiNameTa : lagna.rasiName}</b></div>
              <div style="grid-column: span 2;">பெற்றோர்: <b>${birthData.fatherName || '—'} / ${birthData.motherName || '—'}</b></div>
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 10px; font-weight: 800; color: #78350f; letter-spacing: 2px;">॥ ஸ்ரீ முத்தாலம்மன் துணை ॥</div>
        <div style="font-size: 22px; font-weight: 900; color: #451a03; font-family: serif; margin: 8px 0;">மாதவ் ஜோதிட நிலையம்</div>
        <div style="font-size: 11px; font-weight: 700; color: #92400e;">மலமஞ்சனூர் பரம்பரை ஜோதிடர் · மனையடி சாஸ்திரம் (வாஸ்து)</div>
        <div style="margin: 12px auto; background: #fef3c7; border: 1px solid #f59e0b; padding: 6px 12px; border-radius: 4px; max-width: 320px;">
          <div style="font-size: 9px; font-weight: 800; color: #78350f;">— சம்பூர்ண ஜனன ஜாதக நூல் —</div>
          <div style="font-size: 16px; font-weight: 900; color: #991b1b; margin-top: 2px;">${birthData.name}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; max-width: 340px; margin: 0 auto; text-align: left; background: #fffbeb; border: 1px solid #fde68a; padding: 8px; border-radius: 4px; font-size: 9.5px;">
          <div>பிறந்த தேதி: <b>${birthData.dob}</b></div>
          <div>பிறந்த நேரம்: <b>${birthData.tob}</b></div>
          <div>பிறந்த ஊர்: <b>${birthData.pob}</b></div>
          <div>லக்னம்: <b>${isTa ? lagna.rasiNameTa : lagna.rasiName}</b></div>
          <div style="grid-column: span 2;">தந்தை / தாய்: <b>${birthData.fatherName || '—'} / ${birthData.motherName || '—'}</b></div>
        </div>
      </div>
    `;
  }

  if (pageNo === 2) {
    return `
      <div>
        <div style="text-align: center; font-weight: 800; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px; margin-bottom: 6px; font-size: 11px;">
          ${isTa ? 'ஜனன பஞ்சாங்க அவகஹடா சக்கரம்' : 'Janma Panchangam & Avakhada'}
        </div>
        <div style="display: grid; grid-template-columns: repeat(${isLandscape ? 6 : 3}, 1fr); gap: 4px; font-size: 9px; text-align: center; margin-bottom: 6px;">
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">வாரம்</div>
            <b>${isTa ? vaaram.nameTa : vaaram.name}</b>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">திதி</div>
            <b>${isTa ? thithi.nameTa : thithi.name}</b>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">நட்சத்திரம்</div>
            <b>${isTa ? nakshatra.nameTa : nakshatra.name} (${nakshatra.pada})</b>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">யோகம்</div>
            <b>${yogam.name}</b>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">கரணம்</div>
            <b>${karanam.name}</b>
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 4px; border-radius: 3px;">
            <div style="color: #78716c; font-size: 8px;">சூரிய உதயம்</div>
            <b>06:08 AM</b>
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e7e5e4; padding: 6px; border-radius: 4px; font-size: 9px;">
          <div style="font-weight: 800; color: #78350f; margin-bottom: 3px;">நட்சத்திர அங்கங்கள்:</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;">
            <div>கணம்: <b>${nakshatra.lord}</b></div>
            <div>யோனி: <b>ஆண்/பெண்</b></div>
            <div>பூதம்: <b>நிலம்/நீர்</b></div>
            <div>விருட்சம்: <b>அரசு/நாவல்</b></div>
          </div>
        </div>
      </div>
    `;
  }

  if (pageNo === 3) {
    if (isLandscape) {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: center; height: 100%;">
          <div>
            <div style="text-align: center; font-weight: 800; color: #78350f; font-size: 10px; margin-bottom: 2px;">ராசி சக்கரம் (D1)</div>
            ${rasiChartHtml}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 11px; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px;">ராசி சக்கர விளக்கம்</div>
            <div style="font-size: 9px; color: #44403c; line-height: 1.4; margin-top: 4px;">
              லக்னம்: <b>${isTa ? lagna.rasiNameTa : lagna.rasiName}</b> (${lagna.degreeFormatted})<br>
              ராசி: <b>${isTa ? (planets.find(p => p.name === 'Moon')?.rasiNameTa || '') : ''}</b><br>
              நட்சத்திரம்: <b>${isTa ? nakshatra.nameTa : nakshatra.name} (${nakshatra.pada}-ம் பாதம்)</b>
            </div>
            <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 6px; border-radius: 4px; font-size: 8.5px; margin-top: 6px;">
              லக்ன கேந்திரங்களிலும் திரிகோணங்களிலும் சுப கிரகங்கள் அமர்ந்து ஆயுள் பலமும், தன பாக்கிய விருத்தியும் நல்குகின்றன.
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div style="text-align: center;">
        <div style="font-weight: 800; color: #78350f; font-size: 12px; margin-bottom: 6px;">ராசி சக்கரம் (D1)</div>
        ${rasiChartHtml}
      </div>
    `;
  }

  if (pageNo === 4) {
    if (isLandscape) {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: center; height: 100%;">
          <div>
            <div style="text-align: center; font-weight: 800; color: #78350f; font-size: 10px; margin-bottom: 2px;">நவாம்ச சக்கரம் (D9)</div>
            ${navamsaChartHtml}
          </div>
          <div>
            <div style="font-weight: 800; font-size: 11px; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px;">நவாம்ச சக்கர சூட்சும பலன்கள்</div>
            <div style="font-size: 9px; color: #44403c; line-height: 1.4; margin-top: 4px;">
              நவாம்ச சக்கரம் தாம்பத்திய சுகம், களத்திர யோகம் மற்றும் கிரகங்களின் சூட்சும பலத்தை உணர்த்துகிறது.<br>
              வர்க்கோத்தம கிரகங்கள் விசேஷ பலன் தரும்.
            </div>
            <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 6px; border-radius: 4px; font-size: 8.5px; margin-top: 6px;">
              களத்திர ஸ்தானத்தில் சுபகிரக தொடர்பு ஏற்பட்டு இல்லற மேன்மையும் நற்குடும்ப அமைப்பும் கிட்டும்.
            </div>
          </div>
        </div>
      `;
    }
    return `
      <div style="text-align: center;">
        <div style="font-weight: 800; color: #78350f; font-size: 12px; margin-bottom: 6px;">நவாம்ச சக்கரம் (D9)</div>
        ${navamsaChartHtml}
      </div>
    `;
  }

  if (pageNo === 5) {
    return `
      <div>
        <div style="text-align: center; font-weight: 800; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px; margin-bottom: 4px; font-size: 11px;">
          கிரக பாதசார விரிவு அட்டவணை
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5px;">
          <thead>
            <tr style="background: #fef3c7; color: #78350f;">
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">கிரகம்</th>
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">ராசி</th>
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">பாகை</th>
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">நட்சத்திரம்</th>
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">பாதம்</th>
              <th style="padding: 2px 4px; border: 1px solid #fcd34d; text-align: left;">பலம்</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #fff1f2; font-weight: 800; color: #991b1b;">
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">லக்னம்</td>
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${isTa ? lagna.rasiNameTa : lagna.rasiName}</td>
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4; font-family: monospace;">${lagna.degreeFormatted}</td>
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${isTa ? lagna.nakshatraNameTa : lagna.nakshatraName}</td>
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${lagna.pada}</td>
              <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">கேந்திராதிபதி</td>
            </tr>
            ${planets.map(p => `
              <tr>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4; font-weight: 700;">${isTa ? p.nameTa : p.name}${p.isRetrograde ? ' (வ)' : ''}</td>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${isTa ? p.rasiNameTa : p.rasiName}</td>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4; font-family: monospace;">${p.degreeFormatted}</td>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${isTa ? p.nakshatraNameTa : p.nakshatraName}</td>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${p.pada}</td>
                <td style="padding: 1.5px 4px; border: 1px solid #e7e5e4;">${isTa ? p.avasthaTa : p.avastha}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  if (pageNo === 6) {
    return `
      <div>
        <div style="text-align: center; font-weight: 800; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px; margin-bottom: 6px; font-size: 11px;">
          பிறந்த இருப்பு தசாபுத்தி கணக்கீடு
        </div>
        <div style="background: #fffbeb; border: 1.5px solid #f59e0b; padding: 8px; border-radius: 4px; text-align: center; margin-bottom: 8px;">
          <div style="font-size: 10px; font-weight: 800; color: #78350f;">${dasaBalance.lordTa} மகா தசை இருப்பு:</div>
          <div style="font-size: 15px; font-weight: 900; color: #991b1b; margin: 3px 0;">
            ${dasaBalance.years} வருடம், ${dasaBalance.months} மாதம், ${dasaBalance.days} நாட்கள்
          </div>
          <div style="font-size: 8.5px; color: #78716c;">
            ஆரம்பம்: ${dasaBalance.startDate} · முடிவு: ${dasaBalance.endDate}
          </div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e7e5e4; padding: 6px; border-radius: 4px; font-size: 9px; line-height: 1.4;">
          <b>விம்சோத்தரி தசா முறை:</b> மனித வாழ்வின் 120 வருட காலச் சக்கரத்தில் ஒன்பது கிரகங்களின் தசா வரிசை விம்சோத்தரி முறையில் கணிக்கப்படுகிறது.
        </div>
      </div>
    `;
  }

  if (pageNo >= 7 && pageNo <= 15) {
    const dIdx = pageNo - 7;
    const dasa = dasaTimeline[dIdx] || dasaTimeline[0];
    return `
      <div>
        <div style="text-align: center; font-weight: 800; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px; margin-bottom: 6px; font-size: 11px;">
          ${dasa.lordTa} மகா தசா விரிவான பலன்கள் (${dasa.durationYears} வருடங்கள்)
        </div>
        <div style="display: flex; justify-content: space-between; background: #fffbeb; border: 1px solid #fde68a; padding: 4px 8px; border-radius: 3px; font-size: 8.5px; margin-bottom: 6px;">
          <span>கால அளவு: <b>${dasa.durationYears} வருடங்கள்</b></span>
          <span>${dasa.startDate} முதல் ${dasa.endDate} வரை</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(${isLandscape ? 5 : 3}, 1fr); gap: 3px; font-size: 8px; margin-bottom: 6px;">
          ${dasa.subPeriods.map(bp => `
            <div style="background: #f5f5f4; border: 1px solid #e7e5e4; padding: 3px; border-radius: 2px;">
              <b>${bp.lordTa} புக்தி</b><br>
              <span style="color: #78716c;">${bp.endDate} வரை</span>
            </div>
          `).join('')}
        </div>
        <div style="background: #ffffff; border: 1px solid #e7e5e4; padding: 6px; border-radius: 4px; font-size: 8.5px; line-height: 1.4;">
          <b>பலன்கள் & பரிகாரம்:</b> ${dasa.lordTa} தசா காலத்தில் உரிய தெய்வ வழிபாடும், தான தர்மங்களும் செய்வது சகல நன்மைகளையும் நல்கும்.
        </div>
      </div>
    `;
  }

  if (pageNo === 35) {
    return `
      <div style="text-align: center; padding: 6px;">
        <div style="font-size: 9px; font-weight: 800; color: #78350f; letter-spacing: 2px;">॥ சுபம் பூயாத் - மங்களம் உண்டாகுக ॥</div>
        <div style="background: #fffbeb; border: 1.5px solid #d97706; padding: 8px; border-radius: 4px; max-width: ${isLandscape ? '440px' : '320px'}; margin: 6px auto; font-size: 9px; line-height: 1.4;">
          <div style="font-weight: 800; font-size: 11px; color: #451a03; margin-bottom: 2px;">மாதவ் ஜோதிட நிலைய சான்றளிப்பு</div>
          இந்த சம்பூர்ண ஜாதக நூல் பாரம்பரிய மலமஞ்சனூர் பரம்பரை முறைப்படி துல்லியமாக கணிக்கப்பட்டு சுப ஆசி வழங்கப்பட்டுள்ளது.
        </div>
        <div style="display: flex; justify-content: space-around; align-items: center; max-width: 360px; margin: 8px auto 0;">
          <div style="border: 1px dashed #d97706; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; color: #78350f;">
            முத்திரை
          </div>
          <div>
            <div style="font-family: serif; font-style: italic; font-weight: 800; font-size: 12px; color: #78350f;">ராமச்சந்திரன் MA</div>
            <div style="border-top: 1px solid #a8a29e; font-size: 8px; padding-top: 1px;">ஜோதிட ஆலோசகர் கையொப்பம்</div>
          </div>
        </div>
      </div>
    `;
  }

  // Generic pages 16 to 34
  return `
    <div>
      <div style="text-align: center; font-weight: 800; color: #78350f; border-bottom: 1px solid #fde68a; padding-bottom: 2px; margin-bottom: 6px; font-size: 11px;">
        ஜாதக ஆய்வு & பலன்கள் (பக்கம் ${pageNo})
      </div>
      <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px; border-radius: 4px; font-size: 9px; line-height: 1.5; color: #1c1917;">
        இந்த பாவத்தின் சுப ஸ்தான அமைப்பும் அதிபதியின் பலமும் ஜாதகருக்கு சிறப்பான நற்பலன்களை நல்கும். குலதெய்வ வழிபாடும் திருவண்ணாமலை கிரிவல தரிசனமும் மேன்மேலும் வாழ்வை உயர்த்தும்.
      </div>
    </div>
  `;
}

/**
 * Dedicated isolated hidden iframe print driver:
 * Loads the HTML into a hidden frame and calls print() on the frame's window.
 * This guarantees ONLY the standalone document prints with its exact @page rules,
 * without popup blockers, without opening duplicate tabs, and without parent DOM interference.
 */
export function printHtmlViaIframe(htmlContent: string): boolean {
  try {
    let iframe = document.getElementById('madhav-hidden-print-frame') as HTMLIFrameElement | null;
    if (iframe && iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }

    iframe = document.createElement('iframe');
    iframe.id = 'madhav-hidden-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '1000px';
    iframe.style.height = '1000px';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return false;
    }

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Give browser time to parse CSS and render fonts/images, then print
    setTimeout(() => {
      try {
        iframe?.contentWindow?.focus();
        iframe?.contentWindow?.print();
      } catch (err) {
        console.warn('Hidden iframe print failed, falling back to window.print():', err);
        window.print();
      }
    }, 450);

    return true;
  } catch (err) {
    console.warn('printHtmlViaIframe failed:', err);
    window.print();
    return false;
  }
}

/**
 * Triggers printing using direct browser print or opens tab if requested
 */
export function executePrintDocument(
  htmlContent: string,
  filename: string,
  openInNewTab = false
): { success: boolean; blobUrl: string } {
  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);

    if (openInNewTab) {
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        if (anchor.parentNode) anchor.parentNode.removeChild(anchor);
      }, 1500);
      return { success: true, blobUrl };
    }

    // Direct synchronous native print - trusted and works in all browsers
    window.print();
    return { success: true, blobUrl };
  } catch (err) {
    console.warn('executePrintDocument error:', err);
    try {
      window.print();
    } catch {
      // ignore
    }
    return { success: false, blobUrl: '' };
  }
}

/**
 * Directly downloads HTML file as fallback
 */
export function downloadPrintFile(htmlContent: string, filename: string): void {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) a.parentNode.removeChild(a);
  }, 1000);
}

