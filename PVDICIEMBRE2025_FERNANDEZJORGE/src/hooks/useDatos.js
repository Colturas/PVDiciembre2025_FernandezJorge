import { useState, useEffect } from 'react';

const MEDICOS = [
  {
    id: 1,
    email: 'dr.juan@medicare.com',
    nombre: 'Juan García',
    especialidad: 'Cardiología',
    experiencia: 15,
  },
  {
    id: 2,
    email: 'dra.maria@medicare.com',
    nombre: 'María López',
    especialidad: 'Neurología',
    experiencia: 12,
  },
  {
    id: 3,
    email: 'dr.carlos@medicare.com',
    nombre: 'Carlos Rodríguez',
    especialidad: 'Dermatología',
    experiencia: 10,
  },
];

const USUARIOS_POR_DEFECTO = [
  {
    id: 1,
    nombre: 'Juan García',
    email: 'dr.juan@medicare.com',
    contrasena: '123456',
    tipoUsuario: 'medico',
    dni: '12345678',
    telefono: '+54 9 11 5555-1111',
    especialidad: 'Cardiología',
    creadoEn: new Date().toISOString(),
  },
  {
    id: 2,
    nombre: 'María López',
    email: 'dra.maria@medicare.com',
    contrasena: '123456',
    tipoUsuario: 'medico',
    dni: '12345679',
    telefono: '+54 9 11 5555-2222',
    especialidad: 'Neurología',
    creadoEn: new Date().toISOString(),
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    email: 'dr.carlos@medicare.com',
    contrasena: '123456',
    tipoUsuario: 'medico',
    dni: '12345680',
    telefono: '+54 9 11 5555-3333',
    especialidad: 'Dermatología',
    creadoEn: new Date().toISOString(),
  },
  {
    id: 4,
    nombre: 'Juan Pérez',
    email: 'juan.perez@gmail.com',
    contrasena: '123456',
    tipoUsuario: 'paciente',
    dni: '30123456',
    telefono: '+54 9 11 6666-1111',
    edad: 35,
    creadoEn: new Date().toISOString(),
  },
];

const TURNOS_MATUTINOS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
];

export const useMedicos = () => {
  return MEDICOS;
};

export const useTurnosMatutinos = () => {
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);

  useEffect(() => {
    setTurnosDisponibles(TURNOS_MATUTINOS);
  }, []);

  return turnosDisponibles;
};

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [inicializado, setInicializado] = useState(false);

  useEffect(() => {
    // Intentar cargar desde 'usuarios' (nuevo) o 'users' (viejo)
    const usuariosGuardados = localStorage.getItem('usuarios') || localStorage.getItem('users');
    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    } else {
      // Inicializar con usuarios por defecto
      setUsuarios(USUARIOS_POR_DEFECTO);
      localStorage.setItem('usuarios', JSON.stringify(USUARIOS_POR_DEFECTO));
    }
    setInicializado(true);
  }, []);

  const agregarUsuario = (datosUsuario) => {
    const nuevosUsuarios = [...usuarios, datosUsuario];
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    return datosUsuario;
  };

  const buscarUsuarioPorEmail = (email) => {
    return usuarios.find(u => u.email === email);
  };

  const validarInicioSesion = (email, contrasena) => {
    const usuario = usuarios.find(u => u.email === email && u.contrasena === contrasena);
    return usuario || null;
  };

  return {
    usuarios,
    agregarUsuario,
    buscarUsuarioPorEmail,
    validarInicioSesion,
    inicializado,
  };
};
