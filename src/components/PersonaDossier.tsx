import React, { useState, useEffect } from 'react';
import { Language, PersonaProfile } from '../types';
import { PedigreeTimeline } from './PedigreeTimeline';
import { getNextAvatarUrl, AVATARS_MALE, AVATARS_FEMALE } from '../services/heritageEngine';
import { getTagTitle } from '../services/emailAntiCollision';
import {
  Bookmark,
  BookmarkCheck,
  Download,
  Share2,
  RotateCw,
  Check,
  Copy,
  Calendar,
  MapPin,
  Sliders,
  Dna,
  RefreshCw,
  Mail,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookOpen,
  ArrowDown,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface PersonaDossierProps {
  persona: PersonaProfile;
  lang: Language;
  isSaved: boolean;
  onToggleSave: (persona: PersonaProfile) => void;
  onRegenerate: () => void;
  onUpdateAge: (newAge: number) => void;
  onUpdateAvatarUrl: (url: string) => void;
}

export const PersonaDossier: React.FC<PersonaDossierProps> = ({
  persona,
  lang,
  isSaved,
  onToggleSave,
  onRegenerate,
  onUpdateAge,
  onUpdateAvatarUrl,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showAgeSlider, setShowAgeSlider] = useState(false);
  const [downloadingAvatar, setDownloadingAvatar] = useState(false);

  // Active Gmail option index (0 or 1) - toggleable directly on card
  const [selectedEmailIdx, setSelectedEmailIdx] = useState<number>(0);

  // 5-second interactive onboarding guide animation
  const [guideCountdown, setGuideCountdown] = useState<number>(5);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  // Accordion section states (all collapsed by default to keep student card clean)
  const [openEmailDeepDive, setOpenEmailDeepDive] = useState(false);
  const [openPedigreeTree, setOpenPedigreeTree] = useState(false);
  const [openHistoryEtymology, setOpenHistoryEtymology] = useState(false);

  // 5-second countdown timer for interactive visual arrows
  useEffect(() => {
    if (!showGuide) return;
    const interval = setInterval(() => {
      setGuideCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowGuide(false);
          return 0;
        }
        // At 3 seconds, demo-switch email option to show live reaction
        if (prev === 3) {
          setSelectedEmailIdx(1);
        } else if (prev === 2) {
          setSelectedEmailIdx(0);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showGuide]);

  const restartGuide = () => {
    setGuideCountdown(5);
    setShowGuide(true);
  };

  const activeEmail = persona.emails[selectedEmailIdx] || persona.emails[0];

  const copyToClipboard = (text: string, fieldId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(persona, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${persona.firstName}_${persona.lastName}_Pedigree.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleShareSummary = () => {
    const text = `${persona.firstName} ${persona.lastName} (Age: ${persona.age}, DOB: ${persona.birthDate})\nAddress: ${persona.residence.fullAddress}\nGmail: ${activeEmail?.address}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Switch to next avatar in pool on avatar click or switch button
  const handleCycleAvatar = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextUrl = getNextAvatarUrl(persona.avatarUrl, persona.gender);
    onUpdateAvatarUrl(nextUrl);
  };

  // Download avatar photo directly to user's computer
  const handleDownloadAvatar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!persona.avatarUrl) return;
    setDownloadingAvatar(true);
    try {
      const response = await fetch(persona.avatarUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${persona.firstName}_${persona.lastName}_Avatar.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download avatar image', err);
    } finally {
      setTimeout(() => setDownloadingAvatar(false), 1200);
    }
  };

  const currentPool = persona.gender === 'male' ? AVATARS_MALE : AVATARS_FEMALE;
  const currentAvatarIndex = persona.avatarUrl ? currentPool.indexOf(persona.avatarUrl) + 1 : 1;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* 5-second Tutorial Banner (Floating & Non-Intrusive) */}
      {showGuide && (
        <div className="flex items-center justify-between p-2.5 px-3.5 rounded-xl bg-[#0e172a]/95 border border-blue-400/40 text-xs shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-semibold text-white">
              {lang === 'ru'
                ? 'Интерактивный гид управления (5 сек):'
                : 'Interactive Controls Guide (5s):'}
            </span>
            <span className="text-neutral-300 hidden sm:inline text-[11px]">
              {lang === 'ru'
                ? 'пульсирующие стрелки показывают возраст, случайный выбор и переключение почты.'
                : 'pulsing arrows indicate age adjuster, re-roll and Gmail formulas.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
              {guideCountdown}s
            </span>
            <button
              onClick={() => setShowGuide(false)}
              className="text-neutral-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-white/10 text-sm font-bold"
              title={lang === 'ru' ? 'Закрыть подсказку' : 'Dismiss'}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CORE CLEAN STUDENT VISITING CARD (Apple ID Aesthetic)
          ======================================================== */}
      <div className="rounded-2xl apple-glass-card p-4 sm:p-6 border border-white/8 space-y-4 shadow-2xl relative">
        {/* Top Control Bar (Clean, Compact, No overflowing on mobile) */}
        <div className="flex items-center justify-between pb-3 border-b border-white/6 text-xs gap-2">
          {/* Guide replay icon button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={restartGuide}
              title={lang === 'ru' ? 'Повторить 5-секундный гид по кнопкам' : 'Replay 5s guide'}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-blue-300 text-[11px] transition-colors"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">{lang === 'ru' ? 'Гид' : 'Guide'}</span>
            </button>
          </div>

          {/* Action buttons (All fit cleanly on mobile phones) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 1. Student Age Quick Adjuster Toggle (18-30) */}
            <div className="relative">
              {showGuide && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1e293b] border border-amber-400/80 text-[10px] font-bold text-amber-200 shadow-xl pointer-events-none whitespace-nowrap animate-bounce z-30">
                  <ArrowDown className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'ru' ? 'Возраст' : 'Age'}</span>
                </div>
              )}

              <button
                onClick={() => setShowAgeSlider(!showAgeSlider)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                  showGuide
                    ? 'ring-2 ring-amber-400/90 bg-amber-500/20 text-white border-amber-400/50 shadow-md shadow-amber-500/20 animate-pulse'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 border-white/8'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono font-semibold">{persona.age} {lang === 'ru' ? 'лет' : 'y.o.'}</span>
              </button>
            </div>

            {/* 2. Square Icon-Only Save Button (No overflowing text) */}
            <button
              onClick={() => onToggleSave(persona)}
              title={isSaved ? (lang === 'ru' ? 'В сейфе' : 'Saved') : (lang === 'ru' ? 'Сохранить в сейф' : 'Save')}
              className={`p-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                isSaved
                  ? 'bg-[#244f9c] text-white border border-blue-400/40 shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] text-neutral-300 border border-white/6'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-300" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* 3. Export JSON */}
            <button
              onClick={handleExportJSON}
              title={lang === 'ru' ? 'Экспорт JSON' : 'Export JSON'}
              className="p-2 w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-neutral-400 hover:text-white border border-white/6 transition-colors flex items-center justify-center shrink-0"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* 4. Share / Copy Summary */}
            <button
              onClick={handleShareSummary}
              title={lang === 'ru' ? 'Скопировать сводку' : 'Copy Summary'}
              className="p-2 w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-neutral-400 hover:text-white border border-white/6 transition-colors flex items-center justify-center shrink-0"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* 5. Subdued Slate-Cobalt Random Re-Roll Button with Guide Arrow */}
            <div className="relative shrink-0">
              {showGuide && (
                <div className="absolute -top-8 right-0 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1e293b] border border-blue-400/80 text-[10px] font-bold text-blue-200 shadow-xl pointer-events-none whitespace-nowrap animate-bounce z-30">
                  <ArrowDown className="w-3 h-3 text-blue-400" />
                  <span>{lang === 'ru' ? 'Случайный выбор' : 'Random persona'}</span>
                </div>
              )}

              <button
                onClick={onRegenerate}
                title={lang === 'ru' ? 'Сгенерировать случайного студента из пресетов' : 'Random new student persona'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all shadow-md shrink-0 ${
                  showGuide
                    ? 'ring-2 ring-blue-400 bg-[#244f9c] text-white border-blue-400 animate-pulse'
                    : 'bg-[#244f9c] hover:bg-[#2c5eb5] text-white border border-blue-400/30 shadow-blue-950/40'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="text-xs">{lang === 'ru' ? 'Случайный' : 'Random'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Student Age Adjustment Drawer (18-30 years old) */}
        {showAgeSlider && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs animate-in fade-in duration-200">
            <div className="space-y-0.5">
              <div className="font-semibold text-white">
                {lang === 'ru' ? `Студенческий возраст: ${persona.age} лет` : `Student Age: ${persona.age} years old`}
              </div>
              <div className="text-[11px] text-neutral-400">
                {lang === 'ru'
                  ? `Диапазон 18–30 лет. Год рождения: ${persona.birthYear} г. Дата и почтовые алиасы обновляются динамически.`
                  : `Student cohort 18–30 y.o. Birth year: ${persona.birthYear}. DOB and Google aliases update dynamically.`}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="18"
                max="30"
                value={persona.age}
                onChange={(e) => onUpdateAge(Number(e.target.value))}
                className="w-36 sm:w-44 accent-blue-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-white text-sm w-7 text-right">
                {persona.age}
              </span>
            </div>
          </div>
        )}

        {/* Main Clean Student Card Body */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Avatar Section: Clean Portrait with Click-to-Cycle & Download Options */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div
              onClick={() => handleCycleAvatar()}
              title={lang === 'ru' ? 'Кликните на фото для переключения портрета (из 10)' : 'Click photo to cycle through 10 student portraits'}
              className="relative cursor-pointer group select-none"
            >
              {persona.avatarUrl ? (
                <img
                  src={persona.avatarUrl}
                  alt={persona.fullName}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border border-white/10 shadow-xl shadow-black/50 group-hover:brightness-105 group-hover:border-blue-400/40 transition-all"
                />
              ) : (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-neutral-300">
                  {persona.firstName.charAt(0)}{persona.lastName.charAt(0)}
                </div>
              )}

              {/* Hover overlay hint */}
              <div className="absolute inset-0 rounded-2xl bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-medium gap-1.5 backdrop-blur-[2px]">
                <RefreshCw className="w-4 h-4 text-white animate-spin-once" />
                <span>{lang === 'ru' ? 'Сменить' : 'Next'}</span>
              </div>

              {/* Age badge */}
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-md bg-[#12151e] border border-white/10 text-[10px] font-mono text-neutral-300 font-semibold shadow-sm">
                {persona.age} {lang === 'ru' ? 'лет' : 'y.o.'}
              </div>

              {/* Photo variant index indicator */}
              <div className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-md bg-[#244f9c]/90 border border-blue-400/40 text-[9px] font-mono text-white font-bold shadow-sm">
                {currentAvatarIndex > 0 ? `${currentAvatarIndex}/10` : '1/10'}
              </div>
            </div>

            {/* Avatar Control Buttons: Switch Portrait & Download to PC */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={handleCycleAvatar}
                title={lang === 'ru' ? 'Переключить на следующий студенческий портрет (из 10)' : 'Next student portrait (10 total)'}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/6 text-[10px] sm:text-[11px] font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-blue-400" />
                <span>{lang === 'ru' ? 'Сменить' : 'Next'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAvatar}
                title={lang === 'ru' ? 'Скачать фото на компьютер для использования в аватаре' : 'Download clean avatar to computer'}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/6 text-[10px] sm:text-[11px] font-medium transition-colors"
              >
                {downloadingAvatar ? <Check className="w-3 h-3 text-emerald-400" /> : <Download className="w-3 h-3 text-emerald-400" />}
                <span>{downloadingAvatar ? (lang === 'ru' ? 'Сохранено' : 'Saved') : (lang === 'ru' ? 'Скачать' : 'Save')}</span>
              </button>
            </div>
          </div>

          {/* Clean Student Identity Data Rows (One-Click Copyable) */}
          <div className="flex-1 w-full space-y-2.5">
            {/* Row 1: Full Name */}
            <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white/[0.025] border border-white/6">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                  {lang === 'ru' ? 'Имя и Фамилия' : 'Full Name'}
                </span>
                <div className="flex items-center gap-2 truncate">
                  <span className="text-lg sm:text-2xl font-light text-neutral-200">{persona.firstName}</span>
                  <span className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">{persona.lastName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/6 ml-1">
                    {persona.gender === 'male' ? (lang === 'ru' ? 'Мужчина' : 'Male') : (lang === 'ru' ? 'Женщина' : 'Female')}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => copyToClipboard(`${persona.firstName} ${persona.lastName}`, 'name_row', e)}
                className="p-1.5 sm:p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                title={lang === 'ru' ? 'Скопировать полное имя' : 'Copy Name'}
              >
                {copiedField === 'name_row' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Row 2: Date of Birth & Age */}
            <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white/[0.025] border border-white/6">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                  {lang === 'ru' ? 'Дата Рождения / Возраст' : 'Date of Birth / Age'}
                </span>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-200 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{persona.birthDate}</span>
                  <span className="text-neutral-500 font-normal">
                    ({persona.birthYear}, {persona.age} {lang === 'ru' ? 'лет' : 'y.o.'})
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => copyToClipboard(persona.birthDate, 'dob_row', e)}
                className="p-1.5 sm:p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                title={lang === 'ru' ? 'Скопировать дату рождения' : 'Copy DOB'}
              >
                {copiedField === 'dob_row' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Row 3: US Residential Address */}
            <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-white/[0.025] border border-white/6">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block tracking-wider">
                  {lang === 'ru' ? 'Почтовый Адрес Проживания' : 'US Postal Residence'}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200 font-mono truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{persona.residence.fullAddress}</span>
                </div>
              </div>
              <button
                onClick={(e) => copyToClipboard(persona.residence.fullAddress, 'addr_row', e)}
                className="p-1.5 sm:p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
                title={lang === 'ru' ? 'Скопировать адрес' : 'Copy Address'}
              >
                {copiedField === 'addr_row' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Row 4: Controlled Google Gmail (Subdued Switcher + Icon-Only Copy Button for Single-Line Address) */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-mono uppercase text-blue-300 font-bold tracking-wider">
                    Google Gmail
                  </span>
                </div>

                {/* Subdued 2-Option Segmented Switcher with Guide Arrow */}
                <div className="relative">
                  {showGuide && (
                    <div className="absolute -top-7 right-0 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1e293b] border border-blue-400/80 text-[10px] font-bold text-blue-200 shadow-xl pointer-events-none whitespace-nowrap animate-bounce z-30">
                      <ArrowDown className="w-3 h-3 text-blue-400" />
                      <span>{lang === 'ru' ? 'Вариант 1 / Вариант 2' : 'Toggle Formula'}</span>
                    </div>
                  )}

                  <div className={`flex items-center p-0.5 rounded-lg bg-black/40 border text-[10px] font-medium transition-all ${
                    showGuide ? 'border-blue-400/80 ring-1 ring-blue-400/60' : 'border-white/10'
                  }`}>
                    <button
                      onClick={() => setSelectedEmailIdx(0)}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        selectedEmailIdx === 0
                          ? 'bg-[#244f9c] text-white font-semibold shadow-xs'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {lang === 'ru' ? 'Вариант 1 (Инициал)' : 'Option 1 (Initial)'}
                    </button>
                    <button
                      onClick={() => setSelectedEmailIdx(1)}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        selectedEmailIdx === 1
                          ? 'bg-[#244f9c] text-white font-semibold shadow-xs'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {lang === 'ru' ? 'Вариант 2 (Полное)' : 'Option 2 (Full)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Address & Compact Icon-Only Quick Copy Button (Single line without wrapping) */}
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight truncate min-w-0">
                  {activeEmail?.address}
                </div>

                <button
                  onClick={(e) => copyToClipboard(activeEmail?.address || '', 'gmail_main', e)}
                  title={lang === 'ru' ? 'Скопировать адрес Gmail' : 'Copy Gmail address'}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all shrink-0 ${
                    copiedField === 'gmail_main'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 border border-blue-500/30 shadow-xs'
                  }`}
                >
                  {copiedField === 'gmail_main' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          FUNCTIONAL ACCORDIONS (COLLAPSIBLE TO UNCLUTTER CARD)
          ======================================================== */}
      <div className="space-y-2.5">
        {/* Accordion 1: Google Gmail Deep-Dive & Modular Data Vault */}
        <div className="rounded-xl apple-glass-card border border-white/8 overflow-hidden transition-all">
          <button
            onClick={() => setOpenEmailDeepDive(!openEmailDeepDive)}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>{lang === 'ru' ? 'Детальный Разбор Почты и Модульные Данные Регистрации' : 'Gmail Architecture & Registration Module Blocks'}</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  {lang === 'ru' ? 'Формулы уникальности, оба варианта Google Gmail и раздельное копирование полей' : 'Uniqueness formula, both Google Gmail variants, modular copyable fields'}
                </div>
              </div>
            </div>
            {openEmailDeepDive ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openEmailDeepDive && (
            <div className="p-4 sm:p-5 border-t border-white/6 bg-white/[0.01] space-y-4 animate-in fade-in duration-200">
              {/* Explanatory banner */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/6 text-xs text-neutral-400 leading-relaxed">
                {activeEmail?.description[lang]}
              </div>

              {/* 2 Email options side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {persona.emails.map((em, idx) => (
                  <div
                    key={em.id}
                    onClick={() => setSelectedEmailIdx(idx)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedEmailIdx === idx
                        ? 'bg-blue-950/40 border-blue-400/50 shadow-sm'
                        : 'bg-white/[0.02] border-white/6 hover:border-white/12'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold">
                        {getTagTitle(em.tag, lang)}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        99.9%
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-white break-all mb-2">
                      {em.address}
                    </div>
                    <button
                      onClick={(e) => copyToClipboard(em.address, `email_${em.id}`, e)}
                      className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
                    >
                      {copiedField === `email_${em.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === `email_${em.id}` ? (lang === 'ru' ? 'Скопировано' : 'Copied') : (lang === 'ru' ? 'Скопировать' : 'Copy')}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Modular copy blocks for registration forms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-white/6">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Имя' : 'First Name'}</div>
                    <div className="text-xs font-semibold text-neutral-200 truncate">{persona.firstName}</div>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(persona.firstName, 'mod_fname', e)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                  >
                    {copiedField === 'mod_fname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Фамилия' : 'Last Name'}</div>
                    <div className="text-xs font-bold text-white truncate">{persona.lastName}</div>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(persona.lastName, 'mod_lname', e)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                  >
                    {copiedField === 'mod_lname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'Город, Штат' : 'City, State'}</div>
                    <div className="text-xs font-semibold text-neutral-200 truncate">{persona.residence.city}, {persona.residence.stateCode}</div>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(`${persona.residence.city}, ${persona.residence.stateCode}`, 'mod_city', e)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                  >
                    {copiedField === 'mod_city' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="min-w-0 pr-1">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">{lang === 'ru' ? 'ZIP Индекс' : 'ZIP Code'}</div>
                    <div className="text-xs font-semibold text-neutral-200 font-mono truncate">{persona.residence.zipCode}</div>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(persona.residence.zipCode, 'mod_zip', e)}
                    className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-white/5"
                  >
                    {copiedField === 'mod_zip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Generational Pedigree Tree Timeline */}
        <div className="rounded-xl apple-glass-card border border-white/8 overflow-hidden transition-all">
          <button
            onClick={() => setOpenPedigreeTree(!openPedigreeTree)}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Dna className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-xs font-bold text-white">
                  {lang === 'ru' ? 'Родословное Древо Поколений (Дед по отцу и матери)' : 'Generational Pedigree Timeline (Ancestral Nodes)'}
                </div>
                <div className="text-[11px] text-neutral-400">
                  {lang === 'ru'
                    ? `Отцовская линия (${persona.lastName}) и материнская ветвь (${persona.middleName})`
                    : `Patrilineal root (${persona.lastName}) & maternal maiden lineage (${persona.middleName})`}
                </div>
              </div>
            </div>
            {openPedigreeTree ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openPedigreeTree && (
            <div className="p-4 sm:p-5 border-t border-white/6 bg-white/[0.01] animate-in fade-in duration-200">
              <PedigreeTimeline tree={persona.pedigree.tree} persona={persona} lang={lang} />
            </div>
          )}
        </div>

        {/* Accordion 3: Historical Narrative & Surname Etymology */}
        <div className="rounded-xl apple-glass-card border border-white/8 overflow-hidden transition-all">
          <button
            onClick={() => setOpenHistoryEtymology(!openHistoryEtymology)}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">
                  {lang === 'ru' ? 'Исторический Контекст и Этимология Фамилии' : 'Historical Narrative & Surname Etymology'}
                </div>
                <div className="text-[11px] text-neutral-400">
                  {lang === 'ru'
                    ? `Происхождение фамилии ${persona.lastName} и хроника династии`
                    : `Etymological origin of ${persona.lastName} and family history`}
                </div>
              </div>
            </div>
            {openHistoryEtymology ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openHistoryEtymology && (
            <div className="p-4 sm:p-5 border-t border-white/6 bg-white/[0.01] grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs animate-in fade-in duration-200">
              <div className="md:col-span-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  {lang === 'ru' ? 'Историческая хроника рода' : 'Historical Chronicle'}
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans">
                  {persona.narrativeStory.bioSummary[lang]}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  {lang === 'ru' ? 'Этимология фамилии' : 'Surname Etymology'}
                </div>
                <div className="font-bold text-white font-mono text-sm">{persona.lastName}</div>
                <p className="text-neutral-400 leading-relaxed text-[11px]">
                  {persona.narrativeStory.surnameEtymologyExplanation[lang]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
