import React from 'react';
import { AlertCircle, Check, ArrowRight, Leaf, AlertTriangle, Info } from 'lucide-react';
import { SymptomAnalysisResult, UrgencyLevel } from '../../types';

interface AnalysisResultsProps {
  results: SymptomAnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getUrgencyColor = (level: UrgencyLevel): string => {
    switch (level) {
      case 'low':
        return 'text-success-500 bg-success-50';
      case 'medium':
        return 'text-warning-500 bg-warning-50';
      case 'high':
        return 'text-accent-600 bg-accent-50';
      case 'emergency':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getUrgencyLabel = (level: UrgencyLevel): string => {
    switch (level) {
      case 'low':
        return 'Low urgency - Safe for home treatment';
      case 'medium':
        return 'Medium urgency - Monitor closely';
      case 'high':
        return 'High urgency - Consider medical consultation';
      case 'emergency':
        return 'Emergency - Seek immediate medical attention';
      default:
        return 'Unknown urgency';
    }
  };

  const getUrgencyIcon = (level: UrgencyLevel) => {
    if (level === 'emergency') {
      return <AlertCircle className="h-5 w-5" />;
    }
    return null;
  };

  const getConfidenceLabel = (confidence: number): string => {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.75) return 'High';
    if (confidence >= 0.5) return 'Medium';
    if (confidence >= 0.25) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Analysis Results</h2>
      
      {/* Urgency Banner */}
      <div className={`flex items-center p-4 mb-6 rounded-lg ${getUrgencyColor(results.urgencyLevel)}`}>
        {getUrgencyIcon(results.urgencyLevel)}
        <span className="font-medium ml-2">{getUrgencyLabel(results.urgencyLevel)}</span>
        
        {results.urgencyLevel === 'emergency' && (
          <p className="ml-2 text-sm text-error-700">
            Please seek immediate medical attention. Do not attempt home remedies.
          </p>
        )}
      </div>
      
      {/* General Advice */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">General Health Advice</h3>
        <div className="bg-primary-50 rounded-lg p-4">
          <ul className="space-y-2">
            {results.generalAdvice.map((advice, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-primary-900">{advice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Possible Conditions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Possible Conditions</h3>
        <p className="text-sm text-gray-600 mb-3">
          Based on your symptoms, our AI has identified these potential conditions:
        </p>
        
        <div className="space-y-6">
          {results.conditions.map((condition) => (
            <div key={condition.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Condition Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{condition.name}</h4>
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-800 rounded-full">
                    {getConfidenceLabel(condition.confidence)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{condition.description}</p>
                
                {condition.seekMedicalAttention && (
                  <div className="mt-2 flex items-center text-warning-600 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Please consult a healthcare provider for this condition
                  </div>
                )}
              </div>
              
              {/* Home Remedies */}
              {!condition.seekMedicalAttention && condition.remedies.length > 0 && (
                <div className="p-4">
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                    <Leaf className="h-5 w-5 text-primary-600 mr-2" />
                    Natural Remedies
                  </h5>
                  
                  <div className="space-y-4">
                    {condition.remedies.map((remedy) => (
                      <div key={remedy.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="font-medium text-gray-900">{remedy.title}</h6>
                          <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                            {Math.round(remedy.effectiveness * 100)}% Effective
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{remedy.description}</p>
                        
                        <div className="mb-3">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h6>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {remedy.ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-3">
                          <h6 className="text-sm font-medium text-gray-700 mb-1">Instructions:</h6>
                          <ol className="list-decimal list-inside text-sm text-gray-600">
                            {remedy.instructions.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ol>
                        </div>
                        
                        {remedy.warnings && remedy.warnings.length > 0 && (
                          <div className="mt-2 p-2 bg-warning-50 rounded text-sm">
                            <div className="flex items-center text-warning-700 mb-1">
                              <Info className="h-4 w-4 mr-1" />
                              Precautions:
                            </div>
                            <ul className="list-disc list-inside text-warning-600">
                              {remedy.warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Prevention Tips */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <h5 className="font-medium text-gray-800 mb-2">Prevention Tips:</h5>
                <ul className="space-y-1">
                  {condition.preventionTips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <ArrowRight className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="font-medium text-gray-700 mb-1">Important Disclaimer:</p>
        <p>
          This analysis is for informational purposes only and should not be considered medical advice. 
          While these natural remedies may help with symptoms, they are not a substitute for professional 
          medical treatment. Always consult with a healthcare provider for proper diagnosis and treatment, 
          especially if symptoms are severe or persist.
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;