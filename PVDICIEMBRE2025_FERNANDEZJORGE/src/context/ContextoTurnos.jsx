import { createContext, useContext, useState, useEffect } from 'react';

// Contexto para manejar los turnos médicos del sistema
const ContextoTurnos = createContext();

export const ProveedorTurnos = ({ children }) => {
  const [turnos, setTurnos] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState({});

  // Carga los turnos y disponibilidades al iniciar la aplicación
  useEffect(() => {
    const turnosGuardados = localStorage.getItem('turnos');
    if (turnosGuardados) {
      setTurnos(JSON.parse(turnosGuardados));
    }
    
    const disponibilidadesGuardadas = localStorage.getItem('disponibilidades');
    if (disponibilidadesGuardadas) {
      setDisponibilidades(JSON.parse(disponibilidadesGuardadas));
    }
  }, []);

  // Registra un nuevo turno en el sistema
  const agregarTurno = (turno) => {
    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);
    localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
  };

  // Obtiene los turnos de un paciente específico
  const obtenerTurnosPorPaciente = (emailPaciente) => {
    return turnos.filter(turno => turno.emailPaciente === emailPaciente && turno.estado !== 'cancelado');
  };

  // Obtiene los turnos de un médico específico
  const obtenerTurnosPorMedico = (emailMedico) => {
    return turnos.filter(turno => turno.emailMedico === emailMedico && turno.estado !== 'cancelado');
  };

  // Marca un turno como cancelado con motivo
  const cancelarTurno = (idTurno, motivo = '') => {
    const actualizado = turnos.map(turno => 
      turno.id === idTurno 
        ? { ...turno, estado: 'cancelado', motivoCancelacion: motivo, fechaCancelacion: new Date().toISOString() }
        : turno
    );
    setTurnos(actualizado);
    localStorage.setItem('turnos', JSON.stringify(actualizado));
  };

  // Verifica si un horario específico está disponible para un médico
  const verificarDisponibilidad = (emailMedico, fecha, hora) => {
    const turnoExistente = turnos.find(
      t => t.emailMedico === emailMedico && 
           t.fecha === fecha && 
           t.hora === hora && 
           t.estado !== 'cancelado'
    );
    return !turnoExistente;
  };

  // Obtiene la lista de horarios disponibles para un médico en una fecha
  const obtenerHorariosDisponibles = (emailMedico, fecha, turnosMatutinos) => {
    return turnosMatutinos.filter(hora => 
      verificarDisponibilidad(emailMedico, fecha, hora)
    );
  };

  // Actualiza el estado de disponibilidad del médico
  const cambiarDisponibilidad = (emailMedico, disponible) => {
    const nuevasDisponibilidades = {
      ...disponibilidades,
      [emailMedico]: disponible,
    };
    setDisponibilidades(nuevasDisponibilidades);
    localStorage.setItem('disponibilidades', JSON.stringify(nuevasDisponibilidades));
  };

  // Verifica si un médico está disponible para recibir nuevos turnos
  const estaDisponible = (emailMedico) => {
    return disponibilidades[emailMedico] !== false;
  };

  return (
    <ContextoTurnos.Provider
      value={{
        turnos,
        agregarTurno,
        obtenerTurnosPorPaciente,
        obtenerTurnosPorMedico,
        cancelarTurno,
        verificarDisponibilidad,
        obtenerHorariosDisponibles,
        cambiarDisponibilidad,
        estaDisponible,
      }}
    >
      {children}
    </ContextoTurnos.Provider>
  );
};

// Hook para acceder al contexto de turnos
export const useTurnos = () => {
  const context = useContext(ContextoTurnos);
  if (!context) {
    throw new Error('useTurnos debe ser usado dentro de ProveedorTurnos');
  }
  return context;
};
