import React from 'react';
import { Language, PersonaProfile } from '../types';
import {
  Dna,
  ArrowRight,
  GitBranch,
  Layers,
  SlidersHorizontal,
  Mail,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface OverviewViewProps {
  lang: Language;
  onExplorePresets: () => void;
  onOpenForge: () => void;
  onSelectPersona: (persona: PersonaProfile) => void;
  samplePersona: PersonaProfile;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  lang,
  onExplorePresets,
  onOpenForge,
}) => {
  const steps = [
    {
      num: '01',
      title: { ru: 'Эпоха и География Исхода', en: 'Epoch & Exodus Geography' },
      desc: {
        ru: 'От первых пуритан 1620 года и фронтира 1840-х до индустрии и технологий.',
        en: 'From 1620 Mayflower settlers to frontier pioneers and modern tech.',
      },
    },
    {
      num: '02',
      title: { ru: 'Сословие и Цеховое Ремесло', en: 'Ancestral Trade & Estate' },
      desc: {
        ru: 'Патриции, академические ученые, цеховые мастера и фермеры-гомстедеры.',
        en: 'Patricians, collegiate scholars, guild craftsmen, and territory farmers.',
      },
    },
    {
      num: '03',
      title: { ru: 'Древо Поколений: Дед и Бабка', en: 'Pedigree Nodes: Paternal & Maternal' },
      desc: {
        ru: 'Отцовская линия передает фамилию. Материнская девичья ветвь дарует Middle Name.',
        en: 'Patrilineal surname inheritance combined with maternal maiden middle name.',
      },
    },
    {
      num: '04',
      title: { ru: 'Имя Персоны (3–4 Буквы)', en: 'Given Name (3–4 Letters)' },
      desc: {
        ru: 'Лаконичные исторические фонемы без шума: Jack, Cole, Dean, Seth, Beau, Finn.',
        en: 'Precise phonemes with zero noise: Jack, Cole, Dean, Seth, Beau, Finn.',
      },
    },
    {
      num: '05',
      title: { ru: 'Анти-Коллизионный Алиас', en: 'Anti-Collision Alias' },
      desc: {
        ru: 'Историко-математическая формула чистоты почты (99.4%+) без случайных цифр.',
        en: 'Generational mathematical naming formula with 99.4%+ collision resistance.',
      },
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-2 sm:py-6">
      {/* Calm, disciplined Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/8">
          <Dna className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-mono text-neutral-300">
            {lang === 'ru' ? 'Архитектурный манифест системы' : 'System Architecture Blueprint'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          {lang === 'ru' ? 'Концепция: Инвертированный Принцип Генерации' : 'Concept: Inverted Heritage Generation'}
        </h1>

        <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {lang === 'ru'
            ? 'Личность не создается из случайных списков. Каждое имя и фамильный email строго вытекают из исторической причинно-следственной связи рода.'
            : 'Personas are never assembled from random tables. Every given name and heritage alias is derived through strict ancestral causality.'}
        </p>

        {/* Quick action buttons */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onExplorePresets}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? '10 Готовых Пресетов' : '10 Archetype Presets'}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>

          <button
            onClick={onOpenForge}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-xs border border-white/8 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'ru' ? 'Поэтапная Кузница' : 'Step-by-Step Forge'}</span>
          </button>
        </div>
      </section>

      {/* Sequential Concept Flow (Vertical Timeline with Clean Branching) */}
      <section className="rounded-2xl apple-glass-card p-6 sm:p-8 border border-white/8 space-y-6">
        <div className="border-b border-white/8 pb-4">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ru' ? 'Генеалогический Пайплайн (Lossless Pipeline)' : 'Genealogical Pipeline'}</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {lang === 'ru'
              ? 'Пять последовательных стадий, гарантирующих подлинность генезиса американской личности.'
              : 'Five sequential stages guaranteeing authentic historical genesis.'}
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {steps.map((st, i) => (
            <div key={st.num} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-4 h-4 rounded-full bg-[#12151d] border-2 border-blue-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                  <span>ШАГ {st.num}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{st.title[lang]}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{st.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy of "Blue Blood Alias" */}
      <section className="rounded-2xl p-6 bg-white/[0.02] border border-white/5 space-y-3 text-xs text-neutral-400 leading-relaxed">
        <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>{lang === 'ru' ? 'Семантическая философия «Blue Blood Alias»' : 'Brand & Identity Philosophy'}</span>
        </h3>
        <p>
          {lang === 'ru'
            ? 'Понятие «Blue Blood» (Голубая кровь) в системе обозначает не сословное превосходство, а бескомпромиссную чистоту цифрового следа. Использование девичьей фамилии материнского рода (Maternal Maiden Name) в качестве Middle Initial устраняет коллизии в почтовых регистрах (Gmail, Outlook, iCloud) естественным историческим путем — без искусственных цифр и символов.'
            : 'The concept of "Blue Blood" denotes uncompromised digital purity. Transmitting the maternal maiden surname as a distinguished middle initial naturally eliminates registry collisions in global email directories without random junk digits.'}
        </p>
      </section>
    </div>
  );
};
