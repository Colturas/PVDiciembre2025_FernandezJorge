import { createContext, useContext, useState, useEffect } from 'react';

const ContextoTurnos = createContext();

export const ProveedorTurnos = ({ children }) => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const turnosGuardados = localStorage.getItem('turnos');
    if (turnosGuardados) {
      setTurnos(JSON.parse(turnosGuardados));
    }
  }, []);

  const agregarTurno = (turno) => {
    const nuevosTurnos = [...turnos, turno];
    setTurnos(nuevosTurnos);
    localStorage.setItem('turnos', JSON.stringify(nuevosTurnos));
  };

  const obtenerTurnosPorPaciente = (emailPaciente) => {
    return turnos.filter(turno => turno.emailPaciente === emailPaciente);
  };

  const obtenerTurnosPorMedico = (emailMedico) => {
    return turnos.filter(turno => turno.emailMedico === emailMedico);
  };

  const cancelarTurno = (idTurno) => {
    const actualizado = turnos.filter(turno => turno.id !== idTurno);
    setTurnos(actualizado);
    localStorage.setItem('turnos', JSON.stringify(actualizado));
  };

  return (
    <ContextoTurnos.Provider
      value={{
        turnos,
        agregarTurno,
        obtenerTurnosPorPaciente,
        obtenerTurnosPorMedico,
        cancelarTurno,
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
