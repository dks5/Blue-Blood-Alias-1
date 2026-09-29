import React from 'react';
import { ActiveTab, Language } from '../types';
import { Shield, Sparkles, Bookmark, Dna, Layers, SlidersHorizontal, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  savedCount,
}) => {
  const navItems: Array<{ id: ActiveTab; label: { ru: string; en: string }; icon: React.ReactNode }> = [
    { id: 'start', label: { ru: 'Старт', en: 'Start' }, icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'dossier', label: { ru: 'Досье Личности', en: 'Dossier' }, icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'presets', label: { ru: '10 Пресетов', en: '10 Presets' }, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'forge', label: { ru: 'Кузница Родословной', en: 'Pedigree Forge' }, icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
    { id: 'concept', label: { ru: 'Концепция', en: 'Concept' }, icon: <Dna className="w-3.5 h-3.5" /> },
    { id: 'vault', label: { ru: 'Сейф', en: 'Vault' }, icon: <Bookmark className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full apple-glass border-b border-white/8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark with strict bounds */}
        <button
          onClick={() => setActiveTab('start')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0 min-w-0 max-w-[180px] sm:max-w-[260px]"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30 group-hover:scale-105 transition-transform shrink-0">
            <Dna className="w-4 h-4 text-blue-100" />
          </div>
          <div className="min-w-0 overflow-hidden">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white font-sans block truncate leading-tight">
              Blue Blood Alias
            </span>
            <span className="hidden sm:block text-[10px] text-blue-300/70 tracking-wider font-mono uppercase truncate leading-tight">
              Heritage & Anti-Collision
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links / Segmented Control */}
        <nav className="hidden md:flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/6 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/90 text-white shadow-md shadow-blue-900/40 border border-blue-400/30'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {item.icon}
                <span>{item.label[lang]}</span>
                {item.id === 'vault' && savedCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/20">
                    {savedCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Language Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-white/[0.05] border border-white/8 text-xs font-medium">
            <button
              onClick={() => setLang('ru')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'ru'
                  ? 'bg-white/15 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                lang === 'en'
                  ? 'bg-white/15 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Quick Vault button */}
          <button
            onClick={() => setActiveTab('vault')}
            title={lang === 'ru' ? 'Сейф сохраненных' : 'Saved Vault'}
            className="relative p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-neutral-300 hover:text-white border border-white/8 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-white/5 gap-1.5 no-scrollbar bg-black/30">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white/[0.03] text-neutral-400'
              }`}
            >
              {item.icon}
              <span>{item.label[lang]}</span>
              {item.id === 'vault' && savedCount > 0 && (
                <span className="px-1 py-0.2 rounded-full text-[9px] bg-white/20">
                  {savedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
