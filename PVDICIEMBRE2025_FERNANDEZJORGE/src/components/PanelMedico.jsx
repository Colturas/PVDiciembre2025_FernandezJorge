import { useState, useEffect } from 'react';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useTurnos } from '../context/ContextoTurnos';
import { useUsuarios } from '../hooks/useDatos';
import '../styles/Dashboard.css';

export const PanelMedico = () => {
  const { usuario, actualizarUsuario } = useAutenticacion();
  const { obtenerTurnosPorMedico, cancelarTurno, cambiarDisponibilidad, estaDisponible } = useTurnos();
  const { actualizarObra } = useUsuarios();
  const [turnos, setTurnos] = useState([]);
  const [disponible, setDisponible] = useState(true);
  const [mostrarDialogoCancelacion, setMostrarDialogoCancelacion] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarCambioObra, setMostrarCambioObra] = useState(false);
  const [nuevaObra, setNuevaObra] = useState(usuario?.obraSocial || 'PAMI');
  const [motivoCambioObra, setMotivoCambioObra] = useState('');

  useEffect(() => {
    setTurnos(obtenerTurnosPorMedico(usuario?.email));
    setDisponible(estaDisponible(usuario?.email));
  }, [usuario, obtenerTurnosPorMedico, estaDisponible]);

  const manejarCambioDisponibilidad = () => {
    cambiarDisponibilidad(usuario?.email, !disponible);
    setDisponible(!disponible);
    setMensajeExito(`Ahora estás ${!disponible ? 'disponible' : 'no disponible'} para nuevos turnos.`);
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const manejarCancelacionTurno = (idTurno) => {
    if (motivoCancelacion.trim()) {
      cancelarTurno(idTurno, motivoCancelacion);
      setTurnos(prev => 
        prev.map(t => 
          t.id === idTurno 
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

  const manejarCambioObraSocial = () => {
    if (!motivoCambioObra.trim()) {
      alert('Por favor ingresa un motivo para el cambio de obra social.');
      return;
    }
    actualizarObra(usuario?.id, nuevaObra, motivoCambioObra);
    actualizarUsuario({ obraSocial: nuevaObra });
    setMensajeExito('Obra social actualizada correctamente.');
    setMostrarCambioObra(false);
    setMotivoCambioObra('');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <>
      <Encabezado />
      <div className="dashboard">
        <div className="dashboard-content">
          {/* Sección de Bienvenida */}
          <section className="section welcome-section">
            <div className="welcome-content">
              <h2>Bienvenido, Dr/a. {usuario?.nombre}</h2>
              <p>Gestiona tus citas y atiende a tus pacientes en MediCare+</p>
            </div>
          </section>

          <div className="section">
            <h2>Datos Profesionales</h2>
            <div className="info-card">
              <p><strong>Nombre:</strong> Dr/a. {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>DNI:</strong> {usuario?.dni}</p>
              <p><strong>Especialidad:</strong> {usuario?.especialidad}</p>
              <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
              <p><strong>Obra Social:</strong> {usuario?.obraSocial}</p>
              <p><strong>Estado:</strong> <span style={{ color: disponible ? '#00897b' : '#d32f2f', fontWeight: 'bold' }}>
                {disponible ? 'Disponible' : 'No Disponible'}
              </span></p>
            </div>
            <button 
              onClick={manejarCambioDisponibilidad}
              className={disponible ? 'btn-danger' : 'btn-primary'}
              style={{ marginTop: '15px', marginRight: '10px' }}
            >
              {disponible ? 'Marcar como No Disponible' : 'Marcar como Disponible'}
            </button>
            <button 
              onClick={() => setMostrarCambioObra(true)}
              className="btn-primary"
              style={{ marginTop: '15px' }}
            >
              Cambiar Obra Social
            </button>
            {mensajeExito && <p style={{ color: '#00897b', marginTop: '10px', fontWeight: 'bold' }}>{mensajeExito}</p>}
          </div>

          <div className="section">
            <h2>Turnos Agendados</h2>
            {turnos.filter(t => t.estado !== 'cancelado').length === 0 ? (
              <p className="empty-state">No hay turnos agendados en este momento. Tus pacientes podrán agendar citas pronto.</p>
            ) : (
              <div className="appointments-list">
                {turnos.filter(t => t.estado !== 'cancelado').map(turno => (
                  <div key={turno.id} className="appointment-card">
                    <div className="appointment-header">
                      <h3>Paciente: {turno.nombrePaciente}</h3>
                      <span className="status-badge">Confirmado</span>
                    </div>
                    <p><strong>Email:</strong> {turno.emailPaciente}</p>
                    <p><strong>DNI:</strong> {turno.dniPaciente}</p>
                    <p><strong>Edad:</strong> {turno.edadPaciente} años</p>
                    <p><strong>Fecha:</strong> {turno.fecha}</p>
                    <p><strong>Hora:</strong> {turno.hora}</p>
                    <button 
                      onClick={() => setMostrarDialogoCancelacion(turno.id)}
                      className="btn-danger"
                    >
                      Cancelar Turno
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {mostrarDialogoCancelacion && (
            <div className="modal-overlay" onClick={() => setMostrarDialogoCancelacion(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Cancelar Turno del Paciente</h2>
                <p>¿Estás seguro de que deseas cancelar este turno? Por favor indica el motivo:</p>
                <textarea
                  value={motivoCancelacion}
                  onChange={(e) => setMotivoCancelacion(e.target.value)}
                  placeholder="Ej: Emergencia médica, cambio de horario, etc..."
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
                    onClick={() => manejarCancelacionTurno(mostrarDialogoCancelacion)}
                    className="btn-danger"
                  >
                    Sí, cancelar turno
                  </button>
                </div>
              </div>
            </div>
          )}

          {mostrarCambioObra && (
            <div className="modal-overlay" onClick={() => setMostrarCambioObra(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Cambiar Obra Social</h2>
                <p>Obra Social Actual: <strong>{usuario?.obraSocial}</strong></p>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label>Nueva Obra Social</label>
                  <select
                    value={nuevaObra}
                    onChange={(e) => setNuevaObra(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="PAMI">PAMI</option>
                    <option value="ISJ">ISJ</option>
                    <option value="OSDE">OSDE</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label>Motivo del Cambio</label>
                  <textarea
                    value={motivoCambioObra}
                    onChange={(e) => setMotivoCambioObra(e.target.value)}
                    placeholder="Ej: Cambio de afiliación, mejor cobertura, etc..."
                    style={{ width: '100%', minHeight: '80px', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => {
                      setMostrarCambioObra(false);
                      setMotivoCambioObra('');
                      setNuevaObra(usuario?.obraSocial);
                    }}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={manejarCambioObraSocial}
                    className="btn-primary"
                  >
                    Confirmar Cambio
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
