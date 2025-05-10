import { User, Doctor, Specialty, Appointment, Condition } from '../types';

export const mockSpecialties: Specialty[] = [
  {
    id: 'specialty-1',
    name: 'General Practitioner',
    description: 'Provides primary healthcare for various conditions',
  },
  {
    id: 'specialty-2',
    name: 'Dermatologist',
    description: 'Specializes in skin conditions and diseases',
  },
  {
    id: 'specialty-3',
    name: 'Cardiologist',
    description: 'Specializes in heart-related conditions',
  },
  {
    id: 'specialty-4',
    name: 'Neurologist',
    description: 'Specializes in conditions affecting the nervous system',
  },
  {
    id: 'specialty-5',
    name: 'Gastroenterologist',
    description: 'Specializes in digestive system disorders',
  },
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'patient@example.com',
    role: 'patient',
  },
  {
    id: 'user-2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@example.com',
    role: 'doctor',
    specialtyId: 'specialty-1',
  },
  {
    id: 'user-3',
    name: 'Dr. Michael Chen',
    email: 'doctor2@example.com',
    role: 'doctor',
    specialtyId: 'specialty-2',
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: 'user-2',
    name: 'Dr. Sarah Johnson',
    specialtyId: 'specialty-1',
    specialty: mockSpecialties[0],
    availability: [
      { id: 'avail-1', doctorId: 'user-2', date: '2025-05-15', startTime: '09:00', endTime: '09:30', isBooked: false },
      { id: 'avail-2', doctorId: 'user-2', date: '2025-05-15', startTime: '09:30', endTime: '10:00', isBooked: false },
      { id: 'avail-3', doctorId: 'user-2', date: '2025-05-15', startTime: '10:00', endTime: '10:30', isBooked: true },
    ],
  },
  {
    id: 'user-3',
    name: 'Dr. Michael Chen',
    specialtyId: 'specialty-2',
    specialty: mockSpecialties[1],
    availability: [
      { id: 'avail-4', doctorId: 'user-3', date: '2025-05-15', startTime: '13:00', endTime: '13:30', isBooked: false },
      { id: 'avail-5', doctorId: 'user-3', date: '2025-05-15', startTime: '13:30', endTime: '14:00', isBooked: false },
      { id: 'avail-6', doctorId: 'user-3', date: '2025-05-15', startTime: '14:00', endTime: '14:30', isBooked: false },
    ],
  },
];

export const mockConditions: Condition[] = [
  {
    id: 'condition-1',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract',
    confidence: 0.85,
    specialtyId: 'specialty-1',
    urgencyLevel: 'low',
  },
  {
    id: 'condition-2',
    name: 'Influenza',
    description: 'A viral infection that attacks your respiratory system',
    confidence: 0.75,
    specialtyId: 'specialty-1',
    urgencyLevel: 'medium',
  },
  {
    id: 'condition-3',
    name: 'Eczema',
    description: 'A condition that makes your skin red and itchy',
    confidence: 0.92,
    specialtyId: 'specialty-2',
    urgencyLevel: 'low',
  },
  {
    id: 'condition-4',
    name: 'Hypertension',
    description: 'High blood pressure that can lead to serious health problems',
    confidence: 0.88,
    specialtyId: 'specialty-3',
    urgencyLevel: 'medium',
  },
  {
    id: 'condition-5',
    name: 'Migraine',
    description: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound',
    confidence: 0.83,
    specialtyId: 'specialty-4',
    urgencyLevel: 'medium',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'appointment-1',
    patientId: 'user-1',
    doctorId: 'user-2',
    date: '2025-05-12',
    time: '10:00',
    status: 'scheduled',
    symptoms: 'Headache, fever, and sore throat for the past 3 days',
    conditions: [mockConditions[0], mockConditions[1]],
  },
  {
    id: 'appointment-2',
    patientId: 'user-1',
    doctorId: 'user-3',
    date: '2025-05-05',
    time: '14:30',
    status: 'completed',
    symptoms: 'Itchy, red patches on skin',
    conditions: [mockConditions[2]],
    notes: 'Prescribed hydrocortisone cream and antihistamines',
  },
];

export const getDoctorsBySpecialty = (specialtyId: string): Doctor[] => {
  return mockDoctors.filter(doctor => doctor.specialtyId === specialtyId);
};

export const getSpecialtyById = (specialtyId: string): Specialty | undefined => {
  return mockSpecialties.find(specialty => specialty.id === specialtyId);
};

export const getDoctorById = (doctorId: string): Doctor | undefined => {
  return mockDoctors.find(doctor => doctor.id === doctorId);
};