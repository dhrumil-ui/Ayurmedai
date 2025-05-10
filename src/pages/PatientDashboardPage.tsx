import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Search, User } from 'lucide-react';
import { useAppointments } from '../contexts/AppointmentsContext';
import { useAuth } from '../contexts/AuthContext';
import AppointmentList from '../components/appointment/AppointmentList';

const PatientDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { appointments, isLoading } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    
    if (filter === 'upcoming') {
      return appointmentDate >= today || appointment.status === 'scheduled';
    } else if (filter === 'past') {
      return appointmentDate < today || appointment.status === 'completed' || appointment.status === 'cancelled';
    }
    
    return true;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser?.name || 'Patient'}. View and manage your appointments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary-600 px-6 py-4 text-white">
              <User className="h-8 w-8 mb-2" />
              <h2 className="text-xl font-semibold">Patient Profile</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                <p className="text-gray-900">{currentUser?.name || 'Patient Name'}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{currentUser?.email || 'patient@example.com'}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/symptom-checker"
                  className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Check Symptoms
                </Link>
              </div>
              
              <div className="pt-3">
                <Link
                  to="/book-appointment"
                  className="w-full py-2 px-4 bg-white border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                My Appointments
              </h2>
              
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-4 py-2 text-sm font-medium ${
                    filter === 'upcoming'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('past')}
                  className={`px-4 py-2 text-sm font-medium ${
                    filter === 'past'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Past
                </button>
              </div>
            </div>
            
            <AppointmentList appointments={filteredAppointments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardPage;