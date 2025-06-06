
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'pt-BR' | 'en-GB';

type LanguageContextType = {
  language: Language;
  t: (key: string, fallback?: string) => string; // Added fallback parameter for t function
  changeLanguage: (lang: Language) => void;
};

/**
 * Context for managing internationalization (i18n) state and functions.
 * @type {React.Context<LanguageContextType | undefined>}
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Provides language state and translation functions to its children components.
 * It manages the current language and provides a function `t` for translating keys.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the language context.
 * @returns {JSX.Element} The LanguageProvider component.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  /**
   * @state {Language} language - The currently selected language ('pt-BR' or 'en-GB').
   */
  const [language, setLanguage] = useState<Language>('pt-BR');

  /**
   * Changes the current application language.
   * @param {Language} lang - The language to switch to ('pt-BR' or 'en-GB').
   */
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    console.log(`Language changed to: ${lang}`); // For debugging
  };

  /**
   * Translates a given key into the current language.
   * If a translation is not found for the key, it returns the key itself or a provided fallback string.
   * @param {string} key - The translation key (e.g., 'heroTitle').
   * @param {string} [fallback] - An optional fallback string to return if the key is not found.
   * @returns {string} The translated string, the fallback string, or the key itself.
   */
  const t = (key: string, fallback?: string): string => {
    const translation = translations[language] as Record<string, string>;
    return translation[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to access the LanguageContext.
 * Provides access to the current language, translation function `t`, and `changeLanguage` function.
 * @throws {Error} If used outside of a `LanguageProvider`.
 * @returns {LanguageContextType} The language context value.
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
