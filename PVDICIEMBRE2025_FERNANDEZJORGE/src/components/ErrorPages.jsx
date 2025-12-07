import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2>Página No Encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export const UnauthorizedAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">403</h1>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta página.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
