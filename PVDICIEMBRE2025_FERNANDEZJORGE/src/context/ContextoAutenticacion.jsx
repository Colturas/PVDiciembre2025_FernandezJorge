import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const registrarse = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, registrarse, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAutenticacion = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAutenticacion debe ser usado dentro de ProveedorAutenticacion');
  }
  return context;
};
