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
  const { agregarTurno, obtenerTurnosPorPaciente, verificarDisponibilidad, obtenerHorariosDisponibles } = useTurnos();
  const medicos = useMedicos();
  const turnosMatutinos = useTurnosMatutinos();
  const [turnos, setTurnos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  useEffect(() => {
    setTurnos(obtenerTurnosPorPaciente(usuario?.email));
  }, [usuario, obtenerTurnosPorPaciente]);

  const manejarSeleccionMedico = (medico) => {
    setMedicoSeleccionado(medico);
    setHorarioSeleccionado(null);
    const fecha = new Date().toLocaleDateString('es-AR');
    const horariosDisp = obtenerHorariosDisponibles(medico.email, fecha, turnosMatutinos);
    setHorariosDisponibles(horariosDisp);
  };

  const [mostrarDialogoCancelacion, setMostrarDialogoCancelacion] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const { cancelarTurno } = useTurnos();

  const manejarAgendamiento = () => {
    if (medicoSeleccionado && horarioSeleccionado) {
      const fecha = new Date().toLocaleDateString('es-AR');
      
      // Verificar nuevamente disponibilidad antes de agendar
      if (!verificarDisponibilidad(medicoSeleccionado.email, fecha, horarioSeleccionado)) {
        alert('Lo siento, este horario ya no está disponible. Por favor selecciona otro.');
        const horariosActualizados = obtenerHorariosDisponibles(medicoSeleccionado.email, fecha, turnosMatutinos);
        setHorariosDisponibles(horariosActualizados);
        return;
      }

      const nuevoTurno = {
        id: Date.now(),
        nombrePaciente: usuario.nombre,
        emailPaciente: usuario.email,
        dniPaciente: usuario.dni,
        edadPaciente: usuario.edad,
        nombreMedico: medicoSeleccionado.nombre,
        emailMedico: medicoSeleccionado.email,
        especialidadMedico: medicoSeleccionado.especialidad,
        fecha: fecha,
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

  const manejarCancelacion = (turnoId) => {
    if (motivoCancelacion.trim()) {
      cancelarTurno(turnoId, motivoCancelacion);
      setTurnos(prev => 
        prev.map(t => 
          t.id === turnoId 
            ? { ...t, estado: 'cancelado', motivoCancelacion: motivoCancelacion }
            : t
        )
      );
      setMostrarDialogoCancelacion(null);
      setMotivoCancelacion('');
      setMensajeExito('Turno cancelado correctamente.');
      setTimeout(() => setMensajeExito(''), 3000);
    } else {
      alert('Por favor ingresa un motivo para la cancelación.');
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
                      manejarSeleccionMedico(medico);
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
                      {horariosDisponibles.length > 0 ? (
                        horariosDisponibles.map(horario => (
                          <button
                            key={horario}
                            onClick={() => setHorarioSeleccionado(horario)}
                            className={`slot-button ${horarioSeleccionado === horario ? 'selected' : ''}`}
                          >
                            {horario}
                          </button>
                        ))
                      ) : (
                        <p style={{ gridColumn: '1 / -1', color: '#d32f2f', textAlign: 'center' }}>
                          No hay horarios disponibles para esta fecha. Intenta con otro día.
                        </p>
                      )}
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
                      <span className={`status-badge ${turno.estado === 'cancelado' ? 'cancelado' : ''}`}>
                        {turno.estado === 'cancelado' ? '✗ Cancelado' : '✓ Confirmado'}
                      </span>
                    </div>
                    <p><strong>Especialidad:</strong> {turno.especialidadMedico}</p>
                    <p><strong>📅 Fecha:</strong> {turno.fecha}</p>
                    <p><strong>🕐 Hora:</strong> {turno.hora}</p>
                    <p><strong>📧 Email del médico:</strong> {turno.emailMedico}</p>
                    {turno.estado === 'cancelado' && turno.motivoCancelacion && (
                      <p style={{ color: '#d32f2f', fontStyle: 'italic' }}>
                        <strong>Motivo de cancelación:</strong> {turno.motivoCancelacion}
                      </p>
                    )}
                    {turno.estado === 'confirmado' && (
                      <button 
                        className="btn-danger"
                        onClick={() => setMostrarDialogoCancelacion(turno.id)}
                      >
                        🗑️ Cancelar Turno
                      </button>
                    )}
                    <button className="btn-download">📥 Descargar PDF</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {mostrarDialogoCancelacion && (
            <div className="modal-overlay" onClick={() => setMostrarDialogoCancelacion(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Cancelar Turno</h2>
                <p>¿Estás seguro de que deseas cancelar este turno? Por favor indica el motivo:</p>
                <textarea
                  value={motivoCancelacion}
                  onChange={(e) => setMotivoCancelacion(e.target.value)}
                  placeholder="Ej: Motivo personal, cambio de disponibilidad, etc..."
                  style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => {
                      setMostrarDialogoCancelacion(null);
                      setMotivoCancelacion('');
                    }}
                    className="btn-secondary"
                  >
                    No, mantener turno
                  </button>
                  <button 
                    onClick={() => manejarCancelacion(mostrarDialogoCancelacion)}
                    className="btn-danger"
                  >
                    Sí, cancelar turno
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
