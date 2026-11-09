import React from 'react';
import { X, MapPin, Navigation, Phone, ExternalLink, QrCode } from 'lucide-react';
import { Language } from '../types/astrology';

interface LocationModalProps {
  currentLanguage: Language;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  currentLanguage,
  onClose,
}) => {
  const isTa = currentLanguage === 'ta';

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Kubera+Nagar+Main+Road+Vengikkal+Tiruvannamalai+606604';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-amber-200 font-serif">
                {isTa ? 'எங்கள் முகவரி & வழித்தடம்' : 'Our Address & Route Map'}
              </h3>
              <p className="text-[11px] text-stone-300">
                {isTa ? 'மாதவ் ஜோதிட நிலையம் · திருவண்ணாமலை' : 'Madhav Jodhida Nilayam · Tiruvannamalai'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Authentic Board 2 Image Display */}
          <div className="rounded-xl overflow-hidden border-2 border-amber-500/30 bg-stone-950 shadow-lg flex justify-center">
            <img
              src="/assets/aistudio/image_f195fea7.png"
              alt="மாதவ் ஜோதிட நிலையம் முகவரி மற்றும் வழித்தட வரைபடம்"
              className="max-h-[50vh] w-auto object-contain"
            />
          </div>

          {/* Details & Google Map Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Address Card */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{isTa ? 'அலுவலக முகவரி:' : 'Office Address:'}</span>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed font-serif">
                {isTa ? (
                  <>
                    எண். 1833 / G2, குபேர நகர் மெயின் ரோடு,<br />
                    வேங்கிக்கால் / மலமஞ்சனூர்,<br />
                    திருவண்ணாமலை - 606 604.<br />
                    (அருள்மிகு குபேர லிங்கம் அருகில்)
                  </>
                ) : (
                  <>
                    No. 1833 / G2, Kubera Nagar Main Road,<br />
                    Vengikkal / Malamanjanur,<br />
                    Tiruvannamalai - 606 604.<br />
                    (Near Arulmigu Kubera Lingam)
                  </>
                )}
              </p>

              <div className="pt-2 border-t border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 block">{isTa ? 'தொடர்பு எண்கள்:' : 'Call:'}</span>
                <div className="flex flex-wrap gap-3 font-mono font-bold text-amber-300 text-sm">
                  <a href="tel:+919042924345" className="hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> 90429 24345
                  </a>
                  <a href="tel:+919043515667" className="hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> 90435 15667
                  </a>
                </div>
              </div>
            </div>

            {/* Landmarks & Navigation Card */}
            <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{isTa ? 'அருகிலுள்ள முக்கிய அடையாளங்கள்:' : 'Key Nearby Landmarks:'}</span>
              </div>
              <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
                <li>{isTa ? 'அருள்மிகு குபேர லிங்கம் (Arulmigu Kubera Lingam)' : 'Arulmigu Kubera Lingam'}</li>
                <li>{isTa ? 'காஞ்சி ரோடு சந்திப்பு (Kanchi Road)' : 'Kanchi Road'}</li>
                <li>{isTa ? 'ஸ்ரீ கருப்பட்டி காபி (Sri Karupatti Coffee)' : 'Sri Karupatti Coffee'}</li>
                <li>{isTa ? 'வி.ஆர்.எஸ் பேக்கரி (VRS Bakery & Home Made)' : 'VRS Best Bakery'}</li>
                <li>{isTa ? 'மட் ஸ்பா (Mud Spa - 6th Street)' : 'Mud Spa (6th Street)'}</li>
              </ul>

              <div className="pt-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{isTa ? 'Google Maps-ல் வழியைக் காண்க' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
