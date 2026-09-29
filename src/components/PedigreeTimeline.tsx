import React from 'react';
import { Language, PedigreeTimelineTree, PersonaProfile } from '../types';
import { GitBranch, MapPin, Briefcase } from 'lucide-react';

interface PedigreeTimelineProps {
  tree: PedigreeTimelineTree;
  persona: PersonaProfile;
  lang: Language;
}

export const PedigreeTimeline: React.FC<PedigreeTimelineProps> = ({
  tree,
  persona,
  lang,
}) => {
  const { paternalGrandfather, maternalGrandfather } = tree;

  return (
    <div className="w-full space-y-4">
      {/* Historical Era & Route Banner (subdued, quiet) */}
      <div className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/6 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-300 font-medium">{tree.originEraTitle[lang]}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
          <MapPin className="w-3 h-3 text-neutral-400" />
          <span>{tree.migrationPath[lang]}</span>
        </div>
      </div>

      {/* Two Ancestral Branches (calm, monochromatic with subtle accents) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Paternal Lineage */}
        <div className="rounded-xl p-4 bg-white/[0.02] border border-white/6 hover:border-white/12 transition-colors">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              {lang === 'ru' ? 'Отцовская ветвь' : 'Paternal Line'}
            </span>
            <span className="font-mono text-neutral-400 text-[11px]">
              ~{paternalGrandfather.birthYear}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-neutral-200">
            {paternalGrandfather.fullName}
          </h4>

          <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="truncate">{paternalGrandfather.originHomeland} ➔ {paternalGrandfather.usArrivalPlace}</span>
          </div>

          <div className="mt-2.5 p-2 rounded-lg bg-white/[0.02] border border-white/4 text-xs text-neutral-400 flex items-start gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{paternalGrandfather.historicOccupation}</span>
          </div>

          <div className="mt-3 pt-2 border-t border-white/4 flex items-center justify-between text-xs">
            <span className="text-neutral-400">{lang === 'ru' ? 'Передал фамилию:' : 'Passed surname:'}</span>
            <span className="font-mono font-bold text-white tracking-wide text-xs">
              {persona.lastName.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Maternal Lineage */}
        <div className="rounded-xl p-4 bg-white/[0.02] border border-white/6 hover:border-white/12 transition-colors">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
              {lang === 'ru' ? 'Материнская ветвь' : 'Maternal Line'}
            </span>
            <span className="font-mono text-neutral-400 text-[11px]">
              ~{maternalGrandfather.birthYear}
            </span>
          </div>

          <h4 className="text-sm font-semibold text-neutral-200">
            {maternalGrandfather.fullName}
          </h4>

          <div className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="truncate">{maternalGrandfather.originHomeland} ➔ {maternalGrandfather.usArrivalPlace}</span>
          </div>

          <div className="mt-2.5 p-2 rounded-lg bg-white/[0.02] border border-white/4 text-xs text-neutral-400 flex items-start gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{maternalGrandfather.historicOccupation}</span>
          </div>

          <div className="mt-3 pt-2 border-t border-white/4 flex items-center justify-between text-xs">
            <span className="text-neutral-400">{lang === 'ru' ? 'Девичья фамилия матери:' : 'Maternal Maiden Surname:'}</span>
            <span className="font-mono text-neutral-300 text-xs">
              {persona.middleName} ({persona.middleInitial}.)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
