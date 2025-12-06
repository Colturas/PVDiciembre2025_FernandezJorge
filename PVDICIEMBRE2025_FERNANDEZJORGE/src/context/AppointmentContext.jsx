import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  const addAppointment = (appointment) => {
    const newAppointments = [...appointments, appointment];
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const getAppointmentsByPatient = (patientEmail) => {
    return appointments.filter(apt => apt.patientEmail === patientEmail);
  };

  const getAppointmentsByDoctor = (doctorEmail) => {
    return appointments.filter(apt => apt.doctorEmail === doctorEmail);
  };

  const cancelAppointment = (appointmentId) => {
    const updated = appointments.filter(apt => apt.id !== appointmentId);
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        getAppointmentsByPatient,
        getAppointmentsByDoctor,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments debe ser usado dentro de AppointmentProvider');
  }
  return context;
};
