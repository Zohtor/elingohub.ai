import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'et' | 'fr' | 'sv' | 'da' | 'no' | 'lt' | 'de' | 'es' | 'it';

const translations: Record<Language, Record<string, string>> = {
  en: { appName: 'SpeakEstonia.ai', tagline: 'Learn Any Language With AI', subtitle: 'From pronunciation to conversation — your AI tutor helps you every step', freeEntry: 'Free Entry', aiPremiumPlan: 'AI Premium Plan', login: 'Login', createAccount: 'Create Account', myProfile: 'My Profile', logout: 'Logout', discoverEstonia: 'Discover Estonia', interactiveMap: 'Interactive map with real-time facility status', about: 'About', contact: 'Contact', privacy: 'Privacy', terms: 'Terms' },
  et: { appName: 'SpeakEstonia.ai', tagline: 'Õpi eesti keelt AI-ga', subtitle: 'Hääldusest vestluseni — sinu AI õpetaja aitab sind', freeEntry: 'Tasuta', aiPremiumPlan: 'AI Premium', login: 'Logi sisse', createAccount: 'Loo konto', myProfile: 'Profiil', logout: 'Logi välja', discoverEstonia: 'Avasta Eestit', interactiveMap: 'Interaktiivne kaart', about: 'Meist', contact: 'Kontakt', privacy: 'Privaatsus', terms: 'Tingimused' },
  fr: { appName: 'SpeakEstonia.ai', tagline: 'Apprendre l\'estonien avec l\'IA', subtitle: 'De la prononciation à la conversation', freeEntry: 'Gratuit', aiPremiumPlan: 'Premium IA', login: 'Connexion', createAccount: 'Créer', myProfile: 'Profil', logout: 'Déconnexion', discoverEstonia: 'Découvrez l\'Estonie', interactiveMap: 'Carte interactive', about: 'À propos', contact: 'Contact', privacy: 'Confidentialité', terms: 'Conditions' },
  sv: { appName: 'SpeakEstonia.ai', tagline: 'Lär dig estniska med AI', subtitle: 'Från uttal till konversation', freeEntry: 'Gratis', aiPremiumPlan: 'AI Premium', login: 'Logga in', createAccount: 'Skapa', myProfile: 'Profil', logout: 'Logga ut', discoverEstonia: 'Upptäck Estland', interactiveMap: 'Interaktiv karta', about: 'Om', contact: 'Kontakt', privacy: 'Integritet', terms: 'Villkor' },
  da: { appName: 'SpeakEstonia.ai', tagline: 'Lær estisk med AI', subtitle: 'Fra udtale til samtale', freeEntry: 'Gratis', aiPremiumPlan: 'AI Premium', login: 'Log ind', createAccount: 'Opret', myProfile: 'Profil', logout: 'Log ud', discoverEstonia: 'Opdag Estland', interactiveMap: 'Interaktivt kort', about: 'Om', contact: 'Kontakt', privacy: 'Privatliv', terms: 'Vilkår' },
  no: { appName: 'SpeakEstonia.ai', tagline: 'Lær estisk med AI', subtitle: 'Fra uttale til samtale', freeEntry: 'Gratis', aiPremiumPlan: 'AI Premium', login: 'Logg inn', createAccount: 'Opprett', myProfile: 'Profil', logout: 'Logg ut', discoverEstonia: 'Oppdag Estland', interactiveMap: 'Interaktivt kart', about: 'Om', contact: 'Kontakt', privacy: 'Personvern', terms: 'Vilkår' },
  lt: { appName: 'SpeakEstonia.ai', tagline: 'Mokykitės estų su AI', subtitle: 'Nuo tarimo iki pokalbio', freeEntry: 'Nemokamai', aiPremiumPlan: 'AI Premium', login: 'Prisijungti', createAccount: 'Sukurti', myProfile: 'Profilis', logout: 'Atsijungti', discoverEstonia: 'Atraskite Estiją', interactiveMap: 'Interaktyvus žemėlapis', about: 'Apie', contact: 'Kontaktai', privacy: 'Privatumas', terms: 'Sąlygos' },
  de: { appName: 'SpeakEstonia.ai', tagline: 'Estnisch lernen mit KI', subtitle: 'Von Aussprache bis Konversation', freeEntry: 'Kostenlos', aiPremiumPlan: 'AI Premium', login: 'Anmelden', createAccount: 'Erstellen', myProfile: 'Profil', logout: 'Abmelden', discoverEstonia: 'Estland entdecken', interactiveMap: 'Interaktive Karte', about: 'Über', contact: 'Kontakt', privacy: 'Datenschutz', terms: 'Bedingungen' },
  es: { appName: 'SpeakEstonia.ai', tagline: 'Aprende estonio con IA', subtitle: 'De la pronunciación a la conversación', freeEntry: 'Gratis', aiPremiumPlan: 'Premium IA', login: 'Iniciar', createAccount: 'Crear', myProfile: 'Perfil', logout: 'Salir', discoverEstonia: 'Descubre Estonia', interactiveMap: 'Mapa interactivo', about: 'Acerca', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos' },
  it: { appName: 'SpeakEstonia.ai', tagline: 'Impara l\'estone con l\'IA', subtitle: 'Dalla pronuncia alla conversazione', freeEntry: 'Gratis', aiPremiumPlan: 'Premium IA', login: 'Accedi', createAccount: 'Crea', myProfile: 'Profilo', logout: 'Esci', discoverEstonia: 'Scopri l\'Estonia', interactiveMap: 'Mappa interattiva', about: 'Chi siamo', contact: 'Contatti', privacy: 'Privacy', terms: 'Termini' },
};

const LanguageContext = createContext<any>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: string) => translations[language][key] || key;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const languageOptions = [
  { code: 'en' as Language, name: 'English', flag: 'gb' },
  { code: 'et' as Language, name: 'Estonian', flag: 'ee' },
  { code: 'fr' as Language, name: 'French', flag: 'fr' },
  { code: 'sv' as Language, name: 'Swedish', flag: 'se' },
  { code: 'da' as Language, name: 'Danish', flag: 'dk' },
  { code: 'no' as Language, name: 'Norwegian', flag: 'no' },
  { code: 'lt' as Language, name: 'Lithuanian', flag: 'lt' },
  { code: 'de' as Language, name: 'German', flag: 'de' },
  { code: 'es' as Language, name: 'Spanish', flag: 'es' },
  { code: 'it' as Language, name: 'Italian', flag: 'it' },
];
