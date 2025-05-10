import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, ActivitySquare, Calendar, Home } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const NavLink: React.FC<{ to: string; onClick?: () => void; children: React.ReactNode }> = ({ 
    to, onClick, children 
  }) => (
    <Link
      to={to}
      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      onClick={() => {
        setMobileMenuOpen(false);
        onClick && onClick();
      }}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <ActivitySquare className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MediAid</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NavLink to="/">
              <div className="flex items-center">
                <Home size={18} className="mr-1" />
                Home
              </div>
            </NavLink>
            
            {currentUser ? (
              <>
                {currentUser.role === 'patient' && (
                  <>
                    <NavLink to="/symptom-checker">
                      <div className="flex items-center">
                        <ActivitySquare size={18} className="mr-1" />
                        Symptom Checker
                      </div>
                    </NavLink>
                    <NavLink to="/patient-dashboard">
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-1" />
                        My Appointments
                      </div>
                    </NavLink>
                  </>
                )}
                
                {currentUser.role === 'doctor' && (
                  <NavLink to="/doctor-dashboard">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-1" />
                      Dashboard
                    </div>
                  </NavLink>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <div className="flex items-center">
                    <User size={18} className="mr-1" />
                    Login
                  </div>
                </NavLink>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/">Home</NavLink>
            
            {currentUser ? (
              <>
                {currentUser.role === 'patient' && (
                  <>
                    <NavLink to="/symptom-checker">Symptom Checker</NavLink>
                    <NavLink to="/patient-dashboard">My Appointments</NavLink>
                  </>
                )}
                
                {currentUser.role === 'doctor' && (
                  <NavLink to="/doctor-dashboard">Dashboard</NavLink>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;