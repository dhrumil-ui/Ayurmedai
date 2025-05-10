import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, Doctor, Availability, SymptomAnalysisResult, Condition } from '../types';
import { mockAppointments } from '../data/mockData';
import { useAuth } from './AuthContext';
import { analyzeSymptoms } from '../services/aiService';

interface AppointmentsContextType {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  analyzePatientSymptoms: (symptomsText: string) => Promise<SymptomAnalysisResult>;
  bookAppointment: (
    doctorId: string,
    date: string,
    time: string,
    symptoms: string,
    conditions: Condition[]
  ) => Promise<Appointment>;
  getAvailableSlots: (doctorId: string, date: string) => Promise<Availability[]>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextType | null>(null);

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};

export const AppointmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // Filter appointments based on user role
          const userAppointments = mockAppointments.filter(appointment => {
            if (currentUser.role === 'patient') {
              return appointment.patientId === currentUser.id;
            } else if (currentUser.role === 'doctor') {
              return appointment.doctorId === currentUser.id;
            }
            return false;
          });
          
          setAppointments(userAppointments);
          setError(null);
        } catch (err) {
          setError('Failed to load appointments');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    }
  }, [currentUser]);

  const analyzePatientSymptoms = async (symptomsText: string): Promise<SymptomAnalysisResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await analyzeSymptoms(symptomsText);
      return result;
    } catch (err) {
      setError('Failed to analyze symptoms');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const bookAppointment = async (
    doctorId: string,
    date: string,
    time: string,
    symptoms: string,
    conditions: Condition[]
  ): Promise<Appointment> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to book an appointment');
      }
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAppointment: Appointment = {
        id: `app-${Date.now()}`,
        patientId: currentUser.id,
        doctorId,
        date,
        time,
        status: 'scheduled',
        symptoms,
        conditions,
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      return newAppointment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableSlots = async (doctorId: string, date: string): Promise<Availability[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would fetch this from the database
      const availableSlots: Availability[] = [
        { id: `slot-1`, doctorId, date, startTime: '09:00', endTime: '09:30', isBooked: false },
        { id: `slot-2`, doctorId, date, startTime: '09:30', endTime: '10:00', isBooked: false },
        { id: `slot-3`, doctorId, date, startTime: '10:00', endTime: '10:30', isBooked: true },
        { id: `slot-4`, doctorId, date, startTime: '10:30', endTime: '11:00', isBooked: false },
        { id: `slot-5`, doctorId, date, startTime: '11:00', endTime: '11:30', isBooked: false },
      ];
      
      return availableSlots.filter(slot => !slot.isBooked);
    } catch (err) {
      setError('Failed to get available slots');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'cancelled' } 
            : appointment
        )
      );
    } catch (err) {
      setError('Failed to cancel appointment');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    appointments,
    isLoading,
    error,
    analyzePatientSymptoms,
    bookAppointment,
    getAvailableSlots,
    cancelAppointment,
  };

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>;
};