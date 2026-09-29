import React, { useState } from 'react';
import { Language, PersonaProfile } from '../types';
import {
  Bookmark,
  Trash2,
  Download,
  Share2,
  ExternalLink,
  Search,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Dna,
} from 'lucide-react';

interface VaultViewProps {
  savedPersonas: PersonaProfile[];
  lang: Language;
  onSelectPersona: (persona: PersonaProfile) => void;
  onRemovePersona: (id: string) => void;
  onClearVault: () => void;
  onExplorePresets: () => void;
}

export const VaultView: React.FC<VaultViewProps> = ({
  savedPersonas,
  lang,
  onSelectPersona,
  onRemovePersona,
  onClearVault,
  onExplorePresets,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedPersonas.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.residence.city.toLowerCase().includes(search.toLowerCase()) ||
      p.residence.stateCode.toLowerCase().includes(search.toLowerCase()) ||
      p.emails.some((e) => e.address.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyEmail = (address: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllJSON = () => {
    if (savedPersonas.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedPersonas, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BlueBloodAlias_Vault_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    if (savedPersonas.length === 0) return;
    const headers = [
      'ID',
      'Full Name',
      'First Name',
      'Middle Name',
      'Last Name',
      'Gender',
      'Age',
      'Birth Date',
      'City',
      'State',
      'Zip',
      'Preset',
      'Primary Email',
      'Outlook Email',
      'Geo Email',
      'PIN Email',
    ];

    const rows = savedPersonas.map((p) => [
      `"${p.id}"`,
      `"${p.fullName}"`,
      `"${p.firstName}"`,
      `"${p.middleName}"`,
      `"${p.lastName}"`,
      `"${p.gender}"`,
      `"${p.age}"`,
      `"${p.birthDate}"`,
      `"${p.residence.city}"`,
      `"${p.residence.stateCode}"`,
      `"${p.residence.zipCode}"`,
      `"${p.pedigree.presetId || 'custom_forge'}"`,
      `"${p.emails[0]?.address || ''}"`,
      `"${p.emails[1]?.address || ''}"`,
      `"${p.emails[2]?.address || ''}"`,
      `"${p.emails[3]?.address || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `BlueBloodAlias_Personas_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass-subtle mb-2">
            <Bookmark className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-blue-200">
              {lang === 'ru' ? 'Архив Избранных Досье' : 'Heritage Persona Vault'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'ru' ? 'Сейф Сохраненных Личностей' : 'Lineage Vault & Registry'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {lang === 'ru'
              ? `Всего сохранено записей: ${savedPersonas.length} • Данные защищены в локальном хранилище`
              : `Total certified dossiers: ${savedPersonas.length} • Encrypted in local browser storage`}
          </p>
        </div>

        {/* Action Controls */}
        {savedPersonas.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportAllJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl apple-glass hover:bg-white/10 text-xs font-medium text-neutral-200 border border-white/10 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              <span>JSON</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl apple-glass hover:bg-white/10 text-xs font-medium text-neutral-200 border border-white/10 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>

            <button
              onClick={onClearVault}
              className="p-1.5 rounded-xl apple-glass hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 border border-white/10 transition-colors"
              title={lang === 'ru' ? 'Очистить сейф' : 'Clear Vault'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedPersonas.length === 0 ? (
        <div className="rounded-[28px] apple-glass-card p-12 text-center border border-white/8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mx-auto">
            <Bookmark className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {lang === 'ru' ? 'Сейф пока пуст' : 'Your Lineage Vault is Empty'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            {lang === 'ru'
              ? 'Сохраняйте сгенерированные досье из пресетов или Кузницы Родословной, чтобы быстро копировать email и экспортировать списки.'
              : 'Save generated persona dossiers from archetypes or the custom forge to build your personal pedigree registry.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onExplorePresets}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-800/30"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'ru' ? 'Перейти к 10 Пресетам' : 'Explore 10 Archetypes'}</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ru' ? 'Фильтр по имени, городу, email...' : 'Filter by name, location, email...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* Persona Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((persona) => {
              const primaryEmail = persona.emails[0]?.address;
              const isCopied = copiedId === persona.id;

              return (
                <div
                  key={persona.id}
                  onClick={() => onSelectPersona(persona)}
                  className="rounded-2xl p-5 apple-glass-card hover:border-blue-500/40 transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                >
                  <div>
                    {/* Top tactile badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                        {persona.pedigree.presetName ? persona.pedigree.presetName[lang] : 'Custom Forge'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePersona(persona.id);
                        }}
                        className="text-neutral-500 hover:text-rose-400 p-1 rounded-md transition-colors"
                        title={lang === 'ru' ? 'Удалить' : 'Remove'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      {persona.avatarUrl ? (
                        <img
                          src={persona.avatarUrl}
                          alt={persona.fullName}
                          className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-neutral-300 shrink-0 text-sm">
                          {persona.firstName.charAt(0)}{persona.lastName.charAt(0)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="text-base font-bold text-white truncate">
                          <span className="font-light text-neutral-300 mr-1">{persona.firstName}</span>
                          <span className="font-extrabold text-white">{persona.lastName}</span>
                        </div>
                        <div className="text-xs text-neutral-400 truncate">
                          {persona.birthDate} ({persona.age} {lang === 'ru' ? 'лет' : 'y.o.'}) • {persona.residence.city}, {persona.residence.stateCode}
                        </div>
                      </div>
                    </div>

                    {/* Email preview */}
                    <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <div className="text-[9px] text-blue-400 font-mono uppercase">Primary Alias</div>
                        <div className="text-xs font-mono text-white truncate">{primaryEmail}</div>
                      </div>
                      <button
                        onClick={(e) => handleCopyEmail(primaryEmail, persona.id, e)}
                        className={`p-1.5 rounded-lg transition-all shrink-0 ${
                          isCopied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-neutral-400 hover:text-white'
                        }`}
                        title={lang === 'ru' ? 'Скопировать' : 'Copy'}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Footer Open Dossier link */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-medium">
                    <span>{lang === 'ru' ? 'Открыть досье' : 'View Full Dossier'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
