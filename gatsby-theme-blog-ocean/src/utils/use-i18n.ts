import { useI18next } from 'gatsby-plugin-react-i18next';

export default function useI18n(...args) {
  const i18next = useI18next(...args);
  const {
    language: currentLang,
    defaultLanguage,
    generateDefaultLanguagePage,
  } = i18next;

  function getLanguagePath(language: string) {
    const lang = language || currentLang;
    return (generateDefaultLanguagePage || lang !== defaultLanguage)
      ? `/${lang}`
      : '';
  }

  function getLink(to: string, language?: string) {
    return `${getLanguagePath(language)}${to}`;
  }

  return {
    getLanguagePath,
    getLink,
    ...i18next
  }
}
