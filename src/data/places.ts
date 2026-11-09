/**
 * Tamil Nadu & South India City Database with Astrological Coordinates
 */

export interface PlaceInfo {
  name: string;
  nameTa: string;
  latitude: number; // Decimal degrees
  longitude: number; // Decimal degrees
  timezone: number; // Hours (e.g. 5.5 for IST)
  formattedCoordsTa: string; // e.g. "அ: 09:57வ. ரே: 77:22கி +05:30ம"
}

export const SOUTH_INDIAN_PLACES: PlaceInfo[] = [
  {
    name: 'Tiruvannamalai',
    nameTa: 'திருவண்ணாமலை',
    latitude: 12.2253,
    longitude: 79.0747,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 12:13வ. ரே: 79:04கி +05:30ம',
  },
  {
    name: 'Theni',
    nameTa: 'தேனி',
    latitude: 9.9658,
    longitude: 77.4777,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 09:57வ. ரே: 77:22கி +05:30ம',
  },
  {
    name: 'Chennai',
    nameTa: 'சென்னை',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 13:05வ. ரே: 80:16கி +05:30ம',
  },
  {
    name: 'Madurai',
    nameTa: 'மதுரை',
    latitude: 9.9252,
    longitude: 78.1198,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 09:55வ. ரே: 78:07கி +05:30ம',
  },
  {
    name: 'Coimbatore',
    nameTa: 'கோயம்புத்தூர்',
    latitude: 11.0168,
    longitude: 76.9558,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:01வ. ரே: 76:57கி +05:30ம',
  },
  {
    name: 'Tiruchirappalli',
    nameTa: 'திருச்சிராப்பள்ளி',
    latitude: 10.7905,
    longitude: 78.7047,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 10:47வ. ரே: 78:42கி +05:30ம',
  },
  {
    name: 'Salem',
    nameTa: 'சேலம்',
    latitude: 11.6643,
    longitude: 78.1460,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:39வ. ரே: 78:08கி +05:30ம',
  },
  {
    name: 'Tirunelveli',
    nameTa: 'திருநெல்வேலி',
    latitude: 8.7139,
    longitude: 77.7567,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 08:42வ. ரே: 77:45கி +05:30ம',
  },
  {
    name: 'Vellore',
    nameTa: 'வேலூர்',
    latitude: 12.9165,
    longitude: 79.1325,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 12:54வ. ரே: 79:07கி +05:30ம',
  },
  {
    name: 'Thanjavur',
    nameTa: 'தஞ்சாவூர்',
    latitude: 10.7870,
    longitude: 79.1378,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 10:47வ. ரே: 79:08கி +05:30ம',
  },
  {
    name: 'Erode',
    nameTa: 'ஈரோடு',
    latitude: 11.3410,
    longitude: 77.7172,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:20வ. ரே: 77:43கி +05:30ம',
  },
  {
    name: 'Dindigul',
    nameTa: 'திண்டுக்கல்',
    latitude: 10.3673,
    longitude: 77.9803,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 10:22வ. ரே: 77:58கி +05:30ம',
  },
  {
    name: 'Kanchipuram',
    nameTa: 'காஞ்சிபுரம்',
    latitude: 12.8342,
    longitude: 79.7036,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 12:50வ. ரே: 79:42கி +05:30ம',
  },
  {
    name: 'Villupuram',
    nameTa: 'விழுப்புரம்',
    latitude: 11.9401,
    longitude: 79.4861,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:56வ. ரே: 79:29கி +05:30ம',
  },
  {
    name: 'Cuddalore',
    nameTa: 'கடலூர்',
    latitude: 11.7480,
    longitude: 79.7714,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:44வ. ரே: 79:46கி +05:30ம',
  },
  {
    name: 'Kumbakonam',
    nameTa: 'கும்பகோணம்',
    latitude: 10.9602,
    longitude: 79.3845,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 10:57வ. ரே: 79:23கி +05:30ம',
  },
  {
    name: 'Puducherry',
    nameTa: 'புதுச்சேரி',
    latitude: 11.9416,
    longitude: 79.8083,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 11:56வ. ரே: 79:48கி +05:30ம',
  },
  {
    name: 'Bengaluru',
    nameTa: 'பெங்களூரு',
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: 5.5,
    formattedCoordsTa: 'அ: 12:58வ. ரே: 77:35கி +05:30ம',
  },
];

export function formatAstroCoords(lat: number, lon: number, tz: number): string {
  const latDeg = Math.floor(Math.abs(lat)).toString().padStart(2, '0');
  const latMin = Math.floor((Math.abs(lat) % 1) * 60).toString().padStart(2, '0');
  const latDir = lat >= 0 ? 'வ' : 'தெ'; // North / South

  const lonDeg = Math.floor(Math.abs(lon)).toString().padStart(2, '0');
  const lonMin = Math.floor((Math.abs(lon) % 1) * 60).toString().padStart(2, '0');
  const lonDir = lon >= 0 ? 'கி' : 'மே'; // East / West

  const tzSign = tz >= 0 ? '+' : '-';
  const tzHrs = Math.floor(Math.abs(tz)).toString().padStart(2, '0');
  const tzMins = Math.floor((Math.abs(tz) % 1) * 60).toString().padStart(2, '0');

  return `அ: ${latDeg}:${latMin}${latDir}. ரே: ${lonDeg}:${lonMin}${lonDir} ${tzSign}${tzHrs}:${tzMins}ம`;
}
