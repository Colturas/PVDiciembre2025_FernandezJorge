import { useNavigate, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import '../styles/Header.css';

// Header de la aplicación con navegación y opciones de usuario
export const Encabezado = () => {
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const { usuario, cerrarSesion } = useAutenticacion();

  // Verifica si está en la página de inicio
  const esEnInicio = ubicacion.pathname === '/';

  // Cierra la sesión y redirige al inicio
  const manejarCierreSesion = () => {
    cerrarSesion();
    navegar('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Sección de logo */}
        <div className="logo-section" onClick={() => navegar('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">+</div>
          <div className="logo-text">
            <h1>MediCare+</h1>
            <p>Centro Médico Integral</p>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="nav-menu">
          {/* Menú para usuarios autenticados */}
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
            // Menú para usuarios sin autenticar
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
