import { useState, useEffect } from 'react';

const DOCTORS = [
  {
    id: 1,
    email: 'dr.juan@medicare.com',
    name: 'Juan García',
    specialty: 'Cardiología',
    experience: 15,
  },
  {
    id: 2,
    email: 'dra.maria@medicare.com',
    name: 'María López',
    specialty: 'Neurología',
    experience: 12,
  },
  {
    id: 3,
    email: 'dr.carlos@medicare.com',
    name: 'Carlos Rodríguez',
    specialty: 'Dermatología',
    experience: 10,
  },
];

const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Juan García',
    email: 'dr.juan@medicare.com',
    password: '123456',
    userType: 'medico',
    dni: '12345678',
    phone: '+54 9 11 5555-1111',
    specialty: 'Cardiología',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'María López',
    email: 'dra.maria@medicare.com',
    password: '123456',
    userType: 'medico',
    dni: '12345679',
    phone: '+54 9 11 5555-2222',
    specialty: 'Neurología',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'dr.carlos@medicare.com',
    password: '123456',
    userType: 'medico',
    dni: '12345680',
    phone: '+54 9 11 5555-3333',
    specialty: 'Dermatología',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    password: '123456',
    userType: 'paciente',
    dni: '30123456',
    phone: '+54 9 11 6666-1111',
    age: 35,
    createdAt: new Date().toISOString(),
  },
];

const MORNING_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
];

export const useDoctors = () => {
  return DOCTORS;
};

export const useMorningSlots = () => {
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    setAvailableSlots(MORNING_SLOTS);
  }, []);

  return availableSlots;
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Inicializar con usuarios por defecto
      setUsers(DEFAULT_USERS);
      localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }
    setIsInitialized(true);
  }, []);

  const addUser = (userData) => {
    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return userData;
  };

  const findUserByEmail = (email) => {
    return users.find(u => u.email === email);
  };

  const validateLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  };

  return {
    users,
    addUser,
    findUserByEmail,
    validateLogin,
    isInitialized,
  };
};
