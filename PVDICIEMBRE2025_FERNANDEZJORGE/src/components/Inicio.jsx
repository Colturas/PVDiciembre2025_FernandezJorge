import { useNavigate } from 'react-router-dom';
import { Encabezado } from './Encabezado';
import { useAutenticacion } from '../context/ContextoAutenticacion';
import '../styles/Home.css';

export const Inicio = () => {
  const navegar = useNavigate();
  const { usuario } = useAutenticacion();

  return (
    <>
      <Encabezado />
      <div className="home-container">
        {/* Sección Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Centro Médico Integral MediCare+</h1>
            <p>Tu salud es nuestra prioridad. Agenda tus consultas de forma rápida y segura.</p>
            <p></p>
            {!usuario ? (
              <div className="hero-buttons">
                <button onClick={() => navegar('/iniciar-sesion')} className="btn-primary-large">
                  Acceder Ahora
                </button>
                <button onClick={() => navegar('/registrarse')} className="btn-secondary-large">
                  Registrarse
                </button>
              </div>
            ) : (
              <div className="hero-buttons">
                <button onClick={() => navegar(usuario.tipoUsuario === 'paciente' ? '/panel-paciente' : '/panel-medico')} className="btn-primary-large">
                  Ir a Mi Panel
                </button>
              </div>
            )}
          </div>
          <div className="hero-image">
            <div className="medical-icon">+</div>
          </div>
        </section>
      </div>
    </>
  );
};
