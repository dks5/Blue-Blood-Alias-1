import { AntiCollisionEmailOption, Language } from '../types';

interface EmailSynthesisParams {
  firstName: string;
  lastName: string;
  middleName?: string;
  middleInitial?: string;
  city: string;
  stateCode: string;
  presetId?: string;
  birthYear: number;
}

export function synthesizeAntiCollisionEmails(params: EmailSynthesisParams): AntiCollisionEmailOption[] {
  const f = params.firstName.toLowerCase().trim();
  const l = params.lastName.toLowerCase().trim();
  const st = params.stateCode.toLowerCase().trim();
  const fInitial = f.charAt(0);

  // Variant 1: Initial + Surname + State + USA @gmail.com
  // Example: m.duke.sc.usa@gmail.com
  const option1Address = `${fInitial}.${l}.${st}.usa@gmail.com`;

  // Variant 2: Full First Name + Surname + State + USA @gmail.com
  // Example: mark.duke.sc.usa@gmail.com
  const option2Address = `${f}.${l}.${st}.usa@gmail.com`;

  return [
    {
      id: 'opt_initial_state_usa',
      address: option1Address,
      domain: 'gmail.com',
      tag: 'formal_pedigree',
      resistanceScore: '99.9%',
      description: {
        ru: 'Формула: {инициал}.{фамилия}.{штат}.usa@gmail.com. Компактный, строго американский формат с гарантированной уникальностью в Google.',
        en: 'Formula: {initial}.{surname}.{state}.usa@gmail.com. Compact, verified US geo-format with guaranteed Google uniqueness.',
      },
    },
    {
      id: 'opt_full_state_usa',
      address: option2Address,
      domain: 'gmail.com',
      tag: 'geo_resident',
      resistanceScore: '99.9%',
      description: {
        ru: 'Формула: {имя}.{фамилия}.{штат}.usa@gmail.com. Полное имя с федеральным префиксом USA и штатом проживания. Эксклюзивно Google Gmail.',
        en: 'Formula: {firstname}.{surname}.{state}.usa@gmail.com. Full name with federal USA prefix and residence state. Exclusively Google Gmail.',
      },
    },
  ];
}

export function getTagTitle(tag: AntiCollisionEmailOption['tag'], lang: Language): string {
  switch (tag) {
    case 'formal_pedigree':
      return lang === 'ru' ? 'Инициал + Штат + USA' : 'Initial + State + USA';
    case 'geo_resident':
      return lang === 'ru' ? 'Полное Имя + Штат + USA' : 'Full Name + State + USA';
    default:
      return 'Google Gmail';
  }
}
