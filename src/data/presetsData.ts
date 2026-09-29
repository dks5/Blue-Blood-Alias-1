import { PresetDefinition } from '../types';

export const PRESETS_DATA: PresetDefinition[] = [
  {
    id: 'boston_brahmin',
    index: 1,
    name: {
      ru: 'Бостонский брамин',
      en: 'Boston Brahmin',
    },
    subtitle: {
      ru: 'Old Money / Элита WASP Новой Англии',
      en: 'Old Money / WASP Elite of New England',
    },
    historicalRoots: {
      ru: 'Англо-саксонские пуритане, прибывшие в колонию Массачусетского залива (1630–1680 гг., корабли «Mayflower», «Arbella»). Наследственная финансовая, академическая и сенаторская элита Новой Англии.',
      en: 'Anglo-Saxon puritans arriving in the Massachusetts Bay Colony (1630–1680, Mayflower and Arbella voyages). Hereditary financial, academic, and senatorial patricians of New England.',
    },
    socialClass: 'patrician',
    era: 'colonial_1620',
    etymology: 'patronymic',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Судья верховного трибунала и портовый судовладелец колонии Плимут',
        en: 'Supreme magistrate and shipping merchant of Plymouth Colony',
      },
      origin: 'Suffolk, England',
      arrivalPlace: 'Boston Harbor, MA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Дочь старейшины рода книжников и попечителей Гарвардской коллегии',
        en: 'Daughter of the collegiate elder line and Harvard College trustee',
      },
      origin: 'Hampshire, England',
      arrivalPlace: 'Salem & Cambridge, MA',
      maidenRoots: ['Cabot', 'Forbes', 'Lowell', 'Otis', 'Quincy', 'Alden', 'Bradford'],
    },
    firstNamesMale: ['Jack', 'Todd', 'Dean', 'Kent', 'Ward', 'Hugh', 'Paul'],
    firstNamesFemale: ['Anne', 'Jane', 'Kate', 'Ruth', 'Faye', 'Bess', 'Blythe'],
    surnames: ['Cole', 'Gray', 'Ford', 'Shaw', 'Ward', 'Hall', 'Reid', 'Pike'],
    emailFormulaDesc: {
      ru: 'Лаконичный строгий консервативный стиль с обязательным средним инициалом матери ({first}.{m_initial}.{last})',
      en: 'Conservative patrician syntax with mandatory maternal middle initial ({first}.{m_initial}.{last})',
    },
    locations: [
      { city: 'Boston', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2108, 2215] },
      { city: 'Cambridge', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2138, 2142] },
      { city: 'Newport', stateCode: 'RI', stateName: 'Rhode Island', zipRange: [2840, 2841] },
    ],
  },
  {
    id: 'frontier_pioneer',
    index: 2,
    name: {
      ru: 'Пионер Великих равнин',
      en: 'Frontier Pioneer',
    },
    subtitle: {
      ru: 'Первопроходцы и гомстедеры Запада',
      en: 'Frontier Pioneers & Homesteaders',
    },
    historicalRoots: {
      ru: 'Переселенцы фронтира, участники Орегонской тропы, осваивавшие Канзас, Небраску, Монтану и Техас в XIX веке. Земледельцы-гомстедеры, скотоводы, старатели и следопыты.',
      en: 'Frontier wayfarers and Oregon Trail homesteaders settling Kansas, Nebraska, Montana, and Texas in the 19th century. Cattle ranchers, surveyors, and wilderness pathfinders.',
    },
    socialClass: 'agrarian',
    era: 'frontier_1840',
    etymology: 'toponymic',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Строитель бревенчатых форпостов и участник Калифорнийской золотой лихорадки 1849 г.',
        en: 'Log outpost builder and veteran surveyor of the 1849 Gold Rush',
      },
      origin: 'Cumberland Gap, VA',
      arrivalPlace: 'Independence, MO',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Дочь кузнеца-инструментальщика каравана первых поселенцев Прерии',
        en: 'Daughter of the Prairie wagon-train toolmaster and blacksmith',
      },
      origin: 'Blue Ridge, NC',
      arrivalPlace: 'Fort Laramie, WY',
      maidenRoots: ['Boone', 'Carson', 'Crockett', 'Travis', 'Austin', 'Bowie', 'Dallas'],
    },
    firstNamesMale: ['Beau', 'Luke', 'Clay', 'Ross', 'Colt', 'Wade', 'Boyd', 'Chet', 'Zane'],
    firstNamesFemale: ['Mae', 'June', 'Fern', 'Opal', 'Wren', 'Gail', 'Jean'],
    surnames: ['Wood', 'Clay', 'Stone', 'Hill', 'Ford', 'Camp', 'West', 'Peak', 'Plum'],
    emailFormulaDesc: {
      ru: 'Функциональный стиль с географической привязкой к штату фронтира ({first}.{last}.{state})',
      en: 'Functional syntax with frontier state geographical anchor ({first}.{last}.{state})',
    },
    locations: [
      { city: 'Austin', stateCode: 'TX', stateName: 'Texas', zipRange: [78701, 78759] },
      { city: 'Fort Worth', stateCode: 'TX', stateName: 'Texas', zipRange: [76101, 76179] },
      { city: 'Bozeman', stateCode: 'MT', stateName: 'Montana', zipRange: [59715, 59719] },
      { city: 'Wichita', stateCode: 'KS', stateName: 'Kansas', zipRange: [67201, 67226] },
    ],
  },
  {
    id: 'craftsman_guild',
    index: 3,
    name: {
      ru: 'Мастер Индустриальной Гильдии',
      en: 'Industrial Guild Master',
    },
    subtitle: {
      ru: 'Литейщики и инженеры стального пояса',
      en: 'The Craftsman & Steel Belt Trade',
    },
    historicalRoots: {
      ru: 'Промышленная революция конца XIX — начала XX века, цеховые инженеры и мастера мануфактур Питтсбурга, Детройта и Чикаго. Профессиональный средний класс, литейщики и машиностроители.',
      en: 'Second Industrial Revolution of late 19th/early 20th century, foundry engineers and master mechanics of Pittsburgh, Detroit, and Chicago.',
    },
    socialClass: 'artisans',
    era: 'industrial_1910',
    etymology: 'occupational',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Старший мастер литейного мартена и локомотивного депо Пенсильвании',
        en: 'Chief metallurgist of the Pittsburgh Bessemer converter plant',
      },
      origin: 'Sheffield, Yorkshire',
      arrivalPlace: 'Philadelphia & Pittsburgh, PA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Семья точных чертежников и типографских граверов паровых машин',
        en: 'Lineage of precision drafting machinists and patent engravers',
      },
      origin: 'Belfast, Ireland',
      arrivalPlace: 'Cleveland, OH',
      maidenRoots: ['Stout', 'Baird', 'Edison', 'Fulton', 'Carnegie', 'Diesel', 'Turner'],
    },
    firstNamesMale: ['Mark', 'Eric', 'Paul', 'Neil', 'Kurt', 'Carl', 'Hank', 'Gene'],
    firstNamesFemale: ['Lois', 'Joan', 'Rita', 'Vera', 'Emma', 'Rose', 'Alma'],
    surnames: ['Smith', 'Clark', 'Miller', 'Mason', 'Cooper', 'Wright', 'Bell', 'Bolt', 'Gear'],
    emailFormulaDesc: {
      ru: 'Инженерный утилитарный формат с цеховыми PIN-шифрами ({first}.{last}{pin3})',
      en: 'Industrial engineering format with anti-collision PIN shields ({first}.{last}{pin3})',
    },
    locations: [
      { city: 'Pittsburgh', stateCode: 'PA', stateName: 'Pennsylvania', zipRange: [15201, 15289] },
      { city: 'Cleveland', stateCode: 'OH', stateName: 'Ohio', zipRange: [44101, 44144] },
      { city: 'Chicago', stateCode: 'IL', stateName: 'Illinois', zipRange: [60601, 60661] },
      { city: 'Detroit', stateCode: 'MI', stateName: 'Michigan', zipRange: [48201, 48243] },
    ],
  },
  {
    id: 'celtic_diaspora',
    index: 4,
    name: {
      ru: 'Кельтский дух диаспоры',
      en: 'Celtic Highland Diaspora',
    },
    subtitle: {
      ru: 'Шотландские кланы и ирландские строители',
      en: 'Highland & Irish Diaspora Legacy',
    },
    historicalRoots: {
      ru: 'Ирландская волна после Великого голода 1845 г. и горские кланы Аппалачей. Шахтеры, портовые докеры, строители каналов, ставшие юристами, профсоюзными деятелями и сенаторами.',
      en: 'Irish wave following the 1845 Great Famine paired with Appalachian Scots-Irish mountain settlers. Dock workers and canal carters who founded civic dynasties.',
    },
    socialClass: 'merchants',
    era: 'frontier_1840',
    etymology: 'patronymic',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Горный мастер угольных пластов Аппалачей из горного клана Мак-Кензи',
        en: 'Deep-shaft coal master of the Allegheny ridges from Clan Mackenzie',
      },
      origin: 'Highlands & Inverness, Scotland',
      arrivalPlace: 'Boston & Scranton, PA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Семья свободных фермеров и портовых лоцманов графства Корк',
        en: 'Family of coastal pilots and trade merchants of County Cork',
      },
      origin: 'County Cork & Donegal, Ireland',
      arrivalPlace: 'New York Harbor, NY',
      maidenRoots: ['Flynn', 'Kelly', 'Walsh', 'Byrne', 'Doyle', 'Quinn', 'Murphy'],
    },
    firstNamesMale: ['Finn', 'Sean', 'Liam', 'Rhys', 'Kane', 'Cole', 'Roy', 'Troy', 'Ross'],
    firstNamesFemale: ['Erin', 'Tara', 'Nora', 'Mona', 'Faye', 'Bridget', 'Maeve'],
    surnames: ['Ross', 'Reid', 'Kerr', 'Knox', 'Boyd', 'Mack', 'Shaw', 'Cain', 'Lynch'],
    emailFormulaDesc: {
      ru: 'Экспрессивный короткий фамильный фокус с географическим кодом штата ({first}.{last}.us)',
      en: 'Punchy clan-focused handle backed by federal domain extension ({first}.{last}.us)',
    },
    locations: [
      { city: 'Brooklyn', stateCode: 'NY', stateName: 'New York', zipRange: [11201, 11256] },
      { city: 'South Boston', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2127, 2128] },
      { city: 'Scranton', stateCode: 'PA', stateName: 'Pennsylvania', zipRange: [18501, 18512] },
    ],
  },
  {
    id: 'southern_legacy',
    index: 5,
    name: {
      ru: 'Южная династия',
      en: 'Southern Legacy',
    },
    subtitle: {
      ru: 'Джентри Вирджинии и плантаторский кодекс чести',
      en: 'Virginia Gentry & Old Dominion Dynasties',
    },
    historicalRoots: {
      ru: 'Землевладельцы и плантаторы Вирджинии, Джорджии и Каролин (XVII–XVIII вв.). Южная джентри-аристократия со строгим кодексом чести, рыцарскими традициями и культом предков.',
      en: 'Old Dominion landowners and tidewater planters of Virginia and the Carolinas (17th–18th c.). Southern patrician gentry with chivalric ancestral lineage.',
    },
    socialClass: 'patrician',
    era: 'colonial_1620',
    etymology: 'descriptive',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Сенатор ассамблеи штата и кавалерийский офицер Вирджинского полка',
        en: 'Colonial assembly magistrate and Virginia cavalry officer',
      },
      origin: 'Kent, England',
      arrivalPlace: 'Jamestown & Richmond, VA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Старейший плантаторский род прибрежных угодий реки Саванна',
        en: 'Founding planter matriarchal dynasty along the Savannah River',
      },
      origin: 'Somerset, England',
      arrivalPlace: 'Charleston, SC',
      maidenRoots: ['Calhoun', 'Pemberton', 'Hampton', 'Fairfax', 'Preston', 'Rutherford'],
    },
    firstNamesMale: ['Lee', 'Wade', 'Cash', 'Ray', 'Tate', 'Duke', 'Clay', 'Beau'],
    firstNamesFemale: ['May', 'Belle', 'Clare', 'Dixie', 'Pearl', 'Joy', 'Nell'],
    surnames: ['Lee', 'Tate', 'Duke', 'Wade', 'Polk', 'Burke', 'Cobb', 'Byrd', 'Pence'],
    emailFormulaDesc: {
      ru: 'Традиционный южный стиль с двумя инициалами рода ({f_initial}{m_initial}.{last})',
      en: 'Historic double-initial gentility syntax ({f_initial}{m_initial}.{last})',
    },
    locations: [
      { city: 'Richmond', stateCode: 'VA', stateName: 'Virginia', zipRange: [23219, 23298] },
      { city: 'Charleston', stateCode: 'SC', stateName: 'South Carolina', zipRange: [29401, 29425] },
      { city: 'Savannah', stateCode: 'GA', stateName: 'Georgia', zipRange: [31401, 31419] },
    ],
  },
  {
    id: 'manhattan_vanguard',
    index: 6,
    name: {
      ru: 'Манхэттенский авангард',
      en: 'Empire State Modern',
    },
    subtitle: {
      ru: 'Уолл-стрит, Верхний Ист-Сайд и урбанизм',
      en: 'Wall Street Finance & Upper East Side Modern',
    },
    historicalRoots: {
      ru: 'Космополитичный урбанистический плавильный котел середины XX века, Манхэттен. Финансисты Wall Street, арт-дилеры, медиа-магнаты и архитекторы небоскребов.',
      en: 'Mid-century cosmopolitan financial capital, Manhattan. Wall Street financiers, museum curators, publishing magnates, and skyscraper architects.',
    },
    socialClass: 'patrician',
    era: 'modern_1980',
    etymology: 'descriptive',
    censureLength: 'short_3',
    paternalTemplate: {
      occupation: {
        ru: 'Старший управляющий партнер Нью-Йоркской фондовой биржи (NYSE)',
        en: 'Senior managing floor partner at the New York Stock Exchange',
      },
      origin: 'Lower Manhattan, NY',
      arrivalPlace: 'Manhattan, NY',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Шеф-редактор издательского дома и галерист Верхнего Ист-Сайда',
        en: 'Chief editor of architectural press and Upper East Side salonist',
      },
      origin: 'Rhinebeck, NY',
      arrivalPlace: 'New York, NY',
      maidenRoots: ['Astor', 'Morgan', 'Gould', 'Sloan', 'Rockefeller', 'Vanderbilt'],
    },
    firstNamesMale: ['Zack', 'Max', 'Alex', 'Dash', 'Seth', 'Fox', 'Wolf', 'Rex'],
    firstNamesFemale: ['Mia', 'Liv', 'Tess', 'Cleo', 'Zoe', 'Eve', 'Skye'],
    surnames: ['Gray', 'Fox', 'Wolf', 'Roth', 'Hart', 'Kahn', 'Vance', 'Cole', 'Blair'],
    emailFormulaDesc: {
      ru: 'Ультракороткий минималистичный стиль с городским индексом ({first}.{last}.nyc)',
      en: 'Ultra-condensed urban typography with Manhattan geo-code ({first}.{last}.nyc)',
    },
    locations: [
      { city: 'Manhattan', stateCode: 'NY', stateName: 'New York', zipRange: [10001, 10044] },
      { city: 'Brooklyn Heights', stateCode: 'NY', stateName: 'New York', zipRange: [11201, 11205] },
    ],
  },
  {
    id: 'puritan_covenant',
    index: 7,
    name: {
      ru: 'Пуританский завет',
      en: 'Biblical & Quaker Roots',
    },
    subtitle: {
      ru: 'Квакеры Пенсильвании и миротворцы Коннектикута',
      en: 'Quaker Commonwealth & Connecticut Puritans',
    },
    historicalRoots: {
      ru: 'Квакерские общины Уильяма Пенна (Пенсильвания) и пуританские конгрегации Коннектикута (1680–1740 гг.). Судьи, книгопечатники, миротворцы, торговцы льном и зерном.',
      en: 'William Penn’s Quaker Society of Friends and strict Connecticut covenant elders (1680–1740). Peacemakers, jurists, Biblical scholars, and grain millers.',
    },
    socialClass: 'scholars',
    era: 'colonial_1620',
    etymology: 'toponymic',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Квакерский старейшина и составитель первого свода колониальных законов мира',
        en: 'Quaker town elder and compiler of the Pennsylvania Charter of Privileges',
      },
      origin: 'Cheshire, England',
      arrivalPlace: 'Philadelphia, PA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Семья переписчиков священных книг и наставников классических языков',
        en: 'Lineage of sacred scripture scribes and Latin schoolmasters',
      },
      origin: 'Dorset, England',
      arrivalPlace: 'New Haven, CT',
      maidenRoots: ['Enoch', 'Gideon', 'Hiram', 'Silas', 'Amos', 'Jared', 'Caleb'],
    },
    firstNamesMale: ['Seth', 'Luke', 'John', 'Paul', 'Noah', 'Mark', 'Adam', 'Levi', 'Gabe'],
    firstNamesFemale: ['Ruth', 'Hope', 'Faith', 'Grace', 'Leah', 'Abby', 'Prue'],
    surnames: ['Cross', 'Good', 'Hope', 'Marsh', 'Penn', 'Bond', 'True', 'Pike', 'Wise'],
    emailFormulaDesc: {
      ru: 'Сдержанный непорочный формат без лишних спецсимволов ({first}.{last} или {first}.{m_initial}.{last})',
      en: 'Disciplined unembellished syntax ({first}.{last} or {first}.{m_initial}.{last})',
    },
    locations: [
      { city: 'Philadelphia', stateCode: 'PA', stateName: 'Pennsylvania', zipRange: [19102, 19147] },
      { city: 'New Haven', stateCode: 'CT', stateName: 'Connecticut', zipRange: [6510, 6520] },
    ],
  },
  {
    id: 'creole_bayou',
    index: 8,
    name: {
      ru: 'Креольский Залив',
      en: 'Bayou & Gulf Coast French',
    },
    subtitle: {
      ru: 'Французский квартал и речные лоцманы Миссисипи',
      en: 'French Quarter & Mississippi River Dynasties',
    },
    historicalRoots: {
      ru: 'Франко-испанские колонисты Луизианы, Нового Орлеана и акадийцы (каджуны), изгнанные из Канады в 1765 г. Плантаторы сахарного тростника, торговцы шёлком и пряностями, речные лоцманы Миссисипи.',
      en: 'Franco-Spanish aristocrats of New Orleans and Acadian settlers arriving in Louisiana in 1765. Sugar cane barons, silk traders, and Mississippi steamboat pilots.',
    },
    socialClass: 'merchants',
    era: 'frontier_1840',
    etymology: 'occupational',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Капитан королевского речного барка дельты реки Миссисипи',
        en: 'Grand steamboat pilot and maritime navigator of the Mississippi delta',
      },
      origin: 'Bordeaux, France',
      arrivalPlace: 'New Orleans, LA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Французская креольская династия шелковых торговых домов Французского квартала',
        en: 'French Quarter mercantile dynasty of spice importers and perfumers',
      },
      origin: 'Nantes, France',
      arrivalPlace: 'Vieux Carré, New Orleans, LA',
      maidenRoots: ['Lafitte', 'Beauregard', 'Duval', 'Mercier', 'Chauvin', 'Bienville'],
    },
    firstNamesMale: ['Leon', 'Rene', 'Marc', 'Dion', 'Beau', 'Remy', 'Guy', 'Yves'],
    firstNamesFemale: ['Faye', 'Ciel', 'Lise', 'Aimee', 'Elise', 'Colette'],
    surnames: ['Roux', 'Font', 'Dion', 'Roy', 'Blot', 'Vann', 'Benoit', 'Gaut'],
    emailFormulaDesc: {
      ru: 'Певучий стиль с мягкими гласными и дельта-кодом ({first}.{last}.no)',
      en: 'Euphonic French-root handle with New Orleans regional anchor ({first}.{last}.no)',
    },
    locations: [
      { city: 'New Orleans', stateCode: 'LA', stateName: 'Louisiana', zipRange: [70112, 70130] },
      { city: 'Baton Rouge', stateCode: 'LA', stateName: 'Louisiana', zipRange: [70801, 70821] },
      { city: 'Lafayette', stateCode: 'LA', stateName: 'Louisiana', zipRange: [70501, 70509] },
    ],
  },
  {
    id: 'silicon_vanguard',
    index: 9,
    name: {
      ru: 'Кремниевый Авангард',
      en: 'Silicon Vanguard / Modern Tech',
    },
    subtitle: {
      ru: 'Исследователи полупроводников Стэнфорда и ИИ',
      en: 'Semiconductor Pioneers of Stanford & Silicon Valley',
    },
    historicalRoots: {
      ru: 'Второе и третье поколение инженеров, исследователей микроэлектроники и ученых Стэнфорда и Беркли (1970–настоящее время). Основатели стартапов, венчурные партнеры и разработчики полупроводников.',
      en: 'Second and third generation semiconductor architects, Stanford labs researchers, and Silicon Valley venture founders (1970–present).',
    },
    socialClass: 'scholars',
    era: 'modern_1980',
    etymology: 'occupational',
    censureLength: 'short_3',
    paternalTemplate: {
      occupation: {
        ru: 'Архитектор интегральных микросхем кремниевых лабораторий Fairchild и HP',
        en: 'Pioneering microchip architect at Fairchild Semiconductor and HP Labs',
      },
      origin: 'Cambridge, MA',
      arrivalPlace: 'Palo Alto & Sunnyvale, CA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Профессор прикладной математики и кибернетики Стэнфордского университета',
        en: 'Chair of Applied Mathematics and Cybernetics at Stanford University',
      },
      origin: 'Zurich, Switzerland',
      arrivalPlace: 'San Francisco, CA',
      maidenRoots: ['Turing', 'Shannon', 'Knuth', 'Lovelace', 'Hopper', 'Wozniak'],
    },
    firstNamesMale: ['Kai', 'Ian', 'Roy', 'Leo', 'Nico', 'Jay', 'Max', 'Axel'],
    firstNamesFemale: ['Mia', 'Ava', 'Iris', 'Luna', 'Nova', 'Maya', 'Tara'],
    surnames: ['Roy', 'Chen', 'Page', 'Kern', 'Ness', 'Voss', 'Post', 'Gates', 'Moore'],
    emailFormulaDesc: {
      ru: 'Хэндлы в стиле GitHub, лаконичные алиасы с технологическим суффиксом ({first}.{last}.dev)',
      en: 'Clean developer-grade syntax with specialized engineering suffix ({first}.{last}.dev)',
    },
    locations: [
      { city: 'Palo Alto', stateCode: 'CA', stateName: 'California', zipRange: [94301, 94306] },
      { city: 'San Francisco', stateCode: 'CA', stateName: 'California', zipRange: [94102, 94158] },
      { city: 'San Jose', stateCode: 'CA', stateName: 'California', zipRange: [95110, 95134] },
      { city: 'Seattle', stateCode: 'WA', stateName: 'Washington', zipRange: [98101, 98199] },
    ],
  },
  {
    id: 'maritime_navigators',
    index: 10,
    name: {
      ru: 'Морские волки Новой Англии',
      en: 'Maritime Navigators',
    },
    subtitle: {
      ru: 'Китобои Нантакета и корабелы Сейлема',
      en: 'Nantucket Whalers & Salem Clipper Builders',
    },
    historicalRoots: {
      ru: 'Китобои острова Нантакет, капитаны клиперов Мэна и корабелы Сейлема (1750–1890 гг.). Морские капитаны дальнего плавания, смотрители маяков и мастера парусного флота.',
      en: 'Deep-ocean navigators of Nantucket, Maine clipper shipwrights, and Salem harbor masters (1750–1890). Cape Horn sea captains and oceanic cartographers.',
    },
    socialClass: 'artisans',
    era: 'frontier_1840',
    etymology: 'toponymic',
    censureLength: 'short_4',
    paternalTemplate: {
      occupation: {
        ru: 'Капитан трехмачтового океанского китобойного барка из Нантакета',
        en: 'Master commander of an oceanic three-masted whaling bark from Nantucket',
      },
      origin: 'Cornwall, England',
      arrivalPlace: 'Nantucket Island, MA',
    },
    maternalTemplate: {
      occupation: {
        ru: 'Семья штурманов дальнего плавания и гидрографов Портсмута',
        en: 'Dynasty of oceanic celestial navigators and naval hydrographers',
      },
      origin: 'Devon, England',
      arrivalPlace: 'Portland, ME',
      maidenRoots: ['Starbuck', 'Ahab', 'Melville', 'Coffin', 'Peleg', 'Macy', 'Bowditch'],
    },
    firstNamesMale: ['Cole', 'Wade', 'Hart', 'Finn', 'Hank', 'Sean', 'Dirk', 'Troy'],
    firstNamesFemale: ['Dawn', 'Cora', 'Isla', 'Mira', 'Bess', 'Pearl'],
    surnames: ['Hull', 'Hart', 'Gale', 'Hook', 'Bass', 'Reef', 'Mast', 'Ford', 'Storm'],
    emailFormulaDesc: {
      ru: 'Соленый морской колорит, краткость, надежность ({first}.{last}.sea или {first}.{m_initial}.{last})',
      en: 'Maritime oceanic moniker anchored with nautical extension ({first}.{last}.sea)',
    },
    locations: [
      { city: 'Portland', stateCode: 'ME', stateName: 'Maine', zipRange: [4101, 4112] },
      { city: 'Nantucket', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2554, 2584] },
      { city: 'Gloucester', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [1930, 1931] },
      { city: 'New Bedford', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2740, 2746] },
    ],
  },
];

export const SURNAME_ETYMOLOGY_MAP: Record<string, { ru: string; en: string }> = {
  Cole: {
    ru: 'Восходит к староанглийскому прозвищу Col («угольный, черноволосый») мастеров кузнечного и углежогного ремесла.',
    en: 'Derived from Old English "Col" (charcoal / dark-haired), originating with early iron smiths and charcoal masters.',
  },
  Gray: {
    ru: 'Топонимико-описательная фамилия нормандского происхождения (de Grai), традиционный знак рассудительности и старейшинства.',
    en: 'Descriptive Norman surname (de Grai), traditionally signifying sagacity, measured judgment, and elder status.',
  },
  Ford: {
    ru: 'Древнеанглийская топонимическая фамилия, обозначающая стража брода или поселение у ключевой речной переправы.',
    en: 'Old English topographical name designating a guardian or settlement situated at an essential river crossing.',
  },
  Shaw: {
    ru: 'Происходит от староанглийского Sceaga — «густая роща, лесной рубеж», родовое имя хранителей пограничных лесов.',
    en: 'Originates from Old English "Sceaga", meaning a sacred copse or thicket; hereditary guardians of forest borders.',
  },
  Ward: {
    ru: 'Профессиональная фамилия от англо-саксонского Weard («страж, хранитель ворот или замка»).',
    en: 'Occupational surname from Anglo-Saxon "Weard", meaning watchman, citadel warden, or civic protector.',
  },
  Hall: {
    ru: 'Топонимическое имя служителя или управляющего феодального поместья и зала дворянских собраний.',
    en: 'Toponymic name for an overseer or dignitary of the great manor hall and regional assembly.',
  },
  Reid: {
    ru: 'Кельтско-шотландское имя от "Ruadh" (огненно-рыжий, пламенный), корень кланов Росс и Хайленда.',
    en: 'Gaelic-Scots descriptor from "Ruadh" (red-haired, fiery-spirited), ancestral root of Highland clansmen.',
  },
  Pike: {
    ru: 'Древний морской и топонимический корень, означающий остроконечную вершину или пику стражи портовых бастионов.',
    en: 'Maritime and topographical name referencing a sharp coastal headland or the guard-pike of port citadels.',
  },
  Wood: {
    ru: 'Топонимическое имя хранителя священных равнинных и предгорных дубрав фронтира.',
    en: 'Topographic identifier for the ranger and pioneer steward of deep frontier woodlands.',
  },
  Clay: {
    ru: 'Древнее ремесленное имя гончаров и строителей глинобитных форпостов Орегонской тропы.',
    en: 'Ancestral craft name of earth-builders and pottery masters who founded early frontier trading stations.',
  },
  Stone: {
    ru: 'Скала, непреклонность, устойчивость; имя строителей каменных маяков и межевых знаков.',
    en: 'Signifying geological permanence; borne by builders of milestone monuments and boundary stone keepers.',
  },
  Hill: {
    ru: 'Топонимическое родовое имя дозорных возвышенностей и основателей фортов на холмах.',
    en: 'Topographical moniker for panoramic sentinels and founders of elevated ridge farmsteads.',
  },
  Camp: {
    ru: 'От латинского Campus через староанглийский — «поле битвы, стоянка каравана первопроходцев».',
    en: 'From Latin "Campus" through Old English, signifying the open field and pioneer caravan staging ground.',
  },
  West: {
    ru: 'Географический титул исследователей, направлявшихся на закат солнца к Тихоокеанскому рубежу.',
    en: 'Geographic titular moniker for explorers riding directly toward the Pacific horizon.',
  },
  Smith: {
    ru: 'Классическое гильдейское имя кователей орудий, мечей и паровых двигателей промышленного бума.',
    en: 'Archetypal guild designation for forgers of precision instruments and steam-age industrial apparatus.',
  },
  Clark: {
    ru: 'От латинского Clericus — ученый книжник, писец сводов законов, нотариус и летописец общины.',
    en: 'Derived from Latin "Clericus", honoring scholars, legal scribes, and recording notaries.',
  },
  Miller: {
    ru: 'Хлебный мастер, хранитель водяных и ветряных мельниц, краеугольный камень колониального поселения.',
    en: 'The grain master and vital miller whose waterwheels sustained early colonial townships.',
  },
  Mason: {
    ru: 'Цеховой мастер свободного каменного зодчества, создатель нерушимых акведуков и базилик.',
    en: 'Guild artisan of precision stonemasonry, builder of enduring civil aqueducts and municipal vaults.',
  },
  Cooper: {
    ru: 'Бочарный мастер гильдии, делавший герметичные морские бочки для рома, зерна и китового жира.',
    en: 'Guild cooper crafting watertight maritime barrels essential for transoceanic provisions.',
  },
  Wright: {
    ru: 'От староанглийского Wryhta — создатель, инженер, плотник колесных экипажей и клиперов.',
    en: 'From Old English "Wryhta" (creator/maker), denoting master builders of coaches and wooden vessels.',
  },
  Bell: {
    ru: 'Литейщик церковных колоколов и сигнальных корабельных рынд, возвещавших смену вахт.',
    en: 'Artisan bellfounder forging resonant cathedral chimes and maritime watch bells.',
  },
  Ross: {
    ru: 'Горский шотландский клан от кельтского Ros («скалистый мыс, выступающий в бурное море»).',
    en: 'Highland Scottish clan name rooted in Gaelic "Ros", denoting a bold promontory facing turbulent waters.',
  },
  Knox: {
    ru: 'От гэльского Cnoc («круглый холм»), родовое имя свободных шотландских реформаторов.',
    en: 'From Gaelic "Cnoc" (a round summit hill), iconic heritage of independent Scottish thinkers.',
  },
  Boyd: {
    ru: 'От гэльского Boidhe («светловолосый, благородный»), древний рыцарский клан Эйршира.',
    en: 'Derived from Gaelic "Boidhe" (fair-complexioned, noble), ancient equestrian clan of Ayrshire.',
  },
  Fox: {
    ru: 'Описательное имя, знаменующее проницательность, ловкость и дипломатический ум.',
    en: 'Descriptive moniker celebrated for acute perception, quick strategic wit, and urban acumen.',
  },
  Wolf: {
    ru: 'Древнегерманский корень верности стае, стойкости и непреклонного упорства первопроходцев.',
    en: 'Ancient Germanic root honoring unwavering pack loyalty, resilience, and unyielding focus.',
  },
  Hart: {
    ru: 'От староанглийского Heorot («благородный олень, вожак лесных просторов»).',
    en: 'From Old English "Heorot", referencing the noble stag, lord of wilderness preserves.',
  },
  Cross: {
    ru: 'Топографическое и духовное имя у перекрестка дорог или приходского каменного креста.',
    en: 'Topographic and sacred heritage of those dwelling near crossroads sanctuaries.',
  },
  Hope: {
    ru: 'Пуританская добродетель и географическое имя замкнутой долины-убежища в холмах.',
    en: 'Puritan virtue surname also describing a secluded hillside haven and sheltered valley.',
  },
  Bond: {
    ru: 'Свободный колониальный землевладелец, связанный обетом верности содружеству.',
    en: 'From Old Norse "Bondi", designating a freeholder bound by honor to civic commonwealth law.',
  },
  Roux: {
    ru: 'Французская фамилия каджунов, символ страсти, южного темперамента и стойкости.',
    en: 'French Cajun heritage symbolizing fervor, southern culinary prowess, and cultural resilience.',
  },
  Font: {
    ru: 'От латинского Fons — источник чистой речной воды, бьющий в тени кипарисовых рощ дельты.',
    en: 'Derived from Latin "Fons", honoring living fresh springs amidst the bayou cypress groves.',
  },
  Hull: {
    ru: 'Корпус клипера, верфи залива, прочность корабельного дуба в океанских штормах.',
    en: 'The very keel and hull of ocean clippers, signifying oak-hearted endurance in gale waters.',
  },
  Gale: {
    ru: 'Морской шквал, попутный бриз, надувающий паруса клипера на курсе вокруг мыса Горн.',
    en: 'A vigorous ocean wind; the surging gale that drove record-breaking clipper speeds around Cape Horn.',
  },
  Roy: {
    ru: 'От кельтского Ruadh (рыжий/королевский), а также французского Roi — благородное достоинство.',
    en: 'From Gaelic "Ruadh" and French "Roi", embodying innate royal bearing and intellectual leadership.',
  },
  Page: {
    ru: 'Исторический хранитель пергаментов, шифровальщик и архивариус патентных бюро.',
    en: 'Historic keeper of illuminated patents, cryptographer, and scientific archivist.',
  },
  Ness: {
    ru: 'Топонимический ориентир мыса, вдающегося в океан; форпост маяков и кабельных линий.',
    en: 'Coastal headland reaching into deep sea currents; terminal station for early transatlantic cables.',
  },
  Voss: {
    ru: 'Древнее имя отважных путешественников и инженеров точных приборов.',
    en: 'Ancestral name of intrepid explorers and creators of refined optical and silicon apparatus.',
  },
  Duke: {
    ru: 'От старофранцузского Duc (лат. Dux — вождь, предводитель). Историческое имя южной аристократии плантаторских династий Вирджинии и Каролин.',
    en: 'From Old French "Duc" (Latin "Dux" — commander, leader). Historic patrician name of Southern tidewater dynasties and landed gentry.',
  },
};
