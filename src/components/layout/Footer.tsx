import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">MediAid</h3>
            <p className="text-gray-600 mb-4">
              AI-powered symptom analysis and appointment booking for small medical clinics.
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <Heart size={16} className="text-error-500 mr-1" /> Made for better healthcare access
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/symptom-checker" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2 text-gray-400" />
                (555) 123-4567
              </li>
              <li className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2 text-gray-400" />
                contact@ayurmedai@gmail.com
              </li>
              <li className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2 text-gray-400" />
                Dhrumil Pipaliya
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MediAid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;