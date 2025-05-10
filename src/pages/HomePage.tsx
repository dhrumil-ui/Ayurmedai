import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Calendar, HeartPulse, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-600 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Healthcare Assistance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            MediAid helps you understand your symptoms and connects you with the right specialists, faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Link
                to={currentUser.role === 'patient' ? '/symptom-checker' : '/doctor-dashboard'}
                className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {currentUser.role === 'patient' ? 'Check Symptoms Now' : 'View Dashboard'}
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign Up Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How MediAid Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Describe Symptoms</h3>
              <p className="text-gray-600">
                Tell us your symptoms in your own words, just like you would tell your doctor.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartPulse className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your symptoms and suggests possible conditions with confidence scores.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Specialist Matching</h3>
              <p className="text-gray-600">
                Get matched with the right type of specialist based on your symptoms and condition.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Book Appointment</h3>
              <p className="text-gray-600">
                Easily schedule an appointment with the recommended specialist at a convenient time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Check your symptoms now and get connected with the right healthcare professionals.
          </p>
          
          {currentUser ? (
            <Link
              to={currentUser.role === 'patient' ? '/symptom-checker' : '/doctor-dashboard'}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {currentUser.role === 'patient' ? 'Check Your Symptoms' : 'View Your Dashboard'}
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;