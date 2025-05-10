import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: Array<'patient' | 'doctor' | 'admin'>;
}> = ({ element, allowedRoles }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

function App() {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/" replace /> : <SignupPage />} />
          
          <Route 
            path="/symptom-checker" 
            element={<ProtectedRoute element={<SymptomCheckerPage />} allowedRoles={['patient']} />} 
          />
          <Route 
            path="/book-appointment" 
            element={<ProtectedRoute element={<AppointmentBookingPage />} allowedRoles={['patient']} />} 
          />
          <Route 
            path="/book-appointment/:specialtyId" 
            element={<ProtectedRoute element={<AppointmentBookingPage />} allowedRoles={['patient']} />} 
          />
          <Route 
            path="/doctor-dashboard" 
            element={<ProtectedRoute element={<DoctorDashboardPage />} allowedRoles={['doctor']} />} 
          />
          <Route 
            path="/patient-dashboard" 
            element={<ProtectedRoute element={<PatientDashboardPage />} allowedRoles={['patient']} />} 
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;