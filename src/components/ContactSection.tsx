import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface ContactSectionProps {
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

const ContactSection: React.FC<ContactSectionProps> = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const t = (key: string) => translations[key]?.[currentLanguage] || key;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(currentLanguage === 'fr' ? 'Message envoyé avec succès!' : currentLanguage === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!');
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: t('phone'),
      value: '+213 XX XXX XXX',
      link: 'tel:+213XXXXXXX'
    },
    {
      icon: <Mail size={24} />,
      title: t('email'),
      value: 'contact@myhouse-dz.com',
      link: 'mailto:contact@myhouse-dz.com'
    },
    {
      icon: <MapPin size={24} />,
      title: t('address'),
      value: currentLanguage === 'fr' ? 'Alger, Algérie' : currentLanguage === 'ar' ? 'الجزائر، الجزائر' : 'Algiers, Algeria',
      link: '#'
    }
  ];

  const workingHours = [
    {
      day: t('mondayFriday'),
      hours: '8:00 - 18:00'
    },
    {
      day: t('saturday'),
      hours: '9:00 - 16:00'
    },
    {
      day: t('sunday'),
      hours: currentLanguage === 'fr' ? 'Fermé' : currentLanguage === 'ar' ? 'مغلق' : 'Closed'
    }
  ];

  const services = [
    { value: 'plumbing', label: t('plumbing') },
    { value: 'electricity', label: t('electricity') },
    { value: 'cleaning', label: t('cleaning') },
    { value: 'repairs', label: t('repairs') }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#004080] mb-6">
            {t('contactUs')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066cc] to-[#004080] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <AnimatedSection animation="slideLeft">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#004080] mb-6 flex items-center">
                <MessageCircle className="mr-3 text-[#0066cc]" />
                {t('getInTouch')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fullName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                      placeholder={currentLanguage === 'fr' ? 'Votre nom complet' : currentLanguage === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                      placeholder={currentLanguage === 'fr' ? 'votre@email.com' : currentLanguage === 'ar' ? 'your@email.com' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                      placeholder="+213 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('services')}
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all"
                    >
                      <option value="">
                        {currentLanguage === 'fr' ? 'Sélectionnez un service' : currentLanguage === 'ar' ? 'اختر خدمة' : 'Select a service'}
                      </option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentLanguage === 'fr' ? 'Message' : currentLanguage === 'ar' ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066cc] focus:border-transparent transition-all resize-none"
                    placeholder={currentLanguage === 'fr' ? 'Décrivez votre besoin...' : currentLanguage === 'ar' ? 'صف احتياجك...' : 'Describe your need...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0066cc] to-[#004080] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#004080] hover:to-[#0066cc] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>
                    {currentLanguage === 'fr' ? 'Envoyer le message' : currentLanguage === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                  </span>
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Info & Map */}
          <AnimatedSection animation="slideRight">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#004080] mb-6">
                  {currentLanguage === 'fr' ? 'Informations de contact' : currentLanguage === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="text-[#0066cc] group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-[#004080]">{info.title}</div>
                        <div className="text-gray-600">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Working Hours */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold text-[#004080] mb-4 flex items-center">
                    <Clock className="mr-2 text-[#0066cc]" size={20} />
                    {t('workingHours')}
                  </h4>
                  <div className="space-y-2">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{schedule.day}</span>
                        <span className="font-medium text-[#004080]">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#004080] mb-6 flex items-center">
                  <MapPin className="mr-3 text-[#0066cc]" />
                  {t('ourLocation')}
                </h3>
                
                {/* Google Maps Embed */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.7379679999997!2d3.0587!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad05b017fc9f%3A0x40edc4d37b8d7f4!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-gray-600 text-sm">
                    {currentLanguage === 'fr' 
                      ? 'Cliquez sur la carte pour ouvrir dans Google Maps'
                      : currentLanguage === 'ar' 
                      ? 'انقر على الخريطة لفتحها في خرائط جوجل'
                      : 'Click on the map to open in Google Maps'
                    }
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;