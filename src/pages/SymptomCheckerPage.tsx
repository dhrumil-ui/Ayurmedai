import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { SymptomAnalysisResult } from '../types';
import { useAppointments } from '../contexts/AppointmentsContext';
import SymptomInput from '../components/symptom-checker/SymptomInput';
import AnalysisResults from '../components/symptom-checker/AnalysisResults';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SymptomCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzePatientSymptoms, isLoading } = useAppointments();
  
  const [analysisState, setAnalysisState] = useState<'input' | 'analyzing' | 'results'>('input');
  const [analysisResults, setAnalysisResults] = useState<SymptomAnalysisResult | null>(null);
  
  const handleAnalyzeSymptoms = async (symptomsText: string) => {
    setAnalysisState('analyzing');
    
    try {
      const results = await analyzePatientSymptoms(symptomsText);
      setAnalysisResults(results);
      setAnalysisState('results');
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setAnalysisState('input');
    }
  };
  
  const handleBookAppointment = () => {
    if (analysisResults) {
      navigate(`/book-appointment/${analysisResults.recommendedSpecialty.id}`, {
        state: { analysisResults }
      });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Symptom Checker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your symptoms in detail and our AI will analyze them to recommend the appropriate specialist and possible conditions.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-center">
          <ol className="flex items-center max-w-md">
            <li className={`flex items-center ${analysisState !== 'input' ? 'text-primary-600' : 'text-gray-900'}`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                analysisState !== 'input' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200'
              } mr-2`}>
                1
              </span>
              <span className="hidden sm:inline">Input Symptoms</span>
            </li>
            <li className="flex-1 h-px bg-gray-300 mx-2"></li>
            <li className={`flex items-center ${analysisState === 'analyzing' ? 'text-primary-600' : 'text-gray-900'}`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                analysisState === 'analyzing' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200'
              } mr-2`}>
                2
              </span>
              <span className="hidden sm:inline">Analysis</span>
            </li>
            <li className="flex-1 h-px bg-gray-300 mx-2"></li>
            <li className={`flex items-center ${analysisState === 'results' ? 'text-primary-600' : 'text-gray-900'}`}>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                analysisState === 'results' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200'
              } mr-2`}>
                3
              </span>
              <span className="hidden sm:inline">Results</span>
            </li>
          </ol>
        </div>
      </div>
      
      {analysisState === 'input' && (
        <SymptomInput onAnalyze={handleAnalyzeSymptoms} isLoading={isLoading} />
      )}
      
      {analysisState === 'analyzing' && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Brain className="h-16 w-16 mx-auto text-primary-600 animate-pulse-slow mb-6" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Analyzing Your Symptoms</h2>
          <p className="text-gray-600 mb-6">
            Our AI is processing your symptoms to provide personalized recommendations...
          </p>
          <LoadingSpinner size="large" message="This usually takes 5-10 seconds" />
        </div>
      )}
      
      {analysisState === 'results' && analysisResults && (
        <AnalysisResults results={analysisResults} onBookAppointment={handleBookAppointment} />
      )}
    </div>
  );
};

export default SymptomCheckerPage;