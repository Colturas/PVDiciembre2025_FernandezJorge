import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useTurnos } from '../context/ContextoTurnos';
import { useMedicos, useTurnosMatutinos } from '../hooks/useDatos';
import '../styles/Dashboard.css';

export const PanelPaciente = () => {
  const navegar = useNavigate();
  const { usuario } = useAutenticacion();
  const { agregarTurno, obtenerTurnosPorPaciente } = useTurnos();
  const medicos = useMedicos();
  const turnosMatutinos = useTurnosMatutinos();
  const [turnos, setTurnos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    setTurnos(obtenerTurnosPorPaciente(usuario?.email));
  }, [usuario, obtenerTurnosPorPaciente]);

  const manejarAgendamiento = () => {
    if (medicoSeleccionado && horarioSeleccionado) {
      const nuevoTurno = {
        id: Date.now(),
        nombrePaciente: usuario.nombre,
        emailPaciente: usuario.email,
        dniPaciente: usuario.dni,
        edadPaciente: usuario.edad,
        nombreMedico: medicoSeleccionado.nombre,
        emailMedico: medicoSeleccionado.email,
        especialidadMedico: medicoSeleccionado.especialidad,
        fecha: new Date().toLocaleDateString('es-AR'),
        hora: horarioSeleccionado,
        estado: 'confirmado',
        creadoEn: new Date().toISOString(),
      };

      agregarTurno(nuevoTurno);
      setTurnos(prev => [...prev, nuevoTurno]);
      setMensajeExito('¡Turno agendado exitosamente!');
      setMostrarFormulario(false);
      setMedicoSeleccionado(null);
      setHorarioSeleccionado(null);

      setTimeout(() => setMensajeExito(''), 3000);
    }
  };

  return (
    <>
      <Encabezado />
      <div className="dashboard">
        {mensajeExito && <div className="success-message" style={{ margin: '20px', marginBottom: '20px' }}>{mensajeExito}</div>}

        <div className="dashboard-content">
          {/* Sección de Bienvenida */}
          <section className="section welcome-section">
            <div className="welcome-content">
              <h2>Bienvenido, {usuario?.nombre} 👋</h2>
              <p>Gestiona tus citas médicas de manera sencilla y segura en MediCare+</p>
            </div>
          </section>

          <div className="section">
            <h2>📋 Datos Personales</h2>
            <div className="info-card">
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>DNI:</strong> {usuario?.dni}</p>
              <p><strong>Edad:</strong> {usuario?.edad} años</p>
              <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
            </div>
          </div>

          <div className="section">
            <h2>📅 Agendar Turno</h2>
            {!mostrarFormulario ? (
              <button onClick={() => setMostrarFormulario(true)} className="btn-primary">
                ➕ Agendar Nuevo Turno
              </button>
            ) : (
              <div className="book-form">
                <div className="form-group">
                  <label>Selecciona un Médico</label>
                  <select
                    value={medicoSeleccionado?.id || ''}
                    onChange={(e) => {
                      const medico = medicos.find(m => m.id === parseInt(e.target.value));
                      setMedicoSeleccionado(medico);
                      setHorarioSeleccionado(null);
                    }}
                  >
                    <option value="">-- Selecciona un médico --</option>
                    {medicos.map(medico => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nombre} - {medico.especialidad}
                      </option>
                    ))}
                  </select>
                </div>

                {medicoSeleccionado && (
                  <div className="form-group">
                    <label>Selecciona una Hora (Mañana - {new Date().toLocaleDateString('es-AR')})</label>
                    <div className="slots-grid">
                      {turnosMatutinos.map(horario => (
                        <button
                          key={horario}
                          onClick={() => setHorarioSeleccionado(horario)}
                          className={`slot-button ${horarioSeleccionado === horario ? 'selected' : ''}`}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {medicoSeleccionado && horarioSeleccionado && (
                  <div className="appointment-preview">
                    <h3>✓ Resumen del Turno</h3>
                    <p><strong>Médico:</strong> {medicoSeleccionado.nombre}</p>
                    <p><strong>Especialidad:</strong> {medicoSeleccionado.especialidad}</p>
                    <p><strong>Experiencia:</strong> {medicoSeleccionado.experiencia} años</p>
                    <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-AR')}</p>
                    <p><strong>Hora:</strong> {horarioSeleccionado}</p>
                    <button onClick={manejarAgendamiento} className="btn-primary">
                      ✓ Confirmar Turno
                    </button>
                    <button onClick={() => setMostrarFormulario(false)} className="btn-secondary">
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="section">
            <h2>📌 Mis Turnos</h2>
            {turnos.length === 0 ? (
              <p className="empty-state">No tienes turnos agendados aún. ¡Agenda tu primer turno ahora!</p>
            ) : (
              <div className="appointments-list">
                {turnos.map(turno => (
                  <div key={turno.id} className="appointment-card">
                    <div className="appointment-header">
                      <h3>Dr/a. {turno.nombreMedico}</h3>
                      <span className="status-badge">✓ {turno.estado}</span>
                    </div>
                    <p><strong>Especialidad:</strong> {turno.especialidadMedico}</p>
                    <p><strong>📅 Fecha:</strong> {turno.fecha}</p>
                    <p><strong>🕐 Hora:</strong> {turno.hora}</p>
                    <p><strong>📧 Email del médico:</strong> {turno.emailMedico}</p>
                    <button className="btn-download">📥 Descargar PDF</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
