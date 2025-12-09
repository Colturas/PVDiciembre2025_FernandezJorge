import { createContext, useContext, useState, useEffect } from 'react';

// Contexto de autenticación para mantener el estado del usuario actual
const AuthContext = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Recupera la sesión del usuario al cargar la aplicación
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  // Establece la sesión del usuario y la persiste en localStorage
  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  // Limpia la sesión actual
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  // Registra un nuevo usuario y lo establece como usuario actual
  const registrarse = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  // Actualiza los datos del usuario actual sin perder la sesión
  const actualizarUsuario = (datosActualizados) => {
    const usuarioActualizado = { ...usuario, ...datosActualizados };
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, registrarse, actualizarUsuario, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticación desde cualquier componente
export const useAutenticacion = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAutenticacion debe ser usado dentro de ProveedorAutenticacion');
  }
  return context;
};
