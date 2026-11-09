import React, { useState } from 'react';
import { X, CalendarClock, MessageCircle, Phone, Send, CheckCircle2 } from 'lucide-react';
import { AppointmentBooking, Language, MuhurthamSlot } from '../types/astrology';

interface BookingModalProps {
  currentLanguage: Language;
  onClose: () => void;
  prefilledSlot?: MuhurthamSlot | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  currentLanguage,
  onClose,
  prefilledSlot,
}) => {
  const isTa = currentLanguage === 'ta';

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(
    prefilledSlot ? prefilledSlot.date : new Date().toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState(
    prefilledSlot ? prefilledSlot.timeRange : '10:00 AM'
  );
  const [service, setService] = useState(
    prefilledSlot ? prefilledSlot.purposeTa : 'ஜாதகம் கணித்தல்'
  );
  const [mode, setMode] = useState<'In-Person' | 'Online/Phone'>('Online/Phone');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const primaryPhone = '9042924345';
  const secondaryPhone = '9043515667';

  const generateWhatsAppUrl = (targetNumber: string) => {
    const textMsg = isTa
      ? `வணக்கம்! மாதவ் ஜோதிட நிலையம்,
நான் ஆலோசனைக்கு முன்பதிவு செய்ய விரும்புகிறேன்:
• பெயர்: ${customerName || 'வாடிக்கையாளர்'}
• அலைபேசி: ${phone || '—'}
• விரும்பும் தேதி: ${preferredDate}
• விரும்பும் நேரம்: ${preferredTime}
• சேவை: ${service}
• முறை: ${mode === 'In-Person' ? 'நேரில் சந்திப்பு' : 'ஆன்லைன் / தொலைபேசி'}
${notes ? `• கூடுதல் தகவல்: ${notes}` : ''}

தயவுசெய்து முன்பதிவை உறுதிப்படுத்தவும். நன்றி!`
      : `Namaskaram! Madhav Jodhida Nilayam,
I would like to book an astrological consultation:
• Name: ${customerName || 'Client'}
• Phone: ${phone || '—'}
• Date: ${preferredDate}
• Time: ${preferredTime}
• Service: ${service}
• Mode: ${mode}
${notes ? `• Notes: ${notes}` : ''}

Please confirm my appointment. Thank you!`;

    return `https://wa.me/91${targetNumber}?text=${encodeURIComponent(textMsg)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden text-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 border-b border-amber-400/40 text-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg font-serif">
                {isTa ? 'முன்பதிவு (Online Appointment Booking)' : 'Book Consultation'}
              </h3>
              <p className="text-[11px] text-stone-950/80 font-medium">
                {isTa ? 'மாதவ் ஜோதிட நிலையம் · வாட்ஸ்அப் நேரடி இணைப்பு' : 'Direct WhatsApp & Phone Confirmation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-950 hover:text-white rounded-lg hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-amber-200 font-serif">
                {isTa ? 'முன்பதிவு தயார் செய்யப்பட்டது!' : 'Appointment Ready!'}
              </h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                {isTa
                  ? 'கீழே உள்ள வாட்ஸ்அப் பட்டனை கிளிக் செய்து உடனடியாக ஜோதிடரிடம் உங்கள் முன்பதிவு தகவலை அனுப்பவும்.'
                  : 'Click below to send your consultation details directly via WhatsApp.'}
              </p>

              {/* WhatsApp Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={generateWhatsAppUrl(primaryPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-xs rounded-xl shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isTa ? 'WhatsApp 1 (90429 24345)' : 'WhatsApp 1'}</span>
                </a>
                <a
                  href={generateWhatsAppUrl(secondaryPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-xs rounded-xl shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isTa ? 'WhatsApp 2 (90435 15667)' : 'WhatsApp 2'}</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-amber-300 hover:underline"
                >
                  {isTa ? 'விவரங்களை திருத்த' : 'Edit Details'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-amber-300 block mb-1">
                  {isTa ? 'உங்கள் பெயர்:' : 'Your Name:'} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isTa ? 'எ.கா: சுந்தரம்' : 'e.g. Sundaram'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">
                  {isTa ? 'அலைபேசி எண்:' : 'Phone Number:'} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="90429 24345"
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 font-mono focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-amber-300 block mb-1">
                    {isTa ? 'விரும்பும் தேதி:' : 'Preferred Date:'}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 font-mono focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-semibold text-amber-300 block mb-1">
                    {isTa ? 'நேரம்:' : 'Preferred Time:'}
                  </label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">
                  {isTa ? 'தேவையான சேவை:' : 'Service Required:'}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 focus:outline-hidden focus:border-amber-400"
                >
                  <option value="ஜாதகம் கணித்தல் & பலன்">ஜாதகம் கணித்தல் & பலன் (Horoscope)</option>
                  <option value="திருமணப் பொருத்தம்">திருமணப் பொருத்தம் (10 Poruthams)</option>
                  <option value="தசாபுத்தி பலன்கள்">தசாபுத்தி பலன்கள் (Dasa Bukthi)</option>
                  <option value="வாஸ்து ஆலோசனை">வாஸ்து ஆலோசனை - மனையடி சாஸ்திரம் (Vastu)</option>
                  <option value="கிரக தோஷ பரிகாரம்">கிரக தோஷ நிவாரணம் & பரிகாரம் (Pariharam)</option>
                  <option value="சுப முகூர்த்தம் நிர்ணயம்">சுப முகூர்த்தம் நிர்ணயம் (Muhurtham)</option>
                  <option value="எண்ணியல் ஆலோசனை">எண்ணியல் ஆலோசனை (Numerology)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">
                  {isTa ? 'ஆலோசனை முறை:' : 'Consultation Mode:'}
                </label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="bookingMode"
                      value="Online/Phone"
                      checked={mode === 'Online/Phone'}
                      onChange={() => setMode('Online/Phone')}
                      className="accent-amber-500"
                    />
                    <span>{isTa ? 'ஆன்லைன் / போன் மூலம்' : 'Phone / Online'}</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="bookingMode"
                      value="In-Person"
                      checked={mode === 'In-Person'}
                      onChange={() => setMode('In-Person')}
                      className="accent-amber-500"
                    />
                    <span>{isTa ? 'நேரில் திருவண்ணாமலை அலுவலகத்தில்' : 'In-Person Visit'}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-amber-300 block mb-1">
                  {isTa ? 'கூடுதல் குறிப்புகள் (விருப்பத்தேர்வு):' : 'Notes (Optional):'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isTa ? 'பிறந்த நேரம், பிறந்த இடம் அல்லது நீங்கள் கேட்க விரும்பும் கேள்விகள்...' : 'Any specific questions or birth details...'}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-amber-100 placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>{isTa ? 'முன்பதிவை சமர்ப்பிக்க' : 'Proceed to Confirmation'}</span>
                </button>
              </div>

              {/* Direct WhatsApp Instant Links */}
              <div className="pt-2 border-t border-stone-800 text-center">
                <span className="text-[10px] text-stone-400 block mb-2">
                  {isTa ? 'அல்லது நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ள:' : 'Or chat directly via WhatsApp:'}
                </span>
                <div className="flex gap-2 justify-center">
                  <a
                    href={generateWhatsAppUrl(primaryPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp: 90429 24345</span>
                  </a>
                  <a
                    href={generateWhatsAppUrl(secondaryPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp: 90435 15667</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
