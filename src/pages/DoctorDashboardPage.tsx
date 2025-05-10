import React, { useState } from 'react';
import { User, Calendar, Clock, ClipboardList } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../contexts/AppointmentsContext';
import AppointmentList from '../components/appointment/AppointmentList';
import { format } from 'date-fns';

const DoctorDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { appointments, isLoading } = useAppointments();
  const [filter, setFilter] = useState<'today' | 'upcoming' | 'all'>('today');
  
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    
    if (filter === 'today') {
      return appointment.date === today && appointment.status === 'scheduled';
    } else if (filter === 'upcoming') {
      return appointment.status === 'scheduled';
    }
    
    return true;
  });
  
  // Count appointments by status
  const scheduledCount = appointments.filter(a => a.status === 'scheduled').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600">
          Welcome, Dr. {currentUser?.name?.split(' ')[1] || 'Johnson'}. Here's your schedule.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{scheduledCount}</h3>
              <p className="text-gray-500">Scheduled Appointments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 text-success-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{completedCount}</h3>
              <p className="text-gray-500">Completed Appointments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-error-100 text-error-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{cancelledCount}</h3>
              <p className="text-gray-500">Cancelled Appointments</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary-600 px-6 py-4 text-white">
              <User className="h-8 w-8 mb-2" />
              <h2 className="text-xl font-semibold">Doctor Profile</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                <p className="text-gray-900">{currentUser?.name || 'Dr. Sarah Johnson'}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Specialty</h3>
                <p className="text-gray-900">General Practitioner</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{currentUser?.email || 'doctor@example.com'}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Manage Availability
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                Appointments
              </h2>
              
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <button
                  onClick={() => setFilter('today')}
                  className={`px-4 py-2 text-sm font-medium ${
                    filter === 'today'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Today
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
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
              </div>
            </div>
            
            <AppointmentList appointments={filteredAppointments} isDoctorView={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;