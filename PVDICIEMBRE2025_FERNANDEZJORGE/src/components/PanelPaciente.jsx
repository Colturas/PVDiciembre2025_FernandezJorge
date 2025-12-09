import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { useTurnos } from '../context/ContextoTurnos';
import { useMedicos, useTurnosMatutinos, useUsuarios } from '../hooks/useDatos';
import '../styles/Dashboard.css';

const descargarPDF = (turno) => {
  const contenido = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Comprobante de Cita - ${turno.nombreMedico}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0f3460 0%, #16213e 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #0f3460; border-bottom: 3px solid #00bcd4; padding-bottom: 10px; margin: 0 0 15px 0; font-size: 16px; font-weight: 600; }
        .field { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
        .label { font-weight: 600; color: #0f3460; }
        .value { color: #666; text-align: right; }
        .status { background: linear-gradient(135deg, rgba(0, 137, 123, 0.1) 0%, rgba(0, 188, 212, 0.1) 100%); padding: 15px; border-radius: 6px; border-left: 4px solid #00897b; }
        .status-label { font-weight: 600; color: #00897b; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
        .footer p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MediCare+</h1>
          <p>Centro Médico Integral</p>
          <p style="margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px; font-size: 16px; font-weight: 600;">Comprobante de Cita Médica</p>
        </div>
        <div class="content">
          <div class="section">
            <h2>Información del Paciente</h2>
            <div class="field"><span class="label">Nombre:</span><span class="value">${turno.nombrePaciente}</span></div>
            <div class="field"><span class="label">Email:</span><span class="value">${turno.emailPaciente}</span></div>
            <div class="field"><span class="label">DNI:</span><span class="value">${turno.dniPaciente}</span></div>
            <div class="field"><span class="label">Edad:</span><span class="value">${turno.edadPaciente} años</span></div>
          </div>
          <div class="section">
            <h2>Detalles de la Cita</h2>
            <div class="field"><span class="label">Médico:</span><span class="value">Dr/a. ${turno.nombreMedico}</span></div>
            <div class="field"><span class="label">Especialidad:</span><span class="value">${turno.especialidadMedico}</span></div>
            <div class="field"><span class="label">Fecha:</span><span class="value">${turno.fecha}</span></div>
            <div class="field"><span class="label">Hora:</span><span class="value">${turno.hora}</span></div>
            <div class="field"><span class="label">Email Médico:</span><span class="value">${turno.emailMedico}</span></div>
          </div>
          <div class="status">
            <span class="status-label">✓ Estado: CONFIRMADO</span>
          </div>
        </div>
        <div class="footer">
          <p>Comprobante generado el ${new Date().toLocaleString('es-AR')}</p>
          <p>MediCare+ - Centro Médico Integral © 2025</p>
          <p>Este documento es válido como comprobante de su cita programada</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const ventana = window.open('', '', 'height=700,width=900');
  ventana.document.write(contenido);
  ventana.document.close();
  setTimeout(() => ventana.print(), 500);
};

export const PanelPaciente = () => {
  const navegar = useNavigate();
  const { usuario, actualizarUsuario } = useAutenticacion();
  const { agregarTurno, obtenerTurnosPorPaciente, verificarDisponibilidad, obtenerHorariosDisponibles } = useTurnos();
  const { actualizarObra } = useUsuarios();
  const medicos = useMedicos();
  const turnosMatutinos = useTurnosMatutinos();
  const [turnos, setTurnos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [mostrarCambioObra, setMostrarCambioObra] = useState(false);
  const [nuevaObra, setNuevaObra] = useState(usuario?.obraSocial || 'PAMI');
  const [motivoCambioObra, setMotivoCambioObra] = useState('');

  useEffect(() => {
    setTurnos(obtenerTurnosPorPaciente(usuario?.email));
  }, [usuario, obtenerTurnosPorPaciente]);

  const manejarSeleccionMedico = (medico) => {
    setMedicoSeleccionado(medico);
    setHorarioSeleccionado(null);
    const fechaSiguiente = new Date();
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
    const fecha = fechaSiguiente.toLocaleDateString('es-AR');
    const horariosDisp = obtenerHorariosDisponibles(medico.email, fecha, turnosMatutinos);
    setHorariosDisponibles(horariosDisp);
  };

  const [mostrarDialogoCancelacion, setMostrarDialogoCancelacion] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const { cancelarTurno } = useTurnos();

  const manejarAgendamiento = () => {
    if (medicoSeleccionado && horarioSeleccionado) {
      const fechaSiguiente = new Date();
      fechaSiguiente.setDate(fechaSiguiente.getDate() + 1);
      const fecha = fechaSiguiente.toLocaleDateString('es-AR');
      
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
            <h2>Datos Personales</h2>
            <div className="info-card">
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>DNI:</strong> {usuario?.dni}</p>
              <p><strong>Edad:</strong> {usuario?.edad} años</p>
              <p><strong>Teléfono:</strong> {usuario?.telefono}</p>
              <p><strong>Obra Social:</strong> {usuario?.obraSocial}</p>
            </div>
            <button 
              onClick={() => setMostrarCambioObra(true)}
              className="btn-primary"
              style={{ marginTop: '15px' }}
            >
              Cambiar Obra Social
            </button>
          </div>

          <div className="section">
            <h2>Agendar Turno</h2>
            {!mostrarFormulario ? (
              <button onClick={() => setMostrarFormulario(true)} className="btn-primary">
                + Agendar Nuevo Turno
              </button>
            ) : (
              <div className="book-form">
                <div className="form-group">
                  <label>Selecciona un Médico (Obra Social: {usuario?.obraSocial})</label>
                  <select
                    value={medicoSeleccionado?.id || ''}
                    onChange={(e) => {
                      const medico = medicos.find(m => m.id === parseInt(e.target.value));
                      manejarSeleccionMedico(medico);
                    }}
                  >
                    <option value="">-- Selecciona un médico --</option>
                    {medicos
                      .filter(medico => medico.obraSocial === usuario?.obraSocial)
                      .map(medico => (
                        <option key={medico.id} value={medico.id}>
                          {medico.nombre} - {medico.especialidad}
                        </option>
                      ))}
                  </select>
                </div>

                {medicoSeleccionado && (
                  <div className="form-group">
                    <label>Selecciona una Hora (Próximo día - {(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toLocaleDateString('es-AR'); })()})</label>
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
                    <h3>Resumen del Turno</h3>
                    <p><strong>Médico:</strong> {medicoSeleccionado.nombre}</p>
                    <p><strong>Especialidad:</strong> {medicoSeleccionado.especialidad}</p>
                    <p><strong>Experiencia:</strong> {medicoSeleccionado.experiencia} años</p>
                    <p><strong>Fecha:</strong> {(() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toLocaleDateString('es-AR'); })()}</p>
                    <p><strong>Hora:</strong> {horarioSeleccionado}</p>
                    <button onClick={manejarAgendamiento} className="btn-primary">
                      Confirmar Turno
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
            <h2>Mis Turnos</h2>
            {turnos.length === 0 ? (
              <p className="empty-state">No tienes turnos agendados aún. ¡Agenda tu primer turno ahora!</p>
            ) : (
              <div className="appointments-list">
                {turnos.map(turno => (
                  <div key={turno.id} className="appointment-card">
                    <div className="appointment-header">
                      <h3>Dr/a. {turno.nombreMedico}</h3>
                      <span className={`status-badge ${turno.estado === 'cancelado' ? 'cancelado' : ''}`}>
                        {turno.estado === 'cancelado' ? 'Cancelado' : 'Confirmado'}
                      </span>
                    </div>
                    <p><strong>Especialidad:</strong> {turno.especialidadMedico}</p>
                    <p><strong>Fecha:</strong> {turno.fecha}</p>
                    <p><strong>Hora:</strong> {turno.hora}</p>
                    <p><strong>Email del médico:</strong> {turno.emailMedico}</p>
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
                        Cancelar Turno
                      </button>
                    )}
                    <button 
                      className="btn-download"
                      onClick={() => descargarPDF(turno)}
                    >
                      Descargar PDF
                    </button>
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
                    placeholder="Ej: Cambio de empleo, mejor cobertura, etc..."
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
