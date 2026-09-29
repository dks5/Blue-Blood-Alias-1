import React from 'react';
import { Language } from '../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
  MapPin,
  UserCheck,
} from 'lucide-react';

interface StartViewProps {
  lang: Language;
  onStart: () => void;
}

export const StartView: React.FC<StartViewProps> = ({ lang, onStart }) => {
  return (
    <div className="w-full max-w-3xl mx-auto py-2 sm:py-6 px-1 sm:px-2 space-y-4 sm:space-y-6 animate-in fade-in duration-300">
      {/* Sticky/Pinned Top Window Title Bar */}
      <div className="sticky top-16 z-20 w-full py-2.5 px-4 rounded-xl bg-[#0f1422]/95 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="font-bold text-white text-sm sm:text-base tracking-tight">
            {lang === 'ru' ? 'Генератор Личностей & Google Gmail' : 'US Persona & Google Gmail Identity'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
          USA • 18–30 y.o.
        </span>
      </div>

      {/* 2-3 Concise Sentences (Concise & Easy to Read on Phone) */}
      <div className="rounded-2xl apple-glass-card p-4 sm:p-6 border border-white/8 space-y-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
        <p>
          {lang === 'ru'
            ? 'Сервис генерирует готовые профили американских студентов (18–30 лет) с реальными студийными паспортными портретами и достоверным адресом проживания в США.'
            : 'Generates complete verified profiles of American college students (18–30 y.o.) with studio passport portraits and verified US residential addresses.'}
        </p>
        <p>
          {lang === 'ru'
            ? 'Каждая личность получает два эксклюзивных варианта почты Google Gmail с привязкой к штату и префиксом USA, гарантирующих свободную регистрацию и 100% уникальность.'
            : 'Each persona receives two exclusive Google Gmail formulas anchored to their residence state and USA prefix, ensuring guaranteed free instant registration.'}
        </p>
        <p className="text-neutral-400 text-[11px] sm:text-xs">
          {lang === 'ru'
            ? 'Все реквизиты (ФИО, дата рождения, адрес, почта) копируются в один клик для моментального заполнения американских форм.'
            : 'All records (full name, DOB, address, email) are one-click copyable for fast registration form filling.'}
        </p>
      </div>

      {/* Instant Start Action Card (Visible immediately on phone screen) */}
      <div className="rounded-2xl apple-glass-card p-5 sm:p-7 border border-white/10 text-center space-y-4 shadow-xl">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
            {lang === 'ru' ? 'Быстрый доступ' : 'Instant Generation'}
          </div>
          <p className="text-xs sm:text-sm text-neutral-200">
            {lang === 'ru'
              ? 'Для перехода к генерации и просмотру карточки нажмите кнопку:'
              : 'To begin generation and inspect persona dossier, click start below:'}
          </p>
        </div>

        {/* Big Start Button (Subdued, Elegant Apple-styled Slate Cobalt) */}
        <div className="flex justify-center pt-1">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#244f9c] via-[#1d468f] to-[#1e3b79] hover:from-[#2e62be] hover:to-[#244f9c] text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-950/50 border border-blue-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserCheck className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
            <span>{lang === 'ru' ? 'Старт' : 'Start'}</span>
            <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/6 text-left">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-blue-300 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Gmail</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              {lang === 'ru'
                ? '2 варианта (инициал и полное имя) с гео-кодом штата и USA.'
                : '2 formulas (initial & full name) with state and USA geocode.'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ru' ? 'Почтовый адрес' : 'US Address'}</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              {lang === 'ru'
                ? 'Реальный адрес проживания с номером дома, улицей и ZIP.'
                : 'Realistic US address with house number, street and ZIP.'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-purple-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>{lang === 'ru' ? '20 Аватаров' : '20 Clean Avatars'}</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              {lang === 'ru'
                ? 'По 10 мужских и женских студенческих фото со скачиванием на ПК.'
                : '10 male & 10 female student studio portraits downloadable to PC.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
