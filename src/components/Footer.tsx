import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-white transition">{t('about')}</a>
          <a href="#" className="hover:text-white transition">{t('contact')}</a>
          <a href="#" className="hover:text-white transition">{t('privacy')}</a>
          <a href="#" className="hover:text-white transition">{t('terms')}</a>
        </div>
        <p className="text-sm text-gray-400">© 2025 elingohub.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}
