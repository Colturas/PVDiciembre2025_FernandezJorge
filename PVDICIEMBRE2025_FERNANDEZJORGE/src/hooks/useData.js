import { useState, useEffect } from 'react';

const DOCTORS = [
  {
    id: 1,
    email: 'dr.juan@hospital.com',
    name: 'Dr. Juan García',
    specialty: 'Cardiología',
    experience: 15,
  },
  {
    id: 2,
    email: 'dra.maria@hospital.com',
    name: 'Dra. María López',
    specialty: 'Neurología',
    experience: 12,
  },
  {
    id: 3,
    email: 'dr.carlos@hospital.com',
    name: 'Dr. Carlos Rodríguez',
    specialty: 'Dermatología',
    experience: 10,
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

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
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
  };
};
