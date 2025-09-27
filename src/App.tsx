import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Zap, 
  Sparkles, 
  Settings, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { Language, User } from './types';
import { translations } from './utils/translations';

// Animation hook for scroll-based animations
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting] as const;
};

// Animation component
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
}> = ({ children, className = '', animation = 'fadeIn' }) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  const getAnimationClass = () => {
    if (!isIntersecting) {
      switch (animation) {
        case 'slideUp': return 'translate-y-10 opacity-0';
        case 'slideLeft': return '-translate-x-10 opacity-0';
        case 'slideRight': return 'translate-x-10 opacity-0';
        default: return 'opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// Service Card Component
const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
    <div className="text-[#0066cc] mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#004080] mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
    <div className="text-[#0066cc] bg-blue-50 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-[#004080] text-lg">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Testimonial Component
const TestimonialCard: React.FC<{
  name: string;
  service: string;
  rating: number;
  comment: string;
}> = ({ name, service, rating, comment }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg mx-4 min-h-[250px]">
    <div className="flex items-center space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <p className="text-gray-600 mb-4 italic">"{comment}"</p>
    <div className="border-t pt-4">
      <p className="font-semibold text-[#004080]">{name}</p>
      <p className="text-sm text-gray-500">{service}</p>
    </div>
  </div>
);

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const testimonials = [
    {
      name: "Sarah Benali",
      service: t('plumbing'),
      rating: 5,
      comment: currentLanguage === 'fr' 
        ? "Service rapide et professionnel. Le plombier est arrivé en moins de 2h et a résolu mon problème efficacement."
        : currentLanguage === 'ar'
        ? "خدمة سريعة ومهنية. وصل السباك في أقل من ساعتين وحل مشكلتي بكفاءة."
        : "Fast and professional service. The plumber arrived in less than 2 hours and solved my problem efficiently."
    },
    {
      name: "Ahmed Khelifi",
      service: t('electricity'),
      rating: 5,
      comment: currentLanguage === 'fr'
        ? "Excellent travail ! L'électricien était très compétent et a expliqué chaque étape. Je recommande vivement."
        : currentLanguage === 'ar'
        ? "عمل ممتاز! كان الكهربائي مؤهلاً جداً وشرح كل خطوة. أنصح بشدة."
        : "Excellent work! The electrician was very competent and explained each step. I highly recommend."
    },
    {
      name: "Fatima Zerhouni",
      service: t('cleaning'),
      rating: 5,
      comment: currentLanguage === 'fr'
        ? "Personnel de ménage très professionnel et minutieux. Ma maison était impeccable après leur passage."
        : currentLanguage === 'ar'
        ? "موظفو التنظيف محترفون ودقيقون جداً. كان منزلي نظيفاً تماماً بعد زيارتهم."
        : "Very professional and meticulous cleaning staff. My house was spotless after their visit."
    },
    {
      name: "Karim Djelloul",
      service: t('repairs'),
      rating: 4,
      comment: currentLanguage === 'fr'
        ? "Bon service dans l'ensemble. Réparation effectuée rapidement et prix raisonnable."
        : currentLanguage === 'ar'
        ? "خدمة جيدة بشكل عام. تم الإصلاح بسرعة وبسعر معقول."
        : "Good service overall. Repair done quickly and reasonable price."
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - replace with actual authentication
    setUser({
      id: '1',
      email,
      name: email.split('@')[0]
    });
    setIsAuthModalOpen(false);
  };

  const handleRegister = (email: string, password: string, name: string, phone: string) => {
    // Mock registration - replace with actual authentication
    setUser({
      id: '1',
      email,
      name,
      phone
    });
    setIsAuthModalOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onAuthClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={!!user}
        user={user || undefined}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLanguage={currentLanguage}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0066cc] via-[#004080] to-[#0066cc] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          {/* Logo Placeholder - Replace with your actual logo */}
          <AnimatedSection className="mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
              <h1 className="text-4xl font-bold text-white">MY HOUSE</h1>
              <p className="text-xl text-blue-100">Algerian House</p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('heroTitle')}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="slideUp">
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slideUp">
            <button className="bg-white text-[#0066cc] px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('bookService')}
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#004080] mb-4">{t('ourServices')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection animation="slideUp">
              <ServiceCard
                icon={<Wrench size={48} />}
                title={t('plumbing')}
                description={t('plumbingDesc')}
              />
            </AnimatedSection>

            <AnimatedSection animation="slideUp">
              <ServiceCard
                icon={<Zap size={48} />}
                title={t('electricity')}
                description={t('electricityDesc')}
              />
            </AnimatedSection>

            <AnimatedSection animation="slideUp">
              <ServiceCard
                icon={<Sparkles size={48} />}
                title={t('cleaning')}
                description={t('cleaningDesc')}
              />
            </AnimatedSection>

            <AnimatedSection animation="slideUp">
              <ServiceCard
                icon={<Settings size={48} />}
                title={t('repairs')}
                description={t('repairsDesc')}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#004080] mb-4">{t('whyChooseUs')}</h2>
            <p className="text-xl text-gray-600">
              {t('whyChooseSubtitle')}
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="slideLeft">
              <FeatureCard
                icon={<Clock size={32} />}
                title={t('fast')}
                description={t('fastDesc')}
              />
            </AnimatedSection>

            <AnimatedSection animation="slideUp">
              <FeatureCard
                icon={<CheckCircle size={32} />}
                title={t('reliable')}
                description={t('reliableDesc')}
              />
            </AnimatedSection>

            <AnimatedSection animation="slideRight">
              <FeatureCard
                icon={<DollarSign size={32} />}
                title={t('affordable')}
                description={t('affordableDesc')}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection currentLanguage={currentLanguage} />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#004080] mb-4">{t('testimonials')}</h2>
            <p className="text-xl text-gray-600">
              {t('testimonialsSubtitle')}
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-[#0066cc]"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-[#0066cc]"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#0066cc]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection currentLanguage={currentLanguage} />

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#0066cc] to-[#004080]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('needService')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <button className="bg-white text-[#0066cc] px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              {t('contactNow')}
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#004080] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">MY HOUSE</h3>
                <p className="text-blue-200">Algerian House</p>
              </div>
              <p className="text-blue-100 leading-relaxed">
                {t('footerDesc')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-blue-100">
                <li><button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t('services')}</button></li>
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t('about')}</button></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t('contact')}</button></li>
                <li><button onClick={() => setCurrentTestimonial(0)} className="hover:text-white transition-colors">{t('testimonials')}</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">{t('contact')}</h4>
              <div className="space-y-2 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+213 XX XXX XXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>contact@myhouse-dz.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{currentLanguage === 'fr' ? 'Alger, Algérie' : currentLanguage === 'ar' ? 'الجزائر، الجزائر' : 'Algiers, Algeria'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 mb-4 md:mb-0">
              © 2024 MY HOUSE - Algerian House. {t('allRightsReserved')}.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover:scale-110 transform duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;