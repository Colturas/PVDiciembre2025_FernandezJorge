import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">🏥</div>
          <div className="logo-text">
            <h1>MediCare+</h1>
            <p>Centro Médico Integral</p>
          </div>
        </div>

        <nav className="nav-menu">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Bienvenido, {user.name}</span>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Cerrar Sesión
              </button>
              {!isHomePage && (
                <button onClick={() => navigate('/')} className="nav-btn home-btn">
                  Ir al Inicio
                </button>
              )}
            </div>
          ) : (
            <div className="auth-menu">
              <button onClick={() => navigate('/login')} className="nav-btn">
                Iniciar Sesión
              </button>
              <button onClick={() => navigate('/register')} className="nav-btn register-btn">
                Registrarse
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
