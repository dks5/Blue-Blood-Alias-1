import { PRESETS_DATA, SURNAME_ETYMOLOGY_MAP } from '../data/presetsData';
import { synthesizeAntiCollisionEmails } from './emailAntiCollision';
import {
  EraId,
  EtymologyOrigin,
  Language,
  MiddleNameTradition,
  NameLengthCensure,
  PersonaProfile,
  SocialClassId,
} from '../types';

export interface CustomForgeParams {
  era: EraId;
  socialClass: SocialClassId;
  etymology: EtymologyOrigin;
  censureLength: NameLengthCensure;
  middleTradition: MiddleNameTradition;
  gender: 'male' | 'female';
  age?: number;
}

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 10 Distinct Male Collegiate Student Avatars (18-30 y.o.)
export const AVATARS_MALE: string[] = [
  '/src/assets/images/avatar_young_male_1790602415442.jpg',
  '/src/assets/images/avatar_alt_young_male_1790603730427.jpg',
  '/src/assets/images/avatar_male_3_1790604519998.jpg',
  '/src/assets/images/avatar_male_4_1790604537417.jpg',
  '/src/assets/images/avatar_male_clean_5_1790606816003.jpg',
  '/src/assets/images/avatar_male_6_1790604565340.jpg',
  '/src/assets/images/avatar_male_7_1790604578546.jpg',
  '/src/assets/images/avatar_male_8_1790604592056.jpg',
  '/src/assets/images/avatar_young_male_9_1790605875989.jpg',
  '/src/assets/images/avatar_male_clean_10_1790606828286.jpg',
];

// 10 Distinct Female Collegiate Student Avatars (18-30 y.o.)
export const AVATARS_FEMALE: string[] = [
  '/src/assets/images/avatar_young_female_1790602430222.jpg',
  '/src/assets/images/avatar_alt_young_female_1790603743328.jpg',
  '/src/assets/images/avatar_fem_3_1790604608235.jpg',
  '/src/assets/images/avatar_fem_4_1790604621962.jpg',
  '/src/assets/images/avatar_fem_5_1790604633447.jpg',
  '/src/assets/images/avatar_fem_6_1790604647141.jpg',
  '/src/assets/images/avatar_fem_clean_7_1790606787393.jpg',
  '/src/assets/images/avatar_fem_8_1790604674786.jpg',
  '/src/assets/images/avatar_young_female_9_1790605906484.jpg',
  '/src/assets/images/avatar_fem_clean_10_1790606802921.jpg',
];

export function resolveAvatarUrl(gender: 'male' | 'female', age: number, seed?: string): string {
  const pool = gender === 'male' ? AVATARS_MALE : AVATARS_FEMALE;
  if (!seed) {
    return pool[0];
  }
  const hash = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

export function getNextAvatarUrl(currentUrl: string | undefined, gender: 'male' | 'female'): string {
  const pool = gender === 'male' ? AVATARS_MALE : AVATARS_FEMALE;
  if (!currentUrl) return pool[0];
  const currentIndex = pool.indexOf(currentUrl);
  if (currentIndex === -1) return pool[0];
  const nextIndex = (currentIndex + 1) % pool.length;
  return pool[nextIndex];
}

const STREET_NAMES = [
  'Commonwealth Ave', 'Beacon St', 'Newbury St', 'Tremont St', 'Harvard St',
  'Chestnut St', 'Walnut St', 'Market St', 'Pine St', 'Oak St',
  'King St', 'Broad St', 'Church St', 'Meeting St', 'Peachtree St',
  'Bleecker St', 'Madison Ave', 'Lexington Ave', 'Riverside Dr', 'Hudson St',
  'Pecan St', 'Congress Ave', 'Brazos St', 'Colorado St', 'University Way',
  'Elm St', 'Maple St', 'Highland Ave', 'Grand Ave', 'Lincoln Way'
];

function generateRealisticUSStreetAddress(): string {
  const streetNumber = randomInt(10, 899);
  const streetName = sample(STREET_NAMES);
  const hasApt = randomInt(1, 10) > 4;
  if (hasApt) {
    const aptNumber = randomInt(2, 48);
    return `${streetNumber} ${streetName}, Apt ${aptNumber}`;
  }
  return `${streetNumber} ${streetName}`;
}

const FIRST_NAMES_MALE_3 = ['Roy', 'Dan', 'Ben', 'Leo', 'Fox', 'Jay', 'Rex', 'Max', 'Guy', 'Ian', 'Kai', 'Ray', 'Lee', 'Sam', 'Ned'];
const FIRST_NAMES_MALE_4 = ['Jack', 'Todd', 'Dean', 'Kent', 'Ward', 'Hugh', 'Paul', 'Luke', 'Clay', 'Ross', 'Wade', 'Mark', 'Eric', 'Carl', 'Finn', 'Sean', 'Tate', 'Duke', 'Seth', 'Noah', 'Marc', 'Axel', 'Hart', 'Cole'];
const FIRST_NAMES_MALE_5 = ['Clark', 'Stone', 'Blair', 'Vance', 'Grant', 'Brock', 'Chase', 'Drake', 'Quinn', 'Heath', 'Pierce', 'Wayne', 'Wyatt'];

const FIRST_NAMES_FEMALE_3 = ['Mae', 'Joy', 'Faye', 'Eve', 'Liv', 'Mia', 'Zoe', 'Ava', 'Bea', 'Kay', 'Gail', 'Iris', 'Ruth', 'Hope'];
const FIRST_NAMES_FEMALE_4 = ['Anne', 'Jane', 'Kate', 'June', 'Fern', 'Opal', 'Wren', 'Jean', 'Lois', 'Joan', 'Rita', 'Vera', 'Emma', 'Rose', 'Alma', 'Erin', 'Tara', 'Nora', 'Mona', 'Mary', 'Dawn', 'Cora', 'Mira', 'Bess'];
const FIRST_NAMES_FEMALE_5 = ['Grace', 'Faith', 'Clare', 'Belle', 'Pearl', 'Elise', 'Chloe', 'Hazel', 'Edith', 'Adele', 'Alice', 'Flora'];

const SURNAMES_3 = ['Fox', 'Roy', 'Lee', 'Ray', 'Day', 'May', 'Pox', 'Way'];
const SURNAMES_4 = ['Cole', 'Gray', 'Ford', 'Shaw', 'Ward', 'Hall', 'Reid', 'Pike', 'Wood', 'Clay', 'Bell', 'Ross', 'Knox', 'Boyd', 'Tate', 'Duke', 'Penn', 'Bond', 'True', 'Roux', 'Font', 'Page', 'Ness', 'Voss', 'Hull', 'Hart', 'Gale', 'Reef', 'Mast', 'Bass'];
const SURNAMES_5 = ['Smith', 'Clark', 'Stone', 'Cross', 'Gates', 'Moore', 'Benoit', 'Storm', 'Travis', 'Boone', 'Doyle', 'Kelly', 'Walsh', 'Quinn'];

const MAIDEN_ROOTS = [
  'Cabot', 'Forbes', 'Lowell', 'Otis', 'Quincy', 'Alden', 'Bradford',
  'Boone', 'Carson', 'Travis', 'Austin', 'Dallas', 'Edison', 'Fulton',
  'Carnegie', 'Flynn', 'Kelly', 'Walsh', 'Byrne', 'Murphy', 'Fairfax',
  'Preston', 'Astor', 'Morgan', 'Gould', 'Rockefeller', 'Vanderbilt',
  'Silas', 'Amos', 'Caleb', 'Duval', 'Mercier', 'Lovelace', 'Hopper',
  'Turing', 'Starbuck', 'Bowditch', 'Macy'
];

export function generateFromPreset(
  presetId: string,
  options?: { gender?: 'male' | 'female'; censure?: NameLengthCensure; age?: number }
): PersonaProfile {
  const preset = PRESETS_DATA.find((p) => p.id === presetId) || PRESETS_DATA[0];
  const gender = options?.gender || (Math.random() > 0.5 ? 'male' : 'female');
  const censure = options?.censure || preset.censureLength;

  let poolFirst = gender === 'male' ? preset.firstNamesMale : preset.firstNamesFemale;
  if (censure === 'short_3') {
    poolFirst = poolFirst.filter((n) => n.length <= 3);
    if (poolFirst.length === 0) poolFirst = gender === 'male' ? FIRST_NAMES_MALE_3 : FIRST_NAMES_FEMALE_3;
  } else if (censure === 'short_4') {
    poolFirst = poolFirst.filter((n) => n.length === 4);
    if (poolFirst.length === 0) poolFirst = gender === 'male' ? FIRST_NAMES_MALE_4 : FIRST_NAMES_FEMALE_4;
  }

  let poolSurnames = preset.surnames;
  if (censure === 'short_3') {
    const filtered = poolSurnames.filter((s) => s.length <= 3);
    if (filtered.length > 0) poolSurnames = filtered;
  } else if (censure === 'short_4') {
    const filtered = poolSurnames.filter((s) => s.length === 4);
    if (filtered.length > 0) poolSurnames = filtered;
  }

  const firstName = sample(poolFirst);
  const lastName = sample(poolSurnames);
  const middleName = sample(preset.maternalTemplate.maidenRoots);
  const middleInitial = middleName.charAt(0);
  const fullName = `${firstName} ${middleName} ${lastName}`;

  // Residence & Full US Postal Address
  const location = sample(preset.locations);
  const zipCode = String(randomInt(location.zipRange[0], location.zipRange[1])).padStart(5, '0');
  const streetAddress = generateRealisticUSStreetAddress();
  const fullAddress = `${streetAddress}, ${location.city}, ${location.stateCode} ${zipCode}, USA`;

  // Collegiate Age (18-30 y.o.) & Birthdate
  const currentYear = 2026;
  const age = options?.age ?? randomInt(18, 25);
  const birthYear = currentYear - age;
  const birthMonth = randomInt(1, 12);
  const birthDay = randomInt(1, 28);
  const birthDate = `${String(birthMonth).padStart(2, '0')}/${String(birthDay).padStart(2, '0')}/${birthYear}`;
  const avatarUrl = resolveAvatarUrl(gender, age, firstName + lastName + Date.now());

  // Ancestor profiles calculation
  const paternalBirthYear = birthYear - randomInt(50, 68);
  const maternalBirthYear = birthYear - randomInt(48, 65);

  const paternalGrandfatherName = `${sample(['Arthur', 'William', 'Edward', 'Henry', 'Charles', 'James', 'George', 'Thomas'])} ${lastName}`;
  const maternalGrandfatherName = `${sample(['Franklin', 'Robert', 'Alexander', 'Joseph', 'Samuel', 'Walter', 'Julian'])} ${middleName}`;

  const paternalContribution = {
    ru: `Передал прямую отцовскую фамилию ${lastName.toUpperCase()}, заложив статус рода в колонии/штате.`,
    en: `Bequeathed the patrilineal surname ${lastName.toUpperCase()}, anchoring the family legacy.`,
  };

  const maternalContribution = {
    ru: `Передала девичью фамилию рода ${middleName.toUpperCase()} как статусное среднее имя (Middle Name) и второй инициал (${middleInitial}.).`,
    en: `Transmitted maiden pedigree ${middleName.toUpperCase()} as prestigious middle name and initial (${middleInitial}.).`,
  };

  const tree = {
    paternalGrandfather: {
      fullName: paternalGrandfatherName,
      birthYear: paternalBirthYear,
      originHomeland: preset.paternalTemplate.origin,
      usArrivalPlace: preset.paternalTemplate.arrivalPlace,
      historicOccupation: preset.paternalTemplate.occupation.en,
      heritageContribution: paternalContribution,
    },
    maternalGrandfather: {
      fullName: maternalGrandfatherName,
      birthYear: maternalBirthYear,
      originHomeland: preset.maternalTemplate.origin,
      usArrivalPlace: preset.maternalTemplate.arrivalPlace,
      historicOccupation: preset.maternalTemplate.occupation.en,
      heritageContribution: maternalContribution,
    },
    originEraTitle: {
      ru: preset.name.ru + ' • ' + preset.subtitle.ru,
      en: preset.name.en + ' • ' + preset.subtitle.en,
    },
    migrationPath: {
      ru: `${preset.paternalTemplate.origin} ➔ ${preset.paternalTemplate.arrivalPlace} ➔ ${location.city}, ${location.stateCode}`,
      en: `${preset.paternalTemplate.origin} ➔ ${preset.paternalTemplate.arrivalPlace} ➔ ${location.city}, ${location.stateCode}`,
    },
  };

  // Narrative bio
  const etymologyInfo = SURNAME_ETYMOLOGY_MAP[lastName] || {
    ru: `Историческая фамилия ${lastName} восходит к древним англо-американским корням, символизируя преемственность поколений и высокий общественный статус.`,
    en: `The ancestral surname ${lastName} derives from historic Anglo-American roots, signifying generational pedigree and civic distinction.`,
  };

  const headline = {
    ru: `Наследие рода ${lastName} и династии ${middleName}`,
    en: `Legacy of the ${lastName} Lineage & ${middleName} Dynasty`,
  };

  const bioSummary = {
    ru: `Прямой потомок ${paternalGrandfatherName}, мастера и основателя отцовской ветви рода. Фамилия ${lastName} несет в себе глубокий исторический след. Девичья фамилия матери ${middleName} закрепила за ${firstName} право на патрицианский инициал и кристально чистую почту Google Gmail.`,
    en: `Direct descendant of ${paternalGrandfatherName}. The surname ${lastName} carries generational distinction, backed by maternal heritage ${middleName} and clean Google Gmail alias.`,
  };

  // Anti collision Google Gmail emails
  const emails = synthesizeAntiCollisionEmails({
    firstName,
    lastName,
    middleName,
    middleInitial,
    city: location.city,
    stateCode: location.stateCode,
    presetId: preset.id,
    birthYear,
  });

  return {
    id: `persona_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    gender,
    firstName,
    lastName,
    middleName,
    middleInitial,
    fullName,
    birthDate,
    birthYear,
    age,
    avatarUrl,
    censureLength: censure,
    residence: {
      streetAddress,
      city: location.city,
      stateCode: location.stateCode,
      stateName: location.stateName,
      zipCode,
      fullAddress,
    },
    pedigree: {
      presetId: preset.id,
      presetName: preset.name,
      era: preset.era,
      socialClass: preset.socialClass,
      etymology: preset.etymology,
      tree,
    },
    narrativeStory: {
      headline,
      bioSummary,
      surnameEtymologyExplanation: etymologyInfo,
    },
    emails,
    createdAt: Date.now(),
  };
}

export function generateFromCustomForge(params: CustomForgeParams): PersonaProfile {
  const gender = params.gender;

  let poolFirst = gender === 'male' ? FIRST_NAMES_MALE_4 : FIRST_NAMES_FEMALE_4;
  if (params.censureLength === 'short_3') {
    poolFirst = gender === 'male' ? FIRST_NAMES_MALE_3 : FIRST_NAMES_FEMALE_3;
  } else if (params.censureLength === 'medium_5') {
    poolFirst = gender === 'male' ? FIRST_NAMES_MALE_5 : FIRST_NAMES_FEMALE_5;
  }

  let poolSurnames = SURNAMES_4;
  if (params.censureLength === 'short_3') poolSurnames = SURNAMES_3;
  else if (params.censureLength === 'medium_5') poolSurnames = SURNAMES_5;

  const firstName = sample(poolFirst);
  const lastName = sample(poolSurnames);

  // Middle name based on tradition
  let middleName = sample(MAIDEN_ROOTS);
  if (params.middleTradition === 'biblical_patron') {
    middleName = sample(['Gideon', 'Enoch', 'Hiram', 'Silas', 'Amos', 'Jared', 'Caleb', 'Lucas', 'Nathan']);
  } else if (params.middleTradition === 'state_geocode') {
    middleName = sample(['York', 'Penn', 'Virginia', 'Carolina', 'Austin', 'Dakota', 'Nevada']);
  } else if (params.middleTradition === 'single_initial') {
    middleName = sample(['Lee', 'Ray', 'Jay', 'Kay', 'Dee', 'Van']);
  }

  const middleInitial = middleName.charAt(0);
  const fullName = `${firstName} ${middleName} ${lastName}`;

  // Location based on era and class
  const locationPool = [
    { city: 'Boston', stateCode: 'MA', stateName: 'Massachusetts', zipRange: [2108, 2215] },
    { city: 'Philadelphia', stateCode: 'PA', stateName: 'Pennsylvania', zipRange: [19102, 19147] },
    { city: 'Austin', stateCode: 'TX', stateName: 'Texas', zipRange: [78701, 78759] },
    { city: 'Richmond', stateCode: 'VA', stateName: 'Virginia', zipRange: [23219, 23298] },
    { city: 'New York', stateCode: 'NY', stateName: 'New York', zipRange: [10001, 10044] },
    { city: 'Chicago', stateCode: 'IL', stateName: 'Illinois', zipRange: [60601, 60661] },
    { city: 'Charleston', stateCode: 'SC', stateName: 'South Carolina', zipRange: [29401, 29425] },
  ];
  const location = sample(locationPool);
  const zipCode = String(randomInt(location.zipRange[0], location.zipRange[1])).padStart(5, '0');
  const streetAddress = generateRealisticUSStreetAddress();
  const fullAddress = `${streetAddress}, ${location.city}, ${location.stateCode} ${zipCode}, USA`;

  // Age & Birthdate (18-30 y.o.)
  const currentYear = 2026;
  const age = params.age ?? randomInt(18, 25);
  const birthYear = currentYear - age;
  const birthMonth = randomInt(1, 12);
  const birthDay = randomInt(1, 28);
  const birthDate = `${String(birthMonth).padStart(2, '0')}/${String(birthDay).padStart(2, '0')}/${birthYear}`;
  const avatarUrl = resolveAvatarUrl(gender, age, firstName + lastName + Date.now());

  const paternalGrandfatherName = `${sample(['Arthur', 'Edward', 'James', 'Thomas', 'Harrison', 'Franklin'])} ${lastName}`;
  const maternalGrandfatherName = `${sample(['Sterling', 'Everett', 'Montgomery', 'Winston', 'Lawrence'])} ${middleName}`;

  const tree = {
    paternalGrandfather: {
      fullName: paternalGrandfatherName,
      birthYear: birthYear - randomInt(52, 65),
      originHomeland: 'Kent & Sussex, England',
      usArrivalPlace: `${location.city}, ${location.stateCode}`,
      historicOccupation: 'Guild Master and colonial commissioner',
      heritageContribution: {
        ru: `Передал прямую отцовскую фамилию ${lastName.toUpperCase()}.`,
        en: `Transmitted patrilineal surname ${lastName.toUpperCase()}.`,
      },
    },
    maternalGrandfather: {
      fullName: maternalGrandfatherName,
      birthYear: birthYear - randomInt(49, 62),
      originHomeland: 'Hampshire, England',
      usArrivalPlace: `${location.city}, ${location.stateCode}`,
      historicOccupation: 'Merchant guild master and maritime surveyor',
      heritageContribution: {
        ru: `Передал девичью фамилию ${middleName.toUpperCase()} как второй инициал.`,
        en: `Transmitted maiden surname ${middleName.toUpperCase()} as second initial.`,
      },
    },
    originEraTitle: {
      ru: `Индивидуальная Кузница • ${params.era}`,
      en: `Custom Forge Lineage • ${params.era}`,
    },
    migrationPath: {
      ru: `England ➔ ${location.city}, ${location.stateCode}`,
      en: `England ➔ ${location.city}, ${location.stateCode}`,
    },
  };

  const etymologyInfo = SURNAME_ETYMOLOGY_MAP[lastName] || {
    ru: `Фамилия ${lastName} объединяет в себе признаки англо-американского благородного происхождения.`,
    en: `The surname ${lastName} represents refined Anglo-American lineage roots.`,
  };

  const headline = {
    ru: `Синтезированное наследие рода ${lastName}`,
    en: `Synthesized Heritage of Lineage ${lastName}`,
  };

  const bioSummary = {
    ru: `Представитель рода ${lastName}, родившийся в городе ${location.city}. Девичья фамилия матери ${middleName} обеспечивает уникальный статус для всех регистрационных данных и почты Google.`,
    en: `Descendant of lineage ${lastName}, native of ${location.city}. Maternal heritage ${middleName} anchors registration uniqueness and clean Google Gmail alias.`,
  };

  const emails = synthesizeAntiCollisionEmails({
    firstName,
    lastName,
    middleName,
    middleInitial,
    city: location.city,
    stateCode: location.stateCode,
    birthYear,
  });

  return {
    id: `persona_custom_${Date.now()}`,
    gender,
    firstName,
    lastName,
    middleName,
    middleInitial,
    fullName,
    birthDate,
    birthYear,
    age,
    avatarUrl,
    censureLength: params.censureLength,
    residence: {
      streetAddress,
      city: location.city,
      stateCode: location.stateCode,
      stateName: location.stateName,
      zipCode,
      fullAddress,
    },
    pedigree: {
      era: params.era,
      socialClass: params.socialClass,
      etymology: params.etymology,
      tree,
    },
    narrativeStory: {
      headline,
      bioSummary,
      surnameEtymologyExplanation: etymologyInfo,
    },
    emails,
    createdAt: Date.now(),
  };
}

export function generateMarkCarolinaDuke(customAge: number = 18): PersonaProfile {
  const firstName = 'Mark';
  const middleName = 'Carolina';
  const middleInitial = 'C';
  const lastName = 'Duke';
  const fullName = 'Mark Carolina Duke';
  const age = customAge;
  const currentYear = 2026;
  const birthYear = currentYear - age;
  const birthDate = `05/14/${birthYear}`;
  const avatarUrl = AVATARS_MALE[0];

  const streetAddress = '42 Meeting St, Apt 4B';
  const city = 'Charleston';
  const stateCode = 'SC';
  const stateName = 'South Carolina';
  const zipCode = '29401';
  const fullAddress = `${streetAddress}, ${city}, ${stateCode} ${zipCode}, USA`;

  const paternalGrandfather = {
    fullName: 'Harrison Duke',
    birthYear: 1932,
    originHomeland: 'Kent, England',
    usArrivalPlace: 'Richmond & Tidewater, VA',
    historicOccupation: 'Colonial assembly magistrate and Virginia cavalry officer',
    heritageContribution: {
      ru: 'Передал прямую отцовскую фамилию DUKE, заложив статус южной плантаторской династии.',
      en: 'Bequeathed the patrilineal surname DUKE, anchoring the Virginia planter dynasty.',
    },
  };

  const maternalGrandfather = {
    fullName: 'Sterling Carolina',
    birthYear: 1936,
    originHomeland: 'Charleston, SC',
    usArrivalPlace: 'Charleston & Savannah River, SC',
    historicOccupation: 'Founding planter matriarchal dynasty along the Savannah River',
    heritageContribution: {
      ru: 'Передал девичью фамилию матери CAROLINA и статус второго инициала (C.).',
      en: 'Transmitted maternal maiden surname CAROLINA as official middle initial (C.).',
    },
  };

  const tree = {
    paternalGrandfather,
    maternalGrandfather,
    originEraTitle: {
      ru: 'Южная династия • Джентри Вирджинии и плантаторский кодекс чести',
      en: 'Southern Legacy • Virginia Gentry & Old Dominion Dynasties',
    },
    migrationPath: {
      ru: 'Kent, England ➔ Jamestown & Richmond, VA ➔ Charleston, SC',
      en: 'Kent, England ➔ Jamestown & Richmond, VA ➔ Charleston, SC',
    },
  };

  const etymologyInfo = SURNAME_ETYMOLOGY_MAP['Duke'] || {
    ru: 'От старофранцузского Duc (лат. Dux — вождь, предводитель). Историческое имя южной аристократии плантаторских династий Вирджинии и Каролин.',
    en: 'From Old French "Duc" (Latin "Dux" — commander, leader). Historic patrician name of Southern tidewater dynasties and landed gentry.',
  };

  const headline = {
    ru: 'Наследие рода Duke и династии Carolina',
    en: 'Legacy of the Duke Lineage & Carolina Dynasty',
  };

  const bioSummary = {
    ru: 'Прямой потомок Харрисона Дьюка, представителя вирджинской знати. Фамилия Duke восходит к титулярному корню предводителей (Duc / Dux). Девичья фамилия матери Carolina обеспечивает идеальный региональный акцент для почты Google Gmail.',
    en: 'Direct descendant of Harrison Duke. The surname Duke traces back to ancient titular roots of leadership (Duc / Dux). The maternal maiden surname Carolina provides regional anchor for collision-free Google Gmail.',
  };

  const emails = synthesizeAntiCollisionEmails({
    firstName,
    lastName,
    middleName,
    middleInitial,
    city,
    stateCode,
    presetId: 'southern_legacy',
    birthYear,
  });

  return {
    id: 'persona_mark_carolina_duke',
    gender: 'male',
    firstName,
    lastName,
    middleName,
    middleInitial,
    fullName,
    birthDate,
    birthYear,
    age,
    avatarUrl,
    censureLength: 'short_4',
    residence: {
      streetAddress,
      city,
      stateCode,
      stateName,
      zipCode,
      fullAddress,
    },
    pedigree: {
      presetId: 'southern_legacy',
      presetName: {
        ru: 'Южная династия',
        en: 'Southern Legacy',
      },
      era: 'colonial_1620',
      socialClass: 'patrician',
      etymology: 'descriptive',
      tree,
    },
    narrativeStory: {
      headline,
      bioSummary,
      surnameEtymologyExplanation: etymologyInfo,
    },
    emails,
    createdAt: Date.now(),
  };
}
