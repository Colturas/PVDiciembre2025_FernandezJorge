import { useNavigate, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import '../styles/Header.css';

export const Encabezado = () => {
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const { usuario, cerrarSesion } = useAutenticacion();

  const esEnInicio = ubicacion.pathname === '/';

  const manejarCierreSesion = () => {
    cerrarSesion();
    navegar('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => navegar('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">+</div>
          <div className="logo-text">
            <h1>MediCare+</h1>
            <p>Centro Médico Integral</p>
          </div>
        </div>

        <nav className="nav-menu">
          {usuario ? (
            <div className="user-menu">
              <span className="user-name">Bienvenido, {usuario.nombre}</span>
              {esEnInicio && (
                <button 
                  onClick={() => navegar(usuario.tipoUsuario === 'paciente' ? '/panel-paciente' : '/panel-medico')} 
                  className="nav-btn"
                >
                  Mi Panel
                </button>
              )}
              <button onClick={manejarCierreSesion} className="nav-btn logout-btn">
                Cerrar Sesión
              </button>
              {!esEnInicio && (
                <button onClick={() => navegar('/')} className="nav-btn home-btn">
                  Ir al Inicio
                </button>
              )}
            </div>
          ) : (
            <div className="auth-menu">
              <button onClick={() => navegar('/iniciar-sesion')} className="nav-btn">
                Iniciar Sesión
              </button>
              <button onClick={() => navegar('/registrarse')} className="nav-btn register-btn">
                Registrarse
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
