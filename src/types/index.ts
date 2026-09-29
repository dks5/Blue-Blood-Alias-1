export type Language = 'ru' | 'en';

export type EraId = 
  | 'colonial_1620' 
  | 'frontier_1840' 
  | 'industrial_1910' 
  | 'modern_1980';

export type SocialClassId = 
  | 'patrician' 
  | 'scholars' 
  | 'merchants' 
  | 'artisans' 
  | 'agrarian';

export type EtymologyOrigin = 
  | 'toponymic' 
  | 'occupational' 
  | 'patronymic' 
  | 'descriptive';

export type NameLengthCensure = 
  | 'short_3' 
  | 'short_4' 
  | 'medium_5';

export type MiddleNameTradition = 
  | 'maternal_maiden' 
  | 'biblical_patron' 
  | 'state_geocode' 
  | 'single_initial';

export interface AncestorProfile {
  fullName: string;
  birthYear: number;
  originHomeland: string;
  usArrivalPlace: string;
  historicOccupation: string;
  heritageContribution: {
    ru: string;
    en: string;
  };
}

export interface PedigreeTimelineTree {
  paternalGrandfather: AncestorProfile;
  maternalGrandfather: AncestorProfile;
  originEraTitle: Record<Language, string>;
  migrationPath: Record<Language, string>;
}

export interface AntiCollisionEmailOption {
  id: string;
  address: string;
  domain: 'gmail.com' | 'outlook.com' | 'icloud.com';
  tag: 'formal_pedigree' | 'maternal_link' | 'geo_resident' | 'pin_protected';
  description: Record<Language, string>;
  resistanceScore: string; // "99.4%"
}

export interface PersonaProfile {
  id: string;
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  middleName: string;
  middleInitial: string;
  fullName: string;
  birthDate: string; // MM/DD/YYYY
  birthYear: number;
  age: number;
  avatarUrl?: string;
  censureLength: NameLengthCensure;
  residence: {
    streetAddress: string;
    city: string;
    stateCode: string;
    stateName: string;
    zipCode: string;
    fullAddress: string;
  };
  pedigree: {
    presetId?: string;
    presetName?: Record<Language, string>;
    era: EraId;
    socialClass: SocialClassId;
    etymology: EtymologyOrigin;
    tree: PedigreeTimelineTree;
  };
  narrativeStory: {
    headline: Record<Language, string>;
    bioSummary: Record<Language, string>;
    surnameEtymologyExplanation: Record<Language, string>;
  };
  emails: AntiCollisionEmailOption[];
  createdAt: number;
}

export interface PresetDefinition {
  id: string;
  index: number;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  historicalRoots: Record<Language, string>;
  socialClass: SocialClassId;
  era: EraId;
  etymology: EtymologyOrigin;
  censureLength: NameLengthCensure;
  paternalTemplate: {
    occupation: Record<Language, string>;
    origin: string;
    arrivalPlace: string;
  };
  maternalTemplate: {
    occupation: Record<Language, string>;
    origin: string;
    arrivalPlace: string;
    maidenRoots: string[];
  };
  firstNamesMale: string[];
  firstNamesFemale: string[];
  surnames: string[];
  emailFormulaDesc: Record<Language, string>;
  locations: Array<{ city: string; stateCode: string; stateName: string; zipRange: [number, number] }>;
}

export type ActiveTab = 'start' | 'dossier' | 'presets' | 'forge' | 'concept' | 'vault';
