import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';

export const NoEncontrado = () => {
  const navegar = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2>Página No Encontrada</h2>
        <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <button onClick={() => navegar('/')} className="btn-primary">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export const AccesoNoAutorizado = () => {
  const navegar = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">403</h1>
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta página.</p>
        <button onClick={() => navegar('/')} className="btn-primary">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
