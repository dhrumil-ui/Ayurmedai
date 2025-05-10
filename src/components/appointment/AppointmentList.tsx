import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, FileText, AlertTriangle } from 'lucide-react';
import { Appointment } from '../../types';
import { useAppointments } from '../../contexts/AppointmentsContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface AppointmentListProps {
  appointments: Appointment[];
  isDoctorView?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, isDoctorView = false }) => {
  const { cancelAppointment, isLoading } = useAppointments();
  
  const handleCancelAppointment = async (appointmentId: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await cancelAppointment(appointmentId);
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">Scheduled</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Cancelled</span>;
      default:
        return null;
    }
  };
  
  const getUrgencyBadge = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'low':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800">Low</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-800">Medium</span>;
      case 'high':
        return <span className="px-2 py-1 text-xs rounded-full bg-accent-100 text-accent-800">High</span>;
      case 'emergency':
        return <span className="px-2 py-1 text-xs rounded-full bg-error-100 text-error-800 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" /> Emergency
        </span>;
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner message="Loading appointments..." />;
  }
  
  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Appointments</h3>
        <p className="text-gray-500">
          {isDoctorView 
            ? "You don't have any scheduled appointments yet."
            : "You haven't booked any appointments yet."
          }
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div 
          key={appointment.id} 
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 mr-2" />
              <span className="font-medium">
                {format(parseISO(appointment.date), 'MMMM d, yyyy')}
              </span>
              <span className="mx-2">•</span>
              <Clock className="h-5 w-5 text-primary-600 mr-2" />
              <span>{appointment.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusBadge(appointment.status)}
              
              {appointment.conditions && appointment.conditions.length > 0 && (
                getUrgencyBadge(appointment.conditions[0].urgencyLevel)
              )}
            </div>
          </div>
          
          <div className="mb-3">
            {isDoctorView ? (
              <h3 className="font-medium text-gray-900">Patient: John Smith</h3>
            ) : (
              <h3 className="font-medium text-gray-900">
                {appointment.doctorId === 'user-2' ? 'Dr. Sarah Johnson' : 'Dr. Michael Chen'}
              </h3>
            )}
            
            {appointment.symptoms && (
              <details className="mt-2">
                <summary className="text-sm text-primary-600 cursor-pointer hover:text-primary-700">
                  <FileText className="h-4 w-4 inline mr-1" /> View symptoms
                </summary>
                <p className="mt-2 text-sm text-gray-600 p-3 bg-gray-50 rounded">
                  {appointment.symptoms}
                </p>
              </details>
            )}
            
            {appointment.conditions && appointment.conditions.length > 0 && (
              <div className="mt-3">
                <span className="text-sm text-gray-600">Possible conditions:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {appointment.conditions.map((condition) => (
                    <span 
                      key={condition.id} 
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                      title={condition.description}
                    >
                      {condition.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {appointment.status === 'scheduled' && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleCancelAppointment(appointment.id)}
                disabled={isLoading}
                className="px-3 py-1 text-sm border border-error-600 text-error-600 rounded hover:bg-error-50 transition-colors"
              >
                Cancel Appointment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;