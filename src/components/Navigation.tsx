import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface NavigationProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
  user?: { name: string };
}

const Navigation: React.FC<NavigationProps> = ({
  currentLanguage,
  onLanguageChange,
  onAuthClick,
  isAuthenticated,
  user
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇩🇿' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#0066cc] text-white px-3 py-1 rounded-lg font-bold text-lg">
              MY HOUSE
            </div>
            <span className="text-[#004080] font-medium hidden sm:block">Algerian House</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#004080] hover:text-[#0066cc] transition-colors font-medium"
            >
              {t('home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-[#004080] hover:text-[#0066cc] transition-colors font-medium"
            >
              {t('services')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-[#004080] hover:text-[#0066cc] transition-colors font-medium"
            >
              {t('about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#004080] hover:text-[#0066cc] transition-colors font-medium"
            >
              {t('contact')}
            </button>
          </div>

          {/* Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 text-[#004080] hover:text-[#0066cc] transition-colors"
              >
                <Globe size={20} />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                        currentLanguage === lang.code ? 'bg-blue-50 text-[#0066cc]' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Button */}
            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-[#004080] transition-colors"
            >
              <User size={18} />
              <span>
                {isAuthenticated ? user?.name || 'Profile' : t('login')}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#004080] hover:text-[#0066cc] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-[#004080] hover:text-[#0066cc] transition-colors"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-4 py-2 text-[#004080] hover:text-[#0066cc] transition-colors"
              >
                {t('services')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-[#004080] hover:text-[#0066cc] transition-colors"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-[#004080] hover:text-[#0066cc] transition-colors"
              >
                {t('contact')}
              </button>
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe size={18} className="text-[#004080]" />
                  <span className="text-sm font-medium text-[#004080]">Language</span>
                </div>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        currentLanguage === lang.code
                          ? 'bg-[#0066cc] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Auth Button */}
              <div className="px-4 py-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#0066cc] text-white px-4 py-2 rounded-lg hover:bg-[#004080] transition-colors flex items-center justify-center space-x-2"
                >
                  <User size={18} />
                  <span>
                    {isAuthenticated ? user?.name || 'Profile' : t('login')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close language dropdown when clicking outside */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;