import React, { useState } from 'react';
import { Brain } from 'lucide-react';

interface SymptomInputProps {
  onAnalyze: (symptoms: string) => void;
  isLoading: boolean;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ onAnalyze, isLoading }) => {
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (symptoms.trim().length < 10) {
      setError('Please provide more details about your symptoms (at least 10 characters)');
      return;
    }
    
    setError('');
    onAnalyze(symptoms);
  };

  const exampleSymptoms = [
    "I've had a headache for 3 days with some dizziness",
    "My skin has been itchy with red patches for a week",
    "I've been experiencing chest pain and shortness of breath",
    "I have stomach pain and nausea after eating"
  ];

  const handleExampleClick = (example: string) => {
    setSymptoms(example);
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-primary-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">Describe Your Symptoms</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Please describe your symptoms in detail. Include when they started, their severity, and any other relevant information.
        Our AI will analyze your symptoms and recommend the appropriate specialist.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            rows={5}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., I've been experiencing a persistent headache for the past 3 days, mainly on the right side of my head..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
          {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>
      
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
           symptom descriptions:
        </p>
        <div className="space-y-2">
          {exampleSymptoms.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="text-sm text-left w-full px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;