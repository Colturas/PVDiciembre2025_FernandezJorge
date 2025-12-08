import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import { AccesoNoAutorizado } from './PaginasError';

export const RutaPrivada = ({ children, rolRequerido }) => {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (rolRequerido && usuario.tipoUsuario !== rolRequerido) {
    return <AccesoNoAutorizado />;
  }

  return children;
};
