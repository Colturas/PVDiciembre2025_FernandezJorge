import { useState, useEffect } from 'react';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useTurnos } from '../context/ContextoTurnos';
import '../styles/Dashboard.css';

export const PanelMedico = () => {
  const { usuario } = useAutenticacion();
  const { obtenerTurnosPorMedico, cancelarTurno } = useTurnos();
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    setTurnos(obtenerTurnosPorMedico(usuario?.email));
  }, [usuario, obtenerTurnosPorMedico]);

  const manejarCancelacionTurno = (idTurno) => {
    cancelarTurno(idTurno);
    setTurnos(prev => prev.filter(turno => turno.id !== idTurno));
  };

  return (
    <>
      <Encabezado />
      <div className="dashboard">
        <div className="dashboard-content">
          {/* Sección de Bienvenida */}
          <section className="section welcome-section">
            <div className="welcome-content">
              <h2>Bienvenido, Dr/a. {usuario?.nombre} 👨‍⚕️</h2>
              <p>Gestiona tus citas y atiende a tus pacientes en MediCare+</p>
            </div>
          </section>

          <div className="section">
            <h2>🏥 Datos Profesionales</h2>
            <div className="info-card">
              <p><strong>Nombre:</strong> Dr/a. {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>DNI:</strong> {usuario?.dni}</p>
              <p><strong>Especialidad:</strong> {usuario?.especialidad}</p>
              <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
              <p><strong>Estado:</strong> <span style={{ color: '#00897b', fontWeight: 'bold' }}>✓ Disponible</span></p>
            </div>
          </div>

          <div className="section">
            <h2>📋 Turnos Agendados</h2>
            {turnos.length === 0 ? (
              <p className="empty-state">No hay turnos agendados en este momento. Tus pacientes podrán agendar citas pronto.</p>
            ) : (
              <div className="appointments-list">
                {turnos.map(turno => (
                  <div key={turno.id} className="appointment-card">
                    <div className="appointment-header">
                      <h3>Paciente: {turno.nombrePaciente}</h3>
                      <span className="status-badge">✓ {turno.estado}</span>
                    </div>
                    <p><strong>📧 Email:</strong> {turno.emailPaciente}</p>
                    <p><strong>📄 DNI:</strong> {turno.dniPaciente}</p>
                    <p><strong>👤 Edad:</strong> {turno.edadPaciente} años</p>
                    <p><strong>📅 Fecha:</strong> {turno.fecha}</p>
                    <p><strong>🕐 Hora:</strong> {turno.hora}</p>
                    <button 
                      onClick={() => manejarCancelacionTurno(turno.id)}
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
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00bcd4' }}>{turnos.length}</p>
                <p style={{ color: '#666' }}>Turnos Totales</p>
              </div>
              <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00897b' }}>{turnos.filter(t => t.estado === 'confirmado').length}</p>
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
