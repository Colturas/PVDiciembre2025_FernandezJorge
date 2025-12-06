import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { useDoctors, useMorningSlots } from '../hooks/useData';
import '../styles/Dashboard.css';

export const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const { addAppointment, getAppointmentsByPatient } = useAppointments();
  const doctors = useDoctors();
  const morningSlots = useMorningSlots();
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setAppointments(getAppointmentsByPatient(user?.email));
  }, [user, getAppointmentsByPatient]);

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedSlot) {
      const newAppointment = {
        id: Date.now(),
        patientName: user.name,
        patientEmail: user.email,
        patientDni: user.dni,
        patientAge: user.age,
        doctorName: selectedDoctor.name,
        doctorEmail: selectedDoctor.email,
        doctorSpecialty: selectedDoctor.specialty,
        date: new Date().toLocaleDateString('es-AR'),
        time: selectedSlot,
        status: 'confirmado',
        createdAt: new Date().toISOString(),
      };

      addAppointment(newAppointment);
      setAppointments(prev => [...prev, newAppointment]);
      setSuccessMessage('¡Turno agendado exitosamente!');
      setShowBookForm(false);
      setSelectedDoctor(null);
      setSelectedSlot(null);

      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Paciente</h1>
        <div className="user-info">
          <span>Bienvenido, {user?.name}</span>
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="dashboard-content">
        <div className="section">
          <h2>Datos Personales</h2>
          <div className="info-card">
            <p><strong>Nombre:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>DNI:</strong> {user?.dni}</p>
            <p><strong>Edad:</strong> {user?.age}</p>
            <p><strong>Teléfono:</strong> {user?.phone}</p>
          </div>
        </div>

        <div className="section">
          <h2>Agendar Turno</h2>
          {!showBookForm ? (
            <button onClick={() => setShowBookForm(true)} className="btn-primary">
              Agendar Nuevo Turno
            </button>
          ) : (
            <div className="book-form">
              <div className="form-group">
                <label>Selecciona un Médico</label>
                <select
                  value={selectedDoctor?.id || ''}
                  onChange={(e) => {
                    const doctor = doctors.find(d => d.id === parseInt(e.target.value));
                    setSelectedDoctor(doctor);
                    setSelectedSlot(null);
                  }}
                >
                  <option value="">-- Selecciona un médico --</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDoctor && (
                <div className="form-group">
                  <label>Selecciona una Hora (Mañana)</label>
                  <div className="slots-grid">
                    {morningSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDoctor && selectedSlot && (
                <div className="appointment-preview">
                  <h3>Resumen del Turno</h3>
                  <p><strong>Médico:</strong> {selectedDoctor.name}</p>
                  <p><strong>Especialidad:</strong> {selectedDoctor.specialty}</p>
                  <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-AR')}</p>
                  <p><strong>Hora:</strong> {selectedSlot}</p>
                  <button onClick={handleBookAppointment} className="btn-primary">
                    Confirmar Turno
                  </button>
                  <button onClick={() => setShowBookForm(false)} className="btn-secondary">
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="section">
          <h2>Mis Turnos</h2>
          {appointments.length === 0 ? (
            <p className="empty-state">No tienes turnos agendados</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{apt.doctorName}</h3>
                    <span className="status-badge">{apt.status}</span>
                  </div>
                  <p><strong>Especialidad:</strong> {apt.doctorSpecialty}</p>
                  <p><strong>Fecha:</strong> {apt.date}</p>
                  <p><strong>Hora:</strong> {apt.time}</p>
                  <button className="btn-download">Descargar PDF</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
