import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { SymptomAnalysisResult } from '../types';
import AppointmentForm from '../components/appointment/AppointmentForm';
import { getSpecialtyById } from '../data/mockData';

const AppointmentBookingPage: React.FC = () => {
  const { specialtyId } = useParams<{ specialtyId?: string }>();
  const location = useLocation();
  const [analysisResults, setAnalysisResults] = useState<SymptomAnalysisResult | undefined>(
    location.state?.analysisResults
  );
  const [specialtyName, setSpecialtyName] = useState<string>('');
  
  // Get specialty name if specialtyId is provided
  useEffect(() => {
    if (specialtyId) {
      const specialty = getSpecialtyById(specialtyId);
      if (specialty) {
        setSpecialtyName(specialty.name);
      }
    }
  }, [specialtyId]);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center">
          <Calendar className="h-8 w-8 text-primary-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Book Your Appointment</h1>
        </div>
        
        {(specialtyName || analysisResults?.recommendedSpecialty.name) && (
          <p className="text-xl text-primary-600 mt-2">
            {specialtyName || analysisResults?.recommendedSpecialty.name} Specialist
          </p>
        )}
        
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {analysisResults ? (
            `Based on your symptoms, we recommend booking with a ${analysisResults.recommendedSpecialty.name}.`
          ) : (
            `Select your preferred doctor and appointment time.`
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <AppointmentForm 
            specialtyId={specialtyId} 
            analysisResults={analysisResults}
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Why Choose MediAid?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold mr-2">✓</span>
                Easy online booking
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold mr-2">✓</span>
                AI-powered specialist matching
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold mr-2">✓</span>
                Pre-shared symptom analysis with your doctor
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold mr-2">✓</span>
                Appointment reminders
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you need assistance with booking your appointment or have any questions, please contact our support team.
            </p>
            <div className="flex items-center justify-center">
              <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;