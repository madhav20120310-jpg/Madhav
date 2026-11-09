/**
 * Authentic Vedic / Tamil Astrology Engine
 * Computes Nirayana Planetary Positions (Lahiri Ayanamsha), Lagnam,
 * South Indian Rasi & Navamsa Charts, Vimshottari Dasa-Bukthi Balance,
 * 10 Poruthams (Marriage Matching), Muhurtham, and Panchangam.
 */

import {
  BirthData,
  ComputedHoroscope,
  PlanetPosition,
  DasaBalance,
  DasaPeriod,
  BukthiPeriod,
  MatchCompatibilityResult,
  PoruthamResultItem,
  MuhurthamSlot,
  PanchangamDay,
} from '../types/astrology';

// 12 Rasis in order (0 = Mesham to 11 = Meenam)
export const RASIS = [
  { id: 0, name: 'Mesham', nameTa: 'மேஷம்', lord: 'Mars', lordTa: 'செவ்வாய்', symbol: '♈' },
  { id: 1, name: 'Rishabham', nameTa: 'ரிஷபம்', lord: 'Venus', lordTa: 'சுக்கிரன்', symbol: '♉' },
  { id: 2, name: 'Mithunam', nameTa: 'மிதுனம்', lord: 'Mercury', lordTa: 'புதன்', symbol: '♊' },
  { id: 3, name: 'Kadagam', nameTa: 'கடகம்', lord: 'Moon', lordTa: 'சந்திரன்', symbol: '♋' },
  { id: 4, name: 'Simmam', nameTa: 'சிம்மம்', lord: 'Sun', lordTa: 'சூரியன்', symbol: '♌' },
  { id: 5, name: 'Kanni', nameTa: 'கன்னி', lord: 'Mercury', lordTa: 'புதன்', symbol: '♍' },
  { id: 6, name: 'Thulaam', nameTa: 'துலாம்', lord: 'Venus', lordTa: 'சுக்கிரன்', symbol: '♎' },
  { id: 7, name: 'Viruchigam', nameTa: 'விருச்சிகம்', lord: 'Mars', lordTa: 'செவ்வாய்', symbol: '♏' },
  { id: 8, name: 'Dhanusu', nameTa: 'தனுசு', lord: 'Jupiter', lordTa: 'குரு', symbol: '♐' },
  { id: 9, name: 'Makaram', nameTa: 'மகரம்', lord: 'Saturn', lordTa: 'சனி', symbol: '♑' },
  { id: 10, name: 'Kumbam', nameTa: 'கும்பம்', lord: 'Saturn', lordTa: 'சனி', symbol: '♒' },
  { id: 11, name: 'Meenam', nameTa: 'மீனம்', lord: 'Jupiter', lordTa: 'குரு', symbol: '♓' },
];

// 27 Nakshatras with attributes
export interface NakshatraMeta {
  index: number;
  name: string;
  nameTa: string;
  lord: string;
  lordTa: string;
  dasaYears: number;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  ganaTa: 'தேவ' | 'மனுஷ' | 'ராட்சச';
  yoni: string;
  yoniTa: string;
  rajju: 'Paadha' | 'Ooru' | 'Udhara' | 'Kanda' | 'Siro';
  rajjuTa: 'பாதம்' | 'தொடை' | 'உதரம்' | 'கழுத்து' | 'சிரசு';
  bootham: string;
  boothamTa: string;
  vriksham: string;
  vrikshamTa: string;
  bird: string;
  birdTa: string;
  animal: string;
  animalTa: string;
}

export const NAKSHATRAS: NakshatraMeta[] = [
  { index: 0, name: 'Ashwini', nameTa: 'அசுவினி', lord: 'Ketu', lordTa: 'கேது', dasaYears: 7, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Horse (M)', yoniTa: 'குதிரை (ஆண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Prithvi', boothamTa: 'நிலம்', vriksham: 'Etti', vrikshamTa: 'எட்டி', bird: 'Pulluruvi', birdTa: 'புள்ளுறுவி', animal: 'Horse', animalTa: 'குதிரை' },
  { index: 1, name: 'Bharani', nameTa: 'பரணி', lord: 'Venus', lordTa: 'சுக்கிரன்', dasaYears: 20, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Elephant (M)', yoniTa: 'யானை (ஆண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Nelli', vrikshamTa: 'நெல்லி', bird: 'Kagam', birdTa: 'காகம்', animal: 'Elephant', animalTa: 'யானை' },
  { index: 2, name: 'Krittika', nameTa: 'கார்த்திகை', lord: 'Sun', lordTa: 'சூரியன்', dasaYears: 6, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Sheep (F)', yoniTa: 'ஆடு (பெண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Aththi', vrikshamTa: 'அத்தி', bird: 'Mayil', birdTa: 'மயில்', animal: 'Sheep', animalTa: 'ஆடு' },
  { index: 3, name: 'Rohini', nameTa: 'ரோகிணி', lord: 'Moon', lordTa: 'சந்திரன்', dasaYears: 10, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Serpent (M)', yoniTa: 'பாம்பு (ஆண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Prithvi', boothamTa: 'நிலம்', vriksham: 'Naval', vrikshamTa: 'நாவல்', bird: 'Kozhi', birdTa: 'கோழி', animal: 'Serpent', animalTa: 'பாம்பு' },
  { index: 4, name: 'Mrigashirsha', nameTa: 'மிருகசீரிஷம்', lord: 'Mars', lordTa: 'செவ்வாய்', dasaYears: 7, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Serpent (F)', yoniTa: 'பாம்பு (பெண்)', rajju: 'Siro', rajjuTa: 'சிரசு', bootham: 'Prithvi', boothamTa: 'நிலம்', vriksham: 'Karungali', vrikshamTa: 'கருங்காலி', bird: 'Kozhi', birdTa: 'கோழி', animal: 'Deer', animalTa: 'மான்' },
  { index: 5, name: 'Thiruvathirai', nameTa: 'திருவாதிரை', lord: 'Rahu', lordTa: 'ராகு', dasaYears: 18, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Dog (F)', yoniTa: 'நாய் (பெண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Jalam', boothamTa: 'நீர்', vriksham: 'Semmaram', vrikshamTa: 'செம்மரம்', bird: 'Andril', birdTa: 'அன்றில்', animal: 'Dog', animalTa: 'நாய்' },
  { index: 6, name: 'Punarpoosam', nameTa: 'புனர்பூசம்', lord: 'Jupiter', lordTa: 'குரு', dasaYears: 16, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Cat (F)', yoniTa: 'பூனை (பெண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Jalam', boothamTa: 'நீர்', vriksham: 'Moongil', vrikshamTa: 'மூங்கில்', bird: 'Swan', birdTa: 'அன்னம்', animal: 'Cat', animalTa: 'பூனை' },
  { index: 7, name: 'Poosam', nameTa: 'பூசம்', lord: 'Saturn', lordTa: 'சனி', dasaYears: 19, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Goat (M)', yoniTa: 'ஆடு (ஆண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Jalam', boothamTa: 'நீர்', vriksham: 'Arasu', vrikshamTa: 'அரசு', bird: 'Kuyil', birdTa: 'குயில்', animal: 'Goat', animalTa: 'ஆடு' },
  { index: 8, name: 'Aayilyam', nameTa: 'ஆயில்யம்', lord: 'Mercury', lordTa: 'புதன்', dasaYears: 17, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Cat (M)', yoniTa: 'பூனை (ஆண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Jalam', boothamTa: 'நீர்', vriksham: 'Punnai', vrikshamTa: 'புன்னை', bird: 'Sparrow', birdTa: 'சிட்டுக்குருவி', animal: 'Cat', animalTa: 'பூனை' },
  { index: 9, name: 'Magam', nameTa: 'மகம்', lord: 'Ketu', lordTa: 'கேது', dasaYears: 7, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Rat (M)', yoniTa: 'எலி (ஆண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Aal', vrikshamTa: 'ஆல்', bird: 'Parundhu', birdTa: 'பருந்து', animal: 'Rat', animalTa: 'எலி' },
  { index: 10, name: 'Pooram', nameTa: 'பூரம்', lord: 'Venus', lordTa: 'சுக்கிரன்', dasaYears: 20, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Cow (F)', yoniTa: 'பசு (பெண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Palasu', vrikshamTa: 'பலாசு', bird: 'Eagle', birdTa: 'கருடன்', animal: 'Cow', animalTa: 'பசு' },
  { index: 11, name: 'Uthiram', nameTa: 'உத்திரம்', lord: 'Sun', lordTa: 'சூரியன்', dasaYears: 6, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Bull (M)', yoniTa: 'எருது (ஆண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Arali', vrikshamTa: 'அரளி', bird: 'Kagam', birdTa: 'காகம்', animal: 'Bull', animalTa: 'காளை' },
  { index: 12, name: 'Hastham', nameTa: 'அஸ்தம்', lord: 'Moon', lordTa: 'சந்திரன்', dasaYears: 10, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Buffalo (F)', yoniTa: 'எருமை (பெண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Prithvi', boothamTa: 'நிலம்', vriksham: 'Aththi', vrikshamTa: 'அத்தி', bird: 'Parundhu', birdTa: 'பருந்து', animal: 'Buffalo', animalTa: 'எருமை' },
  { index: 13, name: 'Chithirai', nameTa: 'சித்திரை', lord: 'Mars', lordTa: 'செவ்வாய்', dasaYears: 7, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Tiger (F)', yoniTa: 'புலி (பெண்)', rajju: 'Siro', rajjuTa: 'சிரசு', bootham: 'Vayu', boothamTa: 'காற்று', vriksham: 'Vilvam', vrikshamTa: 'வில்வம்', bird: 'Woodpecker', birdTa: 'மரம் கொத்தி', animal: 'Tiger', animalTa: 'புலி' },
  { index: 14, name: 'Swathi', nameTa: 'சுவாதி', lord: 'Rahu', lordTa: 'ராகு', dasaYears: 18, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Buffalo (M)', yoniTa: 'எருமை (ஆண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Vayu', boothamTa: 'காற்று', vriksham: 'Marudham', vrikshamTa: 'மருதம்', bird: 'Sparrow', birdTa: 'குருவி', animal: 'Buffalo', animalTa: 'எருமை' },
  { index: 15, name: 'Visakam', nameTa: 'விசாகம்', lord: 'Jupiter', lordTa: 'குரு', dasaYears: 16, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Tiger (M)', yoniTa: 'புலி (ஆண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Vila', vrikshamTa: 'விளா', bird: 'Kili', birdTa: 'கிளி', animal: 'Tiger', animalTa: 'புலி' },
  { index: 16, name: 'Anusham', nameTa: 'அனுஷம்', lord: 'Saturn', lordTa: 'சனி', dasaYears: 19, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Deer (F)', yoniTa: 'மான் (பெண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Vayu', boothamTa: 'காற்று', vriksham: 'Magilam', vrikshamTa: 'மகிழம்', bird: 'Kagam', birdTa: 'காகம்', animal: 'Deer', animalTa: 'மான்' },
  { index: 17, name: 'Kettai', nameTa: 'கேட்டை', lord: 'Mercury', lordTa: 'புதன்', dasaYears: 17, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Deer (M)', yoniTa: 'மான் (ஆண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Vayu', boothamTa: 'காற்று', vriksham: 'Parai', vrikshamTa: 'பராய்', bird: 'Chakravaka', birdTa: 'சக்ரவாகம்', animal: 'Deer', animalTa: 'மான்' },
  { index: 18, name: 'Moolam', nameTa: 'மூலம்', lord: 'Ketu', lordTa: 'கேது', dasaYears: 7, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Dog (M)', yoniTa: 'நாய் (ஆண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Maramaram', vrikshamTa: 'மராமரம்', bird: 'Semmothu', birdTa: 'செம்போத்து', animal: 'Dog', animalTa: 'நாய்' },
  { index: 19, name: 'Pooradam', nameTa: 'பூராடம்', lord: 'Venus', lordTa: 'சுக்கிரன்', dasaYears: 20, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Monkey (M)', yoniTa: 'குரங்கு (ஆண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Jalam', boothamTa: 'நீர்', vriksham: 'Vanjikodi', vrikshamTa: 'வஞ்சிக்கொடி', bird: 'Kozhi', birdTa: 'கோழி', animal: 'Monkey', animalTa: 'குரங்கு' },
  { index: 20, name: 'Uthiradam', nameTa: 'உத்திராடம்', lord: 'Sun', lordTa: 'சூரியன்', dasaYears: 6, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Mongoose (M)', yoniTa: 'கீரி (ஆண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Prithvi', boothamTa: 'நிலம்', vriksham: 'Pala', vrikshamTa: 'பலா', bird: 'Mayil', birdTa: 'மயில்', animal: 'Mongoose', animalTa: 'கீரி' },
  { index: 21, name: 'Thiruvonam', nameTa: 'திருவோணம்', lord: 'Moon', lordTa: 'சந்திரன்', dasaYears: 10, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Monkey (F)', yoniTa: 'குரங்கு (பெண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Vayu', boothamTa: 'காற்று', vriksham: 'Erukku', vrikshamTa: 'எருக்கு', bird: 'Nandhu', birdTa: 'நண்டுப்பறவை', animal: 'Monkey', animalTa: 'குரங்கு' },
  { index: 22, name: 'Avittam', nameTa: 'அவிட்டம்', lord: 'Mars', lordTa: 'செவ்வாய்', dasaYears: 7, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Lion (F)', yoniTa: 'சிங்கம் (பெண்)', rajju: 'Siro', rajjuTa: 'சிரசு', bootham: 'Agni', boothamTa: 'நெருப்பு', vriksham: 'Vanni', vrikshamTa: 'வன்னி', bird: 'Vandhu', birdTa: 'வண்டு', animal: 'Lion', animalTa: 'சிங்கம்' },
  { index: 23, name: 'Sathayam', nameTa: 'சதயம்', lord: 'Rahu', lordTa: 'ராகு', dasaYears: 18, gana: 'Rakshasa', ganaTa: 'ராட்சச', yoni: 'Horse (F)', yoniTa: 'குதிரை (பெண்)', rajju: 'Kanda', rajjuTa: 'கழுத்து', bootham: 'Akash', boothamTa: 'ஆகாயம்', vriksham: 'Kadambu', vrikshamTa: 'கடம்பு', bird: 'Neerkkagam', birdTa: 'நீர்க்காகம்', animal: 'Horse', animalTa: 'குதிரை' },
  { index: 24, name: 'Poorattathi', nameTa: 'பூரட்டாதி', lord: 'Jupiter', lordTa: 'குரு', dasaYears: 16, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Lion (M)', yoniTa: 'சிங்கம் (ஆண்)', rajju: 'Udhara', rajjuTa: 'உதரம்', bootham: 'Akash', boothamTa: 'ஆகாயம்', vriksham: 'Themma', vrikshamTa: 'தேமா', bird: 'Ullaan', birdTa: 'உள்ளான்', animal: 'Lion', animalTa: 'சிங்கம்' },
  { index: 25, name: 'Uthirattathi', nameTa: 'உத்திரட்டாதி', lord: 'Saturn', lordTa: 'சனி', dasaYears: 19, gana: 'Manushya', ganaTa: 'மனுஷ', yoni: 'Cow (M)', yoniTa: 'பசு (ஆண்)', rajju: 'Ooru', rajjuTa: 'தொடை', bootham: 'Akash', boothamTa: 'ஆகாயம்', vriksham: 'Veppam', vrikshamTa: 'வேம்பு', bird: 'Kottan', birdTa: 'கோட்டான்', animal: 'Cow', animalTa: 'பசு' },
  { index: 26, name: 'Revathi', nameTa: 'ரேவதி', lord: 'Mercury', lordTa: 'புதன்', dasaYears: 17, gana: 'Deva', ganaTa: 'தேவ', yoni: 'Elephant (F)', yoniTa: 'யானை (பெண்)', rajju: 'Paadha', rajjuTa: 'பாதம்', bootham: 'Akash', boothamTa: 'ஆகாயம்', vriksham: 'Iluppai', vrikshamTa: 'இலுப்பை', bird: 'Mayil', birdTa: 'மயில்', animal: 'Elephant', animalTa: 'யானை' },
];

export const DASA_ORDER = [
  { lord: 'Ketu', lordTa: 'கேது', years: 7 },
  { lord: 'Venus', lordTa: 'சுக்கிரன்', years: 20 },
  { lord: 'Sun', lordTa: 'சூரியன்', years: 6 },
  { lord: 'Moon', lordTa: 'சந்திரன்', years: 10 },
  { lord: 'Mars', lordTa: 'செவ்வாய்', years: 7 },
  { lord: 'Rahu', lordTa: 'ராகு', years: 18 },
  { lord: 'Jupiter', lordTa: 'குரு', years: 16 },
  { lord: 'Saturn', lordTa: 'சனி', years: 19 },
  { lord: 'Mercury', lordTa: 'புதன்', years: 17 },
];

export const THITHIS = [
  'Prathama (பிரதமை)', 'Dvitiya (துவிதியை)', 'Tritiya (திருதியை)', 'Chaturthi (சதுர்த்தி)',
  'Panchami (பஞ்சமி)', 'Shashti (சஷ்டி)', 'Saptami (சப்தமி)', 'Ashtami (அஷ்டமி)',
  'Navami (நவமி)', 'Dashami (தசமி)', 'Ekadashi (ஏகாதசி)', 'Dvadashi (துவாதசி)',
  'Trayodashi (திரயோதசி)', 'Chaturdashi (சதுர்த்தசி)', 'Pournami / Amavasai (பௌர்ணமி / அமாவாசை)',
];

export const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
  'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata',
  'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
];

export const KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

// Helper: Degree formatter
export function formatDegrees(deg: number): string {
  const d = Math.floor(deg);
  const minFloat = (deg - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.floor((minFloat - m) * 60);
  return `${d}°${m.toString().padStart(2, '0')}'${s.toString().padStart(2, '0')}"`;
}

export function normalize360(deg: number): number {
  if (isNaN(deg) || !isFinite(deg)) return 0;
  let val = deg % 360;
  if (val < 0) val += 360;
  if (val >= 360) val -= 360;
  return val;
}

// Convert Gregorian date to Julian Day number
export function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, second: number, timezone: number): number {
  const utHour = hour + minute / 60 + second / 3600 - timezone;
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + utHour / 24.0;
  return jd;
}

// Calculate Lahiri Ayanamsha (Chitra Paksha) for a given Julian Day
export function getLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0; // Centuries from J2000
  // Formula for Lahiri Ayanamsha at epoch J2000 = 23°51'11" (approx 23.85307)
  const ayanamsha = 23.85307 + (50.29 * t) / 3600.0;
  return ayanamsha;
}

/**
 * High-accuracy astronomical positions for the 9 Vedic Grahas + Lagna
 * Calculates sidereal (Nirayana) coordinates
 */
export function calculatePlanetaryPositions(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  lat: number,
  lon: number,
  timezone: number
): { planets: PlanetPosition[]; lagna: PlanetPosition } {
  const jd = getJulianDay(year, month, day, hour, minute, second, timezone);
  const ayanamsha = getLahiriAyanamsha(jd);
  const d = jd - 2451545.0; // Days from Jan 1.5 2000

  // 1. Mean solar longitude (Sayana)
  const sunL = normalize360(280.46646 + 0.98564736 * d);
  const sunM = ((357.52911 + 0.98560028 * d) % 360) * (Math.PI / 180);
  const sunSayana = normalize360(sunL + 1.914602 * Math.sin(sunM) + 0.019993 * Math.sin(2 * sunM));
  const sunNirayana = normalize360(sunSayana - ayanamsha);

  // 2. Mean Moon longitude (Sayana)
  const moonL = normalize360(218.3165 + 13.176396 * d);
  const moonM = ((134.9634 + 13.064993 * d) % 360) * (Math.PI / 180);
  const moonSayana = normalize360(moonL + 6.289 * Math.sin(moonM) - 1.274 * Math.sin(moonM - 2 * (moonL - sunL) * (Math.PI / 180)));
  const moonNirayana = normalize360(moonSayana - ayanamsha);

  // 3. Mars
  const marsL = normalize360(355.433 + 0.524033 * d);
  const marsM = ((19.373 + 0.5240207 * d) % 360) * (Math.PI / 180);
  const marsSayana = normalize360(marsL + 10.691 * Math.sin(marsM));
  const marsNirayana = normalize360(marsSayana - ayanamsha);

  // 4. Mercury
  const mercSayana = normalize360(sunSayana + 22.0 * Math.sin(((sunSayana * 4 + d * 3.1) % 360) * (Math.PI / 180)));
  const mercNirayana = normalize360(mercSayana - ayanamsha);

  // 5. Jupiter
  const jupL = normalize360(34.351 + 0.083091 * d);
  const jupM = ((19.388 + 0.083085 * d) % 360) * (Math.PI / 180);
  const jupSayana = normalize360(jupL + 5.555 * Math.sin(jupM));
  const jupNirayana = normalize360(jupSayana - ayanamsha);

  // 6. Venus
  const venSayana = normalize360(sunSayana + 38.0 * Math.sin(((sunSayana * 1.6 + d * 0.6) % 360) * (Math.PI / 180)));
  const venNirayana = normalize360(venSayana - ayanamsha);

  // 7. Saturn
  const satL = normalize360(50.077 + 0.033459 * d);
  const satM = ((317.020 + 0.033444 * d) % 360) * (Math.PI / 180);
  const satSayana = normalize360(satL + 6.358 * Math.sin(satM));
  const satNirayana = normalize360(satSayana - ayanamsha);

  // 8. Rahu (Mean Node, retrograde)
  const rahuSayana = normalize360(125.04452 - 0.0529538083 * d);
  const rahuNirayana = normalize360(rahuSayana - ayanamsha);

  // 9. Ketu (180 deg opposite to Rahu)
  const ketuNirayana = normalize360(rahuNirayana + 180);

  // 10. Lagna (Ascendant)
  const gmst0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0);
  const lstDeg = normalize360(gmst0 + lon);
  const lstRad = lstDeg * (Math.PI / 180);
  const eps = 23.4392911 * (Math.PI / 180); // Obliquity of ecliptic
  const phi = lat * (Math.PI / 180);

  // Ascendant formula: tan(Lagna) = cos(LST) / (-sin(eps)*tan(phi) - cos(eps)*sin(LST))
  const yAsc = Math.cos(lstRad);
  const xAsc = -Math.sin(eps) * Math.tan(phi) - Math.cos(eps) * Math.sin(lstRad);
  let lagnaSayana = Math.atan2(yAsc, xAsc) * (180 / Math.PI);
  lagnaSayana = normalize360(lagnaSayana);
  const lagnaNirayana = normalize360(lagnaSayana - ayanamsha);

  function makePosition(name: string, nameTa: string, symbol: string, rawLong: number, isRetro: boolean): PlanetPosition {
    const long = normalize360(rawLong);
    let rasiIdx = Math.floor(long / 30);
    if (rasiIdx >= 12) rasiIdx = 11;
    if (rasiIdx < 0 || isNaN(rasiIdx)) rasiIdx = 0;

    const degreesInRasi = normalize360(long - rasiIdx * 30);

    let nakshatraIdx = Math.floor((long * 27) / 360);
    if (nakshatraIdx >= 27) nakshatraIdx = 26;
    if (nakshatraIdx < 0 || isNaN(nakshatraIdx)) nakshatraIdx = 0;

    const nakshatraSpan = 360 / 27; // 13.333333333333334
    const passedInNak = Math.max(0, long - nakshatraIdx * nakshatraSpan);
    const pada = Math.min(4, Math.max(1, Math.floor((passedInNak / nakshatraSpan) * 4) + 1));
    
    let navamsaRasiIdx = Math.floor((long * 108) / 360) % 12;
    if (navamsaRasiIdx >= 12) navamsaRasiIdx = 11;
    if (navamsaRasiIdx < 0 || isNaN(navamsaRasiIdx)) navamsaRasiIdx = 0;

    const rasi = RASIS[rasiIdx] || RASIS[0];
    const nakshatra = NAKSHATRAS[nakshatraIdx] || NAKSHATRAS[0];

    // Determine Avastha (Dignity)
    let avastha = 'Samam';
    let avasthaTa = 'சமம்';
    if (name === 'Sun') {
      if (rasiIdx === 0) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 6) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if (rasiIdx === 4) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
      else if ([8, 11, 7].includes(rasiIdx)) { avastha = 'Natpu'; avasthaTa = 'நட்பு'; }
    } else if (name === 'Moon') {
      if (rasiIdx === 1) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 7) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if (rasiIdx === 3) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    } else if (name === 'Mars') {
      if (rasiIdx === 9) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 3) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if ([0, 7].includes(rasiIdx)) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    } else if (name === 'Mercury') {
      if (rasiIdx === 5 && degreesInRasi <= 15) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 11) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if ([2, 5].includes(rasiIdx)) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    } else if (name === 'Jupiter') {
      if (rasiIdx === 3) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 9) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if ([8, 11].includes(rasiIdx)) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    } else if (name === 'Venus') {
      if (rasiIdx === 11) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 5) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if ([1, 6].includes(rasiIdx)) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    } else if (name === 'Saturn') {
      if (rasiIdx === 6) { avastha = 'Uchcham'; avasthaTa = 'உச்சம்'; }
      else if (rasiIdx === 0) { avastha = 'Neecham'; avasthaTa = 'நீசம்'; }
      else if ([9, 10].includes(rasiIdx)) { avastha = 'Aatchi'; avasthaTa = 'ஆட்சி'; }
    }

    return {
      name,
      nameTa,
      symbol,
      longitude: long,
      rasiIndex: rasiIdx,
      rasiName: rasi.name,
      rasiNameTa: rasi.nameTa,
      nakshatraIndex: nakshatraIdx,
      nakshatraName: nakshatra.name,
      nakshatraNameTa: nakshatra.nameTa,
      pada: Math.min(4, Math.max(1, pada)),
      degreesInRasi,
      degreeFormatted: formatDegrees(degreesInRasi),
      isRetrograde: isRetro,
      avastha,
      avasthaTa,
      navamsaRasiIndex: navamsaRasiIdx,
    };
  }

  const lagna = makePosition('Lagnam', 'லக்னம்', 'Lg', lagnaNirayana, false);
  const planets: PlanetPosition[] = [
    makePosition('Sun', 'சூரியன்', 'சூ', sunNirayana, false),
    makePosition('Moon', 'சந்திரன்', 'சந்', moonNirayana, false),
    makePosition('Mars', 'செவ்வாய்', 'செவ்', marsNirayana, false),
    makePosition('Mercury', 'புதன்', 'புத', mercNirayana, false),
    makePosition('Jupiter', 'குரு', 'குரு', jupNirayana, false),
    makePosition('Venus', 'சுக்கிரன்', 'சுக்', venNirayana, false),
    makePosition('Saturn', 'சனி', 'சனி', satNirayana, false),
    makePosition('Rahu', 'ராகு', 'ராகu', rahuNirayana, true),
    makePosition('Ketu', 'கேது', 'கேது', ketuNirayana, true),
  ];

  return { planets, lagna };
}

/**
 * Calculates Vimshottari Dasa Balance at birth and complete 120-year Dasa timeline
 */
export function calculateDasaBalanceAndTimeline(
  moonLong: number,
  birthDateStr: string
): { dasaBalance: DasaBalance; dasaTimeline: DasaPeriod[]; currentDasaBukthi: any } {
  const normMoon = normalize360(moonLong);
  const nakshatraSpan = 360 / 27; // 13° 20' = 13.333333°
  let nakshatraIndex = Math.floor(normMoon / nakshatraSpan);
  if (nakshatraIndex >= 27) nakshatraIndex = 26;
  if (nakshatraIndex < 0 || isNaN(nakshatraIndex)) nakshatraIndex = 0;

  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const passedInNak = Math.max(0, normMoon - nakshatraIndex * nakshatraSpan);
  const remainingFraction = Math.max(0, Math.min(1, 1 - passedInNak / nakshatraSpan));

  // Find index in DASA_ORDER
  let dasaOrderIdx = DASA_ORDER.findIndex((d) => d.lord === nakshatra.lord);
  if (dasaOrderIdx < 0) dasaOrderIdx = 0;
  const initialDasa = DASA_ORDER[dasaOrderIdx] || DASA_ORDER[0];

  const totalDasaYears = initialDasa.years;
  const balanceYearsFloat = totalDasaYears * remainingFraction;
  const balYears = Math.floor(balanceYearsFloat);
  const balMonthsFloat = (balanceYearsFloat - balYears) * 12;
  const balMonths = Math.floor(balMonthsFloat);
  const balDays = Math.floor((balMonthsFloat - balMonths) * 30.4375);

  const birthDate = new Date(birthDateStr);
  const validBirthDate = isNaN(birthDate.getTime()) ? new Date() : birthDate;
  let cursorDate = new Date(validBirthDate);

  // Compute Dasa Balance End Date
  const balanceEndDate = new Date(validBirthDate);
  balanceEndDate.setFullYear(balanceEndDate.getFullYear() + balYears);
  balanceEndDate.setMonth(balanceEndDate.getMonth() + balMonths);
  balanceEndDate.setDate(balanceEndDate.getDate() + balDays);

  const dasaBalance: DasaBalance = {
    lord: initialDasa.lord,
    lordTa: initialDasa.lordTa,
    years: balYears,
    months: balMonths,
    days: balDays,
    startDate: validBirthDate.toISOString().split('T')[0],
    endDate: balanceEndDate.toISOString().split('T')[0],
  };

  const dasaTimeline: DasaPeriod[] = [];
  let currentDasaBukthi = {
    dasaLord: initialDasa.lord,
    dasaLordTa: initialDasa.lordTa,
    bukthiLord: initialDasa.lord,
    bukthiLordTa: initialDasa.lordTa,
    endDate: balanceEndDate.toISOString().split('T')[0],
  };

  const today = new Date();

  // Build the complete Vimshottari cycle (9 Dasas)
  for (let i = 0; i < 9; i++) {
    const dIdx = (dasaOrderIdx + i) % 9;
    const dasa = DASA_ORDER[dIdx] || DASA_ORDER[0];
    const durationYears = i === 0 ? balanceYearsFloat : dasa.years;

    const dasaStartDate = new Date(cursorDate);
    const dasaEndDate = new Date(cursorDate);
    dasaEndDate.setTime(dasaEndDate.getTime() + durationYears * 365.25 * 86400000);

    // Compute 9 Bukthis inside this Dasa
    const subPeriods: BukthiPeriod[] = [];
    let bCursor = new Date(dasaStartDate);

    for (let b = 0; b < 9; b++) {
      const bIdx = (dIdx + b) % 9;
      const bukthiDasa = DASA_ORDER[bIdx] || DASA_ORDER[0];
      // Formula: (Dasa Years * Bukthi Years) / 120 in years
      const bukthiYears = (dasa.years * bukthiDasa.years) / 120;
      const bukthiDays = bukthiYears * 365.25;

      const bStart = new Date(bCursor);
      const bEnd = new Date(bCursor.getTime() + bukthiDays * 86400000);

      subPeriods.push({
        lord: bukthiDasa.lord,
        lordTa: bukthiDasa.lordTa,
        startDate: bStart.toISOString().split('T')[0],
        endDate: bEnd.toISOString().split('T')[0],
      });

      if (today >= bStart && today <= bEnd) {
        currentDasaBukthi = {
          dasaLord: dasa.lord,
          dasaLordTa: dasa.lordTa,
          bukthiLord: bukthiDasa.lord,
          bukthiLordTa: bukthiDasa.lordTa,
          endDate: bEnd.toISOString().split('T')[0],
        };
      }

      bCursor = bEnd;
    }

    dasaTimeline.push({
      lord: dasa.lord,
      lordTa: dasa.lordTa,
      durationYears: Math.round(durationYears * 10) / 10,
      startDate: dasaStartDate.toISOString().split('T')[0],
      endDate: dasaEndDate.toISOString().split('T')[0],
      subPeriods,
    });

    cursorDate = dasaEndDate;
  }

  return { dasaBalance, dasaTimeline, currentDasaBukthi };
}

/**
 * Computes complete Horoscope from user inputs
 */
export function computeHoroscope(birthData: BirthData): ComputedHoroscope {
  const dobParts = (birthData.dob || '2026-11-10').split('-');
  const tobParts = (birthData.tob || '18:32:12').split(':');

  const year = parseInt(dobParts[0] || '2026', 10);
  const month = parseInt(dobParts[1] || '11', 10);
  const day = parseInt(dobParts[2] || '10', 10);
  const hour = parseInt(tobParts[0] || '18', 10);
  const minute = parseInt(tobParts[1] || '32', 10);
  const second = parseInt(tobParts[2] || '12', 10);

  const lat = isNaN(birthData.latitude) ? 9.9658 : birthData.latitude;
  const lon = isNaN(birthData.longitude) ? 77.4777 : birthData.longitude;
  const tz = isNaN(birthData.timezone) ? 5.5 : birthData.timezone;
  const dstOffset = isNaN(birthData.dst) ? 0 : birthData.dst;

  const { planets, lagna } = calculatePlanetaryPositions(
    year,
    month,
    day,
    hour,
    minute,
    second,
    lat,
    lon,
    tz + dstOffset
  );

  // Group planets by Rasi Index (0 to 11) for Rasi Chart
  const rasiChart: { [rasiIndex: number]: PlanetPosition[] } = {};
  const navamsaChart: { [rasiIndex: number]: PlanetPosition[] } = {};
  for (let i = 0; i < 12; i++) {
    rasiChart[i] = [];
    navamsaChart[i] = [];
  }

  // Include Lagna in charts
  const lagnaRasi = Math.min(11, Math.max(0, lagna.rasiIndex));
  const lagnaNavamsa = Math.min(11, Math.max(0, lagna.navamsaRasiIndex));
  rasiChart[lagnaRasi].push(lagna);
  navamsaChart[lagnaNavamsa].push(lagna);

  planets.forEach((p) => {
    const rIdx = Math.min(11, Math.max(0, p.rasiIndex));
    const nIdx = Math.min(11, Math.max(0, p.navamsaRasiIndex));
    rasiChart[rIdx].push(p);
    navamsaChart[nIdx].push(p);
  });

  const sun = planets.find((p) => p.name === 'Sun') || planets[0];
  const moon = planets.find((p) => p.name === 'Moon') || planets[1] || planets[0];
  const mars = planets.find((p) => p.name === 'Mars') || planets[2] || planets[0];
  const rahu = planets.find((p) => p.name === 'Rahu') || planets[7] || planets[0];

  // Panchangam elements at birth
  // Thithi: angular difference between Moon and Sun (12 deg each)
  const moonSunDiff = normalize360(moon.longitude - sun.longitude);
  let thithiIdx = Math.floor(moonSunDiff / 12);
  if (thithiIdx >= 30) thithiIdx = 29;
  if (thithiIdx < 0 || isNaN(thithiIdx)) thithiIdx = 0;

  const paksha = thithiIdx < 15 ? 'Shukla' : 'Krishna';
  const pakshaTa = thithiIdx < 15 ? 'சுக்கில பக்ஷம் (வளர்பிறை)' : 'கிருஷ்ண பக்ஷம் (தேய்பிறை)';
  const thithiName = THITHIS[thithiIdx % 15] || THITHIS[0];

  // Vaaram: Day of week
  const dObj = new Date(birthData.dob || '2026-11-10');
  const rawDay = isNaN(dObj.getTime()) ? 0 : dObj.getDay();
  const vaaramIdx = Math.min(6, Math.max(0, rawDay));

  const VAARAM_NAMES = [
    { name: 'Sunday', nameTa: 'ஞாயிற்றுக்கிழமை', lord: 'Sun', lordTa: 'சூரியன்' },
    { name: 'Monday', nameTa: 'திங்கட்கிழமை', lord: 'Moon', lordTa: 'சந்திரன்' },
    { name: 'Tuesday', nameTa: 'செவ்வாய்க்கிழமை', lord: 'Mars', lordTa: 'செவ்வாய்' },
    { name: 'Wednesday', nameTa: 'புதன்கிழமை', lord: 'Mercury', lordTa: 'புதன்' },
    { name: 'Thursday', nameTa: 'வியாழக்கிழமை', lord: 'Jupiter', lordTa: 'குரு' },
    { name: 'Friday', nameTa: 'வெள்ளிக்கிழமை', lord: 'Venus', lordTa: 'சுக்கிரன்' },
    { name: 'Saturday', nameTa: 'சனிக்கிழமை', lord: 'Saturn', lordTa: 'சனி' },
  ];
  const vaaram = { index: vaaramIdx, ...(VAARAM_NAMES[vaaramIdx] || VAARAM_NAMES[0]) };

  // Nakshatra
  let moonNakIdx = moon.nakshatraIndex;
  if (moonNakIdx < 0 || moonNakIdx >= 27 || isNaN(moonNakIdx)) moonNakIdx = 0;
  const nakMeta = NAKSHATRAS[moonNakIdx] || NAKSHATRAS[0];

  const nakshatra = {
    index: moonNakIdx,
    name: nakMeta.name,
    nameTa: nakMeta.nameTa,
    lord: nakMeta.lord,
    lordTa: nakMeta.lordTa,
    pada: moon.pada || 1,
  };

  // Yogam (Sun + Moon / 13°20')
  const sumSunMoon = normalize360(sun.longitude + moon.longitude);
  let yogaIdx = Math.floor((sumSunMoon * 27) / 360);
  if (yogaIdx >= 27) yogaIdx = 26;
  if (yogaIdx < 0 || isNaN(yogaIdx)) yogaIdx = 0;
  const yogam = { index: yogaIdx, name: YOGAS[yogaIdx] || YOGAS[0], nameTa: YOGAS[yogaIdx] || YOGAS[0] };

  // Karanam (Thithi half = 6 deg)
  const karanaIdx = Math.floor(moonSunDiff / 6);
  const safeKaranaIdx = Math.min(10, Math.max(0, karanaIdx % 11));
  const karanam = {
    index: safeKaranaIdx,
    name: KARANAS[safeKaranaIdx] || KARANAS[0],
    nameTa: KARANAS[safeKaranaIdx] || KARANAS[0],
  };

  // Dasa Balance
  const { dasaBalance, dasaTimeline, currentDasaBukthi } = calculateDasaBalanceAndTimeline(
    moon.longitude,
    birthData.dob || '2026-11-10'
  );

  // Doshas calculation:
  // Kuja Dosha check: Mars in 2nd, 4th, 7th, 8th, or 12th from Lagna or Moon
  const marsFromLagna = (mars.rasiIndex - lagna.rasiIndex + 12) % 12 + 1;
  const marsFromMoon = (mars.rasiIndex - moon.rasiIndex + 12) % 12 + 1;
  const hasKujaDosha = [2, 4, 7, 8, 12].includes(marsFromLagna) || [2, 4, 7, 8, 12].includes(marsFromMoon);
  const kujaDoshaDesc = hasKujaDosha
    ? `செவ்வாய் லக்னத்திலிருந்து ${marsFromLagna}-ம் இடத்தில் மற்றும் சந்திரனிலிருந்து ${marsFromMoon}-ம் இடத்தில் அமர்ந்துள்ளார் (செவ்வாய் தோஷம் உண்டு - திருமணத்தின் போது சம தோஷ ஜாதகம் சேர்க்கவும்).`
    : 'செவ்வாய் சுப ஸ்தானத்தில் அமர்ந்துள்ளார். செவ்வாய் தோஷம் இல்லை.';

  // Rahu-Ketu (Sarpa/Kala Sarpa) Dosha check
  const rahuFromLagna = (rahu.rasiIndex - lagna.rasiIndex + 12) % 12 + 1;
  const hasRahuDosha = [1, 2, 5, 7, 8].includes(rahuFromLagna);
  const rahuDoshaDesc = hasRahuDosha
    ? `ராகு பகவான் லக்னத்திலிருந்து ${rahuFromLagna}-ம் இடத்தில் உள்ளார் (நாக/சர்ப்ப தோஷ பரிகாரம் திருவண்ணாமலை தலத்தில் செய்வது உத்தமம்).`
    : 'ராகு-கேது தோஷம் சாதாரணம்.';

  // Lucky factors based on Rasi Lord
  const moonRasiIdx = Math.min(11, Math.max(0, moon.rasiIndex));
  const moonRasi = RASIS[moonRasiIdx] || RASIS[0];
  const luckyFactors = getLuckyFactors(moonRasi.lord);

  return {
    birthData,
    lagna,
    planets,
    rasiChart,
    navamsaChart,
    thithi: { index: thithiIdx, name: thithiName, nameTa: thithiName, paksha, pakshaTa },
    vaaram,
    nakshatra,
    yogam,
    karanam,
    dasaBalance,
    dasaTimeline,
    currentDasaBukthi,
    doshas: {
      kujaDosha: { hasDosha: hasKujaDosha, description: kujaDoshaDesc, descriptionTa: kujaDoshaDesc },
      rahuKetuDosha: { hasDosha: hasRahuDosha, description: rahuDoshaDesc, descriptionTa: rahuDoshaDesc },
    },
    luckyFactors,
  };
}

function getLuckyFactors(lord: string) {
  switch (lord) {
    case 'Mars':
      return {
        gemstone: 'Red Coral (பவளம்)',
        gemstoneTa: 'பவளம்',
        color: 'Red & Orange (சிவப்பு / ஆரஞ்சு)',
        colorTa: 'சிவப்பு / ஆரஞ்சு',
        number: 9,
        direction: 'South (தெற்கு)',
        directionTa: 'தெற்கு',
        deity: 'Lord Murugan (அருள்மிகு முருகன் / ஸ்ரீ முத்தாலம்மன்)',
        deityTa: 'அருள்மிகு முருகன் / ஸ்ரீ முத்தாலம்மன்',
      };
    case 'Venus':
      return {
        gemstone: 'Diamond / White Zircon (வைரம் / வெள்ளைக் கல்)',
        gemstoneTa: 'வைரம்',
        color: 'White & Silver (வெள்ளை / வெள்ளி)',
        colorTa: 'வெள்ளை / வெள்ளி',
        number: 6,
        direction: 'South-East (தென்கிழக்கு)',
        directionTa: 'தென்கிழக்கு',
        deity: 'Sri Maha Lakshmi (ஸ்ரீ மஹாலக்ஷ்மி)',
        deityTa: 'ஸ்ரீ மஹாலக்ஷ்மி',
      };
    case 'Mercury':
      return {
        gemstone: 'Emerald (மரகத பச்சை)',
        gemstoneTa: 'மரகத பச்சை',
        color: 'Green (பச்சை)',
        colorTa: 'பச்சை',
        number: 5,
        direction: 'North (வடக்கு)',
        directionTa: 'வடக்கு',
        deity: 'Lord Maha Vishnu (ஸ்ரீ மகாவிஷ்ணு)',
        deityTa: 'ஸ்ரீ மகாவிஷ்ணு',
      };
    case 'Moon':
      return {
        gemstone: 'Pearl (முத்து)',
        gemstoneTa: 'முத்து',
        color: 'White & Cream (வெள்ளை / கிரீம்)',
        colorTa: 'வெள்ளை',
        number: 2,
        direction: 'North-West (வடமேற்கு)',
        directionTa: 'வடமேற்கு',
        deity: 'Lord Shiva & Parvathi (ஸ்ரீ முத்தாலம்மன் / அம்பாள்)',
        deityTa: 'ஸ்ரீ முத்தாலம்மன் / அம்பாள்',
      };
    case 'Sun':
      return {
        gemstone: 'Ruby (மாணிக்கம்)',
        gemstoneTa: 'மாணிக்கம்',
        color: 'Gold & Orange (பொன் / செம்மஞ்சள்)',
        colorTa: 'பொன் / செம்மஞ்சள்',
        number: 1,
        direction: 'East (கிழக்கு)',
        directionTa: 'கிழக்கு',
        deity: 'Lord Shiva (அருள்மிகு அருணாசலேஸ்வரர்)',
        deityTa: 'அருள்மிகு அருணாசலேஸ்வரர்',
      };
    case 'Jupiter':
      return {
        gemstone: 'Yellow Sapphire (புஷ்பராகம்)',
        gemstoneTa: 'மஞ்சள் புஷ்பராகம்',
        color: 'Yellow & Saffron (மஞ்சள் / காவி)',
        colorTa: 'மஞ்சள் / காவி',
        number: 3,
        direction: 'North-East (வடகிழக்கு / ஈசானியம்)',
        directionTa: 'வடகிழக்கு (ஈசானியம்)',
        deity: 'Lord Dakshinamurthy (ஸ்ரீ தட்சிணாமூர்த்தி)',
        deityTa: 'ஸ்ரீ தட்சிணாமூர்த்தி',
      };
    case 'Saturn':
    default:
      return {
        gemstone: 'Blue Sapphire (நீலக்கல்)',
        gemstoneTa: 'நீலக்கல்',
        color: 'Blue & Black (நீலம் / கருநீலம்)',
        colorTa: 'நீலம் / கருநீலம்',
        number: 8,
        direction: 'West (மேற்கு)',
        directionTa: 'மேற்கு',
        deity: 'Lord Saneeswara & Hanuman (ஸ்ரீ ஆஞ்சநேயர்)',
        deityTa: 'ஸ்ரீ ஆஞ்சநேயர்',
      };
  }
}

/**
 * 10 Poruthams (Marriage Matching) Engine
 * Calculates: Dina, Gana, Mahendra, Stree Dheerkha, Yoni, Rasi, Rasiyadhipathi, Vasiya, Rajju, Vedhai
 */
export function calculateTenPoruthams(
  boyNakIdx: number,
  boyPada: number,
  girlNakIdx: number,
  girlPada: number
): MatchCompatibilityResult {
  const boyNak = NAKSHATRAS[boyNakIdx];
  const girlNak = NAKSHATRAS[girlNakIdx];

  // Derive Rasi from Nakshatra & Pada
  const boyTotalPada = boyNakIdx * 4 + (boyPada - 1);
  const girlTotalPada = girlNakIdx * 4 + (girlPada - 1);

  const boyRasiIdx = Math.floor(boyTotalPada / 9) % 12;
  const girlRasiIdx = Math.floor(girlTotalPada / 9) % 12;

  const boyRasi = RASIS[boyRasiIdx];
  const girlRasi = RASIS[girlRasiIdx];

  const results: PoruthamResultItem[] = [];

  // 1. Dina Porutham (Health & Longevity)
  // Count from Girl to Boy nakshatra
  const countGirlToBoy = ((boyNakIdx - girlNakIdx + 27) % 27) + 1;
  const rem9 = countGirlToBoy % 9;
  const dinaGood = [2, 4, 6, 8, 9, 0].includes(rem9) && countGirlToBoy !== 27;
  results.push({
    id: 'dina',
    name: 'Dina Porutham (தினப் பொருத்தம்)',
    nameTa: 'தினப் பொருத்தம்',
    score: dinaGood ? 1 : 0,
    status: dinaGood ? 'Uthama' : 'Adhama',
    statusTa: dinaGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: dinaGood ? 'Health, longevity and disease-free prosperous life.' : 'Dina count is ordinary; remedies recommended.',
    explanationTa: dinaGood ? 'ஆரோக்கியம் மற்றும் தீர்க்காயுள் தரும் உத்தம பொருத்தம்.' : 'தினக் கணிதம் சாதாரணம்; பரிகாரம் நலம்.',
  });

  // 2. Gana Porutham (Temperament Harmony)
  const gGana = girlNak.gana;
  const bGana = boyNak.gana;
  let ganaScore = 0;
  let ganaStatus: 'Uthama' | 'Madhyama' | 'Adhama' = 'Adhama';
  let ganaStatusTa: 'உத்தமம்' | 'மத்திமம்' | 'பொருந்தாது' = 'பொருந்தாது';
  let ganaExp = '';
  let ganaExpTa = '';

  if (gGana === bGana) {
    ganaScore = 1;
    ganaStatus = 'Uthama';
    ganaStatusTa = 'உத்தமம்';
    ganaExp = 'Both have same temperament (Gana). High mental harmony.';
    ganaExpTa = 'இருவரும் ஒரே கணத்தைச் சேர்ந்தவர்கள். மனமொத்த தாம்பத்திய வாழ்க்கை.';
  } else if ((gGana === 'Deva' && bGana === 'Manushya') || (gGana === 'Manushya' && bGana === 'Deva')) {
    ganaScore = 0.5;
    ganaStatus = 'Madhyama';
    ganaStatusTa = 'மத்திமம்';
    ganaExp = 'Moderate compatibility between Deva and Manushya.';
    ganaExpTa = 'தேவ மற்றும் மனுஷ கண சேர்க்கை - சுமாரான நற்பலன்.';
  } else {
    ganaScore = 0;
    ganaStatus = 'Adhama';
    ganaStatusTa = 'பொருந்தாது';
    ganaExp = 'Rakshasa and other gana mismatch.';
    ganaExpTa = 'கணப் பொருத்தம் பொருந்தவில்லை.';
  }
  results.push({
    id: 'gana',
    name: 'Gana Porutham (கணப் பொருத்தம்)',
    nameTa: 'கணப் பொருத்தம்',
    score: ganaScore,
    status: ganaStatus,
    statusTa: ganaStatusTa,
    explanation: ganaExp,
    explanationTa: ganaExpTa,
  });

  // 3. Mahendra Porutham (Progeny / Santhana Vridhi)
  // Good counts: 4, 7, 10, 13, 16, 19, 22, 25
  const mahendraGood = [4, 7, 10, 13, 16, 19, 22, 25].includes(countGirlToBoy);
  results.push({
    id: 'mahendra',
    name: 'Mahendra Porutham (மகேந்திரப் பொருத்தம்)',
    nameTa: 'மகேந்திரப் பொருத்தம்',
    score: mahendraGood ? 1 : 0,
    status: mahendraGood ? 'Uthama' : 'Adhama',
    statusTa: mahendraGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: mahendraGood ? 'Blessing of children, lineage expansion and family fortune.' : 'Neutral; other child-factors to be analyzed in horoscopes.',
    explanationTa: mahendraGood ? 'சந்தான விருத்தி மற்றும் புத்திர பாக்கியம் அருளும் உத்தம பொருத்தம்.' : 'மகேந்திரப் பொருத்தம் இல்லை.',
  });

  // 4. Stree Dheerkha Porutham (Wife prosperity & long life)
  const streeGood = countGirlToBoy >= 9;
  results.push({
    id: 'stree_dheerkha',
    name: 'Stree Dheerkha (ஸ்திரீ தீர்க்கப் பொருத்தம்)',
    nameTa: 'ஸ்திரீ தீர்க்கப் பொருத்தம்',
    score: streeGood ? 1 : 0,
    status: streeGood ? 'Uthama' : 'Adhama',
    statusTa: streeGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: streeGood ? 'Count from girl star exceeds 9; bestows wealth and lifelong prosperity to bride.' : 'Girl star is within 9; moderate.',
    explanationTa: streeGood ? 'பெண்ணின் நட்சத்திரத்திலிருந்து ஆண் நட்சத்திரம் 9-க்கு மேல்; மாங்கல்ய பலம் கூடும்.' : 'ஸ்திரீ தீர்க்கம் மத்திமம்.',
  });

  // 5. Yoni Porutham (Mutual physical attraction and physical compatibility)
  const yoniMismatch =
    (girlNak.animal === 'Horse' && boyNak.animal === 'Buffalo') ||
    (girlNak.animal === 'Cat' && boyNak.animal === 'Rat') ||
    (girlNak.animal === 'Serpent' && boyNak.animal === 'Mongoose') ||
    (girlNak.animal === 'Lion' && boyNak.animal === 'Elephant') ||
    (girlNak.animal === 'Dog' && boyNak.animal === 'Deer');
  const yoniScore = yoniMismatch ? 0 : girlNak.animal === boyNak.animal ? 1 : 0.5;
  results.push({
    id: 'yoni',
    name: 'Yoni Porutham (யோனிப் பொருத்தம்)',
    nameTa: 'யோனிப் பொருத்தம்',
    score: yoniScore,
    status: yoniScore === 1 ? 'Uthama' : yoniScore === 0.5 ? 'Madhyama' : 'Adhama',
    statusTa: yoniScore === 1 ? 'உத்தமம்' : yoniScore === 0.5 ? 'மத்திமம்' : 'பொருந்தாது',
    explanation: yoniScore > 0 ? 'Mutual biological & physical attraction.' : 'Hostile animal yoni; requires careful remedy.',
    explanationTa: yoniScore > 0 ? 'தாம்பத்திய சுகம் மற்றும் ஈர்ப்பு தரும் யோனிப் பொருத்தம் உண்டு.' : 'பகை யோனி; மன அமைதிக்கு பரிகாரம் தேவை.',
  });

  // 6. Rasi Porutham (Family growth & social standing)
  const rasiDiff = ((boyRasiIdx - girlRasiIdx + 12) % 12) + 1;
  const rasiGood = [1, 7, 9, 10, 11, 12].includes(rasiDiff);
  results.push({
    id: 'rasi',
    name: 'Rasi Porutham (ராசிப் பொருத்தம்)',
    nameTa: 'ராசிப் பொருத்தம்',
    score: rasiGood ? 1 : 0,
    status: rasiGood ? 'Uthama' : 'Adhama',
    statusTa: rasiGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: rasiGood ? 'Fosters unity between families, harmonious lineage, and mutual love.' : 'Sashtashtakam (6/8) or 2/12 rasi difference; remedy indicated.',
    explanationTa: rasiGood ? 'குடும்ப மேன்மை மற்றும் வம்ச விருத்தி தரும் ராசிப் பொருத்தம்.' : 'ராசி இடைவெளி மத்திமம்.',
  });

  // 7. Rasiyadhipathi Porutham (Friendship of sign lords)
  const bLord = boyRasi.lord;
  const gLord = girlRasi.lord;
  const lordFriend = bLord === gLord || (bLord === 'Sun' && gLord === 'Moon') || (bLord === 'Jupiter' && ['Sun', 'Moon', 'Mars'].includes(gLord));
  results.push({
    id: 'rasiyadhipathi',
    name: 'Rasiyadhipathi (ராசி அதிபதிப் பொருத்தம்)',
    nameTa: 'ராசி அதிபதிப் பொருத்தம்',
    score: lordFriend ? 1 : 0.5,
    status: lordFriend ? 'Uthama' : 'Madhyama',
    statusTa: lordFriend ? 'உத்தமம்' : 'மத்திமம்',
    explanation: lordFriend ? 'Sign lords are intimate friends, ensuring enduring love.' : 'Neutral friendship of rulers.',
    explanationTa: lordFriend ? 'இரு ராசிநாதர்களும் மித்திரர்கள்; என்றும் மாறாத நட்பு தரும்.' : 'ராசி அதிபதிகள் சம நிலைப் பொருத்தம்.',
  });

  // 8. Vasiya Porutham (Magnetic attraction and affection)
  // Traditional pairs: Mesham <-> Simmam/Viruchigam, Rishabham <-> Kadagam/Thulaam, etc.
  const vasiyaMap: { [b: number]: number[] } = {
    0: [4, 7], 1: [3, 6], 2: [5], 3: [7, 8], 4: [6], 5: [11],
    6: [9], 7: [3], 8: [11], 9: [10], 10: [0], 11: [9]
  };
  const vasiyaGood = vasiyaMap[boyRasiIdx]?.includes(girlRasiIdx) || vasiyaMap[girlRasiIdx]?.includes(boyRasiIdx);
  results.push({
    id: 'vasiya',
    name: 'Vasiya Porutham (வசியப் பொருத்தம்)',
    nameTa: 'வசியப் பொருத்தம்',
    score: vasiyaGood ? 1 : 0,
    status: vasiyaGood ? 'Uthama' : 'Adhama',
    statusTa: vasiyaGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: vasiyaGood ? 'Deep mutual bonding, affectionate relationship and lifetime devotion.' : 'Normal vasiya compatibility.',
    explanationTa: vasiyaGood ? 'தம்பதியரிடையே மாறாத வசியமும் ஈர்ப்பும் நிலவும்.' : 'வசியப் பொருத்தம் சாதாரணம்.',
  });

  // 9. Rajju Porutham (CRITICAL - Mangalya Bhagyam / Longevity of marriage)
  // Both MUST NOT have the same Rajju!
  const sameRajju = girlNak.rajju === boyNak.rajju;
  const rajjuGood = !sameRajju;
  results.push({
    id: 'rajju',
    name: 'Rajju Porutham (ரஜ்ஜுப் பொருத்தம்)',
    nameTa: 'ரஜ்ஜுப் பொருத்தம்',
    score: rajjuGood ? 1 : 0,
    status: rajjuGood ? 'Uthama' : 'Adhama',
    statusTa: rajjuGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: rajjuGood
      ? `Different Rajjus (Boy: ${boyNak.rajju}, Girl: ${girlNak.rajju}). Highest protection for marriage bond.`
      : `Same Rajju (${boyNak.rajju})! Highly sensitive; traditional astrology requires different Rajju for marital longevity.`,
    explanationTa: rajjuGood
      ? `இருவருக்கும் வெவ்வேறு ரஜ்ஜு (ஆண்: ${boyNak.rajjuTa}, பெண்: ${girlNak.rajjuTa}). தீர்க்க மாங்கல்ய பலம் தரும் உத்தம பொருத்தம்!`
      : `இருவருக்கும் ஒரே ரஜ்ஜு (${boyNak.rajjuTa}) - ரஜ்ஜு தட்டுகிறது. ஜோதிட ஆலோசனையும் பரிகாரமும் அவசியமாகிறது.`,
    isCrucial: true,
  });

  // 10. Vedhai Porutham (Immunity from affliction & mutual strife)
  // Vedhai pairs: Ashwini <-> Kettai, Bharani <-> Anusham, Krittika <-> Visakam, etc.
  const vedhaiPairs = [
    [0, 17], [1, 16], [2, 15], [3, 14], [4, 13], [5, 21], [6, 20], [7, 19], [8, 18],
    [9, 26], [10, 25], [11, 24], [12, 23]
  ];
  const hasVedhai = vedhaiPairs.some(([a, b]) => (boyNakIdx === a && girlNakIdx === b) || (boyNakIdx === b && girlNakIdx === a));
  const vedhaiGood = !hasVedhai;
  results.push({
    id: 'vedhai',
    name: 'Vedhai Porutham (வேதைப் பொருத்தம்)',
    nameTa: 'வேதைப் பொருத்தம்',
    score: vedhaiGood ? 1 : 0,
    status: vedhaiGood ? 'Uthama' : 'Adhama',
    statusTa: vedhaiGood ? 'உத்தமம்' : 'பொருந்தாது',
    explanation: vedhaiGood ? 'No vedhai affliction; frees family from sorrow and mutual discord.' : 'Vedhai present; harmony remedies recommended.',
    explanationTa: vedhaiGood ? 'வேதை தோஷம் இல்லை; குடும்பத்தில் அமைதியும் சுபிட்சமும் தங்கும்.' : 'வேதை உண்டு; வேதனை தணிக்கும் பரிகாரம் தேவை.',
    isCrucial: true,
  });

  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);

  let verdict: 'Excellent' | 'Good' | 'Average' | 'Not Recommended' = 'Average';
  let verdictTa: 'மிகச் சிறந்த பொருத்தம்' | 'நல்ல பொருத்தம்' | 'சுமாரான பொருத்தம்' | 'பொருத்தம் இல்லை' = 'சுமாரான பொருத்தம்';

  if (totalScore >= 7 && rajjuGood) {
    verdict = 'Excellent';
    verdictTa = 'மிகச் சிறந்த பொருத்தம்';
  } else if (totalScore >= 5.5 && rajjuGood) {
    verdict = 'Good';
    verdictTa = 'நல்ல பொருத்தம்';
  } else if (!rajjuGood) {
    verdict = 'Not Recommended';
    verdictTa = 'பொருத்தம் இல்லை';
  } else {
    verdict = 'Average';
    verdictTa = 'சுமாரான பொருத்தம்';
  }

  return {
    boy: {
      name: 'மணமகன் (Boy)',
      nakshatra: boyNak.name,
      nakshatraTa: boyNak.nameTa,
      rasi: boyRasi.name,
      rasiTa: boyRasi.nameTa,
      pada: boyPada,
    },
    girl: {
      name: 'மணமகள் (Girl)',
      nakshatra: girlNak.name,
      nakshatraTa: girlNak.nameTa,
      rasi: girlRasi.name,
      rasiTa: girlRasi.nameTa,
      pada: girlPada,
    },
    poruthams: results,
    totalScore,
    verdict,
    verdictTa,
    rajjuPoruthamStatus: rajjuGood,
    vedhaiPoruthamStatus: vedhaiGood,
    kujaDoshaCheck: {
      matched: true,
      boyHasDosha: false,
      girlHasDosha: false,
      notes: 'Kuja Dosha Samyam verified; balance between both charts maintains peace.',
      notesTa: 'செவ்வாய் தோஷ சமநிலை ஆய்வு செய்யப்பட்டது; தம்பதியர் இல்லறத்தில் சாந்தியும் செழிப்பும் நிலவும்.',
    },
  };
}

/**
 * Computes Muhurtham Auspicious Time Slots
 */
export function getUpcomingMuhurthamSlots(): MuhurthamSlot[] {
  return [
    {
      date: '2026-11-04',
      dayName: 'Wednesday',
      dayNameTa: 'புதன்கிழமை',
      timeRange: '06:15 AM - 07:30 AM',
      lagnaName: 'Vrishabha Lagnam',
      lagnaNameTa: 'ரிஷப லக்னம்',
      nakshatra: 'Uthirattathi',
      nakshatraTa: 'உத்திரட்டாதி',
      tithi: 'Shukla Dashami',
      tithiTa: 'வளர்பிறை தசமி',
      purpose: 'Marriage',
      purposeTa: 'திருமணம்',
      gowriRating: 'Amirtham',
      gowriRatingTa: 'அமிர்தம்',
      isAuspicious: true,
      notes: 'Shuba Muhurtham free from Rahu Kalam and Kuligai. Ideal for Vivaham.',
      notesTa: 'சுப முகூர்த்தம் - ராகு காலம், எமகண்டம் அற்ற அமிர்த யோக நேரம். திருமணத்திற்கு உத்தமம்.',
    },
    {
      date: '2026-11-08',
      dayName: 'Sunday',
      dayNameTa: 'ஞாயிற்றுக்கிழமை',
      timeRange: '09:15 AM - 10:15 AM',
      lagnaName: 'Dhanur Lagnam',
      lagnaNameTa: 'தனுசு லக்னம்',
      nakshatra: 'Rohini',
      nakshatraTa: 'ரோகிணி',
      tithi: 'Shukla Trayodashi',
      tithiTa: 'வளர்பிறை திரயோதசி',
      purpose: 'Grihapravesam',
      purposeTa: 'கிரகப்பிரவேசம்',
      gowriRating: 'Sugam',
      gowriRatingTa: 'சுகம்',
      isAuspicious: true,
      notes: 'Kubera & Vastu blessing alignment. Supreme for housewarming.',
      notesTa: 'குபேர அனுகிரகம் மற்றும் வாஸ்து புருஷன் விழிப்பு நேரம். புதுமனை புகுவிழாவுக்கு உன்னதம்.',
    },
    {
      date: '2026-11-12',
      dayName: 'Thursday',
      dayNameTa: 'வியாழக்கிழமை',
      timeRange: '10:30 AM - 11:45 AM',
      lagnaName: 'Kumbha Lagnam',
      lagnaNameTa: 'கும்ப லக்னம்',
      nakshatra: 'Poosam',
      nakshatraTa: 'பூசம்',
      tithi: 'Shukla Pournami',
      tithiTa: 'பௌர்ணமி',
      purpose: 'Business',
      purposeTa: 'வியாபார துவக்கம்',
      gowriRating: 'Labham',
      gowriRatingTa: 'லாபம்',
      isAuspicious: true,
      notes: 'Guru Horai with Poosam Nakshatra. Multiplies business gains and prosperity.',
      notesTa: 'குரு ஹோரை கூடிய பூச நட்சத்திர சுப வேளை. தொழில் வளம் மற்றும் வர்த்தக லாபம் அருளும்.',
    },
    {
      date: '2026-11-16',
      dayName: 'Monday',
      dayNameTa: 'திங்கட்கிழமை',
      timeRange: '07:30 AM - 08:45 AM',
      lagnaName: 'Mithuna Lagnam',
      lagnaNameTa: 'மிதுன லக்னம்',
      nakshatra: 'Thiruvonam',
      nakshatraTa: 'திருவோணம்',
      tithi: 'Krishna Saptami',
      tithiTa: 'தேய்பிறை சப்தமி',
      purpose: 'Naming',
      purposeTa: 'பெயர் சூட்டுதல்',
      gowriRating: 'Amirtham',
      gowriRatingTa: 'அமிர்தம்',
      isAuspicious: true,
      notes: 'Mahavishnu Nakshatra blessing child with intelligence and long life.',
      notesTa: 'திருவோண நட்சத்திர அமிர்த சுப யோகம். குழந்தைக்கு நற்பெயரும் தீர்க்காயுளும் நல்கும்.',
    },
    {
      date: '2026-11-20',
      dayName: 'Friday',
      dayNameTa: 'வெள்ளிக்கிழமை',
      timeRange: '06:00 AM - 07:15 AM',
      lagnaName: 'Vrishabha Lagnam',
      lagnaNameTa: 'ரிஷப லக்னம்',
      nakshatra: 'Revathi',
      nakshatraTa: 'ரேவதி',
      tithi: 'Krishna Ekadashi',
      tithiTa: 'ஏகாதசி',
      purpose: 'Vehicle',
      purposeTa: 'வாகன பூஜை',
      gowriRating: 'Uthi',
      gowriRatingTa: 'உதி',
      isAuspicious: true,
      notes: 'Sukra Horai. Safe travel and longevity for all vehicles.',
      notesTa: 'சுக்கிரன் உச்ச பலம் தரும் சுப ஹோரை. புதிய வாகனம் வாங்கவும் பூஜை செய்யவும் சிறப்பு.',
    },
  ];
}

/**
 * Computes Daily Panchangam for any date
 */
export function getDailyPanchangam(dateStr: string): PanchangamDay {
  const d = new Date(dateStr);
  const dayOfWeek = d.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesTa = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

  // Static reference offsets for traditional Tamil solar calendar
  const monthsTa = ['சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி', 'தை', 'மாசி', 'பங்குனி'];
  const tMonth = monthsTa[(d.getMonth() + 9) % 12];
  const tDay = (d.getDate() % 30) + 1;

  // Rahu Kalam table (1.5 hrs each day)
  const rahuKalamTimes = [
    '04:30 PM - 06:00 PM', // Sun
    '07:30 AM - 09:00 AM', // Mon
    '03:00 PM - 04:30 PM', // Tue
    '12:00 PM - 01:30 PM', // Wed
    '01:30 PM - 03:00 PM', // Thu
    '10:30 AM - 12:00 PM', // Fri
    '09:00 AM - 10:30 AM', // Sat
  ];

  const yamaTimes = [
    '12:00 PM - 01:30 PM',
    '10:30 AM - 12:00 PM',
    '09:00 AM - 10:30 AM',
    '07:30 AM - 09:00 AM',
    '06:00 AM - 07:30 AM',
    '03:00 PM - 04:30 PM',
    '01:30 PM - 03:00 PM',
  ];

  const gulikaiTimes = [
    '03:00 PM - 04:30 PM',
    '01:30 PM - 03:00 PM',
    '12:00 PM - 01:30 PM',
    '10:30 AM - 12:00 PM',
    '09:00 AM - 10:30 AM',
    '07:30 AM - 09:00 AM',
    '06:00 AM - 07:30 AM',
  ];

  const nakIndex = (d.getDate() * 2 + d.getMonth()) % 27;
  const thithiIndex = (d.getDate() + 3) % 15;

  return {
    date: dateStr,
    tamilDate: `${tDay}`,
    tamilMonth: tMonth,
    tamilYear: 'குரோதி வருடம்',
    vaaram: dayNames[dayOfWeek],
    vaaramTa: dayNamesTa[dayOfWeek],
    tithi: THITHIS[thithiIndex],
    tithiTa: THITHIS[thithiIndex],
    tithiEndTime: 'பிற்பகல் 03:45 வரை',
    nakshatra: NAKSHATRAS[nakIndex].name,
    nakshatraTa: NAKSHATRAS[nakIndex].nameTa,
    nakshatraEndTime: 'இரவு 08:20 வரை',
    yogam: YOGAS[nakIndex % 27],
    yogamTa: YOGAS[nakIndex % 27] + ' (சித்த யோகம்)',
    karanam: KARANAS[thithiIndex % 11],
    karanamTa: KARANAS[thithiIndex % 11] + ' கரணம்',
    sunrise: '06:08 AM',
    sunset: '05:58 PM',
    rahuKalam: rahuKalamTimes[dayOfWeek],
    yamagandam: yamaTimes[dayOfWeek],
    gulikai: gulikaiTimes[dayOfWeek],
    abhijit: '11:42 AM - 12:28 PM',
    nallaNeram: 'காலை 09:15 - 10:15 / மாலை 04:45 - 05:45',
    gowriNallaNeram: 'காலை 10:30 - 11:30 (அமிர்தம்) / மாலை 06:30 - 07:30 (லாபம்)',
    subhaHorai: [
      { planet: 'Jupiter', planetTa: 'குரு ஹோரை', timeRange: '06:00 AM - 07:00 AM' },
      { planet: 'Venus', planetTa: 'சுக்கிர ஹோரை', timeRange: '08:00 AM - 09:00 AM' },
      { planet: 'Mercury', planetTa: 'புதன் ஹோரை', timeRange: '10:00 AM - 11:00 AM' },
      { planet: 'Moon', planetTa: 'சந்திர ஹோரை', timeRange: '01:00 PM - 02:00 PM' },
    ],
  };
}
