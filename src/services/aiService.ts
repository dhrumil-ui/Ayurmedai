import { SymptomAnalysisResult, Condition, UrgencyLevel, Remedy } from '../types';

const mockRemedies: Remedy[] = [
  {
    id: 'remedy-1',
    title: 'Ginger Tea',
    description: 'A natural anti-inflammatory and digestive aid',
    ingredients: ['Fresh ginger root', 'Hot water', 'Honey (optional)', 'Lemon (optional)'],
    instructions: [
      'Peel and slice 2-3 pieces of fresh ginger',
      'Boil water and add ginger',
      'Steep for 5-10 minutes',
      'Add honey and lemon if desired'
    ],
    effectiveness: 0.8,
    warnings: ['Avoid if you have bleeding disorders or are on blood thinners']
  },
  {
    id: 'remedy-2',
    title: 'Steam Inhalation',
    description: 'Helps clear nasal passages and reduce congestion',
    ingredients: ['Hot water', 'Essential oils (optional)', 'Large towel'],
    instructions: [
      'Boil water in a large bowl',
      'Add essential oils if desired',
      'Cover head with towel',
      'Inhale steam for 5-10 minutes'
    ],
    effectiveness: 0.75,
    warnings: ['Keep face at least 12 inches from water', 'Stop if feeling uncomfortable']
  }
];

const mockConditions: Condition[] = [
  {
    id: 'condition-1',
    name: 'Common Cold',
    description: 'A viral infection causing nasal congestion, sore throat, and mild fever',
    confidence: 0.85,
    remedies: [mockRemedies[0], mockRemedies[1]],
    urgencyLevel: 'low',
    seekMedicalAttention: false,
    preventionTips: [
      'Wash hands frequently',
      'Get adequate sleep',
      'Stay hydrated',
      'Eat vitamin C rich foods'
    ]
  },
  {
    id: 'condition-2',
    name: 'Seasonal Allergies',
    description: 'Allergic reaction to pollen and other seasonal allergens',
    confidence: 0.75,
    remedies: [
      {
        id: 'remedy-3',
        title: 'Nasal Irrigation',
        description: 'Cleans nasal passages of allergens',
        ingredients: ['Distilled water', 'Salt', 'Baking soda', 'Neti pot'],
        instructions: [
          'Mix 1 cup distilled water with 1/4 tsp each of salt and baking soda',
          'Use neti pot to irrigate nasal passages',
          'Repeat morning and evening'
        ],
        effectiveness: 0.85,
        warnings: ['Use only distilled or boiled water', 'Clean neti pot after each use']
      }
    ],
    urgencyLevel: 'low',
    seekMedicalAttention: false,
    preventionTips: [
      'Monitor pollen forecasts',
      'Keep windows closed during high pollen times',
      'Shower after being outdoors',
      'Use air purifiers'
    ]
  }
];

export const analyzeSymptoms = async (symptomsText: string): Promise<SymptomAnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const lowerCaseSymptoms = symptomsText.toLowerCase();
  let urgencyLevel: UrgencyLevel = 'low';
  let conditions = [...mockConditions];
  
  if (
    lowerCaseSymptoms.includes('chest pain') || 
    lowerCaseSymptoms.includes('difficulty breathing') ||
    lowerCaseSymptoms.includes('severe')
  ) {
    urgencyLevel = 'high';
    conditions = conditions.map(c => ({
      ...c,
      seekMedicalAttention: true
    }));
  }
  
  if (
    lowerCaseSymptoms.includes('emergency') || 
    lowerCaseSymptoms.includes('cannot breathe') || 
    lowerCaseSymptoms.includes('unconscious')
  ) {
    urgencyLevel = 'emergency';
    conditions = conditions.map(c => ({
      ...c,
      seekMedicalAttention: true
    }));
  }
  
  return {
    symptoms: symptomsText,
    conditions: conditions.map(condition => ({
      ...condition,
      confidence: Math.max(0.5, Math.min(0.95, Math.random() * 0.3 + 0.65)),
      urgencyLevel
    })),
    urgencyLevel,
    generalAdvice: [
      'Stay hydrated by drinking plenty of water',
      'Get adequate rest to support your body\'s healing',
      'Maintain good hygiene practices',
      'Monitor your symptoms and seek medical attention if they worsen'
    ]
  };
};