import { useState, useEffect } from 'react';
import { Header } from './Header';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import '../styles/Dashboard.css';

export const DoctorDashboard = () => {
  const { user } = useAuth();
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
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="section welcome-section">
            <div className="welcome-content">
              <h2>Bienvenido, Dr/a. {user?.name} 👨‍⚕️</h2>
              <p>Gestiona tus citas y atiende a tus pacientes en MediCare+</p>
            </div>
          </section>

          <div className="section">
            <h2>🏥 Datos Profesionales</h2>
            <div className="info-card">
              <p><strong>Nombre:</strong> Dr/a. {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>DNI:</strong> {user?.dni}</p>
              <p><strong>Especialidad:</strong> {user?.specialty}</p>
              <p><strong>Teléfono:</strong> {user?.phone}</p>
              <p><strong>Estado:</strong> <span style={{ color: '#00897b', fontWeight: 'bold' }}>✓ Disponible</span></p>
            </div>
          </div>

          <div className="section">
            <h2>📋 Turnos Agendados</h2>
            {appointments.length === 0 ? (
              <p className="empty-state">No hay turnos agendados en este momento. Tus pacientes podrán agendar citas pronto.</p>
            ) : (
              <div className="appointments-list">
                {appointments.map(apt => (
                  <div key={apt.id} className="appointment-card">
                    <div className="appointment-header">
                      <h3>Paciente: {apt.patientName}</h3>
                      <span className="status-badge">✓ {apt.status}</span>
                    </div>
                    <p><strong>📧 Email:</strong> {apt.patientEmail}</p>
                    <p><strong>📄 DNI:</strong> {apt.patientDni}</p>
                    <p><strong>👤 Edad:</strong> {apt.patientAge} años</p>
                    <p><strong>📅 Fecha:</strong> {apt.date}</p>
                    <p><strong>🕐 Hora:</strong> {apt.time}</p>
                    <p><strong>📱 Teléfono Paciente:</strong> {apt.patientPhone || 'No registrado'}</p>
                    <button 
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="btn-danger"
                    >
                      ✕ Cancelar Turno
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section">
            <h2>📊 Estadísticas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00bcd4' }}>{appointments.length}</p>
                <p style={{ color: '#666' }}>Turnos Totales</p>
              </div>
              <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00897b' }}>{appointments.filter(a => a.status === 'confirmado').length}</p>
                <p style={{ color: '#666' }}>Confirmados</p>
              </div>
              <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a5f7a' }}>4.8/5</p>
                <p style={{ color: '#666' }}>Calificación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
