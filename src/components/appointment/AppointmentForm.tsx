import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { Doctor, Availability, Specialty, SymptomAnalysisResult } from '../../types';
import { useAppointments } from '../../contexts/AppointmentsContext';
import { getDoctorsBySpecialty } from '../../data/mockData';
import LoadingSpinner from '../ui/LoadingSpinner';

interface AppointmentFormProps {
  specialtyId?: string;
  analysisResults?: SymptomAnalysisResult;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ specialtyId, analysisResults }) => {
  const navigate = useNavigate();
  const { bookAppointment, getAvailableSlots, isLoading } = useAppointments();
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [availableSlots, setAvailableSlots] = useState<Availability[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  
  // Fetch doctors based on specialty
  useEffect(() => {
    const initialSpecialtyId = specialtyId || analysisResults?.recommendedSpecialty.id;
    if (initialSpecialtyId) {
      const doctorsForSpecialty = getDoctorsBySpecialty(initialSpecialtyId);
      setDoctors(doctorsForSpecialty);
      
      if (doctorsForSpecialty.length > 0) {
        setSelectedDoctor(doctorsForSpecialty[0].id);
      }
    }
  }, [specialtyId, analysisResults]);
  
  // Fetch available slots when doctor or date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDoctor && selectedDate) {
        try {
          const slots = await getAvailableSlots(selectedDoctor, selectedDate);
          setAvailableSlots(slots);
          setSelectedTime(slots.length > 0 ? slots[0].startTime : '');
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      }
    };
    
    fetchAvailableSlots();
  }, [selectedDoctor, selectedDate, getAvailableSlots]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    
    if (!selectedDoctor) {
      setFormError('Please select a doctor');
      return;
    }
    
    if (!selectedTime) {
      setFormError('Please select an appointment time');
      return;
    }
    
    try {
      const appointmentData = {
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        symptoms: analysisResults?.symptoms || '',
        conditions: analysisResults?.conditions || []
      };
      
      await bookAppointment(
        appointmentData.doctorId,
        appointmentData.date,
        appointmentData.time,
        appointmentData.symptoms,
        appointmentData.conditions
      );
      
      setBookingSuccess(true);
      
      // Redirect to dashboard after successful booking
      setTimeout(() => {
        navigate('/patient-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setFormError('Failed to book appointment. Please try again.');
    }
  };
  
  // Generate dates for the next 14 days
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEE, MMMM d, yyyy')
    };
  });
  
  if (bookingSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-success-500 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Appointment Booked!</h2>
        <p className="text-gray-600 mb-6">
          Your appointment has been successfully scheduled. You'll be redirected to your dashboard.
        </p>
        <div className="p-4 bg-gray-50 rounded-lg text-left mb-6">
          <p className="font-medium">Appointment Details:</p>
          <p>Date: {selectedDate}</p>
          <p>Time: {selectedTime}</p>
          <p>Doctor: {doctors.find(d => d.id === selectedDoctor)?.name}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book an Appointment</h2>
      
      {isLoading ? (
        <LoadingSpinner message="Loading appointment options..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Doctor Selection */}
          <div className="mb-4">
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline h-4 w-4 mr-1" /> Select Doctor
            </label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {doctors.length === 0 ? (
                <option value="">No doctors available</option>
              ) : (
                doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty.name}
                  </option>
                ))
              )}
            </select>
          </div>
          
          {/* Date Selection */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" /> Select Date
            </label>
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Time Selection */}
          <div className="mb-6">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline h-4 w-4 mr-1" /> Select Time
            </label>
            {availableSlots.length === 0 ? (
              <p className="text-gray-600 p-3 bg-gray-50 rounded">No available slots for the selected date.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTime(slot.startTime)}
                    className={`py-2 px-4 rounded-lg text-center transition-colors ${
                      selectedTime === slot.startTime
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {slot.startTime}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {formError && (
            <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm">
              {formError}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading || availableSlots.length === 0}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              isLoading || availableSlots.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isLoading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      )}
    </div>
  );
};

import { Check } from 'lucide-react';

export default AppointmentForm;