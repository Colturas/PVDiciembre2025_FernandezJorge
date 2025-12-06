import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import '../styles/Dashboard.css';

export const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const { getAppointmentsByDoctor, cancelAppointment } = useAppointments();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getAppointmentsByDoctor(user?.email));
  }, [user, getAppointmentsByDoctor]);

  const handleCancelAppointment = (appointmentId) => {
    cancelAppointment(appointmentId);
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Médico</h1>
        <div className="user-info">
          <span>Bienvenido, Dr/a. {user?.name}</span>
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section">
          <h2>Datos Profesionales</h2>
          <div className="info-card">
            <p><strong>Nombre:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>DNI:</strong> {user?.dni}</p>
            <p><strong>Especialidad:</strong> {user?.specialty}</p>
            <p><strong>Teléfono:</strong> {user?.phone}</p>
          </div>
        </div>

        <div className="section">
          <h2>Turnos Agendados</h2>
          {appointments.length === 0 ? (
            <p className="empty-state">No hay turnos agendados</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>Paciente: {apt.patientName}</h3>
                    <span className="status-badge">{apt.status}</span>
                  </div>
                  <p><strong>Email Paciente:</strong> {apt.patientEmail}</p>
                  <p><strong>DNI Paciente:</strong> {apt.patientDni}</p>
                  <p><strong>Edad:</strong> {apt.patientAge}</p>
                  <p><strong>Fecha:</strong> {apt.date}</p>
                  <p><strong>Hora:</strong> {apt.time}</p>
                  <button 
                    onClick={() => handleCancelAppointment(apt.id)}
                    className="btn-danger"
                  >
                    Cancelar Turno
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
