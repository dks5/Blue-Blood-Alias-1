import React, { useState } from 'react';
import {
  EraId,
  EtymologyOrigin,
  Language,
  MiddleNameTradition,
  NameLengthCensure,
  PersonaProfile,
  SocialClassId,
} from '../types';
import { CustomForgeParams, generateFromCustomForge } from '../services/heritageEngine';
import {
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ArrowDown,
  RotateCcw,
  Check,
  User,
  Clock,
  Crown,
  BookOpen,
  Scissors,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Dna,
} from 'lucide-react';

interface ForgeViewProps {
  lang: Language;
  onSelectPersona: (persona: PersonaProfile) => void;
}

export const ForgeView: React.FC<ForgeViewProps> = ({ lang, onSelectPersona }) => {
  // Step tracker: 0 = Gender, 1 = Era, 2 = Social Class, 3 = Etymology, 4 = Length Census, 5 = Middle Tradition, 6 = Ready
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(18);
  const [era, setEra] = useState<EraId | null>(null);
  const [socialClass, setSocialClass] = useState<SocialClassId | null>(null);
  const [etymology, setEtymology] = useState<EtymologyOrigin | null>(null);
  const [censureLength, setCensureLength] = useState<NameLengthCensure | null>(null);
  const [middleTradition, setMiddleTradition] = useState<MiddleNameTradition | null>(null);

  const eraOptions: Array<{ id: EraId; title: { ru: string; en: string }; subtitle: { ru: string; en: string }; desc: { ru: string; en: string } }> = [
    {
      id: 'colonial_1620',
      title: { ru: '1620 • Колониальная пуританская', en: '1620 • Colonial Puritan' },
      subtitle: { ru: 'Первые колонии Новой Англии и Вирджинии', en: 'Early New England & Virginia Settlements' },
      desc: { ru: 'Пуритане кораблей «Мэйфлауэр» и «Арбелла», судьи колоний, первые миротворцы и фермеры.', en: 'Mayflower voyagers, Plymouth colony magistrates, early scholars and freeholders.' },
    },
    {
      id: 'frontier_1840',
      title: { ru: '1840 • Фронтир и Золотая лихорадка', en: '1840 • Frontier & Gold Rush' },
      subtitle: { ru: 'Орегонская тропа, следопыты, Техас и Калифорния', en: 'Oregon Trail, Scouts & Prairie Homesteaders' },
      desc: { ru: 'Первопроходцы Запада, строители форпостов, старатели золотых приисков и скотоводы прерий.', en: 'Caravan scouts, frontier outpost builders, gold prospectors, and prairie cattlemen.' },
    },
    {
      id: 'industrial_1910',
      title: { ru: '1910 • Индустриальный бум и фабрики', en: '1910 • Industrial Boom & Guilds' },
      subtitle: { ru: 'Стальной пояс Питтсбурга, Детройта и Чикаго', en: 'Steel Belt Foundries & Machine Builders' },
      desc: { ru: 'Инженеры мануфактур, старшие мастера мартеновских печей, локомотивных депо и типографий.', en: 'Foundry master mechanics, Bessemer plant metallurgists, locomotive engineers.' },
    },
    {
      id: 'modern_1980',
      title: { ru: '1980+ • Цифровая революция', en: '1980+ • Digital Revolution' },
      subtitle: { ru: 'Кремниевая долина, Манхэттен и лаборатории', en: 'Silicon Valley Laboratories & Wall Street' },
      desc: { ru: 'Разработчики полупроводников, профессора прикладной кибернетики, финансисты и венчурные партнеры.', en: 'Microchip architects, Stanford researchers, Wall Street investment partners.' },
    },
  ];

  const classOptions: Array<{ id: SocialClassId; title: { ru: string; en: string }; subtitle: { ru: string; en: string }; desc: { ru: string; en: string } }> = [
    {
      id: 'patrician',
      title: { ru: 'Аристократия / Династии (Patrician)', en: 'Old Money Patrician & Dynasties' },
      subtitle: { ru: 'Потомственные сенаторы, судьи, банкиры', en: 'Hereditary civic magistrates and trustees' },
      desc: { ru: 'Наследственная элита, попечители университетов, конгрессмены с вековыми фамилиями.', en: 'Collegiate trustees, historical banking dynasties, judicial patriciate.' },
    },
    {
      id: 'scholars',
      title: { ru: 'Ученые, юристы, судьи (Scholars)', en: 'Scholars, Jurists & Scribes' },
      subtitle: { ru: 'Академическая среда, книгопечатники', en: 'Academic faculty, printers and recorders' },
      desc: { ru: 'Профессора, архивариусы, составители колониальных хартий и правоведы.', en: 'Jurists, university fellows, sacred scripture scribes, and legal notaries.' },
    },
    {
      id: 'merchants',
      title: { ru: 'Купцы и коммерсанты (Merchants)', en: 'Merchants & Trading Houses' },
      subtitle: { ru: 'Морские торговые дома и портовые экспедиторы', en: 'Oceanic trade partners and shipping firms' },
      desc: { ru: 'Владельцы клиперов, торговцы шёлком и пряностями, биржевые брокеры портовых факторий.', en: 'Vessel owners, spice and textile importers, coastal harbor logistics partners.' },
    },
    {
      id: 'artisans',
      title: { ru: 'Ремесленники цехов (Artisans)', en: 'Guild Artisans & Craftsmen' },
      subtitle: { ru: 'Корабелы, литейщики, часовщики, оружейники', en: 'Shipwrights, clockmakers and metal artisans' },
      desc: { ru: 'Мастера цеховых гильдий, создатели точных инструментов и паровых двигателей.', en: 'Master smiths, precision horologists, instrument makers, and shipbuilders.' },
    },
    {
      id: 'agrarian',
      title: { ru: 'Землепашцы и скотоводы (Agrarian)', en: 'Homesteaders & Ranchers' },
      subtitle: { ru: 'Свободные фермеры, владельцы ранчо', en: 'Freeholder farmers and cattle rangers' },
      desc: { ru: 'Гомстедеры, держатели земельных паев, защитники долин и хранители полей.', en: 'Prairie land stewards, livestock breeders, and independent territory farmers.' },
    },
  ];

  const etymologyOptions: Array<{ id: EtymologyOrigin; title: { ru: string; en: string }; examples: string; desc: { ru: string; en: string } }> = [
    {
      id: 'toponymic',
      title: { ru: 'Топонимическая (Toponymic)', en: 'Toponymic (Landscapes & Sites)' },
      examples: 'Hill, Ford, Wood, Marsh, Stone, Peak, West, Camp',
      desc: { ru: 'Фамилия происходит от природных рубежей, речных бродов или лесных усадеб рода.', en: 'Derived from natural landmarks, river crossings, or ancestral valley homesteads.' },
    },
    {
      id: 'occupational',
      title: { ru: 'Профессиональная (Occupational)', en: 'Occupational (Historic Guilds)' },
      examples: 'Smith, Miller, Clark, Mason, Bell, Wright, Cooper, Hull',
      desc: { ru: 'Фамилия восходит к цеховому званию: кователи, книжники, мельничные мастера, корабелы.', en: 'Rooted in ancestral trade guilds: ironsmiths, scribes, millers, and shipwrights.' },
    },
    {
      id: 'patronymic',
      title: { ru: 'Патронимическая (Patronymic)', en: 'Patronymic (Clan Fathers)' },
      examples: 'Cole, Ross, Adams, Kane, Reid, Boyd, Knox, Mack',
      desc: { ru: 'Фамилия хранит личное имя или прозвание родоначальника клана.', en: 'Preserves the personal name or honorary moniker of the founding clan patriarch.' },
    },
    {
      id: 'descriptive',
      title: { ru: 'Описательная (Descriptive)', en: 'Descriptive (Virtue & Traits)' },
      examples: 'Gray, Short, Swift, Strong, Fox, Wolf, True, Bond',
      desc: { ru: 'Фамилия отражает отличительные черты характера, достоинства или стойкость предка.', en: 'Highlights celebrated personal attributes, steadfastness, sagacity, or bravery.' },
    },
  ];

  const censureOptions: Array<{ id: NameLengthCensure; title: { ru: string; en: string }; count: string; examples: string; desc: { ru: string; en: string } }> = [
    {
      id: 'short_3',
      title: { ru: 'Ультракороткие', en: 'Ultra-Short' },
      count: '3 буквы',
      examples: 'Roy, Dan, Ben, Leo, Fox, Jay, Rex, Max, Guy, Ian, Kai',
      desc: { ru: 'Максимальный минимализм, идеальный баланс с длинным средним именем.', en: 'Stripped-down phonetic punch; balances long middle maiden names.' },
    },
    {
      id: 'short_4',
      title: { ru: 'Классические', en: 'Classic Heritage' },
      count: '4 буквы',
      examples: 'Jack, Cole, Mark, Ross, Wade, Luke, Finn, Sean, Tate, Seth',
      desc: { ru: 'Золотой стандарт американской патрицианской номенклатуры.', en: 'The quintessential American patrician standard of strength and rhythm.' },
    },
    {
      id: 'medium_5',
      title: { ru: 'Сбалансированные', en: 'Balanced Five' },
      count: '5 букв',
      examples: 'Clark, Stone, Blair, Vance, Grant, Drake, Quinn, Wayne',
      desc: { ru: 'Пятибуквенные благородные корни с солидной ритмикой в email.', en: 'Firm five-character surnames offering solid resonance in digital handles.' },
    },
  ];

  const middleTraditions: Array<{ id: MiddleNameTradition; title: { ru: string; en: string }; code: string; desc: { ru: string; en: string } }> = [
    {
      id: 'maternal_maiden',
      title: { ru: 'Девичья фамилия матери (Patrician)', en: 'Maternal Maiden Surname (Patrician)' },
      code: 'Jack Forbes Cole ➔ jack.f.cole@...',
      desc: { ru: 'Историческая традиция передачи девичьей фамилии матери как второго имени и инициала.', en: 'The venerable tradition of transmitting the mother\'s maiden surname as official middle initial.' },
    },
    {
      id: 'biblical_patron',
      title: { ru: 'Библейский покровитель (Biblical Covenant)', en: 'Biblical Patron Covenant' },
      code: 'Jack Gideon Cole ➔ jack.g.cole@...',
      desc: { ru: 'Ветхозаветные добродетельные имена пуританских духовных защитников (Gideon, Silas, Amos).', en: 'Old Testament virtue monikers drawn from early puritan covenant records.' },
    },
    {
      id: 'state_geocode',
      title: { ru: 'Территориальный код штата (Geo-Anchor)', en: 'Territorial State Geo-Code' },
      code: 'Jack Austin Cole ➔ jack.austin.cole@...',
      desc: { ru: 'Географическое закрепление родословной через город или штат основания рода.', en: 'Grounds the genealogy firmly in the state or pioneer capital of ancestral settlement.' },
    },
    {
      id: 'single_initial',
      title: { ru: 'Южный кодекс чести (Single Letter Initial)', en: 'Southern Honor Single Initial' },
      code: 'Jack R. Cole ➔ j.r.cole@...',
      desc: { ru: 'Однобуквенный рыцарский инициал южной джентри-традиции (Lee, Ray, Jay).', en: 'Classic chivalric single-letter pedigree signature of Virginia gentry tradition.' },
    },
  ];

  const handleSelectGender = (val: 'male' | 'female') => {
    setGender(val);
    if (currentStep === 0) setCurrentStep(1);
  };

  const handleSelectEra = (val: EraId) => {
    setEra(val);
    if (currentStep === 1) setCurrentStep(2);
  };

  const handleSelectClass = (val: SocialClassId) => {
    setSocialClass(val);
    if (currentStep === 2) setCurrentStep(3);
  };

  const handleSelectEtymology = (val: EtymologyOrigin) => {
    setEtymology(val);
    if (currentStep === 3) setCurrentStep(4);
  };

  const handleSelectLength = (val: NameLengthCensure) => {
    setCensureLength(val);
    if (currentStep === 4) setCurrentStep(5);
  };

  const handleSelectMiddle = (val: MiddleNameTradition) => {
    setMiddleTradition(val);
    if (currentStep === 5) setCurrentStep(6);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setEra(null);
    setSocialClass(null);
    setEtymology(null);
    setCensureLength(null);
    setMiddleTradition(null);
  };

  const handleSynthesize = () => {
    if (!era || !socialClass || !etymology || !censureLength || !middleTradition) return;
    const params: CustomForgeParams = {
      era,
      socialClass,
      etymology,
      censureLength,
      middleTradition,
      gender,
      age,
    };
    const persona = generateFromCustomForge(params);
    onSelectPersona(persona);
  };

  const selectedEraObj = eraOptions.find((e) => e.id === era);
  const selectedClassObj = classOptions.find((c) => c.id === socialClass);
  const selectedEtymologyObj = etymologyOptions.find((e) => e.id === etymology);
  const selectedLengthObj = censureOptions.find((l) => l.id === censureLength);
  const selectedMiddleObj = middleTraditions.find((m) => m.id === middleTradition);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass-subtle mb-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-blue-200">
              {lang === 'ru' ? 'Поэтапная Мнемосхема Родословной' : 'Step-by-Step Pedigree Branching'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {lang === 'ru' ? 'Кузница Родословной' : 'Custom Pedigree Forge'}
          </h2>
          <p className="text-xs text-neutral-400">
            {lang === 'ru'
              ? 'Формирование генеалогической ветви шаг за шагом: каждый выбор фиксируется и открывает следующий узел древа.'
              : 'Construct your lineage sequentially: each confirmed node branches forward to the next generation node.'}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-medium border border-white/8 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'ru' ? 'Сбросить древо' : 'Reset Branching'}</span>
        </button>
      </div>

      {/* Sequential Tree Flow Container */}
      <div className="space-y-4 relative">
        {/* NODE 0: Gender Selection */}
        <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                {lang === 'ru' ? 'Пол наследника' : 'Subject Gender'}
              </span>
            </div>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(0)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
              >
                {lang === 'ru' ? 'Изменить' : 'Edit'}
              </button>
            )}
          </div>

          {currentStep === 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    gender === 'male'
                      ? 'bg-blue-600/30 text-white border-blue-400/60 shadow-md'
                      : 'apple-glass-subtle text-neutral-300 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="text-sm font-bold">{lang === 'ru' ? 'Мужской (Male)' : 'Male'}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{lang === 'ru' ? 'Мужская линия имен' : 'Male given names'}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    gender === 'female'
                      ? 'bg-purple-600/30 text-white border-purple-400/60 shadow-md'
                      : 'apple-glass-subtle text-neutral-300 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="text-sm font-bold">{lang === 'ru' ? 'Женский (Female)' : 'Female'}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{lang === 'ru' ? 'Женская линия имен' : 'Female given names'}</div>
                </button>
              </div>

              {/* Student age selection slider (18-30) in Step 1 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white">
                    {lang === 'ru' ? `Студенческий возраст: ${age} лет` : `Collegiate Age: ${age} y.o.`}
                  </span>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {lang === 'ru' ? `Диапазон 18–30 лет. Год рождения: ${2026 - age} г.` : `Cohort 18–30 y.o. Birth year: ${2026 - age}`}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="18"
                    max="30"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-36 sm:w-44 accent-blue-500 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-white text-sm w-7 text-right">
                    {age}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  {lang === 'ru' ? 'Зафиксировать и продолжить ➔' : 'Confirm & Continue ➔'}
                </button>
              </div>
            </div>
          ) : (
            /* Fixed branch state */
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-xs text-neutral-300">
                {lang === 'ru' ? 'Зафиксированные данные:' : 'Locked identity:'}
              </span>
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                {gender === 'male' ? (lang === 'ru' ? 'Мужской' : 'Male') : (lang === 'ru' ? 'Женский' : 'Female')}, {age} {lang === 'ru' ? 'лет' : 'y.o.'} ({2026 - age})
              </span>
            </div>
          )}
        </div>

        {/* Tree Branch Connector */}
        {currentStep >= 1 && (
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#161a24] border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* NODE 1: Era of Migration */}
        {currentStep >= 1 && (
          <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                  2
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  {lang === 'ru' ? 'Эпоха исхода (4 эпохи)' : 'Migration Epoch'}
                </span>
              </div>
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                >
                  {lang === 'ru' ? 'Изменить' : 'Edit'}
                </button>
              )}
            </div>

            {currentStep === 1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eraOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectEra(opt.id)}
                    className="p-4 rounded-xl border text-left apple-glass-subtle text-neutral-300 border-white/5 hover:border-blue-400/50 hover:bg-blue-600/10 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                      {opt.title[lang]}
                    </div>
                    <div className="text-[11px] text-blue-300/80 mt-0.5">{opt.subtitle[lang]}</div>
                    <div className="text-xs text-neutral-400 mt-2 leading-relaxed">{opt.desc[lang]}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* Fixed branch state */
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-neutral-300">
                  {lang === 'ru' ? 'Зафиксированная эпоха:' : 'Locked epoch:'}
                </span>
                <span className="text-xs font-bold text-blue-200 font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedEraObj?.title[lang]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tree Branch Connector */}
        {currentStep >= 2 && (
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#161a24] border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* NODE 2: Ancestral Social Class */}
        {currentStep >= 2 && (
          <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                  3
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  {lang === 'ru' ? 'Сословие предков (5 сословий)' : 'Ancestral Social Class'}
                </span>
              </div>
              {currentStep > 2 && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                >
                  {lang === 'ru' ? 'Изменить' : 'Edit'}
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectClass(opt.id)}
                    className="p-3.5 rounded-xl border text-left apple-glass-subtle text-neutral-300 border-white/5 hover:border-blue-400/50 hover:bg-blue-600/10 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                      {opt.title[lang]}
                    </div>
                    <div className="text-[11px] text-amber-300/80 mt-0.5">{opt.subtitle[lang]}</div>
                    <div className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">{opt.desc[lang]}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* Fixed branch state */
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-neutral-300">
                  {lang === 'ru' ? 'Зафиксированное сословие:' : 'Locked social class:'}
                </span>
                <span className="text-xs font-bold text-amber-200 font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedClassObj?.title[lang]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tree Branch Connector */}
        {currentStep >= 3 && (
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#161a24] border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* NODE 3: Surname Etymology */}
        {currentStep >= 3 && (
          <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                  4
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  {lang === 'ru' ? 'Этимология фамилии рода' : 'Surname Etymology'}
                </span>
              </div>
              {currentStep > 3 && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                >
                  {lang === 'ru' ? 'Изменить' : 'Edit'}
                </button>
              )}
            </div>

            {currentStep === 3 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {etymologyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectEtymology(opt.id)}
                    className="p-4 rounded-xl border text-left apple-glass-subtle text-neutral-300 border-white/5 hover:border-blue-400/50 hover:bg-blue-600/10 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                      {opt.title[lang]}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-300 mt-1 truncate">
                      {opt.examples}
                    </div>
                    <div className="text-xs text-neutral-400 mt-2 leading-relaxed">{opt.desc[lang]}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* Fixed branch state */
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-neutral-300">
                  {lang === 'ru' ? 'Зафиксированная этимология:' : 'Locked etymology:'}
                </span>
                <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedEtymologyObj?.title[lang]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tree Branch Connector */}
        {currentStep >= 4 && (
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#161a24] border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* NODE 4: Name Length Census */}
        {currentStep >= 4 && (
          <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                  5
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  {lang === 'ru' ? 'Ценз длины фонем имени и фамилии' : 'Phonetic Length Census'}
                </span>
              </div>
              {currentStep > 4 && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                >
                  {lang === 'ru' ? 'Изменить' : 'Edit'}
                </button>
              )}
            </div>

            {currentStep === 4 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {censureOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectLength(opt.id)}
                    className="p-3.5 rounded-xl border text-left apple-glass-subtle text-neutral-300 border-white/5 hover:border-blue-400/50 hover:bg-blue-600/10 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                        {opt.title[lang]}
                      </div>
                      <span className="text-[10px] font-mono text-sky-400 px-1.5 py-0.5 rounded bg-sky-500/10">
                        {opt.count}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-1 truncate">
                      {opt.examples}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-2 leading-relaxed">{opt.desc[lang]}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* Fixed branch state */
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-neutral-300">
                  {lang === 'ru' ? 'Зафиксированный ценз:' : 'Locked length census:'}
                </span>
                <span className="text-xs font-bold text-sky-300 font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedLengthObj?.title[lang]} ({selectedLengthObj?.count})
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tree Branch Connector */}
        {currentStep >= 5 && (
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#161a24] border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* NODE 5: Middle Name Tradition */}
        {currentStep >= 5 && (
          <div className="rounded-2xl apple-glass-card p-4 sm:p-5 border border-white/8 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold flex items-center justify-center border border-blue-400/30">
                  6
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  {lang === 'ru' ? 'Традиция среднего имени (Middle Tradition)' : 'Middle Name Tradition'}
                </span>
              </div>
              {currentStep > 5 && (
                <button
                  onClick={() => setCurrentStep(5)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                >
                  {lang === 'ru' ? 'Изменить' : 'Edit'}
                </button>
              )}
            </div>

            {currentStep === 5 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {middleTraditions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectMiddle(opt.id)}
                    className="p-3.5 rounded-xl border text-left apple-glass-subtle text-neutral-300 border-white/5 hover:border-blue-400/50 hover:bg-blue-600/10 transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                      {opt.title[lang]}
                    </div>
                    <div className="text-[11px] font-mono text-purple-300 mt-1 truncate">
                      {opt.code}
                    </div>
                    <div className="text-xs text-neutral-400 mt-2 leading-relaxed">{opt.desc[lang]}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* Fixed branch state */
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-neutral-300">
                  {lang === 'ru' ? 'Зафиксированная традиция:' : 'Locked middle tradition:'}
                </span>
                <span className="text-xs font-bold text-purple-300 font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedMiddleObj?.title[lang]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* FINAL NODE: Synthesis Ready */}
        {currentStep >= 6 && (
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-blue-950/70 to-indigo-950/70 border border-blue-500/30 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-200 mx-auto">
              <Dna className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {lang === 'ru' ? 'Генеалогическая мнемосхема полностью сформирована' : 'Lineage Branching Blueprint Complete'}
            </h3>
            <p className="text-xs text-neutral-300 max-w-lg mx-auto">
              {lang === 'ru'
                ? 'Все звенья цепи замкнуты. Нажмите кнопку ниже, чтобы вычислить финальное досье личности и анти-коллизионные адреса.'
                : 'All generation criteria verified. Click below to synthesize the certified person dossier and anti-collision emails.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSynthesize}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-800/30"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>{lang === 'ru' ? 'Синтезировать личность и открыть досье' : 'Synthesize Persona & Open Dossier'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
