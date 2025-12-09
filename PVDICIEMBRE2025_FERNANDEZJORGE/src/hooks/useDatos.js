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


const TURNOS_MATUTINOS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
];

const TURNOS_VESPERTINOS = [
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

export const useMedicos = () => {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    // Cargar médicos desde usuarios registrados
    const usuariosGuardados = localStorage.getItem('usuarios') || localStorage.getItem('users');
    if (usuariosGuardados) {
      const usuarios = JSON.parse(usuariosGuardados);
      const medicosRegistrados = usuarios.filter(u => u.tipoUsuario === 'medico');
      setMedicos(medicosRegistrados);
    }
  }, []);

  return medicos;
};

export const useTurnosMatutinos = () => {
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);

  useEffect(() => {
    const todosLosTurnos = [...TURNOS_MATUTINOS, ...TURNOS_VESPERTINOS];
    setTurnosDisponibles(todosLosTurnos);
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

  const buscarUsuarioPorDNI = (dni) => {
    return usuarios.find(u => u.dni === dni);
  };

  const buscarUsuarioPorTelefono = (telefono) => {
    return usuarios.find(u => u.telefono === telefono);
  };

  const validarInicioSesion = (email, contrasena) => {
    const usuario = usuarios.find(u => u.email === email && u.contrasena === contrasena);
    return usuario || null;
  };

  const actualizarObra = (usuarioId, nuevaObra, motivo) => {
    const usuariosActualizados = usuarios.map(u => 
      u.id === usuarioId 
        ? { ...u, obraSocial: nuevaObra, cambioObraMotivo: motivo, cambioObraFecha: new Date().toISOString() }
        : u
    );
    setUsuarios(usuariosActualizados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  };

  return {
    usuarios,
    agregarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorDNI,
    buscarUsuarioPorTelefono,
    validarInicioSesion,
    actualizarObra,
    inicializado,
  };
};
