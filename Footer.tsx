import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-800 text-lime-50 pt-16 pb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        .font-urdu {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* About/Brand Section */}
          <div>
            <h3 
              className="text-xl font-semibold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Farm Fresh
              <span className="block mt-0.5 text-lg font-normal font-urdu" lang="ur" dir="rtl">
                فارم فریش
              </span>
            </h3>
            <div className="text-lime-200 text-sm leading-relaxed space-y-1">
              <p>
                Your direct source for the freshest, locally-sourced produce from the heart of Pakistan. Quality and community, delivered.
              </p>
              <p className="font-urdu text-right" lang="ur" dir="rtl">
                پاکستان کے دل سے تازہ ترین، مقامی طور پر حاصل شدہ پیداوار کا آپ کا براہ راست ذریعہ۔ معیار اور کمیونٹی، ڈیلیور کی گئی۔
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
              <span className="block mt-0.5 font-normal font-urdu text-base" lang="ur" dir="rtl">
                فوری لنکس
              </span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-lime-200 hover:text-amber-400 transition-colors">About Us <span className="font-urdu text-xs" lang="ur" dir="rtl">(ہمارے بارے میں)</span></Link></li>
              <li><Link to="/faq" className="text-lime-200 hover:text-amber-400 transition-colors">FAQs <span className="font-urdu text-xs" lang="ur" dir="rtl">(اکثر پوچھے گئے سوالات)</span></Link></li>
              <li><Link to="/shipping" className="text-lime-200 hover:text-amber-400 transition-colors">Shipping & Returns <span className="font-urdu text-xs" lang="ur" dir="rtl">(شپنگ اور واپسی)</span></Link></li>
              <li><Link to="/privacy" className="text-lime-200 hover:text-amber-400 transition-colors">Privacy Policy <span className="font-urdu text-xs" lang="ur" dir="rtl">(رازداری کی پالیسی)</span></Link></li>
              <li><Link to="/terms" className="text-lime-200 hover:text-amber-400 transition-colors">Terms of Service <span className="font-urdu text-xs" lang="ur" dir="rtl">(سروس کی شرائط)</span></Link></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
              <span className="block mt-0.5 font-normal font-urdu text-base" lang="ur" dir="rtl">
                ہم سے رابطہ کریں
              </span>
            </h4>
            <ul className="space-y-3 text-sm text-lime-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 mt-0.5 text-amber-400 shrink-0" />
                <div>
                  <span>Farm Fresh Main Office<br />123 Agri Avenue, Model Town<br />Lahore, Punjab 54000, Pakistan</span>
                  <span className="block font-urdu text-xs text-right mt-0.5" lang="ur" dir="rtl">فارم فریش مرکزی دفتر<br />123 ایگری ایونیو، ماڈل ٹاؤن<br />لاہور، پنجاب 54000، پاکستان</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                <a href="mailto:info@farmfresh.pk" className="hover:text-amber-400 transition-colors">info@farmfresh.pk</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-amber-400 transition-colors">+92 300 1234567</a>
              </li>
            </ul>
          </div>
          
          {/* Social Media Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Follow Us
              <span className="block mt-0.5 font-normal font-urdu text-base" lang="ur" dir="rtl">
                ہمیں فالو کریں
              </span>
            </h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-lime-200 hover:text-amber-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-lime-200 hover:text-amber-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="text-lime-200 hover:text-amber-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-green-700 pt-8 mt-2 text-center">
          <p className="text-sm text-lime-200">
            &copy; {currentYear} Farm Fresh. All rights reserved.
            <span className="block mt-1 font-urdu text-xs" lang="ur" dir="rtl">
              &copy; {currentYear} فارم فریش۔ جملہ حقوق محفوظ ہیں.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
