import React, { useState } from 'react';
import { AntiCollisionEmailOption, Language, PersonaProfile } from '../types';
import { getTagTitle } from '../services/emailAntiCollision';
import { Copy, Check, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface AntiCollisionVaultProps {
  emails: AntiCollisionEmailOption[];
  persona: PersonaProfile;
  lang: Language;
}

export const AntiCollisionVault: React.FC<AntiCollisionVaultProps> = ({
  emails,
  persona,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<string>(emails[0]?.id || 'opt_initial_state_usa');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const selectedEmail = emails.find((e) => e.id === activeTab) || emails[0];

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ru' ? 'Google Gmail & Регистрационные Данные США' : 'Google Gmail & US Registration Records'}</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            {lang === 'ru'
              ? 'Только 2 строгих варианта Google Gmail с привязкой к штату и префиксом USA для 100% уникальности. Почтовый адрес проживания и все поля копируются в один клик.'
              : '2 verified Google Gmail formulas with state geo-anchor and USA prefix for absolute uniqueness. Residence address and all registration fields are one-click copyable.'}
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Google Gmail Exclusive</span>
        </span>
      </div>

      {/* Tab Segmented Control (2 variants only) */}
      <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-xl border border-white/6">
        {emails.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all text-center truncate ${
                isActive
                  ? 'bg-blue-600/90 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
              }`}
            >
              <span>{getTagTitle(item.tag, lang)}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Card: Complete Fieldset for Registration / Passports */}
      {selectedEmail && (
        <div className="rounded-xl p-4 sm:p-5 bg-white/[0.02] border border-white/8 space-y-4">
          {/* Main Primary Google Email Field */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold mb-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Google Gmail Alias ({selectedEmail.domain})</span>
              </div>
              <div className="font-mono text-base sm:text-lg font-bold text-white tracking-tight break-all">
                {selectedEmail.address}
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(selectedEmail.address, 'email')}
              className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                copiedField === 'email'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'email' ? (lang === 'ru' ? 'Скопировано' : 'Copied') : (lang === 'ru' ? 'Скопировать почту' : 'Copy Gmail')}</span>
            </button>
          </div>

          <div className="text-xs text-neutral-400 leading-relaxed px-1">
            {selectedEmail.description[lang]}
          </div>

          {/* Postal Residence Address Banner (NEW dedicated element) */}
          <div className="p-3 rounded-xl bg-white/[0.025] border border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1 mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Почтовый Адрес Проживания в США' : 'US Residential Postal Address'}</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-neutral-200 truncate">
                {persona.residence.fullAddress}
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(persona.residence.fullAddress, 'address')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                copiedField === 'address'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10'
              }`}
            >
              {copiedField === 'address' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'address' ? (lang === 'ru' ? 'Скопирован' : 'Copied') : (lang === 'ru' ? 'Скопировать адрес' : 'Copy Address')}</span>
            </button>
          </div>

          {/* Individual Registration Copyable Data Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-white/6">
            {/* First Name */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Имя' : 'First Name'}</div>
                <div className="text-xs font-semibold text-neutral-200 truncate">{persona.firstName}</div>
              </div>
              <button
                onClick={() => copyToClipboard(persona.firstName, 'fname')}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title={lang === 'ru' ? 'Скопировать имя' : 'Copy First Name'}
              >
                {copiedField === 'fname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Last Name (Dominant focus) */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/8 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Фамилия' : 'Last Name'}</div>
                <div className="text-xs font-bold text-white tracking-wide truncate">{persona.lastName}</div>
              </div>
              <button
                onClick={() => copyToClipboard(persona.lastName, 'lname')}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title={lang === 'ru' ? 'Скопировать фамилию' : 'Copy Last Name'}
              >
                {copiedField === 'lname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Official Full Name for Forms */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Полное Имя (Full)' : 'Full Name'}</div>
                <div className="text-xs font-semibold text-neutral-200 truncate">{persona.firstName} {persona.lastName}</div>
              </div>
              <button
                onClick={() => copyToClipboard(`${persona.firstName} ${persona.lastName}`, 'fullname')}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title={lang === 'ru' ? 'Скопировать полное имя' : 'Copy Full Name'}
              >
                {copiedField === 'fullname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Birth Date / Year / Age */}
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Дата / Год / Возраст' : 'DOB & Age'}</div>
                <div className="text-xs font-semibold text-neutral-200 truncate font-mono">
                  {persona.birthDate} ({persona.age})
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(persona.birthDate, 'dob')}
                className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title={lang === 'ru' ? 'Скопировать дату рождения' : 'Copy DOB'}
              >
                {copiedField === 'dob' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
