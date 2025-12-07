import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { NotFound, UnauthorizedAccess } from './components/ErrorPages';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppointmentProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/patient-dashboard"
              element={
                <PrivateRoute requiredRole="paciente">
                  <PatientDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor-dashboard"
              element={
                <PrivateRoute requiredRole="medico">
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/unauthorized" element={<UnauthorizedAccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppointmentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
