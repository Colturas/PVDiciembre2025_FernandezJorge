import { createContext, useContext, useState, useEffect } from 'react';

const ContextoTurnos = createContext();

export const ProveedorTurnos = ({ children }) => {
  const [turnos, setTurnos] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState({});

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

  const agregarTurno = (turno) => {
    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);
    localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
  };

  const obtenerTurnosPorPaciente = (emailPaciente) => {
    return turnos.filter(turno => turno.emailPaciente === emailPaciente && turno.estado !== 'cancelado');
  };

  const obtenerTurnosPorMedico = (emailMedico) => {
    return turnos.filter(turno => turno.emailMedico === emailMedico && turno.estado !== 'cancelado');
  };

  const cancelarTurno = (idTurno, motivo = '') => {
    const actualizado = turnos.map(turno => 
      turno.id === idTurno 
        ? { ...turno, estado: 'cancelado', motivoCancelacion: motivo, fechaCancelacion: new Date().toISOString() }
        : turno
    );
    setTurnos(actualizado);
    localStorage.setItem('turnos', JSON.stringify(actualizado));
  };

  const verificarDisponibilidad = (emailMedico, fecha, hora) => {
    const turnoExistente = turnos.find(
      t => t.emailMedico === emailMedico && 
           t.fecha === fecha && 
           t.hora === hora && 
           t.estado !== 'cancelado'
    );
    return !turnoExistente;
  };

  const obtenerHorariosDisponibles = (emailMedico, fecha, turnosMatutinos) => {
    return turnosMatutinos.filter(hora => 
      verificarDisponibilidad(emailMedico, fecha, hora)
    );
  };

  const cambiarDisponibilidad = (emailMedico, disponible) => {
    const nuevasDisponibilidades = {
      ...disponibilidades,
      [emailMedico]: disponible,
    };
    setDisponibilidades(nuevasDisponibilidades);
    localStorage.setItem('disponibilidades', JSON.stringify(nuevasDisponibilidades));
  };

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

export const useTurnos = () => {
  const context = useContext(ContextoTurnos);
  if (!context) {
    throw new Error('useTurnos debe ser usado dentro de ProveedorTurnos');
  }
  return context;
};
