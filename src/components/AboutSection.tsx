import React from 'react';
import { Target, Eye, Heart, Users, Award, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutSectionProps {
  currentLanguage: Language;
}

const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
}> = ({ children, className = '', animation = 'fadeIn' }) => {
  const [ref, setRef] = React.useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

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
      ref={setRef}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

const AboutSection: React.FC<AboutSectionProps> = ({ currentLanguage }) => {
  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  const stats = [
    { number: '1000+', label: currentLanguage === 'fr' ? 'Clients satisfaits' : currentLanguage === 'ar' ? 'عميل راضٍ' : 'Satisfied clients' },
    { number: '500+', label: currentLanguage === 'fr' ? 'Professionnels' : currentLanguage === 'ar' ? 'محترف' : 'Professionals' },
    { number: '24/7', label: currentLanguage === 'fr' ? 'Support client' : currentLanguage === 'ar' ? 'دعم العملاء' : 'Customer support' },
    { number: '48', label: currentLanguage === 'fr' ? 'Wilayas couvertes' : currentLanguage === 'ar' ? 'ولاية مغطاة' : 'Covered provinces' }
  ];

  const values = [
    {
      icon: <Target size={32} />,
      title: currentLanguage === 'fr' ? 'Excellence' : currentLanguage === 'ar' ? 'التميز' : 'Excellence',
      description: currentLanguage === 'fr' 
        ? 'Nous visons l\'excellence dans chaque service fourni'
        : currentLanguage === 'ar' 
        ? 'نسعى للتميز في كل خدمة نقدمها'
        : 'We strive for excellence in every service provided'
    },
    {
      icon: <Heart size={32} />,
      title: currentLanguage === 'fr' ? 'Confiance' : currentLanguage === 'ar' ? 'الثقة' : 'Trust',
      description: currentLanguage === 'fr' 
        ? 'La confiance de nos clients est notre priorité absolue'
        : currentLanguage === 'ar' 
        ? 'ثقة عملائنا هي أولويتنا المطلقة'
        : 'Our clients\' trust is our absolute priority'
    },
    {
      icon: <Users size={32} />,
      title: currentLanguage === 'fr' ? 'Proximité' : currentLanguage === 'ar' ? 'القرب' : 'Proximity',
      description: currentLanguage === 'fr' 
        ? 'Nous sommes proches de nos clients et comprenons leurs besoins'
        : currentLanguage === 'ar' 
        ? 'نحن قريبون من عملائنا ونفهم احتياجاتهم'
        : 'We are close to our clients and understand their needs'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#004080] mb-6">
            {t('aboutUs')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066cc] to-[#004080] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('aboutTitle')}
          </p>
        </AnimatedSection>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <AnimatedSection animation="slideLeft">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-[#004080] mb-4">
                {currentLanguage === 'fr' ? 'Notre Histoire' : currentLanguage === 'ar' ? 'قصتنا' : 'Our Story'}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('aboutDesc1')}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('aboutDesc2')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#0066cc] mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content - Image Placeholder */}
          <AnimatedSection animation="slideRight">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0066cc] to-[#004080] rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <Award size={32} className="mx-auto mb-2" />
                    <div className="text-sm">
                      {currentLanguage === 'fr' ? 'Certifié' : currentLanguage === 'ar' ? 'معتمد' : 'Certified'}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <Clock size={32} className="mx-auto mb-2" />
                    <div className="text-sm">
                      {currentLanguage === 'fr' ? 'Rapide' : currentLanguage === 'ar' ? 'سريع' : 'Fast'}
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4">
                  {currentLanguage === 'fr' ? 'Pourquoi MY HOUSE ?' : currentLanguage === 'ar' ? 'لماذا MY HOUSE؟' : 'Why MY HOUSE?'}
                </h4>
                <ul className="space-y-2 text-blue-100">
                  <li>✓ {currentLanguage === 'fr' ? 'Professionnels vérifiés' : currentLanguage === 'ar' ? 'محترفون معتمدون' : 'Verified professionals'}</li>
                  <li>✓ {currentLanguage === 'fr' ? 'Service 24/7' : currentLanguage === 'ar' ? 'خدمة 24/7' : '24/7 Service'}</li>
                  <li>✓ {currentLanguage === 'fr' ? 'Prix transparents' : currentLanguage === 'ar' ? 'أسعار شفافة' : 'Transparent pricing'}</li>
                  <li>✓ {currentLanguage === 'fr' ? 'Garantie qualité' : currentLanguage === 'ar' ? 'ضمان الجودة' : 'Quality guarantee'}</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimatedSection animation="slideUp">
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-[#0066cc] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#004080] mb-4">{t('ourMission')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {currentLanguage === 'fr' 
                  ? 'Simplifier la vie de nos clients en leur offrant des services à domicile de qualité, accessibles et fiables.'
                  : currentLanguage === 'ar' 
                  ? 'تبسيط حياة عملائنا من خلال تقديم خدمات منزلية عالية الجودة ومتاحة وموثوقة.'
                  : 'Simplify our clients\' lives by offering quality, accessible and reliable home services.'
                }
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp">
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-[#0066cc] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#004080] mb-4">{t('ourVision')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {currentLanguage === 'fr' 
                  ? 'Devenir la référence des services à domicile en Algérie et révolutionner l\'expérience client.'
                  : currentLanguage === 'ar' 
                  ? 'أن نصبح المرجع في الخدمات المنزلية في الجزائر وأن نحدث ثورة في تجربة العملاء.'
                  : 'Become the reference for home services in Algeria and revolutionize the customer experience.'
                }
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp">
            <div className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-[#0066cc] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#004080] mb-4">{t('ourValues')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {currentLanguage === 'fr' 
                  ? 'Excellence, confiance, proximité et innovation guident chacune de nos actions au quotidien.'
                  : currentLanguage === 'ar' 
                  ? 'التميز والثقة والقرب والابتكار توجه كل أعمالنا اليومية.'
                  : 'Excellence, trust, proximity and innovation guide each of our daily actions.'
                }
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Values Grid */}
        <AnimatedSection>
          <h3 className="text-3xl font-bold text-[#004080] text-center mb-12">
            {currentLanguage === 'fr' ? 'Nos Valeurs Fondamentales' : currentLanguage === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} animation="slideUp">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-[#0066cc] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#004080] mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;