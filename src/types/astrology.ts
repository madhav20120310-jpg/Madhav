/**
 * Madhav Jodhida Nilayam - Astrological Types & Interfaces
 */

export type Gender = 'male' | 'female';
export type Language = 'ta' | 'en';

export interface BirthData {
  id: string;
  name: string;
  gender: Gender;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm:ss
  pob: string; // City name
  latitude: number;
  longitude: number;
  timezone: number; // e.g., +5.5 for IST
  dst: number; // Daylight saving offset in hours
  fatherName: string;
  motherName: string;
  notes?: string;
  createdAt: string;
}

export interface PlanetPosition {
  name: string;
  nameTa: string;
  symbol: string;
  longitude: number; // 0 - 360
  rasiIndex: number; // 0 - 11 (0 = Mesham, 11 = Meenam)
  rasiName: string;
  rasiNameTa: string;
  nakshatraIndex: number; // 0 - 26
  nakshatraName: string;
  nakshatraNameTa: string;
  pada: number; // 1 - 4
  degreesInRasi: number; // 0 - 30
  degreeFormatted: string; // e.g. 14°25'12"
  isRetrograde: boolean;
  avastha: string; // Uchcham, Aatchi, Natpu, Samam, Pagai, Neecham
  avasthaTa: string;
  navamsaRasiIndex: number;
}

export interface DasaBalance {
  lord: string;
  lordTa: string;
  years: number;
  months: number;
  days: number;
  startDate: string;
  endDate: string;
}

export interface DasaPeriod {
  lord: string;
  lordTa: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  subPeriods: BukthiPeriod[];
}

export interface BukthiPeriod {
  lord: string;
  lordTa: string;
  startDate: string;
  endDate: string;
}

export interface ComputedHoroscope {
  birthData: BirthData;
  lagna: PlanetPosition;
  planets: PlanetPosition[];
  rasiChart: { [rasiIndex: number]: PlanetPosition[] };
  navamsaChart: { [rasiIndex: number]: PlanetPosition[] };
  thithi: { index: number; name: string; nameTa: string; paksha: 'Shukla' | 'Krishna'; pakshaTa: string };
  vaaram: { index: number; name: string; nameTa: string; lord: string; lordTa: string };
  nakshatra: { index: number; name: string; nameTa: string; lord: string; lordTa: string; pada: number };
  yogam: { index: number; name: string; nameTa: string };
  karanam: { index: number; name: string; nameTa: string };
  dasaBalance: DasaBalance;
  dasaTimeline: DasaPeriod[];
  currentDasaBukthi: {
    dasaLord: string;
    dasaLordTa: string;
    bukthiLord: string;
    bukthiLordTa: string;
    endDate: string;
  };
  doshas: {
    kujaDosha: { hasDosha: boolean; description: string; descriptionTa: string };
    rahuKetuDosha: { hasDosha: boolean; description: string; descriptionTa: string };
  };
  luckyFactors: {
    gemstone: string;
    gemstoneTa: string;
    color: string;
    colorTa: string;
    number: number;
    direction: string;
    directionTa: string;
    deity: string;
    deityTa: string;
  };
}

export interface PoruthamResultItem {
  id: string;
  name: string;
  nameTa: string;
  score: number; // 0 or 1, or 0.5
  status: 'Uthama' | 'Madhyama' | 'Adhama';
  statusTa: 'உத்தமம்' | 'மத்திமம்' | 'பொருந்தாது';
  explanation: string;
  explanationTa: string;
  isCrucial?: boolean;
}

export interface MatchCompatibilityResult {
  boy: {
    name: string;
    nakshatra: string;
    nakshatraTa: string;
    rasi: string;
    rasiTa: string;
    pada: number;
  };
  girl: {
    name: string;
    nakshatra: string;
    nakshatraTa: string;
    rasi: string;
    rasiTa: string;
    pada: number;
  };
  poruthams: PoruthamResultItem[];
  totalScore: number; // out of 10
  verdict: 'Excellent' | 'Good' | 'Average' | 'Not Recommended';
  verdictTa: 'மிகச் சிறந்த பொருத்தம்' | 'நல்ல பொருத்தம்' | 'சுமாரான பொருத்தம்' | 'பொருத்தம் இல்லை';
  rajjuPoruthamStatus: boolean;
  vedhaiPoruthamStatus: boolean;
  kujaDoshaCheck: {
    matched: boolean;
    boyHasDosha: boolean;
    girlHasDosha: boolean;
    notes: string;
    notesTa: string;
  };
}

export interface MuhurthamSlot {
  date: string;
  dayName: string;
  dayNameTa: string;
  timeRange: string;
  lagnaName: string;
  lagnaNameTa: string;
  nakshatra: string;
  nakshatraTa: string;
  tithi: string;
  tithiTa: string;
  purpose: 'Marriage' | 'Grihapravesam' | 'Naming' | 'Business' | 'Vehicle';
  purposeTa: 'திருமணம்' | 'கிரகப்பிரவேசம்' | 'பெயர் சூட்டுதல்' | 'வியாபார துவக்கம்' | 'வாகன பூஜை';
  gowriRating: 'Amirtham' | 'Sugam' | 'Labham' | 'Uthi';
  gowriRatingTa: 'அமிர்தம்' | 'சுகம்' | 'லாபம்' | 'உதி';
  isAuspicious: boolean;
  notes: string;
  notesTa: string;
}

export interface PanchangamDay {
  date: string;
  tamilDate: string;
  tamilMonth: string;
  tamilYear: string;
  vaaram: string;
  vaaramTa: string;
  tithi: string;
  tithiTa: string;
  tithiEndTime: string;
  nakshatra: string;
  nakshatraTa: string;
  nakshatraEndTime: string;
  yogam: string;
  yogamTa: string;
  karanam: string;
  karanamTa: string;
  sunrise: string;
  sunset: string;
  rahuKalam: string;
  yamagandam: string;
  gulikai: string;
  abhijit: string;
  nallaNeram: string;
  gowriNallaNeram: string;
  subhaHorai: { planet: string; planetTa: string; timeRange: string }[];
}

export interface AppointmentBooking {
  id: string;
  customerName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  mode: 'In-Person' | 'Online/Phone';
  notes: string;
  createdAt: string;
}
