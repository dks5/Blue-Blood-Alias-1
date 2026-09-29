import React, { useState } from 'react';
import { PRESETS_DATA } from '../data/presetsData';
import { Language, PersonaProfile, PresetDefinition } from '../types';
import { generateFromPreset } from '../services/heritageEngine';
import { PedigreeTimeline } from '../components/PedigreeTimeline';
import {
  Layers,
  Search,
  ArrowRight,
  GitBranch,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface PresetsViewProps {
  lang: Language;
  onSelectPersona: (persona: PersonaProfile) => void;
}

export const PresetsView: React.FC<PresetsViewProps> = ({ lang, onSelectPersona }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS_DATA[0].id);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [search, setSearch] = useState('');

  const currentPreset = PRESETS_DATA.find((p) => p.id === selectedPresetId) || PRESETS_DATA[0];

  // Dynamic preview persona generated for the currently selected preset and gender
  const [previewPersona, setPreviewPersona] = useState<PersonaProfile>(() => {
    return generateFromPreset(PRESETS_DATA[0].id, { gender: 'male' });
  });

  const handleSelectPreset = (preset: PresetDefinition) => {
    setSelectedPresetId(preset.id);
    const newPersona = generateFromPreset(preset.id, { gender: selectedGender });
    setPreviewPersona(newPersona);
  };

  const handleGenderToggle = (g: 'male' | 'female') => {
    setSelectedGender(g);
    const newPersona = generateFromPreset(selectedPresetId, { gender: g });
    setPreviewPersona(newPersona);
  };

  const handleRegenerateBranch = () => {
    const newPersona = generateFromPreset(selectedPresetId, { gender: selectedGender });
    setPreviewPersona(newPersona);
  };

  const filteredPresets = PRESETS_DATA.filter((p) =>
    p.name[lang].toLowerCase().includes(search.toLowerCase()) ||
    p.subtitle[lang].toLowerCase().includes(search.toLowerCase()) ||
    p.surnames.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full apple-glass-subtle mb-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-blue-200">
              {lang === 'ru' ? 'Каталог 10 Исторических Родословных' : '10 Verified Lineage Presets'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {lang === 'ru' ? 'Пресеты и Живое Древо Поколений' : 'Presets & Live Pedigree Tree'}
          </h2>
          <p className="text-xs text-neutral-400">
            {lang === 'ru'
              ? 'Выберите архетип слева: справа в реальном времени строится и разрастается детерминированное древо предков.'
              : 'Choose an archetype on the left: the generational pedigree tree dynamically grows on the right.'}
          </p>
        </div>

        {/* Gender Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/8 self-start sm:self-center text-xs">
          <button
            onClick={() => handleGenderToggle('male')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGender === 'male' ? 'bg-blue-600/40 text-blue-100 font-semibold' : 'text-neutral-400'
            }`}
          >
            {lang === 'ru' ? 'Мужской' : 'Male'}
          </button>
          <button
            onClick={() => handleGenderToggle('female')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedGender === 'female' ? 'bg-purple-600/40 text-purple-100 font-semibold' : 'text-neutral-400'
            }`}
          >
            {lang === 'ru' ? 'Женский' : 'Female'}
          </button>
        </div>
      </div>

      {/* Main Two-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of 10 Presets (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ru' ? 'Поиск пресета...' : 'Search presets...'}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/20 text-white border-blue-500/50 shadow-md'
                      : 'apple-glass-subtle text-neutral-300 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-blue-400 font-bold">
                        #{preset.index}
                      </span>
                      <span className="text-xs font-bold truncate">
                        {preset.name[lang]}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">
                      {preset.subtitle[lang]}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-blue-400 translate-x-0.5' : 'text-neutral-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Pedigree Tree Branch (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl apple-glass-card p-5 sm:p-6 border border-white/8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/8">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold mb-0.5">
                {lang === 'ru' ? 'Активная ветвь генерации' : 'Active Pedigree Branch'}
              </div>
              <h3 className="text-lg font-bold text-white">
                {currentPreset.name[lang]}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRegenerateBranch}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium border border-white/8 transition-colors"
              >
                {lang === 'ru' ? 'Пересчитать' : 'Re-roll'}
              </button>

              <button
                onClick={() => onSelectPersona(previewPersona)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>{lang === 'ru' ? 'Открыть досье' : 'Open Dossier'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Historical narrative context summary */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 leading-relaxed font-sans">
            {currentPreset.historicalRoots[lang]}
          </div>

          {/* Live Pedigree Timeline component */}
          <div className="pt-2">
            <PedigreeTimeline
              tree={previewPersona.pedigree.tree}
              persona={previewPersona}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
