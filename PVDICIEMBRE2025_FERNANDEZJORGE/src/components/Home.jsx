import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero">
          <h1>Sistema de Turnos Médicos</h1>
          <p>Agenda tus consultas médicas de forma fácil y rápida</p>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>Para Pacientes</h3>
            <p>Agenda turnos con médicos especializados, visualiza horarios disponibles y gestiona tus citas.</p>
          </div>
          <div className="feature-card">
            <h3>Para Médicos</h3>
            <p>Administra tus turnos, ve la información de tus pacientes y organiza tu agenda.</p>
          </div>
        </div>

        <div className="auth-buttons">
          <button onClick={() => navigate('/login')} className="btn-primary">
            Iniciar Sesión
          </button>
          <button onClick={() => navigate('/register')} className="btn-secondary">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};
