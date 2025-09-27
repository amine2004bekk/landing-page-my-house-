export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
}

export type Language = 'fr' | 'ar' | 'en';

export interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
    en: string;
  };
}