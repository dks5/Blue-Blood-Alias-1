import React, { useState, useEffect } from 'react';
import { ActiveTab, Language, PersonaProfile } from './types';
import { generateFromPreset, generateMarkCarolinaDuke, resolveAvatarUrl } from './services/heritageEngine';
import { PRESETS_DATA } from './data/presetsData';
import { Header } from './components/Header';
import { StartView } from './views/StartView';
import { OverviewView } from './views/OverviewView';
import { PresetsView } from './views/PresetsView';
import { ForgeView } from './views/ForgeView';
import { PersonaDossier } from './components/PersonaDossier';
import { VaultView } from './views/VaultView';

const STORAGE_KEY = 'blue_blood_alias_vault_v1';

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [activeTab, setActiveTab] = useState<ActiveTab>('start');

  // Initial default persona set to Mark Carolina Duke
  const [currentPersona, setCurrentPersona] = useState<PersonaProfile>(() => {
    return generateMarkCarolinaDuke();
  });

  // Saved personas persisted in localStorage
  const [savedPersonas, setSavedPersonas] = useState<PersonaProfile[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load saved personas from storage', e);
    }
    return [];
  });

  // Sync saved personas to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPersonas));
    } catch (e) {
      console.error('Failed to save personas to storage', e);
    }
  }, [savedPersonas]);

  const handleSelectPersona = (persona: PersonaProfile) => {
    setCurrentPersona(persona);
    setActiveTab('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (persona: PersonaProfile) => {
    setSavedPersonas((prev) => {
      const exists = prev.some((p) => p.id === persona.id);
      if (exists) {
        return prev.filter((p) => p.id !== persona.id);
      } else {
        return [persona, ...prev];
      }
    });
  };

  const handleRemovePersona = (id: string) => {
    setSavedPersonas((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearVault = () => {
    if (window.confirm(lang === 'ru' ? 'Вы уверены, что хотите очистить весь сейф?' : 'Are you sure you want to clear the entire vault?')) {
      setSavedPersonas([]);
    }
  };

  const handleRegenerateCurrent = () => {
    // Pick a random preset from the 10 available archetypes
    const randomPreset = PRESETS_DATA[Math.floor(Math.random() * PRESETS_DATA.length)];
    // Randomize gender (male/female) or preserve current gender
    const randomGender = Math.random() > 0.5 ? 'male' : 'female';
    const randomAge = Math.floor(Math.random() * (26 - 18 + 1)) + 18;
    const regenerated = generateFromPreset(randomPreset.id, {
      gender: randomGender,
      censure: randomPreset.censureLength,
      age: randomAge,
    });
    setCurrentPersona(regenerated);
  };

  const handleUpdateAge = (newAge: number) => {
    if (currentPersona.id === 'persona_mark_carolina_duke') {
      setCurrentPersona(generateMarkCarolinaDuke(newAge));
    } else if (currentPersona.pedigree.presetId) {
      const updated = generateFromPreset(currentPersona.pedigree.presetId, {
        gender: currentPersona.gender,
        censure: currentPersona.censureLength,
        age: newAge,
      });
      setCurrentPersona(updated);
    } else {
      const currentYear = 2026;
      const birthYear = currentYear - newAge;
      const birthDate = `05/14/${birthYear}`;
      const avatarUrl = resolveAvatarUrl(currentPersona.gender, newAge, currentPersona.firstName + currentPersona.lastName);

      setCurrentPersona((prev) => ({
        ...prev,
        age: newAge,
        birthYear,
        birthDate,
        avatarUrl,
      }));
    }
  };

  const handleUpdateAvatarUrl = (url: string) => {
    setCurrentPersona((prev) => ({
      ...prev,
      avatarUrl: url,
    }));
  };

  const isCurrentSaved = savedPersonas.some((p) => p.id === currentPersona.id);

  return (
    <div className="min-h-screen bg-[#08090d] text-[#f5f5f7] flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Universal Apple HIG Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        savedCount={savedPersonas.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'start' && (
          <StartView
            lang={lang}
            onStart={() => setActiveTab('dossier')}
          />
        )}

        {activeTab === 'dossier' && (
          <PersonaDossier
            persona={currentPersona}
            lang={lang}
            isSaved={isCurrentSaved}
            onToggleSave={handleToggleSave}
            onRegenerate={handleRegenerateCurrent}
            onUpdateAge={handleUpdateAge}
            onUpdateAvatarUrl={handleUpdateAvatarUrl}
          />
        )}

        {activeTab === 'presets' && (
          <PresetsView
            lang={lang}
            onSelectPersona={handleSelectPersona}
          />
        )}

        {activeTab === 'forge' && (
          <ForgeView
            lang={lang}
            onSelectPersona={handleSelectPersona}
          />
        )}

        {activeTab === 'concept' && (
          <OverviewView
            lang={lang}
            onExplorePresets={() => setActiveTab('presets')}
            onOpenForge={() => setActiveTab('forge')}
            onSelectPersona={handleSelectPersona}
            samplePersona={currentPersona}
          />
        )}

        {activeTab === 'vault' && (
          <VaultView
            savedPersonas={savedPersonas}
            lang={lang}
            onSelectPersona={handleSelectPersona}
            onRemovePersona={handleRemovePersona}
            onClearVault={handleClearVault}
            onExplorePresets={() => setActiveTab('presets')}
          />
        )}
      </main>

      {/* Subdued Apple HIG Footer */}
      <footer className="w-full border-t border-white/5 py-6 px-4 text-center text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-neutral-400 font-sans font-semibold">Blue Blood Alias</span>
            <span>• Heritage & Identity Engine</span>
          </div>

          <div className="text-[11px] text-neutral-500">
            {lang === 'ru'
              ? 'Анти-коллизионная генерация по законам генеалогической причинности'
              : 'Lossless generational pedigree timeline & 99.8% collision-free email'}
          </div>

          <div className="text-[10px] text-neutral-600">
            iOS 17–18 Design System • Pure Engineering
          </div>
        </div>
      </footer>
    </div>
  );
}
